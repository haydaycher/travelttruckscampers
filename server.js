import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import camperRoutes from './src/routes/camperRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

// Налаштовуємо роут для кемперів
app.use('/catalog', camperRoutes);

// Обробник 404 помилок
app.use((req, res, next) => {
  res.status(404).send("Sorry, can't find that!");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
