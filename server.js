import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import compression from 'compression';
import helmet from 'helmet';
import cors from 'cors';

const app = express();
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'"],
        connectSrc: ["'self'", 'https://66b1f8e71ca8ad33d4f5f63e.mockapi.io'],
        imgSrc: [
          "'self'",
          'data:',
          'https://ftp.goit.study',
          'https://*.googleusercontent.com',
        ],
        styleSrc: ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com'],
        fontSrc: ["'self'", 'https://fonts.gstatic.com'],
      },
    },
  }),
);

app.use(cors()); // Дозволяє запити з будь-якого джерела
app.use(compression());

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
