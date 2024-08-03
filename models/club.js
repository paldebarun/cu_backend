const mongoose = require('mongoose');


const Club=new mongoose.Schema({
    name:
    {
        type:String,
        require:true
    },
    department:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Department"
    },
    institute:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Institute"
    },
    cluster:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Cluster"
    }

})

module.exports=mongoose.model("Club",Club);