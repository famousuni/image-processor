import express, { Request, Response } from 'express'
import imageroutes from './routes/images'

const app = express()
const port = 3000

app.get('/', (req: Request, res: Response) => {
  res.send('Default route is up!')
})

app.use('/images', imageroutes)

app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`)
})

export default app
