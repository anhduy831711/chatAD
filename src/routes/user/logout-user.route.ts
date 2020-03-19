import base from "../base.route";
import { log } from "../../../src/constant";

export default class extends base {
  async action() {
    let destroySession = () => {
      return new Promise((resolve, rejects) => {
        this.req.session.destroy((err) => {
          if (err) {
            rejects(err);
          }
          resolve("");
        })
      })

    }
    await destroySession();
    return log.SUCCESS.LOG_OUT;
  }
}