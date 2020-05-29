import base from "../base.route";
import GroupService, { IGroupService } from "../../services/group.service";

export default class extends base {
    async action() {
        console.log(this.query);

        let groupService = this.buildService<IGroupService>(GroupService);
        let count = await groupService.count(this.query)
        console.log(count);
        
        return count;
    }
}