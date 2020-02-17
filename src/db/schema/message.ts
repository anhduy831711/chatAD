import { IModel } from "./spec/community.spec"
import { constant } from "./../../constant/index"
import { getValueOfObject } from "../../utility/communication";

export const MESSAGE: IModel = {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["id", "type"],
      properties: {
        id: {
          bsonType: "string",
          description: "must be string and required",
        },
        type: {
          bsonType: "string",
          description: "must be string",
          enum: getValueOfObject(constant.typeMessage)
        }
      }
    }
  }
}