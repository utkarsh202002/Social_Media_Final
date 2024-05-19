const express = require("express");
const router = express.Router()
const mongoose = require("mongoose");
const USER = mongoose.model("USER");
const bcryptjs = require('bcryptjs');

const jwt = require("jsonwebtoken") // (Unique ID)
const {jwt_secret} = require("../keys");
// const requireLogin = require("../middlewares/requireLogin");


// router.get('/', (req, res) => {
//     res.send("Hello")
// })

// router.get("/createPost" ,requireLogin,(req , res) => {
//     console.log("Hello Auth");
// })


//API of signup
router.post('/signup',(req, res) => {
    // res.json("Data saved");
    const { name, userName, email, password } = req.body;
    if (!name || !email || !password || !userName) {
        return res.status(422).json({ error: "Please add all the fields" });
    }
    USER.findOne({ $or: [{ email: email }, { name: name}] }).then((savedUser) => {
        if (savedUser) {
            return res.status(422).json({ error: "User already exist with that email or userName" })
        }

        bcryptjs.hash(password, 12).then((hashedPassword) => {
            const user = new USER({
                name,
                email,
                userName,
                password: hashedPassword
            })

            user.save()
                .then(user => { res.json({ message: "Registered" }) })
                .catch(err => { console.log(err) })
        })
    })
})


//API of signin
router.post('/signin', (req, res) => {
    const { email, password } = req.body;
    if (!email || !password ) {
        return res.status(422).json({ error: "Please add all email and password" });
    }
    USER.findOne({email : email}).then((savedUser) => {
        if(!savedUser){
            return res.status(422).json({error : "Invalid Email"})
        }
        // console.log(savedUser);
        bcryptjs.compare(password ,savedUser.password)
        .then((match) => {
            if(match){
                // return res.status(200).json({message : "Signed in succesfully"})
                const token = jwt.sign({_id:savedUser.id} , jwt_secret)
                const {_id , name , email , userName} = savedUser
                res.json({token , user : {_id , name ,email ,userName}})
                console.log({token , user : {_id , name ,email ,userName}});
            }else{
                return res.status(422).json({error : "Invalid Password"})
            }
        })
        .catch(err => console.log(err))
    })
})


module.exports = router;