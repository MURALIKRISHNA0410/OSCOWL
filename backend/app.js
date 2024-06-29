const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
const multer=require('multer');
require("dotenv").config();

// middleware
/*const corsOptions = {
    origin: "http://localhost:3000" // frontend URI (ReactJS)
}*/
app.use(express.json());
app.use(cors());
app.use("/files",express.static("files"));

// connection to MongoDB
mongoose.connect(process.env.MONGODB_URI).then(() => {
    console.log("connected to mongodb database");

}).catch(err => {
    console.log(err);
});


//multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null,'./files')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now()
      cb(null,uniqueSuffix+file.originalname)
    }
  })
  
  require("./pdfmodel");
  const PdfSchema=mongoose.model("PdfDetails")
  const upload = multer({ storage: storage })

app.post("/apply",upload.single("file"),async(req,res)=>{
    const firstName=req.body.firstName;
    const lastName=req.body.lastName;
    const email=req.body.email;
    const contact=req.body.contact;
    const gender=req.body.gender;
    const file=req.file.filename;
    const url=req.body.url;
    const about=req.body.about;
    try{
        await PdfSchema.create({firstName:firstName,lastName:lastName,email:email,contact:contact,gender:gender,file:file,url:url,about:about})
        res.send({status:"ok"});
    }catch(error){
        res.json({status:"error"});

    }
});
const PORT = process.env.PORT || 8000
    app.listen(PORT, () => {
        console.log(`App is Listening on PORT ${PORT}`);
    })

// route

app.get("/get-details",async(req,res)=>{
    try{
        PdfSchema.find({}).then(data=>{
            res.send({status:"OK",data:data})
        })
    }catch(error){
        console.log(error);
    }
})
app.get("/", (req, res) => {
    res.status(201).json({message: "Connected to Backend!"});
});