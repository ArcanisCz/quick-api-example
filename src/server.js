import express from "express";
import bodyParser from "body-parser";
import routes from "./routes";

const App = express();
const PORT = 8080;

App.use(bodyParser.urlencoded({ extended: true }));
App.use(bodyParser.json());
routes(App);
App.listen(PORT);

console.log("Server started on port "+PORT);
