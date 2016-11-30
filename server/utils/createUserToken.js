'use strict';

const jwt = require('jsonwebtoken');
const env = require('../config/envVariables');
const rolesConfig = require('../config/rolesConfig');

function createToken(user) {
  let scopes = [];
  rolesConfig.forEach((role) => {
	  if (user[role.name]) {
		  scopes.push(role.name);
	  }
  })

  // Sign the JWT
  return jwt.sign({ id: user._id, username: user.username, scope: scopes }, env.secret, { algorithm: 'HS256', expiresIn: "1h" } );
}

module.exports = createToken;
