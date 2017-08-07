import {
    getAll,
    createTodo,
    deleteTodo,
    updateText,
    complete,
    incomplete,
} from "./controller";

export default (app) => {
    app.route('/')
        .get(getAll)
        .post(createTodo);

    app.route("/:id")
        .post(updateText)
        .delete(deleteTodo);

    app.route("/todos/:id/complete")
        .post(complete);

    app.route("/todos/:id/incomplete")
        .post(incomplete);
};