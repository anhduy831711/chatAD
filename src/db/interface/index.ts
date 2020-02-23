import { ObjectId } from "mongodb";

export interface IAllowance {
    _id?: ObjectId,
    year: number,
    month: number,
    advance: number
}

export interface IUser {
    _id? : ObjectId,
    email: string,
    password: string,
    first_name: string,
    last_name: string,
    salt: string,
    avatar?: string,
    ip : Array<string>,
    type : string
}

export interface IGroup {
    _id? : ObjectId,
    name: string,
    avatar?: string,
    members?: Array<IUser>
}

export interface IMessage {
    idSender: ObjectId,
    idReceiver: ObjectId,
    content: string,
    type : string
}