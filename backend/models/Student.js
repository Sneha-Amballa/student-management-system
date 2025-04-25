const mongoose = require('mongoose');

// Define the schema for a student
const studentSchema = new mongoose.Schema({
  stu_id: { type: Number, required: true },
  stu_fname: { type: String, required: true },
  stu_lname: { type: String, required: true },
  stu_mail: { type: String, required: true },
  stu_dob: { type: Date, required: true },
  stu_enroll_year: { type: Number, required: true },
  stu_dep: { type: String, required: true },
  stu_active: { type: Boolean, default: true } 
});

module.exports = mongoose.model('Student', studentSchema);
