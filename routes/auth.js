var express = require('express');
var router = express.Router();

var passport = require('passport');
var GitHubStrategy = require('passport-github').Strategy;
var JirenguStrategy = require('passport-jirengu').Strategy;

passport.serializeUser(function(user,done){
  // 当用户登录成功后，会将用户的 use 内容存到 session 中
  console.log('========序列化======')
  console.log(user);
  console.log(JSON.stringify(user))
  done(null,user);
})

passport.deserializeUser(function(obj,done){
  // 当用户刷新页面的时候，将用户的 session 信息取出来
  
  console.log('=====取用户信息========')
  done(null,obj)
})

// 做基本的配置，如果配置走通，则可以进行授权等操作
passport.use(new GitHubStrategy(
  {
    clientID: '3ad2adc665f2396d6468',
    clientSecret: '615bf118bd0853d4c8c936740b02492b710771ef',
    callbackURL: "http://127.0.0.1:3000/auth/github/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    // User.findOrCreate({ githubId: profile.id }, function (err, user) {
    //   console.log(123);
    //   console.log(profile)
    //   return cb(err, user);
    // });
    console.log('******************')
    console.log(profile);
    done(null, profile);
  }
));

/* GET home page. */
router.get('/github',
  passport.authenticate('github'));

router.get('/github/callback',
  passport.authenticate('github', { failureRedirect: '/login' }),
  function(req, res) {
    req.session.user = {
      id: req.user.id,
      username: req.user.displayName || req.user.username,
      avatar: req.user._json.avatar_url,
      provider: req.user.provider
    };
    res.redirect('/');
  });




router.get('/logout', function(req, res, next) {
  //res.send('注销登录')
  req.session.destroy();
  res.redirect('/');
});

module.exports = router;
