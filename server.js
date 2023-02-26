// Consigna: 
// Continuando con el desafío de la clase anterior, vamos a incorporar un mecanismo sencillo que permite loguear
// un cliente por su nombre, mediante un formulario de ingreso. Luego de que el usuario esté logueado, se
// mostrará sobre el contenido del sitio un cartel con el mensaje “Bienvenido” y el nombre de usuario. Este
// cartel tendrá un botón de deslogueo a su derecha. Verificar que el cliente permanezca logueado en los
// reinicios de la página, mientras no expire el tiempo de inactividad de un minuto, que se recargará con cada
// request. En caso de alcanzarse ese tiempo, el próximo request de usuario nos llevará al formulario de login.
// Al desloguearse, se mostrará una vista con el mensaje de 'Hasta luego' más el nombre y se retornará
// automáticamente, luego de dos segundos, a la vista de login de usuario.

// >> Detalles del entregable: 
// La solución entregada deberá persistir las sesiones de usuario en Mongo Atlas.
// * Verificar que en los reinicios del servidor, no se pierdan las sesiones activas de los clientes.

// * Mediante el cliente de Mongo Atlas, revisar los id de sesión correspondientes a cada cliente y sus datos.

// * Borrar sesión de cliente en la DB y comprobar que el próximo request al usuario se le presente el login.

// * Fijar un tiempo de expiración de sesión de 10 minutos recargable con cada visita del cliente al sitio
//   y verificar que si pasa ese tiempo de inactividad el cliente quede deslogueado.
const express = require('express');
const { createServer } = require('http');
const socketIo = require('socket.io');
const expressSession = require('express-session');

const { productosApiRouter } = require('./api/productos.js');
const mensajesApiRouter = require('./api/mensajes.js');

const { productSocket } = require('./webSocket/productosWS.js');

const { mainPage } = require('./pages/loadPages.js');

const path = require ('path');  // Para el uso de rutas filePaths absolutos.

const app = express();
const server = createServer(app);
const io = socketIo(server, {cors: {origin:"*"}});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(`${path.join(__dirname, `public`)}`));

app.use(expressSession({
  secret: 'my-super-secret',
  resave: true,
  saveUninitialized: true,
}));

app.use(productosApiRouter);
app.use(mensajesApiRouter);

io.on('connection', async client => {
  console.log(`Client ${client.id} connected`);

  productSocket(client, io.sockets);

  client.on('login-user', logUser => {
    // Verificacion de usuario en Base de Datos y GENERACION de SESION...
    if(logUser.user == "Ramiro"){
      const sendString = JSON.stringify({ user: logUser.user, html: mainPage });
      client.emit('reload', sendString);
    } else {
      client.emit('user-error', "A ocurrido un error");
    }
  });

  client.on('logout', logUser => {
    // CERRAR SESION y tratamiento de cookies...
    client.emit('redirect', 'http://localhost:8080');
  });
});

const PORT = 8080;
server.listen(PORT, () => {
  console.log(`Servidor http WebSocket escuchando en el puerto ${server.address().port}`);
});
server.on("error", error => console.log(`Error en servidor ${error}`));




// Enlace Workshop Mongo Atlas
// https://www.atlas-google-cloud-workshop.com/docs/intro

// Paquete APOLO SERVER - APOLO CLIENT -> DESAROLLAR GraphQL Querys



