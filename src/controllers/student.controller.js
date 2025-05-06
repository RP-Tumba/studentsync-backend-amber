/**
 * This file contains the controller functions related to student operations.
 * Currently, it includes a function to retrieve all students from the database.
 *
 * Add more functions here to handle other student-related operations (e.g., create, update, delete).
 */
import pool from "../config/db.js";
import { logger } from "../utils/index.js";

export const getAllStudents = async (req, res) => {
  try {
    const students = await pool.query("SELECT * FROM students");
    res.status(200).json({
      success: true,
      count: students.rows.length,
      data: students.rows,
    });
  } catch (err) {
    logger.error(err.message);
    res.status(500).json({
      success: false,
      message: `An unexpected error occurred in GET/STUDENTS, ${err?.message}`,
    });
  }
};

export const updateStudent= async(req,res)=>{
  try {
    const {id}=req.params;
    const {first_name,last_name,student_id,email,date_of_birth,contact_number,enrollment_date,profile_picture}=req.body;
      
     
    const updateStudent= `UPDATE students SET first_name='${first_name}',last_name ='${last_name}',
    student_id = '${student_id}',email ='${email}',date_of_birth ='${date_of_birth}',contact_number ='${contact_number}',
    enrollment_date ='${enrollment_date}',profile_picture ='${profile_picture}' WHERE id= ${id}`
    const updatedstudent= await pool.query(updateStudent);

    if(updatedstudent.rowCount === 0){
      return res.status(400).json({
        success:false,
        message:"The new student was not recorded"
      })
    }
    res.status(200).json({
      success:true,
      message:"the students data was recorded successfully",
      data:updatedstudent.rows[0]
    })
  } catch (err) {
    res.status(500).json({
      success:false,
      message:`An error happened,${err?.message}`
    })
  }
}
