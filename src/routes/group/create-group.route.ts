import base from "../base.route";
import GroupService, { IGroupService } from "../../services/group.service";
import { IGroup } from "../../db/interface";

export default class extends base {
  async action() {
    console.log(this.body);
    let groupService = this.buildService<IGroupService>(GroupService);
    await groupService.create(this.body as IGroup);
    return this.result(200,"success");
  }
}