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
let DiscoveredDeploymentService = class DiscoveredDeploymentService {
    constructor(http) {
        this.http = http;
    }
    list() {
        return this.http.get(helpers_1.buildServiceRequest(enums_1.ServiceNames.Workflow, 'discovered-aws-deployments')).pipe(operators_1.map((response) => response.content.map(item => (new models_1.DiscoveredDeployment().deserialize(item)))));
    }
    getListPaginated(size = '200', page = '1', sort = 'id,DESC') {
        const params = new http_1.HttpParams()
            .set('includeTemplates', 'false')
            .set('size', size)
            .set('page', page)
            .set('sort', sort);
        return this.http.get(helpers_1.buildServiceRequest(enums_1.ServiceNames.Workflow, 'discovered-aws-deployments'), { params }).pipe(operators_1.map((response) => response.content.map(item => (new models_1.DiscoveredDeployment().deserialize(item)))));
    }
    get(id) {
        return this.http.get(helpers_1.buildServiceRequest(enums_1.ServiceNames.Workflow, `discovered-aws-deployments/${id}`)).pipe(operators_1.map(discoveredDeployment => new models_1.DiscoveredDeployment().deserialize(discoveredDeployment)));
    }
    getResourceAuditData(id) {
        // TODO: Add startTime/endTime support
        return this.http.get(helpers_1.buildServiceRequest(enums_1.ServiceNames.Workflow, `discovered-aws-deployments/${id}/resources/audit`)).pipe(operators_1.map((data) => data.auditHistory), operators_1.map(response => response));
    }
};
DiscoveredDeploymentService = __decorate([
    core_1.Injectable()
], DiscoveredDeploymentService);
exports.DiscoveredDeploymentService = DiscoveredDeploymentService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlzY292ZXJlZC1kZXBsb3ltZW50LnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9jb25jb3Vyc2UvamF2YXNjcmlwdC9jb25jb3Vyc2UtYXBwL3NyYy9hcHAvc3RvcmUvZGlzY292ZXJlZC1kZXBsb3ltZW50L3NlcnZpY2VzL2Rpc2NvdmVyZWQtZGVwbG95bWVudC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUEsK0NBQThEO0FBQzlELHdDQUEyQztBQUczQyw4Q0FBcUM7QUFFckMsbURBQWlGO0FBQ2pGLG1EQUF1RDtBQUN2RCx1REFBZ0U7QUFHaEUsSUFBYSwyQkFBMkIsR0FBeEMsTUFBYSwyQkFBMkI7SUFDdEMsWUFBNkIsSUFBZ0I7UUFBaEIsU0FBSSxHQUFKLElBQUksQ0FBWTtJQUFJLENBQUM7SUFFbEQsSUFBSTtRQUNGLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsNkJBQW1CLENBQUMsb0JBQVksQ0FBQyxRQUFRLEVBQUUsNEJBQTRCLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FDakcsZUFBRyxDQUFDLENBQUMsUUFBaUQsRUFBRSxFQUFFLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUN0RixJQUFJLDZCQUFvQixFQUFFLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUM3QyxDQUFDLENBQUMsQ0FDSixDQUFDO0lBQ0osQ0FBQztJQUVELGdCQUFnQixDQUFDLElBQUksR0FBRyxLQUFLLEVBQUUsSUFBSSxHQUFHLEdBQUcsRUFBRSxJQUFJLEdBQUcsU0FBUztRQUV6RCxNQUFNLE1BQU0sR0FBZSxJQUFJLGlCQUFVLEVBQUU7YUFDeEMsR0FBRyxDQUFDLGtCQUFrQixFQUFFLE9BQU8sQ0FBQzthQUNoQyxHQUFHLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQzthQUNqQixHQUFHLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQzthQUNqQixHQUFHLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBRXJCLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsNkJBQW1CLENBQUMsb0JBQVksQ0FBQyxRQUFRLEVBQUUsNEJBQTRCLENBQUMsRUFBRSxFQUFFLE1BQU0sRUFBRSxDQUFDLENBQUMsSUFBSSxDQUM3RyxlQUFHLENBQUMsQ0FBQyxRQUFpRCxFQUFFLEVBQUUsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQ3RGLElBQUksNkJBQW9CLEVBQUUsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQzdDLENBQUMsQ0FBQyxDQUNKLENBQUM7SUFDSixDQUFDO0lBRUQsR0FBRyxDQUFDLEVBQVU7UUFDWixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLDZCQUFtQixDQUFDLG9CQUFZLENBQUMsUUFBUSxFQUFFLDhCQUE4QixFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUN2RyxlQUFHLENBQUMsb0JBQW9CLENBQUMsRUFBRSxDQUFDLElBQUksNkJBQW9CLEVBQUUsQ0FBQyxXQUFXLENBQUMsb0JBQW9CLENBQUMsQ0FBQyxDQUMxRixDQUFDO0lBQ0osQ0FBQztJQUVELG9CQUFvQixDQUFDLEVBQVU7UUFDN0Isc0NBQXNDO1FBQ3RDLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQ2xCLDZCQUFtQixDQUFDLG9CQUFZLENBQUMsUUFBUSxFQUFFLDhCQUE4QixFQUFFLGtCQUFrQixDQUFDLENBQy9GLENBQUMsSUFBSSxDQUNKLGVBQUcsQ0FBQyxDQUFDLElBQVMsRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxFQUNyQyxlQUFHLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxRQUFlLENBQUMsQ0FDakMsQ0FBQztJQUNKLENBQUM7Q0FDRixDQUFBO0FBekNZLDJCQUEyQjtJQUR2QyxpQkFBVSxFQUFFO0dBQ0EsMkJBQTJCLENBeUN2QztBQXpDWSxrRUFBMkIifQ==