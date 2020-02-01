import { IModel } from "./spec/community.spec"

export const USER: IModel = {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: ["email", "password", "first_name", "last_name", "salt", "ip", "type"],
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
                    description: "must be string and required"
                },
                last_name: {
                    bsonType: "string",
                    description: "must be string and required"
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
                }
            }
        }
    }
}