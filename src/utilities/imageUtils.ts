import sharp from 'sharp'
import fs from 'fs'
import QueryString from 'qs'
import path from 'path'

export const resizeImage = async (
  query: QueryString.ParsedQs
): Promise<string | unknown> => {
  const filePath = '../../images/full/'
  const width: string = query['width'] as string
  const height: string = query['height'] as string
  const fileName: string = query['filename'] as string
  const thumbPath: string = path.join(
    __dirname,
    '../../images/thumb/',
    'thumb_' + width + 'x' + height + '-' + fileName
  )
  const fullPath: string = path.join(__dirname, filePath + fileName)
  const fullImage = await fs.promises.readFile(fullPath)

  await sharp(fullImage)
    .resize(
      parseInt(query['width'] as string),
      parseInt(query['height'] as string)
    )
    .toFile(thumbPath)
  return thumbPath
}
