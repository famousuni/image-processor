import express from 'express'
import path from 'path'
import { promises as fsPromises } from 'fs'

const imageroutes = express.Router()

imageroutes.get('/', (req, res) => {
  const filename = req.query.filename as string
  const width = req.query.width as string
  const height = req.query.height as string

  if (!filename) {
    res.status(400).send('Filename not provided!')
  }

  if (!width || !height) {
    const p = path.join(__dirname, '../../images/full/')
    const fullpath = p.concat(filename)
    console.log('Height/Width not provided sending fullsized image')
    console.log('requested filepath: ', fullpath)
    res.sendFile(fullpath)
  }
})

export default imageroutes
