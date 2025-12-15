import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.get('/home', (req, res) => {
  res.send(`
    <html>
      <body style="display: flex; justify-content: center; align-items: center; height: 100vh;">
        <h1 style="color: green; font-size: 5rem">Welcome to the Home Page</h1>
      </body>
    </html>
  `);
})

app.get('/about', (req, res) => {
  res.send('This is About page');
})

app.get('/students/:studentId', (req, res) => {
  res.json({
    studentId: req.params.studentId,
    name: req.query.name,
    department: req.query.department
  })
})

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
})