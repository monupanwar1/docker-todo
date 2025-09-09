import express from 'express';
import prisma from './client';
const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/health', (req, res) => {
  res.status(200).json({ message: 'health is good' });
});

app.post('/', async (req, res) => {
  try {
    const { name, password } = req.body;
    const user = await prisma.todo.create({ data: { name, password } });
    res.json({ message: 'usercreated', user });
  } catch (error) {
    console.log(error);
  }
});
app.get('/', async (req, res) => {
  try {
    const users = await prisma.todo.findMany();
    res.json({ users });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});
app.get('/:id', async (req, res) => {
  try {
    const { id } = req.body;
    const users = await prisma.todo.findMany({ where: { id } });
    res.json({ users });
  } catch (error) {
    console.log(error);
  }
});
app.listen(PORT, () => {
  console.log(`server is listening on ${PORT}`);
});
