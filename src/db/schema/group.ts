import { IModel } from "./spec/community.spec"

export const GROUP: IModel = {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: ["name"],
            properties: {
                name: {
                    bsonType: "string",
                    description: "must be string and required",
                },
                members: {
                    bsonType: "array",
                    description: "must be array string"
                },
                avatar: {
                    bsonType : "string",
                    description : "must type string"
                }
            }
        }
    }
}