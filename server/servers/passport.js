const JWTStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;

const UserProfile = require("../database/mongoSchema/UserProfile");
const key = require("../config/secretKey").jwtSecretKey;
const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = key;

module.exports = passport => {
  passport.use(
    new JWTStrategy(opts, (jwt_payload, done) => {
      UserProfile.findById(jwt_payload.id)
        .then(userProfile => {
          if (userProfile) {
            return done(null, userProfile);
          }
          return done(null, false);
        })
        .catch(e => {
          console.log(e);
        });
    })
  );
};
