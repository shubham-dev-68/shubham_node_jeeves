'use strict';

const errorMessages = require('../constants/error_messages');
const constants = require('../constants');

const {Model} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Post extends Model {

        static associate(models) {
            // define association here
            this.belongsTo(models.User, { foreignKey: "user_id" })
            this.belongsTo(models.Topic, { foreignKey: "topic_id" })
            this.hasMany(models.Image, { foreignKey: "post_id" })
            this.hasMany(models.Comment, { foreignKey: "post_id" })
        }

        toJSON() {
            return {...this.get(), updatedAt: undefined, createdAt: undefined }
        }
    };
    Post.init({
        content: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: { msg: errorMessages.POST_CONTENT_REQUIRED },
                notEmpty: { msg: errorMessages.POST_CONTENT_CANNOT_BE_EMPTY },
            }
        }
    }, {
        sequelize,
        modelName: constants.POST,
    });
    return Post;
};