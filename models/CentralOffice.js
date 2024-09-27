const mongoose = require('mongoose');


const CentralOffice = new mongoose.Schema({
    name:
    {
        type:String,
        require:true
    },
    department:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Department"
    },
    uid:{
        type: String,
        require: true
    },
    phone:{
        type: Number,
        require: true
    },
    emailId:{
        type:String,
        require :true
    },
    experience:{
        type: Number,
        require: true
    },
    
    password:{
        type:String,
        require: true
    }

});


module.exports=mongoose.model("CentralOffice",CentralOffice);