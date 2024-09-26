const mongoose = require('mongoose');

const CentralOffice=new mongoose.Schema({
    name:{
   type:String,
   require:true
    },
    email:{
        type: String,
        require: true
    },
    eid:{
        type: String,
        require: true
    },
    password:{
        type: String,
        require: true
    }

});


module.exports=mongoose.model("CentralOffice",CentralOffice);