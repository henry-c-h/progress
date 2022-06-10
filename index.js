const express = require('express');
const path = require('path');
const app = express();
const session = require('express-session');
const dotenv = require('dotenv');
const cors = require('cors');
const passport = require('passport');
const MongoStore = require('connect-mongo');
const userRoute = require('./routes/users');
const mongoClient = require('./db');
const compression = require('compression');
const helmet = require('helmet');
dotenv.config();

// middleware
app.use(helmet());
app.use(compression());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    store: MongoStore.create({ client: mongoClient }),
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());
require('./passportConfig')(passport);

// routes
const authRoute = require('./routes/auth')(passport);
app.use('/api/auth', authRoute);
app.use('/api/users', userRoute);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.resolve(__dirname, 'client/build')));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client/build', 'index.html'));
  });
}

app.listen(process.env.PORT || 3000, () => console.log('server running'));
