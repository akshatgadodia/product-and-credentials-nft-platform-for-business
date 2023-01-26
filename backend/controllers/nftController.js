const mongoose = require("mongoose");
const asyncHandler = require("../middlewares/asyncHandler");
const ErrorResponse = require("../utils/errorResponse");
const User = require("../models/User");

const { web3 } = require("../config/web3");
const {sendConfirmationMail, sendErrorMail} = require('../utils/mail');
const { saveDataOnIPFS } = require("../utils/storeData");
const {
  ABI,
  CONTRACT_ADDRESS,
  ACCOUNT_ADDRESS,
} = require("../utils/constants");

const generateNFT = async (req, res, next) => {
  // console.log(await web3.eth.accounts.privateKeyToAccount('85babe03e9af98a0042e23530fe9b5bbcbd26de49c1c28fb3b868cc3603b7bf2'));
  //Verifying the limit or authenticity
  /*
  
  */
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
    warrantyExpireDate: req.body.warrantyExpireDate
    //buyerMetamaskAddress
    //senderMetamaskAddress
  };
  let signedTx;
  let success;
  try {
    const storedDataLink = await saveDataOnIPFS(dataToStore);
    const contract = await new web3.eth.Contract(ABI, CONTRACT_ADDRESS);
    const networkId = await web3.eth.net.getId();
    const tx = await contract.methods.safeMint(
      req.body.buyerMetamaskAddress,
      storedDataLink
    );
    // const gas = await tx.estimateGas({ from: ACCOUNT_ADDRESS });
    const gasPrice = await web3.eth.getGasPrice();
    const data = tx.encodeABI();
    const nonce = await web3.eth.getTransactionCount(ACCOUNT_ADDRESS,"pending");
    const options = {
      to: contract.options.address,
      data,
      gas: web3.utils.toHex(web3.utils.toWei("3000000", "wei")),
      gasPrice,
      nonce,
      chainId: networkId,
      value: 0
    };
    signedTx = await web3.eth.accounts.signTransaction(
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
  } catch (err) {
    console.log(err);
    return next(new ErrorResponse("Some Error Occurred", 402));
  }
  try {
    const receipt = await web3.eth.sendSignedTransaction(
      signedTx.rawTransaction
    );
    // console.log(`Transaction hash: ${receipt.transactionHash}`);
    // console.log(receipt)
    success = true;
    await sendConfirmationMail(dataToStore);
  } catch (err) {
    success = false;
    console.log("NFT Creation Failed");
    console.log(err);
    await sendErrorMail(dataToStore);
  }
  try{
    const user = await User.findOne({ accountAddress: req.body.senderMetamaskAddress })
    user.transactions.push({
      ...dataToStore,
      buyerMetamaskAddress:req.body.buyerMetamaskAddress,
      id:signedTx.transactionHash,
      status: (success) ? 'Success' : 'Failed'
    });
    user.save();
  }catch(err){
    console.log("Transactions Details Pushing Failed");
    console.log(err);
  }
};

module.exports = { generateNFT };