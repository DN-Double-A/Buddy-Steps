const path = require('path');
const db = require('../models/buddyModel');

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
    // joining our user's task table id to match the foreign keys with the task table to get that user's specific tasks. Searching for a dynamic value based off the username.
    const queryString = {
      text: `SELECT tasks.id AS "taskID", tasks.task, tasks.startDate, tasks.endDate 
      FROM UsersTasksJoinTable
      RIGHT JOIN Users
      ON UsersTasksJoinTable.userId = Users.id
      RIGHT JOIN Tasks
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
