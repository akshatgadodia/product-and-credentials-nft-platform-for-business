const express = require('express')

const router = express.Router()

const { generateNFT } = require('../controllers/nftController')

router.post('/generate-nft',generateNFT);

module.exports = router