const User = require('../models/user')
const jwt = require('jwt-simple')

const tokenForUser = (user) => {
  const timestamp = new Date().getTime()
  return jwt.encode({sub: user.id, iat: timestamp}, "SECRET")
}

exports.signin = (req, res, next) => res.send({ token: tokenForUser(req.user) })


exports.signup = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  if (!email || !password) {
  	return res.status(422).send({error: "You must provide email and password"})
  }

  User.findOne({email}, (err, existingUser) => {
  	if (err) {
  		console.log(err, "asdas")
  		return next(err)
  	}

  	if (existingUser) {
  	  return res.status(422).send({error: 'Email is in use'})
  	}

  	const user = new User({
  	  email,
  	  password
  	});

  	user.save((err) => {
  	  if (err) { return next(err) }

  	  res.json({token: tokenForUser(user)})
  	})
  })
}
