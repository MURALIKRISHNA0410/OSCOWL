const mongoose=require("mongoose");

const pdfDetailsSchema =new mongoose.Schema(
    {
        firstName:String,
        lastName:String,
        email:String,
        contact:String,
        gender:String,
        file:String,
        url:String,
        about:String
    },{collection:"Pdfdetails"}
)

mongoose.model("PdfDetails",pdfDetailsSchema)