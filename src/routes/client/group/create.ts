import base from "../../base";
import GroupService, { IGroupService } from "../../../services/group";
import { IGroup } from "src/db/interface";

export default class extends base {
  async action() {
    console.log(this.body);
    let groupService = this.buildService<IGroupService>(GroupService);
    await groupService.create(this.body as IGroup);
    return this.result(200,"success");
  }
}