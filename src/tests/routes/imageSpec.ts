import supertest from 'supertest'
import app from '../../index'
const request = supertest(app)

describe('Testing Image API Endpoints', () => {
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
