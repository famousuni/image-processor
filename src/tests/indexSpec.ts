import supertest from 'supertest'
import app from '../index'
import path from 'path'
import { checkFile } from '../utilities/imageUtils'
const request = supertest(app)

describe('Testing API Endpoints', () => {
  it('root endpoint "/" should return 200', async () => {
    const res = await request.get('/')
    expect(res.status).toBe(200)
  })

  it('image api should not accept missing filename parameter', async () => {
    const res = await request.get('/images?&width=100')
    expect(res.status).toBe(400)
  })

  it('image api should not accept missing width parameter', async () => {
    const res = await request.get('/images?filename=fjord.jpg&height=100')
    expect(res.status).toBe(400)
  })

  it('image api should not accept missing height parameter', async () => {
    const res = await request.get('/images?filename=fjord.jpg&width=100')
    expect(res.status).toBe(400)
  })

  it('image api should not accept negative height parameter', async () => {
    const res = await request.get(
      '/images?filename=fjord.jpg&height=-100&width=100'
    )
    expect(res.status).toBe(400)
  })

  it('image api should not accept negative width parameter', async () => {
    const res = await request.get(
      '/images?filename=fjord.jpg&height=100&width=-100'
    )
    expect(res.status).toBe(400)
  })

})

describe('Testing Utility Functions', () => {
  it('checkFile should reject for non existent image', async () => {
    const filePath = path.join(__dirname, "../../images/full/idontexist.jpg")
    await expectAsync(checkFile(filePath)).toBeRejected()
  })
})
