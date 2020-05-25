"use strict";
module.exports = (sequelize, DataTypes) => {
  const Place = sequelize.define(
    "Place",
    {
      name: DataTypes.STRING,
      image: DataTypes.TEXT,
      lat: DataTypes.STRING,
      lon: DataTypes.STRING,
      description: DataTypes.TEXT,
      qualification: DataTypes.FLOAT,
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
      },
    },
    {}
  );
  Place.associate = function (models) {
    // belogsTo
    Place.belongsTo(models.User);
  };
  return Place;
};
