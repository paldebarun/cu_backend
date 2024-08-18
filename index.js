const express=require('express');
const app=express();
const cors = require('cors');
app.use(express.json());
require('dotenv').config();

app.use(cors({
    credentials : true,
    origin:true
}));

const PORT=process.env.PORT || 8000;

const {databaseConnect}=require('./config/database');
databaseConnect();




const departmentRoutes=require('./routes/departmentRoutes');
app.use('/api/departmentRoutes',departmentRoutes);


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

app.listen(PORT,()=>{
   console.log(`the server is listening at port no: ${PORT}`);
})

