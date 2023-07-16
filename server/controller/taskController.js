const path = require('path');
const db = require('../models/buddyModel');

// controller object holding all methods.
const taskController = {};

// Modular error creator:
const createErr = (errInfo) => {
  const { method, type, err } = errInfo;
  return {
    log: err,
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
taskController.createData = async function (req, res, next) {
  try {
    // destructuring the task, startDate and endDate from req.body
    const { task, startDate, endDate } = req.body;
    const currentUser = req.query.username;

    // get the user id from the users table
    const foundUser = await db.query(
      `SELECT id FROM users WHERE username='${currentUser}'`
    );
    const userId = foundUser.rows[0].id;

    // querying to create a new task in the tasks table.
    const newTaskQuery = {
      text: `
      INSERT INTO tasks (task, startDate, endDate)
      VALUES ($1, $2, $3)
      RETURNING tasks.id;
      `,
      values: [task, startDate, endDate],
    };
    const newTask = await db.query(newTaskQuery);

    // assigning the newly inserted documents id to newTaskId
    const newTaskId = newTask.rows[0].id;

    // this query is going to insert the current user id and the newly created taskid so that they can be connected in the join table.
    const joinTableQuery = {
      text: `
      INSERT INTO userstasksjointable (userId, taskid)
      VALUES ($1, $2);
      `,
      values: [userId, newTaskId],
    };

    await db.query(joinTableQuery);
    return next();
  } catch (error) {
    return next(error);
  }
};

module.exports = taskController;
