import express from 'express'
import path from 'path'
import { resizeImage } from '../utilities/imageUtils'

const imageroutes = express.Router()

imageroutes.get('/', async (req, res) => {
  const filename = req.query.filename as string
  const width = req.query.width as string
  const height = req.query.height as string

  if (!filename) {
    res.status(400).send('Filename not provided')
  }

  // Sizing parameters was not provided so return full image
  if (!width && !height) {
    const p = path.join(__dirname, '../../images/full/')
    const fullpath = p.concat(filename)
    //TODO: Add err handling if file doesnt exist
    res.sendFile(fullpath)
    return
  }

  if (!height) {
    res.status(400).send("Height parameter was not provided")
    return
  }

  if (!width) {
    res.status(400).send("Width parameter was not provided")
    return
  }

  //Filename, Width, and Height parameters are provided
  if (parseInt(width) > 0 && parseInt(height) > 0) {
    //TODO:Check if reized version exists by getting file list and comparing names
    const resizedFile = await resizeImage(req.query)
    res.status(200).send(resizedFile)
    return
  }
  else {
    res.status(400).send("Invalid value for dimensions")
    return
  }


})
export default imageroutes
