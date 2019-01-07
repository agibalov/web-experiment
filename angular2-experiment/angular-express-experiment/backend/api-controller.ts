import {controller, httpGet} from "inversify-express-utils";
import {DatabaseService} from "./database-service";
import {inject} from "inversify";

@controller('/api')
export class ApiController {
    constructor(
        @inject(DatabaseService) private databaseService: DatabaseService)
    {}

    @httpGet('/test')
    async hello() {
        return {
            message: `I am API! DatabaseService says: ${await this.databaseService.getData()}`
        };
    }
}
