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
const ngx_cacheable_1 = require("ngx-cacheable");
const operators_1 = require("rxjs/operators");
const models_1 = require("@concourse/core/models");
const enums_1 = require("@concourse/shared/enums");
const helpers_1 = require("@concourse/shared/helpers");
let AnalyticsService = class AnalyticsService {
    // export const policyPredicateDefaults: { [key in AttributeType]: string } = {
    //   ALLOW: 'Allow/Disallow',
    //   APPROVAL_GROUP: 'Selected Approval Groups',
    //   AWS_REGION: 'Selected Regions',
    //   AWS_SERVICE: 'Selected Services',
    //   CONNECTION_SPECIFICATION: 'Connection Specification',
    //   DEPLOYMENT: 'Selected Deployments',
    //   ENTITY: 'Entity',
    //   EVENT: 'Event',
    //   DIRECTION: 'Directional',
    //   CIDR_BLOCK: 'CIDR Blocks',
    //   MONETARY_VALUE: '$XXX.00',
    //   SURFACE_LAYER: 'Selected Surface Layers',
    //   CUSTOM_AWS_RESOURCE: 'Allowed Custom AWS Resource',
    //   RESOURCE_ROOT: 'Resource Type',
    //   ALL_OF: 'All Of',
    //   SOME_OF: 'Some Of',
    //   NONE_OF: 'None Of',
    //   JSON_STRING: 'JSON',
    //   STRING: 'STRING'
    // };
    constructor(http) {
        this.http = http;
        this.setStatOptions = (options) => {
            let params = new http_1.HttpParams();
            if (options.breakdown) {
                params = params.set('breakdown', options.breakdown);
            }
            if (options.lookBackInHours) {
                params = params.set('lookBackInHours', options.lookBackInHours);
            }
            if (options.types) {
                params = params.set('types', options.types.join(','));
            }
            // user may filter by surfaceId, surfaceLayerId, or approvalRequestStatus.
            // Based on UI filter data We can set this Params.
            // if (options.filters) {
            // params = params.set('type', options.filters);
            // }
            return params;
        };
        // tslint:disable-next-line: arrow-return-shorthand
        this.parseStatsResponse = (response, chartNames, breakdownBy) => {
            const statTypeDefaults = {
                APPROVED_APPROVAL_REQUESTS: 'Approved Approvals',
                CREATED_APPROVAL_REQUESTS: 'Created Approvals',
                CANCELLED_APPROVAL_REQUESTS: 'Cancelled Approvals',
                CREATED_POLICY_VIOLATION_REQUESTS: 'Created Policy Violations',
                CANCELLED_POLICY_VIOLATION_REQUESTS: 'Cancelled Policy Violations'
            };
            return Object.assign(Object.assign({}, response), { request: { chartNames, breakdown: breakdownBy }, data: response.map(d => (Object.assign(Object.assign({}, d), { name: statTypeDefaults[d.name] ? statTypeDefaults[d.name] : d.name }))) });
        };
    }
    // @Cacheable() platformUsageTotal(): Observable<ChartData> {
    //   return this.http.get(buildServiceRequest(ServiceNames.Reporting, 'analytics/platform/usage/total')).pipe(
    //     map(response => new ChartData().deserialize(response))
    //   );
    // }
    platformUsageTotal() {
        return this.http.get(helpers_1.buildServiceRequest(enums_1.ServiceNames.Reporting, 'analytics/platform/usage/total')).pipe(operators_1.map(response => new models_1.ChartResponse().deserialize(response)));
    }
    userUsage() {
        return this.http.get(helpers_1.buildServiceRequest(enums_1.ServiceNames.Reporting, 'analytics/platform/usage/user')).pipe(operators_1.map(response => new models_1.ChartResponse().deserialize(response)));
    }
    activityDistribution() {
        return this.http.get(helpers_1.buildServiceRequest(enums_1.ServiceNames.Reporting, 'analytics/platform/activity_distribution')).pipe(operators_1.map(response => new models_1.ChartData().deserialize(response)));
    }
    userCorrelationPlot() {
        return this.http.get(helpers_1.buildServiceRequest(enums_1.ServiceNames.Reporting, '/analytics/platform/CSC/user')).pipe(operators_1.map(response => new models_1.ChartData().deserialize(response)));
    }
    statsApprovals(options) {
        const params = this.setStatOptions(options);
        return this.http.get(helpers_1.buildServiceRequest(enums_1.ServiceNames.Workflow, 'stats2/approvals'), { params }).pipe(operators_1.map((response) => ({
            response: response.response,
            chartNames: response.request.dataTypes,
            breakdownBy: options.breakdown
        })), operators_1.map(({ response, chartNames, breakdownBy }) => this.parseStatsResponse(response, chartNames, breakdownBy)), operators_1.map(response => new models_1.ChartData().deserialize(response)));
    }
    statsPolicyViolations(options) {
        const params = this.setStatOptions(options);
        return this.http.get(helpers_1.buildServiceRequest(enums_1.ServiceNames.Workflow, 'stats2/policy-violations'), { params }).pipe(operators_1.map((response) => ({
            response: response.response,
            chartNames: response.request.dataTypes,
            breakdownBy: options.breakdown
        })), operators_1.map(({ response, chartNames, breakdownBy }) => this.parseStatsResponse(response, chartNames, breakdownBy)), operators_1.map(response => new models_1.ChartData().deserialize(response)));
    }
};
__decorate([
    ngx_cacheable_1.Cacheable()
], AnalyticsService.prototype, "platformUsageTotal", null);
__decorate([
    ngx_cacheable_1.Cacheable()
], AnalyticsService.prototype, "userUsage", null);
__decorate([
    ngx_cacheable_1.Cacheable()
], AnalyticsService.prototype, "activityDistribution", null);
__decorate([
    ngx_cacheable_1.Cacheable()
], AnalyticsService.prototype, "userCorrelationPlot", null);
__decorate([
    ngx_cacheable_1.Cacheable()
], AnalyticsService.prototype, "statsApprovals", null);
__decorate([
    ngx_cacheable_1.Cacheable()
], AnalyticsService.prototype, "statsPolicyViolations", null);
AnalyticsService = __decorate([
    core_1.Injectable()
], AnalyticsService);
exports.AnalyticsService = AnalyticsService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5hbHl0aWNzLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9jb25jb3Vyc2UvamF2YXNjcmlwdC9jb25jb3Vyc2UtYXBwL3NyYy9hcHAvc3RvcmUvYW5hbHl0aWNzL3NlcnZpY2VzL2FuYWx5dGljcy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUEsK0NBQThEO0FBQzlELHdDQUEyQztBQUMzQyxpREFBMEM7QUFHMUMsOENBQXFDO0FBRXJDLG1EQUFnRjtBQUNoRixtREFBdUQ7QUFDdkQsdURBQXNFO0FBR3RFLElBQWEsZ0JBQWdCLEdBQTdCLE1BQWEsZ0JBQWdCO0lBRTNCLCtFQUErRTtJQUMvRSw2QkFBNkI7SUFDN0IsZ0RBQWdEO0lBQ2hELG9DQUFvQztJQUNwQyxzQ0FBc0M7SUFDdEMsMERBQTBEO0lBQzFELHdDQUF3QztJQUN4QyxzQkFBc0I7SUFDdEIsb0JBQW9CO0lBQ3BCLDhCQUE4QjtJQUM5QiwrQkFBK0I7SUFDL0IsK0JBQStCO0lBQy9CLDhDQUE4QztJQUM5Qyx3REFBd0Q7SUFDeEQsb0NBQW9DO0lBQ3BDLHNCQUFzQjtJQUN0Qix3QkFBd0I7SUFDeEIsd0JBQXdCO0lBQ3hCLHlCQUF5QjtJQUN6QixxQkFBcUI7SUFFckIsS0FBSztJQUVMLFlBQ21CLElBQWdCO1FBQWhCLFNBQUksR0FBSixJQUFJLENBQVk7UUE4RGxCLG1CQUFjLEdBQUcsQ0FBQyxPQUFxQixFQUFjLEVBQUU7WUFDdEUsSUFBSSxNQUFNLEdBQUcsSUFBSSxpQkFBVSxFQUFFLENBQUM7WUFDOUIsSUFBSSxPQUFPLENBQUMsU0FBUyxFQUFFO2dCQUNyQixNQUFNLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQyxXQUFXLEVBQUUsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDO2FBQ3JEO1lBRUQsSUFBSSxPQUFPLENBQUMsZUFBZSxFQUFFO2dCQUMzQixNQUFNLEdBQUcsTUFB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