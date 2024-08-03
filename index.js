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




app.listen(PORT,()=>{
   console.log(`the server is listening at port no: ${PORT}`);
})

