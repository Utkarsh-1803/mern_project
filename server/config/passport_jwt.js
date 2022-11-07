const passport = require("passport"); //requiring passport
const JWTStrategy = require("passport-jwt").Strategy; //jwt strategy
const ExtractJWT = require("passport-jwt").ExtractJwt; //extracting the jwt token
const User = require("../models/user");

let opts = {
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: "PaOpZvKmDVqtVwaUWLBvia9X5qNMaSNp", //secret key used to encrypt/decrypt
};

passport.use(
  new JWTStrategy(opts, function (jwtPayLoad, done) {
    User.findById(jwtPayLoad._id, function (err, user) {
      if (err) {
        //if error occured
        console.log("Error in finding user --> Passport JWT");
        return done(err);
      }
      if (user) {
        //if user found
        return done(null, doctor);
      } else {
        //if user not found
        return done(null, false);
      }
    });
  })
);

module.exports = passport;
