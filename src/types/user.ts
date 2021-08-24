import { UserDocument } from '../database/User'
export interface UserLoginResponse {
  user: UserDocument
  token: string
}
