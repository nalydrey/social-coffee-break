import { UserModel } from "./UserModel"

export interface Message{
  readonly _id: string
  readonly user: UserModel
  readonly chat: string
  text: string
  createdAt: Date
  updatedAt: Date
}
