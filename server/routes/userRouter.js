const express = require('express')
const userController = require('../controllers/userController')

const router = express.Router();

router.get('/',
userController.getUser,
(req,res) => res.status(200).json()
)

router.post('/create',
userController.createUser,
(req,res) => res.status(200).json()
)

module.exports = router