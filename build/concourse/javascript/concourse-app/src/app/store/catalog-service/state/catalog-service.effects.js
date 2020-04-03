"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const effects_1 = require("@ngrx/effects");
const operators_1 = require("@concourse/core/operators");
const operators_2 = require("rxjs/operators");
const catalog_service_actions_1 = require("./catalog-service.actions");
let CatalogServiceEffects = class CatalogServiceEffects {
    constructor(actions$, catalogServiceApi) {
        this.actions$ = actions$;
        this.catalogServiceApi = catalogServiceApi;
        this.loadAWSRegions$ = this.actions$.pipe(effects_1.ofType(catalog_service_actions_1.CatalogServiceActionTypes.LoadAWSRegions), operators_2.switchMap(_ => this.catalogServiceApi.awsRegions().pipe(operators_2.retry(2), operators_2.map(regions => new catalog_service_actions_1.LoadAWSRegionsFromCatalogSuccess(regions)), operators_1.handleError('toast', new catalog_service_actions_1.LoadCatalogServiceDataFailure()))));
        this.loadAzureRegions$ = this.actions$.pipe(effects_1.ofType(catalog_service_actions_1.CatalogServiceActionTypes.LoadAzureRegions), operators_2.switchMap(_ => this.catalogServiceApi.azureRegions().pipe(operators_2.retry(2), operators_2.map(regions => new catalog_service_actions_1.LoadAzureRegionsFromCatalogSuccess(regions)), operators_1.handleError('toast', new catalog_service_actions_1.LoadCatalogServiceDataFailure()))));
        this.loadAwsProducts$ = this.actions$.pipe(effects_1.ofType(catalog_service_actions_1.CatalogServiceActionTypes.LoadAwsProducts), operators_2.switchMap(_ => this.catalogServiceApi.awsProducts().pipe(operators_2.retry(2), operators_2.map(data => new catalog_service_actions_1.LoadAwsProductsFromCatalogSuccess(data)), operators_1.handleError('toast', new catalog_service_actions_1.LoadCatalogServiceDataFailure()))));
        this.loadNetworkProtocols$ = this.actions$.pipe(effects_1.ofType(catalog_service_actions_1.CatalogServiceActionTypes.LoadNetworkProtocols), operators_2.switchMap(_ => this.catalogServiceApi.networkProtocols().pipe(operators_2.retry(2), operators_2.map(data => new catalog_service_actions_1.LoadNetworkProtocolsSuccess(data)), operators_1.handleError('toast', new catalog_service_actions_1.LoadCatalogServiceDataFailure()))));
        this.loadInstitutionDatas$ = this.actions$.pipe(effects_1.ofType(catalog_service_actions_1.CatalogServiceActionTypes.LoadInstitutionDatas), operators_2.switchMap(_ => this.catalogServiceApi.institutionDatas().pipe(operators_2.retry(2), operators_2.map(data => new catalog_service_actions_1.LoadInstitutionDatasSuccess(data)), operators_1.handleError('toast', new catalog_service_actions_1.LoadCatalogServiceDataFailure()))));
        this.loadAWSActions$ = this.actions$.pipe(effects_1.ofType(catalog_service_actions_1.CatalogServiceActionTypes.LoadAWSActions), operators_2.switchMap(_ => this.catalogServiceApi.awsActions().pipe(operators_2.retry(2), operators_2.map(data => new catalog_service_actions_1.LoadAWSActionsSuccess(data)), operators_1.handleError('toast', new catalog_service_actions_1.LoadCatalogServiceDataFailure()))));
        this.loadAzureActions$ = this.actions$.pipe(effects_1.ofType(catalog_service_actions_1.CatalogServiceActionTypes.LoadAzureActions), operators_2.switchMap(_ => this.catalogServiceApi.azureActions().pipe(operators_2.retry(2), operators_2.map(data => new catalog_service_actions_1.LoadAzureActionsSuccess(data)), operators_1.handleError('toast', new catalog_service_actions_1.LoadCatalogServiceDataFailure()))));
        this.loadAWSResources$ = this.actions$.pipe(effects_1.ofType(catalog_service_actions_1.CatalogServiceActionTypes.LoadAWSResources), operators_2.switchMap(_ => this.catalogServiceApi.awsResources().pipe(operators_2.retry(2), operators_2.map(data => new catalog_service_actions_1.LoadAWSResourcesSuccess(data)), operators_1.handleError('toast', new catalog_service_actions_1.LoadCatalogServiceDataFailure()))));
        this.loadAzureResources$ = this.actions$.pipe(effects_1.ofType(catalog_service_actions_1.CatalogServiceActionTypes.LoadAzureResources), operators_2.switchMap(_ => this.catalogServiceApi.azureResources().pipe(operators_2.retry(2), operators_2.map(data => new catalog_service_actions_1.LoadAzureResourcesSuccess(data)), operators_1.handleError('toast', new catalog_service_actions_1.LoadCatalogServiceDataFailure()))));
        this.loadAzureSpecifications$ = this.actions$.pipe(effects_1.ofType(catalog_service_actions_1.CatalogServiceActionTypes.LoadAzureSpecifications), operators_2.switchMap(_ => this.catalogServiceApi.azureSpecifications().pipe(operators_2.retry(2), operators_2.map(data => new catalog_service_actions_1.LoadAzureSpecificationsSuccess(data)), operators_1.handleError('toast', new catalog_service_actions_1.LoadCatalogServiceDataFailure()))));
    }
};
__decorate([
    effects_1.Effect()
], CatalogServiceEffects.prototype, "loadAWSRegions$", void 0);
__decorate([
    effects_1.Effect()
], CatalogServiceEffects.prototype, "loadAzureRegions$", void 0);
__decorate([
    effects_1.Effect()
], CatalogServiceEffects.prototype, "loadAwsProducts$", void 0);
__decorate([
    effects_1.Effect()
], CatalogServiceEffects.prototype, "loadNetworkProtocols$", void 0);
__decorate([
    effects_1.Effect()
], CatalogServiceEffects.prototype, "loadInstitutionDatas$", void 0);
__decorate([
    effects_1.Effect()
], CatalogServiceEffects.prototype, "loadAWSActions$", void 0);
__decorate([
    effects_1.Effect()
], CatalogServiceEffects.prototype, "loadAzureActions$", void 0);
__decorate([
    effects_1.Effect()
], CatalogServiceEffects.prototype, "loadAWSResources$", void 0);
__decorate([
    effects_1.Effect()
], CatalogServiceEffects.prototype, "loadAzureResources$", void 0);
__decorate([
    effects_1.Effect()
], CatalogServiceEffects.prototype, "loadAzureSpecifications$", void 0);
CatalogServiceEffects = __decorate([
    core_1.Injectable()
], CatalogServiceEffects);
exports.CatalogServiceEffects = CatalogServiceEffects;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2F0YWxvZy1zZXJ2aWNlLmVmZmVjdHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9jb25jb3Vyc2UvamF2YXNjcmlwdC9jb25jb3Vyc2UtYXBwL3NyYy9hcHAvc3RvcmUvY2F0YWxvZy1zZXJ2aWNlL3N0YXRlL2NhdGFsb2ctc2VydmljZS5lZmZlY3RzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUEsd0NBQTJDO0FBQzNDLDJDQUF3RDtBQUd4RCx5REFBd0Q7QUFFeEQsOENBQXVEO0FBR3ZELHVFQWVtQztBQUduQyxJQUFhLHFCQUFxQixHQUFsQyxNQUFhLHFCQUFxQjtJQThHaEMsWUFDbUIsUUFBaUIsRUFDakIsaUJBQWlDO1FBRGpDLGFBQVEsR0FBUixRQUFRLENBQVM7UUFDakIsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFnQjtRQS9HMUMsb0JBQWUsR0FBdUIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQ2hFLGdCQUFNLENBQUMsbURBQXlCLENBQUMsY0FBYyxDQUFDLEVBQ2hELHFCQUFTLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FDWixJQUFJLENBQUMsaUJBQWlCLENBQUMsVUFBVSxFQUFFLENBQUMsSUFBSSxDQUN0QyxpQkFBSyxDQUFDLENBQUMsQ0FBQyxFQUNSLGVBQUcsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLElBQUksMERBQWdDLENBQUMsT0FBTyxDQUFDLENBQUMsRUFDN0QsdUJBQVcsQ0FBQyxPQUFPLEVBQUUsSUFBSSx1REFBNkIsRUFBRSxDQUFDLENBQzFELENBQ0YsQ0FDRixDQUFDO1FBQ1Esc0JBQWlCLEdBQXVCLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUNsRSxnQkFBTSxDQUFDLG1EQUF5QixDQUFDLGdCQUFnQixDQUFDLEVBQ2xELHFCQUFTLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FDWixJQUFJLENBQUMsaUJBQWlCLENBQUMsWUFBWSxF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