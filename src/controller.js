import lowdb from "lowdb";

const db = lowdb('src/db.json');

export const getAll = (req, res) => {
    const posts = db.get("todos")
        .sortBy('createdDate')
        .reverse()
        .value();
    res.send(posts);
};