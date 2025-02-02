// server.js

const express = require("express");
const app = express();
const port = 3000;
const camperRoutes = require("./routes/camperRoutes");

// Використовуємо маршрути
app.use(camperRoutes);
app.get("/campers", (req, res) => {
  console.log(req.query); // Виводить всі параметри запиту (location, type, amenities тощо)
  // Обробка фільтрів і відповідь
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
