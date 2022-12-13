const passport=require("passport");
const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.serializeUser(function(user, done) {
  //console.log(user);
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  //User.findById(id, function(err, user) {
    done(null, user);
  //});
});

passport.use(new GoogleStrategy({
    clientID:"307594857193-b72h47isnh5fgivcofk2p5krrfamh59t.apps.googleusercontent.com",
    clientSecret:"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",
    callbackURL:"http://localhost:3000/google/callback" //Aquí va el link del desplegado
  },
  function(accessToken, refreshToken, profile, done) {
    //User.findOrCreate({ googleId: profile.id }, function (err, user) {
    return done(null, profile);
    //});
  }
));
