const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');

class Track extends Model {
    checkPassword(loginPw) {
      return bcrypt.compareSync(loginPw, this.password);
    }
  }
  
    Track.init({ //Determine what elements will make up the object of track and replace body, title.
      title:{
        type:DataTypes.STRING,
        allowNull:false
      },
      body:{
        type:DataTypes.STRING,
        allowNull:false
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull:false,
        unique: true,
        references: {
          model: 'user',
          key: 'id',
        }
    },
  
    },
    {
      sequelize,
      timestamps: false,
      freezeTableName: true,
      underscored: true,
      modelName: 'track',
    }
  );
  
  module.exports = Track;