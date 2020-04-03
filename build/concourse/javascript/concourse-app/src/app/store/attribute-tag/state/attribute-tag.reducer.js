"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const helpers_1 = require("@concourse/shared/helpers");
const state_adapter_1 = require("@concourse/shared/state-adapter");
const attribute_tag_actions_1 = require("./attribute-tag.actions");
exports.adapter = state_adapter_1.createEntityAdapter();
exports.initialState = exports.adapter.getInitialState({
    ids: [],
    selectedAttributeTag: undefined,
    loading: false,
    loaded: false,
    hasNextLink: undefined
});
function reducer(state = exports.initialState, action) {
    switch (action.type) {
        case attribute_tag_actions_1.AttributeTagActionTypes.LoadAttributeTagsByPagination:
        case attribute_tag_actions_1.AttributeTagActionTypes.LoadAttributeTags:
        case attribute_tag_actions_1.AttributeTagActionTypes.LoadAttributeTag:
        case attribute_tag_actions_1.AttributeTagActionTypes.CreateAttributeTag:
        case attribute_tag_actions_1.AttributeTagActionTypes.UpdateAttributeTag:
        case attribute_tag_actions_1.AttributeTagActionTypes.DeleteAttributeTag:
        case attribute_tag_actions_1.AttributeTagActionTypes.SearchAttributeTags: {
            return Object.assign(Object.assign({}, state), { loading: true });
        }
        case attribute_tag_actions_1.AttributeTagActionTypes.LoadAttributeTagsSuccess: {
            return Object.assign(Object.assign({}, exports.adapter.upsertMany(action.payload, state)), { loading: false, loaded: true });
        }
        case attribute_tag_actions_1.AttributeTagActionTypes.LoadAttributeTagsByPaginationSuccess: {
            const { attributeTags, hasNextLink } = action.payload;
            return Object.assign(Object.assign({}, exports.adapter.upsertMany(attributeTags, state)), { loading: false, loaded: true, hasNextLink });
        }
        case attribute_tag_actions_1.AttributeTagActionTypes.LoadAttributeTagSuccess: {
            return Object.assign(Object.assign({}, exports.adapter.upsertOne(action.payload, state)), { loading: false, loaded: true });
        }
        case attribute_tag_actions_1.AttributeTagActionTypes.SelectAttributeTag: {
            return Object.assign(Object.assign({}, state), { selectedAttributeTag: action.payload });
        }
        case attribute_tag_actions_1.AttributeTagActionTypes.CreateAttributeTagSuccess: {
            return Object.assign(Object.assign({}, exports.adapter.upsertOne(action.payload, state)), { loading: false });
        }
        case attribute_tag_actions_1.AttributeTagActionTypes.UpdateAttributeTagSuccess: {
            return Object.assign(Object.assign({}, exports.adapter.upsertOne(action.payload, state)), { loading: false });
        }
        case attribute_tag_actions_1.AttributeTagActionTypes.DeleteAttributeTagSuccess: {
            return Object.assign(Object.assign({}, exports.adapter.removeOne(action.payload, state)), { loading: false });
        }
        case attribute_tag_actions_1.AttributeTagActionTypes.SearchAttributeTagsSuccess: {
            return Object.assign(Object.assign({}, state), { ids: action.payload, loading: false });
        }
        case attribute_tag_actions_1.AttributeTagActionTypes.ResetAttributeTagSearch: {
            return Object.assign(Object.assign({}, state), { ids: Object.keys(state.entities).map(id => +id) });
        }
        case attribute_tag_actions_1.AttributeTagActionTypes.LoadAttributeTagsByPaginationFailure:
        case attribute_tag_actions_1.AttributeTagActionTypes.LoadAttributeTagsFailure:
        case attribute_tag_actions_1.AttributeTagActionTypes.LoadAttributeTagFailure:
        case attribute_tag_actions_1.AttributeTagActionTypes.CreateAttributeTagFailure:
        case attribute_tag_actions_1.AttributeTagActionTypes.UpdateAttributeTagFailure:
        case attribute_tag_actions_1.AttributeTagActionTypes.DeleteAttributeTagFailure: {
            return Object.assign(Object.assign({}, state), { loading: false });
        }
        default:
            return state;
    }
}
exports.reducer = reducer;
_a = exports.adapter.getSelectors(), exports.selectAll = _a.selectAll, exports.selectEntities = _a.selectEntities;
exports.selectedId = (state) => state.selectedAttributeTag;
exports.isLoaded = helpers_1.isStateLoaded();
exports.isUpdating = helpers_1.isStateUpdating();
exports.hasNextLink = (state) => state.hasNextLink;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXR0cmlidXRlLXRhZy5yZWR1Y2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vY29uY291cnNlL2phdmFzY3JpcHQvY29uY291cnNlLWFwcC9zcmMvYXBwL3N0b3JlL2F0dHJpYnV0ZS10YWcvc3RhdGUvYXR0cmlidXRlLXRhZy5yZWR1Y2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUdBLHVEQUEyRTtBQUMzRSxtRUFBc0U7QUFDdEUsbUVBQXVGO0FBVTFFLFFBQUEsT0FBTyxHQUFnQyxtQ0FBbUIsRUFBZ0IsQ0FBQztBQUUzRSxRQUFBLFlBQVksR0FBVSxlQUFPLENBQUMsZUFBZSxDQUFDO0lBQ3pELEdBQUcsRUFBRSxFQUFFO0lBQ1Asb0JBQW9CLEVBQUUsU0FBUztJQUMvQixPQUFPLEVBQUUsS0FBSztJQUNkLE1BQU0sRUFBRSxLQUFLO0lBQ2IsV0FBVyxFQUFFLFNBQVM7Q0FDdkIsQ0FBQyxDQUFDO0FBRUgsU0FBZ0IsT0FBTyxDQUFDLEtBQUssR0FBRyxvQkFBWSxFQUFFLE1BQTJCO0lBQ3ZFLFFBQVEsTUFBTSxDQUFDLElBQUksRUFBRTtRQUNuQixLQUFLLCtDQUF1QixDQUFDLDZCQUE2QixDQUFDO1FBQzNELEtBQUssK0NBQXVCLENBQUMsaUJBQWlCLENBQUM7UUFDL0MsS0FBSywrQ0FBdUIsQ0FBQyxnQkFBZ0IsQ0FBQztRQUM5QyxLQUFLLCtDQUF1QixDQUFDLGtCQUFrQixDQUFDO1FBQ2hELEtBQUssK0NBQXVCLENBQUMsa0JBQWtCLENBQUM7UUFDaEQsS0FBSywrQ0FBdUIsQ0FBQyxrQkFBa0IsQ0FBQztRQUNoRCxLQUFLLCtDQUF1QixDQUFDLG1CQUFtQixDQUFDLENBQUM7WUFDaEQsdUNBQ0ssS0FBSyxLQUNSLE9BQU8sRUFBRSxJQUFJLElBQ2I7U0FDSDtRQUVELEtBQUssK0NBQXVCLENBQUMsd0JBQXdCLENBQUMsQ0FBQztZQUNyRCx1Q0FDSyxlQUFPLENBQUMs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