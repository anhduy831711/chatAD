import base, { IService } from "../base";
import { IGroup } from "../../db/interface"
import Group, { IGroupDAO } from "../../db/group";
import { ObjectId } from "mongodb";

export interface IGroupService extends IService {
  create(group: IGroup),
  update(_id: ObjectId, group: IGroup)
}

export default class extends base implements IGroupService {
  async create(group: IGroup) {
    let groupDAO = this.buildDataAccess<IGroupDAO>(Group);
    return groupDAO.create(group);
  }
  async update(_id: ObjectId, group: IGroup) {
    let groupDAO = this.buildDataAccess<IGroupDAO>(Group);
    return groupDAO.updateOne({ _id: _id }, group);
  }
}