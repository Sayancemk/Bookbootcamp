import mongoose from "mongoose";

const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true,
        trim:true,
    },
    email:{
        type:String,
        requred:true,
        unique:true,
        trim:true,
    },
    password:{
        type:String,
        required:true,
    },
    address:{
        type:String,
        required:true,
    },
    gender: {
        type: String,
        enum: ["F", "M", "O"]
    },
    avatar:{
        type:String,
       
    },
    role:{
        type:String,
        default:"user",
        enum:["user","admin"]
    },

   
    favourites:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Books'
        },
    ],
    cart:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Books',
        },
],
    orderHistory:[
        {
            type:mongoose.Schema.Types.ObjectId ,
            ref:'Orders',
        }
],
    
 
},
{timestamps:true}
);
const User=mongoose.model('user',userSchema);

export{
    User,
}