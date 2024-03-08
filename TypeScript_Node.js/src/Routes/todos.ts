import { Router } from 'express'

const router = Router()

import {createTodo,getTodos,UpdateTodos,DeleteTodos} from '../Controllers/todos'

router.post('/', createTodo)


router.get('/',getTodos)


router.patch('/:id',UpdateTodos)


router.delete('/:id',DeleteTodos)


export default router
