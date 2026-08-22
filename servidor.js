const express = require('express');
const cors = require('cors');
const routes = require('../routes/routes'); // Ajustado ../
const path = require('path');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Archivos estáticos y vistas apuntando a la raíz del proyecto
app.use(express.static(path.join(__dirname, '../public')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../views'));
app.set('view cache', false);

// Rutas
app.use('/', routes);

// Exportación para Serverless en Vercel
module.exports = app;

if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));
}