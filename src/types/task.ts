export interface ITask {
  title: string
  description: string
  doneTime: string
  notificationTime: string
  isCompleted: boolean
}

export interface ITaskUpdate {
  title: string
  description: string
  doneTime: Date
  notificationTime: Date
  isCompleted: boolean
}
