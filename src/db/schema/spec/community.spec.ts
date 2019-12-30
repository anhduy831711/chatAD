export declare interface IProperties {
    bsonType : string,
    description : string,
    minimum? : number,
    maximum? : number,
}

export declare interface IValidator {
    bsonType : string,
    required : Array<string>,
    properties : Object
}