import base from "../base.route";
import GroupService, { IGroupService } from "../../services/group.service";
import { ObjectId } from "mongodb";
import { GROUP_ERROR } from "../../constant/log";
import { log } from "src/constant";


export default class extends base {
  async action() {
    let { _id, _idUser } = this.body;
    let groupService = this.buildService<IGroupService>(GroupService);
    let group = await groupService.findById(new ObjectId(_id), { members: 1 });
    if (!group) {
      throw GROUP_ERROR.GROUP_NOT_FOUND;
    }
    let indexUser = group.members.findIndex(id => id == _idUser);
    if (indexUser > -1) {
      group.members.splice(indexUser, 1);
      groupService.save(group);
      return log.SUCCESS.DELETE_MEMBER_GROUP;
    }
    throw log.GROUP_ERROR.USER_NOT_FOUND;
  }
}