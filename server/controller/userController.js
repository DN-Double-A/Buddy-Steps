const db = require('../models/buddyModel');

const userController = {};


//? getUsers method to  retrieve user info from db
userController.getUsers = (req, res, next) => {
    
    const queryString = 'SELECT id, username, password, name FROM users WHERE username = $1';

    const username = req.params.username;

    db.query(queryString, username)
        .then((data) => {
            res.locals.user = data.rows[0];

            return next();

        }).catch((err) => {
            return (
                next({
                    status: 400,
                    log: `${err}: Error on user.Controller.getUsers`,
                    message: 'Error getting user'
                })
            )
        })
}

userController.createUser = (req, res, next) => {
        
    const queryString = 'INSERT INTO users (username, password, name, profilepic) VALUES ($1, $2, $3, $4)';
    
    const { username, password, name, profilepic } = req.params;

    const values = [ username, password, name, profilepic ];


    db.query(queryString, values)
        .then((data) => {
            res.locals.newUser = data.rows[0];

            return next();
            
        }).catch((err) => {
            return (
                next({
                    status: 400,
                    log: `${err}: Error on user.Controller.getUsers`,
                    message: 'Error getting user'
                })
            )
        })
}

module.exports = userController;