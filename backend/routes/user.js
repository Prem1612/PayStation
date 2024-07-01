const express= require("express");
const zod = require("zod");
const { authMiddleware } = require("../middleware");
const {User, Account} = require("../db");
const {JWT_SECRET}= require("../config");
const jwt= require("jsonwebtoken");

const router =express.Router();

const updateBody= zod.object({
	password: zod.string().optional(),
    firstName: zod.string().optional(),
    lastName: zod.string().optional(),
})

router.put("/",authMiddleware,async (req,res)=>{
    const { success } = updateBody.safeParse(req.body);
    if(!success){
        res.status(411).json({
            message: "Error while updating"
        })
    }
    console.log(req.userId);
    await User.updateOne({
        _id: req.userId
    },{$set: req.body});
    
    res.json({
        message: "Updated succesfully"
    })
});

router.get("/bulk", async (req,res)=>{
    const filter= req.query.filter || "";

    const users = await User.find({
        $or: [
            {
                firstName:{
                    "$regex": filter
                }
            },{
                lastName:{
                    "$regex": filter
                }
            }
        ]
    });


    res.json(
        {
            user: users.map(user=>({
                username: user.name,
                firstName: user.firstName,
                lastName: user.lastName,
                _id:user._id
            }))
        }
    );
});


const signupBody= zod.object({
    username: zod.string().email(),
	password: zod.string(),
    firstName: zod.string(),
    lastName: zod.string()
})

router.post("/signup", async (req,res)=>{
    const {success} = signupBody.safeParse(req.body);
    console.log(req.body);
    if(!success) {
        res.status(411).json({
            message:"incorrect email"
        });
    }

    const existing_user =await User.findOne({
        username: req.body.username
    });


    if(existing_user) {
        console.log(existing_user);
        res.status(411).json({
            message:"email already taken"
        });
    }

    const user = await User.create({
        username: req.body.username,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName
    });

    const userId= user._id;

    await Account.create({
        userId: userId,
        Balance: 1 + Math.random() * 10000
        //Balance: (Math.floor(1 + Math.random() * 1000000))/100
    });

    const token= jwt.sign({
        userId
    }, JWT_SECRET);

    res.json({
        message: "User succesfully created",
        token: token
    });
});

const signinBody= zod.object({
    username: zod.string().email(),
	password: zod.string(),
})

router.post("/signin", async (req,res)=>{
    const { success } = signinBody.safeParse(req.body)
    if (!success) {
        return res.status(411).json({
            message: "Email already taken / Incorrect inputs"
        })
    }

    const user = await User.findOne({
        username: req.body.username,
        password: req.body.password
    });

    if(user) {
        const token = jwt.sign({
            userId: user._id
        },JWT_SECRET)

        res.json({
            token: token
        })
        return;
    }

    res.status(411).json({
        message: "error while login"
    });
});

module.exports = router;