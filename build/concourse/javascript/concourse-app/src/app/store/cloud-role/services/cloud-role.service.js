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
let CloudRoleService = class CloudRoleService {
    constructor(http) {
        this.http = http;
    }
    list() {
        return this.http.get(helpers_1.buildServiceRequest(enums_1.ServiceNames.Institution, 'cloud-roles')).pipe(operators_1.map((response) => response.content.map(r => new models_1.CloudRole().deserialize(r))));
    }
    paginatedList(size = '200', page = '0', sort = 'id,DESC') {
        const params = new http_1.HttpParams()
            .set('size', size)
            .set('page', page)
            .set('sort', sort);
        return this.http.get(helpers_1.buildServiceRequest(enums_1.ServiceNames.Institution, 'cloud-roles'), { params }).pipe(operators_1.map((response) => ({
            cloudRoles: response.content.map(item => (new models_1.CloudRole().deserialize(item))),
            hasNextLink: this.hasNextLink(response)
        })));
    }
    detail(id) {
        return this.http.get(helpers_1.buildServiceRequest(enums_1.ServiceNames.Institution, `cloud-roles/${id}`)).pipe(operators_1.map(response => new models_1.CloudRole().deserialize(response)));
    }
    create(cloudRole, versionBump) {
        let params = new http_1.HttpParams();
        if (versionBump) {
            params = params.set('increment', versionBump);
        }
        return this.http.post(helpers_1.buildServiceRequest(enums_1.ServiceNames.Institution, 'cloud-roles'), cloudRole, { params }).pipe(operators_1.map(response => new models_1.CloudRole().deserialize(response)));
    }
    delete(id) {
        return this.http.delete(helpers_1.buildServiceRequest(enums_1.ServiceNames.Institution, `cloud-roles/${id}`)).pipe(operators_1.map(response => response));
    }
    update(cloudRole, versionBump) {
        let params = new http_1.HttpParams();
        if (versionBump) {
            params = params.set('increment', versionBump);
        }
        return this.http.put(helpers_1.buildServiceRequest(enums_1.ServiceNames.Institution, `cloud-roles/${cloudRole.id}`), cloudRole.serialize(), { params }).pipe(operators_1.map(response => new models_1.CloudRole().deserialize(response)));
    }
    updateAwsActions(awsOperations, id) {
        return this.http.put(helpers_1.buildServiceRequest(enums_1.ServiceNames.Institution, `cloud-roles/${id}/aws-actions`), awsOperations.map(o => o.serialize())).pipe(operators_1.map(response => new models_1.CloudRole().deserialize(response)));
    }
    updateAwsNonActions(awsOperations, id) {
        return this.http.put(helpers_1.buildServiceRequest(enums_1.ServiceNames.Institution, `cloud-roles/${id}/aws-non-actions`), awsOperations.map(o => o.serialize())).pipe(operators_1.map(response => new models_1.CloudRole().deserialize(response)));
    }
    updateAzureActions(azureOperations, id) {
        return this.http.put(helpers_1.buildServiceRequest(enums_1.ServiceNames.Institution, `cloud-roles/${id}/azure-actions`), azureOperations.map(o => o.serialize())).pipe(operators_1.map(response => new models_1.CloudRole().deserialize(response)));
    }
    updateAzureNonActions(azureOperations, id) {
        return this.http.put(helpers_1.buildServiceRequest(enums_1.ServiceNames.Institution, `cloud-roles/${id}/azure-non-actions`), azureOperations.map(o => o.serialize())).pipe(operators_1.map(response => new models_1.CloudRole().deserialize(response)));
    }
    syncCloudRoles(provider) {
        let params = new http_1.HttpParams();
        if (provider) {
            params = params.set('provider', provider);
        }
        return this.http.post(helpers_1.buildServiceRequest(enums_1.ServiceNames.Institution, 'cloud-roles/sync'), {}, { params }).pipe(operators_1.map(response => response));
    }
    hasNextLink(pagination) {
        return pagination.links.filter(link => link.rel === 'next').length > 0;
    }
};
CloudRoleService = __decorate([
    core_1.Injectable()
], CloudRoleService);
exports.CloudRoleService = CloudRoleService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xvdWQtcm9sZS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vY29uY291cnNlL2phdmFzY3JpcHQvY29uY291cnNlLWFwcC9zcmMvYXBwL3N0b3JlL2Nsb3VkLXJvbGUvc2VydmljZXMvY2xvdWQtcm9sZS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUEsK0NBQThEO0FBQzlELHdDQUEyQztBQUczQyw4Q0FBcUM7QUFFckMsbURBQW9HO0FBQ3BHLG1EQUF1RDtBQUN2RCx1REFBZ0U7QUFHaEUsSUFBYSxnQkFBZ0IsR0FBN0IsTUFBYSxnQkFBZ0I7SUFFM0IsWUFDbUIsSUFBZ0I7UUFBaEIsU0FBSSxHQUFKLElBQUksQ0FBWTtJQUMvQixDQUFDO0lBRUwsSUFBSTtRQUNGLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsNkJBQW1CLENBQUMsb0JBQVksQ0FBQyxXQUFXLEVBQUUsYUFBYSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQ3JGLGVBQUcsQ0FBQyxDQUFDLFFBQXNDLEVBQUUsRUFBRSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsSUFBSSxrQkFBUyxFQUFFLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FDM0csQ0FBQztJQUNKLENBQUM7SUFFRCxhQUFhLENBQUMsSUFBSSxHQUFHLEtBQUssRUFBRSxJQUFJLEdBQUcsR0FBRyxFQUFFLElBQUksR0FBRyxTQUFTO1FBRXRELE1BQU0sTUFBTSxHQUFlLElBQUksaUJBQVUsRUFBRTthQUN4QyxHQUFHLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQzthQUNqQixHQUFHLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQzthQUNqQixHQUFHLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBRXJCLE9BQU8sSUFBSSxD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