const controller = require("./controller");

module.exports = function(app) {
    app.route('/')
        .get(controller.getAll)
        .post(controller.createTodo);

    app.route("/:id")
        .post(controller.updateText)
        .delete(controller.deleteTodo);

    app.route("/todos/:id/complete")
        .post(controller.complete);

    app.route("/todos/:id/incomplete")
        .post(controller.incomplete);
};