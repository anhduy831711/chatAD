import { Request, Response, NextFunction } from "express";
import { scrypto } from "./crypto"
import db from "../db"
import { IResult } from "../routes/base.route"
import { ObjectId } from "mongodb"
import { log } from "../constant";

export const authentication = (req: Request, res: Response, next: NextFunction) => {
  let token: string = req.get("authorization");
  if (!token) {
    return res.status(403).json({ code: 403, data: log.ERROR.UNAUTHENTICATION } as IResult);
  }
  
  token = token.split(" ")[1];
  const json = JSON.parse(scrypto.decrypt(token.toString()));

  if (!(json._id && json.expired - Date.now() > 0)) {
    return res.status(403).json({ code: 403, data: log.ERROR.UNAUTHENTICATION } as IResult);
  }

  db.start().then(async Db => {
    let user = await Db.collection("users").findOne({ _id: new ObjectId(json._id) });
    if (!user) {
      res.status(403).json({ code: 403, data: log.ERROR.UNAUTHENTICATION } as IResult)
    }
    else {
      delete user.password;
      req["authentication"] = user;
      next();
    }
  })

}