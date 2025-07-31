const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

//ENDPOINTS
app.post("/complaints", async (req, res) => {
  try {
    const { name, email, complaint } = req.body;
    if (!name || !email || !complaint) return res.status(400).json({ error: "All fields required." });

    const result = await pool.query(
      `INSERT INTO "Complaints" (name, email, complaint, status) VALUES ($1, $2, $3, 'Pending') RETURNING *`,
      [name, email, complaint]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ error: "Database error occurred" });
  }
});

app.get("/complaints", async (req, res) => {
  try {
    const result = await pool.query(`SELECT * FROM "Complaints" ORDER BY created_at DESC`);
    res.json(result.rows);
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ error: "Database error occurred" });
  }
});

app.patch("/complaints/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      `UPDATE "Complaints" SET status = CASE WHEN status = 'Pending' THEN 'Resolved' ELSE 'Pending' END WHERE id = $1 RETURNING *`,
      [id]
    );
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ error: "Database error occurred" });
  }
});

app.delete("/complaints/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query(`DELETE FROM "Complaints" WHERE id = $1`, [id]);
    res.status(204).end();
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ error: "Database error occurred" });
  }
});

app.listen(process.env.PORT, () => console.log(`Backend running on port ${process.env.PORT}`));
