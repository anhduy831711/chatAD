import { IModel } from "./spec/community.spec"

export const GROUP: IModel = {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: ["name","leader"],
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
                },
                leader : {
                    bsonType : "objectId",
                    description : "required and must object ID"
                }
            }
        }
    }
}