const path = require('path');
const express = require('express');
const morgan = require('morgan');
const xss = require('xss-clean');
const helmet = require('helmet');
const compression = require('compression');
const cors = require('cors');
const AppError = require('./src/utils/AppError');
const globalErrorHandler = require('./src/controllers/errorController');
const usersRouter=require('./src/routes/user.routes')
const productsRouter=require('./src/routes/produit.routes')
const commandsRouter=require('./src/routes/commande.routes')
const postsRouter=require('./src/routes/publication.routes')
const commentsRouter=require('./src/routes/commentaire.routes')
const categoriesRouter=require('./src/routes/categorie.routes')
const paniersRouter=require('./src/routes/panier.routes')
const LivraisonRouter=require('./src/routes/livraison.routes')
const facturesRouter=require('./src/routes/facture.routes')

// Start express app
const app = express();

app.enable('trust proxy');

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// 1) GLOBAL MIDDLEWARES
// Implement CORS
app.use(cors());
// Access-Control-Allow-Origin *
// api.natours.com, front-end natours.com
// app.use(cors({
//   origin: 'https://www.natours.com'
// }))

app.options('*', cors());
// app.options('/api/v1/tours/:id', cors());

// Serving static files
app.use(express.static(path.join(__dirname, 'public')));

// Set security HTTP headers
app.use(helmet());

// Development logging
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}
// Body parser, reading data from body into req.body
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));


// Data sanitization against XSS
app.use(xss());


app.use(compression());

// Test middleware
app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    // console.log(req.cookies);
    next();
});

// 3) ROUTES
app.use('/api/v1/products', productsRouter);
app.use('/api/v1/users', usersRouter);
app.use('/api/v1/commands', commandsRouter);
app.use('/api/v1/posts', postsRouter);
app.use('/api/v1/comments', commentsRouter);
app.use('/api/v1/categories', categoriesRouter);
app.use('/api/v1/paniers', paniersRouter);
app.use('/api/v1/livraisons', LivraisonRouter);
app.use('/api/v1/factures', facturesRouter);

app.all('*', (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;

