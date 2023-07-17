const express = require('express');
const router = express.Router();

// Import respective controller
const taskController = require('../controller/taskController');

//& Sends back all user data
//& Name information will come in url parameter
router.get('/', taskController.getTaskData, (req, res) => {
  res.status(200).json(res.locals.taskData);
});

//& User creates new tasks
//& Name information will come in url parameter. Task information will come in POST body
router.post('/', taskController.createTask, (req, res) => {
  return res.status(200).json(res.locals.newTaskId);
});

//& query: taskId=<task id>
//& patch body: {updatedTask: <updated task>, updatedEndTime: <updatedEndTime>}
router.patch('/', taskController.updateTask, (req, res) => {
  return res.status(200).json(res.locals.updatedTaskId);
});

//& Deletes request to '/api/task'
//& User deletes existing tasks
router.delete('/', taskController.deleteTask, (req, res) => {
  return res.status(200).json(res.locals.deleted);
});

module.exports = router;
