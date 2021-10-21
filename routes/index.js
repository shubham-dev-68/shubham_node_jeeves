const userRoutes = require("./user.route.js");
const topicRoutes = require("./topic.route.js");
const postRoutes = require("./post.route.js");
const commentRoutes = require("./comment.route.js");

module.exports = (app) => {
    app.use("/api/user", userRoutes);
    app.use("/api/post", postRoutes);
    app.use("/api/topic", topicRoutes);
    app.use("/api/comment", commentRoutes);
};