import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import employeeRoutes from './routes/employee.routes.js';
import authRoutes from './routes/auth.routes.js';
import { authenticateToken } from './middleware/auth.middleware.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
const host = process.env.HOST || 'localhost';

app.use(express.json());
app.use(cors());

app.use('/api/auth', authRoutes);

app.use('/api/employees', authenticateToken, employeeRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Recruitment Helper API' });
});

app.listen(port, () => {
  console.log(`Server is running on http://${host}:${port}`);
});
