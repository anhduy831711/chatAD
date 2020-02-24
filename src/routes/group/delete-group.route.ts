import base from "../base.route";
import GroupService, { IGroupService } from "../../services/group.service"
import { ObjectId } from "mongodb";

export default class extends base {
  async action() {
    let groupService = this.buildService<IGroupService>(GroupService);
    await groupService.delete(new ObjectId(this.params._id));
    return this.result(200, "success");
  }
}