const express = require('express');
const path = require('path');
const engine = require('ejs-mate');
const morgan = require('morgan');
const passport = require('passport');
const session = require('express-session');
const flash = require('connect-flash');


// initializations
const app = express();
const { connectToDb } = require('./config/database.js');
// require('./config/database.js');
require('./config/auth.js');
// const { createProduct } = require('./controller/create');



// settings
app.set('views', path.join(__dirname, 'views'));
app.engine('ejs', engine);
app.set('view engine', 'ejs');
app.set('port', process.env.PORT || 3000);


// middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.static('public'));

app.use(express.json());
app.use(session({
    secret: 'mysecretsession',
    resave: false,
    saveUninitialized: false
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
    res.locals.signupMessage = req.flash('signupMessage');
    res.locals.loginMessage = req.flash('loginMessage');
    res.locals.user = req.user;
    next();
});


// routes
const { usersApiRouter } = require('./routes/usersApiRouter.js');
app.use(usersApiRouter);
// app.use(function(req, res) {
//     res.json({
//         error: {
//             'name':'Error',
//             'status':404,
//             'message':'Invalid Request',
//             'statusCode':404,
//             'stack':'http://localhost:3000/'
//         },
//         message: 'Testing!'
//     });
// });


// starting server
// app.listen(app.get('port'), () => {
//     console.log('SERVER ON PORT', app.get('port'))
// });

// const nodemailer = require('nodemailer')
// const sendMail = async () => {

//     const transporter = nodemailer.createTransport({
//         host: 'smtp.ethereal.email',
//         port: 587,
//         auth: {
//             user: process.env.EMAIL,
//             pass: process.env.PASSWORD,
//         }
//     });
// }

// let info = await transporter.sendMail({
//     from: `"Raul Lindgren" <${process.env.EMAIL}>`, // sender address
//     to: process.env.EMAIL, // list of receivers
//     subject: "Hello ✔", // Subject line
//     text: "Hello world?", // plain text body
//     html: "<b>Hello world?</b>", // html body
// });


connectToDb()
    // .then( async () => await createProduct())
//     // .then( async () => await read())
    .then(() => app.listen(3000, () => console.log('Ready!')));