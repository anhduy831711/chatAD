declare interface IProperties {
    bsonType: string | Array<string>,
    description: string,
    minimum?: number,
    maximum?: number,
    enum?: Array<string>
}

declare interface IValidator {
    [path: string]: IProperties | ISchema
}

declare interface ISchema {
    bsonType: string,
    required: Array<string>,
    properties: IValidator
}

export declare interface IModel {
    validator: {
        $jsonSchema: ISchema
    }
}