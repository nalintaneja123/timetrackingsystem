# timetrackingsystem

#   Back End-Node.JS
1.To run the application please install robo 3t for running mongodb.Then make a database by the name of 'userssignup'

2.If you want you can put dummy data in the database with fields such as firstName,lastName,userId,password

3.To run the back end you need to run the following command 'nodemon server.js'

4.To check whether it is fetching data from the api the following are the endpoints

-http://localhost:5000/users
-http://localhost:5000/createUser
-http://localhost:5000/authenticateUser


#   Front end-React.JS


To run the application please input the command 'npm start'

Make sure that the back end is also running simultaneously else data from the api wouldnt be fetched

I have provided the following screens

-Header-this is the screen initially displayed

-Login-this is the screen which is redirected from login screen

-Signup-this can be redirected from the login screen

-Timer - this is the screen from where the user can start,stop and reset the timer

The route to connect the backend is http://localhost:5000/ which has been placed as a 'proxy' in the package.json file in front-end application

The server on the front end is running on http://localhost:3000/
