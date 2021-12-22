import sharp from 'sharp'
import fs from 'fs'
import QueryString from 'qs'
import path from 'path'
import ErrnoException = NodeJS.ErrnoException


export const resizeImage = async (
  query: QueryString.ParsedQs
): Promise<string | unknown> => {
  const width: string = query['width'] as string
  const height: string = query['height'] as string
  const fileName: string = query['filename'] as string
  const thumbPath: string = path.join(
    __dirname,
    '../../images/thumb/',
    'thumb_' + width + 'x' + height + '-' + fileName
  )
  const fullPath: string = path.join(__dirname, "../../images/full/" + fileName)
  const fullImage = await fs.promises.readFile(fullPath)

  await sharp(fullImage)
    .resize(
      parseInt(query['width'] as string),
      parseInt(query['height'] as string)
    )
    .toFile(thumbPath)
  return thumbPath
}

export function checkFile(
  filePath: string,
) {
  return new Promise<string>(function(resolve, reject) {
    fs.stat(filePath, function(err: ErrnoException | null) {
      if (err) {
        reject("File Not Found")
      } else {
        resolve(filePath)
      }
    })
  })}
