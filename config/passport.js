const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcryptjs')
const User = require('../models/user')

module.exports = app => {
  app.use(passport.initialize())
  app.use(passport.session())

  passport.use(new LocalStrategy({ passReqToCallback: true, usernameField: 'email' },
    (req, email, password, done) => {
      User.findOne({ email })
        .then(user => {
          if (!user) {
            req.flash('warning_msg', 'Email 或密碼錯誤')
            return done(null, false)
          }
          return bcrypt.compare(password, user.password)
            .then(isMatch => {
              if (!isMatch) {
                req.flash('warning_msg', 'Email 或密碼錯誤')
                return done(null, false)
              }
              return done(null, user)
            })
        })
        .catch(err => done(err, false))

      passport.serializeUser((user, done) => {
        done(null, user.id)
      })
      passport.deserializeUser((id, done) => {
        User.findById(id)
          .lean()
          .then(user => done(null, user))
          .catch(err => done(err, null))
      })
    }))
}