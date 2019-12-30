import base from "../base";
import Chat, { IChat } from "../../services/chat";
import { IAllowance } from "src/db/interface";

export default class extends base {
    async action() {
        //  console.log("da vao day");
        try {
            let allowance = this.req.body as IAllowance;
            let service_chat = this.buildService<IChat>(Chat);
            let allowances = await service_chat.insertOne({
                year: allowance.year,
                month: allowance.month, 
                advance : allowance.advance,
                _id : allowance._id
            });
            return this.result(200, allowances);
        } catch (error) {
            return this.result(0, error, "error")
        }

    }
}