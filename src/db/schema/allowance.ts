import { IModel } from "./spec/community.spec"

export const ALLOWANCE: IModel = {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: ["_id", "year", "month", "advance", "abc"],
            properties: {
                _id: {
                    bsonType: "string",
                    description: "must be a string and is required",
                },
                year: {
                    bsonType: "int",
                    minimum: 2017,
                    maximum: 3017,
                    description: "must be an integer in [ 2017, 3017 ] and is required",
                },
                month: {
                    bsonType: "int",
                    description: "must be an integer in [ 1, 12 ] and is required",
                    minimum: 1,
                    maximum: 12
                },
                advance: {
                    bsonType: "int",
                    description: "must be an integer and is required"
                },
                abc: {
                    required : [""],
                    bsonType : "object",
                    properties : {
                        
                    }
                }
            }
        }
    }
}