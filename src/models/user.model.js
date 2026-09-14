import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        name: {
            type:String,
            required:[true,"user name is required"],
            trim:true,
            lowercase:true,
            minLength:2,
            maxLength:50,
        },

        email:{
            type:String,
            required:[true,"user email is required"],
            trim:true,
            lowercase:true,
            unique:true,
            minLength:2,
            maxLength:50,
            match: [/\S+@\S+\.\S+/,"please enter a valid email address"],
        },

        password:{
            type:String,
            required: [true,"user password is required"],
            minLength:6,
            select:false,
        },

    },{timestamps:true}
);

const User = mongoose.model("User",userSchema);
//commit
export default User;