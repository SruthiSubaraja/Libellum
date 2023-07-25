const express = require("express");
const router = express.Router();
const pdf = require("pdfkit");
const fs = require("fs");
const Request = require("./models/request");
const Student = require('./models/students');
const nodemailer = require("nodemailer");
const mongoose = require('mongoose');


//2
// router.get("/generate-pdf", async (req, res) => {
//     try {
//       const requests = await Request.find();
//       const PDFDocument = require("pdfkit");
//       const fs = require("fs");
//       const mongoose = require("mongoose");
  
//       const pdf = new PDFDocument();
//       pdf.pipe(fs.createWriteStream("requests.pdf"));
  
      
  
//       for (const request of requests) {
//         // pdf.fontSize(16).text(`Request ID: ${request._id}`, {
//         //   underline: true,
//         // });
//         // pdf.moveDown();
//         pdf.fontSize(20).text(`${request.Type}`, {
//             underline: true,
//             align: "center",
//           });
      
//           pdf.moveDown(2);
//         // Fetch student details from the students collection
//         const student = await mongoose.model("Student").findOne({ Id: request.StudentRegNo });
//         //if (student) {
//           pdf.fontSize(14).text(`Student Name: ${student.Name}`);
//           pdf.moveDown();
//           pdf.fontSize(14).text(`Student Department: ${student.Dept}`);
//           pdf.moveDown();
//           pdf.fontSize(14).text(`Student Year: ${student.Year}`);
//           pdf.moveDown();
//         //}
  
//         // pdf.fontSize(14).text(`Request Type: ${request.Type}`);
//         // pdf.moveDown();
//         pdf.fontSize(14).text(`Reason: ${request.Reason}`);
//         pdf.moveDown();
//         pdf.fontSize(14).text(`From Date: ${request.FromDate}`);
//         pdf.moveDown();
//         pdf.fontSize(14).text(`To Date: ${request.ToDate}`);
//         pdf.moveDown();
//         pdf.fontSize(14).text(`Number of Days: ${request.NoOfDays}`);
//         pdf.moveDown();
//         // pdf.fontSize(14).text(`Tutor Approval: ${request.TutorApproval}`);
//         // pdf.moveDown();
//         // pdf.fontSize(14).text(`AC Approval: ${request.ACapproval}`);
//         // pdf.moveDown();
//         // pdf.fontSize(14).text(`HOD Approval: ${request.HODapproval}`);
//         // pdf.moveDown();
//         // pdf.fontSize(14).text(`Principal Approval: ${request.PrincipalApproval}`);
//         // pdf.moveDown(2);
//         pdf.image("images/signature.jpg", {
//             fit: [100, 100], // size of the image
//             align: "center", // position of the image
//         });
//         pdf.moveDown(2);
//         pdf.fontSize(14).text(`Tutor signature`);
//         pdf.moveDown();
//         pdf.image("images/signature.jpg", {
//             fit: [100, 100], // size of the image
//             align: "center", // position of the image
//         });
//         pdf.moveDown(2);
//         pdf.fontSize(14).text(`Tutor signature`);
//         pdf.moveDown();
//         pdf.image("images/signature.jpg", {
//             fit: [100, 100], // size of the image
//             align: "center", // position of the image
//         });
//         pdf.moveDown(2);
//         pdf.fontSize(14).text(`Tutor signature`);
//         pdf.moveDown();
//       }
  
//       pdf.end();
//       res.send("PDF generated successfully");
//     } catch (err) {
//       console.error(err);
//       res.status(500).send("Internal Server Error");
//     }
//   });

//3
// router.get("/generate-pdf", async (req, res) => {
//     try {
//       const requests = await Request.find();
//       const students = await Student.find();
// //const student = await mongoose.model("Student").findOne({ Id: request.StudentRegNo });
//         //if (student) {
//           pdf.fontSize(14).text(`Student Name: ${student.Name}`);
//           pdf.moveDown();
//           pdf.fontSize(14).text(`Student Department: ${student.Dept}`);
//           pdf.moveDown();
//           pdf.fontSize(14).text(`Student Year: ${student.Year}`);
//           pdf.moveDown();
//       const PDFDocument = require("pdfkit");
//       const fs = require("fs");
  
//       requests.forEach((request) => {
//         const pdf = new PDFDocument();
//         pdf.pipe(fs.createWriteStream(`request-${request._id}.pdf`));
  
        
  
//         // pdf.fontSize(16).text(`Request ID: ${request._id}`, {
//         //   underline: true,
//         // });
//         //pdf.moveDown();
//         console.log(request.StudentName);
//         console.log(request.StudentEmail);
        
//         // pdf.fontSize(14).text(`Tutor Approval: ${request.TutorApproval}`);
//         // pdf.moveDown();
//         // pdf.fontSize(14).text(`AC Approval: ${request.ACapproval}`);
//         // pdf.moveDown();
//         // pdf.fontSize(14).text(`HOD Approval: ${request.HODapproval}`);
//         // pdf.moveDown();
//         // pdf.fontSize(14).text(`Principal Approval: ${request.PrincipalApproval}`);
//         // pdf.moveDown(2);
  
//         const student = students.find((s) => s._id.toString() === request.StudentRegNo.toString());
  
//         if (student) {
//         //   pdf.fontSize(16).text(`Student Details`, {
//         //     underline: true,
//         //   });
//         //   pdf.moveDown();
//           pdf.fontSize(14).text(`Name: ${student.Name}`);
//           pdf.moveDown();
//           pdf.fontSize(14).text(`Email: ${student.Email}`);
//           pdf.moveDown();
//           pdf.fontSize(14).text(`Department: ${student.Dept}`);
//           pdf.moveDown();
//           pdf.fontSize(14).text(`Year: ${student.Year}`);
//           pdf.moveDown();
//         //   pdf.fontSize(14).text(`Year of Joining: ${student.yearOfJoining}`);
//         //   pdf.moveDown();
//         //   pdf.fontSize(14).text(`Current CGPA: ${student.cgpa}`);
//         //   pdf.moveDown();
//         }
        
//         pdf.fontSize(20).text(`${request.Type}`, {
//             underline: true,
//             align: "center",
//           });
//           pdf.moveDown(2);
//         pdf.fontSize(14).text(`Student Name: ${request.StudentName}`);
//         pdf.moveDown();
//         pdf.fontSize(14).text(`Student Email: ${request.StudentEmail}`);
//         pdf.moveDown();
//         // pdf.fontSize(14).text(`${request.Type}`);
//         // pdf.moveDown();
//         pdf.fontSize(14).text(`Reason: ${request.Reason}`);
//         pdf.moveDown();
//         pdf.fontSize(14).text(`From Date: ${request.FromDate}`);
//         pdf.moveDown();
//         pdf.fontSize(14).text(`To Date: ${request.ToDate}`);
//         pdf.moveDown();
//         pdf.fontSize(14).text(`Number of Days: ${request.NoOfDays}`);
//         pdf.moveDown();
//         pdf.end();
//       });
  
//       res.send("PDFs generated successfully");
//     } catch (err) {
//       console.error(err);
//       res.status(500).send("Internal Server Error");
//     }
//   });

//4
// router.get("/generate-pdf", async (req, res) => {
//     //console.log("hey");
//     try {
//       const requests = await Request.find();
//       const PDFDocument = require("pdfkit");
//       const fs = require("fs");
  
//       const pdfPromises = requests.map((request) => {
//         return new Promise((resolve, reject) => {
//           const pdf = new PDFDocument();
//           pdf.fontSize(20).text("Requests", {
//             underline: true,
//             align: "center",
//           });
  
//           pdf.moveDown(2);
  
//           pdf.fontSize(16).text(`Request ID: ${request._id}`, {
//             underline: true,
//           });
//           pdf.moveDown();
//           pdf.fontSize(14).text(`Student Name: ${request.StudentName}`);
//           pdf.moveDown();
//           pdf.fontSize(14).text(`Student Email: ${request.StudentEmail}`);
//           pdf.moveDown();
//           pdf.fontSize(14).text(`Request Type: ${request.Type}`);
//           pdf.moveDown();
//           pdf.fontSize(14).text(`Reason: ${request.Reason}`);
//           pdf.moveDown();
//           pdf.fontSize(14).text(`From Date: ${request.FromDate}`);
//           pdf.moveDown();
//           pdf.fontSize(14).text(`To Date: ${request.ToDate}`);
//           pdf.moveDown();
//           pdf.fontSize(14).text(`Number of Days: ${request.NoOfDays}`);
//           pdf.moveDown();
//           pdf.fontSize(14).text(`Tutor Approval: ${request.TutorApproval}`);
//           pdf.moveDown();
//           pdf.fontSize(14).text(`AC Approval: ${request.ACapproval}`);
//           pdf.moveDown();
//           pdf.fontSize(14).text(`HOD Approval: ${request.HODapproval}`);
//           pdf.moveDown();
//           pdf.fontSize(14).text(
//             `Principal Approval: ${request.PrincipalApproval}`
//           );
//           pdf.moveDown(2);
          
//           const pdfFilename = `${request._id}.pdf`;
//           const writeStream = fs.createWriteStream(pdfFilename);
//           pdf.pipe(writeStream);
//           writeStream.on("finish", () => {
//             resolve({ filename: pdfFilename, request });
//           });
//         });
//       });
//       console.log("hey");
//       const pdfs = await Promise.all(pdfPromises);
//       console.log("PDFs generated successfully");
//       writeStream.on("finish", () => {
//         resolve({ filename: pdfFilename, requests });
//       });
//       writeStream.on("error", (error) => {
//         console.error(error);
//         reject(error);
//       });
//       pdf.on("error", (error) => {
//         console.error(error);
//         reject(error);
//       });
    
  
//       const transporter = nodemailer.createTransport({
//         host: "smtp.gmail.com",
//         port: 465,
//         secure: true,
//         auth: {
//           user: "sheshan.2001219@srec.ac.in",
//           pass: "ilovemyself",
//         },
//       });
  
//       const mailOptions = {
//         from: "sheshan.2001219@srec.ac.in",
//         to: "`${request.StudentEmail}`",
//         subject: "PDF attachments",
//         text: "Please find the attached PDFs",
//         attachments: pdfs.map((pdf) => {
//           return { filename: pdf.filename, path: pdf.filename };
//         }),
//       };
  
//       transporter.sendMail(mailOptions, (error, info) => {
//         if (error) {
//           console.log(error);
//           res.status(500).send("Error sending email");
//         } else {
//           console.log("Email sent successfully");
//           res.send("PDFs generated and sent via email");
//         }
  
//         // pdfs.forEach((pdf) => {
//         //   fs.unlink(pdf.filename, (err) => {
//         //     if (err) console.log(err);
//         //     console.log(`Deleted ${pdf.filename}`);
//         //   });
//         // });
//       });
//     } catch (err) {
//       console.error(err);
//       res.status(500).send("Internal Server Error");
//     }
//   });

//5

router.get("/generate-pdf", async (req, res) => {
  try {
    const students = await Student.find();  
    const requests = await Request.find({ StudentRegno: students.Id, TutorApproval: true,
            ACapproval: true,
            HODapproval: true,
            PrincipalApproval: true, }); 
    const PDFDocument = require("pdfkit");
    const fs = require("fs");
    const pdfPromises = requests.map((request) => {
      return new Promise((resolve, reject) => {
        const pdf = new PDFDocument();
          // pdf.fontSize(14).text(`Request Type: ${request.Type}`);
          // pdf.moveDown();
        if(request.Type === "leave" || request.Type === "OD") {
          pdf.fontSize(20).text(`${request.Type}`, {
            underline: true,
            align: "center",
          });
          pdf.moveDown();
          pdf.fontSize(14).text(`Student Name: ${request.StudentName}`);
          pdf.moveDown();
          pdf.fontSize(14).text(`Student Email: ${request.StudentEmail}`);
          pdf.moveDown();
          pdf.fontSize(14).text(`Reason: ${request.Reason}`);
          pdf.moveDown();
          pdf.fontSize(14).text(`From Date: ${request.FromDate}`);
          pdf.moveDown();
          pdf.fontSize(14).text(`To Date: ${request.ToDate}`);
          pdf.moveDown();
          pdf.fontSize(14).text(`Number of Days: ${request.NoOfDays}`);
          pdf.moveDown();
          pdf.image("images/tutor.jpeg", {
            fit: [100, 100], // size of the image
            align: "center",// position of the image
          });
          pdf.moveDown();
          pdf.fontSize(14).text(`Tutor signature`);
          pdf.moveDown();
          pdf.image("images/AC.jpeg", {
            fit: [100, 100], // size of the image
            align: "center", // position of the image
          });
          pdf.moveDown();
          pdf.fontSize(14).text(`Academic Coordinator signature`);
          pdf.moveDown();
          pdf.image("images/HOD.jpeg", {
            fit: [100, 100], // size of the image
            align: "center",// position of the image
          });
          pdf.moveDown();
          pdf.fontSize(14).text(`HOD signature`);
        } else {
          pdf.image("images/bonaHeader.jpg", {
            fit: [500, 500], // size of the image
            align: "center", // position of the image
          });
          pdf.moveDown();
          pdf.fontSize(14).text(`This is to certify that Mr/Ms ${request.StudentName} bearing roll no ${request.StudentRegNo} is a student of the deparment of CSE of year 3 for the academic year 2022 - 2023. He/She is a bonafide student of Sri Ramakrishna Engineering college`);
          pdf.moveDown();
          pdf.fontSize(14).text(`Date: `);
          pdf.moveDown();
          pdf.fontSize(14).text(`Place: Coimbatore`);
          pdf.moveDown();
          pdf.image("images/admin.jpeg", {
            fit: [100, 100], // size of the image
            align: "center", // position of the image
          });
          pdf.moveDown();
          pdf.fontSize(14).text(`admin approval`);
        }
        pdf.end();
        const pdfFilename = `${request._id}.pdf`;
        const writeStream = fs.createWriteStream(pdfFilename);
        pdf.pipe(writeStream);
        writeStream.on("finish", () => {
          resolve({ filename: pdfFilename, request:request });
        });
      });
    });
    const pdfs = await Promise.all(pdfPromises);
    console.log("PDFs generated successfully");
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: 'sheshan.2001219@srec.ac.in',
        pass: 'ilovemyself',
      },
    });

    const mailOptions = {
      from: 'sheshan.2001219@srec.ac.in',
      to: 'sruthi.2001232@srec.ac.in',
      subject: "PDF attachments",
      text: "Please find the attached PDFs",
      attachments: pdfs.map((pdf) => {
        console.log(__dirname);
        return { filename: pdf.filename, path: `${__dirname}/${pdf.filename}` };
      }),
    };
  
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        res.status(500).send("Error sending email");
      } else {
        console.log("Email sent successfully");
        res.send("PDFs generated and sent via email");
      }
    });
  }
  catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

//6
// router.get("/generate-pdf", async (req, res) => {
//   try {
//       const studentEmails = new Set(); // Create a set to store unique student emails
//       const requests = await Request.find({
//           TutorApproval: true,
//           ACapproval: true,
//           HODapproval: true,
//           PrincipalApproval: true,
//       }).populate("StudentRegNo");

//       const PDFDocument = require("pdfkit");
//       const fs = require("fs");
//       const nodemailer = require("nodemailer");

//       const pdfPromises = requests.map((request) => {
//           const student = request.StudentRegno;
//           if (!studentEmails.has(student.Email)) { // Check if the email has already been added
//               studentEmails.add(student.Email); // Add email to set
//               return new Promise((resolve, reject) => {
//                   const pdf = new PDFDocument();
//                   pdf.fontSize(20).text(`${request.Type}`, {
//                       underline: true,
//                       align: "center",
//                   });

//                   pdf.moveDown();
//                   pdf.fontSize(14).text(`Student Name: ${request.StudentName}`);
//                   pdf.moveDown();
//                   pdf.fontSize(14).text(`Student Email: ${request.StudentEmail}`);
//                   pdf.moveDown();
//                   if (request.Type === "Leave" || request.Type === "OD") {
//                       pdf.fontSize(14).text(`Reason: ${request.Reason}`);
//                       pdf.moveDown();
//                       pdf.fontSize(14).text(`From Date: ${request.FromDate}`);
//                       pdf.moveDown();
//                       pdf.fontSize(14).text(`To Date: ${request.ToDate}`);
//                       pdf.moveDown();
//                       pdf.fontSize(14).text(`Number of Days: ${request.NoOfDays}`);
//                       pdf.moveDown();
//                   }
//                   pdf.image("images/tutor.jpeg", {
//                       fit: [100, 100],
//                       align: "center",
//                   });
//                   pdf.moveDown();
//                   pdf.fontSize(14).text(`Tutor signature`);
//                   pdf.moveDown();
//                   pdf.image("images/AC.jpeg", {
//                       fit: [100, 100],
//                       align: "center",
//                   });
//                   pdf.moveDown();
//                   pdf.fontSize(14).text(`Academic Coordinator signature`);
//                   pdf.moveDown();
//                   pdf.image("images/HOD.jpeg", {
//                       fit: [100, 100],
//                       align: "center",
//                   });
//                   pdf.moveDown();
//                   pdf.fontSize(14).text(`HOD signature`);
//                   pdf.image("images/admin.jpeg", {
//                       fit: [100, 100],
//                       align: "center",
//                   });
//                   pdf.moveDown();
//                   pdf.fontSize(14).text(`Admin approval`);
//                   pdf.end();

//                   const pdfFilename = `${request.StudentName}-${request.Type}-${request._id}.pdf`;
//                   const writeStream = fs.createWriteStream(pdfFilename);
//                   pdf.pipe(writeStream);
//                   writeStream.on("finish", async () => {
//                       // Send email to student with the generated PDF as attachment
//                       console.log(request.student.email);
//                       // const info = await transporter.sendMail({
//                       //     from: 'sheshan.2001219@srec.ac.in',
//                       //     //to: student.email,
//                       //     subject: `Your ${request.Type} Request Approval`,
//                       //     html: `<p>Hello ${request.StudentName},</p><p>Your ${request.Type} request has been approved.</p><p>Please find the approved request PDF attached to this email.</p>`,
//                       //     attachments: [{
//                       //         filename: pdfFilename,
//                       //         path: pdfFilename
//                       //     }]
//                       // });
//                       const transporter = nodemailer.createTransport({
//                         host: "smtp.gmail.com",
//                         port: 465,
//                         secure: true,
//                         auth: {
//                             user: 'sheshan.2001219@srec.ac.in',
//                             pass: 'ilovemyself',
//                         },
//                     });
//                     console.log(request.StudentEmail);
            
//                     const mailOptions = {

//                         from: 'sheshan.2001219@srec.ac.in',
                        
//                         //to: request.StudentEmail,  // only send email to the student who made the request
//                         subject: 'Your Request has been Approved',
//                         text: `Dear ${request.StudentName},\n\nYour ${request.Type} request has been approved.\n\nRegards,\nAdmin`,
//                         attachments: [
//                             { filename: pdfFilename, path: pdfFilename }
//                         ]
//                     };
            
//                     transporter.sendMail(mailOptions, (error, info) => {
//                         if (error) {
//                             console.log(error);
//                             reject(error);
//                         } else {
//                             console.log(`Email sent to ${request.StudentEmail}: ${info.response}`);
//                             resolve({ filename: pdfFilename, request: request });
//                         }
//                     });
//                 });
//             });
//                       console.log(`Email sent to ${student.email}: ${info.messageId}`);
//                       resolve();
//   }});
              
//                 }
//       catch (err) {
//         console.error(err);
//         res.status(500).send("Internal Server Error");
//       }
      
//     })


module.exports = router;
