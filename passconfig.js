const { authenticate } = require('passport');
const bcrypt = require('bcryptjs');
const localStrategy = require('passport-local').Strategy;

/////////////////////////////////////////////////////////////

function init(passport, getUserByEmail){
    const authenticateUser = (email, password, done) => {
    const user = getUserByEmail(email);
    if(user == null){
        return done(null, false, {message : " No user wiht that email "})
    }
    try {
        if(await bcrypt.compare(password, user.password)){
            return done(null, user);
        } else {
            return done(null, false, {message: "Password incorrect"});
        }
    } catch(e) {
        return done(e)
    }

    }
    passport.use(new localStrategy({usernameField:'email'}),
    authenticateUser);



    ////////////SERIALIZER i DESERIALIZER//////////////
    /*
    funkcje informują Passport.js, jak uzyskać informacje z obiektu użytkownika 
    do przechowywania w sesji (serializacja) 
    oraz jak pobrać te informacje i przekształcić je z powrotem w obiekt użytkownika (deserializacja).
    
    */
    passport.serializeUser((user, done) => {

    });
    passport.deserializeUser((id, done) => {

    })


}
module.exports = init