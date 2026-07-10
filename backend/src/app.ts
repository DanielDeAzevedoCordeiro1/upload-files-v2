import express from 'express';
import cors from 'cors';
import { uploadRoutes } from './infra/routes/uploads.routes.js';
import { userRouter } from './infra/routes/user.routes.js';
import { envsConfig } from './infra/config/envsConfig.js';

const app = express();
app.use(express.json());
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: false
}));
app.use('/api', userRouter);
app.use('/api/uploads', uploadRoutes);


app.listen(envsConfig.port!, () => {
  console.log(`Server is running on port ${envsConfig.port}`);
});
