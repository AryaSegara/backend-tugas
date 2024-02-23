import express from "express";
import dotenv from "dotenv";
import { connection } from "../db.js";

dotenv.config();
const PORT = process.env.DB_PORT || 3000;

const app = express();
app.use(express.json());

// Hello world
app.get("/api/v1", async (_req, res) => {
  res.send("Hello world!");
});

// Get all students
app.get("/api/v1/students", async (_req, res) => {
  const result = await connection.query("SELECT * FROM students");
  res.json(result);
});

// Add student
app.post("/api/v1/students", async (req, res) => {
  const result = `INSERT INTO students VALUES (NULL,?,?,?)`;
  await connection.execute(result, [req.body.nama, req.body.generation, req.body.present]);
  res.send("Mahasiswa berhasil disimpan.");
});

// Get student by ID
app.get("/api/v1/students/:id", async (req, res) => {
  const result = await connection.query(
    `SELECT * FROM students WHERE id = ?`,
     [req.params.id]
  );
  res.json(result[0]);
});

// Edit student by ID
app.put("/api/v1/students/:id", async (req, res) => {
  const result = `UPDATE students SET nama = ? , generation = ? , present = ? WHERE id = ?`;
  await connection.execute(result, [req.body.nama, req.body.generation, req.body.present, req.params.id]);
  res.send("Mahasiswa berhasil diedit.");
});

// Delete student by ID
app.delete("/api/v1/students/:id", async (req, res) => {
  const result = `DELETE FROM students WHERE id = ?`;
  await connection.execute(result, [req.params.id]);
  res.send("Mahasiswa berhasil dihapus.");
});

app.listen(PORT, () => console.log("Server berhasil dijalankan."));
