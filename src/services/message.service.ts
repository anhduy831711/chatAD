import base, { IService } from "./base.service";
import { IMessage } from "../db/interface";
import MessageDAO, { IMessageDAO } from "../db/message";
import { typeMessage } from "../constant/constant";
import UserDAO, { IUserDAO } from "../db/user";
import { ObjectId } from "mongodb";
import { log } from "../constant";
import GroupDAO, { IGroupDAO } from "../db/group";

export interface IMessageService extends IService {
  create(message: IMessage)
}

export default class extends base implements IMessageService {
  async create(message: IMessage) {
    message.idSender = this.getUser._id;
    let messageDAO = this.buildDataAccess<IMessageDAO>(MessageDAO);
    await messageDAO.create(message);
    return "success"; 
  }
}