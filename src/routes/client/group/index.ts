import base from "../../base";
import create from "./create";
import DeleteGroup from "./delete_group";
import register_group from "./register"

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
}])
