import base from "../base.route";
import create from "./create-group.route";
import DeleteGroup from "./delete-group.route";
import register_group from "./register-group.route"
import read_group from "./read-group.route";

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
  url : "/register"
},{
  method : "get",
  router : read_group,
  url : "/"
}])
