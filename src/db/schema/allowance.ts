import { IProperties, IValidator } from "./spec/community.spec"

export const ALLOWANCE : Object = {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: ["_id", "year", "month", "advance", "abc"],
            properties: {
                _id: {
                    bsonType: "string",
                    description: "must be a string and is required",
                } as IProperties,
                year: {
                    bsonType: "int",
                    minimum: 2017,
                    maximum: 3017,
                    description: "must be an integer in [ 2017, 3017 ] and is required",
                } as IProperties,
                month: {
                    bsonType: "int",
                    minimum: 1,
                    maximum: 12
                } as IProperties,
                advance: {
                    bsonType : "int",
                    description : "must be an integer and is required"
                } as IProperties,
                abc: {
                    bsonType : "string",
                    description : "must be an string and is required"
                } as IProperties
            }
        } as IValidator
    }
}