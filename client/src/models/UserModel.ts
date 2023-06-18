import { ChatModel } from "./ChatModel"

export interface UserPrivate {
  firstName: string
  lastName: string
  nikName: string
  age: number 
  gender: "male" | "female" 
  password: string
  avatar: string
}

export interface UserContact {
  email: string
  tel: string 
}

export interface UserModel {
  readonly _id: string
  picture: string
  isOnline: boolean
  private: UserPrivate
  contacts: UserContact
  chats: string[]
  myRequests: string[]
  invitations: string[]
  friends: string[]
  infoMessages: string[]
  posts: ChatModel['_id'][]
  createdAt: Date
  updatedAt: Date
}
