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
let GroupService = class GroupService {
    constructor(http) {
        this.http = http;
    }
    list() {
        return this.http.get(helpers_1.buildServiceRequest(enums_1.ServiceNames.User, 'groups')).pipe(operators_1.map((response) => response.content.map(g => new models_1.Group().deserialize(g))));
    }
    paginatedList(size = '200', page = '0', sort = 'id,DESC') {
        const params = new http_1.HttpParams()
            .set('size', size)
            .set('page', page)
            .set('sort', sort);
        return this.http.get(helpers_1.buildServiceRequest(enums_1.ServiceNames.User, 'groups'), { params }).pipe(operators_1.map((response) => ({
            groups: response.content.map(item => (new models_1.Group().deserialize(item))),
            hasNextLink: this.hasNextLink(response)
        })));
    }
    listBySurfaceLayerIds(surfaceLayerIds) {
        let params = new http_1.HttpParams();
        surfaceLayerIds.forEach(id => {
            params = params.append('surfaceLayerIds', `${id}`);
        });
        return this.http.get(helpers_1.buildServiceRequest(enums_1.ServiceNames.User, 'groups'), { params }).pipe(operators_1.map((response) => response.content.map(g => new models_1.Group().deserialize(g))));
    }
    get(groupId) {
        return this.http.get(helpers_1.buildServiceRequest(enums_1.ServiceNames.User, `groups/${groupId}`)).pipe(operators_1.map(response => new models_1.Group().deserialize(response)));
    }
    create(group) {
        return this.http.post(helpers_1.buildServiceRequest(enums_1.ServiceNames.User, 'groups'), group).pipe(operators_1.map(response => new models_1.Group().deserialize(response)));
    }
    update(group) {
        return this.http.put(helpers_1.buildServiceRequest(enums_1.ServiceNames.User, `groups/${group.id}`), group.serialize()).pipe(operators_1.map(response => new models_1.Group().deserialize(response)));
    }
    delete(groupId) {
        return this.http.delete(helpers_1.buildServiceRequest(enums_1.ServiceNames.User, `groups/${groupId}`)).pipe(operators_1.map(response => response));
    }
    addUserToGroup(groupId, userId) {
        return this.http.post(helpers_1.buildServiceRequest(enums_1.ServiceNames.User, `groups/${groupId}/users`), { userId }).pipe(operators_1.map(response => new models_1.Group().deserialize(response)));
    }
    removeUserFromGroup(groupId, userId) {
        return this.http.delete(helpers_1.buildServiceRequest(enums_1.ServiceNames.User, `groups/${groupId}/users/${userId}`)).pipe(operators_1.map(response => new models_1.Group().deserialize(response)));
    }
    hasNextLink(pagination) {
        return pagination.links.filter(link => link.rel === 'next').length > 0;
    }
};
GroupService = __decorate([
    core_1.Injectable()
], GroupService);
exports.GroupService = GroupService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JvdXAuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL2NvbmNvdXJzZS9qYXZhc2NyaXB0L2NvbmNvdXJzZS1hcHAvc3JjL2FwcC9zdG9yZS9ncm91cC9zZXJ2aWNlcy9ncm91cC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUEsK0NBQThEO0FBQzlELHdDQUEyQztBQUczQyw4Q0FBcUM7QUFFckMsbURBQXVGO0FBQ3ZGLG1EQUF1RDtBQUN2RCx1REFBZ0U7QUFHaEUsSUFBYSxZQUFZLEdBQXpCLE1BQWEsWUFBWTtJQUN2QixZQUNtQixJQUFnQjtRQUFoQixTQUFJLEdBQUosSUFBSSxDQUFZO0lBQy9CLENBQUM7SUFFTCxJQUFJO1FBQ0YsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyw2QkFBbUIsQ0FBQyxvQkFBWSxDQUFDLElBQUksRUFBRSxRQUFRLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FDekUsZUFBRyxDQUFDLENBQUMsUUFBa0MsRUFBRSxFQUFFLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxJQUFJLGNBQUssRUFBRSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQ25HLENBQUM7SUFDSixDQUFDO0lBRUQsYUFBYSxDQUFDLElBQUksR0FBRyxLQUFLLEVBQUUsSUFBSSxHQUFHLEdBQUcsRUFBRSxJQUFJLEdBQUcsU0FBUztRQUV0RCxNQUFNLE1BQU0sR0FBZSxJQUFJLGlCQUFVLEVBQUU7YUFDeEMsR0FBRyxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUM7YUFDakIsR0FBRyxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUM7YUFDakIsR0FBRyxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FBQztRQUVyQixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxD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