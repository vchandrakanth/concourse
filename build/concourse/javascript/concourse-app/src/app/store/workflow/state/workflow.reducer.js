"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const helpers_1 = require("@concourse/shared/helpers");
const workflow_actions_1 = require("./workflow.actions");
exports.initialState = {
    owned: [],
    assigned: [],
    watched: [],
    myWorkflowsUpdated: undefined,
    assignedWorkflowsUpdated: undefined,
    watchedWorkflowsUpdated: undefined,
    selectedType: 'owned',
    loading: false,
    loaded: false,
    loadedWorkflows: {}
};
function reducer(state = exports.initialState, action) {
    switch (action.type) {
        case workflow_actions_1.WorkflowActionTypes.LoadWorkflowSummariesByType: {
            return Object.assign(Object.assign({}, state), { owned: [], assigned: [], watched: [], loading: true });
        }
        case workflow_actions_1.WorkflowActionTypes.LoadWorkflowSummariesByTypeSuccess: {
            return Object.assign(Object.assign(Object.assign({}, state), action.payload), { myWorkflowsUpdated: new Date(), assignedWorkflowsUpdated: new Date(), watchedWorkflowsUpdated: new Date(), loading: false, loaded: true, loadedWorkflows: action.payload });
        }
        case workflow_actions_1.WorkflowActionTypes.FilterWorkflowSummariesByType: {
            return Object.assign(Object.assign({}, state), { selectedType: action.payload.toLocaleLowerCase() });
        }
        case workflow_actions_1.WorkflowActionTypes.LoadWorkflowSummariesByTypeFailure: {
            return Object.assign(Object.assign({}, state), { loading: false });
        }
        case workflow_actions_1.WorkflowActionTypes.SearchWorkflowSummariesSuccess: {
            return Object.assign(Object.assign({}, state), { [state.selectedType]: state[state.selectedType].filter(ent => action.payload.find(id => id === ent.id)), loading: false, loaded: true });
        }
        case workflow_actions_1.WorkflowActionTypes.ResetWorkflowSummariesSearch: {
            return Object.assign(Object.assign({}, state), { owned: state.loadedWorkflows.owned, assigned: state.loadedWorkflows.assigned, watched: state.loadedWorkflows.watched });
        }
        default:
            return state;
    }
}
exports.reducer = reducer;
exports.isLoaded = helpers_1.isStateLoaded();
exports.isUpdating = helpers_1.isStateUpdating();
exports.selectedType = (state) => state.selectedType;
exports.all = (state) => ([...state.owned, ...state.assigned, ...state.watched]);
exports.owned = (state) => state.owned;
exports.assigned = (state) => state.assigned;
exports.watched = (state) => state.watched;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid29ya2Zsb3cucmVkdWNlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL2NvbmNvdXJzZS9qYXZhc2NyaXB0L2NvbmNvdXJzZS1hcHAvc3JjL2FwcC9zdG9yZS93b3JrZmxvdy9zdGF0ZS93b3JrZmxvdy5yZWR1Y2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQ0EsdURBQTJFO0FBQzNFLHlEQUEwRTtBQWU3RCxRQUFBLFlBQVksR0FBVTtJQUNqQyxLQUFLLEVBQUUsRUFBRTtJQUNULFFBQVEsRUFBRSxFQUFFO0lBQ1osT0FBTyxFQUFFLEVBQUU7SUFDWCxrQkFBa0IsRUFBRSxTQUFTO0lBQzdCLHdCQUF3QixFQUFFLFNBQVM7SUFDbkMsdUJBQXVCLEVBQUUsU0FBUztJQUNsQyxZQUFZLEVBQUUsT0FBTztJQUNyQixPQUFPLEVBQUUsS0FBSztJQUNkLE1BQU0sRUFBRSxLQUFLO0lBQ2IsZUFBZSxFQUFFLEVBQUU7Q0FDcEIsQ0FBQztBQUVGLFNBQWdCLE9BQU8sQ0FBQyxLQUFLLEdBQUcsb0JBQVksRUFBRSxNQUF1QjtJQUNuRSxRQUFRLE1BQU0sQ0FBQyxJQUFJLEVBQUU7UUFDbkIsS0FBSyxzQ0FBbUIsQ0FBQywyQkFBMkIsQ0FBQyxDQUFDO1lBQ3BELHVDQUNLLEtBQUssS0FDUixLQUFLLEVBQUUsRUFBRSxFQUNULFFBQVEsRUFBRSxFQUFFLEVBQ1osT0FBTyxFQUFFLEVBQUUsRUFDWCxPQUFPLEVBQUUsSUFBSSxJQUNiO1NBQ0g7UUFDRCxLQUFLLHNDQUFtQixDQUFDLGtDQUFrQyxDQUFDLENBQUM7WUFDM0QscURBQ0ssS0FBSyxHQUNMLE1BQU0sQ0FBQyxPQUFPLEtBQ2pCLGtCQUFrQixFQUFFLElBQUksSUFBSSxFQUFFLEVBQzlCLHdCQUF3QixFQUFFLElBQUksSUFBSSxFQUFFLEVBQ3BDLHVCQUF1QixFQUFFLElBQUksSUFBSSxFQUFFLEVBQ25DLE9BQU8sRUFBRSxLQUFLLEVBQ2QsTUFBTSxFQUFFLElBQUksRUFDWixlQUFlLEVBQUUsTUFBTSxDQUFDLE9BQU8sSUFDL0I7U0FDSDtRQUVELEtBQUssc0NBQW1CLENBQUMsNkJBQTZCLENBQUMsQ0FBQztZQUN0RCx1Q0FDSyxLQUFLLEtBQ1IsWUFBWSxFQUFFLE1BQU0sQ0FBQyxPQUFPLENBQUMsaUJBQWlCLEVBQUUsSUFDaEQ7U0FDSDtRQUVELEtBQUssc0NBQW1CLENBQUMsa0NBQWtDLENBQUMsQ0FBQztZQUMzRCx1Q0FDSyxLQUFLLEtBQ1IsT0FBTyxFQUFFLEtBQUssSUFDZDtTQUNIO1FBQ0QsS0FBSyxzQ0FBbUIsQ0FBQyw4QkFBOEIsQ0FBQyxDQUFDO1lBQ3ZELHVDQUNLLEtBQUssS0FDUixDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsRUFBRSxLQUFLLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxLQUFLLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUN2RyxPQUFPLEVBQUUsS0FBSyxFQUNkLE1BQU0sRUFBRSxJQUFJLElBQ1o7U0FDSDtRQUNELEtBQUssc0NBQW1CLENBQUMsNEJBQTRCLENBQUMsQ0FBQztZQUNyRCx1Q0FDSyxLQUFLLEtBQ1IsS0FBSyxFQUFFLEtBQUssQ0FBQyxlQUFlLENBQUMsS0FBSyxFQUNsQyxRQUFRLEVBQUUsS0FBSyxDQUFDLGVBQWUsQ0FBQyxRQUFRLEVBQ3hDLE9BQU8sRUFBRSxLQUFLLENBQUMsZUFBZSxDQUFDLE9BQU8sSUFDdEM7U0FDSDtRQUNEO1lBQ0UsT0FBTyxLQUFLLENBQUM7S0FDaEI7QUFDSCxDQUFDO0FBeERELDBCQXdEQztBQUVZLFFBQUEsUUFBUSxHQUFHLHVCQUFhLEVBQUUsQ0FBQztBQUMzQixRQUFBLFVBQVUsR0FBRyx5QkFBZSxFQUFFLENBQUM7QUFDL0IsUUFBQSxZQUFZLEdBQUcsQ0FBQyxLQUFZLEVBQUUsRUFBRSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUM7QUFDcEQsUUFBQSxHQUFHLEdBQUcsQ0FBQyxLQUFZLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxLQUFLLEVBQUUsR0FBRyxLQUFLLENBQUMsUUFBUSxFQUFFLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7QUFDaEYsUUFBQSxLQUFLLEdBQUcsQ0FBQyxLQUFZLEVBQUUsRUFBRSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUM7QUFDdEMsUUFBQSxRQUFRLEdBQUcsQ0FBQyxLQUFZLEVBQUUsRUFBRSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUM7QUFDNUMsUUFBQSxPQUFPLEdBQUcsQ0FBQyxLQUFZLEVBQUUsRUFBRSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMifQ==