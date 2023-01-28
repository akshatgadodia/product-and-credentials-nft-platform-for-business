// const mongoose = require("mongoose");
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
    // console.log(user)
    if (user.apiHits <= 0) {
      return next(new ErrorResponse("Plan Limit Exceeded", 403));
    }
  } else {
    const user = await User.findOne({
      accountAddress: req.body.senderMetamaskAddress
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
    // const gas = await tx.estimateGas({ from: ACCOUNT_ADDRESS });
    const gasPrice = await web3.eth.getGasPrice();
    const data = tx.encodeABI();
    const nonce = await web3.eth.getTransactionCount(
      ACCOUNT_ADDRESS,
      "pending"
    );
    const options = {
      to: contract.options.address,
      data,
      gas: web3.utils.toHex(web3.utils.toWei("3000000", "wei")),
      gasPrice,
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
    // console.log(signedTx);
    const receipt = await web3.eth.sendSignedTransaction(
      signedTx.rawTransaction
    );
    // console.log(receipt);
    await sendConfirmationMail({
      ...dataToStore,
      txid: receipt.transactionHash
    });
    return "Success";
  } catch (err) {
    // console.log(err);
    if (
      err.message ===
      "Transaction was not mined within 750 seconds, please make sure your transaction was properly sent. Be aware that it might still be mined!"
    ) {
      console.log("TRANSACTION PENDING ON BLOCKCHAIN");
      console.log(err);
      await sendPendingMail({ ...dataToStore, txid: signedTx.transactionHash });
      return "Pending";
    } else {
      console.log("NFT CREATION FAILED");
      console.log(err);
      await sendErrorMail({ ...dataToStore, txid: signedTx.transactionHash });
      return "Failed";
    }
  }
};

const storeTransactionData = async (req, data) => {
  console.log(data);
  try {
    const user = await User.findOne({
      accountAddress: data.senderMetamaskAddress
    });
    // console.log(user)
    user.transactions.push(data);
    const apiKey = req.query.apikey;
    if (data.status !== "Failed")
      apiKey
        ? (user.apiHits = user.apiHits - 1)
        : (user.websiteHits = user.websiteHits - 1);
    // console.log(user);
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
      tokenId: req.body.tokenId,
      warrantyExpireDate: req.body.warrantyExpireDate,
      buyerMetamaskAddress: req.body.buyerMetamaskAddress,
      senderMetamaskAddress: req.body.senderMetamaskAddress
    };
    //Generating and Signing Web3 Transaction
    const signedTx = await signWeb3Transaction(res, next, dataToStore);
    //Sending Web3 Transaction to Blockchain
    const result = await sendSignedWeb3Transaction(signedTx, dataToStore);
    //Storing the result  on the database and decreasing the hits value
    await storeTransactionData(req, {
      ...dataToStore,
      txid: signedTx.transactionHash,
      status: result
    });
  }
};

module.exports = { generateNFT };
