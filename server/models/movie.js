'use strict';

module.exports = function(sequelize, DataTypes) {
    let Movie = sequelize.define("Movie", {
        title: DataTypes.STRING,
        year: DataTypes.INTEGER,
        DirectorId: DataTypes.INTEGER,
        genre: DataTypes.STRING,
        description: DataTypes.TEXT,
        synopsis: DataTypes.STRING,
        rating: {
            type: DataTypes.INTEGER,
            defaultValue: 3
        }
    }, {
        classMethods: {
            associate: function(models) {
                Movie.belongsTo(models.Director);
                Movie.hasOne(models.File);
            }
        }
    });
    return Movie;
};
