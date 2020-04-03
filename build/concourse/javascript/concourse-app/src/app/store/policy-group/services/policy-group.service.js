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
let PolicyGroupService = class PolicyGroupService {
    constructor(http) {
        this.http = http;
    }
    list() {
        return this.http.get(helpers_1.buildServiceRequest(enums_1.ServiceNames.Policy, 'policy-groups')).pipe(operators_1.map((response) => (response.content.map(item => new models_1.PolicyGroup().deserialize(item)))));
    }
    paginatedList(size = '200', page = '0', sort = 'id,DESC') {
        const params = new http_1.HttpParams()
            .set('size', size)
            .set('page', page)
            .set('sort', sort);
        return this.http.get(helpers_1.buildServiceRequest(enums_1.ServiceNames.Policy, 'policy-groups'), { params }).pipe(operators_1.map((response) => ({
            policyGroups: response.content.map(item => (new models_1.PolicyGroup().deserialize(item))),
            hasNextLink: this.hasNextLink(response)
        })));
    }
    listBySurfaceLayerIds(surfaceLayerIds) {
        let params = new http_1.HttpParams();
        surfaceLayerIds.forEach(id => {
            params = params.append('surfaceLayerIds', `${id}`);
        });
        return this.http.get(helpers_1.buildServiceRequest(enums_1.ServiceNames.Policy, 'policy-groups'), { params }).pipe(operators_1.map((response) => response.content.map(item => new models_1.PolicyGroup().deserialize(item))));
    }
    get(policyGroupId) {
        return this.http.get(helpers_1.buildServiceRequest(enums_1.ServiceNames.Policy, `policy-groups/${policyGroupId}`)).pipe(operators_1.map(response => new models_1.PolicyGroup().deserialize(response)));
    }
    create(policyGroup, versionBump) {
        let params = new http_1.HttpParams();
        if (versionBump) {
            params = params.set('increment', versionBump);
        }
        return this.http.post(helpers_1.buildServiceRequest(enums_1.ServiceNames.Policy, 'policy-groups'), policyGroup instanceof models_1.PolicyGroup ? policyGroup.serialize() : policyGroup, { params }).pipe(operators_1.map(response => new models_1.PolicyGroup().deserialize(response)));
    }
    delete(policyGroupId) {
        return this.http.delete(helpers_1.buildServiceRequest(enums_1.ServiceNames.Policy, `policy-groups/${policyGroupId}`)).pipe(operators_1.map(response => response));
    }
    updatePolicyGroupRelated(pg) {
        return this.http.put(helpers_1.buildServiceRequest(enums_1.ServiceNames.Policy, `policy-groups/${pg.id}`), pg.serialize()).pipe(operators_1.map(response => new models_1.PolicyGroup().deserialize(response)));
    }
    updatePolicyDetails(pg, versionBump) {
        let params = new http_1.HttpParams();
        if (versionBump) {
            params = params.set('increment', versionBump);
        }
        return this.http.put(helpers_1.buildServiceRequest(enums_1.ServiceNames.Policy, `policy-groups/${pg.id}`), pg.serialize(), { params }).pipe(operators_1.map(response => new models_1.PolicyGroup().deserialize(response)));
    }
    hasNextLink(pagination) {
        return pagination.links.filter(link => link.rel === 'next').length > 0;
    }
};
PolicyGroupService = __decorate([
    core_1.Injectable()
], PolicyGroupService);
exports.PolicyGroupService = PolicyGroupService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9saWN5LWdyb3VwLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9jb25jb3Vyc2UvamF2YXNjcmlwdC9jb25jb3Vyc2UtYXBwL3NyYy9hcHAvc3RvcmUvcG9saWN5LWdyb3VwL3NlcnZpY2VzL3BvbGljeS1ncm91cC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUEsK0NBQThEO0FBQzlELHdDQUEyQztBQUczQyw4Q0FBcUM7QUFFckMsbURBQXdFO0FBQ3hFLG1EQUF1RDtBQUN2RCx1REFBZ0U7QUFJaEUsSUFBYSxrQkFBa0IsR0FBL0IsTUFBYSxrQkFBa0I7SUFFN0IsWUFBNkIsSUFBZ0I7UUFBaEIsU0FBSSxHQUFKLElBQUksQ0FBWTtJQUFJLENBQUM7SUFFbEQsSUFBSTtRQUNGLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsNkJBQW1CLENBQUMsb0JBQVksQ0FBQyxNQUFNLEVBQUUsZUFBZSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQ2xGLGVBQUcsQ0FBQyxDQUFDLFFBQXdDLEVBQUUsRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLG9CQUFXLEVBQUUsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQ3ZILENBQUM7SUFDSixDQUFDO0lBRUQsYUFBYSxDQUFDLElBQUksR0FBRyxLQUFLLEVBQUUsSUFBSSxHQUFHLEdBQUcsRUFBRSxJQUFJLEdBQUcsU0FBUztRQUN0RCxNQUFNLE1BQU0sR0FBZSxJQUFJLGlCQUFVLEVBQUU7YUFDeEMsR0FBRyxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUM7YUFDakIsR0FBRyxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUM7YUFDakIsR0FBRyxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FBQztR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