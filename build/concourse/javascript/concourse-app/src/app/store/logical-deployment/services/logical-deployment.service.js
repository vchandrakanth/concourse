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
let LogicalDeploymentService = class LogicalDeploymentService {
    constructor(http) {
        this.http = http;
    }
    list() {
        return this.http.get(helpers_1.buildServiceRequest(enums_1.ServiceNames.Workflow, 'logical-deployments')).pipe(operators_1.map((response) => response.content.map(item => new models_1.LogicalDeployment().deserialize(item))));
    }
    getListPaginated(size = '200', page = '1', sort = 'id,DESC') {
        const params = new http_1.HttpParams()
            .set('includeTemplates', 'false')
            .set('size', size)
            .set('page', page)
            .set('sort', sort);
        return this.http.get(helpers_1.buildServiceRequest(enums_1.ServiceNames.Workflow, 'logical-deployments'), { params }).pipe(operators_1.map((response) => response.content.map(item => (new models_1.LogicalDeployment().deserialize(item)))));
    }
    get(deploymentId, surfaceLayerId) {
        return this.http.get(helpers_1.buildServiceRequest(enums_1.ServiceNames.Workflow, `surface-layers/${surfaceLayerId}/logical-deployments/${deploymentId}`)).pipe(operators_1.map(response => new models_1.LogicalDeployment().deserialize(response)));
    }
    listBySurfaceLayerIds(surfaceLayerIds) {
        let params = new http_1.HttpParams();
        surfaceLayerIds.forEach(id => {
            params = params.append('surfaceLayerIds', `${id}`);
        });
        return this.http.get(helpers_1.buildServiceRequest(enums_1.ServiceNames.Workflow, 'logical-deployments'), { params }).pipe(operators_1.map((response) => response.content.map(item => (new models_1.LogicalDeployment().deserialize(item)))));
    }
    getResourceAuditData(deploymentId, surfaceLayerId) {
        // TODO: Add startTime/endTime support
        return this.http.get(helpers_1.buildServiceRequest(enums_1.ServiceNames.Workflow, `surface-layers/${surfaceLayerId}/logical-deployments/${deploymentId}/resources/audit`)).pipe(operators_1.map((data) => data.auditHistory), operators_1.map(response => response));
    }
    generatePrivilegeTemplate(deploymentId, surfaceLayerId, generateBy) {
        const template = {
            concourseRoles: 'generate',
            cloudRoles: 'generate-cloudrole'
        };
        return this.http.get(helpers_1.buildServiceRequest(enums_1.ServiceNames.Workflow, `surface-layers/${surfaceLayerId}/logical-deployments/${deploymentId}/iam/${template[generateBy]}`)).pipe(operators_1.map(response => response));
    }
    updateModelVersion(logicalDeployment) {
        return this.http.put(helpers_1.buildServiceRequest(enums_1.ServiceNames.Workflow, `surface-layers/${logicalDeployment.surfaceLayerId}/logical-deployments/${logicalDeployment.id}`), logicalDeployment.serialize()).pipe(operators_1.map(response => new models_1.LogicalDeployment().deserialize(response)));
    }
    create(logicalDeployment) {
        return this.http.post(helpers_1.buildServiceRequest(enums_1.ServiceNames.Workflow, `surface-layers/${logicalDeployment.surfaceLayerId}/logical-deployments`), logicalDeployment).pipe(operators_1.map(response => new models_1.LogicalDeployment().deserialize(response)));
    }
    delete(surfaceLayerId, deploymentId) {
        return this.http.delete(helpers_1.buildServiceRequest(enums_1.ServiceNames.Workflow, `surface-layers/${surfaceLayerId}/logical-deployments/${deploymentId}`)).pipe(operators_1.map(response => response));
    }
};
LogicalDeploymentService = __decorate([
    core_1.Injectable()
], LogicalDeploymentService);
exports.LogicalDeploymentService = LogicalDeploymentService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9naWNhbC1kZXBsb3ltZW50LnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9jb25jb3Vyc2UvamF2YXNjcmlwdC9jb25jb3Vyc2UtYXBwL3NyYy9hcHAvc3RvcmUvbG9naWNhbC1kZXBsb3ltZW50L3NlcnZpY2VzL2xvZ2ljYWwtZGVwbG95bWVudC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUEsK0NBQThEO0FBQzlELHdDQUEyQztBQUczQyw4Q0FBcUM7QUFFckMsbURBQThFO0FBQzlFLG1EQUF1RDtBQUN2RCx1REFBZ0U7QUFHaEUsSUFBYSx3QkFBd0IsR0FBckMsTUFBYSx3QkFBd0I7SUFDbkMsWUFBNkIsSUFBZ0I7UUFBaEIsU0FBSSxHQUFKLElBQUksQ0FBWTtJQUFJLENBQUM7SUFFbEQsSUFBSTtRQUNGLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsNkJBQW1CLENBQUMsb0JBQVksQ0FBQyxRQUFRLEVBQUUscUJBQXFCLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FDMUYsZUFBRyxDQUFDLENBQUMsUUFBOEMsRUFBRSxFQUFFLENBQ3JELFFBQVEsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSwwQkFBaUIsRUFBRSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQzNFLENBQUM7SUFDSixDQUFDO0lBRUQsZ0JBQWdCLENBQUMsSUFBSSxHQUFHLEtBQUssRUFBRSxJQUFJLEdBQUcsR0FBRyxFQUFFLElBQUksR0FBRyxTQUFTO1FBQ3pELE1BQU0sTUFBTSxHQUFlLElBQUksaUJBQVUsRUFBRTthQUN4QyxHQUFHLENBQUMsa0JBQWtCLEVBQUUsT0FBTyxDQUFDO2FBQ2hDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDO2FBQ2pCLEdBQUcsQ0FBQyxNQUFNLEVBQUUs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