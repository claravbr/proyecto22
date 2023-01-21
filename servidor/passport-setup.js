const passport=require("passport");
const GoogleStrategy = require('passport-google-oauth20').Strategy;
//const TwitterStrategy = require('passport-twitter').Strategy;

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
    done(null, user);
});

passport.use(new GoogleStrategy({
    clientID:"307594857193-b72h47isnh5fgivcofk2p5krrfamh59t.apps.googleusercontent.com",
    clientSecret:"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",
    callbackURL:"https://proyecto22-nldsyuowra-ew.a.run.app/google/callback" //Aquí va el link del desplegado
  },
  function(accessToken, refreshToken, profile, done) {
    return done(null, profile);
  }
));

/*passport.use(new TwitterStrategy({
  consumerKey: "TWpSZ3d5VEhDMFNlSXQwZGVoZEE6MTpjaQ",
  consumerSecret: "vsxMjDJGsjRY8rb1UxQNfvoKqpIv9RZR_dOOybUfyM_3T9apj3",
  callbackURL: "http://localhost:3000/twitter/callback"
  }, function(token, tokenSecret, profile, done) {
      return done(null, profile);
  }));*/