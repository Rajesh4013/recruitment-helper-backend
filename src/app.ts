import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import employeeRoutes from './routes/employee.routes.js';
import authRoutes from './routes/auth.routes.js';
import departmentRoutes from './routes/department.routes.js';
import skillRoutes from './routes/skill.routes.js';
import lookupRoutes from './routes/lookup.routes.js';
import jobDescriptionRoutes from './routes/jobDescription.routes.js';
import resourceRequestsRoutes from './routes/resourceRequest.routes.js';
import updateTrackerRoutes from './routes/updateTracker.routes.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
const host = process.env.HOST || 'localhost';

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/employees', employeeRoutes);
app.use('/api/departments', departmentRoutes);
app.use('/api/skills', skillRoutes);
app.use('/api/lookups', lookupRoutes);
app.use('/api', jobDescriptionRoutes);
app.use('/api', resourceRequestsRoutes);
app.use('/api', updateTrackerRoutes);

app.get('/', (req, res) => {
    res.json({ message: 'Welcome to Recruitment Helper API' });
});

app.listen(port, () => {
    console.log(`Server is running on http://${host}:${port}`);
});
