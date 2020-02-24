import base from "../base.route";
import GroupService, { IGroupService } from "../../services/group.service";
import { ObjectId } from "mongodb";
import { GROUP_ERROR } from "../../constant/log";


export default class extends base {
  async action() {
    let { _id, _idUser } = this.body;
    let groupService = this.buildService<IGroupService>(GroupService);
    let group = await groupService.findById(new ObjectId(_id), { members: 1 });
    if (!group) {
      return this.result(-1, GROUP_ERROR.GROUP_NOT_FOUND)
    }
  }
}