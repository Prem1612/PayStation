//mongodb://localhost:27017/
import { MONGO_LINK } from "./config";

const mongoose= require("mongoose");
mongoose.connect(MONGO_LINK);

const userschema= new mongoose.Schema({
    username: {
        type:String,
        required:true,
        unique:true,
        trim:true,
        lowercase: true,
        minLength: 3,
        maxLength:40
    },
    password:{
        type:String,
        required:true,
        minLength:6
    },
    firstName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    }
});

const accountSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    Balance: {
        type: Number,
        required: true,
    }
});



const Account = mongoose.model('Account', accountSchema);
const User = mongoose.model('User', userschema);


module.exports={
    User,
    Account
}