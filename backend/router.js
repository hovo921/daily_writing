const Authentication = require('./controllers/authentication');
const Words = require('./controllers/words');
const passportService = require('./services/passport');
const passport = require('passport');

const requireAuth = passport.authenticate('jwt', { session : false });
const requireSignin = passport.authenticate('local', { session : false });

module.exports = (app) => {
  app.post('/signup', (req, res) => res.send({message: 'hi there'}));
  app.get('/', () => )
  app.post('/signin', requireSignin, Authentication.signin);
  app.post('/reset-password', Authentication.resetPassword);

  app.post('/change-password/:email/:hash', Authentication.changePassword);
  app.post('/verify-account/:email/:hash', Authentication.verifyAccount);

  app.get('/wordCount', requireAuth, (req, res) => res.send({message: 'hi there'}));

  app.post('/word', requireAuth, Words.addWordForUser);
  app.post('/wordsForUser', requireAuth, Words.getWordsCountForCurrentUser);

}
