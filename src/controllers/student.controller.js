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

 export const getStudent = async (req, res) =>{
  const id = req.params.id
  const fetchId = 'select * from students WHERE id = $1'
try {
  const result = await pool.query(fetchId, [id]);
  
  if(result.rows.length===0){
    return res.status(404).json({success:false,message:`the student with this id ${id} is not found`});
  }
  res.status(200).json(result.rows)
} catch (error) {
  console.err('database error',err)
  res.status(500).send('failed to fetch student')
}
 }
 
export const getStudentByName = async(req, res)=>{
  const {first_name} = req.params

  const fetchNameQuery = 'SELECT * FROM students WHERE LOWER(first_name) LIKE LOWER($1)'
  
  try {
    const resultName = await pool.query(fetchNameQuery,[`%${first_name}%`])
    if(resultName.rows.length===0){
      return res.status(404).json({success:false, message:`the student with name of ${first_name} is not found` })
    }
    res.send(resultName.rows)
  } catch (error) {
    console.error('database fail',error)
    res.status(500).json('failed to fetch student name')
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

