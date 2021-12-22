import express from 'express'

const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Default route is up!')
})

app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`)
})

export default app
