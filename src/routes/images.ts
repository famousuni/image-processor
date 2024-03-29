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
    await checkFile(fullPath)
      .catch((err) => {
        res.status(404).send(err)
      })
      .then(() => {
        console.log('Found full sized file')
        res.sendFile(fullPath)
      })
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
    await checkCreateDir(basePath, 'thumb/')
      .catch((err) => {
        console.log('checkDir Promise Rejected: ', err)
      })
      .then((data) => {
        console.log('Checkdir Success: ', data)
      })
    // Check if thumb already exists
    await checkFile(thumbPath)
      .catch(async (err) => {
        console.log(`Error checking file: ${thumbPath} `, err)
        console.log('Resizing image')
        await resizeImage(req.query)
          .then((filePath) => {
            res.sendFile(filePath)
          })
          .catch((err) => {
            console.log('Error resizing file: ', err)
            res.status(500).send('Error resizing file')
          })
      })
      .then(() => {
        // Send back cached thumb if it already exists
        res.sendFile(thumbPath)
      })
  } else {
    res.status(400).send('Invalid value for dimensions')
  }
})

export default imageroutes
