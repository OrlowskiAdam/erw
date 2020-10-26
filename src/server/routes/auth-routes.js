const Router = require('express');

const router = Router();

const passport = require('passport');
const osuPassport = require('passport-osu');
const CLIENT_HOME_PAGE_URL = 'http://localhost:3000';

// when login is successful, retrieve user info
router.get('/login/success', (req, res) => {
  if (req.user) {
    res.json({
      success: true,
      message: 'user has successfully authenticated',
      user: req.user,
      cookies: req.cookies
    });
  }
});

// when login failed, send failed msg
router.get('/login/failed', (req, res) => {
  res.status(401).json({
    success: false,
    message: 'user failed to authenticate.'
  });
});

// When logout, redirect to client
router.get('/logout', (req, res) => {
  req.logout();
  res.redirect(CLIENT_HOME_PAGE_URL);
});

// auth with osu
router.get(
  '/osu',
  passport.authenticate('osu', {
    scope: ['identify']
  })
);

// redirect to home page after successfully login via osu
router.get(
  '/osu/redirect',
  passport.authenticate('osu', {
    successRedirect: CLIENT_HOME_PAGE_URL,
    failureRedirect: '/auth/login/failed'
  })
);

module.exports = router;
