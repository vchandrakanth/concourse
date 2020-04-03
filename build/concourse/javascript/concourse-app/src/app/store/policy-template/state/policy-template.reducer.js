"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const helpers_1 = require("@concourse/shared/helpers");
const state_adapter_1 = require("@concourse/shared/state-adapter");
const policy_template_actions_1 = require("./policy-template.actions");
exports.adapter = state_adapter_1.createEntityAdapter();
exports.initialState = exports.adapter.getInitialState({
    ids: [],
    selectedPolicyTemplate: undefined,
    category: undefined,
    loading: false,
    loaded: false
});
function reducer(state = exports.initialState, action) {
    switch (action.type) {
        case policy_template_actions_1.PolicyTemplateActionTypes.SearchPolicyTemplate:
        case policy_template_actions_1.PolicyTemplateActionTypes.LoadPolicyTemplate:
        case policy_template_actions_1.PolicyTemplateActionTypes.LoadPolicyTemplates: {
            return Object.assign(Object.assign({}, state), { loading: true });
        }
        case policy_template_actions_1.PolicyTemplateActionTypes.GetPolicyTemplatesByCategory: {
            return Object.assign(Object.assign({}, state), { category: action.payload });
        }
        case policy_template_actions_1.PolicyTemplateActionTypes.LoadPolicyTemplatesSuccess: {
            return Object.assign(Object.assign({}, exports.adapter.upsertMany(action.payload, state)), { loading: false, loaded: true });
        }
        case policy_template_actions_1.PolicyTemplateActionTypes.LoadPolicyTemplateSuccess: {
            return Object.assign(Object.assign({}, exports.adapter.upsertOne(action.payload, state)), { loading: false, loaded: true });
        }
        case policy_template_actions_1.PolicyTemplateActionTypes.SelectPolicyTemplate: {
            return Object.assign(Object.assign({}, state), { selectedPolicyTemplate: action.payload });
        }
        case policy_template_actions_1.PolicyTemplateActionTypes.SearchPolicyTemplateSuccess: {
            return Object.assign(Object.assign({}, state), { ids: action.payload, loading: false });
        }
        case policy_template_actions_1.PolicyTemplateActionTypes.ResetPolicyTemplateResults: {
            return Object.assign(Object.assign({}, state), { ids: Object.keys(state.entities).map(id => +id) });
        }
        case policy_template_actions_1.PolicyTemplateActionTypes.LoadPolicyTemplateFailure:
        case policy_template_actions_1.PolicyTemplateActionTypes.LoadPolicyTemplatesFailure: {
            return Object.assign(Object.assign({}, state), { loading: false });
        }
        default:
            return state;
    }
}
exports.reducer = reducer;
_a = exports.adapter.getSelectors(), exports.selectAll = _a.selectAll, exports.selectEntities = _a.selectEntities;
exports.selectedPolicyTemplateId = (state) => state.selectedPolicyTemplate;
exports.category = (state) => state.category;
exports.isLoaded = helpers_1.isStateLoaded();
exports.isUpdating = helpers_1.isStateUpdating();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9saWN5LXRlbXBsYXRlLnJlZHVjZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9jb25jb3Vyc2UvamF2YXNjcmlwdC9jb25jb3Vyc2UtYXBwL3NyYy9hcHAvc3RvcmUvcG9saWN5LXRlbXBsYXRlL3N0YXRlL3BvbGljeS10ZW1wbGF0ZS5yZWR1Y2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUdBLHVEQUEyRTtBQUMzRSxtRUFBc0U7QUFDdEUsdUVBR21DO0FBVXRCLFFBQUEsT0FBTyxHQUFrQyxtQ0FBbUIsRUFBa0IsQ0FBQztBQUUvRSxRQUFBLFlBQVksR0FBVSxlQUFPLENBQUMsZUFBZSxDQUFDO0lBQ3pELEdBQUcsRUFBRSxFQUFFO0lBQ1Asc0JBQXNCLEVBQUUsU0FBUztJQUNqQyxRQUFRLEVBQUUsU0FBUztJQUNuQixPQUFPLEVBQUUsS0FBSztJQUNkLE1BQU0sRUFBRSxLQUFLO0NBQ2QsQ0FBQyxDQUFDO0FBRUgsU0FBZ0IsT0FBTyxDQUFDLEtBQUssR0FBRyxvQkFBWSxFQUFFLE1BQTZCO0lBQ3pFLFFBQVEsTUFBTSxDQUFDLElBQUksRUFBRTtRQUNuQixLQUFLLG1EQUF5QixDQUFDLG9CQUFvQixDQUFDO1FBQ3BELEtBQUssbURBQXlCLENBQUMsa0JBQWtCLENBQUM7UUFDbEQsS0FBSyxtREFBeUIsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO1lBQ2xELHVDQUNLLEtBQUssS0FDUixPQUFPLEVBQUUsSUFBSSxJQUNiO1NBQ0g7UUFFRCxLQUFLLG1EQUF5QixDQUFDLDRCQUE0QixDQUFDLENBQUM7WUFDM0QsdUNBQ0ssS0FBSyxLQUNSLFFBQVEsRUFBRSxNQUFNLENBQUMsT0FBTyxJQUN4QjtTQUNIO1FBRUQsS0FBSyxtREFBeUIsQ0FBQywwQkFBMEIsQ0FBQyxDQUFDO1lBQ3pELHVDQUNLLGVBQU8sQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxLQUFLLENBQUMsS0FDNUMsT0FBTyxFQUFFLEtBQUssRUFDZCxNQUFNLEVBQUUsSUFBSSxJQUNaO1NBQ0g7UUFFRCxLQUFLLG1EQUF5QixDQUFDLHlCQUF5QixDQUFDLENBQUM7WUFDeEQsdUNBQ0ssZUFBTyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQyxLQUMzQyxPQUFPLEVBQUUsS0FBSyxFQUNkLE1BQU0sRUFBRSxJQUFJLElBQ1o7U0FDSDtRQUVELEtBQUssbURBQXlCLENBQUMsb0JBQW9CLENBQUMsQ0FBQztZQUNuRCx1Q0FDSyxLQUFLLEtBQ1Isc0JBQXNCLEVBQUUsTUFBTSxDQUFDLE9BQU8sSUFDdEM7U0FDSDtRQUVELEtBQUssbURBQXlCLENBQUMsMkJBQTJCLENBQUMsQ0FBQztZQUMxRCx1Q0FDSyxLQUFLLEtBQ1IsR0FBRyxFQUFFLE1BQU0sQ0FBQyxPQUFPLEVBQ25CLE9BQU8sRUFBRSxLQUFLLElBQ2Q7U0FDSDtRQUVELEtBQUssbURBQXlCLENBQUMsMEJBQTBCLENBQUMsQ0FBQztZQUN6RCx1Q0FDSyxLQUFLLEtBQ1IsR0FBRyxFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLElBQy9DO1NBQ0g7UUFFRCxLQUFLLG1EQUF5QixDQUFDLHlCQUF5QixDQUFDO1FBQ3pELEtBQUssbURBQXlCLENBQUMsMEJBQTBCLENBQUMsQ0FBQztZQUN6RCx1Q0FDSyxLQUFLLEtBQ1IsT0FBTyxFQUFFLEtBQUssSUFDZDtTQUNIO1FBRUQ7WUFDRSxPQUFPLEtBQUssQ0FBQztLQUNoQjtBQUNILENBQUM7QUFuRUQsMEJBbUVDO0FBRVksbUNBQXNELCtFQUFDO0FBQ3ZELFFBQUEsd0JBQXdCLEdBQUcsQ0FBQyxLQUFZLEVBQUUsRUFBRSxDQUFDLEtBQUssQ0FBQyxzQkFBc0IsQ0FBQztBQUMxRSxRQUFBLFFBQVEsR0FBRyxDQUFDLEtBQVksRUFBRSxFQUFFLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQztBQUM1QyxRQUFBLFFBQVEsR0FBRyx1QkFBYSxFQUFFLENBQUM7QUFDM0IsUUFBQSxVQUFVLEdBQUcseUJBQWUsRUFBRSxDQUFDIn0=