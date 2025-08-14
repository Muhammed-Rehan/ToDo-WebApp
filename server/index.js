import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

let Tasklist = [
  { id: 1, task: 'Task 1', completed: false },
  { id: 2, task: 'Task 2', completed: false },
  { id: 3, task: 'Task 3', completed: false }
];

app.get('/', (req,res) => {
    res.send(Tasklist)
    console.log("Tasklist sent:", Tasklist);
})

app.get('/addTask', (req, res) => {
  const { task } = req.query;
  console.log("data recieved:", task)
  if (!task) {
    return res.status(400).json({ error: 'Task is required' });
  }
  const newTask = { id: Tasklist.length + 1, task, completed: false };
  Tasklist.push(newTask);
  res.json(Tasklist);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});