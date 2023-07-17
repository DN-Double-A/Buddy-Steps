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

        //~ Get the current progress for that task and userId
        queryString =
            `SELECT * FROM userstasksjointable
        WHERE userid=$1 AND taskid=$2`
        result = await db.query(queryString, [userId, taskId])

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

//& taskId + username + newprogress => update taskcurrdate
//& taskId comes as a number, username as a string, newprogress as int 
progressController.setProgress = async function (req, res, next) {
    try {
        //~ Get task and username from PATCH body
        const { taskId, username, newprogress } = req.body;

    //~ Get userId from User table
    let queryString = `SELECT id as userId FROM Users
        WHERE username = $1`;

        let result = await db.query(queryString, [username])
        const userId = Number(result.rows[0].userid)
        // console.log(req.body)
        // console.log('query string: ', [newprogress, userId, taskId])
        //~ Using taskId and userId, update taskcurrdate (newProgress)
        queryString = 
        `UPDATE userstasksjointable
        SET currprogress = $1
        WHERE userid = $2 AND taskid = $3
        RETURNING *;`
        result = await db.query(queryString, [newprogress, userId, taskId] )

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


// progressController.getProgress = async function (req, res, next) {
//     try {
//         //~ Get task and username from POST body
//         const { tasksList, username } = req.body;

//         //~ Get userId from User table
//         let queryString =
//             `SELECT id as userId FROM Users
//                  WHERE username = $1`;
//         let result = await db.query(queryString, [username])
//         const userId = Number(result.rows[0].userid)
//         console.log('userId',userId)
//         console.log(tasksList)
//         const data = {}
//         for (let i = 0; i < tasksList.length; i++) {
//             //~ Get the current progress for that task and userId
//             queryString =
//                 `SELECT * FROM userstasksjointable
//                 WHERE userid=$1 AND taskid=$2`
//             result = await db.query(queryString, [userId, tasksList[i]])
//             data[tasksList[i]] = result.rows[0];
//         }

//         //~ Pass it back
//         res.locals.data = data
//         console.log(res.locals.data)
//         return next()

//     }
//     catch (err) {
//         const log = `Error occuring in progressController.getProgress: ${err}`;
//         const message = { err: 'Error occured on server side' };
//         return next({ log: log, message: message });
//     }
// };