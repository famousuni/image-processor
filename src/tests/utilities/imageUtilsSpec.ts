import path from 'path'
import { resizeImage } from '../../utilities/imageUtils'
import { checkFile } from '../../utilities/imageUtils'

describe('Testing Utility Functions', () => {
  it('checkFile should reject for non existent image', async () => {
    const filePath = path.join(__dirname, '../../images/full/idontexist.jpg')
    await expectAsync(checkFile(filePath)).toBeRejected()
  })
  it('resizeImage should reject if file extension is not valid', async () => {
    const params = {
      filename: 'fjord.xyz',
      width: '200',
      height: '200'
    }
    await expectAsync(resizeImage(params)).toBeRejected()
  })
})
