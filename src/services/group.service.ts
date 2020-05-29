import base, { IService } from "./base.service";
import { IGroup } from "../db/interface"
import Group, { IGroupDAO } from "../db/group";
import { ObjectId } from "mongodb";
import { log } from "../constant";

export interface IGroupService extends IService {
  create(group: IGroup): Promise<any>,
  update(_id: ObjectId, update: object): Promise<any>,
  delete(_id: ObjectId): Promise<any>,
  findById(_id: ObjectId, project?: object): Promise<IGroup>,
  find(query: object, project?: object, skip?: number, limit?: number): Promise<Array<IGroup>>,
  findByAggregate(query: Array<object>): Promise<Array<IGroup>>,
  save(group: IGroup),
  count(query: object)
}

export default class extends base implements IGroupService {
  find(query: object, project?: object, skip?: number, limit?: number): Promise<IGroup[]> {
    let groupDAO = this.buildDataAccess<IGroupDAO>(Group);
    return groupDAO.find(query, project, skip, limit);
  }
  findById(_id: ObjectId, project?: object): Promise<IGroup> {
    let groupDAO = this.buildDataAccess<IGroupDAO>(Group);
    return groupDAO.findOne({ _id }, project);
  }
  create(group: IGroup): Promise<any> {
    group.leader = this.getUser._id;
    group.members = [];
    group.members.push(this.getUser._id);
    let groupDAO = this.buildDataAccess<IGroupDAO>(Group);
    return groupDAO.create(group);
  }
  update(_id: ObjectId, update: object): Promise<any> {
    let groupDAO = this.buildDataAccess<IGroupDAO>(Group);
    return groupDAO.updateOne({ _id }, { $set: update });
  }
  async delete(_id: ObjectId): Promise<any> {
    let groupDAO = this.buildDataAccess<IGroupDAO>(Group);
    let group = await this.findById(_id);
    if (group.leader != this.getUser._id) {
      throw log.GROUP_ERROR.NOT_LEADER_GROUP;
    }
    return groupDAO.deleteById(_id);
  }
  findByAggregate(query: Array<object>): Promise<Array<IGroup>> {
    let groupDAO = this.buildDataAccess<IGroupDAO>(Group);
    return groupDAO.aggregate(query);
  }
  save(group: IGroup) {
    let groupDAO = this.buildDataAccess<IGroupDAO>(Group);
    return groupDAO.save(group);
  }
  count(query: object) {
    let groupDAO = this.buildDataAccess<IGroupDAO>(Group);
    return groupDAO.count(query);
  }
}