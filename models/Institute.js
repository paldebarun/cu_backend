const mongoose = require('mongoose');

const Institute=new mongoose.Schema({
    name:{
   type:String,
   require:true
    },

});


module.exports=mongoose.model("Institute",Institute);