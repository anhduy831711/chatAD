import base from "../base.route";
import GroupService, { IGroupService } from "../../services/group.service";
import { ObjectId } from "mongodb";
import { log } from "../../constant";
import UserService, { IUserService } from "../../services/user.service";

export default class extends base {
  async action() {
    let { _id } = this.params;
    let { _idUser } = this.body;
    const groupID = new ObjectId(_id);
    let groupService = this.buildService<IGroupService>(GroupService);
    let group = await groupService.findById(groupID, { members: 1 });
    if (!group) {
      return this.result(-1, log.GROUP_ERROR.GROUP_NOT_FOUND);
    }
    let userService = this.buildService<IUserService>(UserService);
    let user = await userService.find({ _id: new ObjectId(_idUser) }, { _id: 1 });
    if (!user) {
      throw log.USER_ERROR.USER_NOT_FOUND;
    }
    let member = group.members ? group.members.find(item => { return item == _idUser }) : undefined;
    if (member) {
      return log.SUCCESS.REGISTER_MEMBER_GROUP;
    }
    await groupService.update(groupID, { $push: { members: new ObjectId(_idUser) } });
    return log.SUCCESS.REGISTER_MEMBER_GROUP;
  }
}
