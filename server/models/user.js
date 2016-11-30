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
    siteAdmin: {
		type: DataTypes.BOOLEAN,
		defaultValue: false
	},
    movieAdmin: {
		type: DataTypes.BOOLEAN,
		defaultValue: false
	},
    directorAdmin: {
		type: DataTypes.BOOLEAN,
		defaultValue: false
	},
  }, {
    classMethods: {
    }
  });
  return User;
};
