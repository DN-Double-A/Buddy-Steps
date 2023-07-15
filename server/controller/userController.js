const db = require('../models/buddyModel');

const userController = {};

//^ getUsers method to retrieve user info from db
userController.getUser = (req, res, next) => {

    //? Query string pulling the id, username, password, and name from users table on the database with the username from req.params 
    const queryString = 'SELECT id, username, password, name FROM users WHERE username = $1';

  //? username intialized to desantitize data from req.params object
  const username = req.params.username;

  db.query(queryString, username)
    .then((data) => {
      //? Data from query stored on res.locals.user to pass back to router
      res.locals.user = data.rows[0];

      return next();
    })
    .catch((err) => {
      return next({
        status: 400,
        log: `${err}: Error on user.Controller.getUsers`,
        message: 'Error getting user',
      });
    });
};

//^ createUsers method to create a new user on the user table from the db
userController.createUser = (req, res, next) => {
  //? Query string creating a new user by inserting id, username, password, and name into the users table on the database with the username, password, name, and profilepic from req.params
  const queryString =
    'INSERT INTO users (username, password, name, profilepic) VALUES ($1, $2, $3, $4)';

  //? desanitized variables initialized by decontructing from the req.params object
  const { username, password, name, profilepic } = req.params;

  //? values array initialized with variables
  const values = [username, password, name, profilepic];

  db.query(queryString, values)
    .then((data) => {
      //? Data from query stored on res.locals.newUser to pass back to router
      res.locals.newUser = data.rows[0];

      return next();
    })
    .catch((err) => {
      return next({
        status: 400,
        log: `${err}: Error on user.Controller.getUsers`,
        message: 'Error getting user',
      });
    });
};

module.exports = userController;
