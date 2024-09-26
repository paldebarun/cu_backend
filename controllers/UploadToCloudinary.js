const cloudinary = require("cloudinary").v2;

function isFileTypeSupported(type, supportedTypes) {
    return supportedTypes.includes(type);
}
 
async function uploadFileToCloudinary(file, folder, quality) {
    const options = {folder};
    console.log("temp file path", file.tempFilePath);
 
    if(quality) {
        options.quality = quality;
    }
 
    options.resource_type = "auto";
    return await cloudinary.uploader.upload(file.tempFilePath, options);
}
 
exports.imageUpload=async (req,res)=>{
  
    try{
    console.log("this is upload");
    const file = req.files.imageFile;
     console.log("this is file",file);
     const supportedTypes = ["jpg", "jpeg", "png"];
     const fileType = file.name.split('.')[1].toLowerCase();
     console.log("File Type:", fileType);
 
     if(!isFileTypeSupported(fileType, supportedTypes)) {
       return res.status(400).json({
           success:false,
           message:'File format not supported',
       })
   }
 
         console.log(" Uploading ");
         const response = await uploadFileToCloudinary(file, "cu_work");
         console.log(response);
 
 
 
         return {
          success:true,
          imageUrl:response.secure_url,
          message:'Image Successfully Uploaded',
          
      };
    }
    catch(error){
       console.error(error);
       res.status(400).json({
           success:false,
           message:'Something went wrong while uploading the file',
       });
    }
}