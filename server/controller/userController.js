const db = require('../models/buddyModel');

const userController = {};

//^ getUsers method to retrieve user info from db
userController.getUser = (req, res, next) => {
  //? Query string pulling the id, username, password, and name from users table on the database with the username from req.query
  const queryString =
    'SELECT id, username,password, profilepic, name FROM users WHERE username = $1';

  //? username intialized to desantitize data from req.query object
  const username = req.query.username;

  db.query(queryString, [username])
    .then((data) => {
      //? Data from query stored on res.locals.user to pass back to router
      res.locals.user = data.rows[0];
      console.log('data.rows[0].id: ', data.rows[0].id);

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
  //? Query string creating a new user by inserting id, username, password, and name into the users table on the database with the username, password, name, and profilepic from req.body
  const queryString =
    'INSERT INTO users (username, password, name, profilepic) VALUES ($1, $2, $3, $4)';

  //? desanitized variables initialized by decontructing from the req.body object
  const { username, password, name, profilepic } = req.body;
  console.log('req.body: ', req.body);

  //? values array initialized with variables
  const values = [username, password, name, profilepic];

  db.query(queryString, values)
    .then((data) => {
      console.log(data.rows)
      //? Data from query stored on res.locals.newUser to pass back to router
      res.locals.newUser = 'created';

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

userController.login = (req, res, next) => {
  const { username, password } = req.body;
  //how do we search for the username in our database
  const queryString =
    'SELECT username, password FROM users WHERE username = $1';
  db.query(queryString, [username])
    .then((data) => {
      if (data.rows[0] === undefined) {
        res.locals.key = 'false';
      } else if (data.rows[0].password === req.body.password) {
        res.locals.key = 'true';
      } else {
        res.locals.key = 'false';
      }
      console.log(res.locals.key);
      return next();
    })
    .catch((err) => {
      return next({
        status: 400,
        log: `${err}: Error on user.Controller.login`,
        message: 'Username or password is incorrect',
      });
    });
};

module.exports = userController;
