import express, { Request, Response, NextFunction } from 'express'
import todoRoutes from './Routes/todos'

const app = express();
import bodyParser from 'body-parser';

app.use(express.json())
app.use(bodyParser.json());

app.use('/todos',todoRoutes)
app.use(express.json())

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    res.json({ "message": err.message })
})

app.listen(3000)