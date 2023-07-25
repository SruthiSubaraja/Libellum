const mongoose = require("mongoose");

const StaffSchema = new mongoose.Schema({
    Id: String,
    Name: String,
    Email: String,
    PhoneNo: String,
    password: String,
    Role: String,
    Signature: {
      data: Buffer,
      contentType: String
    }
  });
  
  // Create a model for the schema
  const Staff = mongoose.model('Staff', StaffSchema,'staff');
  module.exports = Staff;