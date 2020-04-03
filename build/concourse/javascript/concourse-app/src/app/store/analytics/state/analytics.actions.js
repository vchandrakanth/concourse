"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AnalyticsActionTypes;
(function (AnalyticsActionTypes) {
    AnalyticsActionTypes["LoadPlatformUsageTotal"] = "[Analytics] Load Platform Usage Total";
    AnalyticsActionTypes["LoadPlatformUsageTotalSuccess"] = "[Analytics] Load Platform Usage Total Success";
    AnalyticsActionTypes["LoadStatsByType"] = "[Analytics] Load Stats By Type";
    AnalyticsActionTypes["LoadApprovalStats"] = "[Analytics] Load Approval Stats";
    AnalyticsActionTypes["LoadApprovalStatsSuccess"] = "[Analytics] Load Approval Stats Success";
    AnalyticsActionTypes["LoadApprovalStatsByBreakdownSuccess"] = "[Analytics] Load Approval Stats By Breakdown Success";
    AnalyticsActionTypes["LoadPolicyViolationStats"] = "[Analytics] Load PolicyViolationStats";
    AnalyticsActionTypes["LoadPolicyViolationStatsSuccess"] = "[Analytics] Load PolicyViolationStats Success";
    AnalyticsActionTypes["LoadPolicyViolationStatsByBreakdownSuccess"] = "[Analytics] Load PolicyViolation Stats By Breakdown Success";
    AnalyticsActionTypes["LoadUserUsageCharts"] = "[Analytics] Load User Usage Charts";
    AnalyticsActionTypes["LoadUserUsageChartsSuccess"] = "[Analytics] Load User Usage Charts Success";
    AnalyticsActionTypes["LoadUserUsageChart"] = "[Analytics] Load User Usage Chart";
    AnalyticsActionTypes["LoadUserUsageChartSuccess"] = "[Analytics] Load User Usage Chart Success";
    AnalyticsActionTypes["LoadAnalyticsFailure"] = "[Analytics] Load Failure";
})(AnalyticsActionTypes = exports.AnalyticsActionTypes || (exports.AnalyticsActionTypes = {}));
class LoadPlatformUsageTotal {
    constructor() {
        this.type = AnalyticsActionTypes.LoadPlatformUsageTotal;
    }
}
exports.LoadPlatformUsageTotal = LoadPlatformUsageTotal;
class LoadPlatformUsageTotalSuccess {
    constructor(payload) {
        this.payload = payload;
        this.type = AnalyticsActionTypes.LoadPlatformUsageTotalSuccess;
    }
}
exports.LoadPlatformUsageTotalSuccess = LoadPlatformUsageTotalSuccess;
class LoadUserUsageCharts {
    constructor() {
        this.type = AnalyticsActionTypes.LoadUserUsageCharts;
    }
}
exports.LoadUserUsageCharts = LoadUserUsageCharts;
class LoadUserUsageChartsSuccess {
    constructor(payload) {
        this.payload = payload;
        this.type = AnalyticsActionTypes.LoadUserUsageChartsSuccess;
    }
}
exports.LoadUserUsageChartsSuccess = LoadUserUsageChartsSuccess;
class LoadUserUsageChart {
    constructor() {
        this.type = AnalyticsActionTypes.LoadUserUsageChart;
    }
}
exports.LoadUserUsageChart = LoadUserUsageChart;
class LoadUserUsageChartSuccess {
    constructor(payload) {
        this.payload = payload;
        this.type = AnalyticsActionTypes.LoadUserUsageChartSuccess;
    }
}
exports.LoadUserUsageChartSuccess = LoadUserUsageChartSuccess;
class LoadAnalyticsFailure {
    constructor() {
        this.type = AnalyticsActionTypes.LoadAnalyticsFailure;
    }
}
exports.LoadAnalyticsFailure = LoadAnalyticsFailure;
class LoadStatsByType {
    constructor(payload) {
        this.payload = payload;
        this.type = AnalyticsActionTypes.LoadStatsByType;
    }
}
exports.LoadStatsByType = LoadStatsByType;
class LoadApprovalStats {
    constructor(payload) {
        this.payload = payload;
        this.type = AnalyticsActionTypes.LoadApprovalStats;
    }
}
exports.LoadApprovalStats = LoadApprovalStats;
class LoadApprovalStatsSuccess {
    constructor(payload) {
        this.payload = payload;
        this.type = AnalyticsActionTypes.LoadApprovalStatsSuccess;
    }
}
exports.LoadApprovalStatsSuccess = LoadApprovalStatsSuccess;
class LoadApprovalStatsByBreakdownSuccess {
    constructor(payload) {
        this.payload = payload;
        this.type = AnalyticsActionTypes.LoadApprovalStatsByBreakdownSuccess;
    }
}
exports.LoadApprovalStatsByBreakdownSuccess = LoadApprovalStatsByBreakdownSuccess;
class LoadPolicyViolationStats {
    constructor(payload) {
        this.payload = payload;
        this.type = AnalyticsActionTypes.LoadPolicyViolationStats;
    }
}
exports.LoadPolicyViolationStats = LoadPolicyViolationStats;
class LoadPolicyViolationStatsSuccess {
    constructor(payload) {
        this.payload = payload;
        this.type = AnalyticsActionTypes.LoadPolicyViolationStatsSuccess;
    }
}
exports.LoadPolicyViolationStatsSuccess = LoadPolicyViolationStatsSuccess;
class LoadPolicyViolationStatsByBreakdownSuccess {
    constructor(payload) {
        this.payload = payload;
        this.type = AnalyticsActionTypes.LoadPolicyViolationStatsByBreakdownSuccess;
    }
}
exports.LoadPolicyViolationStatsByBreakdownSuccess = LoadPolicyViolationStatsByBreakdownSuccess;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5hbHl0aWNzLmFjdGlvbnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9jb25jb3Vyc2UvamF2YXNjcmlwdC9jb25jb3Vyc2UtYXBwL3NyYy9hcHAvc3RvcmUvYW5hbHl0aWNzL3N0YXRlL2FuYWx5dGljcy5hY3Rpb25zLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBSUEsSUFBWSxvQkFxQlg7QUFyQkQsV0FBWSxvQkFBb0I7SUFDOUIsd0ZBQWdFLENBQUE7SUFDaEUsdUdBQStFLENBQUE7SUFFL0UsMEVBQWtELENBQUE7SUFFbEQsNkVBQXFELENBQUE7SUFDckQsNEZBQW9FLENBQUE7SUFDcEUsb0hBQTRGLENBQUE7SUFFNUYsMEZBQWtFLENBQUE7SUFDbEUseUdBQWlGLENBQUE7SUFDakYsa0lBQTBHLENBQUE7SUFFMUcsa0ZBQTBELENBQUE7SUFDMUQsaUdBQXlFLENBQUE7SUFFekUsZ0ZBQXdELENBQUE7SUFDeEQsK0ZBQXVFLENBQUE7SUFFdkUseUVBQWlELENBQUE7QUFDbkQsQ0FBQyxFQXJCVyxvQkFBb0IsR0FBcEIsNEJBQW9CLEtBQXBCLDRCQUFvQixRQXFCL0I7QUFFRCxNQUFhLHNCQUFzQjtJQUFuQztRQUNXLFNBQUksR0FBRyxvQkFBb0IsQ0FBQyxzQkFBc0IsQ0FBQztJQUM5RCxDQUFDO0NBQUE7QUFGRCx3REFFQztBQUVELE1BQWEsNkJBQTZCO0lBRXhDLFlBQW1CLE9BQVk7UUFBWixZQUFPLEdBQVAsT0FBTyxDQUFLO1FBRHRCLFNBQUksR0FBRyxvQkFBb0IsQ0FBQyw2QkFBNkIsQ0FBQztJQUNoQyxDQUFDO0NBQ3JDO0FBSEQsc0VBR0M7QUFFRCxNQUFhLG1CQUFtQjtJQUFoQztRQUNXLFNBQUksR0FBRyxvQkFBb0IsQ0FBQyxtQkFBbUIsQ0FBQztJQUMzRCxDQUFDO0NBQUE7QUFGRCxrREFFQztBQUVELE1BQWEsMEJBQTBCO0lBRXJDLFlBQW1CLE9BQVk7UUFBWixZQUFPLEdBQVAsT0FBTyxDQUFLO1FBRHRCLFNBQUksR0FBRyxvQkFBb0IsQ0FBQywwQkFBMEIsQ0FBQztJQUM3QixDQUFDO0NBQ3JDO0FBSEQsZ0VBR0M7QUFFRCxNQUFhLGtCQUFrQjtJQUEvQjtRQUNXLFNBQUksR0FBRyxvQkFBb0IsQ0FBQyxrQkFBa0IsQ0FBQztJQUMxRCxDQUFDO0NBQUE7QUFGRCxnREFFQztBQUVELE1BQWEseUJBQXlCO0lBRXBDLFlBQW1CLE9BQVk7UUFBWixZQUFPLEdBQVAsT0FBTyxDQUFLO1FBRHRCLFNBQUksR0FBRyxvQkFBb0IsQ0FBQyx5QkFBeUIsQ0FBQztJQUM1QixDQUFDO0NBQ3JDO0FBSEQsOERBR0M7QUFFRCxNQUFhLG9CQUFvQjtJQUFqQztRQUNXLFNBQUksR0FBRyxvQkFBb0IsQ0FBQyxvQkFBb0IsQ0FBQztJQUM1RCxDQUFDO0NBQUE7QUFGRCxvREFFQztBQUVELE1BQWEsZUFBZTtJQUUxQixZQUFtQixPQUFxQjtRQUFyQixZQUFPLEdBQVAsT0FBTyxDQUFjO1FBRC9CLFNBQUksR0FBRyxvQkFBb0IsQ0FBQyxlQUFlLENBQUM7SUFDVCxDQUFDO0NBQzlDO0FBSEQsMENBR0M7QUFFRCxNQUFhLGlCQUFpQjtJQUU1QixZQUFtQixPQUFxQjtRQUFyQixZQUFPLEdBQVAsT0FBTyxDQUFjO1FBRC9CLFNBQUksR0FBRyxvQkFBb0IsQ0FBQyxpQkFBaUIsQ0FBQztJQUNYLENBQUM7Q0FDOUM7QUFIRCw4Q0FHQztBQUNELE1BQWEsd0JBQXdCO0lBRW5DLFlBQW1CLE9BQWtCO1FBQWxCLFlBQU8sR0FBUCxPQUFPLENBQVc7UUFENUIsU0FBSSxHQUFHLG9CQUFvQixDQUFDLHdCQUF3QixDQUFDO0lBQ3JCLENBQUM7Q0FDM0M7QUFIRCw0REFHQztBQUNELE1BQWEsbUNBQW1DO0lBRTlDLFlBQW1CLE9BQWtCO1FBQWxCLFlBQU8sR0FBUCxPQUFPLENBQVc7UUFENUIsU0FBSSxHQUFHLG9CQUFvQixDQUFDLG1DQUFtQyxDQUFDO0lBQ2hDLENBQUM7Q0FDM0M7QUFIRCxrRkFHQztBQUVELE1BQWEsd0JBQXdCO0lBRW5DLFlBQW1CLE9BQXFCO1FBQXJCLFlBQU8sR0FBUCxPQUFPLENBQWM7UUFEL0IsU0FBSSxHQUFHLG9CQUFvQixDQUFDLHdCQUF3QixDQUFDO0lBQ2xCLENBQUM7Q0FDOUM7QUFIRCw0REFHQztBQUNELE1BQWEsK0JBQStCO0lBRTFDLFlBQW1CLE9BQWtCO1FBQWxCLFlBQU8sR0FBUCxPQUFPLENBQVc7UUFENUIsU0FBSSxHQUFHLG9CQUFvQixDQUFDLCtCQUErQixDQUFDO0lBQzVCLENBQUM7Q0FDM0M7QUFIRCwwRUFHQztBQUNELE1BQWEsMENBQTBDO0lBRXJELFlBQW1CLE9BQWtCO1FBQWxCLFlBQU8sR0FBUCxPQUFPLENBQVc7UUFENUIsU0FBSSxHQUFHLG9CQUFvQixDQUFDLDBDQUEwQyxDQUFDO0lBQ3ZDLENBQUM7Q0FDM0M7QUFIRCxnR0FHQyJ9