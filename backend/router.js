const Authentication = require('./controllers/authentication');
const Words = require('./controllers/words');
const passportService = require('./services/passport');
const passport = require('passport');

const requireAuth = passport.authenticate('jwt', { session : false });
const requireSignin = passport.authenticate('local', { session : false });

module.exports = (app) => {
  app.get('/wordCount', requireAuth, (req, res) => res.send({message: 'hi there'}));
  app.post('/signup', Authentication.signup)
  app.post('/signin', requireSignin, Authentication.signin);
  app.post('/word', requireAuth, Words.addWordForUser);
  app.post('/wordsForUser', requireAuth, Words.getWordsCountForCurrentUser);

}
