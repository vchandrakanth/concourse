"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const catalog_service_actions_1 = require("./catalog-service.actions");
exports.initialCatalogServiceState = {
    awsProducts: [],
    awsRegions: [],
    azureRegions: [],
    networkProtocols: [],
    institutionDatas: [],
    awsActions: [],
    azureActions: [],
    awsResources: [],
    azureResources: [],
    azureSubscriptions: [],
    azureResourceGroups: [],
    loaded: false,
    azureSpecifications: []
};
function reducer(state = exports.initialCatalogServiceState, action) {
    switch (action.type) {
        case catalog_service_actions_1.CatalogServiceActionTypes.LoadAwsProducts:
        case catalog_service_actions_1.CatalogServiceActionTypes.LoadAWSRegions:
        case catalog_service_actions_1.CatalogServiceActionTypes.LoadNetworkProtocols:
        case catalog_service_actions_1.CatalogServiceActionTypes.LoadAWSActions:
        case catalog_service_actions_1.CatalogServiceActionTypes.LoadAzureActions:
        case catalog_service_actions_1.CatalogServiceActionTypes.LoadInstitutionDatas:
        case catalog_service_actions_1.CatalogServiceActionTypes.LoadAzureSubscriptions:
        case catalog_service_actions_1.CatalogServiceActionTypes.LoadAzureResourceGroups:
        case catalog_service_actions_1.CatalogServiceActionTypes.LoadAzureRegions: {
            return Object.assign(Object.assign({}, state), { loaded: false });
        }
        case catalog_service_actions_1.CatalogServiceActionTypes.LoadAwsProductsSuccess: {
            return Object.assign(Object.assign({}, state), { loaded: true, awsProducts: action.payload });
        }
        case catalog_service_actions_1.CatalogServiceActionTypes.LoadAWSRegionsSuccess: {
            return Object.assign(Object.assign({}, state), { loaded: true, awsRegions: action.payload });
        }
        case catalog_service_actions_1.CatalogServiceActionTypes.LoadAzureRegionsSuccess: {
            return Object.assign(Object.assign({}, state), { loaded: true, azureRegions: action.payload });
        }
        case catalog_service_actions_1.CatalogServiceActionTypes.LoadNetworkProtocolsSuccess: {
            return Object.assign(Object.assign({}, state), { loaded: true, networkProtocols: action.payload });
        }
        case catalog_service_actions_1.CatalogServiceActionTypes.LoadInstitutionDatasSuccess: {
            return Object.assign(Object.assign({}, state), { loaded: true, institutionDatas: action.payload });
        }
        case catalog_service_actions_1.CatalogServiceActionTypes.LoadCatalogServiceDataFailure: {
            return Object.assign(Object.assign({}, state), { loaded: true });
        }
        case catalog_service_actions_1.CatalogServiceActionTypes.LoadAWSActionsSuccess: {
            return Object.assign(Object.assign({}, state), { loaded: true, awsActions: action.payload });
        }
        case catalog_service_actions_1.CatalogServiceActionTypes.LoadAzureActionsSuccess: {
            return Object.assign(Object.assign({}, state), { loaded: true, azureActions: action.payload });
        }
        case catalog_service_actions_1.CatalogServiceActionTypes.LoadAWSResourcesSuccess: {
            return Object.assign(Object.assign({}, state), { loaded: true, awsResources: action.payload });
        }
        case catalog_service_actions_1.CatalogServiceActionTypes.LoadAzureResourcesSuccess: {
            return Object.assign(Object.assign({}, state), { loaded: true, azureResources: action.payload });
        }
        case catalog_service_actions_1.CatalogServiceActionTypes.LoadAzureSubscriptionsSuccess: {
            return Object.assign(Object.assign({}, state), { loaded: true, azureSubscriptions: action.payload });
        }
        case catalog_service_actions_1.CatalogServiceActionTypes.LoadAzureResourceGroupsSuccess: {
            return Object.assign(Object.assign({}, state), { loaded: true, azureResourceGroups: action.payload });
        }
        case catalog_service_actions_1.CatalogServiceActionTypes.LoadAzureSpecificationsSuccess: {
            return Object.assign(Object.assign({}, state), { loaded: true, azureSpecifications: action.payload });
        }
        default:
            return state;
    }
}
exports.reducer = reducer;
exports.getAwsProducts = (state) => state.awsProducts;
exports.getAwsRegions = (state) => state.awsRegions;
exports.getAzureRegions = (state) => state.azureRegions;
exports.getNetworkProtocols = (state) => state.networkProtocols;
exports.getInstitutionDatas = (state) => state.institutionDatas;
exports.getAWSActions = (state) => state.awsActions;
exports.getAzureActions = (state) => state.azureActions;
exports.getAwsCloudResources = (state) => state.awsResources;
exports.getAzureCloudResources = (state) => state.azureResources;
exports.getAzureSubscriptions = (state) => state.azureSubscriptions;
exports.getAzureResourceGroups = (state) => state.azureResourceGroups;
exports.isLoaded = (state) => state.loaded;
exports.getAzureCloudSpecifications = (state) => state.azureSpecifications;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2F0YWxvZy1zZXJ2aWNlLnJlZHVjZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9jb25jb3Vyc2UvamF2YXNjcmlwdC9jb25jb3Vyc2UtYXBwL3NyYy9hcHAvc3RvcmUvY2F0YWxvZy1zZXJ2aWNlL3N0YXRlL2NhdGFsb2ctc2VydmljZS5yZWR1Y2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBV0EsdUVBQTZGO0FBbUJoRixRQUFBLDBCQUEwQixHQUFVO0lBQy9DLFdBQVcsRUFBRSxFQUFFO0lBQ2YsVUFBVSxFQUFFLEVBQUU7SUFDZCxZQUFZLEVBQUUsRUFBRTtJQUNoQixnQkFBZ0IsRUFBRSxFQUFFO0lBQ3BCLGdCQUFnQixFQUFFLEVBQUU7SUFDcEIsVUFBVSxFQUFFLEVBQUU7SUFDZCxZQUFZLEVBQUUsRUFBRTtJQUNoQixZQUFZLEVBQUUsRUFBRTtJQUNoQixjQUFjLEVBQUUsRUFBRTtJQUNsQixrQkFBa0IsRUFBRSxFQUFFO0lBQ3RCLG1CQUFtQixFQUFFLEVBQUU7SUFDdkIsTUFBTSxFQUFFLEtBQUs7SUFDYixtQkFBbUIsRUFBRSxFQUFFO0NBQ3hCLENBQUM7QUFFRixTQUFnQixPQUFPLENBQUMsS0FBSyxHQUFHLGtDQUEwQixFQUFFLE1BQTZCO0lBQ3ZGLFFBQVEsTUFBTSxDQUFDLElBQUksRUFBRTtRQUNuQixLQUFLLG1EQUF5QixDQUFDLGVBQWUsQ0FBQztRQUMvQyxLQUFLLG1EQUF5QixDQUFDLGNBQWMsQ0FBQztRQUM5QyxLQUFLLG1EQUF5QixDQUFDLG9CQUFvQixDQUFDO1FBQ3BELEtBQUssbURBQXlCLENBQUMsY0FBYyxDQUFDO1FBQzlDLEtBQUssbURBQXlCLENBQUMsZ0JBQWdCLENBQUM7UUFDaEQsS0FBSyxtREFBeUIsQ0FBQyxvQkFBb0IsQ0FBQztRQUNwRCxLQUFLLG1EQUF5QixDQUFDLHNCQUFzQixDQUFDO1FBQ3RELEtBQUssbURBQXlCLENBQUMsdUJB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