import express from "express";
import mysql2 from "mysql2";
import cors from "cors";

const app = express();

const db = mysql2.createConnection({
  host: "containers-us-west-107.railway.app",
  user: "root",
  port: "6294",
  password: "COieRvOJnVXVR9XrhraQ",
  database: "railway",
});

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.json("Hello this is the backend!");
});

app.get("/Bookan", (req, res) => {
  const q = "SELECT * FROM Bookan";
  db.query(q, (err, data) => {
    if (err) {
      return res.json(err);
    }
    return res.json(data);
  });
});

app.post("/Bookan", (req, res) => {
  const q =
    "INSERT INTO Bookan (`Title`,`Author`,`Price`,`Category`,`Lecturer`,`Department`,`Grade`,`Edition`,`Descriptions`,`Cover`) VALUES (?)";
  const values = [
    req.body.Title,
    req.body.Author,
    req.body.Price,
    req.body.Category,
    req.body.Lecturer,
    req.body.Department,
    req.body.Grade,
    req.body.Edition,
    req.body.Descriptions,
    req.body.Cover,
  ];
  db.query(q, [values], (err, data) => {
    if (err) {
      return res.json(err);
    }
    return res.json("Book added!");
  });
});

// delete the post by selected id

app.delete("/Bookan/:Id", (req, res) => {
  const q = "DELETE FROM Bookan WHERE Id = ?";
  db.query(q, [req.params.Id], (err, data) => {
    if (err) {
      return res.json(err);
    }
    return res.json("Book deleted!");
  });
});

app.get("/Bookan/:Id", (req, res) => {
  const q = "SELECT * FROM Bookan WHERE Id = ?";
  db.query(q, [req.params.Id], (err, data) => {
    if (err) {
      return res.json(err);
    }
    return res.json(data);
  });
});


app.listen(8080, () => {
  console.log("Connected to backend!");
});