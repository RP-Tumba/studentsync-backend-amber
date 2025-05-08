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


export const getOneStudent= async (req,res)=>{
  try {  
    const {id} = req.params;
    const studentRow = 'SELECT * FROM students WHERE id=$1';
    const checking= await pool.query(studentRow,[id]);
    if (checking.rows.length===0){
     return  res.status(404).json({message:"no data found "})
    }
    return res.status(200).json({
      message:"result",
      student:checking.rows[0]
    })
    
  } catch (err) {
    logger.error(err.message);
    res.status(500).json({
      success: false,
      message: `An unexpected error occurred in GET/ONESTUDENT, ${err?.message}`,
    });
  }
 
}

 
export const updateStudent= async(req,res)=>{
  try {
    const {id}=req.params;
    const {first_name,last_name,student_id,email,date_of_birth,contact_number,enrollment_date,profile_picture}=req.body;
      
    const emailchecking = await pool.query(`SELECT * FROM students WHERE email=$1 AND id !=$2`,[email,id]);
    if(emailchecking.rowCount>0){
      return res.status(404).json({success:false,
                                   message:`the student with  ${email} is already existed.`
      })
    }
    const phonechecking = await pool.query(`SELECT * FROM students WHERE contact_number=$1 AND id !=$2`,[contact_number,id]);
    if(phonechecking.rowCount>0){
      return res.status(404).json({success:false,
                                   phonemessage:`the student with phone number ${contact_number} is already existed.`
      })
    }
    const studentIdchecking = await pool.query(`SELECT * FROM students WHERE student_id=$1 AND id !=$2`,[student_id,id]);
    if(studentIdchecking.rowCount>0){
      return res.status(404).json({success:false,
                                   studentIdmessage:`the student with student_id ${student_id} is already existed.`
      })
    }
    const updateStudent= `UPDATE students SET first_name='${first_name}',last_name ='${last_name}',
    student_id = '${student_id}',email ='${email}',date_of_birth ='${date_of_birth}',contact_number ='${contact_number}',
    enrollment_date ='${enrollment_date}',profile_picture ='${profile_picture}' WHERE id= ${id} RETURNING *`
    const updatedstudent= await pool.query(updateStudent);

    if(updatedstudent.rowCount === 0){
      return res.status(400).json({
        success:false,
        message:"The new student was not recorded"
      })
    }
    res.status(200).json({
      success:true,
      message:"the students data was updated successfully",
      data:updatedstudent.rows[0]
    })
  } catch (err) {
    res.status(500).json({
      success:false,
      message:`An error happened,${err?.message}`
    })
  }
}
export const deleteStudent = async (req, res) => {
  try {
              const {id} = req.params;
            if(isNaN(id)){
              return res.status(404).json({
                MessageStatus:false,
                message:`the id ${id} is invalid`
              })
            };

            const checkquery = "SELECT * FROM students WHERE id = $1";
            const checking = await pool.query(checkquery,[id]);
            if(checking.rows.length===0){
             return res.status(404).json({
                MessageStatus:false,
                message:`the student with this id ${id} not found`});
            }
          
            const deleteqry = "DELETE FROM students WHERE id = $1";
            await pool.query(deleteqry,[id]);
            res.status(200).json({
              MessageStatus:true,
              message:`Deleting a student is done successfully.`
            })
              
  } catch (err) {
          logger.error(err.message);
          res.status(500).json({
            MessageStatus: false,
            message: `Server error occurred. Unable to delete a student, ${err.message}`,
          });
  }
};


export const searchByName =  async(req,res) =>{
 try {
   const{name} = req.query;
  const students =  await pool.query(`SELECT * FROM students WHERE 
                                    first_name ILIKE $1
                                    OR last_name ILIKE $1
                                    OR
    CONCAT(first_name,'',last_name) ILIKE $1 ORDER BY first_name`,[`%${name.trim()}%`]);
  if(students.rowCount===0){
    return res.status(404).json({message:`no data related to ${name} found`});
  }

  res.status(200).json(students.rows);
 
  
 } catch (err) {
  logger.error(err.message);
  res.status(500).json({
    MessageStatus: false,
    message: `Server error occurred. Unable to search a student, ${err.message}`,
  });
 }

}


export const createStudent = async (req, res) => {
  const { first_name, last_name, student_id, email, date_of_birth, contact_number, enrollment_date, profile_picture } = req.body;
  
  try {
    const emailchecking = await pool.query(`SELECT * FROM students WHERE email=$1`,[email]);
    if(emailchecking.rowCount>0){
      return res.status(404).json({success:false,
                                   message:`the student with  ${email} is already existed.`
      })
    }
    const phonechecking = await pool.query(`SELECT * FROM students WHERE contact_number=$1`,[contact_number]);
    if(phonechecking.rowCount>0){
      return res.status(404).json({success:false,
                                   phonemessage:`the student with  phone number ${contact_number} is already existed.`
      })
    }
    const studentIdchecking = await pool.query(`SELECT * FROM students WHERE student_id=$1`,[student_id]);
    if(studentIdchecking.rowCount>0){
      return res.status(404).json({success:false,
                                   studentIdmessage:`the student with  student_id ${student_id} is already existed.`
      })
    }
    const result = await pool.query(
      `INSERT INTO students (first_name, last_name, student_id, email, date_of_birth, contact_number, enrollment_date, profile_picture)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
       RETURNING *`,
      [first_name, last_name, student_id, email, date_of_birth, contact_number, enrollment_date, profile_picture]
    );
    res.status(201).json(result.rows);
  } catch (error) {
    res.status(500).json({ message: 'Error creating student', error: error.message });
  }
};

export const fetchpaginateddata = async (req, res) => {
  try {
    const pages = parseInt(req.query.pages, 10);
    const limit = 10;

    if (isNaN(pages) || pages < 1) {
      return res.status(400).json({ message: "Incorrect pagination" });
    }

    const offset = (pages - 1) * limit;

    const fetchedData = await pool.query(
      "SELECT * FROM students ORDER BY first_name LIMIT $1 OFFSET $2",
      [limit, offset]
    );

    if (fetchedData.rowCount > 0) {
      res.status(200).json({
        MessageStatus: true,
        message: `Data fetched successfully.`,
        data: fetchedData.rows,
      });
    } else {
      res.status(404).json({ message: "No data found." });
    }
  } catch (err) {
    logger.error(err.message);
    res.status(500).json({
      MessageStatus: false,
      message: `Server error occurred. Unable to delete a student, ${err.message}`,
    });
  }
};
