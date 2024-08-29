const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');  // Importar CORS

const app = express();
app.use(cors());  // Usar o middleware CORS

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://10.0.0.106:5173",  // URL do front-end
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
    credentials: true
  }
});

app.get('/', (req, res) => {
  res.send('Servidor funcionando');
});

io.on('connection', (socket) => {
  console.log('Um usuário se conectou');
  console.log(socket)
  socket.on('sendMessage', (message) => {
    console.log(message)
    io.emit('receiveMessage', message);
  });

  socket.on('disconnect', () => {
    console.log('Usuário desconectado');
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
