"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const store_1 = require("@ngrx/store");
const catalog_service_actions_1 = require("./catalog-service.actions");
const query = require("./catalog-service.selectors");
let CatalogServiceFacade = class CatalogServiceFacade {
    constructor(store) {
        this.store = store;
        this.isLoaded$ = this.store.pipe(store_1.select(query.getIsLoaded));
        this.awsRegionsList$ = this.store.pipe(store_1.select(query.getAllAwsRegions));
        this.azureRegionsList$ = this.store.pipe(store_1.select(query.getAllAzureRegions));
        this.awsProductsList$ = this.store.pipe(store_1.select(query.getAllAwsProducts));
        this.networkProtocolsList$ = this.store.pipe(store_1.select(query.getAllNetworkProtocols));
        this.institutionDatasList$ = this.store.pipe(store_1.select(query.getAllInstitutionDatas));
        this.awsActions$ = this.store.pipe(store_1.select(query.getAWSActions));
        this.azureActions$ = this.store.pipe(store_1.select(query.getAzureActions));
        this.awsCloudResources$ = this.store.pipe(store_1.select(query.getAwsCloudResources));
        this.azureCloudResources$ = this.store.pipe(store_1.select(query.getAzureCloudResources));
        this.azureSubscriptions$ = this.store.pipe(store_1.select(query.getAzureSubscriptions));
        this.azureResourceGroups$ = this.store.pipe(store_1.select(query.getAzureResourceGroups));
        this.azureSpecifications$ = this.store.pipe(store_1.select(query.getAzureCloudSpecifications));
    }
    getAWSRegions() {
        this.store.dispatch(new catalog_service_actions_1.LoadAWSRegionsFromCatalog());
    }
    getAzureRegions() {
        this.store.dispatch(new catalog_service_actions_1.LoadAzureRegionsFromCatalog());
    }
    getAwsProducts() {
        this.store.dispatch(new catalog_service_actions_1.LoadAwsProductsFromCatalog());
    }
    getNetworkProtocols() {
        this.store.dispatch(new catalog_service_actions_1.LoadNetworkProtocols());
    }
    getInstitutionDatas() {
        this.store.dispatch(new catalog_service_actions_1.LoadInstitutionDatas());
    }
    getAWSActions() {
        this.store.dispatch(new catalog_service_actions_1.LoadAWSActions());
    }
    getAzureActions() {
        this.store.dispatch(new catalog_service_actions_1.LoadAzureActions());
    }
    getAWSResources() {
        this.store.dispatch(new catalog_service_actions_1.LoadAWSResources());
    }
    getAzureResources() {
        this.store.dispatch(new catalog_service_actions_1.LoadAzureResources());
    }
    getAzureSpecifications() {
        this.store.dispatch(new catalog_service_actions_1.LoadAzureSpecifications());
    }
};
CatalogServiceFacade = __decorate([
    core_1.Injectable()
], CatalogServiceFacade);
exports.CatalogServiceFacade = CatalogServiceFacade;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2F0YWxvZy1zZXJ2aWNlLmZhY2FkZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL2NvbmNvdXJzZS9qYXZhc2NyaXB0L2NvbmNvdXJzZS1hcHAvc3JjL2FwcC9zdG9yZS9jYXRhbG9nLXNlcnZpY2Uvc3RhdGUvY2F0YWxvZy1zZXJ2aWNlLmZhY2FkZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBLHdDQUEyQztBQUMzQyx1Q0FBNEM7QUFFNUMsdUVBV21DO0FBRW5DLHFEQUFxRDtBQUdyRCxJQUFhLG9CQUFvQixHQUFqQyxNQUFhLG9CQUFvQjtJQWUvQixZQUNtQixLQUFtQjtRQUFuQixVQUFLLEdBQUwsS0FBSyxDQUFjO1FBZnRDLGNBQVMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxjQUFNLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7UUFDdkQsb0JBQWUsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxjQUFNLENBQUMsS0FBSyxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQztRQUNsRSxzQkFBaUIsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxjQUFNLENBQUMsS0FBSyxDQUFDLGtCQUFrQixDQUFDLENBQUMsQ0FBQztRQUN0RSxxQkFBZ0IsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxjQUFNLENBQUMsS0FBSyxDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQztRQUNwRSwwQkFBcUIsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxjQUFNLENBQUMsS0FBSyxDQUFDLHNCQUFzQixDQUFDLENBQUMsQ0FBQztRQUM5RSwwQkFBcUIsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxjQUFNLENBQUMsS0FBSyxDQUFDLHNCQUFzQixDQUFDLENBQUMsQ0FBQztRQUM5RSxnQkFBVyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLGNBQU0sQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQztRQUMzRCxrQkFBYSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLGNBQU0sQ0FBQyxLQUFLLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQztRQUMvRCx1QkFBa0IsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxjQUFNLENBQUMsS0FBSyxDQUFDLG9CQUFvQixDQUFDLENBQUMsQ0FBQztRQUN6RSx5QkFBb0IsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxjQUFNLENBQUMsS0FBSyxDQUFDLHNCQUFzQixDQUFDLENBQUMsQ0FBQztRQUM3RSx3QkFBbUIsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxjQUFNLENBQUMsS0FBSyxDQUFDLHFCQUFxQixDQUFDLENBQUMsQ0FBQztRQUMzRSx5QkFBb0IsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxjQUFNLENBQUMsS0FBSyxDQUFDLHNCQUFzQixDQUFDLENBQUMsQ0FBQztRQUM3RSx5QkFBb0IsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxjQUFNLENBQUMsS0FBSyxDQUFDLDJCQUEyQixDQUFDLENBQUMsQ0FBQztJQUk5RSxDQUFDO0lBRUwsYUFBYTtRQUNYLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLElBQUksbURBQXlCLEVBQUUsQ0FBQyxDQUFDO0lBQ3ZELENBQUM7SUFFRCxlQUFlO1FBQ2IsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsSUFBSSxxREFBMkIsRUFBRSxDQUFDLENBQUM7SUFDekQsQ0FBQztJQUVELGNBQWM7UUFDWixJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxJQUFJLG9EQUEwQixFQUFFLENBQUMsQ0FBQztJQUN4RCxDQUFDO0lBRUQsbUJBQW1CO1FBQ2pCLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLElBQUksOENBQW9CLEVBQUUsQ0FBQyxDQUFDO0lBQ2xELENBQUM7SUFFRCxtQkFBbUI7UUFDakIsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsSUFBSSw4Q0FBb0IsRUFBRSxDQUFDLENBQUM7SUFDbEQsQ0FBQztJQUVELGFBQWE7UUFDWCxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxJQUFJLHdDQUFjLEVBQUUsQ0FBQyxDQUFDO0lBQzVDLENBQUM7SUFFRCxlQUFlO1FBQ2IsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsSUFBSSwwQ0FBZ0IsRUFBRSxDQUFDLENBQUM7SUFDOUMsQ0FBQztJQUVELGVBQWU7UUFDYixJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxJQUFJLDBDQUFnQixFQUFFLENBQUMsQ0FBQztJQUM5QyxDQUFDO0lBRUQsaUJBQWlCO1FBQ2YsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsSUFBSSw0Q0FBa0IsRUFBRSxDQUFDLENBQUM7SUFDaEQsQ0FBQztJQUVELHNCQUFzQjtRQUNwQixJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxJQUFJLGlEQUF1QixFQUFFLENBQUMsQ0FBQztJQUNyRCxDQUFDO0NBQ0YsQ0FBQTtBQTFEWSxvQkFBb0I7SUFEaEMsaUJBQVUsRUFBRTtHQUNBLG9CQUFvQixDQTBEaEM7QUExRFksb0RBQW9CIn0=