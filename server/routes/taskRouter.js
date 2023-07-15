const express = require('express');
const router = express.router()

// Import respective controller
const taskController = require('../controller/taskController')

//& Get requests to '/api/tasks'
//& Sends back all tasks and their respective information
//& Name information will come in url parameter
router.get('/', taskController.getData, (req, res) => {
    //TODO: UPDATE VALUE INSIDE JSON
    return res.status(200).json()
});

//& Post requests to '/api/tasks/'
//& User creates new tasks
//& Name information will come in url parameter. Task information will come in POST body
router.post('/',taskController.createData, (req, res) => {
    //TODO: UPDATE VALUE INSIDE JSON
    return res.status(200).json()
});

//& Update request to '/api/tasks'
//& User updates existing tasks
//& Name information will come in url parameter. Task information will come in UPDATE body
router.update('/', taskController.updateData, (req, res) => {
    //TODO: UPDATE VALUE INSIDE JSON
    return res.status(200).json()
});

//& Deletes request to '/api/tasks'
//& User deletes existing tasks
//TODO: Name information will come in url parameter. Task information will come in DELETE body????
router.delete('/', taskController.deleteData, (req, res) => {
    //TODO: UPDATE VALUE INSIDE JSON
    return res.status(200).json()
});


module.exports = router;
