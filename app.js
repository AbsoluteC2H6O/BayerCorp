// Express
const express = require('express');
// Middleware
const morgan = require('morgan');
// Vehicle routes
const vehicles = require('./routes/vehicles');
// BodyParser
const bodyParser = require('body-parser');
// Connection port
const PORT = process.env.PORT || 3050;
// express app
const app = express();

// Register view engine
app.set('view engine', 'ejs');

// Middleware & Static files
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan('dev'));
/* app.use((req, res, next) => {
  res.locals.path = req.path;
  next();
}); */

// Routes
app.get('/', (req, res) => {
  res.render('index', { title: 'Inicio' });
});

app.get('/about', (req, res) => {
  res.render('about', { title: 'Sobre BayerCorp' });
});

app.get('/index', (req, res) => {
  res.render('index', { title: 'Inicio' });
});

app.get('/report', (req, res) => {
  res.render('report', { title: 'Reporte' });
});

/* app.get('/vehicles', (req, res) => {
  res.render('vehicles', { title: 'Menú' });
}); */

// Vehicle routes
app.use('/vehicles', vehicles);

// 404 page
app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});

// Connection PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${ PORT }`);
});