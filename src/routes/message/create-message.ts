import base from "../base.route";
import MessageService, { IMessageService } from "../../services/message.service"
import { IMessage } from "../../../src/db/interface";
import { typeMessage } from "../../../src/constant/constant";
import GroupService, { IGroupService } from "../../../src/services/group.service";
import { log } from "../../../src/constant";
import UserService, { IUserService } from "src/services/user.service";

export default class extends base {
  async action() {
    let message = this.body as IMessage;
    if (message.type == typeMessage.group) {
      let groupService = this.buildService<IGroupService>(GroupService);
      let group = await groupService.findById(message.idReceiver);
      if (!group) {
        throw log.GROUP_ERROR.GROUP_NOT_FOUND;
      }
    }
    if (message.type == typeMessage.user) {
      let userService = this.buildService<IUserService>(UserService);
      let user = await userService.findById(message.idReceiver);
      if(!user)
      {
        throw log.USER_ERROR.USER_NOT_FOUND;
      }
    }
    let messageService = this.buildService<IMessageService>(MessageService);
    await messageService.create(this.body)
    return log.SUCCESS.CREATE_MESSAGE;
  }
}