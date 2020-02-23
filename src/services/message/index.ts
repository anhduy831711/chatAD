import base, { IService } from "../base";
import { IMessage } from "../../db/interface";
import MessageDAO, { IMessageDAO } from "../../db/message";
import { typeMessage } from "../../constant/constant";
import UserDAO, { IUserDAO } from "../../db/user";
import { ObjectId } from "mongodb";
import { log } from "../../constant";
import GroupDAO, { IGroupDAO } from "../../db/group";

export default interface IMessageService extends IService {
  create(message: IMessage)
}

export default class extends base implements IMessageService {
  async create(message: IMessage) {
    let userDAO = this.buildDataAccess<IUserDAO>(UserDAO);
    message.idSender = this.getUser._id;
    
    if (message.type == typeMessage.group) {
      let groupDAO = this.buildDataAccess<IGroupDAO>(GroupDAO);
      let group = await groupDAO.findOne({ _id: new ObjectId(message.idReceiver) }, { _id: 1 });
      if (!group) {
        throw log.GROUP_ERROR.GROUP_NOT_FOUND;
      }
    }

    if (message.type == typeMessage.user) {
      let receiver = await userDAO.findOne({ _id: new ObjectId(message.idReceiver) }, { _id: 1 });
      if (!receiver) {
        throw log.USER_ERROR.RECEIVER_NOT_FOUND;
      }
    }

    let messageDAO = this.buildDataAccess<IMessageDAO>(MessageDAO);
    await messageDAO.create(message);
    return "success"; 
  }
}