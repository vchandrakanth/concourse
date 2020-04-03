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
const enums_1 = require("@concourse/shared/enums");
const helpers_1 = require("@concourse/shared/helpers");
let DashboardService = class DashboardService {
    constructor(http) {
        this.http = http;
        this.today = new Date();
        this.dd = String(this.today.getDate()).padStart(2, '0');
        this.mm = String(this.today.getMonth() + 1).padStart(2, '0');
        this.yyyy = this.today.getFullYear();
        this.defaultTime = `${this.yyyy}-${this.mm}-${this.dd}_12:00`;
    }
    getWorkflowSummaries() {
        return this.http.get(helpers_1.buildServiceRequest(enums_1.ServiceNames.Workflow, 'workflow-summaries')).pipe(operators_1.map(response => response));
    }
    getOpenViolationsOnDeployedStacks(since = this.defaultTime) {
        const params = new http_1.HttpParams()
            .set('since', since);
        return this.http.get(helpers_1.buildServiceRequest(enums_1.ServiceNames.Dashboard, 'dashboards/risks/deployment-violations'), { params }).pipe(operators_1.map(response => response));
    }
    getOpenViolations(since = this.defaultTime) {
        const params = new http_1.HttpParams()
            .set('since', since);
        return this.http.get(helpers_1.buildServiceRequest(enums_1.ServiceNames.Dashboard, 'dashboards/risks/account-violations'), { params }).pipe(operators_1.map(response => response));
    }
    getUpdatedPolicyGroups(since = this.defaultTime) {
        const params = new http_1.HttpParams()
            .set('since', since);
        return this.http.get(helpers_1.buildServiceRequest(enums_1.ServiceNames.Dashboard, 'dashboards/concourse-changes/policies'), { params }).pipe(operators_1.map(response => response));
    }
    getUpdatedRoleAssignments(since = this.defaultTime) {
        const params = new http_1.HttpParams()
            .set('since', since);
        return this.http.get(helpers_1.buildServiceRequest(enums_1.ServiceNames.Dashboard, 'dashboards/concourse-changes/role-assignments'), { params }).pipe(operators_1.map(response => response));
    }
    getUpdatedCloudRoleAssignments(since = this.defaultTime) {
        const params = new http_1.HttpParams()
            .set('since', since);
        return this.http.get(helpers_1.buildServiceRequest(enums_1.ServiceNames.Dashboard, 'dashboards/concourse-changes/cloud-role-assignments'), { params }).pipe(operators_1.map(response => response));
    }
    getUpdatedCloudRoleIds(since = this.defaultTime) {
        const params = new http_1.HttpParams()
            .set('since', since);
        return this.http.get(helpers_1.buildServiceRequest(enums_1.ServiceNames.Dashboard, 'dashboards/concourse-changes/cloud-roles'), { params }).pipe(operators_1.map(response => response));
    }
    getUpdatedUserGroupsIds(since = this.defaultTime) {
        const params = new http_1.HttpParams()
            .set('since', since);
        return this.http.get(helpers_1.buildServiceRequest(enums_1.ServiceNames.Dashboard, 'dashboards/concourse-changes/groups'), { params }).pipe(operators_1.map(response => response));
    }
    getAzureNetworkWatchers() {
        return this.http.get(helpers_1.buildServiceRequest(enums_1.ServiceNames.Dashboard, 'dashboards/inventory/azure/network-watchers')).pipe(operators_1.map(response => response));
    }
    getAzurePublicIPs() {
        return this.http.get(helpers_1.buildServiceRequest(enums_1.ServiceNames.Dashboard, 'dashboards/inventory/azure/public-ips')).pipe(operators_1.map(response => response));
    }
    getAzureNetworkSecurityGroups() {
        return this.http.get(helpers_1.buildServiceRequest(enums_1.ServiceNames.Dashboard, 'dashboards/inventory/azure/network-security-groups')).pipe(operators_1.map(response => response));
    }
    getAzureNetworkInterfaces() {
        return this.http.get(helpers_1.buildServiceRequest(enums_1.ServiceNames.Dashboard, 'dashboards/inventory/azure/network-interfaces')).pipe(operators_1.map(response => response));
    }
    getAzureDatabases(since = this.defaultTime) {
        const params = new http_1.HttpParams()
            .set('since', since);
        return this.http.get(helpers_1.buildServiceRequest(enums_1.ServiceNames.Dashboard, 'dashboards/inventory/azure/databases'), { params }).pipe(operators_1.map(response => response));
    }
    getAzureDeploymentStatus() {
        return this.http.get(helpers_1.buildServiceRequest(enums_1.ServiceNames.Dashboard, 'dashboards/inventory/azure/deployment-status')).pipe(operators_1.map(response => response));
    }
};
DashboardService = __decorate([
    core_1.Injectable()
], DashboardService);
exports.DashboardService = DashboardService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGFzaGJvYXJkLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9jb25jb3Vyc2UvamF2YXNjcmlwdC9jb25jb3Vyc2UtYXBwL3NyYy9hcHAvc3RvcmUvZGFzaGJvYXJkL3NlcnZpY2VzL2Rhc2hib2FyZC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUEsK0NBQThEO0FBQzlELHdDQUEyQztBQUczQyw4Q0FBcUM7QUFFckMsbURBQXVEO0FBQ3ZELHVEQUFnRTtBQUtoRSxJQUFhLGdCQUFnQixHQUE3QixNQUFhLGdCQUFnQjtJQU8zQixZQUE2QixJQUFnQjtRQUFoQixTQUFJLEdBQUosSUFBSSxDQUFZO1FBTjdDLFVBQUssR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDO1FBQ25CLE9BQUUsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDbkQsT0FBRSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDeEQsU0FBSSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxFQUFFLENBQUM7UUFFaEMsZ0JBQVcsR0FBRyxHQUFHLElBQUksQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLEVBQUUsSUFBSSxJQUFJLENBQUMsRUFBRSxRQUFRLENBQUM7SUFDUixDQUFDO0lBRWxELG9CQUFvQjtRQUNsQixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLDZCQUFtQixDQUFDLG9CQUFZLENBQUMsUUFBUSxFQUFFLG9CQUFvQixDQUFDLENBQUMsQ0FBQyxJQUFJLENBQ3pGLGVBQUcsQ0FBQyxRQUFRLENBQUMs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