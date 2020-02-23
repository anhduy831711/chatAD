import base from "../../base";
import UserService, { IUserService } from "../../../services/user"
import { ObjectId } from "mongodb";

export default class extends base{
  async action(){
    let { _id } = this.params;
    let userService = this.buildService<IUserService>(UserService);
    await userService.deleteOne(new ObjectId(_id));
    return this.result(200,"success");
  }
}