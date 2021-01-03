const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const passport = require('passport');
const flash = require('connect-flash');
const session = require('express-session');

const app = express();
// DB Config

require('./config/passport')(passport);

const db = require('./config/keys').mongoURI;

mongoose.connect(db, { useNewUrlParser : true, useUnifiedTopology: true})
.then(() => console.log('Database connected'))
.catch( err => console.log(err));
	
const PORT = process.env.PORT || 5000;

app.use(expressLayouts);
app.set('view engine','ejs');
// Body parser

app.use(express.urlencoded({ extended: false }));


// Session
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true,
}));


app.use(passport.initialize());
app.use(passport.session());

// connect flash
app.use(flash());
// global vars

app.use( (req, res, next) => {
	res.locals.success_msg = req.flash('success_msg');
	res.locals.error = req.flash('error');
	next();
});

// Routes


app.use('/', require('./routes/index'));

app.use('/users', require('./routes/users'));
// create server

app.listen(PORT, console.log(`Server is running on ${PORT}`));