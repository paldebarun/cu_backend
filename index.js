const express=require('express');
const app=express();
const cors = require('cors');
app.use(express.json());
require('dotenv').config();

app.use(cors({
    credentials : true,
    origin:true
}));
const fileupload = require("express-fileupload");
app.use(fileupload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
}));

const PORT=process.env.PORT || 8000;

const {databaseConnect}=require('./config/database');
databaseConnect();

const cloudinary = require("./config/cloudinary");
cloudinary.cloudinaryConnect();

const clusterRoutes=require('./routes/clustersRoutes');
app.use('/api/clusterRoute',clusterRoutes);

const departmentRoutes=require('./routes/departmentRoutes');
app.use('/api/departmentRoutes',departmentRoutes);

const instituteRoutes=require('./routes/instituteRoutes');
app.use('/api/instituteRoutes',instituteRoutes);

const clubRoutes=require('./routes/clubRoute');
app.use('/api/clubRoutes',clubRoutes);

const departmentalSocietiesRoutes=require('./routes/departmentSocieties');
app.use('/api/deptSocieties',departmentalSocietiesRoutes);


const professionalSocietiesRoutes=require('./routes/professionalSocieties');
app.use('/api/proffSocieties',professionalSocietiesRoutes);

const communitiesRoutes=require('./routes/communitiesRoutes');
app.use('/api/communitiesRoutes',communitiesRoutes);

const studentRepRoutes=require('./routes/studentRepCreateRoutes');
app.use('/api/studentRep',studentRepRoutes);

const facultyAdvRoutes=require('./routes/facultyAdvisorRoutes');
app.use('/api/facultyAdv',facultyAdvRoutes);

const loginRoute=require('./routes/loginRoutes');
app.use('/api/login',loginRoute);

const eventRoute = require('./routes/eventRoute');
app.use('/api/event',eventRoute);

app.listen(PORT,()=>{
   console.log(`the server is listening at port no: ${PORT}`);
})

