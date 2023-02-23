const { DataTypes } = require('sequelize');
const { Activity } = require('./Activity')
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('country', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    id: {
      type: DataTypes.STRING(3),
      allowNull: false,
      primaryKey: true
    },
    flags: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    continents: {
      type: DataTypes.STRING,
      allowNull: false
    },
    capital: {
      type: DataTypes.STRING,
      allowNull: true
    },
    subregion: {
      type: DataTypes.STRING,
    },
    population: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    area: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    fifa: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }); 
};