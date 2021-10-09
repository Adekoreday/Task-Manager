export interface ITask {
  title: string
  description: string
  doneTime: string
  notificationTime: string
  isCompleted: boolean
  createdAt: string
  updatedAt: string
}

export interface ITaskUpdate {
  title: string
  description: string
  doneTime: Date
  notificationTime: Date
  isCompleted: boolean
}

//https://github.com/microsoft/TypeScript/issues/31663
export type KeysOfType<T, U> = {
  [k in keyof T]-?: T[k] extends U ? k : never
}[keyof T]
