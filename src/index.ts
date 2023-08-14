import express, { Express, Request, Response } from 'express'
import * as fs from "fs"
import path from "path";

const app: Express = express()

app.get('/', (req: Request, res: Response): void => {
    res.send('Rune Fast API')
})

app.get('/categories', (req: Request, res: Response): void => {
    const filePath = path.join(__dirname, 'data', 'categories.json')

    try {
        const categories = fs.readFileSync(filePath, 'utf-8')
        res.send(categories)
    } catch (error) {
        console.error('Error reading categories.json:', error)
        res.status(500).send('Internal Server Error')
    }
})

module.exports = app