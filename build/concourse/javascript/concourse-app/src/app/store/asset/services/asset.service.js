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
let AssetService = class AssetService {
    constructor(http) {
        this.http = http;
    }
    applicationList() {
        return this.http.get(helpers_1.buildServiceRequest(enums_1.ServiceNames.Model, 'application-models')).pipe(operators_1.map((response) => response.content.map(item => (new models_1.Application().deserialize(item)))));
    }
    enclaveList(payload) {
        let params = new http_1.HttpParams()
            .set('includeTemplates', `${payload.includeTemplates}`);
        if (payload.lineageId) {
            params = params.set('lineageId', `${payload.lineageId}`);
        }
        return this.http.get(helpers_1.buildServiceRequest(enums_1.ServiceNames.Model, 'enclave-models'), { params }).pipe(operators_1.map((response) => response.content.map(item => (new models_1.Enclave().deserialize(item)))));
    }
    paginatedList(size = '200', page = '0', sort = 'id,DESC') {
        const params = new http_1.HttpParams()
            .set('includeTemplates', 'false')
            .set('size', size)
            .set('page', page)
            .set('sort', sort);
        return this.http.get(helpers_1.buildServiceRequest(enums_1.ServiceNames.Model, 'enclave-models'), { params }).pipe(operators_1.map((response) => ({
            assets: response.content.map(item => (new models_1.Enclave().deserialize(item))),
            hasNextLink: this.hasNextLink(response)
        })));
    }
    hasNextLink(pagination) {
        return pagination.links.filter(link => link.rel === 'next').length > 0;
    }
    // getEnclavesPaginated(size = '20', page = '1', sort = 'id,DESC'): Observable<Enclave[]> {
    //   const params: HttpParams = new HttpParams()
    //     .set('includeTemplates', 'false')
    //     .set('size', size)
    //     .set('page', page)
    //     .set('sort', sort);
    //   return this.http.get(buildServiceRequest(ServiceNames.Model, ''), { params }).pipe(
    //     map((response: PaginatedResponse<Enclave>) => response.content.map(item => (
    //       new Enclave().deserialize(item)
    //     )))
    //   );
    // }enclave-models
    getApplication(applicationId) {
        return this.http.get(helpers_1.buildServiceRequest(enums_1.ServiceNames.Model, `application-models/${applicationId}`)).pipe(operators_1.map(response => new models_1.Application().deserialize(response)));
    }
    getEnclave(enclaveId) {
        return this.http.get(helpers_1.buildServiceRequest(enums_1.ServiceNames.Model, `enclave-models/${enclaveId}`)).pipe(operators_1.map(response => new models_1.Enclave().deserialize(response)));
    }
    createEnclaveModel(enclave, versionBump) {
        let params = new http_1.HttpParams();
        if (versionBump) {
            params = params.set('increment', versionBump);
        }
        return this.http.post(helpers_1.buildServiceRequest(enums_1.ServiceNames.Model, 'enclave-models/'), enclave, { params }).pipe(operators_1.map(response => new models_1.Enclave().deserialize(response)));
    }
    resolveCFTResource(enclave) {
        return this.http.post(helpers_1.buildServiceRequest(enums_1.ServiceNames.Model, 'enclave-models/resolve'), enclave).pipe(operators_1.map(response => response), operators_1.map(response => response.resolvedResourceToUrls));
    }
    updateEnclaveModel(enclave, versionBump) {
        let params = new http_1.HttpParams();
        if (versionBump) {
            params = params.set('increment', versionBump);
        }
        return this.http.put(helpers_1.buildServiceRequest(enums_1.ServiceNames.Model, `enclave-models/${enclave.id}`), enclave.serialize(), { params }).pipe(operators_1.map(response => new models_1.Enclave().deserialize(response)));
    }
    deleteEnclaveModel(enclaveModelId) {
        return this.http.delete(helpers_1.buildServiceRequest(enums_1.ServiceNames.Model, `enclave-models/${enclaveModelId}`)).pipe(operators_1.map(response => response));
    }
    getBaselineAssets() {
        return this.http.get(helpers_1.buildServiceRequest(enums_1.ServiceNames.Model, 'baselines')).pipe(operators_1.map(response => response));
    }
};
AssetService = __decorate([
    core_1.Injectable()
], AssetService);
exports.AssetService = AssetService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXNzZXQuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL2NvbmNvdXJzZS9qYXZhc2NyaXB0L2NvbmNvdXJzZS1hcHAvc3JjL2FwcC9zdG9yZS9hc3NldC9zZXJ2aWNlcy9hc3NldC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUEsK0NBQThEO0FBQzlELHdDQUEyQztBQUczQyw4Q0FBcUM7QUFFckMsbURBS2dDO0FBQ2hDLG1EQUF1RDtBQUN2RCx1REFBZ0U7QUFHaEUsSUFBYSxZQUFZLEdBQXpCLE1BQWEsWUFBWTtJQUN2QixZQUNtQixJQUFnQjtRQUFoQixTQUFJLEdBQUosSUFBSSxDQUFZO0lBQy9CLENBQUM7SUFFTCxlQUFlO1FBQ2IsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyw2QkFBbUIsQ0FBQyxvQkFBWSxDQUFDLEtBQUssRUFBRSxvQkFBb0IsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUN0RixlQUFHLENBQUMsQ0FBQyxRQUF3QyxFQUFFLEVBQUUsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQzdFLElBQUksb0JBQVcsRUFBRSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FDcEMsQ0FBQyxDQUFDLENBQ0osQ0FBQztJQUNKLENBQUM7SUFFRCxXQUFXLENBQUMsT0FBMEQ7UUFDcEUsSUFBSSxNQUFNLEdBQUcsSUFBSSxpQkFBVSxFQUFFO2FBQzFCLEdBQUcsQ0FBQyxrQkFBa0IsRUFBRSxHQUFHLE9BQU8sQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDLENBQUM7UUFDMUQsSUFBSSxPQUFPLENBQUMsU0FBUyxFQUFFO1lBQ3JCLE1BQU0sR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDLFdBQVcsRUFBRSxHQUFHLE9BQU8sQ0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFDO1NBQzFEO1FB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