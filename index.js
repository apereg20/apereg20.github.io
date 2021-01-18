//Inicializamos las constantes para trabajar con express y socket.io
const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

//Declaramos la carpeta public y definimos la ruta raiz '/' a index.html 
app.use('/public', express.static(__dirname + '/public'));
app.get('/', (req, res) => res.sendfile(__dirname + '/index.html'));
app.get('/', function(req, res){
    res.sendFile(__dirname+'/bin/index.html'); // change the path to your index.html
});

//Conexión con socket
io.on('connection', (socket)=>{
    //Esta función recibirá un mensaje y lo enviará a todos los usuarios de chat
    socket.on('message', (msg) => io.emit('message', msg));
    socket.on('user', (usr) => io.emit('user', usr));
    socket.on('image', (img) => io.emit('image', img));
});

//Levantamos nuestro servidor en el puerto 3000
http.listen(3000, () => console.log('Escuchando en puerto 3000'));