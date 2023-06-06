import { UserModel } from "./UserModel"

export interface ChatModel {
  readonly _id: string
  users: UserModel[]
  messages: string[]
  createAt: Date
  updateAt: Date
  isActive: boolean
}
