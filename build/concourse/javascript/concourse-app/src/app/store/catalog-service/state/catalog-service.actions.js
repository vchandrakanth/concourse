"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CatalogServiceActionTypes;
(function (CatalogServiceActionTypes) {
    CatalogServiceActionTypes["LoadCatalogServiceDataFailure"] = "[CatalogService] Load Catalog Service Data Failure";
    CatalogServiceActionTypes["LoadAWSRegions"] = "[CatalogService] Load AWS Regions";
    CatalogServiceActionTypes["LoadAWSRegionsSuccess"] = "[CatalogService] Load AWS Regions Success";
    CatalogServiceActionTypes["LoadAzureRegions"] = "[CatalogService] Load Azure Regions";
    CatalogServiceActionTypes["LoadAzureRegionsSuccess"] = "[CatalogService] Load Azure Regions Success";
    CatalogServiceActionTypes["LoadAwsProducts"] = "[CatalogService] Load Aws Products";
    CatalogServiceActionTypes["LoadAwsProductsSuccess"] = "[CatalogService] Load Aws Products Success";
    CatalogServiceActionTypes["LoadNetworkProtocols"] = "[CatalogService] Load Network Protocols";
    CatalogServiceActionTypes["LoadNetworkProtocolsSuccess"] = "[CatalogService] Load Network Protocols Success";
    CatalogServiceActionTypes["LoadInstitutionDatas"] = "[CatalogService] Load Institution Data";
    CatalogServiceActionTypes["LoadInstitutionDatasSuccess"] = "[CatalogService] Load Institution Data Success";
    CatalogServiceActionTypes["LoadAWSActions"] = "[CatalogService] Load AWS Actions";
    CatalogServiceActionTypes["LoadAWSActionsSuccess"] = "[CatalogService] Load AWS Actions Success";
    CatalogServiceActionTypes["LoadAzureActions"] = "[CatalogService] Load Azure Actions";
    CatalogServiceActionTypes["LoadAzureActionsSuccess"] = "[CatalogService] Load Azure Actions Success";
    CatalogServiceActionTypes["LoadAWSResources"] = "[CatalogService] Load AWS Resources";
    CatalogServiceActionTypes["LoadAWSResourcesSuccess"] = "[CatalogService] Load AWS Resources Success";
    CatalogServiceActionTypes["LoadAzureResources"] = "[CatalogService] Load Azure Resources";
    CatalogServiceActionTypes["LoadAzureResourcesSuccess"] = "[CatalogService] Load Azure Resources Success";
    CatalogServiceActionTypes["LoadAzureSubscriptions"] = "[CatalogService] Load Azure Subscriptions";
    CatalogServiceActionTypes["LoadAzureSubscriptionsSuccess"] = "[CatalogService] Load Azure Subscriptions Success";
    CatalogServiceActionTypes["LoadAzureResourceGroups"] = "[CatalogService] Load Azure Resource Groups";
    CatalogServiceActionTypes["LoadAzureResourceGroupsSuccess"] = "[CatalogService] Load Azure Resource Groups Success";
    CatalogServiceActionTypes["LoadAzureSpecifications"] = "[CatalogService] Load Azure Specifications";
    CatalogServiceActionTypes["LoadAzureSpecificationsSuccess"] = "[CatalogService] Load Azure Specifications Success";
})(CatalogServiceActionTypes = exports.CatalogServiceActionTypes || (exports.CatalogServiceActionTypes = {}));
class LoadCatalogServiceDataFailure {
    constructor() {
        this.type = CatalogServiceActionTypes.LoadCatalogServiceDataFailure;
    }
}
exports.LoadCatalogServiceDataFailure = LoadCatalogServiceDataFailure;
class LoadAWSRegionsFromCatalog {
    constructor() {
        this.type = CatalogServiceActionTypes.LoadAWSRegions;
    }
}
exports.LoadAWSRegionsFromCatalog = LoadAWSRegionsFromCatalog;
class LoadAWSRegionsFromCatalogSuccess {
    constructor(payload) {
        this.payload = payload;
        this.type = CatalogServiceActionTypes.LoadAWSRegionsSuccess;
    }
}
exports.LoadAWSRegionsFromCatalogSuccess = LoadAWSRegionsFromCatalogSuccess;
class LoadAzureRegionsFromCatalog {
    constructor() {
        this.type = CatalogServiceActionTypes.LoadAzureRegions;
    }
}
exports.LoadAzureRegionsFromCatalog = LoadAzureRegionsFromCatalog;
class LoadAzureRegionsFromCatalogSuccess {
    constructor(payload) {
        this.payload = payload;
        this.type = CatalogServiceActionTypes.LoadAzureRegionsSuccess;
    }
}
exports.LoadAzureRegionsFromCatalogSuccess = LoadAzureRegionsFromCatalogSuccess;
class LoadAwsProductsFromCatalog {
    constructor() {
        this.type = CatalogServiceActionTypes.LoadAwsProducts;
    }
}
exports.LoadAwsProductsFromCatalog = LoadAwsProductsFromCatalog;
class LoadAwsProductsFromCatalogSuccess {
    constructor(payload) {
        this.payload = payload;
        this.type = CatalogServiceActionTypes.LoadAwsProductsSuccess;
    }
}
exports.LoadAwsProductsFromCatalogSuccess = LoadAwsProductsFromCatalogSuccess;
class LoadNetworkProtocols {
    constructor() {
        this.type = CatalogServiceActionTypes.LoadNetworkProtocols;
    }
}
exports.LoadNetworkProtocols = LoadNetworkProtocols;
class LoadNetworkProtocolsSuccess {
    constructor(payload) {
        this.payload = payload;
        this.type = CatalogServiceActionTypes.LoadNetworkProtocolsSuccess;
    }
}
exports.LoadNetworkProtocolsSuccess = LoadNetworkProtocolsSuccess;
class LoadInstitutionDatas {
    constructor() {
        this.type = CatalogServiceActionTypes.LoadInstitutionDatas;
    }
}
exports.LoadInstitutionDatas = LoadInstitutionDatas;
class LoadInstitutionDatasSuccess {
    constructor(payload) {
        this.payload = payload;
        this.type = CatalogServiceActionTypes.LoadInstitutionDatasSuccess;
    }
}
exports.LoadInstitutionDatasSuccess = LoadInstitutionDatasSuccess;
class LoadAWSActions {
    constructor() {
        this.type = CatalogServiceActionTypes.LoadAWSActions;
    }
}
exports.LoadAWSActions = LoadAWSActions;
class LoadAWSActionsSuccess {
    constructor(payload) {
        this.payload = payload;
        this.type = CatalogServiceActionTypes.LoadAWSActionsSuccess;
    }
}
exports.LoadAWSActionsSuccess = LoadAWSActionsSuccess;
class LoadAzureActions {
    constructor() {
        this.type = CatalogServiceActionTypes.LoadAzureActions;
    }
}
exports.LoadAzureActions = LoadAzureActions;
class LoadAzureActionsSuccess {
    constructor(payload) {
        this.payload = payload;
        this.type = CatalogServiceActionTypes.LoadAzureActionsSuccess;
    }
}
exports.LoadAzureActionsSuccess = LoadAzureActionsSuccess;
class LoadAWSResources {
    constructor() {
        this.type = CatalogServiceActionTypes.LoadAWSResources;
    }
}
exports.LoadAWSResources = LoadAWSResources;
class LoadAWSResourcesSuccess {
    constructor(payload) {
        this.payload = payload;
        this.type = CatalogServiceActionTypes.LoadAWSResourcesSuccess;
    }
}
exports.LoadAWSResourcesSuccess = LoadAWSResourcesSuccess;
class LoadAzureResources {
    constructor() {
        this.type = CatalogServiceActionTypes.LoadAzureResources;
    }
}
exports.LoadAzureResources = LoadAzureResources;
class LoadAzureResourcesSuccess {
    constructor(payload) {
        this.payload = payload;
        this.type = CatalogServiceActionTypes.LoadAzureResourcesSuccess;
    }
}
exports.LoadAzureResourcesSuccess = LoadAzureResourcesSuccess;
class LoadAzureSubscriptions {
    constructor() {
        this.type = CatalogServiceActionTypes.LoadAzureSubscriptions;
    }
}
exports.LoadAzureSubscriptions = LoadAzureSubscriptions;
class LoadAzureSubscriptionsSuccess {
    constructor(payload) {
        this.payload = payload;
        this.type = CatalogServiceActionTypes.LoadAzureSubscriptionsSuccess;
    }
}
exports.LoadAzureSubscriptionsSuccess = LoadAzureSubscriptionsSuccess;
class LoadAzureResourceGroups {
    constructor() {
        this.type = CatalogServiceActionTypes.LoadAzureResourceGroups;
    }
}
exports.LoadAzureResourceGroups = LoadAzureResourceGroups;
class LoadAzureResourceGroupsSuccess {
    constructor(payload) {
        this.payload = payload;
        this.type = CatalogServiceActionTypes.LoadAzureResourceGroupsSuccess;
    }
}
exports.LoadAzureResourceGroupsSuccess = LoadAzureResourceGroupsSuccess;
class LoadAzureSpecifications {
    constructor() {
        this.type = CatalogServiceActionTypes.LoadAzureSpecifications;
    }
}
exports.LoadAzureSpecifications = LoadAzureSpecifications;
class LoadAzureSpecificationsSuccess {
    constructor(payload) {
        this.payload = payload;
        this.type = CatalogServiceActionTypes.LoadAzureSpecificationsSuccess;
    }
}
exports.LoadAzureSpecificationsSuccess = LoadAzureSpecificationsSuccess;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2F0YWxvZy1zZXJ2aWNlLmFjdGlvbnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9jb25jb3Vyc2UvamF2YXNjcmlwdC9jb25jb3Vyc2UtYXBwL3NyYy9hcHAvc3RvcmUvY2F0YWxvZy1zZXJ2aWNlL3N0YXRlL2NhdGFsb2ctc2VydmljZS5hY3Rpb25zLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBY0EsSUFBWSx5QkF1Q1g7QUF2Q0QsV0FBWSx5QkFBeUI7SUFDbkMsaUhBQW9GLENBQUE7SUFFcEYsaUZBQW9ELENBQUE7SUFDcEQsZ0dBQW1FLENBQUE7SUFFbkUscUZBQXdELENBQUE7SUFDeEQsb0dBQXVFLENBQUE7SUFFdkUsbUZBQXNELENBQUE7SUFDdEQsa0dBQXFFLENBQUE7SUFFckUsNkZBQWdFLENBQUE7SUFDaEUsNEdBQStFLENBQUE7SUFFL0UsNEZBQStELENBQUE7SUFDL0QsMkdBQThFLENBQUE7SUFFOUUsaUZBQW9ELENBQUE7SUFDcEQsZ0dBQW1FLENBQUE7SUFFbkUscUZBQXdELENBQUE7SUFDeEQsb0dBQXVFLENBQUE7SUFFdkUscUZBQXdELENBQUE7SUFDeEQsb0dBQXVFLENBQUE7SUFFdkUseUZBQTRELENBQUE7SUFDNUQsd0dBQTJFLENBQUE7SUFFM0UsaUdBQW9FLENBQUE7SUFDcEUsZ0hBQW1GLENBQUE7SUFFbkYsb0dBQXVFLENBQUE7SUFDdkUsbUhBQXNGLENBQUE7SUFFdEYsbUdBQXNFLENBQUE7SUFDdEUsa0hBQXFGLENBQUE7QUFFdkYsQ0FBQyxFQXZDVyx5QkFBeUIsR0FBekIsaUNBQXlCLEtBQXpCLGlDQUF5QixRQXVDcEM7QUFFRCxNQUFhLDZCQUE2QjtJQUExQztRQUNXLFNBQUksR0FBRyx5QkFBeUIsQ0FBQyw2QkFBNkIsQ0FBQztJQUMxRSxDQUFDO0NBQUE7QUFGRCxzRUFFQztBQUVELE1BQWEseUJBQXlCO0lBQXRDO1FBQ1csU0FBSSxHQUFHLHlC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