const jwt = require('jsonwebtoken');
https://jwt.io/

const secret = 'myCat'; // Lave secreta (Debería estár como una variable de entorno, nunca en código)
const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsInJvbGUiOiJjdXN0b21lciIsImlhdCI6MTczMDQwMjcwMH0.NuFpdyVb56TZz5oPxNV1Ebvb9i_hN95PRVjQipuQZ88';

function verifyToken(token, secret) {
  return jwt.verify(token, secret); // Con esto verificamos nuestro token
}

const payload = verifyToken(token, secret);
console.log(payload);
