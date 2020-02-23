import { IModel } from "./spec/community.spec"

export const USER: IModel = {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: ["email", "password", "salt", "ip", "type"],
            properties: {
                email: {
                    bsonType: "string",
                    description: "must be string and required",
                },
                password: {
                    bsonType: "string",
                    description: "must be string and required",
                },
                first_name: {
                    bsonType: "string",
                    description: "must be string"
                },
                last_name: {
                    bsonType: "string",
                    description: "must be string"
                },
                salt: {
                    bsonType: "string",
                    description: "must be string and required"
                },
                ip: {
                    bsonType: "array",
                    description: "must be array and required"
                },
                type : {
                    bsonType : "string",
                    description : "must be string and required"
                },
                friends : {
                    bsonType : "array",
                    description : "must be array"
                }
            }
        }
    }
}