"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const helpers_1 = require("@concourse/shared/helpers");
const analytics_actions_1 = require("./analytics.actions");
exports.initialState = {
    charts: undefined,
    loading: false,
    loaded: false
};
function reducer(state = exports.initialState, action) {
    switch (action.type) {
        case analytics_actions_1.AnalyticsActionTypes.LoadPlatformUsageTotal: {
            return Object.assign(Object.assign({}, state), { loading: true, loaded: false });
        }
        case analytics_actions_1.AnalyticsActionTypes.LoadUserUsageChartsSuccess: {
            return Object.assign(Object.assign({}, state), { charts: Object.assign(Object.assign({}, state.charts), { usersUsage: action.payload }), loading: false, loaded: true });
        }
        case analytics_actions_1.AnalyticsActionTypes.LoadPlatformUsageTotalSuccess: {
            return Object.assign(Object.assign({}, state), { charts: Object.assign(Object.assign({}, state.charts), { userTotalUsage: action.payload }), loading: false, loaded: true });
        }
        case analytics_actions_1.AnalyticsActionTypes.LoadApprovalStatsSuccess: {
            return Object.assign(Object.assign({}, state), { charts: Object.assign(Object.assign({}, state.charts), { approvalStats: action.payload }), loading: false, loaded: true });
        }
        case analytics_actions_1.AnalyticsActionTypes.LoadPolicyViolationStatsSuccess: {
            return Object.assign(Object.assign({}, state), { charts: Object.assign(Object.assign({}, state.charts), { policyViolationStats: action.payload }), loading: false, loaded: true });
        }
        case analytics_actions_1.AnalyticsActionTypes.LoadPolicyViolationStatsByBreakdownSuccess:
        case analytics_actions_1.AnalyticsActionTypes.LoadApprovalStatsByBreakdownSuccess: {
            return Object.assign(Object.assign({}, state), { charts: Object.assign(Object.assign({}, state.charts), { breakdownStats: action.payload }), loading: false, loaded: true });
        }
        case analytics_actions_1.AnalyticsActionTypes.LoadAnalyticsFailure: {
            return Object.assign(Object.assign({}, state), { loading: false, loaded: true });
        }
        default:
            return state;
    }
}
exports.reducer = reducer;
exports.analyticCharts = (state) => state.charts;
exports.isLoaded = helpers_1.isStateLoaded();
exports.isLoading = helpers_1.isStateLoading();
exports.isUpdating = helpers_1.isStateUpdating();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5hbHl0aWNzLnJlZHVjZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9jb25jb3Vyc2UvamF2YXNjcmlwdC9jb25jb3Vyc2UtYXBwL3NyYy9hcHAvc3RvcmUvYW5hbHl0aWNzL3N0YXRlL2FuYWx5dGljcy5yZWR1Y2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsdURBQTJGO0FBQzNGLDJEQUE2RTtBQWdCaEUsUUFBQSxZQUFZLEdBQVU7SUFDakMsTUFBTSxFQUFFLFNBQVM7SUFDakIsT0FBTyxFQUFFLEtBQUs7SUFDZCxNQUFNLEVBQUUsS0FBSztDQUNkLENBQUM7QUFFRixTQUFnQixPQUFPLENBQUMsS0FBSyxHQUFHLG9CQUFZLEVBQUUsTUFBd0I7SUFDcEUsUUFBUSxNQUFNLENBQUMsSUFBSSxFQUFFO1FBQ25CLEtBQUssd0NBQW9CLENBQUMsc0JBQXNCLENBQUMsQ0FBQztZQUNoRCx1Q0FDSyxLQUFLLEtBQ1IsT0FBTyxFQUFFLElBQUksRUFDYixNQUFNLEVBQUUsS0FBSyxJQUNiO1NBQ0g7UUFFRCxLQUFLLHdDQUFvQixDQUFDLDBCQUEwQixDQUFDLENBQUM7WUFDcEQsdUNBQ0ssS0FBSyxLQUNSLE1BQU0sa0NBQ0QsS0FBSyxDQUFDLE1BQU0sS0FDZixVQUFVLEVBQUUsTUFBTSxDQUFDLE9BQU8sS0FFNUIsT0FBTyxFQUFFLEtBQUssRUFDZCxNQUFNLEVBQUUsSUFBSSxJQUNaO1NBQ0g7UUFFRCxLQUFLLHdDQUFvQixDQUFDLDZCQUE2QixDQUFDLENBQUM7WUFDdkQsdUNBQ0ssS0FBSyxLQUNSLE1BQU0sa0NBQ0QsS0FBSyxDQUFDLE1BQU0sS0FDZixjQUFjLEVBQUUsTUFBTSxDQUFDLE9BQU8sS0FFaEMsT0FBTyxFQUFFLEtBQUssRUFDZCxNQUFNLEVBQUUsSUFBSSxJQUNaO1NBQ0g7UUFFRCxLQUFLLHdDQUFvQixDQUFDLHdCQUF3QixDQUFDLENBQUM7WUFDbEQsdUNBQ0ssS0FBSyxLQUNSLE1BQU0sa0NBQ0QsS0FBSyxDQUFDLE1BQU0sS0FDZixhQUFhLEVBQUUsTUFBTSxDQUFDLE9BQU8sS0FFL0IsT0FBTyxFQUFFLEtBQUssRUFDZCxNQUFNLEVBQUUsSUFBSSxJQUNaO1NBQ0g7UUFFRCxLQUFLLHdDQUFvQixDQUFDLCtCQUErQixDQUFDLENBQUM7WUFDekQsdUNBQ0ssS0FBSyxLQUNSLE1BQU0sa0NBQ0QsS0FBSyxDQUFDLE1BQU0sS0FDZixvQkFBb0IsRUFBRSxNQUFNLENBQUMsT0FBTyxLQUV0QyxPQUFPLEVBQUUsS0FBSyxFQUNkLE1BQU0sRUFBRSxJQUFJLElBQ1o7U0FDSDtRQUVELEtBQUssd0NBQW9CLENBQUMsMENBQTBDLENBQUM7UUFDckUsS0FBSyx3Q0FBb0IsQ0FBQyxtQ0FBbUMsQ0FBQyxDQUFDO1lBQzdELHVDQUNLLEtBQUssS0FDUixNQUFNLGtDQUNELEtBQUssQ0FBQyxNQUFNLEtBQ2YsY0FBYyxFQUFFLE1BQU0sQ0FBQyxPQUFPLEtBRWhDLE9BQU8sRUFBRSxLQUFLLEVBQ2QsTUFBTSxFQUFFLElBQUksSUFDWjtTQUNIO1FBRUQsS0FBSyx3Q0FBb0IsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO1lBQzlDLHVDQUNLLEtBQUssS0FDUixPQUFPLEVBQUUsS0FBSyxFQUNkLE1BQU0sRUFBRSxJQUFJLElBQ1o7U0FDSDtRQUVEO1lBQ0UsT0FBTyxLQUFLLENBQUM7S0FDaEI7QUFDSCxDQUFDO0FBbEZELDBCQWtGQztBQUVZLFFBQUEsY0FBYyxHQUFHLENBQUMsS0FBWSxFQUFFLEVBQUUsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDO0FBQ2hELFFBQUEsUUFBUSxHQUFHLHVCQUFhLEVBQUUsQ0FBQztBQUMzQixRQUFBLFNBQVMsR0FBRyx3QkFBYyxFQUFFLENBQUM7QUFDN0IsUUFBQSxVQUFVLEdBQUcseUJBQWUsRUFBRSxDQUFDIn0=