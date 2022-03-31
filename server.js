// On demare le serv avec nodemon server, actualise nos données de maniere dynamique contrairement à node server
const http = require('http');

// on importe le app.js qui est dans le meme dossier
const app = require('./app');

// On utilise normalizePort et errorHandler pour rendre le serveur Node le rend plus constant et plus facile à déboguer.
// Cette fonction nous renvoie un port valide
const normalizePort = val => {
    const port = parseInt(val, 10);
  
    if (isNaN(port)) {
      return val;
    }
    if (port >= 0) {
      return port;
    }
    return false;
  };

  const port = normalizePort(process.env.PORT || '3000');
  app.set('port', port);
  
  // Recherche les erreurs et les gere.
  const errorHandler = error => {
    if (error.syscall !== 'listen') {
      throw error;
    }

    const address = server.address();
    const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;
    switch (error.code) {
      case 'EACCES':
        console.error(bind + ' requires elevated privileges.');
        process.exit(1);
        break;
      case 'EADDRINUSE':
        console.error(bind + ' is already in use.');
        process.exit(1);
        break;
      default:
        throw error;
    }
  };
  
  const server = http.createServer(app);
  
  server.on('error', errorHandler);
  server.on('listening', () => {
    const address = server.address();
    const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
    console.log('Listening on ' + bind);
  });

// Si port 3000 (port par defaut) n'est pas dispo, la partie gauche permet de ce connecter à un autre port.
server.listen(process.env.PORT || 3000);
