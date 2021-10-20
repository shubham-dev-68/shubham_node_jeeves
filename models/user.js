'use strict';

const errorMessages = require('../constants/error_messages');
const constants = require('../constants');

const {Model} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        static associate(models) {
            // define association here
            this.hasMany(models.Topic, { foreignKey: constants.USER_ID });
            this.hasMany(models.Post, { foreignKey: constants.USER_ID });
            this.hasMany(models.Comment, { foreignKey: constants.USER_ID });
        }
        toJSON() {
            return {...this.get(), id: undefined, password: undefined }
        }
    };
    User.init({
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: { msg: errorMessages.USER_NAME_NOT_NULL_ERR },
                notEmpty: { msg: errorMessages.USER_NAME_NOT_EMPTY }
            }
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: { msg: errorMessages.USER_EMAIL_REQUIRED },
                notEmpty: { msg: errorMessages.USER_EMAIL_NOT_EMPTY }
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: { msg: errorMessages.USER_PASSWORD_REQUIRED },
                notEmpty: { msg: errorMessages.USER_PASSWORD_NOT_EMPTY }
            }
        }
    }, {
        sequelize,
        modelName: constants.USER,
    });

    return User;
};