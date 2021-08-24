import request from 'supertest'
import app from '../../src'
import { ValidTask, InValidTask } from '../__mocks__/task'
import { ValidUser, IUserLogin } from '../__mocks__/user'

describe('Task', () => {
  const validUser = new ValidUser()
  let taskId: string
  const loginUser: IUserLogin = {
    email: validUser.email,
    password: validUser.password
  }
  const validTask = new ValidTask()
  const invalidTask = new InValidTask()
  let token: string
  beforeAll(async () => {
    await request(app).post('/api/v1/user').send(validUser)
    const result = await request(app).post('/api/v1/user/login').send(loginUser)
    token = result.body.data.token
  })

  it('Create valid task Successfully', async () => {
    const result = await request(app)
      .post('/api/v1/task')
      .send(validTask)
      .set('Authorization', token)
    taskId = result.body.data._id
    expect(result.body.data.title).toEqual(validTask.title)
    expect(result.body.data.description).toEqual(validTask.description)
    expect(result.body.data.doneTime).toEqual(
      new Date(validTask.doneTime).toISOString()
    )
    expect(result.body.data.notificationTime).toEqual(
      new Date(validTask.notificationTime).toISOString()
    )
    expect(result.statusCode).toEqual(201)
  })

  it('Fails to Create Invalid task', async () => {
    const result = await request(app)
      .post('/api/v1/task')
      .send(invalidTask)
      .set('Authorization', token)
    expect(result.body.data.body.title).toContain(
      'title must be at least 2 characters, and maximum 40'
    )
    expect(result.body.data.body.description).toContain(
      'description must be at least 10 characters, and maximum 500'
    )
    expect(result.body.data.body.doneTime).toContain(
      'date string should be of format 2015-1-11 13:57:24'
    )
    expect(result.body.data.body.notificationTime).toContain(
      'date string should be of format 2015-1-11 13:57:24'
    )
    expect(result.statusCode).toEqual(400)
  })
})
