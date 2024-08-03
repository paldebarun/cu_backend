const mongoose = require('mongoose');

const Department=new mongoose.Schema({
    name:{
   type:String,
   require:true
    },

});


module.exports=mongoose.model("Department",Department);