import { UserModel } from "./UserModel"

export interface ChatModel {
  readonly _id: string
  users: UserModel[]
  messages: string[]
  unreadMessageCount: number
  createAt: Date
  updateAt: Date
  isActive: boolean
}
