"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const todos_1 = __importDefault(require("./Routes/todos"));
const app = (0, express_1.default)();
const body_parser_1 = __importDefault(require("body-parser"));
app.use(express_1.default.json());
app.use(body_parser_1.default.json());
app.use('/todos', todos_1.default);
app.use(express_1.default.json());
app.use((err, req, res, next) => {
    res.json({ "message": err.message });
});
app.listen(3000);
