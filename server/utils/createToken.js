'use strict';

const jwt = require('jsonwebtoken');
const env = require('../config/envVariables');

function createToken(user) {
  let scopes;
  if (user.admin) {
    scopes = 'admin';
  }

  // Sign the JWT
  return jwt.sign({ id: user._id, username: user.username, scope: scopes }, env.secret, { algorithm: 'HS256', expiresIn: "1h" } );
}

module.exports = createToken;
