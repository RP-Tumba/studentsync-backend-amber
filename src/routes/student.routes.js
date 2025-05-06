/**
 * This file defines the routes related to student operations.
 * It currently includes a route to get all students.
 *
 * Add more routes for creating, updating, and deleting students as needed.
 */
import express from "express";
import { getAllStudents, getStudent } from "../controllers/student.controller.js";

const router = express.Router();

router.get("/", getAllStudents);
router.get("/:id", getStudent)

export default router;

