import { Schema, model, Document } from 'mongoose'

export type UserDocument = Document & {
  name: string
  email: string
  password: string
}

const schema = new Schema<UserDocument>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true }
  },
  { timestamps: true }
)

export const UserModel = model<UserDocument>('User', schema)
