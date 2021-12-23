import sharp from 'sharp'
import fs from 'fs'
import QueryString from 'qs'
import path from 'path'
import ErrnoException = NodeJS.ErrnoException

export function resizeImage(query: QueryString.ParsedQs) {
  return new Promise<string>(function (resolve, reject) {
    const width: string = query['width'] as string
    const height: string = query['height'] as string
    const fileName: string = query['filename'] as string
    const thumbPath: string = path.join(
      __dirname,
      '../../images/thumb/',
      'thumb_' + width + 'x' + height + '-' + fileName
    )
    const fullPath: string = path.join(
      __dirname,
      '../../images/full/' + fileName
    )

    sharp(fullPath)
      .resize(
        parseInt(query['width'] as string),
        parseInt(query['height'] as string)
      )
      .toFile(thumbPath)
      .catch((err) => {
        reject(err.message)
      })
      .then(() => resolve(thumbPath))
  })
}

export function checkFile(filePath: string) {
  return new Promise<string>(function (resolve, reject) {
    fs.stat(filePath, function (err: ErrnoException | null) {
      if (err) {
        reject('File Not Found')
      } else {
        resolve(filePath)
      }
    })
  })
}

export function checkCreateDir(dirPath: string, folder: string) {
  return new Promise<string>(function (resolve, reject) {
    const exist = fs.existsSync(dirPath + folder)
    if (exist) {
      resolve('Directory exists')
    } else {
      //Create the missing dir
      console.log('Create dir here')
      fs.promises
        .mkdir(dirPath + folder)
        .catch((err) => {
          reject(err)
        })
        .then(() => {
          resolve('Directory created')
        })
    }
  })
}
