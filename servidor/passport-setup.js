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
    callbackURL:"https://proyecto22-nldsyuowra-ew.a.run.app/google/callback" //Aquí va el link del desplegado
  },
  function(accessToken, refreshToken, profile, done) {
    //User.findOrCreate({ googleId: profile.id }, function (err, user) {
    return done(null, profile);
    //});
  }
));


// LOGIN TWITTER
//clientID:"TWpSZ3d5VEhDMFNlSXQwZGVoZEE6MTpjaQ",
//    clientSecret:"F8ld7eBZmx0sRCJVZ9hGoNK2-1eSb6Hg9_oKvDDEpHC8XpU62Y",
//    callbackURL:"https://proyecto22-nldsyuowra-ew.a.run.app/twitter/callback" //Aquí va el link del desplegado

