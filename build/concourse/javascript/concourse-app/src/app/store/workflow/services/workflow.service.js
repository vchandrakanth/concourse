"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = require("@angular/common/http");
const core_1 = require("@angular/core");
const operators_1 = require("rxjs/operators");
const models_1 = require("@concourse/core/models");
const enums_1 = require("@concourse/shared/enums");
const helpers_1 = require("@concourse/shared/helpers");
let WorkflowService = class WorkflowService {
    constructor(http) {
        this.http = http;
    }
    getByTypes(types) {
        let params = new http_1.HttpParams();
        types.forEach(type => {
            params = params.set('workflowTypes', `${type}`);
        });
        return this.http.get(helpers_1.buildServiceRequest(enums_1.ServiceNames.Workflow, 'workflow-summaries'), { params }).pipe(operators_1.map((response) => (Object.assign(Object.assign({}, response), { owned: response.owned.map(o => new models_1.Summary().deserialize(o)), assigned: response.assigned.map(a => new models_1.Summary().deserialize(a)), watched: response.watched.map(w => new models_1.Summary().deserialize(w)) }))));
    }
};
WorkflowService = __decorate([
    core_1.Injectable()
], WorkflowService);
exports.WorkflowService = WorkflowService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid29ya2Zsb3cuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL2NvbmNvdXJzZS9qYXZhc2NyaXB0L2NvbmNvdXJzZS1hcHAvc3JjL2FwcC9zdG9yZS93b3JrZmxvdy9zZXJ2aWNlcy93b3JrZmxvdy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUEsK0NBQThEO0FBQzlELHdDQUEyQztBQUczQyw4Q0FBcUM7QUFFckMsbURBQWdGO0FBQ2hGLG1EQUF1RDtBQUN2RCx1REFBZ0U7QUFHaEUsSUFBYSxlQUFlLEdBQTVCLE1BQWEsZUFBZTtJQWlCMUIsWUFBNkIsSUFBZ0I7UUFBaEIsU0FBSSxHQUFKLElBQUksQ0FBWTtJQUFJLENBQUM7SUFmbEQsVUFBVSxDQUFDLEtBQXFCO1FBQzlCLElBQUksTUFBTSxHQUFHLElBQUksaUJBQVUsRUFBRSxDQUFDO1FBQzlCLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFDbkIsTUFBTSxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUMsZUFBZSxFQUFFLEdBQUcsSUFBSSxFQUFFLENBQUMsQ0FBQztRQUNsRCxDQUFDLENBQUMsQ0FBQztRQUNILE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsNkJBQW1CLENBQUMsb0JBQVksQ0FBQyxRQUFRLEVBQUUsb0JBQW9CLENBQUMsRUFBRSxFQUFFLE1BQU0sRUFBRSxDQUFDLENBQUMsSUFBSSxDQUNyRyxlQUFHLENBQUMsQ0FBQyxRQUF5QixFQUFFLEVBQUUsQ0FBQyxpQ0FDOUIsUUFBUSxLQUNYLEtBQUssRUFBRSxRQUFRLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLElBQUksZ0JBQU8sRUFBRSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUM1RCxRQUFRLEVBQUUsUUFBUSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxJQUFJLGdCQUFPLEVBQUUsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFDbEUsT0FBTyxFQUFFLFFBQVEsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsSUFBSSxnQkFBTyxFQUFFLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQ2hFLENBQUMsQ0FDSixDQUFDO0lBQ0osQ0FBQztDQUdGLENBQUE7QUFsQlksZUFBZTtJQUQzQixpQkFBVSxFQUFFO0dBQ0EsZUFBZSxDQWtCM0I7QUFsQlksMENBQWUifQ==