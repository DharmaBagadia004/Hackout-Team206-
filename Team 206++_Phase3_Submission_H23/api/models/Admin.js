const mongoose = require("mongoose");
const jwt=require("jsonwebtoken");
const AdminSchema = new mongoose.Schema(
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
      }
  },
  
  { timestamps: true }
);

AdminSchema.methods.generatetoken = async function(){
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

module.exports = mongoose.model("Admin", AdminSchema);
