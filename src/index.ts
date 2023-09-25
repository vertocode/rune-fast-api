import express, { Express, Request, Response } from 'express'
import * as fs from 'fs'
import path from 'path'
import axios, { AxiosResponse } from 'axios'
import cors, { CorsOptions } from 'cors'
import { LetterObject, Item } from './interface/GrandGeneralMarket'

const app: Express = express()
const port: number = 3000
const API_URL: string = 'https://secure.runescape.com'

const options: CorsOptions = {
    origin: '*'
}

app.use(cors(options))
app.use(express.json())

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

app.get('/rank-players/:id', async (req: Request, res: Response) => {
    const params = req.params
    const response: AxiosResponse = await axios(`${API_URL}/m=hiscore/ranking.json?table=9&category=${params.id}&size=50`)
    
    res.send({ players: response.data })
})

app.get('/items/:id', async (req: Request, res: Response): Promise<void> => {
    const params = req.params
    const response: AxiosResponse = await axios(`${API_URL}/m=itemdb_rs/api/catalogue/category.json?category=${params.id}`)

    const letterWithItems = response.data.alpha.map(({ letter, items }: LetterObject) => !!items ? letter : null).filter((letter: string) => letter)

    const response2 = await axios(`${API_URL}/m=itemdb_rs/api/catalogue/items.json?category=${params.id}&alpha=${letterWithItems[0]}&page=1`)

    const allItemsByCategory: any = await Promise.all(letterWithItems.map(async (letter: string) => {
        const response = await axios(`${API_URL}/m=itemdb_rs/api/catalogue/items.json?category=${params.id}&alpha=${letter}&page=1`)
        return response.data.items
    }))

    res.send({ items: allItemsByCategory.flat() })
})

app.listen(port, (): void => {
    console.log(`⚡️[server]: Rune Fast API is running at http://localhost:${port}`)
})

module.exports = app