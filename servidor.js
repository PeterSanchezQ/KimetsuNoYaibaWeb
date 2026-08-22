const express = require('express');
const cors = require('cors');
const routes = require('./routes/routes');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Archivos estáticos
app.use(express.static('public'));

// Motor de plantillas
app.set('view engine', 'ejs');
app.set('views', './views');
app.set('view cache', false);

// Rutas
app.use('/', routes);

// Servidor
//app.listen(PORT, () => {
  //  console.log(`Servidor corriendo en http://localhost:${PORT}`);
//});
const PORT = process.env.PORT || 3000;

if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => console.log(`Running on ${PORT}`));
}

module.exports = app;
