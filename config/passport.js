const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcryptjs')
const User = require('../models/user')

module.exports = app => {
  app.use(passport.initialize())
  app.use(passport.session())

  passport.use(new LocalStrategy({ usernameField: 'email' },
    (email, password, done) => {
      User.findOne({ email })
        .then(user => {
          if (!user) {
            return done(null, false, { message: '用戶不存在' })
          }
          return bcrypt.compare(password, user.password)
            .then(isMatch => {
              if (!isMatch) {
                console.log('xxxxx')
                return done(null, false, { message: 'Email 或密碼錯誤' })
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