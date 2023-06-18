import { UserModel } from "./UserModel"

export interface Message{
  readonly _id: string
  readonly createdId: string
  readonly user: UserModel | string
  readonly chat: string
  isRead: boolean
  text: string
  createdAt: Date | string
  updatedAt: Date | string
}
