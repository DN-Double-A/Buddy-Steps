const path = require('path');
const db = require('../models/buddyModel');

// controller object holding all methods.
const taskController = {};

// Modular error creator:
const createErr = (errInfo) => {
  return {
    log: errInfo,
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
    const newErr = createErr(error);
    return next(newErr);
  }
};

//add the task to the task to table
//link the userid and the task in the task in the table.
taskController.createTask = async function (req, res, next) {
  try {
    // destructuring the task, startDate and endDate from req.body
    const { task, startDate, endDate } = req.body;
    const currentUser = req.query.username;

    // get the user id from the users table
    const foundUser = await db.query(
      `SELECT id FROM users WHERE username= $1;`,
      [currentUser]
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
      INSERT INTO userstasksjointable (userId, taskid, currprogress)
      VALUES ($1, $2, $3);
      `,
      values: [userId, newTaskId, 0],
    };
    res.locals.newTaskId = newTaskId;
    await db.query(joinTableQuery);
    return next();
  } catch (error) {
    const newErr = createErr(error);
    return next(newErr);
  }
};

taskController.updateTask = async function (req, res, next) {
  try {
    // pulling username from the query parameter in the url.
    const taskIdToBeUpdated = req.query.taskId;

    // pulling task from
    const updatedTask = req.body.updatedTask;
    const updatedEndTime = req.body.updatedEndTime;
    let updatedId;

    // query to update the task specific to that user.
    if (!updatedEndTime) {
      const updateTaskQuery = `
        UPDATE tasks
        SET task = $1
        WHERE id = $2
        RETURNING id;
      `;

      // assigning the updated task id to variable updated once done.
      updatedId = await db.query(updateTaskQuery, [
        updatedTask,
        taskIdToBeUpdated,
      ]);

      // query to update the end time specific to that user.
    } else if (!updatedTask) {
      const updateTimeQuery = `
        UPDATE tasks
        SET enddate = $1
        WHERE id = $2
        RETURNING id;
      `;

      // assigning the updated task id to variable updated once done.
      updatedId = await db.query(updateTimeQuery, [
        updatedEndTime,
        taskIdToBeUpdated,
      ]);

      // query to update both task name and end time specific to that user.
    } else if (updatedTask && updatedEndTime) {
      const updateTaskAndTimeQuery = `
        UPDATE tasks
        SET task = $1, enddate = $2 
        WHERE id = $3
        RETURNING id;
      `;

      // assigning the updated task id to variable updated once done.
      updatedId = await db.query(updateTaskAndTimeQuery, [
        updatedTask,
        updatedEndTime,
        taskIdToBeUpdated,
      ]);
    }

    // sending back updated task id to confirm it was updated.
    res.locals.updatedTaskId = updatedId.rows[0].id;
    return next();
  } catch (error) {
    const newErr = createErr(error);
    return next(newErr);
  }
};

taskController.deleteTask = async function (req, res, next) {
  try {
    // grabbing the taskId from the query parameter
    const currentTaskId = req.query.taskId;

    // query to delete the task where the task id matches
    const deleteQuery = `
    DELETE FROM tasks
    WHERE id = $1
    RETURNING id;
    `;

    // assinging the deleted id to deleted to confirm the id was deleted.
    const deleted = await db.query(deleteQuery, [currentTaskId]);
    res.locals.deleted = deleted.rows[0].id;
    return next();
  } catch (error) {
    const newErr = createErr(error);
    return next(newErr);
  }
};

module.exports = taskController;
