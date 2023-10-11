const express = require("express");
const router = express.Router();
const db = require("../db/Sqlite").db;
const crypto = require("crypto"); // Import the crypto module
const { verifyToken } = require("./authMiddleware");
const { getStudentSubjects } = require("./StudentHelper");

// gt student subject
router.get("/api/students/:studentId/subjects", async (req, res) => {
  const studentId = req.params.studentId;
  try {
    const subjects = await getStudentSubjects(studentId);
       res.json(subjects);
  } catch (error) {
    console.error("Error fetching subjects:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});



router.post("/api/student_subject", verifyToken, (req, res) => {
  return res.status(400).send("Hello this code is commented");
  // const { stdRollNo, userSubject } = req.body;

  // // Check if stdRollNo and userSubject are provided in the request body
  // if (!stdRollNo || !userSubject) {
  //   return res
  //     .status(400)
  //     .json({ error: "Both stdRollNo and userSubject are required." });
  // }

  // // Perform a lookup in the student_subject table to check if the record already exists
  // db.get(
  //   "SELECT COUNT(*) as count FROM student_subject WHERE stdRollNo = ? AND userSubject = ?",
  //   [stdRollNo, userSubject],
  //   (err, result) => {
  //     if (err) {
  //       console.error("Error checking if record exists:", err);
  //       return res.status(500).json({ error: "Internal Server Error" });
  //     }

  //     const recordCount = result.count;

  //     if (recordCount > 0) {
  //       // A record with the same stdRollNo and userSubject already exists
  //       return res.status(409).json({ error: "Record already exists." });
  //     }

  //     // Generate a UUID for std_subjectId
  //     const std_subjectId = crypto.randomUUID();

  //     // Proceed with insertion
  //     db.get(
  //       "SELECT studentId FROM students WHERE stdRollNo = ?",
  //       [stdRollNo],
  //       (err, studentRow) => {
  //         if (err) {
  //           console.error("Error fetching studentId:", err);
  //           return res.status(500).json({ error: "Internal Server Error" });
  //         }

  //         db.get(
  //           "SELECT subjectId FROM subjects WHERE subjectName = ?",
  //           [userSubject],
  //           (err, subjectRow) => {
  //             if (err) {
  //               console.error("Error fetching subjectId:", err);
  //               return res.status(500).json({ error: "Internal Server Error" });
  //             }

  //             if (!studentRow || !subjectRow) {
  //               return res
  //                 .status(404)
  //                 .json({ error: "Student or subject not found." });
  //             }

  //             const studentId = studentRow.studentId;
  //             const subjectId = subjectRow.subjectId;

  //             // Insert data into the student_subject table with the generated std_subjectId
  //             db.run(
  //               "INSERT INTO student_subject (std_subjectId, studentId, subjectId, stdRollNo, userSubject) VALUES (?, ?, ?, ?, ?)",
  //               [std_subjectId, studentId, subjectId, stdRollNo, userSubject],
  //               (err) => {
  //                 if (err) {
  //                   console.error(
  //                     "Error inserting data into student_subject table:",
  //                     err
  //                   );
  //                   return res
  //                     .status(500)
  //                     .json({ error: "Internal Server Error" });
  //                 }
  //                 return res
  //                   .status(200)
  //                   .json({ message: "Data inserted successfully" });
  //               }
  //             );
  //           }
  //         );
  //       }
  //     );
  //   }
  // );
});
module.exports = router;
