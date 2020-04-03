"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const helpers_1 = require("@concourse/shared/helpers");
const state_adapter_1 = require("@concourse/shared/state-adapter");
const logical_deployment_actions_1 = require("./logical-deployment.actions");
exports.adapter = state_adapter_1.createEntityAdapter();
exports.initialState = exports.adapter.getInitialState({
    ids: [],
    loading: false,
    loaded: false,
    formPending: false,
    templateGenerating: false,
    selectedDeploymentId: undefined,
    resourceAuditData: undefined,
    selectedResourceData: undefined,
    privilegeTemplate: undefined
});
function reducer(state = exports.initialState, action) {
    switch (action.type) {
        case logical_deployment_actions_1.LogicalDeploymentActionTypes.LoadLogicalDeploymentsBySurfaceLayerId:
        case logical_deployment_actions_1.LogicalDeploymentActionTypes.LoadLogicalDeployments:
        case logical_deployment_actions_1.LogicalDeploymentActionTypes.LoadLogicalDeployment:
        case logical_deployment_actions_1.LogicalDeploymentActionTypes.LoadResourceAuditData:
        case logical_deployment_actions_1.LogicalDeploymentActionTypes.SearchLogicalDeployments: {
            return Object.assign(Object.assign({}, state), { resourceAuditData: undefined, selectedResourceData: undefined, loading: true, loaded: false });
        }
        case logical_deployment_actions_1.LogicalDeploymentActionTypes.CreateLogicalDeployment:
        case logical_deployment_actions_1.LogicalDeploymentActionTypes.DeleteLogicalDeployment: {
            return Object.assign(Object.assign({}, state), { formPending: true });
        }
        case logical_deployment_actions_1.LogicalDeploymentActionTypes.GeneratePrivilegeTemplate: {
            return Object.assign(Object.assign({}, state), { templateGenerating: true });
        }
        case logical_deployment_actions_1.LogicalDeploymentActionTypes.LoadLogicalDeploymentsSuccess: {
            return Object.assign(Object.assign({}, exports.adapter.addMany(action.payload, state)), { loading: false, loaded: true });
        }
        case logical_deployment_actions_1.LogicalDeploymentActionTypes.LoadLogicalDeploymentsBySurfaceLayerIdSuccess: {
            return Object.assign(Object.assign({}, exports.adapter.addAll(action.payload, state)), { loading: false, loaded: true });
        }
        case logical_deployment_actions_1.LogicalDeploymentActionTypes.LoadLogicalDeploymentSuccess: {
            return Object.assign(Object.assign({}, exports.adapter.upsertOne(action.payload, state)), { loading: false, loaded: true });
        }
        case logical_deployment_actions_1.LogicalDeploymentActionTypes.LoadResourceAuditDataSuccess: {
            return Object.assign(Object.assign({}, state), { resourceAuditData: action.payload, loading: false });
        }
        case logical_deployment_actions_1.LogicalDeploymentActionTypes.GeneratePrivilegeTemplateSuccess: {
            return Object.assign(Object.assign({}, state), { templateGenerating: false, privilegeTemplate: action.payload });
        }
        case logical_deployment_actions_1.LogicalDeploymentActionTypes.SelectResourceAuditData: {
            return Object.assign(Object.assign({}, state), { selectedResourceData: action.payload });
        }
        case logical_deployment_actions_1.LogicalDeploymentActionTypes.SelectLogicalDeployment: {
            return Object.assign(Object.assign({}, state), { selectedDeploymentId: action.payload });
        }
        case logical_deployment_actions_1.LogicalDeploymentActionTypes.CreateLogicalDeploymentSuccess: {
            return Object.assign(Object.assign({}, exports.adapter.addOne(action.payload, state)), { formPending: false });
        }
        case logical_deployment_actions_1.LogicalDeploymentActionTypes.DeleteLogicalDeploymentSuccess: {
            return Object.assign(Object.assign({}, exports.adapter.removeOne(action.payload, state)), { formPending: false });
        }
        case logical_deployment_actions_1.LogicalDeploymentActionTypes.DeleteLogicalDeploymentPending: {
            return Object.assign(Object.assign({}, exports.adapter.upsertOne(action.payload, state)), { formPending: false });
        }
        case logical_deployment_actions_1.LogicalDeploymentActionTypes.SearchLogicalDeploymentsSuccess: {
            return Object.assign(Object.assign({}, state), { ids: action.payload, loading: false, loaded: true });
        }
        case logical_deployment_actions_1.LogicalDeploymentActionTypes.ResetLogicalDeploymentsSearch: {
            return Object.assign(Object.assign({}, state), { ids: Object.keys(state.entities).map(id => +id) });
        }
        case logical_deployment_actions_1.LogicalDeploymentActionTypes.UpdateModelVersionSuccess: {
            return Object.assign(Object.assign({}, exports.adapter.upsertOne(action.payload, state)), { loading: false, loaded: true });
        }
        case logical_deployment_actions_1.LogicalDeploymentActionTypes.CreateLogicalDeploymentFailure:
        case logical_deployment_actions_1.LogicalDeploymentActionTypes.LoadLogicalDeploymentsFailure:
        case logical_deployment_actions_1.LogicalDeploymentActionTypes.LoadLogicalDeploymentFailure:
        case logical_deployment_actions_1.LogicalDeploymentActionTypes.LoadLogicalDeploymentsBySurfaceLayerIdFailure:
        case logical_deployment_actions_1.LogicalDeploymentActionTypes.DeleteLogicalDeploymentFailure:
        case logical_deployment_actions_1.LogicalDeploymentActionTypes.LoadResourceAuditDataFailure:
        case logical_deployment_actions_1.LogicalDeploymentActionTypes.UpdateModelVersionFailure:
        case logical_deployment_actions_1.LogicalDeploymentActionTypes.GeneratePrivilegeTemplateFailure: {
            return Object.assign(Object.assign({}, state), { loading: false, formPending: false, templateGenerating: false });
        }
        default:
            return state;
    }
}
exports.reducer = reducer;
_a = exports.adapter.getSelectors(), exports.selectAll = _a.selectAll, exports.selectEntities = _a.selectEntities;
exports.isLoaded = helpers_1.isStateLoaded();
exports.isUpdating = helpers_1.isStateUpdating();
exports.formPending = (state) => state.formPending;
exports.templateGenerating = (state) => state.templateGenerating;
exports.selectedDeployment = (state) => state.selectedDeploymentId;
exports.selectedDeploymentResources = (state) => state.resourceAuditData;
exports.selectedDeploymentResource = (state) => state.selectedResourceData;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9naWNhbC1kZXBsb3ltZW50LnJlZHVjZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9jb25jb3Vyc2UvamF2YXNjcmlwdC9jb25jb3Vyc2UtYXBwL3NyYy9hcHAvc3RvcmUvbG9naWNhbC1kZXBsb3ltZW50L3N0YXRlL2xvZ2ljYWwtZGVwbG95bWVudC5yZWR1Y2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUdBLHVEQUEyRTtBQUMzRSxtRUFBc0U7QUFDdEUsNkVBQXNHO0FBY3pGLFFBQUEsT0FBTyxHQUFxQyxtQ0FBbUIsRUFBcUIsQ0FBQztBQUVyRixRQUFBLFlBQVksR0FBVSxlQUFPLENBQUMsZUFBZSxDQUFDO0lBQ3pELEdBQUcsRUFBRSxFQUFFO0lBQ1AsT0FBTyxFQUFFLEtBQUs7SUFDZCxNQUFNLEVBQUUsS0FBSztJQUNiLFdBQVcsRUFBRSxLQUFLO0lBQ2xCLGtCQUFrQixFQUFFLEtBQUs7SUFDekIsb0JBQW9CLEVBQUUsU0FBUztJQUMvQixpQkFBaUIsRUFBRSxTQUFTO0lBQzVCLG9CQUFvQixFQUFFLFNBQVM7SUFDL0IsaUJBQWlCLEVBQUUsU0FBUztDQUM3QixDQUFDLENBQUM7QUFFSCxTQUFnQixPQUFPLENBQUMsS0FBSyxHQUFHLG9CQUFZLEVBQUUsTUFBZ0M7SUFDNUUsUUFBUSxNQUFNLENBQUMsSUFBSSxFQUFFO1FBRW5CLEtBQUsseURBQTRCLENBQUMsc0NBQXNDLENBQUM7UUFDekUsS0FBSyx5REFBNEIsQ0FBQyxzQkFBc0IsQ0FBQztRQUN6RCxLQUFLLHlEQUE0QixDQUFDLHFCQUFxQixDQUFDO1FBQ3hELEtBQUsseURBQTRCLENBQUMscUJBQXFCLENBQUM7UUFDeEQsS0FBSyx5REFBNEIsQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDO1lBQzFELHVDQUNLLEtBQUssS0FDUixpQkFBaUIsRUFBRSxTQUFTLEVBQzVCLG9CQUFvQixFQUFFLFNBQVMsRUFDL0IsT0FB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