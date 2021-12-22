import sharp from 'sharp'
import { promises as fsPromises } from 'fs'
import QueryString from 'qs'
import path from 'path'

export const resizeImage = async (query: QueryString.ParsedQs): Promise<string | unknown> => {
  const filePath: string = '../../images/full/'
  const width: string = (query['width']) as string
  const height: string = (query['height']) as string
  const fileName: string = (query['filename']) as string
  const thumbPath: string = path.join(__dirname, '../../images/thumb/', 'thumb_' + width + 'x' + height + '-' + fileName)
  const fullPath: string = path.join(__dirname, filePath + fileName)
  console.log(fullPath)
  const fullImage = await fsPromises.readFile(fullPath)

  await sharp(fullImage)
    .resize(parseInt((query['width']) as string), parseInt((query['height']) as string))
    .toFile(thumbPath)
  return thumbPath
}

