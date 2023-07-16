const express = require('express');
const userController = require('../controller/userController');

const router = express.Router();

router.get('/', userController.getUser, (req, res) => {
  console.log(res.locals.user);
  res.status(200).json(res.locals.user);
}); //? sending back user data to client with 200 status

router.post('/create', userController.createUser, (req, res) =>
  res.status(200).json(res.locals.newUser)
); //? sending back new user data to client with 200 status

router.post('/login', userController.login, (req, res) => {
  res.status(200).json(res.locals.key);
}); //?

module.exports = router;
