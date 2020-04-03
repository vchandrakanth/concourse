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
let PolicyResolutionService = class PolicyResolutionService {
    constructor(http) {
        this.http = http;
    }
    list() {
        return this.http.get(helpers_1.buildServiceRequest(enums_1.ServiceNames.Workflow, 'policy-resolutions')).pipe(operators_1.map((response) => response.content.map(item => new models_1.PolicyResolution().deserialize(item))));
    }
    getPolicyResolution(resolutionRequestId) {
        return this.http.get(helpers_1.buildServiceRequest(enums_1.ServiceNames.Workflow, `policy-resolutions/${resolutionRequestId}`)).pipe(operators_1.map(response => new models_1.PolicyResolution().deserialize(response)));
    }
    postComment(resolutionRequestId, resolutionAction) {
        return this.http.post(helpers_1.buildServiceRequest(enums_1.ServiceNames.Workflow, `policy-resolutions/${resolutionRequestId}/actions`), resolutionAction).pipe(operators_1.map(response => new models_1.ResolutionAction().deserialize(response)));
    }
    getPolicyViolationsByPolicyGroup(entityKey, entityId) {
        let params = new http_1.HttpParams();
        params = params.set(entityKey, entityId.toString()).
            set('status', 'CREATED,OPEN,IN_EXCEPTION,ASSIGNED,UNASSIGNED,IN_EXECUTION');
        return this.http.get(helpers_1.buildServiceRequest(enums_1.ServiceNames.Workflow, 'policy-resolutions'), { params }).pipe(operators_1.map((response) => response.content.map(item => new models_1.PolicyResolution().deserialize(item))));
    }
};
PolicyResolutionService = __decorate([
    core_1.Injectable()
], PolicyResolutionService);
exports.PolicyResolutionService = PolicyResolutionService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9saWN5LXJlc29sdXRpb24uc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL2NvbmNvdXJzZS9qYXZhc2NyaXB0L2NvbmNvdXJzZS1hcHAvc3JjL2FwcC9zdG9yZS9wb2xpY3ktcmVzb2x1dGlvbi9zZXJ2aWNlcy9wb2xpY3ktcmVzb2x1dGlvbi5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUEsK0NBQThEO0FBQzlELHdDQUEyQztBQUczQyw4Q0FBcUM7QUFFckMsbURBQStGO0FBQy9GLG1EQUF1RDtBQUN2RCx1REFBZ0U7QUFHaEUsSUFBYSx1QkFBdUIsR0FBcEMsTUFBYSx1QkFBdUI7SUFFbEMsWUFBNkIsSUFBZ0I7UUFBaEIsU0FBSSxHQUFKLElBQUksQ0FBWTtJQUFJLENBQUM7SUFFbEQsSUFBSTtRQUNGLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsNkJBQW1CLENBQUMsb0JBQVksQ0FBQyxRQUFRLEVBQUUsb0JBQW9CLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FDekYsZUFBRyxDQUFDLENBQUMsUUFBNkMsRUFBRSxFQUFFLENBQ3BELFFBQVEsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSx5QkFBZ0IsRUFBRSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUN2RSxDQUNGLENBQUM7SUFDSixDQUFDO0lBRUQsbUJBQW1CLENBQUMsbUJBQTJCO1FBQzdDLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsNkJBQW1CLENBQUMsb0JBQVksQ0FBQyxRQUFRLEVBQUUsc0JBQXNCLG1CQUFtQixFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FDaEgsZUFBRyxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSx5QkFBZ0IsRUFBRSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUM5RCxDQUFDO0lBQ0osQ0FBQztJQUVELFdBQVcsQ0FBQyxtQkFBMkIsRUFBRSxnQkFBMkM7UUFDbEYsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyw2QkFBbUIsQ0FDdkMsb0JBQVksQ0FBQyxRQUFRLEVBQUUsc0JBQXNCLG1CQUFtQixVQUFVLENBQUMsRUFDM0UsZ0JBQWdCLENBQ2pCLENBQUMsSUFBSSxDQUNKLGVBQUcsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUkseUJBQWdCLEVBQUUsQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FDOUQsQ0FBQztJQUNKLENBQUM7SUFFRCxnQ0FBZ0MsQ0FBQyxTQUFpQixFQUFFLFFBQWdCO1FBQ2xFLElBQUksTUFBTSxHQUFHLElBQUksaUJBQVUsRUFBRSxDQUFDO1FBQzlCLE1BQU0sR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDLFNBQVMsRUFBRSxRQUFRLENBQUMsUUFBUSxFQUFFLENBQUM7WUFDakQsR0FBRyxDQUFDLFFBQVEsRUFBRSw0REFBNEQsQ0FBQyxDQUFDO1FBRTlFLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsNkJBQW1CLENBQUMsb0JBQVksQ0FBQyxRQUFRLEVBQUUsb0JBQW9CLENBQUMsRUFBRSxFQUFFLE1BQU0sRUFBRSxDQUFDLENBQUMsSUFBSSxDQUNyRyxlQUFHLENBQUMsQ0FBQyxRQUE2QyxFQUFFLEVBQUUsQ0FDcEQsUUFBUSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLHlCQUFnQixFQUFFLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQ3ZFLENBQ0YsQ0FBQztJQUNKLENBQUM7Q0FDRixDQUFBO0FBdENZLHVCQUF1QjtJQURuQyxpQkFBVSxFQUFFO0dBQ0EsdUJBQXVCLENBc0NuQztBQXRDWSwwREFBdUIifQ==