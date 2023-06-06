import { UserModel } from "./UserModel"

export interface PostModel {
    readonly _id: string
    user: UserModel
    name: string
    discription: string
    images: string[]
    likes: UserModel['_id'][]
    dislikes: UserModel['_id'][]
    views: number
    createdAt: Date
    updatedAt: Date
}
