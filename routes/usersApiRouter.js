const express = require('express');
const Router = require('express');
const passport = require('passport');
const multer = require('multer');
const mimeTypes = require('mime-types');
const { productRead, userRead } = require('../controller/read');
// const User = require('../models/user');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './public/uploads/');
    },
    filename: function(req, file, cb) {
        // cb("", Date.now() + "." + mimeTypes.extension(file.mimetype));
        cb("", "avatar" + "." + mimeTypes.extension(file.mimetype));
    },
});

const maxSize = 1 * 1024 * 1024 // 1MB

const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if(file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Solo se permiten subir archivos en formato .png, .jpg y .jpeg'));
        }
    },
    limits: { fileSize: maxSize }
});

const usersApiRouter = new Router()

// app.get('/*', async (req, res) =>{
//     res.status(403).send({ error : -1, descripcion: 'Ruta erronea !!' });
// });
// app.put('/*', async (req, res) =>{
//     res.status(403).send({ error : -1, descripcion: 'Ruta erronea !!' });
// });
// app.post('/*', async (req, res) =>{
//     res.status(403).send({ error : -1, descripcion: 'Ruta erronea !!' });
// });
// app.delete('/*', async (req, res) =>{
//     res.status(403).send({ error : -1, descripcion: 'Ruta erronea !!' });
// });




usersApiRouter.get('/', (req, res, next) => {
    res.render('index')
});


usersApiRouter.get('/signup', (req, res, next) => {
    res.render('signup')

});


usersApiRouter.post('/signup', upload.single('avatar'), passport.authenticate('local-signup', {
    successRedirect: '/login',
    failureRedirect: '/signup',
    passReqToCallback: true
}));


usersApiRouter.get('/login', (req, res, next) => {
    res.render('login')

});


usersApiRouter.post('/login', passport.authenticate('local-login', {
    successRedirect: '/profile',
    failureRedirect: '/login',
    passReqToCallback: true
}));


usersApiRouter.get('/logout', (req, res) => {
    req.session.destroy(() => {
        res.redirect('/');
    })
});


// usersApiRouter.use((req, res, next) => {
//     isAuthenticated(req, res, next);
//     next();
// });




usersApiRouter.get('/profile', async (req, res ) => {
    // let nameuser = req.passport.user
    // if (req.passport.username) {

    //     res.render('profile', nameuser)
    // }
    const products = await productRead();
    

    // res.send(JSON.stringify(products));
    res.render('profile', {products:products})

});



// usersApiRouter.get('/profile',  (req, res, next) => {

    // User.find({ })
    // .then(users => {
    // console.log(users);

    // })
    // .catch(err => {
    // console.error(err);
    // });
    // await User.find({}, function(err, users){
    //     res.render('profile', {
    //         username: users
    //     });

    // });
    // const user = await User.find({});

    // const user =   User.find({})

    // const username = await collection.findOne({ username: username });
    // let user = 'nonito'
    // res.render('profile', { username:user });
//         res.render('profile');
// });



function isAuthenticated(req, res, next) {

    if(req.isAuthenticated()){
        return next()
    }else{

        res.redirect('/signup');
    }
};

module.exports = { usersApiRouter };