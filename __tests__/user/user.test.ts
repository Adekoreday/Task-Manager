import request from 'supertest'
import app from '../../src'
import faker from 'faker'

//__mocks___
interface IUser {
  name: string
  email: string
  password: string
}

interface IUserLogin {
  email: string
  password: string
}

export class ValidUser implements IUser {
  name = faker.name.findName()
  email = faker.internet.email()
  password = 'seyiKorede'
}

class InvalidLogin implements IUserLogin {
  email = ''
  password = ''
}

export class InValidUser implements IUser {
  name = faker.name.findName()
  email = faker.name.findName() // not valid email
  password = 'aa' // this password is less than 6 i.e. the minimum required
}
//end of __mocks___

describe('Sign Up', () => {
  it('Create User Successfully', async () => {
    const validUser = new ValidUser()
    const result = await request(app).post('/api/v1/user').send(validUser)
    expect(result.statusCode).toEqual(201)
  })
  it('fails to create user with an invalid input', async () => {
    const invalidUser = new InValidUser()
    const result = await request(app).post('/api/v1/user').send(invalidUser)
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
    expect(result.statusCode).toEqual(200)
  })
  it('fails to create user with an invalid input', async () => {
    const wrongLogin = new InvalidLogin()
    const result = await request(app).post('/api/v1/user').send(wrongLogin)
    expect(result.statusCode).toEqual(400)
  })
})
