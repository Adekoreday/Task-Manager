import request from 'supertest'
import app from '../../src'
import {
  IUserLogin,
  ValidUser,
  InvalidLogin,
  InValidUser
} from '../__mocks__/user'

describe('Sign Up', () => {
  it('Create User Successfully', async () => {
    const validUser = new ValidUser()
    const result = await request(app).post('/api/v1/user').send(validUser)
    expect(result.body.data.name).toEqual(validUser.name)
    expect(result.body.data.email).toEqual(validUser.email)
    expect(result.body.data.password).toEqual('')
    expect(result.statusCode).toEqual(201)
  })
  it('fails to create user with an invalid input', async () => {
    const invalidUser = new InValidUser()
    const result = await request(app).post('/api/v1/user').send(invalidUser)
    expect(result.body.data.body.email).toEqual('email is not valid')
    expect(result.body.data.body.password).toEqual(
      'password must be at least 6 characters'
    )
    expect(result.statusCode).toEqual(400)
  })
})

describe('Sign In', () => {
  const validUser = new ValidUser()
  const loginUser: IUserLogin = {
    email: validUser.email,
    password: validUser.password
  }

  beforeAll(async () => {
    await request(app).post('/api/v1/user').send(validUser)
  })
  it('Log In User Successfully', async () => {
    const result = await request(app).post('/api/v1/user/login').send(loginUser)
    expect(result.body.data.user.name).toEqual(validUser.name)
    expect(result.body.data.user.email).toEqual(validUser.email)
    expect(result.body.data.user.password).toEqual('')
    expect(typeof result.body.data.token).toBe('string')
    expect(result.statusCode).toEqual(200)
  })
  it('fails to create user with an invalid input', async () => {
    const wrongLogin = new InvalidLogin()
    const result = await request(app).post('/api/v1/user').send(wrongLogin)
    expect(result.body.data.body.email).toContain('email is not valid')
    expect(result.body.data.body.password).toContain(
      'password must be at least 6 characters'
    )
    expect(result.statusCode).toEqual(400)
  })
})
