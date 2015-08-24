var express = require('express');
    router = express.Router(),
    mongoose = require('mongoose'),
    Account = require('../public/models/usersModels'),
    session = require('express-session'),
    passport = require('passport');

// =================BACKEND CRUD API ROUTING FOR AUTHENTICATION=================

// -----------------------------REGISTER-----------------------------

router.route('/auth')

    // register new user
    .post(function(req, res, next) {
        console.log('registering user');
        Account.register(new Account( 
            { 
                username:   req.body.username,
                nickname:   req.body.nickname,
                first_name: req.body.first_name,
                last_name:  req.body.last_name,
                created_at: Date.now(),
                role:       req.body.role
            }),

            req.body.password, function(err) {
                console.log('auth status 1');
                if (err) {
                    res.send(err);
                    // res.json({msg: err});
                    return next(err); 
                }

                console.log('user registered!');
                res.redirect('/#list');
        });
    });

// -----------------------------GET ALL USERS-----------------------------

// aut middleware built in the router
router.get('/users', function(req, res) {
    console.log('/users get authenticating user');

    if (!req.isAuthenticated() || req.user.role !== 'admin') {
        res.sendStatus(401);
    }

    else {
        console.log('authenticated: ' + req.user.username);
    
        Account.find(function(err, data){
            if (err)
                res.send(err);
            res.json(data);
        });
    }   
});

// -----------------------------GET USER BY ID-----------------------------

// get user by id
router.route('/users/:user_id')
    .get(function(req, res){

        if (!req.isAuthenticated() || req.user.role !== 'admin') {
            res.sendStatus(401);
        }

        else {
            Account.findById(req.params.user_id, function(err, user){
                if (err)
                    res.send(err);
                res.json(user);
            });
        }
    })

// _____________________________DELETE BY ID_____________________________

    .delete(function(req, res) {

        if (!req.isAuthenticated() || req.user.role !== 'admin') {
            res.sendStatus(401);
        }

        else {
            Account.remove({
                _id: req.params.user_id

            }, 
            function(err, Account) {
                if (err)
                res.send(err);

                res.json({ message: 'felhasználó törölve' });
            });
        }
    })

    .put(function(req, res){

        if (!req.isAuthenticated() || req.user.role !== 'admin') {
            res.sendStatus(401);
        }

        else {
            
            console.log('authenticated: ' + req.user.username);

            Account.findById(req.params.user_id, function(err, user){

                console.log('findById Account: ' + user);

                if (err)
                   res.send(err);


                user.username   = req.body.username,
                user.nickname   = req.body.nickname,
                user.first_name = req.body.first_name,
                user.last_name  = req.body.last_name,
                user.role       = req.body.role,

                created_at      = req.body.created_at;
                

                user.save(function(err){
                    if(err)
                        res.send(err);
                    res.json({ msg: 'felhasználó frissítve'});
                });
            });
        }
});         


// -----------------------------PROFILE-----------------------------

router.get('/profile', function(req, res) {
    console.log('/users get authenticating user');

    if (!req.isAuthenticated()) {
        res.sendStatus(401);
    }

    else {
        console.log('authenticated: ' + req.user.username);
    
        Account.find(function(err, data){
            if (err)
                res.send(err);
            res.json(data);
        });
    }   
});

router.route('/profile/:user_id')
    .get(function(req, res){

        if (!req.isAuthenticated()) {
            res.sendStatus(401);
        }

        else {
            Account.findById(req.params.user_id, function(err, user){
                if (err)
                    res.send(err);
                res.json(user);
            });
        }
    })

    .put(function(req, res){

        if (!req.isAuthenticated()) {
            res.sendStatus(401);
        }

        else {
            
            console.log('authenticated: ' + req.user.username);

            Account.findById(req.params.user_id, function(err, user){

                console.log('findById Account: ' + user);

                if (err)
                   res.send(err);


                user.username   = req.body.username,
                user.nickname   = req.body.nickname,
                user.first_name = req.body.first_name,
                user.last_name  = req.body.last_name,
                user.role       = req.body.role,

                created_at      = req.body.created_at;
                

                user.save(function(err){
                    if(err)
                        res.send(err);
                    res.json({ msg: 'felhasználó frissítve'});
                });
            });
        }
});     

// -----------------------------LOGIN-----------------------------

// authenticate user 
router.post('/login', passport.authenticate('local'), function(req, res) {

  // res.redirect('/');
  console.log('/login post authenticating user');
  res.send(req.user);

  console.log('/login post sent user: ' + req.user.username);
});

router.get('/login', passport.authenticate('local', {failureFlash: true }), function(req, res){
    console.log('/login get authenticating user');
    res.send(req.user);
});

// -----------------------------CHECK IF LOGGEDIN-----------------------------

// route to test if the user is logged in or not
 router.get('/loggedin', function(req, res) { 
    console.log('/loggedin get authenticating user');
    res.send(req.isAuthenticated() ? req.user : '0');
    // console.log('user: ' + req.user.role);
}); 

// -----------------------------LOGOUT-----------------------------

// req.logout function to terminate session
router.get('/logout', function(req, res) {
    console.log('/logout get authenticating user');
    req.logout();
    // res.sendStatus(200);
    res.redirect('/login');
});

module.exports = router;