import base, { IService } from "../base";
import { IGroup } from "../../db/interface"
import Group, { IGroupDAO } from "../../db/group";
import { ObjectId } from "mongodb";
import { log } from "../../constant";

export interface IGroupService extends IService {
  create(group: IGroup) : Promise<any>,
  update(_id: ObjectId, update: object) : Promise<any>,
  delete(_id: ObjectId) : Promise<any>,
  findById(_id: ObjectId, project?: object): Promise<IGroup>,
  find(query: object, project?: object): Promise<Array<IGroup>>
}

export default class extends base implements IGroupService {
  find(query: object, project?: object): Promise<IGroup[]> {
    let groupDAO = this.buildDataAccess<IGroupDAO>(Group);
    return groupDAO.getAll(query, project);
  }
  findById(_id: ObjectId, project?: object): Promise<IGroup> {
    let groupDAO = this.buildDataAccess<IGroupDAO>(Group);
    return groupDAO.findOne({ _id }, project);
  }
  create(group: IGroup) : Promise<any> {
    let groupDAO = this.buildDataAccess<IGroupDAO>(Group);
    return groupDAO.create(group);
  }
  update(_id: ObjectId, update: object) : Promise<any> {
    let groupDAO = this.buildDataAccess<IGroupDAO>(Group);
    return groupDAO.updateOne({ _id }, update);
  }
  delete(_id: ObjectId) : Promise<any> {
    let groupDAO = this.buildDataAccess<IGroupDAO>(Group);
    return groupDAO.deleteOne(_id);
  }
}