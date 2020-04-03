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
let CatalogService = class CatalogService {
    constructor(http) {
        this.http = http;
    }
    awsProducts() {
        return this.http.get(helpers_1.buildServiceRequest(enums_1.ServiceNames.Catalog, 'catalog/cloud-services/aws')).pipe(operators_1.map((response) => response.content.map(item => new models_1.AwsProduct().deserialize(item))));
    }
    awsRegions() {
        return this.http.get(helpers_1.buildServiceRequest(enums_1.ServiceNames.Catalog, 'catalog/aws-regions')).pipe(operators_1.map((response) => response.content.map(item => new models_1.AWSRegion().deserialize(item))));
    }
    azureRegions() {
        return this.http.get(helpers_1.buildServiceRequest(enums_1.ServiceNames.Catalog, 'catalog/azure-regions')).pipe(operators_1.map((response) => response.content.map(item => new models_1.AzureRegion().deserialize(item))));
    }
    networkProtocols() {
        return this.http.get(helpers_1.buildServiceRequest(enums_1.ServiceNames.Catalog, 'catalog/network-protocols')).pipe(operators_1.map((response) => response.content.map(item => new models_1.NetworkProtocol().deserialize(item))));
    }
    institutionDatas() {
        return this.http.get(helpers_1.buildServiceRequest(enums_1.ServiceNames.Catalog, 'catalog/institution-data')).pipe(operators_1.map((response) => response.content.map(item => new models_1.InstitutionDataCatalog().deserialize(item))));
    }
    awsActions() {
        return this.http.get(helpers_1.buildServiceRequest(enums_1.ServiceNames.Catalog, 'catalog/aws-product-actions')).pipe(operators_1.map((response) => response.map(item => new models_1.AWSAction().deserialize(item))));
    }
    azureActions() {
        return this.http.get(helpers_1.buildServiceRequest(enums_1.ServiceNames.Catalog, 'catalog/azure-product-actions')).pipe(operators_1.map((response) => response.map(item => new models_1.AzureAction().deserialize(item))));
    }
    awsResources() {
        return this.http.get(helpers_1.buildServiceRequest(enums_1.ServiceNames.Catalog, 'catalog/aws-specifications')).pipe(operators_1.map((response) => Object.entries(response).reduce((acc, [label, versions]) => [...acc, new models_1.AwsResourceProvider().deserialize({ label, versions })], [])));
    }
    azureResources() {
        return this.http.get(helpers_1.buildServiceRequest(enums_1.ServiceNames.Catalog, 'catalog/azure-resource-types')).pipe(operators_1.map((response) => response.map(r => new models_1.AzureResource().deserialize(r))));
    }
    azureSpecifications() {
        return this.http.get(helpers_1.buildServiceRequest(enums_1.ServiceNames.Catalog, 'catalog/azure-specifications')).pipe(operators_1.map((response) => response.map(r => new models_1.AzureResource().deserialize(r))));
    }
    awsCloudBaselineParams(paramType) {
        let params = new http_1.HttpParams();
        paramType ? params = params.set('type', `${paramType}`) : params = params;
        return this.http.get(helpers_1.buildServiceRequest(enums_1.ServiceNames.Catalog, 'catalog/cloud-catalogs/aws'), { params }).pipe(operators_1.map((response) => response.map(r => r)));
    }
};
__decorate([
    ngx_cacheable_1.Cacheable()
], CatalogService.prototype, "awsProducts", null);
__decorate([
    ngx_cacheable_1.Cacheable()
], CatalogService.prototype, "awsRegions", null);
__decorate([
    ngx_cacheable_1.Cacheable()
], CatalogService.prototype, "azureRegions", null);
__decorate([
    ngx_cacheable_1.Cacheable()
], CatalogService.prototype, "networkProtocols", null);
__decorate([
    ngx_cacheable_1.Cacheable()
], CatalogService.prototype, "institutionDatas", null);
__decorate([
    ngx_cacheable_1.Cacheable()
], CatalogService.prototype, "awsActions", null);
__decorate([
    ngx_cacheable_1.Cacheable()
], CatalogService.prototype, "azureActions", null);
__decorate([
    ngx_cacheable_1.Cacheable()
], CatalogService.prototype, "awsResources", null);
__decorate([
    ngx_cacheable_1.Cacheable()
], CatalogService.prototype, "azureResources", null);
__decorate([
    ngx_cacheable_1.Cacheable()
], CatalogService.prototype, "azureSpecifications", null);
__decorate([
    ngx_cacheable_1.Cacheable()
], CatalogService.prototype, "awsCloudBaselineParams", null);
CatalogService = __decorate([
    core_1.Injectable()
], CatalogService);
exports.CatalogService = CatalogService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2F0YWxvZy5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vY29uY291cnNlL2phdmFzY3JpcHQvY29uY291cnNlLWFwcC9zcmMvYXBwL3N0b3JlL2NhdGFsb2ctc2VydmljZS9zZXJ2aWNlcy9jYXRhbG9nLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQSwrQ0FBOEQ7QUFDOUQsd0NBQTJDO0FBQzNDLGlEQUEwQztBQUcxQyw4Q0FBcUM7QUFFckMsbURBV2dDO0FBQ2hDLG1EQUF1RDtBQUN2RCx1REFBZ0U7QUFJaEUsSUFBYSxjQUFjLEdBQTNCLE1BQWEsY0FBYztJQUN6QixZQUNtQixJQUFnQjtRQUFoQixTQUFJLEdBQUosSUFBSSxDQUFZO0lBQy9CLENBQUM7SUFFUSxXQUFXO1FBQ3RCLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsNkJBQW1CLENBQUMsb0JBQVksQ0FBQyxPQUFPLEVBQUUsNEJBQTRCLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FDaEcsZUFBRyxDQUFDLENBQUMsUUFBdUMsRUFBRSxFQUFFLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLG1CQUFVLEVBQUUsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUNuSCxDQUFDO0lBQ0osQ0FBQztJQUVZLFVBQVU7UUFDckIsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyw2QkFBbUIsQ0FBQyxvQkFBWSxDQUFDLE9BQU8sRUFBRSxxQkFBcUIsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUN6RixlQUFHLENBQUMsQ0FBQyxRQUFzQyxFQUFFLEVBQUUsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLElBQUksa0JBQVMsRUFBRSxDQUFDLFdB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