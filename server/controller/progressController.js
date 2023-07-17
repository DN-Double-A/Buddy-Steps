const path = require('path');
const db = require('../models/buddyModel');

// controller object holding all methods.
const progressController = {};
//& For a taskId + username gets the progress
//& taskId comes as a number, username as a string
progressController.getProgress = async function (req, res, next) {
  try {
    //~ Get task and username from POST body
    const { taskId, username } = req.body;

    //~ Get userId from User table
    let queryString = `SELECT id as userId FROM Users
        WHERE username = $1`;
    let result = await db.query(queryString, [username]);
    const userId = Number(result.rows[0].userid);

    //~ Get the current progress for that task and username
    queryString = `SELECT * FROM userstasksjointable
        WHERE userid=$1 AND taskid=$2`;
    result = await db.query(queryString, [userId, taskId]);

    //~ Pass it back
    res.locals.data = result.rows[0];
    console.log(res.locals.data);
    return next();
  } catch (err) {
    const log = `Error occuring in progressController.getProgress: ${err}`;
    const message = { err: 'Error occured on server side' };
    return next({ log: log, message: message });
  }
};

//& taskId + username + newProgressDate => update taskcurrdate
//& taskId comes as a number, username as a string, newProgressDate as String
progressController.setProgress = async function (req, res, next) {
  try {
    //~ Get task and username from PATCH body
    const { taskId, username, newProgressDate } = req.body;

    //~ Get userId from User table
    let queryString = `SELECT id as userId FROM Users
        WHERE username = $1`;

    let result = await db.query(queryString, [username]);
    const userId = Number(result.rows[0].userid);

    console.log('query string: ', [newProgressDate, userId, taskId]);
    //~ Using taskId and userId, update taskcurrdate (newProgressDate)
    queryString = `UPDATE userstasksjointable
        SET taskcurrdate = $1
        WHERE userid = $2 AND taskid = $3
        RETURNING *;`;
    result = await db.query(queryString, [newProgressDate, userId, taskId]);

    //~ Pass back updated data
    res.locals.data = result.rows[0];
    return next();
  } catch (err) {
    const log = `Error occuring in progressController.setProgress: ${err}`;
    const message = { err: 'Error occured on server side' };
    return next({ log: log, message: message });
  }
};

module.exports = progressController;
