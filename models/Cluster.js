const mongoose = require('mongoose');

const Cluster=new mongoose.Schema({
    name:{
   type:String,
   require:true
    },

});


module.exports=mongoose.model("Cluster",Cluster);