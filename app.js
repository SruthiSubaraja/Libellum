const express = require('express');
const  {LocalStorage} = require("node-localstorage");
const localStorage = new LocalStorage('./scratch')
const mongoose = require('mongoose');
const Student = require('./models/students');
const Request = require('./models/request');
const Staff = require('./models/staff');
const path = require('path');
const PORT = 3000;
const app = express();
const pdf = require("pdfkit");
const fs = require("fs");
//const pdfMake = require('pdfmake');
const router = express.Router();
const requestRouter = require("./requestRouter");
app.use("/requests", requestRouter);

app.post('/logout', (req, res) => {
  res.redirect('/');
});

const bodyParser = require('body-parser');
app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(__dirname + '/public'));
app.set("views", path.join(__dirname, "views"));
app.set('view engine','ejs');
app.use(bodyParser.urlencoded({ extended: true }));
let student = [];
let approval = [];

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/home", (req, res) => {
    res.render("home",{user:req.student});
  });

app.post("/homie", (req, res) => {
    res.redirect('/home');
  });

app.get("/bonafide", (req, res) => {
    res.render("bonafide");
});

// app.get("/approval", (req, res) => {
//   res.render("approval");
// });

app.get("/leave", (req, res) => {
    const user = localStorage.getItem('student');
    console.log(user);
    res.render("leave",{user : user.RegisterNo});
});

app.get("/od", (req, res) => {
  const user = localStorage.getItem('student');
  console.log(localStorage.getItem('student'))
    res.render("od",{user : user.Id});
});


mongoose.connect("mongodb://0.0.0.0:27017/bonafide", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.log(error);
  });


app.post('/addLeaveRequest', (req, res) => {
  const newRequest = new Request({
    StudentRegNo: req.body.RegNo,
    StudentName: req.body.FullName,
    StudentEmail: req.body.email,
    Type: "leave",
    Reason: req.body.reason,
    FromDate: req.body.Fromdate,
    ToDate: req.body.Todate,
    NoOfDays: 3,
    TutorApproval: false,
    ACapproval: false,
    HODapproval: false,
    PrincipalApproval: false
  });

  newRequest.save()
      .then(() => //res.send('Request added to database')
      res.render("added"))
      .catch(err => console.log(err));
});

app.post('/addODRequest', (req, res) => {
  const newRequest = new Request({
    StudentRegNo: req.body.RegNo,
    StudentName: req.body.FullName,
    StudentEmail: req.body.email,
    Type: "OD",
    Reason: req.body.reason,
    FromDate: req.body.Fromdate,
    ToDate: req.body.Todate,
    NoOfDays: 3,
    TutorApproval: false,
    ACapproval: false,
    HODapproval: false,
    PrincipalApproval: false
  });

  newRequest.save()
      .then(() => //res.send('Request added to database')
      res.render("added")
      )
      .catch(err => console.log(err));
});

app.post('/addBonafideRequest', (req, res) => {
  const newRequest = new Request({
    StudentRegNo: req.body.RegNo,
    StudentName: req.body.FullName,
    StudentEmail: req.body.email,
    Type: "Bonafide",
    Reason: req.body.reason,
    FromDate: null,
    ToDate: null,
    NoOfDays: null,
    TutorApproval: false,
    ACapproval: false,
    HODapproval: false,
    PrincipalApproval: false
  });

  newRequest.save()
      .then(() => //res.send('Request added to database')
      res.render("added"))
      .catch(err => console.log(err));
});

app.post('/approve', (req, res) => {
  const newRequest = new Request({
    StudentRegNo: req.body.RegNo,
    StudentName: req.body.FullName,
    StudentEmail: req.body.email,
    Type: "Bonafide",
    Reason: req.body.reason,
    FromDate: null,
    ToDate: null,
    NoOfDays: null,
    TutorApproval: false,
    ACapproval: false,
    HODapproval: false,
    PrincipalApproval: false
  });

  newRequest.save()
      .then(() => res.send('Request added to database'))
      .catch(err => console.log(err));
});



app.post('/login', (req, res) => {
const { Id, password } = req.body;
Student.findOne({ Id, password })
  .then(student => { 
    if (!student) {
      // If student not found, find user in staff collection by username and password
      Staff.findOne({ Id, password })
        .then(staff => {
          if (!staff) {
            res.status(401).send('Invalid credentials');
          } else {
            Staff.findOne({ Id, password })
            .then(staff => {
              if (!staff) {
                res.status(401).send('Invalid credentials');
              } else {
                Student.find({ $or: [{TutorId: staff.Id}, {AcId: staff.Id}, {HodId: staff.Id}, {PrincyId: staff.Id}] })
                  .then(students => {
                    const studentIds = students.map(student => student.Id);
                    let requestFilter = [{ StudentRegNo: { $in: studentIds } }];
                    if (students.some(student => student.PrincyId === staff.Id)) {
                      requestFilter.push({HODapproval: true});
                      requestFilter.push({PrincipalApproval : false}); 
                      requestFilter.push({Type : "Bonafide"});
                    } else if(students.some(student => student.HodId === staff.Id)) {
                      requestFilter.push({HODapproval: false});
                      requestFilter.push({ACapproval : true});
                    }else if(students.some(student => student.AcId === staff.Id)){
                      requestFilter.push({TutorApproval: true});
                      requestFilter.push({ACapproval : false});
                    }
                    else {
                      requestFilter.push({ TutorApproval: false });
                    }
                    Request.find({$and : requestFilter})
                      .then(
                        requests => {
                        res.render("approval", { appro: requests });
                        //res.render("/");
                        })
                      
                      .catch(err => {
                        console.error(err);
                        res.status(500).send('Internal server error');
                      });
                  })
                  .catch(err => {
                    console.error(err);
                    res.status(500).send('Internal server error');
                  });
              }
            })
            .catch(err => {
              console.error(err);
              res.status(500).send('Internal server error');
            });

          }
        })
        .catch(err => {
          console.error(err);
          res.status(500).send('Internal server error');
        });
    } else {
      // Redirect to student page
      localStorage.setItem('student',student);
      res.redirect("/home");
    }
  })
  .catch(err => {
    console.error(err);
    res.status(500).send('Internal server error');
  });
})

app.get("/logout",(req,res)=>{
  req.logout();
  res.redirect("/");
});

// GET all requests
// router.get('/requests', async (req, res) => {
//   try {
//     const requests = await Request.find();
//     res.json(requests);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

//update approval 1
// app.post('/updateTutorApproval', (req, res) => {
//   console.log(req.body)
//   const {reqno,approval} = req.body;
//   if (!reqno) {
//     res.status(400).send('Bad request');
//     return;
//   }
//   if(approval == 'approve'){
//     Request.findByIdAndUpdate(reqno,{$set: { TutorApproval: true }})
//       .then((re) => {
//         console.log(re);
//         res.redirect('/home');
//       })
//       .catch(err => {
//         console.error(err);
//         res.status(500).send('Internal server error');
//       });
//   }
//   else{
//     Request.deleteOne({_id : reqno}).then(()=>{
//       console.log(reqno + " deleted successfully");
//     })
//   }
// });

//update approval 2
// app.post('/updateTutorApproval', (req, res) => {
//   console.log(req.body)
//   const { reqno, approval } = req.body;
//   if (!reqno) {
//     res.status(400).send('Bad request');
//     return;
//   }
//   if (approval == 'approve') {
//     Request.findByIdAndUpdate(reqno, { $set: { TutorApproval: true } })
//       .then((re) => {
//         console.log(re);
//         res.redirect('/home');
//       })
//       .catch(err => {
//         console.error(err);
//         res.status(500).send('Internal server error');
//       });
//   }
//   else {
//     Request.deleteOne({ _id: reqno }).then(() => {
//       console.log(reqno + " deleted successfully");
//     })
//   }
// });


app.post('/updateTutorApproval', (req, res) => {
  console.log(req.body);
  const { reqno, approval } = req.body;
  if (!reqno) {
    res.status(400).send('Bad request');
    return;
  }
  if (approval === 'approve') {
    Request.findById(reqno)
      .then((request) => {
        if (!request) {
          res.status(404).send('Request not found');
          return;
        }
        if (request.TutorApproval === true && request.ACapproval === false) {
          request.ACapproval = true;
          request.HODapproval = false;
          request.PrincipalApproval = false;
        } else if(request.ACapproval === true && request.HODapproval === false) {
          request.HODapproval = true;
          request.PrincipalApproval = false;
        } else if(request.HODapproval === true && request.PrincipalApproval === false && request.Type === "Bonafide") {
          request.PrincipalApproval = true;
        } else {
          request.TutorApproval = true;
          request.ACapproval = false;
          request.HODapproval = false;
          request.PrincipalApproval = false;
        }
        return request.save();
      })
      .then(() => 
      res.send('Request has been aproved')
      //res.redirect('/approval')
      )
      .catch((err) => {
        console.error(err);
        res.status(500).send('Internal server error');
      });
  } else {
    Request.deleteOne({ _id: reqno })
      .then(() => {
        console.log(reqno + ' deleted successfully');
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send('Internal server error');
      });
  }
});



app.get('/approval', async (req, res) => {
  try {
    const approval = await Request.find();
    res.render('approval', { approval });
  } catch (error) {
    console.log(error);
    res.status(500).send('Internal server error');
  }
});

//find all students
// Student.find({}).then((res)=>{
//     student = res;
//     res.map(r =>{
//         console.log(r.Id);
//     })
// })

//find all staff
// Staff.find({}).then((res)=>{
//   console.log(res);
//   res.map(r =>{
//     console.log("hello");
//       console.log(r);
//   })
// })

//find all requests
// Request.find({}).then((res)=>{
//   // approval = res;
//   res.map(r =>{
//       console.log(r);
//   })
// })

app.listen(PORT, () => {
  console.log('Server listening on port 3000');
});
  