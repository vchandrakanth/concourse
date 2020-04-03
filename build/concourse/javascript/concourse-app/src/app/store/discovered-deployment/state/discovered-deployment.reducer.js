"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const helpers_1 = require("@concourse/shared/helpers");
const state_adapter_1 = require("@concourse/shared/state-adapter");
const discovered_deployment_actions_1 = require("./discovered-deployment.actions");
exports.adapter = state_adapter_1.createEntityAdapter();
exports.initialState = exports.adapter.getInitialState({
    ids: [],
    loading: false,
    loaded: false,
    selectedDeploymentId: undefined,
    resourceAuditData: undefined,
    selectedResourceData: undefined
});
function reducer(state = exports.initialState, action) {
    switch (action.type) {
        case discovered_deployment_actions_1.DiscoveredDeploymentActionTypes.LoadDiscoveredDeployment:
        case discovered_deployment_actions_1.DiscoveredDeploymentActionTypes.LoadDiscoveredDeployments:
        case discovered_deployment_actions_1.DiscoveredDeploymentActionTypes.LoadResourceAuditData:
        case discovered_deployment_actions_1.DiscoveredDeploymentActionTypes.SearchDiscoveredDeployments: {
            return Object.assign(Object.assign({}, state), { loading: true, loaded: false, resourceAuditData: undefined, selectedResourceData: undefined });
        }
        case discovered_deployment_actions_1.DiscoveredDeploymentActionTypes.LoadDiscoveredDeploymentsSuccess: {
            return Object.assign(Object.assign({}, exports.adapter.addMany(action.payload, state)), { loading: false, loaded: true });
        }
        case discovered_deployment_actions_1.DiscoveredDeploymentActionTypes.SelectDiscoveredDeployment: {
            return Object.assign(Object.assign({}, state), { selectedDeploymentId: action.payload });
        }
        case discovered_deployment_actions_1.DiscoveredDeploymentActionTypes.LoadDiscoveredDeploymentSuccess: {
            return Object.assign(Object.assign({}, exports.adapter.upsertOne(action.payload, state)), { loading: false, loaded: true });
        }
        case discovered_deployment_actions_1.DiscoveredDeploymentActionTypes.LoadResourceAuditDataSuccess: {
            return Object.assign(Object.assign({}, state), { resourceAuditData: action.payload, loading: false });
        }
        case discovered_deployment_actions_1.DiscoveredDeploymentActionTypes.SelectResourceAuditData: {
            return Object.assign(Object.assign({}, state), { selectedResourceData: action.payload });
        }
        case discovered_deployment_actions_1.DiscoveredDeploymentActionTypes.SearchDiscoveredDeploymentsSuccess: {
            return Object.assign(Object.assign({}, state), { ids: action.payload, loading: false, loaded: true });
        }
        case discovered_deployment_actions_1.DiscoveredDeploymentActionTypes.ResetDiscoveredDeploymentsSearch: {
            return Object.assign(Object.assign({}, state), { ids: Object.keys(state.entities).map(id => +id) });
        }
        case discovered_deployment_actions_1.DiscoveredDeploymentActionTypes.LoadDiscoveredDeploymentFailure:
        case discovered_deployment_actions_1.DiscoveredDeploymentActionTypes.LoadDiscoveredDeploymentsFailure:
        case discovered_deployment_actions_1.DiscoveredDeploymentActionTypes.LoadResourceAuditDataFailure: {
            return Object.assign(Object.assign({}, state), { loading: false });
        }
        default:
            return state;
    }
}
exports.reducer = reducer;
_a = exports.adapter.getSelectors(), exports.selectAll = _a.selectAll, exports.selectEntities = _a.selectEntities;
exports.isLoaded = helpers_1.isStateLoaded();
exports.isUpdating = helpers_1.isStateUpdating();
exports.selectedId = (state) => state.selectedDeploymentId;
exports.getResources = (state) => state.resourceAuditData;
exports.selectedDeploymentResource = (state) => state.selectedResourceData;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlzY292ZXJlZC1kZXBsb3ltZW50LnJlZHVjZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9jb25jb3Vyc2UvamF2YXNjcmlwdC9jb25jb3Vyc2UtYXBwL3NyYy9hcHAvc3RvcmUvZGlzY292ZXJlZC1kZXBsb3ltZW50L3N0YXRlL2Rpc2NvdmVyZWQtZGVwbG95bWVudC5yZWR1Y2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUdBLHVEQUEyRTtBQUMzRSxtRUFBc0U7QUFDdEUsbUZBQStHO0FBV2xHLFFBQUEsT0FBTyxHQUF3QyxtQ0FBbUIsRUFBd0IsQ0FBQztBQUUzRixRQUFBLFlBQVksR0FBVSxlQUFPLENBQUMsZUFBZSxDQUFDO0lBQ3pELEdBQUcsRUFBRSxFQUFFO0lBQ1AsT0FBTyxFQUFFLEtBQUs7SUFDZCxNQUFNLEVBQUUsS0FBSztJQUNiLG9CQUFvQixFQUFFLFNBQVM7SUFDL0IsaUJBQWlCLEVBQUUsU0FBUztJQUM1QixvQkFBb0IsRUFBRSxTQUFTO0NBQ2hDLENBQUMsQ0FBQztBQUVILFNBQWdCLE9BQU8sQ0FBQyxLQUFLLEdBQUcsb0JBQVksRUFBRSxNQUFtQztJQUMvRSxRQUFRLE1BQU0sQ0FBQyxJQUFJLEVBQUU7UUFDbkIsS0FBSywrREFBK0IsQ0FBQyx3QkFBd0IsQ0FBQztRQUM5RCxLQUFLLCtEQUErQixDQUFDLHlCQUF5QixDQUFDO1FBQy9ELEtBQUssK0RBQStCLENBQUMscUJBQXFCLENBQUM7UUFDM0QsS0FBSywrREFBK0IsQ0FBQywyQkFBMkIsQ0FBQyxDQUFDO1lBQ2hFLHVDQUNLLEtBQUssS0FDUixPQUFPLEVBQUUsSUFBSSxFQUNiLE1BQU0sRUFBRSxLQUFLLEVBQ2IsaUJBQWlCLEVBQUUsU0FBUyxFQUM1QixvQkFBb0IsRUFBRSxTQUFTLElBQy9CO1NBQ0g7UUFFRCxLQUFLLCtEQUErQixDQUFDLGdDQUFnQyxDQUFDLENBQUM7WUFDckUsdUNBQ0ssZUFBTyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQyxLQUN6QyxPQUFPLEVBQUUsS0FBSyxFQUNkLE1BQU0sRUFBRSxJQUFJLElBQ1o7U0FDSDtRQUNELEtBQUssK0RBQStCLENBQUMsMEJBQTBCLENBQUMsQ0FBQztZQUMvRCx1Q0FDSyxLQUFLLEtBQ1Isb0JBQW9CLEVBQUUsTUFBTSxDQUFDLE9BQU8sSUFDcEM7U0FDSDtRQUVELEtBQUssK0RBQStCLENBQUMsK0JBQStCLENBQUMsQ0FBQztZQUNwRSx1Q0FDSyxlQUFPLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDLEtBQzNDLE9BQU8sRUFBRSxLQUFLLEVBQ2QsTUFBTSxFQUFFLElBQUksSUFDWjtTQUNIO1FBRUQsS0FBSywrREFBK0IsQ0FBQyw0QkFBNEIsQ0FBQyxDQUFDO1lBQ2pFLHVDQUNLLEtBQUssS0FDUixpQkFBaUIsRUFBRSxNQUFNLENBQUMsT0FBTyxFQUNqQyxPQUFPLEVBQUUsS0FBSyxJQUNkO1NBQ0g7UUFFRCxLQUFLLCtEQUErQixDQUFDLHVCQUF1QixDQUFDLENBQUM7WUFDNUQsdUNBQ0ssS0FBSyxLQUNSLG9CQUFvQixFQUFFLE1BQU0sQ0FBQyxPQUFPLElBQ3BDO1NBQ0g7UUFFRCxLQUFLLCtEQUErQixDQUFDLGtDQUFrQyxDQUFDLENBQUM7WUFDdkUsdUNBQ0ssS0FBSyxLQUNSLEdBQUcsRUFBRSxNQUFNLENBQUMsT0FBTyxFQUNuQixPQUFPLEVBQUUsS0FBSyxFQUNkLE1BQU0sRUFBRSxJQUFJLElBQ1o7U0FDSDtRQUVELEtBQUssK0RBQStCLENBQUMsZ0NBQWdDLENBQUMsQ0FBQztZQUNyRSx1Q0FDSyxLQUFLLEtBQ1IsR0FBRyxFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLElBQy9DO1NBQ0g7UUFFRCxLQUFLLCtEQUErQixDQUFDLCtCQUErQixDQUFDO1FBQ3JFLEtBQUssK0RBQStCLENBQUMsZ0NBQWdDLENBQUM7UUFDdEUsS0FBSywrREFBK0IsQ0FBQyw0QkFBNEIsQ0FBQyxDQUFDO1lBQ2pFLHVDQUNLLEtBQUssS0FDUixPQUFPLEVBQUUsS0FBSyxJQUNkO1NBQ0g7UUFFRDtZQUNFLE9BQU8sS0FBSyxDQUFDO0tBQ2hCO0FBQ0gsQ0FBQztBQWhGRCwwQkFnRkM7QUFFWSxtQ0FBc0QsK0VBQUM7QUFDdkQsUUFBQSxRQUFRLEdBQUcsdUJBQWEsRUFBRSxDQUFDO0FBQzNCLFFBQUEsVUFBVSxHQUFHLHlCQUFlLEVBQUUsQ0FBQztBQUMvQixRQUFBLFVBQVUsR0FBRyxDQUFDLEtBQVksRUFBRSxFQUFFLENBQUMsS0FBSyxDQUFDLG9CQUFvQixDQUFDO0FBQzFELFFBQUEsWUFBWSxHQUFHLENBQUMsS0FBWSxFQUFFLEVBQUUsQ0FBQyxLQUFLLENBQUMsaUJBQWlCLENBQUM7QUFDekQsUUFBQSwwQkFBMEIsR0FBRyxDQUFDLEtBQVksRUFBRSxFQUFFLENBQUMsS0FBSyxDQUFDLG9CQUFvQixDQUFDIn0=