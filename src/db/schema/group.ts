import { IModel } from "./spec/community.spec"

export const GROUP: IModel = {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: ["name", "members"],
            properties: {
                name: {
                    bsonType: "string",
                    description: "must be string and required",
                },
                members: {
                    bsonType: "array",
                    description: "must be "
                }
            }
        }
    }
}