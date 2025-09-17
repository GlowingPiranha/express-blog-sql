// ! importo express
const express = require('express');

// ! definisco app
const app = express();

// ! middleware di parsing
app.use(express.json());

// ! definisco il port
const port = 3000;

// * importo posts router
const postRouter = require('./routers/posts.js');

// * importo i middleware
const middlewareAuth = require('./middlewares/authMiddleware.js');
const notFound = require('./middlewares/notFoundMiddleware.js');
const errorsHandler = require('./middlewares/errorMiddleware.js');


// ! inserisco il middleware
app.use(express.static('public'));

// * router
app.use('/posts', middlewareAuth, postRouter);

// ! definisco la route base
app.get('/', (req, res) => {
  res.send('Server del mio blog');
})

// * middleware 404
app.use(notFound);

// * middleware 500
app.use(errorsHandler);

// ! dico al server di rimanere in ascolto sulla porta indicata sopra
app.listen(port, () => {
  console.log(`Server della bacheca in ascolto su ${port}`);
})