'use strict';

const errorMessages = require('../constants/error_messages');
const constants = require('../constants');

const {Model} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Topic extends Model {

        static associate(models) {
            // define association here
            this.belongsTo(models.User, { foreignKey: "user_id" });
            this.hasMany(models.Post, { foreignKey: "topic_id" });
        }

        toJSON() {
            return {...this.get(), id: undefined, updatedAt: undefined, createdAt: undefined }
        }
    };
    Topic.init({
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                notNull: { msg: errorMessages.TOPIC_NAME_REQUIRED },
                notEmpty: { msg: errorMessages.TOPIC_NAME_NOT_EMPTY }
            }
        }
    }, {
        sequelize,
        modelName: constants.TOPIC,
    });
    return Topic;
};