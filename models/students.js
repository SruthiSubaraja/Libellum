const mongoose = require("mongoose");

const StudentSchema = new mongoose.Schema({
    
    Name: String,
    Dept: String,
    Year: String,
    Email: String,
    PhoneNo: String,
    TutorId: String,
    AcId: String,
    HodId: String,
    PrincyId: String,
    password: String,
    role: String,
    Id: String
  });
  
  // Create a model for the schema
  const Student = mongoose.model('Student', StudentSchema,'student');
  module.exports = Student;