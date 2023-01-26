const express = require('express')

const router = express.Router()

const { loginUser, updateUserData } = require('../controllers/userController')

router.post('/login',loginUser);
router.patch('/update', updateUserData);

module.exports = router