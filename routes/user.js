const express = require("express");
const router = express.Router()
const mongoose = require("mongoose");

const POST = mongoose.model("POST")
const USER = mongoose.model("USER");

const requireLogin = require("../middlewares/requireLogin");

//To other user Porfile
// router.get("/currentuser", requireLogin, (req, res) => {
//     //    console.log(req.user)

//     USER.find({ post: req.user})
//     .then(info => {
//         res.json(info)
//     })

// })


router.get("/currentuser1" ,requireLogin, (req , res)=> {
    USER.find()
    .then(users => res.json(users))
    .catch(err => console.log(err))
})



router.get("/profiledata", requireLogin, async(req, res) => {
    //    console.log(req.user)

    const user = await USER.findOne({_id : req.user._id})
    const post = await POST.find({postedBy : req.user._id})
    // USER.find({ post: req.user})
    return res.json({user , post})
    
    

})


//To get other user Porfile
router.get("/user/:id", (req, res) => {
    USER.findOne({ _id: req.params.id })
        .select("-password")
        .then(user => {          
            POST.find({ postedBy: req.params.id })
                .populate("postedBy", "_id")
                // .exec((err, post) => {
                //     if (err) {
                //         return res.status(422).json({ error: err })
                //     }
                //     res.status(200).json({ user, post })
                // })

               
    .then(post => {
        res.status(200).json({ user, post });
    })
    .catch(err => {
        res.status(422).json({ error: err });
    });
        }).catch(err => {
            return res.status(404).json({ error: "User not FOUND!!!" })
        })
})

//To follow a user

// router.put("/follow", requireLogin, (req, res) => {
//     USER.findByIdAndUpdate(req.body.followId, {
//         $push: { followers: req.user._id }
//     }, {
//         new: true
//     }, (err, result) => {
//         if (err) {
//             return res.status(422).json({ error: err })
//         }
//         USER.findByIdAndUpdate(req.user._id, {
//             $push: { following: req.body.followId }
//         }, {
//             new: true
//         }).then(result => {
//             res.json(result)

//         })
//             .catch(err => { return res.status(422).json({ error: err }) })
//     }
//     )
// })

router.put("/follow", requireLogin, async (req, res) => {
    try {
        const updatedUser = await USER.findByIdAndUpdate(req.body.followId, {
            $push: { followers: req.user._id }
        }, {
            new: true
        }).exec();

        const currentUser = await USER.findByIdAndUpdate(req.user._id, {
            $push: { following: req.body.followId }
        }, {
            new: true
        }).exec();

        res.json(currentUser);
    } catch (err) {
        res.status(422).json({ error: err.message });
    }
});


//To Unfollow a user

// router.put("/unfollow", requireLogin, (req, res) => {
//     USER.findByIdAndUpdate(req.body.followId, {
//         $pull: { followers: req.user._id }
//     }, {
//         new: true
//     }, (err, result) => {
//         if (err) {
//             return res.status(422).json({ error: err })
//         }
//         USER.findByIdAndUpdate(req.user._id, {
//             $pull: { following: req.body.followId }
//         }, {
//             new: true
//         }).then(result => res.json(result))
//             .catch(err => { return res.status(422).json({ error: err }) })
//     }
//     )
// })


router.get("/userProfile/:id", requireLogin, (req, res) => {
    USER.findById(req.params.id)
    .then(info => {
        res.json(info);
    })
    .catch(err => {
        res.status(400).json({ error: "User not found" });
    });
});

router.put("/unfollow", requireLogin, (req, res) => {
    USER.findByIdAndUpdate(req.body.followId, {
        $pull: { followers: req.user._id }
    }, { new: true })
    .then(result => {
        return USER.findByIdAndUpdate(req.user._id, {
            $pull: { following: req.body.followId }
        }, { new: true });
    })
    .then(updatedUser => {
        res.json(updatedUser);
    })
    .catch(err => {
        res.status(422).json({ error: err });
    });
});

// to upload avatar image on profile
router.put("/uploadProfilePic", requireLogin, (req, res) => {
    USER.findByIdAndUpdate(req.user._id, {
        $set: { Photo: req.body.pic }
    }, {
        new: true
    })  .then(result => {
        res.json(result);
    })
    .catch(err => {
        res.status(422).json({ error: err });
    });
})


module.exports = router;