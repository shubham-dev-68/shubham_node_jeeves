const userRoutes = require("./user.route.js");
const topicRoutes = require("./topic.route.js");
const postRoutes = require("./post.route.js");

module.exports = (app) => {
    app.use("/api/user", userRoutes);
    app.use("/api/post", postRoutes);
    app.use("/api/topic", topicRoutes);
};