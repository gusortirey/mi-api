// Importamos Express
const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

// Usuarios predeterminados con nombre y correo
let usuarios = [
  { id: 1, nombre: 'Gustavo', correo: 'gus@company.com' },
  { id: 2, nombre: 'Alan', correo: 'alan@company.com' }
];

// GET — obtener todos los usuarios
app.get('/usuarios', (req, res) => {
  res.json(usuarios);
});

// POST — crear usuario nuevo
app.post('/usuarios', (req, res) => {
  const nuevoUsuario = {
    id: usuarios.length + 1,
    nombre: req.body.nombre,
    correo: req.body.correo
  };
  usuarios.push(nuevoUsuario);
  res.status(201).json({ message: 'Usuario creado', user: nuevoUsuario });
});

// PUT — reemplazar usuario completo
app.put('/usuarios/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const index = usuarios.findIndex(u => u.id === userId);

  if (index === -1) {
    return res.status(404).json({ message: 'Usuario no encontrado' });
  }

  usuarios[index] = { id: userId, nombre: req.body.nombre, correo: req.body.correo };
  res.json({ message: `Usuario con ID ${userId} actualizado`, updatedUser: usuarios[index] });
});

// PATCH — modificar solo una parte
app.patch('/usuarios/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const usuario = usuarios.find(u => u.id === userId);

  if (!usuario) {
    return res.status(404).json({ message: 'Usuario no encontrado' });
  }

  if (req.body.nombre) usuario.nombre = req.body.nombre;
  if (req.body.correo) usuario.correo = req.body.correo;
  res.json({ message: `Usuario con ID ${userId} actualizado`, updatedUser: usuario });
});

// DELETE — eliminar usuario
app.delete('/usuarios/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const index = usuarios.findIndex(u => u.id === userId);

  if (index === -1) {
    return res.status(404).json({ message: 'Usuario no encontrado' });
  }

  usuarios.splice(index, 1);
  res.json({ message: `Usuario con ID ${userId} eliminado` });
});

app.get('/productos', (req, res) => {
  res.json([
    { id: 1, nombre: 'Laptop', precio: 15000 },
    { id: 2, nombre: 'Mouse', precio: 350 }
  ]);
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});