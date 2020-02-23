import { IModel } from "./spec/community.spec"
import { constant } from "./../../constant/index"
import { getValueOfObject } from "../../utility/communication";

export const MESSAGE: IModel = {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["idSend", "type", "content", "idRecieve"],
      properties: {
        idSend: {
          bsonType: "objectId",
          description: "must be string and required",
        },
        type: {
          bsonType: "string",
          description: "must be string",
          enum: getValueOfObject(constant.typeMessage)
        },
        content: {
          bsonType: "string",
          description: "must be string"
        },
        idRecieve: {
          bsonType: "objectId",
          description: "must be string"
        }
      }
    }
  }
}