const asyncHandler = require("../middlewares/asyncHandler");
const ErrorResponse = require("../utils/errorResponse");
const User = require("../models/User");

const { web3 } = require("../config/web3");
const {
  sendConfirmationMail,
  sendErrorMail,
  sendPendingMail
} = require("../utils/mail");
const { saveDataOnIPFS } = require("../utils/storeData");
const {
  ABI,
  CONTRACT_ADDRESS,
  ACCOUNT_ADDRESS
} = require("../utils/constants");

const verifyUser = asyncHandler(async (req, next) => {
  const apiKey = req.query.apikey;
  if (apiKey) {
    const user = await User.findOne({ apiKey: apiKey });
    if (user.apiHits <= 0) {
      return next(new ErrorResponse("Plan Limit Exceeded", 403));
    }
  } else {
    const user = await User.findOne({
      accountAddress: req.body.accountAddress
    });
    if (user.websiteHits <= 0) {
      return next(new ErrorResponse("Plan Limit Exceeded", 403));
    }
  }
  return true;
});

const signWeb3Transaction = async (res, next, dataToStore) => {
  try {
    const storedDataLink = await saveDataOnIPFS(dataToStore);
    const contract = await new web3.eth.Contract(ABI, CONTRACT_ADDRESS);
    const networkId = await web3.eth.net.getId();
    const tx = await contract.methods.safeMint(
      dataToStore.buyerMetamaskAddress,
      storedDataLink
    );
    const data = tx.encodeABI();
    const gas = await tx.estimateGas({ from: ACCOUNT_ADDRESS, to: CONTRACT_ADDRESS, data:data });
    // const gasPrice = await web3.eth.getGasPrice();
    const price = web3.utils.toHex(web3.utils.toWei('1', 'gwei'));
    const nonce = await web3.eth.getTransactionCount(
      ACCOUNT_ADDRESS,
      "pending"
    );
    const options = {
      to: contract.options.address,
      data,
      // gas: web3.utils.toHex(web3.utils.toWei("30000000", "wei")),
      gas,
      gasPrice:price,
      nonce,
      chainId: networkId,
      value: 0
    };
    const signedTx = await web3.eth.accounts.signTransaction(
      options,
      process.env.METAMASK_SECRET_KEY
    );
    res.status(201).json({
      success: true,
      data: {
        message: "Request Accepted",
        txid: signedTx.transactionHash
      }
    });
    return signedTx;
  } catch (err) {
    console.log("SIGNING TRANSACTION FAILED");
    console.log(err);
    return next(new ErrorResponse("Some Error Occurred", 500));
  }
};

const sendSignedWeb3Transaction = async (signedTx, dataToStore) => {
  try {
    const receipt = await web3.eth.sendSignedTransaction(
      signedTx.rawTransaction
    );
    const transactionReceipt = await web3.eth.getTransactionReceipt(
      signedTx.transactionHash
    );
    const tokenId = web3.utils.hexToNumber(
      transactionReceipt.logs[0].topics[3]
    );
    await sendConfirmationMail({
      ...dataToStore,
      tokenId,
      txid: receipt.transactionHash
    });
    return { result: "Success", tokenId };
  } catch (err) {
    if (
      err.message ===
      "Transaction was not mined within 750 seconds, please make sure your transaction was properly sent. Be aware that it might still be mined!"
    ) {
      console.log("TRANSACTION PENDING ON BLOCKCHAIN");
      console.log(err);
      await sendPendingMail({ ...dataToStore, txid: signedTx.transactionHash });
      return { result: "Pending" };
    } else {
      console.log("NFT CREATION FAILED");
      console.log(err);
      await sendErrorMail({ ...dataToStore, txid: signedTx.transactionHash });
      return { result: "Failed" };
    }
  }
};

const storeTransactionData = async (req, data) => {
  // console.log(data);
  try {
    const user = await User.findOne({
      accountAddress: data.accountAddress
    });
    user.transactions.push(data);
    const apiKey = req.query.apikey;
    if (data.status !== "Failed")
      apiKey
        ? (user.apiHits = user.apiHits - 1)
        : (user.websiteHits = user.websiteHits - 1);
    user.save();
  } catch (err) {
    console.log("Transactions Details Pushing Failed");
    console.log(err);
  }
};

const generateNFT = async (req, res, next) => {
  //Verifying the limit or authenticity
  const verifyResult = await verifyUser(req, next);
  if (verifyResult) {
    //Creating Data Object
    const dataToStore = {
      sellerEmail: req.body.sellerEmail,
      sellerName: req.body.sellerName,
      buyerName: req.body.buyerName,
      buyerEmail: req.body.buyerEmail,
      brandName: req.body.brandName,
      productName: req.body.productName,
      productId: req.body.productId,
      warrantyExpireDate: req.body.warrantyExpireDate,
      buyerMetamaskAddress: req.body.buyerMetamaskAddress,
      accountAddress: req.body.accountAddress
    };
    //Generating and Signing Web3 Transaction
    const signedTx = await signWeb3Transaction(res, next, dataToStore);
    //Sending Web3 Transaction to Blockchain
    const { result, tokenId } = await sendSignedWeb3Transaction(
      signedTx,
      dataToStore
    );
    //Storing the result  on the database and decreasing the hits value
    await storeTransactionData(req, {
      ...dataToStore,
      txid: signedTx.transactionHash,
      tokenId,
      status: result
    });
  }
};

module.exports = { generateNFT };
