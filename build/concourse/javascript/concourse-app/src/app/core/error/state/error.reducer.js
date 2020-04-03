"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const state_adapter_1 = require("@concourse/shared/state-adapter");
const error_actions_1 = require("./error.actions");
exports.adapter = state_adapter_1.createEntityAdapter();
exports.initialState = exports.adapter.getInitialState({
    ids: []
});
function reducer(state = exports.initialState, action) {
    switch (action.type) {
        case error_actions_1.ApplicationErrorActionTypes.DispatchedApplicationError: {
            return exports.adapter.addOne(action.payload, state);
        }
        case error_actions_1.ApplicationErrorActionTypes.DismissApplicationError: {
            return exports.adapter.removeOne(action.payload, state);
        }
        case error_actions_1.ApplicationErrorActionTypes.DismissApplicationErrorByDisplayType: {
            const ids = Object.entries(state.entities)
                .filter(([key, val]) => val.displayType === action.payload)
                .map(([key, val]) => +key);
            return exports.adapter.removeMany(ids, state);
        }
        default:
            return state;
    }
}
exports.reducer = reducer;
_a = exports.adapter.getSelectors(), exports.selectAll = _a.selectAll, exports.selectEntities = _a.selectEntities, exports.selectTotal = _a.selectTotal;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXJyb3IucmVkdWNlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL2NvbmNvdXJzZS9qYXZhc2NyaXB0L2NvbmNvdXJzZS1hcHAvc3JjL2FwcC9jb3JlL2Vycm9yL3N0YXRlL2Vycm9yLnJlZHVjZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBR0EsbUVBQXFGO0FBQ3JGLG1EQUF1RjtBQU0xRSxRQUFBLE9BQU8sR0FBb0MsbUNBQW1CLEVBQW9CLENBQUM7QUFFbkYsUUFBQSxZQUFZLEdBQVUsZUFBTyxDQUFDLGVBQWUsQ0FBQztJQUN6RCxHQUFHLEVBQUUsRUFBRTtDQUNSLENBQUMsQ0FBQztBQUVILFNBQWdCLE9BQU8sQ0FBQyxLQUFLLEdBQUcsb0JBQVksRUFBRSxNQUErQjtJQUMzRSxRQUFRLE1BQU0sQ0FBQyxJQUFJLEVBQUU7UUFDbkIsS0FBSywyQ0FBMkIsQ0FBQywwQkFBMEIsQ0FBQyxDQUFDO1lBQzNELE9BQU8sZUFBTyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQyxDQUFDO1NBQzlDO1FBRUQsS0FBSywyQ0FBMkIsQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDO1lBQ3hELE9BQU8sZUFBTyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQyxDQUFDO1NBQ2pEO1FBRUQsS0FBSywyQ0FBMkIsQ0FBQyxvQ0FBb0MsQ0FBQyxDQUFDO1lBQ3JFLE1BQU0sR0FBRyxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQztpQkFDdkMsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLEVBQUUsRUFBRSxDQUFDLEdBQUcsQ0FBQyxXQUFXLEtBQUssTUFBTSxDQUFDLE9BQU8sQ0FBQztpQkFDMUQsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7WUFFN0IsT0FBTyxlQUFPLENBQUMsVUFBVSxDQUFDLEdBQUcsRUFBRSxLQUFLLENBQUMsQ0FBQztTQUN2QztRQUNEO1lBQ0UsT0FBTyxLQUFLLENBQUM7S0FDaEI7QUFDSCxDQUFDO0FBcEJELDBCQW9CQztBQUVZLG1DQUFtRSxxSEFBQyJ9