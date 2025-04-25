const express = require('express');
const router = express.Router();
const Student = require('../models/Student');

// Display home page with students
router.get('/', async (req, res) => {
  try {
    const students = await Student.find();
    res.render('home', { 
      students,
      alert: req.query.alert,
      alertType: req.query.type 
    });
  } catch (err) {
    res.redirect('/?alert=Error fetching students&type=error');
  }
});

// Add new student
router.post('/add', async (req, res) => {
  try {
    const newStudent = new Student({
      stu_id: req.body.stu_id,
      stu_fname: req.body.stu_fname,
      stu_lname: req.body.stu_lname,
      stu_mail: req.body.stu_mail,
      stu_dob: req.body.stu_dob,
      stu_enroll_year: req.body.stu_enroll_year,
      stu_dep: req.body.stu_dep,
      stu_active: req.body.stu_active === 'true'
    });
    
    await newStudent.save();
    res.redirect('/?alert=Student added successfully!&type=success');
  } catch (err) {
    console.error("Error saving student:", err);
    res.redirect('/?alert=Error saving student: ' + err.message + '&type=error');
  }
});

// Display edit form
router.get('/edit/:id', async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    res.render('edit', { 
      student,
      alert: req.query.alert,
      alertType: req.query.type 
    });
  } catch (err) {
    console.error("Error fetching student:", err);
    res.redirect('/?alert=Error fetching student details&type=error');
  }
});

// Handle edit submission
router.post('/edit/:id', async (req, res) => {
  try {
    await Student.findByIdAndUpdate(req.params.id, {
      stu_id: req.body.stu_id,
      stu_fname: req.body.stu_fname,
      stu_lname: req.body.stu_lname,
      stu_mail: req.body.stu_mail,
      stu_dob: req.body.stu_dob,
      stu_enroll_year: req.body.stu_enroll_year,
      stu_dep: req.body.stu_dep,
      stu_active: req.body.stu_active === 'true'
    });
    res.redirect('/?alert=Student updated successfully!&type=success');
  } catch (err) {
    console.error("Error updating student:", err);
    res.redirect(`/edit/${req.params.id}?alert=Error updating student&type=error`);
  }
});

// Handle delete
router.post('/delete/:id', async (req, res) => {
  try {
    await Student.findByIdAndDelete(req.params.id);
    res.redirect('/?alert=Student deleted successfully!&type=success');
  } catch (err) {
    console.error("Error deleting student:", err);
    res.redirect('/?alert=Error deleting student&type=error');
  }
});

module.exports = router;