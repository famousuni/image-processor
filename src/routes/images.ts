import express, { Request, Response } from 'express'
import path from 'path'
import { resizeImage, checkFile, checkCreateDir } from '../utilities/imageUtils'

const imageroutes = express.Router()

imageroutes.get('/', async (req: Request, res: Response) => {
  const filename = req.query.filename as string
  const width = req.query.width as string
  const height = req.query.height as string

  if (!filename) {
    res.status(400).send('Filename not provided')
    return
  }

  // Sizing parameters was not provided so return full image
  if (!width && !height) {
    const fullPath = path.join(__dirname, '../../images/full/' + filename)
    try {
      await checkFile(fullPath) // dont need to store in const since resolve would return thumbPath
      console.log('Found full sized file')
      res.sendFile(fullPath)
    } catch(err) {
      res.status(404).send(err)
    }


  } else if (parseInt(width) > 0 && parseInt(height) > 0) {
    const basePath = path.join(__dirname, '../../images/')
    const thumbPath = path.join(
      __dirname,
      '../../images/thumb/thumb_' +
        parseInt(width) +
        'x' +
        parseInt(height) +
        '-' +
        filename
    )
    // Check if thumb directory exists and create if it doesn't
    try {
      const dirStat = await checkCreateDir(basePath, 'thumb/')
      console.log('Checkdir Success: ', dirStat)
    } catch(err) {
      res.status(500).send(err)
      return
    }


    // Check if thumb already exists
    try {
      await checkFile(thumbPath) // dont need to store in const since resolve would return thumbPath
      res.sendFile(thumbPath)
    } catch(err) {
        console.log(`Error checking file: ${thumbPath} `, err)
        try {
          console.log('Resizing image')
          const imgResize = await resizeImage(req.query)
          res.sendFile(imgResize)
        } catch(err) {
          console.log('Error resizing file: ', err)
          res.status(500).send('Error resizing file')
        }
    }
  } else {
    res.status(400).send('Invalid value for dimensions')
  }
})

export default imageroutes
