const lowdb = require("lowdb");
const uuid = require("uuid");

const DB = lowdb('db.json');

module.exports.getAll = function (req, res) {
    const posts = DB.get("todos")
        .sortBy('createdDate')
        .reverse()
        .value();
    res.send(posts);
};

module.exports.createTodo = function (req, res) {
    if (!req.body.text) {
        res.status(422).send("'text' field must be present in json");
    } else {
        const written = DB.get('todos')
            .push({
                id: uuid.v1(),
                text: req.body.text,
                completed: false,
                createdDate: new Date().getTime()
            })
            .last()
            .write();
        res.send(written);
    }
};

module.exports.deleteTodo = function (req, res) {
    const id = req.param("id");
    if (!id) {
        res.status(422).send("'id' must be present in params");
    } else {
        const deleted = DB.get('todos')
            .remove({id: id})
            .last()
            .write();
        if (deleted.length === 0) {
            res.status(404).send("id not found, nothing to delete");
        } else {
            res.send(deleted);
        }
    }
};

module.exports.updateText = function (req, res) {
    const text = req.body.text;
    const id = req.param("id");
    if (!text) {
        res.status(422).send("'text' field must be present in json");
    } else if (!id) {
        res.status(422).send("'id' must be present in params");
    } else {
        const written = DB.get('todos')
            .find({id: id})
            .assign({text: text})
            .last()
            .write();
        res.send(written);
    }
};

module.exports.complete = function (req, res) {
    const id = req.param("id");
    if (!id) {
        res.status(422).send("'id' must be present in params");
    } else {
        const completed = DB.get('todos')
            .find({
                id: id,
                completed: false
            })
            .assign({
                completed: true,
                completedDate: new Date().getTime()
            })
            .write();
        if (!completed.id) {
            res.status(404).send("id not found or trying to complete already completed item");
        } else {
            res.send(completed);
        }
    }
};

module.exports.incomplete = function (req, res) {
    const id = req.param("id");
    if (!id) {
        res.status(422).send("'id' must be present in params");
    } else {
        const incompleted = DB.get('todos')
            .find({
                id: id,
                completed: true
            })
            .assign({
                completed: false,
                completedDate: undefined
            })
            .write();
        if (!incompleted.id) {
            res.status(404).send("id not found or trying to incomplete not completed item");
        } else {
            res.send(incompleted);
        }
    }
};
