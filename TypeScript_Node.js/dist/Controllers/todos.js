"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteTodos = exports.UpdateTodos = exports.getTodos = exports.createTodo = void 0;
const todo_1 = require("../models/todo");
const TODOS = [];
const createTodo = (req, res, next) => {
    const text = req.body.text;
    const newTodo = new todo_1.Todo(Math.random().toString(), text);
    TODOS.push(newTodo);
    console.log(TODOS);
    res.json({ message: "Created to do", createdTodo: newTodo });
};
exports.createTodo = createTodo;
const getTodos = (req, res, next) => {
    console.log("Debugger");
    res.json({ todos: TODOS });
};
exports.getTodos = getTodos;
const UpdateTodos = (req, res, next) => {
    const id = req.params.id;
    const task = TODOS.find((task) => task.id === id);
    task.text = req.body.text;
    res.json({ message: "Task has been updated ", task });
};
exports.UpdateTodos = UpdateTodos;
const DeleteTodos = (req, res, next) => {
    const id = req.params.id;
    const taskIndex = TODOS.findIndex((task) => task.id === id);
    TODOS.splice(taskIndex, 1);
    res.json({ message: "Task has been Deleted " });
};
exports.DeleteTodos = DeleteTodos;
