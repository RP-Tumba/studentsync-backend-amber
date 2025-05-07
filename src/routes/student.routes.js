/**
 * This file defines the routes related to student operations.
 * It currently includes a route to get all students.
 *
 * Add more routes for creating, updating, and deleting students as needed.
 */
import express from "express";



import { deleteStudent, getAllStudents,createStudent,updateStudent,searchbyname, getStudent, getStudentByName} from "../controllers/student.controller.js";




const router = express.Router();

router.get("/", getAllStudents);

router.get("/:id", getStudent);
router.get('/search/:first_name', getStudentByName);

router.delete("/:id",deleteStudent);
router.get("/search",searchbyname);



router.put("/:id",updateStudent)

router.delete("/:id",deleteStudent);
router.post('/add',createStudent)



router.delete("/:id",deleteStudent);



export default router;

