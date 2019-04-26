const UserSchema = require('../models/user.model.js');

const mongoose=require('mongoose');
const User=mongoose.model('Users',UserSchema);



const bcrypt=require("bcrypt");
const jwt=require('jsonwebtoken');





// Create and Save a new User
exports.createUser = (req, res) => {


    if(Object.keys(req.body).length===0) {
        return res.status(400).send({
            message: "User content can not be empty"
        });
    }

    //user which is already present
    User.find({userId:req.body.userId})
        .exec()
        .then(user=>{

            if(user.length===0){
                const user = new User({

                    firstName:req.body.firstName,
                    lastName:req.body.lastName,
                    userId:req.body.userId,
                    password:bcrypt.hash(req.body.password,10,(err,hash)=>{

                        if(err)
                        {
                            return res.status(500).json({

                                error:err
                            });
                        }
                        else
                        {
                            const user=new User({
                                firstName:req.body.firstName,
                                lastName:req.body.lastName,
                                userId:req.body.userId,
                                password:hash
                            });

                            user.save()
                                .then(result=>{

                                    res.status(201).json({
                                        message:'user created'
                                    })
                                })
                                .catch(err=>{
                                    console.log(err);
                                    res.status(500).json({

                                        error:err
                                    })

                                })



                        }

                    })
                });

            }
            else
            {

                return res.status(409).json({

                    message:'user already exists'

                })

            }
        }

    )

};

// Retrieve and return all users from the database
exports.findAll = (req, res) => {

    User.find()
    .then(users => {
        console.log(users)
        res.send(users);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "error occurred while retrieving users."
        });
    });
};

// Authenticate a user with credentials
exports.authenticateUser = (req, res) => {


    User.find({userId:req.body.userId}).exec().
    then(user=>{

        if(user.length<1){

            return res.status(401).json({

              message:'Auth failed'
            });
        }
        bcrypt.compare(req.body.password,user[0].password,(err,result)=>{

           if(err)
           {
               return res.status(401).json({

                   message:'Auth failed'
               })
           }
           if(result) {
               const token = jwt.sign(
                   {
                       userId: user[0].userId
                   },
                   "secret",
                   {
                       expiresIn: "1h"
                   });
               return res.status(200).json({

                   message: 'Auth successful',
                   token: token
               })
           }

           res.status(401).json({

               message:'Auth failed',

           })


        });

    }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving users."
            });
        });

};

