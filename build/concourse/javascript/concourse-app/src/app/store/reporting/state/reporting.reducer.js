"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const reporting_actions_1 = require("./reporting.actions");
const initialState = {
    loading: false
};
function reducer(state = initialState, action) {
    switch (action.type) {
        case reporting_actions_1.ReportingActionTypes.GenerateCloudRoleDiffReport:
        case reporting_actions_1.ReportingActionTypes.GenerateGenericDiffReport:
        case reporting_actions_1.ReportingActionTypes.GenerateSurfaceLayerReport: {
            return Object.assign(Object.assign({}, state), { loading: true });
        }
        case reporting_actions_1.ReportingActionTypes.GenerateReportSuccess:
        case reporting_actions_1.ReportingActionTypes.GenerateReportFailure: {
            return Object.assign(Object.assign({}, state), { loading: false });
        }
        default: {
            return state;
        }
    }
}
exports.reducer = reducer;
exports.isLoading = (state) => state.loading;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVwb3J0aW5nLnJlZHVjZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9jb25jb3Vyc2UvamF2YXNjcmlwdC9jb25jb3Vyc2UtYXBwL3NyYy9hcHAvc3RvcmUvcmVwb3J0aW5nL3N0YXRlL3JlcG9ydGluZy5yZWR1Y2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsMkRBQTZFO0FBTTdFLE1BQU0sWUFBWSxHQUFHO0lBQ25CLE9BQU8sRUFBRSxLQUFLO0NBQ2YsQ0FBQztBQUVGLFNBQWdCLE9BQU8sQ0FBQyxLQUFLLEdBQUcsWUFBWSxFQUFFLE1BQXdCO0lBQ3BFLFFBQVEsTUFBTSxDQUFDLElBQUksRUFBRTtRQUVuQixLQUFLLHdDQUFvQixDQUFDLDJCQUEyQixDQUFDO1FBQ3RELEtBQUssd0NBQW9CLENBQUMseUJBQXlCLENBQUM7UUFDcEQsS0FBSyx3Q0FBb0IsQ0FBQywwQkFBMEIsQ0FBQyxDQUFDO1lBQ3BELHVDQUNLLEtBQUssS0FDUixPQUFPLEVBQUUsSUFBSSxJQUNiO1NBQ0g7UUFFRCxLQUFLLHdDQUFvQixDQUFDLHFCQUFxQixDQUFDO1FBQ2hELEtBQUssd0NBQW9CLENBQUMscUJBQXFCLENBQUMsQ0FBQztZQUMvQyx1Q0FDSyxLQUFLLEtBQ1IsT0FBTyxFQUFFLEtBQUssSUFDZDtTQUNIO1FBRUQsT0FBTyxDQUFDLENBQUM7WUFDUCxPQUFPLEtBQUssQ0FBQztTQUNkO0tBQ0Y7QUFDSCxDQUFDO0FBeEJELDBCQXdCQztBQUVZLFFBQUEsU0FBUyxHQUFHLENBQUMsS0FBWSxFQUFFLEVBQUUsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDIn0=