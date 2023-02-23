const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('activity', {
    //De esta manera se va a guardar la informacion en la BD
    id: {
        type: DataTypes.STRING(3),
        allowNull: false,
        primaryKey: true
      },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    difficulty: {
        type: DataTypes.FLOAT(1),
        allowNull: false,
        validate: {
            min: 0,
            max: 5
        }
    },
    duration: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    season: {
        type: DataTypes.STRING,
        allowNull: true,
    },
  });

};
