const mongoose = require("mongoose");

const { Schema } = mongoose;

const userSchema = new Schema({
  accountAddress: {
    type: String,
    unique: true,
    required: [true, "Account Address is required"]
  },
  name: { type: String, required: false },
  email: { type: String, trim: true, lowercase: true },
  apiKey: { type: String, trim: true, lowercase: true },
  apiHits: { type: Number, default: 0 },
  websiteHits: { type: Number, default: 5 },
  transactions: [
    {
      txid: String,
      buyerName: String,
      buyerEmail: String,
      brandName: String,
      productName: String,
      productId: String,
      tokenId: Number,
      warrantyExpireDate: String,
      status: String,
      buyerMetamaskAddress: String,

    }
  ]
});

module.exports = new mongoose.model("user", userSchema);
