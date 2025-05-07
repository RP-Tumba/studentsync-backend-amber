/**
 * This file defines the routes related to student operations.
 * It currently includes a route to get all students.
 *
 * Add more routes for creating, updating, and deleting students as needed.
 */
import express from "express";
import { deleteStudent, getAllStudents, searchbyname} from "../controllers/student.controller.js";

const router = express.Router();

router.get("/", getAllStudents);
router.delete("/:id",deleteStudent);
router.get("/search",searchbyname);




export default router;
