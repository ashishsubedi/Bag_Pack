// load all the things we need
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('./bcrypt');


const connection = require('./connection');

// expose this function to our app using module.exports
module.exports = function (passport) {
    // used to serialize the user for the session

    passport.serializeUser(function (user, done) {
        
        done(null, user.id);
    });
    // used to deserialize the user
    passport.deserializeUser(function (id, done) {

        connection.query("SELECT * FROM users WHERE id = ?", id, (err, rows) => {
           
            done(err, rows[0]);
        });
    });

    passport.use('local-login', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true // allows us to pass back the entire request to the callback
    },
        function (req, email, password, done) { // callback with email and password from our form

            connection.query("SELECT * FROM `users` WHERE `Email` = ?", email, function (err, rows) {
                if (err) {
                    return done(err);
                }

                if (!rows.length) {
                    return done(null, false, req.flash('loginMessage', 'No user found.'));

                }

                // if the user is found but the password is wrong
                if (!(bcrypt.validPassword(password, rows[0].Password)))
                    return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.')); // create the loginMessage and save it to session as flashdata


                // all is well, return successful user
               /*  connection.query("UPDATE `users` SET `Logged In` = 1 WHERE `Email`= ?", email, (err, rows) => {
                    console.log("User Logged in");
                }); */
                return done(null, rows[0]);

            });



        }));

};


