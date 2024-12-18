const bcrypt = require('bcrypt');

async function verifyPassword() {
  const myPassword = 'admin 123 .202';
  const hash = '$2b$10$9Rpi/G7qFDlsZQig22HXre71TAJeVKxKyysvyLuNa2zx2DqGOwqk.';
  const isMatch = await bcrypt.compare(myPassword, hash);
  console.log(isMatch);
}

verifyPassword();
