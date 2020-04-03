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
const AZtypes = {
    accounts: 'accounts',
    subscriptions: 'subscriptions',
    resourceGroups: 'resource-groups',
    resourceTypes: 'resource-types',
    resourceTags: 'resource-tags'
};
let InstitutionDataService = class InstitutionDataService {
    constructor(http) {
        this.http = http;
        this.urlConstructor = (params) => {
            switch (params.dataDomain) {
                case 'INSTITUTION':
                    return 'data';
                case 'SURFACE':
                    return `surfaces/${params.surfaceId}/data`;
                case 'SURFACE_LAYER':
                    return `surface-layers/${params.surfaceLayerId}/data`;
                default:
                    console.error('%s not supported', params.dataDomain, params);
                    break;
            }
        };
    }
    list(params) {
        return this.http.get(helpers_1.buildServiceRequest(enums_1.ServiceNames.Institution, `${this.urlConstructor(params)}`)).pipe(operators_1.map((response) => response.content.map(item => new models_1.InstitutionData().deserialize(Object.assign(Object.assign({}, item), { dataDomain: params.dataDomain })))));
    }
    get(params, uri) {
        return this.http.get(helpers_1.buildServiceRequest(enums_1.ServiceNames.Institution, `${this.urlConstructor(params)}/${uri}`)).pipe(operators_1.map(response => new models_1.InstitutionData().deserialize(Object.assign(Object.assign({}, response), { dataDomain: params.dataDomain }))));
    }
    getAccountsBySurfaceLayer(params) {
        return this.http.get(helpers_1.buildServiceRequest(enums_1.ServiceNames.Institution, `${this.urlConstructor(params)}/aws-accounts`), {
            params: new http_1.HttpParams().set('resolved', 'true')
        }).pipe(operators_1.map((response) => new models_1.InstitutionData().deserialize(Object.assign(Object.assign({}, response), { dataDomain: params.dataDomain }))));
    }
    create(params, data) {
        return this.http.post(helpers_1.buildServiceRequest(enums_1.ServiceNames.Institution, `${this.urlConstructor(params)}`), data.serialize()).pipe(operators_1.map(response => new models_1.InstitutionData().deserialize(Object.assign(Object.assign({}, response), { dataDomain: params.dataDomain }))));
    }
    update(params, data) {
        return this.http.put(helpers_1.buildServiceRequest(enums_1.ServiceNames.Institution, `${this.urlConstructor(params)}/${data.uri}`), data.serialize()).pipe(operators_1.map(response => new models_1.InstitutionData().deserialize(Object.assign(Object.assign({}, response), { dataDomain: params.dataDomain }))));
    }
    delete(params, uri) {
        return this.http.delete(helpers_1.buildServiceRequest(enums_1.ServiceNames.Institution, `${this.urlConstructor(params)}/${uri}`)).pipe(operators_1.map(response => response));
    }
    getAWSAccounts(params, uri) {
        return this.http.get(helpers_1.buildServiceRequest(enums_1.ServiceNames.Institution, `${this.urlConstructor(params)}/${uri}`)).pipe(operators_1.map(response => response));
    }
    getAzureData(type) {
        return this.http.get(helpers_1.buildServiceRequest(enums_1.ServiceNames.Institution, 'cloud-catalogs/azure'), { params: { type: AZtypes[type] } }).pipe(operators_1.map(response => response));
    }
    getAzureSubscriptions() {
        return this.http.get(helpers_1.buildServiceRequest(enums_1.ServiceNames.Institution, '/data/azure-subscriptions')).pipe(operators_1.map(response => response));
    }
};
InstitutionDataService = __decorate([
    core_1.Injectable()
], InstitutionDataService);
exports.InstitutionDataService = InstitutionDataService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5zdGl0dXRpb24tZGF0YS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vY29uY291cnNlL2phdmFzY3JpcHQvY29uY291cnNlLWFwcC9zcmMvYXBwL3N0b3JlL2luc3RpdHV0aW9uLWRhdGEvc2VydmljZXMvaW5zdGl0dXRpb24tZGF0YS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUEsK0NBQThEO0FBQzlELHdDQUEyQztBQUczQyw4Q0FBcUM7QUFFckMsbURBQTJGO0FBQzNGLG1EQUF1RDtBQUN2RCx1REFBZ0U7QUFHaEUsTUFBTSxPQUFPLEdBQUc7SUFDZCxRQUFRLEVBQUUsVUFBVTtJQUNwQixhQUFhLEVBQUUsZUFBZTtJQUM5QixjQUFjLEVBQUUsaUJBQWlCO0lBQ2pDLGFBQWEsRUFBRSxnQkFBZ0I7SUFDL0IsWUFBWSxFQUFFLGVBQWU7Q0FDOUIsQ0FBQztBQUVGLElBQWEsc0JBQXNCLEdBQW5DLE1BQWEsc0JBQXNCO0lBRWpDLFlBQTZCLElBQWdCO1FBQWhCLFNBQUksR0FBSixJQUFJLENBQVk7UUFFN0MsbUJBQWMsR0FBRyxDQUFDLE1BQTZCLEVBQVUsRUFBRTtZQUN6RCxRQUFRLE1BQU0sQ0FBQyxVQUFVLEVBQUU7Z0JBQ3pCLEtBQUssYUFBYTtvQkFDaEIsT0FBTyxNQUFNLENBQUM7Z0JBRWhCLEtBQUssU0FBUztvQkFDWixPQUFPLFlBQVksTUFBTSxDQUFDLFNBQVMsT0FBTyxDQUFDO2dCQUU3QyxLQUFLLGVBQWU7b0JBQ2xCLE9BQU8sa0JBQWtCLE1BQU0sQ0FBQyxjQUFjLE9BQU8sQ0FBQztnQkFFeEQ7b0JBQ0UsT0FBTyxDQUFDLEtBQUssQ0FBQyxrQkFBa0IsRUFBRSxNQUFNLENBQUMsVUFBVSxFQUFFLE1BQU0sQ0FBQyxDQUFDO29CQUM3RCxNQUFNO2FBQ1Q7UUFDSCxDQUFDLENBQUM7SUFqQitDLENBQUM7SUFtQmxELElBQUks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