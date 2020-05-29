import base from "../base.route";
import GroupService, { IGroupService } from "../../services/group.service";
import { ObjectId } from "mongodb";
import { log } from "../../constant";

export default class extends base {
  async action() {
    let { _id } = this.params;
    const groupID = new ObjectId(_id);
    let groupService = this.buildService<IGroupService>(GroupService);
    let group = await groupService.findById(groupID, { members: 1 });
    if (!group) {
      return this.result(-1, log.GROUP_ERROR.GROUP_NOT_FOUND);
    }
    delete this.body._id;
    await groupService.update(groupID, this.body);
    return log.SUCCESS.UPDATE_GROUP;
  }
}
