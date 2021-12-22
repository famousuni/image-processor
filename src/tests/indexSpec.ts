import supertest from 'supertest'
import app from '../index'

const request = supertest(app)

describe('Testing main API endpoints', () => {
  it('root endpoint "/" should return 200', async () => {
    const res = await request.get('/')
    expect(res.status).toBe(200)
  })
})
