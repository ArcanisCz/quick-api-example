import lowdb from "lowdb";
import {v1} from "uuid";

const DB = lowdb('db.json');

export const getAll = ({}, res) => {
    const posts = DB.get("todos")
        .sortBy('createdDate')
        .reverse()
        .value();
    res.send(posts);
};

export const createTodo = ({body}, res) => {
    if (!body.text) {
        res.status(422).send("'text' field must be present in json");
    } else {
        const written = DB.get('todos')
            .push({
                id: v1(),
                text: body.text,
                completed: false,
                createdDate: new Date().getTime()
            })
            .last()
            .write();
        res.send(written);
    }
};

export const deleteTodo = ({param}, res) => {
    const id = param("id");
    if (!id) {
        res.status(422).send("'id' must be present in params");
    } else {
        const deleted = DB.get('todos')
            .remove({id})
            .last()
            .write();
        if (deleted.length === 0) {
            res.status(404).send("id not found, nothing to delete");
        } else {
            res.send(deleted);
        }
    }
};

export const updateText = ({param, body}, res) => {
    const text = body.text;
    const id = param("id");
    if (!text) {
        res.status(422).send("'text' field must be present in json");
    } else if (!id) {
        res.status(422).send("'id' must be present in params");
    } else {
        const written = DB.get('todos')
            .find({id})
            .assign({text})
            .last()
            .write();
        res.send(written);
    }
};

export const complete = ({param}, res) => {
    const id = param("id");
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

export const incomplete = ({req}, res) => {
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
