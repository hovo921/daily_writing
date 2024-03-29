const Nodemailer = require("../services/nodeMailer");
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt-nodejs');
const crypto = require('crypto');

const userSchema = new Schema({
  email: { type: String, unique: true, lowercase: true },
  password: String,
  name: String,
  userName: String,
  isVerified: { type: Boolean, default: false },
  verificationToken: String,
  resetPasswordToken: String
});

userSchema.methods.comparePassword = function (candidatePassword, callback) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {

    if (err) return callback(err)

    callback(null, isMatch)
  })
}

userSchema.methods.saveHashPassword = function () {
  const user = this;
  bcrypt.genSalt(10, (err, salt) => {
    if (err) { return next(err) }

    bcrypt.hash(user.password, salt, null, async (err, hash) => {
      if (err) { return next(err) }
      user.password = hash;
      next()
    })
  })
};

userSchema.methods.resetPassword = async function () {
  const resetPasswordToken = crypto.randomBytes(16).toString('hex');
  const url  = "http://oktob.online" + '/reset-password?email=' + this.email + '&hash=' + resetPasswordToken;
  this.resetPasswordToken = resetPasswordToken;
  this.save()
  return  Nodemailer.sendResetPasswordMessage(this.email, url);
};

userSchema.methods.sendVerifyEmail = async function (verificationToken) {
  const url  = "http://oktob.online" + '/activate-profile?email=' + this.email + '&hash=' + verificationToken;

  await Nodemailer.sendVerificationEmail(this.email, url);
};

const ModelClass = mongoose.model('user', userSchema);

module.exports = ModelClass;
