require("dotenv").config();

const express = require("express");
const cors = require("cors");
const cookieParser = require('cookie-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const passport = require('passport');

const productRoutes = require("./routes/product.routes");
const sellerRoutes = require("./routes/seller.routes");
const customerRoutes = require("./routes/customer.routes");
const userRoutes = require("./routes/user.routes");
const paymentRoutes = require("./routes/payment.routes");

const savePaymentToProduct = require('./middleware/save_paymenttoProducts');
const dbMiddleware = require('./middleware/db.middleware');
const morganConfig = require('./config/morgan.config');
const connectDB = require('./config/db.config');

const { SESSION_SECRECT, MONGO_URI } = require('./config/env.config');

const app = express();


connectDB().catch(err => {
  console.error('DB connection failed:', err);
});

app.use(morganConfig);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


app.use(session({
  secret: SESSION_SECRECT,
  resave: false,
  saveUninitialized: false,          
  store: MongoStore.create({ mongoUrl: MONGO_URI }),
  cookie: { 
    maxAge: 10 * 24 * 60 * 60 * 1000,  
    secure: process.env.NODE_ENV === 'production',  
    sameSite: 'lax'  
  }
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? 'https://joycart-frontend.vercel.app/'   
    : 'http://localhost:5173',
  credentials: true
}));

// Routes
app.get('/', (req, res) => res.send('Server is ready'));
app.use('/api/product', productRoutes);
app.use('/api/user/customer', customerRoutes);
app.use('/api/user/seller', sellerRoutes);
app.use('/api/user', userRoutes);
app.use('/api/payments', paymentRoutes, savePaymentToProduct);

app.use(dbMiddleware);

module.exports = app;