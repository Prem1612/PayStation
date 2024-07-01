const express = require("express");
const {  Account } =   require("../db");
const { authMiddleware } = require("../middleware");
const { default: mongoose }=  require("mongoose");

const router = express.Router();

router.get("/balance",authMiddleware, async (req,res)=>{
    const myaccount = await Account.findOne({
        userId: req.userId
    });

    res.json({
        Balance: myaccount.Balance
    });
});

router.post("/transfer",authMiddleware, async (req,res)=>{
    const session= await mongoose.startSession();

    session.startTransaction();
    try{
        const {amount, to} = req.body;
        const account= await Account.findOne({ userId: req.userId }).session(session);

    if (!account || account.Balance < amount) {
        await session.abortTransaction();
        return res.status(400).json({
            message: "Insufficient balance"
        });
    }

    const toAccount= Account.findOne({ userId: to }).session(session);

    if (!toAccount) {
        await session.abortTransaction();
        return res.status(400).json({
            message: "Invalid account"
        });
    }

    await Account.updateOne({userId: req.userId},{$inc: {Balance: -amount} }).session(session);
    await Account.updateOne({userId: to},{$inc: {Balance: amount} }).session(session);

    await session.commitTransaction();
    }catch(err){
        await session.abortTransaction();
    session.endSession();
    console.log(err);
    throw err;
    }
    res.json({
        message: " transaction completed "
    });
});


module.exports= router;