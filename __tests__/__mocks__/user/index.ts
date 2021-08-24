import faker from 'faker'

export interface IUser {
  name: string
  email: string
  password: string
}

export interface IUserLogin {
  email: string
  password: string
}

export class ValidUser implements IUser {
  name = faker.name.firstName()
  email = faker.internet.email()
  password = faker.datatype.string(7)
}

export class InvalidLogin implements IUserLogin {
  email = faker.name.findName()
  password = faker.datatype.string(2)
}

export class InValidUser implements IUser {
  name = faker.name.firstName()
  email = faker.name.findName() // not valid email
  password = faker.datatype.string(2) // this password is less than 6 i.e. the minimum required
}
