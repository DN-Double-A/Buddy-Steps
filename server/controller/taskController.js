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
taskController.getData = async function (req, res, next) {
  const queryString = `SELECT users.id AS "userID", users.username, users.name, users.profilepic, tasks.id AS "taskID", tasks.task, tasks.startDate, tasks.endDate FROM UsersTasksJoinTable
  right JOIN Users
  ON UsersTasksJoinTable.userId = Users.id
  right JOIN Tasks
  ON UsersTasksJoinTable.taskId = Tasks.id`;
  try {
    const result = await db.query(queryString);
    res.locals.userData = result.rows;
  } catch (error) {
    const newErr = createErr({ error });
    return next(error);
  }
};

taskController.createData = async function (req, res, next) {};

module.exports = taskController;
