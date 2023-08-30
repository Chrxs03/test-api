const express = require('express');
const routerApi = require('./routes/index');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

const {
  logErrors,
  errorHandler,
  boomErrorHandler,
} = require('./middlewares/error.handler');

const allowedOrigins = ['http://localhost:8080'];
const options = {
  origin: (origin, callback) => {
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Origin not allowed'));
    }
  },
};

app.use(cors(options));

app.get('/api', (req, res) => {
  res.json('Home');
});

app.get('/api/nueva-ruta', (req, res) => {
  res.send('Hola, soy una nueva ruta');
});

routerApi(app);

app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
