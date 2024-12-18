const { Strategy } = require('passport-local');

const AuthService = require('./../../../services/auth.service');
const service = new AuthService();

const LocalStrategy = new Strategy(
  {
    // Aquí definimos los nombres de los campos que queremos que nos envíen
    usernameField: 'email',
    passwordField: 'password',
  },
  async (email, password, done) => {
    try {
      const user = await service.getUser(email, password);
      done(null, user); // Cuando pase todas las validaciones se envía done("null", "usuario encontrado")
    } catch (error) {
      done(error, false); // El error se envía con done("el error", "false");
    }
  }
);

module.exports = LocalStrategy;
