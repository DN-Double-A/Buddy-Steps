const express = require('express');
const router = express.Router();

// Import respective controller
const taskController = require('../controller/taskController');

//& Get requests to '/api/task'
//& Sends back all user data
//& Name information will come in url parameter
router.get('/', taskController.getTaskData, (req, res) => {
  res.status(200).json(res.locals.taskData);
});

//& Post requests to '/api/task/'
//& User creates new tasks
//& Name information will come in url parameter. Task information will come in POST body
router.post('/', taskController.createTask, (req, res) => {
  return res.status(200).json(res.locals.newTaskId);
});

//& Update request to '/api/task'
//& User updates existing tasks
//& Name information will come in url parameter. Task information will come in PATCH body
router.patch('/', taskController.updateTask, (req, res) => {
  return res.status(200).json(res.locals.updatedTaskId);
});

//& Deletes request to '/api/task'
//& User deletes existing tasks

router.delete('/', taskController.deleteTask, (req, res) => {
  //TODO: UPDATE VALUE INSIDE JSON
  return res.status(200).json(res.locals.deleted);
});

module.exports = router;
