import { Schema, model, Document } from 'mongoose'

export type TaskDocument = Document & {
  title: string
  description: string
  doneTime: Date
  notificationTime: Date
  isCompleted: boolean
}

const schema = new Schema<TaskDocument>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    isCompleted: { type: Boolean, default: false },
    doneTime: { type: Date, required: true },
    notificationTime: { type: Date, required: true }
  },
  { timestamps: true }
)

export const TaskModel = model<TaskDocument>('Task', schema)
