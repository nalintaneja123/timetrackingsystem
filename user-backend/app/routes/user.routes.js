module.exports = (app) => {
    const users = require('../controllers/users.controller.js');

    // Create a new user
    app.post('/createUser', users.createUser);

    // Retrieve all users
    app.get('/users', users.findAll)

    //authenticate the user
    app.post('/authenticateUser',users.authenticateUser)


}