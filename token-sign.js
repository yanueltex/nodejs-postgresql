const jwt = require('jsonwebtoken');
// https://jwt.io/

const secret = 'myCat'; // Lave secreta (Debería estár como una variable de entorno, nunca en código)
// El payload es lo que vamos a encriptan en nuestro token
const payload = {
  sub: 1, // Subjet (que es un estandar) es la forma en la que vamos a identificar el usuario
  role: 'customer', // Para los permisos, tambien se puede llamar "scope:"
};

function signToken(payload, secret) {
  return jwt.sign(payload, secret); // Con esto hacemos una firma y nos dara nuestro token
}

const token = signToken(payload, secret);
console.log(token);
