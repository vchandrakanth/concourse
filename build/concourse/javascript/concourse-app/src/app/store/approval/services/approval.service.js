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
let ApprovalService = class ApprovalService {
    constructor(http) {
        this.http = http;
    }
    list() {
        return this.http.get(helpers_1.buildServiceRequest(enums_1.ServiceNames.Workflow, 'approvals')).pipe(operators_1.map((response) => response.content.map(item => new models_1.ApprovalRequest().deserialize(item))));
    }
    get(id) {
        return this.http.get(helpers_1.buildServiceRequest(enums_1.ServiceNames.Workflow, `approvals/${id}`)).pipe(operators_1.map(response => new models_1.ApprovalRequest().deserialize(response)));
    }
    getByRequestEntityId(id) {
        let params = new http_1.HttpParams();
        params = params.set('requestEntityId', `${id}`);
        return this.http.get(helpers_1.buildServiceRequest(enums_1.ServiceNames.Workflow, 'approvals'), { params }).pipe(operators_1.map((response) => response.content.map(item => new models_1.ApprovalRequest().deserialize(item))));
    }
    postAction(approvalRequestId, approvalAction) {
        return this.http.post(helpers_1.buildServiceRequest(enums_1.ServiceNames.Workflow, `approvals/${approvalRequestId}/actions`), approvalAction).pipe(operators_1.map(response => new models_1.ApprovalAction().deserialize(response)));
    }
};
ApprovalService = __decorate([
    core_1.Injectable()
], ApprovalService);
exports.ApprovalService = ApprovalService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwcm92YWwuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL2NvbmNvdXJzZS9qYXZhc2NyaXB0L2NvbmNvdXJzZS1hcHAvc3JjL2FwcC9zdG9yZS9hcHByb3ZhbC9zZXJ2aWNlcy9hcHByb3ZhbC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUEsK0NBQThEO0FBQzlELHdDQUEyQztBQUczQyw4Q0FBcUM7QUFFckMsbURBQTRGO0FBQzVGLG1EQUF1RDtBQUN2RCx1REFBZ0U7QUFHaEUsSUFBYSxlQUFlLEdBQTVCLE1BQWEsZUFBZTtJQStCMUIsWUFBNkIsSUFBZ0I7UUFBaEIsU0FBSSxHQUFKLElBQUksQ0FBWTtJQUFJLENBQUM7SUE3QmxELElBQUk7UUFDRixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLDZCQUFtQixDQUFDLG9CQUFZLENBQUMsUUFBUSxFQUFFLFdBQVcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUNoRixlQUFHLENBQUMsQ0FBQyxRQUE0QyxFQUFFLEVBQUUsQ0FDbkQsUUFBUSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLHdCQUFlLEVBQUUsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FDdEUsQ0FDRixDQUFDO0lBQ0osQ0FBQztJQUVELEdBQUcsQ0FBQyxFQUFVO1FBQ1osT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyw2QkFBbUIsQ0FBQyxvQkFBWSxDQUFDLFFBQVEsRUFBRSxhQUFhLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQ3RGLGVBQUcsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksd0JBQWUsRUFBRSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUM3RCxDQUFDO0lBQ0osQ0FBQztJQUVELG9CQUFvQixDQUFDLEVBQVU7UUFDN0IsSUFBSSxNQUFNLEdBQUcsSUFBSSxpQkFBVSxFQUFFLENBQUM7UUFDOUIsTUFBTSxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUMsaUJBQWlCLEVBQUUsR0FBRyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQ2hELE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsNkJBQW1CLENBQUMsb0JBQVksQ0FBQyxRQUFRLEVBQUUsV0FBVyxDQUFDLEVBQUUsRUFBRSxNQUFNLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FDNUYsZUFBRyxDQUFDLENBQUMsUUFBNEMsRUFBRSxFQUFFLENBQ25ELFFBQVEsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSx3QkFBZSxFQUFFLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FDekUsQ0FBQztJQUNKLENBQUM7SUFFRCxVQUFVLENBQUMsaUJBQXlCLEVBQUUsY0FBdUM7UUFDM0UsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyw2QkFBbUIsQ0FBQyxvQkFBWSxDQUFDLFFBQVEsRUFBRSxhQUFhLGlCQUFpQixVQUFVLENBQUMsRUFDeEcsY0FBYyxDQUNmLENBQUMsSUFBSSxDQUFDLGVBQUcsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksdUJBQWMsRUFBRSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDdEUsQ0FBQztDQUdGLENBQUE7QUFoQ1ksZUFBZTtJQUQzQixpQkFBVSxFQUFFO0dBQ0EsZUFBZSxDQWdDM0I7QUFoQ1ksMENBQWUifQ==