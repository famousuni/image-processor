import express from 'express'
import path from 'path'
import { resizeImage, checkFile } from '../utilities/imageUtils'

const imageroutes = express.Router()

imageroutes.get('/', async (req, res) => {
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
      await checkFile(fullPath)
    } catch (err) {
      res.status(404).send(err)
      return
    }
    res.sendFile(fullPath)
    return
    // Parameters provided so build thumb path
  } else if (parseInt(width) > 0 && parseInt(height) > 0) {
    const thumbPath = path.join(
      __dirname,
      '../../images/thumb/thumb_' +
        parseInt(width) +
        'x' +
        parseInt(height) +
        '-' +
        filename
    )

    try {
      // Check if thumb already exists
      await checkFile(thumbPath)
    } catch (err) {
      console.log(`Thumbnail for file ${thumbPath} doesnt exist!`)
      console.log("Resizing image")
        await resizeImage(req.query)
          .then(
            filePath => {
              res.sendFile(filePath)
            }
          )
          .catch((err) => {
            res.status(500).send("Error resizing file")
          })
      return

    }
    // Send back cached thumb if it already exists
    console.log("Here")
    res.sendFile(thumbPath)
  } else {
    res.status(400).send('Invalid value for dimensions')
    return
  }
})

export default imageroutes
