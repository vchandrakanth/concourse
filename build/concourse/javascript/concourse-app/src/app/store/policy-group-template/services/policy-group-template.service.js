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
let PolicyGroupTemplateService = class PolicyGroupTemplateService {
    constructor(http) {
        this.http = http;
    }
    list() {
        return this.http.get(helpers_1.buildServiceRequest(enums_1.ServiceNames.Policy, 'policy-group-templates')).pipe(operators_1.map((response) => response.content.map(item => new models_1.PolicyGroupTemplate().deserialize(item))));
    }
    paginatedList(size = '200', page = '0', sort = 'id,DESC') {
        const params = new http_1.HttpParams()
            .set('size', size)
            .set('page', page)
            .set('sort', sort);
        return this.http.get(helpers_1.buildServiceRequest(enums_1.ServiceNames.Policy, 'policy-group-templates'), { params }).pipe(operators_1.map((response) => ({
            policyGroupTemplates: response.content.map(item => (new models_1.PolicyGroupTemplate().deserialize(item))),
            hasNextLink: this.hasNextLink(response)
        })));
    }
    get(id) {
        return this.http.get(helpers_1.buildServiceRequest(enums_1.ServiceNames.Policy, `policy-group-templates/${id}`)).pipe(operators_1.map(response => new models_1.PolicyGroupTemplate().deserialize(response)));
    }
    create(policyGroupTemplate, versionBump) {
        let params = new http_1.HttpParams();
        if (versionBump) {
            params = params.set('increment', versionBump);
        }
        return this.http.post(helpers_1.buildServiceRequest(enums_1.ServiceNames.Policy, 'policy-group-templates'), policyGroupTemplate, { params }).pipe(operators_1.map(response => new models_1.PolicyGroupTemplate().deserialize(response)));
    }
    update(policyGroupTemplate, versionBump) {
        let params = new http_1.HttpParams();
        if (versionBump) {
            params = params.set('increment', versionBump);
        }
        return this.http.put(helpers_1.buildServiceRequest(enums_1.ServiceNames.Policy, `policy-group-templates/${policyGroupTemplate.id}`), policyGroupTemplate.serialize(), { params }).pipe(operators_1.map(response => new models_1.PolicyGroupTemplate().deserialize(response)));
    }
    updatePolicyTemplates(policyGroupTemplate) {
        return this.http.put(helpers_1.buildServiceRequest(enums_1.ServiceNames.Policy, `policy-group-templates/${policyGroupTemplate.id}`), policyGroupTemplate.serialize()).pipe(operators_1.map(response => new models_1.PolicyGroupTemplate().deserialize(response)));
    }
    delete(id) {
        return this.http.delete(helpers_1.buildServiceRequest(enums_1.ServiceNames.Policy, `policy-group-templates/${id}`)).pipe(operators_1.map(response => response));
    }
    removePolicyTemplateFromPolicyGroupTemplate(id, policyTemplateId) {
        return this.http.delete(helpers_1.buildServiceRequest(enums_1.ServiceNames.Policy, `policy-group-templates/${id}/policy-templates/${policyTemplateId}`)).pipe(operators_1.map(response => new models_1.PolicyGroupTemplate().deserialize(response)));
    }
    hasNextLink(pagination) {
        return pagination.links.filter(link => link.rel === 'next').length > 0;
    }
};
PolicyGroupTemplateService = __decorate([
    core_1.Injectable()
], PolicyGroupTemplateService);
exports.PolicyGroupTemplateService = PolicyGroupTemplateService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9saWN5LWdyb3VwLXRlbXBsYXRlLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9jb25jb3Vyc2UvamF2YXNjcmlwdC9jb25jb3Vyc2UtYXBwL3NyYy9hcHAvc3RvcmUvcG9saWN5LWdyb3VwLXRlbXBsYXRlL3NlcnZpY2VzL3BvbGljeS1ncm91cC10ZW1wbGF0ZS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUEsK0NBQThEO0FBQzlELHdDQUEyQztBQUczQyw4Q0FBcUM7QUFFckMsbURBQWdGO0FBQ2hGLG1EQUF1RDtBQUN2RCx1REFBZ0U7QUFJaEUsSUFBYSwwQkFBMEIsR0FBdkMsTUFBYSwwQkFBMEI7SUFFckMsWUFBNkIsSUFBZ0I7UUFBaEIsU0FBSSxHQUFKLElBQUksQ0FBWTtJQUFJLENBQUM7SUFFbEQsSUFBSTtRQUNGLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsNkJBQW1CLENBQUMsb0JBQVksQ0FBQyxNQUFNLEVBQUUsd0JBQXdCLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FDM0YsZUFBRyxDQUFDLENBQUMsUUFBZ0QsRUFBRSxFQUFFLENBQ3ZELFFBQVEsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSw0QkFBbUIsRUFBRSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQzdFLENBQUM7SUFDSixDQUFDO0lBRUQsYUFBYSxDQUFDLElBQUksR0FBRyxLQUFLLEVBQUUsSUFBSSxHQUFHLEdBQUcsRUFBRSxJQUFJLEdBQUcsU0FBUztRQUV0RCxNQUFNLE1BQU0sR0FBZSxJQUFJLGlCQUFVLEVBQUU7YUFDeEMsR0FBRyxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUM7YUFDakIsR0FBRyxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUM7YUFDakIsR0FBRyxDQUFDLE1BQU0s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