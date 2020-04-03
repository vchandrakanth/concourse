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
let BaselineAssetService = class BaselineAssetService {
    constructor(http) {
        this.http = http;
    }
    list() {
        return this.http.get(helpers_1.buildServiceRequest(enums_1.ServiceNames.Model, 'baselines')).pipe(operators_1.map((response) => response.content.map(i => new models_1.BaselineAsset().deserialize(i))));
    }
    paginatedList(size = '200', page = '0', sort = 'id,DESC') {
        const params = new http_1.HttpParams()
            .set('size', size)
            .set('page', page)
            .set('sort', sort);
        return this.http.get(helpers_1.buildServiceRequest(enums_1.ServiceNames.Model, 'baselines'), { params }).pipe(operators_1.map((response) => ({
            baselineAssets: response.content.map(item => (new models_1.BaselineAsset().deserialize(item))),
            hasNextLink: this.hasNextLink(response)
        })));
    }
    get(id) {
        return this.http.get(helpers_1.buildServiceRequest(enums_1.ServiceNames.Model, `baselines/${id}`)).pipe(operators_1.map(response => new models_1.BaselineAsset().deserialize(response)));
    }
    getOverview(id) {
        return this.http.get(helpers_1.buildServiceRequest(enums_1.ServiceNames.Model, `baselines/${id}/overview`)).pipe(operators_1.map((response) => new models_1.BaselineOverview().deserialize(response)));
    }
    getContent(id) {
        return this.http.get(helpers_1.buildServiceRequest(enums_1.ServiceNames.Model, `baselines/${id}/content`)).pipe(operators_1.map((response) => response.contents.map(i => new models_1.BaselineAssetContent().deserialize(i))));
    }
    getStats(id) {
        return this.http.get(helpers_1.buildServiceRequest(enums_1.ServiceNames.Model, `baselines/${id}/stats`)).pipe(operators_1.map((response) => response.map(i => new models_1.BaselineAssetStats().deserialize(i))));
    }
    create(baseline, versionBump) {
        let params = new http_1.HttpParams();
        if (versionBump) {
            params = params.set('increment', versionBump);
        }
        return this.http.post(helpers_1.buildServiceRequest(enums_1.ServiceNames.Model, 'baselines'), Object.assign({}, baseline), { params }).pipe(operators_1.map(response => new models_1.BaselineAsset().deserialize(response)));
    }
    update(data) {
        let params = new http_1.HttpParams();
        if (data.versionBump) {
            params = params.set('increment', data.versionBump);
        }
        const baselineDeserialized = new models_1.BaselineAsset().deserialize(data.baseline);
        const serializedBaseline = baselineDeserialized.serialize();
        return this.http.put(helpers_1.buildServiceRequest(enums_1.ServiceNames.Model, `baselines/${data.id}`), Object.assign({}, serializedBaseline), { params }).pipe(operators_1.map(response => new models_1.BaselineAsset().deserialize(response)));
    }
    delete(id) {
        return this.http.delete(helpers_1.buildServiceRequest(enums_1.ServiceNames.Model, `baselines/${id}`)).pipe(operators_1.map(response => new models_1.BaselineAsset().deserialize(response)));
    }
    hasNextLink(pagination) {
        return pagination.links.filter(link => link.rel === 'next').length > 0;
    }
    updateAWS(id, params) {
        const baselineDeserialized = new models_1.BaselineAsset().deserialize(params);
        const baselineSerialized = baselineDeserialized.serialize();
        return this.http.put(helpers_1.buildServiceRequest(enums_1.ServiceNames.Model, `baselines/${id}`), baselineSerialized).pipe(operators_1.map(response => new models_1.BaselineAsset().deserialize(response)));
    }
    updateAzure(id, params) {
        const baselineDeserialized = new models_1.BaselineAsset().deserialize(params);
        const baselineSerialized = baselineDeserialized.serialize();
        return this.http.put(helpers_1.buildServiceRequest(enums_1.ServiceNames.Model, `baselines/${id}`), baselineSerialized).pipe(operators_1.map(response => new models_1.BaselineAsset().deserialize(response)));
    }
    getAwsResourceGroups() {
        return this.http.get(helpers_1.buildServiceRequest(enums_1.ServiceNames.Institution, 'cloud-catalogs/aws?type=resource-groups')).pipe(operators_1.map(response => response));
    }
    getAwsResourceTags() {
        return this.http.get(helpers_1.buildServiceRequest(enums_1.ServiceNames.Institution, 'cloud-catalogs/aws?type=resource-tags')).pipe(operators_1.map(response => response));
    }
    getAwsStackNames() {
        return this.http.get(helpers_1.buildServiceRequest(enums_1.ServiceNames.Institution, 'cloud-catalogs/aws?type=stack-names')).pipe(operators_1.map(response => response));
    }
    getAwsAccounts() {
        return this.http.get(helpers_1.buildServiceRequest(enums_1.ServiceNames.Institution, '/config/aws-accounts')).pipe(operators_1.map(response => response['content']));
    }
    getAzureAccounts() {
        return this.http.get(helpers_1.buildServiceRequest(enums_1.ServiceNames.Institution, 'cloud-catalogs/azure?type=accounts')).pipe(operators_1.map(response => response));
    }
    getAzureTemplateHashes() {
        return this.http.get(helpers_1.buildServiceRequest(enums_1.ServiceNames.Institution, 'cloud-catalogs/azure?type=template-hashes')).pipe(operators_1.map(response => response));
    }
    getAzureResourceGroups() {
        return this.http.get(helpers_1.buildServiceRequest(enums_1.ServiceNames.Institution, 'cloud-catalogs/azure?type=resource-groups')).pipe(operators_1.map(response => response));
    }
    getAzureResourceTags() {
        return this.http.get(helpers_1.buildServiceRequest(enums_1.ServiceNames.Institution, 'cloud-catalogs/azure?type=resource-tags')).pipe(operators_1.map(response => response));
    }
    getAzureResourceTypes() {
        return this.http.get(helpers_1.buildServiceRequest(enums_1.ServiceNames.Institution, 'cloud-catalogs/azure?type=resource-types')).pipe(operators_1.map(response => response));
    }
    getAzureSubscriptions() {
        return this.http.get(helpers_1.buildServiceRequest(enums_1.ServiceNames.Institution, 'cloud-catalogs/azure?type=subscriptions')).pipe(operators_1.map(response => response));
    }
};
BaselineAssetService = __decorate([
    core_1.Injectable()
], BaselineAssetService);
exports.BaselineAssetService = BaselineAssetService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzZWxpbmUtYXNzZXQuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL2NvbmNvdXJzZS9qYXZhc2NyaXB0L2NvbmNvdXJzZS1hcHAvc3JjL2FwcC9zdG9yZS9iYXNlbGluZS1hc3NldC9zZXJ2aWNlcy9iYXNlbGluZS1hc3NldC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUEsK0NBQThEO0FBQzlELHdDQUEyQztBQUczQyw4Q0FBcUM7QUFFckMsbURBRWdDO0FBQ2hDLG1EQUF1RDtBQUN2RCx1REFBZ0U7QUFHaEUsSUFBYSxvQkFBb0IsR0FBakMsTUFBYSxvQkFBb0I7SUFDL0IsWUFDbUIsSUFBZ0I7UUFBaEIsU0FBSSxHQUFKLElBQUksQ0FBWTtJQUMvQixDQUFDO0lBRUwsSUFBSTtRQUNGLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsNkJBQW1CLENBQUMsb0JBQVksQ0FBQyxLQUFLLEVBQUUsV0FBVyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQzdFLGVBQUcsQ0FBQyxDQUFDLFFBQTBDLEVBQUUsRUFBRSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsSUFBSSxzQkFBYSxFQUFFLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FDbkgsQ0FBQztJQUNKLENBQUM7SUFFRCxhQUFhLENBQUMsSUFBSSxHQUFHLEtBQUssRUFBRSxJQUFJLEdBQUcsR0FBRyxFQUFFLElBQUksR0FBRyxTQUFTO1FBRXRELE1BQU0sTUFBTSxHQUFlLElBQUksaUJBQVUsRUFBRTthQUN4QyxHQUFHLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQzthQUNqQixHQUFHLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQzthQUNqQixHQUFHLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBRXJC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