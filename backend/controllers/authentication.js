const User = require('../models/user')
const jwt = require('jwt-simple')

const tokenForUser = (user) => {
  const timestamp = new Date().getTime()
  return jwt.encode({sub: user.id, iat: timestamp}, "SECRET")
}

exports.signin = (req, res, next) => req.user.isEmailVerified ? res.send({ token: tokenForUser(req.user)}) :
	res.status(401).send({error: "Your account has not been verified."});

exports.signup = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  if (!email || !password) {
  	return res.status(422).send({error: "You must provide email and password"})
  }

  User.findOne({email}, async (err, existingUser) => {
  	if (err) {
  		return next(err)
  	}

  	if (existingUser) {
  	  return res.status(422).send({error: 'Email is in use'})
  	}

  	const user = new User({
  	  email,
  	  password
  	});


  	 user.saveHashPassword();
  	 user.sendVerifyEmail();

  	user.save((err) => {
  	  if (err) { return next(err) }
  	  res.json({token: tokenForUser(user)})
  	})
  })
};

exports.resetPassword = (req, res, next) => {
	const email = req.body.email;

	if (!email) {
  	return res.status(422).send({error: "Email does not exist!!!"})
  }

  User.findOne({email}, async (err, user) => {
  	if (err) {
  		return next(err)
  	}
  	if (user) {
  	  await user.resetPassword(req);
  	  return res.status(200).send({status: 'Check your email for reset password'})
  	}
  })
};

exports.changePassword = (req, res, next) => {
	const email = req.params.email;
	const hash = req.params.hash;
	const password = req.body.password;

	if (!email || !hash) {
  	    return res.status(422).send({error: "Missing hash or email"})
     }

	if (!password) {
		return res.status(422).send({error: "New password is missing"})
	}

  User.findOne({email}, async (err, user) => {
  	if (err) {
  		res.send("Error")
  		return next(err)
  	}
  	if (user) {
  	  if(user.resetPasswordToken === hash){
  	  	user.resetPasswordToken = null;
  	  	user.password = password;
  	  	user.saveHashPassword();
  	  	user.save()
  	  	res.send({status: "Your password changed successfully"})
	  } else {
		  res.status(406).send({status: "Wrong hash"});
	  }
  	}
  	else {
  		res.status(401).send({message: "User does not exist"})
	}
  })
};

exports.verifyAccount = (req, res, next) => {
	const email = req.params.email;
	const hash = req.params.hash;

	if (!email || !hash) {
  	    return res.status(422).send({error: "Missing hash or email"})
     }

     User.findOne({email}, async (err, user) => {
  	if (err) {
  		res.send("Error")
  		return next(err)
  	}
  	if (user) {
  	  if(user.verificationToken === hash){
  	  	user.verificationToken = null;
  	  	user.isEmailVerified = true;
  	  	user.save()
  	  	res.send({status: "Your profile activated successfully"})
	  } else {
		  res.status(406).send({status: "Wrong hash"});
	  }
  	}
  	else {
  		res.status(401).send({message: "User does not exist"})
	}
  })
};
