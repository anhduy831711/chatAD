import base from "../base.route";
import GroupService, { IGroupService } from "../../services/group.service";

export default class extends base {
  async action() {
    let groupService = this.buildService<IGroupService>(GroupService);
    let query = [{
      $match: this.query
    }];
    groupService.buildAggregate(query);
    let group = await groupService.findByAggregate(query);
    
    return group[0];
  }
}