import express from 'express';
import cors from 'cors';
import camperRoutes from './routes/camperRoutes.js';

const app = express();
const PORT = process.env.PORT || 5000;

const corsOptions = {
  origin: '*', // Дозволяє доступ з будь-якого домену
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
};

app.use(cors(corsOptions));
app.use(express.json());
app.use('/campers', camperRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
