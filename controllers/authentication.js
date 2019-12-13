const User = require('../models/user')
const jwt = require('jwt-simple')
const crypto = require('crypto');

const tokenForUser = (user) => {
  const timestamp = new Date().getTime()
  return jwt.encode({sub: user.id, iat: timestamp}, "SECRET")
}

// exports.signin = (req, res, next) => req.user.isVerified ? res.send({ token: tokenForUser(req.user)}) :
// // 	res.status(401).send({error: "Your account has not been verified."});

exports.signin = (req, res, next) => res.send({ token: tokenForUser(req.user)});

exports.signup = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const name = req.body.password;
  const userName = req.body.userName;

  if (!email || !password || !name || !userName) {
  	return res.status(422).send({error: "Please fill required fields"})
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
  	  password,
	  name,
	  userName
  	});

	  // const verificationToken = crypto.randomBytes(16).toString('hex');
	  //
  	//   user.saveHashPassword();
	  // user.isVerified = false;
	  // user.verificationToken = verificationToken;
  	//   user.sendVerifyEmail(verificationToken);

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
  	  	res.send({message: "Your password changed successfully"})
	  } else {
		  res.status(406).send({status: "Wrong hash"});
	  }
  	}
  	else {
  		res.status(401).send({status: "User does not exist"})
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
  	  	user.isVerified = true;
  	  	user.save()
  	  	res.send({message: "Your profile activated successfully"})
	  } else {
		  res.status(406).send({status: "Wrong hash"});
	  }
  	}
  	else {
  		res.status(401).send({message: "User does not exist"})
	}
  })
};
