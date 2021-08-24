import faker from 'faker'

export interface ITask {
  title: string
  description: string
  doneTime: string
  notificationTime: string
}

export class ValidTask implements ITask {
  title = faker.datatype.string(10)
  description = faker.datatype.string(50)
  doneTime = '2015-1-11 13:57:24'
  notificationTime = '2015-1-11 13:57:24'
}

export class InValidTask implements ITask {
  title = faker.datatype.string(1)
  description = faker.datatype.string(5)
  doneTime = faker.datatype.string(5)
  notificationTime = faker.datatype.string(5)
}
