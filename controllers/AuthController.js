const Auth = require('../models/Authmodel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const register = (req, res, next) => {
    bcrypt.hash(req.body.password, 10, function(err, hashedPass) {
        if (err) {
            return res.status(500).json({
                error: err
            });
        }

        let user = new Auth({
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            password: hashedPass
        });

        user.save().then(user => {
            res.status(201).json({
                message: "User Added Successfully",
                user: user
            });
        }).catch(error => {
            res.status(500).json({
                message: "An error occurred",
                error: error
            });
        });
    });
};


const login = (req, res, next) => {
    var username = req.body.email;
    var password = req.body.password;

    Auth.findOne({ $or: [{ email: username }, { phone: username }] }).then(user => {
        if (user) {
            bcrypt.compare(password, user.password, function(err, result) {
                if (err) {
                    res.status(500).json({
                        error: err
                    });
                }
                if (result) {
                    let token = jwt.sign({ name: user.name }, 'secretValue', { expiresIn: '12h' });
                    res.json({
                        message: 'Login Successful',
                        token
                    });

                } else {
                    res.status(401).json({
                        message: 'Password does not match'
                    });
                }
            });


        } else {
            res.status(404).json({
                message: 'No user found'
            });

        }
    }).catch(err => {
        res.status(500).json({
            error: err
        });
    });
};


module.exports = {
    register, login
};
