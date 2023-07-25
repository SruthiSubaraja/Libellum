const mongoose = require("mongoose");

const RequestSchema = new mongoose.Schema({
    StudentRegNo: String,
    StudentName: String,
    StudentEmail: String,
    Type: String,
    Reason: String,
    FromDate: Date,
    ToDate: Date,
    NoOfDays: Number,
    TutorApproval: Boolean,
    ACapproval: Boolean,
    HODapproval: Boolean,
    PrincipalApproval: Boolean
  });

  // Create a model for the schema
  const Request = mongoose.model('Request', RequestSchema,'request');
  module.exports = Request;
  
