import base from "../base.route";
import GroupService, { IGroupService } from "../../services/group.service";
import { IGroup } from "../../db/interface";
import { log } from "../../../src/constant";

export default class extends base {
  async action() {
    let groupService = this.buildService<IGroupService>(GroupService);
    await groupService.create(this.body as IGroup);
    return log.SUCCESS.CREATE_GROUP;
  }
}