const mongoose = require('mongoose');


const Communities=new mongoose.Schema({
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
        type:String,
        require:true
    },
    cluster:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Cluster"
    }

});


module.exports=mongoose.model("Communities",Communities);