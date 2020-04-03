"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const helpers_1 = require("@concourse/shared/helpers");
const state_adapter_1 = require("@concourse/shared/state-adapter");
const policy_group_template_actions_1 = require("./policy-group-template.actions");
exports.adapter = state_adapter_1.createEntityAdapter();
exports.initialState = exports.adapter.getInitialState({
    ids: [],
    selectedPolicyGroupTemplate: undefined,
    loading: false,
    loaded: false,
    hasNextLink: undefined
});
function reducer(state = exports.initialState, action) {
    switch (action.type) {
        case policy_group_template_actions_1.PolicyGroupTemplateActionTypes.LoadPolicyGroupTemplatesByPagination:
        case policy_group_template_actions_1.PolicyGroupTemplateActionTypes.UpdatePolicyTemplates:
        case policy_group_template_actions_1.PolicyGroupTemplateActionTypes.CreatePolicyGroupTemplate:
        case policy_group_template_actions_1.PolicyGroupTemplateActionTypes.RemovePolicyTemplateFromPolicyGroupTemplate:
        case policy_group_template_actions_1.PolicyGroupTemplateActionTypes.SearchPolicyGroupTemplate:
        case policy_group_template_actions_1.PolicyGroupTemplateActionTypes.UpdatePolicyGroupTemplate:
        case policy_group_template_actions_1.PolicyGroupTemplateActionTypes.DeletePolicyGroupTemplate:
        case policy_group_template_actions_1.PolicyGroupTemplateActionTypes.LoadPolicyGroupTemplate:
        case policy_group_template_actions_1.PolicyGroupTemplateActionTypes.LoadPolicyGroupTemplates: {
            return Object.assign(Object.assign({}, state), { loading: true });
        }
        case policy_group_template_actions_1.PolicyGroupTemplateActionTypes.LoadPolicyGroupTemplatesSuccess: {
            return Object.assign(Object.assign({}, exports.adapter.addAll(action.payload, state)), { loading: false, loaded: true });
        }
        case policy_group_template_actions_1.PolicyGroupTemplateActionTypes.LoadPolicyGroupTemplatesByPaginationSuccess: {
            const { policyGroupTemplates, hasNextLink } = action.payload;
            return Object.assign(Object.assign({}, exports.adapter.addMany(policyGroupTemplates, state)), { loading: false, loaded: true, hasNextLink });
        }
        case policy_group_template_actions_1.PolicyGroupTemplateActionTypes.LoadPolicyGroupTemplateSuccess: {
            return Object.assign(Object.assign({}, exports.adapter.upsertOne(action.payload, state)), { loading: false, loaded: true });
        }
        case policy_group_template_actions_1.PolicyGroupTemplateActionTypes.SelectPolicyGroupTemplate: {
            return Object.assign(Object.assign({}, state), { selectedPolicyGroupTemplate: action.payload });
        }
        case policy_group_template_actions_1.PolicyGroupTemplateActionTypes.DeletePolicyGroupTemplateSuccess: {
            return Object.assign(Object.assign({}, exports.adapter.removeOne(action.payload, state)), { loading: false });
        }
        case policy_group_template_actions_1.PolicyGroupTemplateActionTypes.CreatePolicyGroupTemplateSuccess: {
            return Object.assign(Object.assign({}, exports.adapter.addOne(action.payload, state)), { loading: false });
        }
        case policy_group_template_actions_1.PolicyGroupTemplateActionTypes.UpdatePolicyTemplatesSuccess:
        case policy_group_template_actions_1.PolicyGroupTemplateActionTypes.RemovePolicyTemplateFromPolicyGroupTemplateSuccess: {
            return Object.assign(Object.assign({}, exports.adapter.upsertOne(action.payload, state)), { loading: false });
        }
        case policy_group_template_actions_1.PolicyGroupTemplateActionTypes.UpdatePolicyGroupTemplateSuccess: {
            let newState = state;
            if (action.payload.status === 'PUBLISHED') {
                const toRemove = Object.values(state.entities)
                    .filter(cr => cr.lineageId === action.payload.lineageId)
                    .map(cr => cr.id);
                newState = exports.adapter.removeMany(toRemove, newState);
            }
            return Object.assign(Object.assign({}, exports.adapter.upsertOne(action.payload, newState)), { loading: false, loaded: true });
        }
        case policy_group_template_actions_1.PolicyGroupTemplateActionTypes.SearchPolicyGroupTemplateSuccess: {
            return Object.assign(Object.assign({}, state), { ids: action.payload, loading: false });
        }
        case policy_group_template_actions_1.PolicyGroupTemplateActionTypes.ResetPolicyGroupTemplateResults: {
            return Object.assign(Object.assign({}, state), { ids: Object.keys(state.entities).map(id => +id) });
        }
        case policy_group_template_actions_1.PolicyGroupTemplateActionTypes.LoadPolicyGroupTemplatesByPaginationFailure:
        case policy_group_template_actions_1.PolicyGroupTemplateActionTypes.UpdatePolicyTemplatesFailure:
        case policy_group_template_actions_1.PolicyGroupTemplateActionTypes.CreatePolicyGroupTemplateFailure:
        case policy_group_template_actions_1.PolicyGroupTemplateActionTypes.RemovePolicyTemplateFromPolicyGroupTemplateFailure:
        case policy_group_template_actions_1.PolicyGroupTemplateActionTypes.UpdatePolicyGroupTemplateFailure:
        case policy_group_template_actions_1.PolicyGroupTemplateActionTypes.DeletePolicyGroupTemplateFailure:
        case policy_group_template_actions_1.PolicyGroupTemplateActionTypes.LoadPolicyGroupTemplateFailure:
        case policy_group_template_actions_1.PolicyGroupTemplateActionTypes.LoadPolicyGroupTemplatesFailure: {
            return Object.assign(Object.assign({}, state), { loading: false });
        }
        default:
            return state;
    }
}
exports.reducer = reducer;
_a = exports.adapter.getSelectors(), exports.selectAll = _a.selectAll, exports.selectEntities = _a.selectEntities;
exports.selectedId = (state) => state.selectedPolicyGroupTemplate;
exports.isLoaded = helpers_1.isStateLoaded();
exports.isUpdating = helpers_1.isStateUpdating();
exports.hasNextLink = (state) => state.hasNextLink;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9saWN5LWdyb3VwLXRlbXBsYXRlLnJlZHVjZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9jb25jb3Vyc2UvamF2YXNjcmlwdC9jb25jb3Vyc2UtYXBwL3NyYy9hcHAvc3RvcmUvcG9saWN5LWdyb3VwLXRlbXBsYXRlL3N0YXRlL3BvbGljeS1ncm91cC10ZW1wbGF0ZS5yZWR1Y2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUdBLHVEQUEyRTtBQUMzRSxtRUFBc0U7QUFDdEUsbUZBR3lDO0FBVTVCLFFBQUEsT0FBTyxHQUF1QyxtQ0FBbUIsRUFBdUIsQ0FBQztBQUV6RixRQUFBLFlBQVksR0FBVSxlQUFPLENBQUMsZUFBZSxDQUFDO0lBQ3pELEdBQUcsRUFBRSxFQUFFO0lBQ1AsMkJBQTJCLEVBQUUsU0FBUztJQUN0QyxPQUFPLEVBQUUsS0FBSztJQUNkLE1BQU0sRUFBRSxLQUFLO0lBQ2IsV0FBVyxFQUFFLFNBQVM7Q0FDdkIsQ0FBQyxDQUFDO0FBRUgsU0FBZ0IsT0FBTyxDQUFDLEtBQUssR0FBRyxvQkFBWSxFQUFFLE1BQWtDO0lBQzlFLFFBQVEsTUFBTSxDQUFDLElBQUksRUFBRTtRQUNuQixLQUFLLDhEQUE4QixDQUFDLG9DQUFvQyxDQUFDO1FBQ3pFLEtBQUssOERBQThCLENBQUMscUJBQXFCLENBQUM7UUFDMUQsS0FBSyw4REFBOEIsQ0FBQyx5QkFBeUIsQ0FBQztRQUM5RCxLQUFLLDhEQUE4QixDQUFDLDJDQUEyQyxDQUFDO1FBQ2hGLEtBQUssOERBQThCLENBQUMseUJBQXlCLENBQUM7UUFDOUQsS0FBSyw4REFBOEIsQ0FBQyx5QkFBeUIsQ0FBQztRQUM5RCxLQUFLLDhEQUE4QixDQUFDLHlCQUF5QixDQUFDO1FBQzlELEtBQUssOERBQThCLENBQUMsdUJBQXVCLENBQUM7UUFDNUQsS0FBSyw4REFBOEIsQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDO1lBQzVELHVDQUNLLEtB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