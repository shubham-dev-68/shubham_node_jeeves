'use strict';

const errorMessages = require('../constants/error_messages');
const constants = require('../constants');

const {Model} = require('sequelize')

module.exports = (sequelize, DataTypes) => {
    class Comment extends Model {

        static associate(models) {
            // define association here
            this.belongsTo(models.User, { foreignKey: "user_id" });
            this.belongsTo(models.Post, { foreignKey: "post_id" });
        }

        toJSON() {
            return {...this.get(), id: undefined}
        }
    };
    Comment.init({
        text: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: { msg: errorMessages.COMMNET_CONTENT_REQUIRED },
                notEmpty: { msg: errorMessages.COMMNET_CONTENT_CANNOT_BE_EMPTY }
            },
        }
    }, {
        sequelize,
        modelName: constants.COMMENT,
    });
    return Comment;
};