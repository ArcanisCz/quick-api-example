import {getAll} from "./controller";

export default (app) => {
    app.route('/')
        .get(getAll)
};