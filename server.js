import express from 'express';
import cors from 'cors';
import camperRoutes from './src/routes/camperRoutes.js';

const app = express();

// Налаштування CORS
const corsOptions = {
  origin: 'https://66b1f8e71ca8ad33d4f5f63e.mockapi.io/campers',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
};

// Використання CORS
app.use(cors(corsOptions));

// Інші налаштування сервера
app.use(express.json());
app.use('/campers', camperRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
