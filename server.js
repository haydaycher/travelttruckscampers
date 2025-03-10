import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import compression from 'compression';
import helmet from 'helmet';

app.use(helmet());
app.use(compression());

const app = express();
const PORT = process.env.PORT || 10000;

// Визначаємо кореневу директорію (оскільки використовуємо ES-модулі)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Робимо dist статичною папкою
app.use(express.static(path.join(__dirname, 'dist')));

// Всі маршрути спрямовуємо на index.html (для React Router)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
