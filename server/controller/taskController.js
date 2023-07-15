const path = require('path');
const db = require('../models/buddyModel');
const { create } = require('domain');

// controller object holding all methods.
const taskController = {};

// Modular error creator:
const createErr = (errInfo) => {
  const { method, type, err } = errInfo;
  return {
    log: error,
    message: {
      err: `taskController error: Incorrect data received.`,
    },
  };
};

// method to get all the user data.
taskController.getTaskData = async function (req, res, next) {
  try {
    const queryString = {
      text: `SELECT tasks.id AS "taskID", tasks.task, tasks.startDate, tasks.endDate FROM UsersTasksJoinTable
      right JOIN Users
      ON UsersTasksJoinTable.userId = Users.id
      right JOIN Tasks
      ON UsersTasksJoinTable.taskId = Tasks.id
      WHERE users.username = $1;`,
      values: [req.query.username],
    };
    const result = await db.query(queryString);
    res.locals.taskData = result.rows;
    return next();
  } catch (error) {
    const newErr = createErr({ error });
    return next(error);
  }
};

//add the task to the task to table
//link the userid and the task in the task in the table.
taskController.createData = async function (req, res, next) {};

module.exports = taskController;
