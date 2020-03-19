import { Request, Response, NextFunction } from "express";
import { scrypto } from "./crypto"
import db from "../db"
import { IResult } from "../routes/base.route"
import { ObjectId } from "mongodb"
import { log } from "../constant";

export const authentication = (req: Request, res: Response, next: NextFunction) => {
  let token: string = req.get("Authorization");

  if (!token) {
    //return res.status(403).json({ code: 403, data: log.ERROR.UNAUTHENTICATION } as IResult);
    return res.redirect("/");
  }

  token = token.split(" ")[1];
  let json;
  try {
    json = JSON.parse(scrypto.decrypt(token.toString()));
  } catch (error) {
    console.log(error);
    return res.status(401).json({ code: 401, data: log.ERROR.UNAUTHENTICATION } as IResult);
  }

  
  if (!(json._id && json.expired - Date.now() > 0)) {
    return res.status(401).json({ code: 401, data: log.ERROR.UNAUTHENTICATION } as IResult);
  }

  db.start().then(async Db => {
    let user = await Db.collection("users").findOne({ _id: new ObjectId(json._id) });
    if (!user) {
      res.status(401).json({ code: 401, data: log.ERROR.UNAUTHENTICATION } as IResult)
    }
    else {
      delete user.password;
      req.session["authentication"] = user._id;
      req["authentication"] = user;
      next();
    }
  })

}