'use strict';

module.exports = function(sequelize, DataTypes) {
  let User = sequelize.define('User', {
    email: {
		type: DataTypes.STRING,
		unique: true
	},
    username:  {
		type: DataTypes.STRING,
		unique: true
	},
    password: DataTypes.STRING,
    admin: {
		type: DataTypes.BOOLEAN,
		defaultValue: true
	}
  }, {
    classMethods: {
    }
  });
  return User;
};
