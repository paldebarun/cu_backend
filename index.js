const express=require('express');
const app=express();
const cors = require('cors');
app.use(express.json());
require('dotenv').config();

app.use(cors());

const PORT=process.env.PORT || 8000;
const fileupload = require("express-fileupload");
app.use(fileupload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
}));
 

const {databaseConnect}=require('./config/database');
databaseConnect();

const cloudinary = require("./config/cloudinary");
cloudinary.cloudinaryConnect();


const verifyToken = require('./middlewares/verifyToken'); 
const StudentRep = require('./models/studentRep');
const Faculty = require('./models/facultyAdvisor');
const CentralOffice = require('./models/centralOffice');
const Club = require('./models/club');
const DepartmentalSocieties = require('./models/DepartmentalSocieties');
const ProfessionalSocieties = require('./models/ProfessionalSocieties');
const Communities = require('./models/Communities');
const Event = require("./models/event");

async function getEntityCounts(){
  try {
    const clubCount = await Club.countDocuments({});
    const communityCount = await Communities.countDocuments({});
    const departmentalSocietyCount = await DepartmentalSocieties.countDocuments({});
    const professionalSocietyCount = await ProfessionalSocieties.countDocuments({});

    const formattedOutput = {
      clubs: {
        label: "Club",
        count: clubCount
      },
      communities: {
        label: "Community",
        count: communityCount
      },
      departmentalSocieties: {
        label: "Departmental Society",
        count: departmentalSocietyCount
      },
      professionalSocieties: {
        label: "Professional Society",
        count: professionalSocietyCount
      }
    };

    return { success: true, data: formattedOutput };
  } catch (error) {
    console.error('Error fetching counts:', error);
    return{ success: false, message: 'Server Error' };
  }
}
async function getEventCounts(){
  try {
    const weekly = await Event.countDocuments({Eventtype:'weekly'});
    const monthly = await Event.countDocuments({Eventtype:'monthly'});
    const flagship = await Event.countDocuments({Eventtype:'flagship'});
  
    return{
      weekly: weekly,
      monthly: monthly,
      flagship: flagship
    };
  } catch (error) {
    console.error('Error fetching event counts:', error);
    return{ error: 'An error occurred while fetching event counts' };
  }
}

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
 
const centralRoute = require('./routes/centralRoutes');
app.use('/api/central',centralRoute);

const eventRoute = require('./routes/eventRoute');
app.use('/api/event',eventRoute);

app.get('/api/me',verifyToken,async(req,res)=>{
   try {
      // req.user will contain the decoded user info (id and role)
      const { id, role } = req.user;
  
      let user;
      if (role === 'Student Rep') {
        user = await StudentRep.findById(id);
      } else if (role === 'Faculty') {
        user = await Faculty.findById(id);
      } else if (role === 'Central Office') {
        user = await CentralOffice.findById(id);
      }
  
      if (!user) {
        return res.status(404).json({ success: false, message: 'User not found' });
      }
  
      return res.status(200).json({
        success: true,
        user: {
          name: user.name || user.eid || user.uid,
          role,
          // You can include more user details here
        },
      });
    } catch (error) {
      return res.status(500).json({ success: false, message: `Server error: ${error.message}` });
    }
});
app.get('/api/entity-counts', async (req, res) => {
  try {
    const counts = await getEntityCounts();
    res.json(counts);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching entity counts' });
  }
});

app.get('/api/event-counts',async(req,res)=>{
  try{
    const counts = await getEventCounts();
    res.status(201).json({
      success:true,
      data:counts
    });
  }
  catch(error){
    res.status(500).json({message: 'Error fetching events count'});
  }
})




app.listen(PORT,()=>{
   console.log(`the server is listening at port no: ${PORT}`);
})

