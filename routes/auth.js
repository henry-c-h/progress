const bcrypt = require('bcryptjs');
const User = require('../models/User');
const Category = require('../models/Category');

module.exports = function (passport) {
  const router = require('express').Router();
  router.post('/register', (req, res) => {
    User.findOne({ email: req.body.email }, async (err, doc) => {
      if (err) res.json(err);
      if (doc) res.json('Email already registered');
      if (!doc) {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const newUser = new User({
          username: req.body.username,
          password: hashedPassword,
          email: req.body.email,
        });
        const user = await newUser.save();
        // create new categories when user is registered
        const generalCategory = new Category({
          name: 'general',
          author: user._id,
        });
        // const workCategory = new Category({
        //   name: 'work',
        //   author: user._id,
        // });
        // const personalCategory = new Category({
        //   name: 'personal',
        //   author: user._id,
        // });

        await generalCategory.save();
        // await workCategory.save();
        // await personalCategory.save();
      }
    });
  });

  router.post('/login', passport.authenticate('local'), (req, res) => {
    if (req.user !== 'undefined') {
      const { password, ...userInfo } = req.user._doc;
      res.status(200).json(userInfo);
    }
  });

  router.get('/logout', (req, res) => {
    req.logout();
    req.session.destroy();
  });

  return router;
};
