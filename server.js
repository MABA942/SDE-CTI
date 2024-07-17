const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const port = 3000;

// Middleware para analizar solicitudes con cuerpo JSON
app.use(bodyParser.json());

// Ruta para manejar la búsqueda por descripción
app.post('/buscar-por-descripcion', (req, res) => {
  const { palabraClave } = req.body;

  // Cargar datos desde el archivo JSON
  const tarifario = JSON.parse(fs.readFileSync('tarifario.json', 'utf8'));

  // Filtrar resultados por descripción
  const resultados = tarifario.filter(item =>
    item.Descripción.toLowerCase().includes(palabraClave.toLowerCase())
  );

  res.json(resultados);
});

// Ruta para manejar la búsqueda por número de referencia
app.post('/buscar-por-referencia', (req, res) => {
  const { referencia } = req.body;

  // Cargar datos desde el archivo JSON
  const tarifario = JSON.parse(fs.readFileSync('tarifario.json', 'utf8'));

  // Encontrar el resultado por número de referencia
  const resultado = tarifario.find(item =>
    item["No. De Referencia"] === referencia
  );

  if (resultado) {
    res.json([resultado]); // Enviar como array para consistencia
  } else {
    res.status(404).send('No se encontró ningún resultado.');
  }
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Aplicación escuchando en http://localhost:${port}`);
});
