/**
 * This file defines the routes related to student operations.
 * It currently includes a route to get all students.
 *
 * Add more routes for creating, updating, and deleting students as needed.
 */
import express from "express";
import {validations} from '../validation/student.validation.js'
import {validate} from '../validation/validate.js'
import { deleteStudent, getAllStudents,createStudent,updateStudent,searchByName,getOneStudent, fetchpaginateddata} from "../controllers/student.controller.js";



const router = express.Router();

router.get("/", getAllStudents);

router.get("/search",searchByName);
router.put("/:id",validations,validate,updateStudent)
router.delete("/:id",deleteStudent);
router.post('/add',validations,validate,createStudent)
router.get("/:id/student",getOneStudent);
router.get("/data",fetchpaginateddata)



export default router;


