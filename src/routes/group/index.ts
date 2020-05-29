import base from "../base.route";
import create from "./create-group.route";
import DeleteGroup from "./delete-group.route";
import register_group from "./register-group.route"
import read_group from "./read-group.route";
import update_group from "./update-group.route";
import count_group from "./count-group.route";

export default base.setRouter([{
  method : "post",
  router : create,
  url : "/"
},{
  method : "delete",
  router : DeleteGroup,
  url : "/:_id"
},{
  method : "post",
  router : register_group,
  url : "/register/:_id"
},{
  method : "get",
  router : read_group,
  url : "/"
},{
  method : "put",
  router : update_group,
  url : "/:_id"
},{
  method : "get",
  router : count_group,
  url : "/count"
}])
