import base from "../base.route";
import UserService, { IUserService } from "../../services/user.service"
import { ObjectId } from "mongodb";
import { log } from "../../../src/constant";

export default class extends base {
  async action() {
    let { _id } = this.params;
    let userService = this.buildService<IUserService>(UserService);
    await userService.deleteOne(new ObjectId(_id));
    return log.SUCCESS.DELETE_USER;
  }
}