import { Request, Response, NextFunction } from "express";
import { scrypto } from "../utility/crypto"
import db from "./../db"
import { IResult } from "../routes/base"
import { ObjectId } from "mongodb"

export const authentication = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header["access_token"];
  if(req["session"].user)
  {
    next();
    return;
  }
  if (token) {
    const json = JSON.parse(scrypto.decrypt(token.toString()));
    if (json._id && ((Date.now() - Number(json.expired) > 0))) {
      db.start().then(async Db => {
        let user = await Db.collection("users").findOne({ _id: new ObjectId(json._id) });
        if (!user) {
          res.status(403).json({ code: 403, data: "Unauthentication" } as IResult)
        }
        req["authentication"] = user;
        next();
      })
    } else {
      res.status(403).json({ code: 403, data: "Unauthentication" } as IResult)
    }
  } else {
    let userID = req["session"].userID;
    console.log(userID);
    db.start().then(async Db => {
      let user = await Db.collection("users").findOne({ _id: new ObjectId(userID) });
      console.log(user);
      if (!user) {
        res.status(403).json({ code: 403, data: "Unauthentication" } as IResult)
      }
      req["session"].user = user;
      next();
    })
  }
}