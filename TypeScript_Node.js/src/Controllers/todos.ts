import express, { RequestHandler } from 'express'
import { Todo } from '../models/todo'
const TODOS: Todo[] = []


export const createTodo: RequestHandler = (req, res, next) => {
    const text = (req.body as { text: string }).text
    const newTodo = new Todo(Math.random().toString(), text)
    TODOS.push(newTodo)
    console.log(TODOS);
    res.json({ message: "Created to do", createdTodo: newTodo })
}


export const getTodos: RequestHandler = (req, res, next) => {
    console.log("Debugger");
    res.json({ todos: TODOS })
}


export const UpdateTodos: RequestHandler = (req, res, next) => {
    const id = req.params.id
    const task = TODOS.find((task) => task.id === id)!
    task.text = req.body.text;
    res.json({ message: "Task has been updated ", task })
}

export const DeleteTodos: RequestHandler = (req, res, next) => {
    const id = req.params.id
    const taskIndex = TODOS.findIndex((task) => task.id === id)!
    TODOS.splice(taskIndex, 1)
    res.json({ message: "Task has been Deleted " })
}