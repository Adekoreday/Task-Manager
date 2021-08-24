import request from 'supertest'
import app from '../src'
interface IPing {
  message: string
}

describe('GET / ping endpoint', () => {
  it('returns home route', async () => {
    const result = await request(app).get('/')
    const data: IPing = result.body
    expect(data.message).toEqual('welcome to Task App')
    expect(result.statusCode).toEqual(200)
  })
})
