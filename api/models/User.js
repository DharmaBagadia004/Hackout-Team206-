const mongoose = require("mongoose");
const jwt=require("jsonwebtoken");
const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
      token:{
        type: String,
        required: false,
      },
      registeredEvents:{
        type:Array,
        required: false,
      }
  },
  { timestamps: true }
);

UserSchema.methods.generatetoken = async function(){
  try{
    const token= jwt.sign({_id:this._id.toString()},process.env.TOKEN_KEY);
    this.token=token;
    await this.save();
    console.log(token);
    return token;
  }catch(e){
    console.log(e);
  }
}

module.exports = mongoose.model("User", UserSchema);
