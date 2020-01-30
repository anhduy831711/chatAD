export interface IAllowance {
    _id: string,
    year: number,
    month: number,
    advance: number
}

export interface IUser {
    email: string,
    password: string,
    first_name: string,
    last_name: string
}

export interface IGroup {
    name: string,
    image? : string,
    users?: Array<IUser>,
    messages? : Array<IMessage>
}

export interface IMessage {
    userID : string,
    groupID : string,
    message : string
}