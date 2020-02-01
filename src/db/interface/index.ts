export interface IAllowance {
    _id: string,
    year: number,
    month: number,
    advance: number
}

export interface IUser {
    _id : string,
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
    name: string,
    image?: string,
    users?: Array<IUser>,
    messages?: Array<IMessage>
}

export interface IMessage {
    userID: string,
    groupID: string,
    message: string
}