const User = require('../models/UsersModel')
const Users = require('../models/UsersModel')


//show the list of Users
const index = (req, res, next)=>{
    Users.find().then((response)=>{
        res.json(
            response
        )

    }).catch((error)=>{
        res.json({
            message:"An Error Occured"
        })
    })
}


//show single user
const show = (req, res, next)=>{
    let userID = req.params.id
    User.findById(userID).then(response=>{
        res.json({
            response
        })
    }).catch(error=>{
        res.json({
            Message: "An Error Occured"
        })
    })
}


const store = (req, res, next)=>{
    let user = new User({
        name: req.body.name,
        designation: req.body.designation,
        email: req.body.email,
        phone: req.body.phone,
        age: req.body.age

    })

 


    if(req.file){
        user.avatar = req.file.path
        user.save().then(response=>{
            res.json({
                message:'Users Added Successfully'
            })
        }).catch((error)=>{
            res.json({
                message: "An Errror Occcured"
            })
        })

    }
    else{
        console.log("hello")
    }

    
}


//Update a User
const update = (req, res, next)=>{
    let userID = req.params.id

    let updatedData = {
        name: req.body.name,
        designation: req.body.designation,
        email: req.body.email,
        phone: req.body.phone,
        age: req.body.age

    }

    User.findByIdAndUpdate(userID, {$set: updatedData}).then((respond)=>{
        res.json({
            "message": "User updated successfuly"
        })
    }).catch((err)=>{
        res.json({
            message:"An error occured"
        })
    })
}


//delete an User
const destroy = (req, res, next)=>{
    let userID = req.params.id
    User.findByIdAndDelete(userID).then((respnse)=>{
        res.json({
            message: "User Deleted Successfully"
        })
    }).catch((err)=>{
        res.json({
            message:"An error occured"
        })
    })

}


module.exports = {
    index, show, store, update, destroy
}