const passport=require("passport");
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const TwitterStrategy = require('@superfaceai/passport-twitter-oauth2').Strategy;
const GitHubStrategy = require('passport-github2').Strategy;

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

passport.use(new TwitterStrategy({
  clientType: 'confidential',
  clientID: "TWpSZ3d5VEhDMFNlSXQwZGVoZEE6MTpjaQ",
  clientSecret: "vsxMjDJGsjRY8rb1UxQNfvoKqpIv9RZR_dOOybUfyM_3T9apj3",
  callbackURL: "http://localhost:3000/auth/twitter/callback"
  }, function(token, tokenSecret, profile, done) {
      return done(null, profile);
  }));

  passport.use(new GitHubStrategy({
    clientID: "e15309c585ac3b8f2f4a",
    clientSecret: "fd090b357ce9a871054dd8a8fad97482009b5d9b",
    callbackURL: "http://localhost:3000/auth/github/callback"
    }, function(accessToken, refreshToken, profile, done) {
        return done(null, profile);
    }));