const express = require('express');
const router = express.Router();

// Import respective controller
const progressController = require('../controller/progressController');

//& For a taskId + username gets the progress
// taskId and username will come form body
router.get('/', progressController.getProgress, (req, res) => {
  // console.log('in get router for progress');
  res.status(200).json(res.locals.data);
});

//& For a taskId + username sets progress
router.patch('/', progressController.setProgress, (req, res) => {
  console.log('in set router for progress');
  console.log(res.locals.data);
  res.status(200).json(res.locals.data);
});

module.exports = router;
