"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const effects_1 = require("@ngrx/effects");
const operators_1 = require("@concourse/core/operators");
const operators_2 = require("rxjs/operators");
const helpers_1 = require("@concourse/shared/helpers");
const analytics_actions_1 = require("./analytics.actions");
let AnalyticsEffects = class AnalyticsEffects {
    constructor(actions$, analyticsService) {
        this.actions$ = actions$;
        this.analyticsService = analyticsService;
        this.loadAnalyticsAction$ = this.actions$.pipe(effects_1.ofType(analytics_actions_1.AnalyticsActionTypes.LoadPlatformUsageTotal), operators_2.concatMap(_ => this.analyticsService.platformUsageTotal().pipe(operators_2.map(data => data.response[0]), operators_2.map(data => new analytics_actions_1.LoadPlatformUsageTotalSuccess(data)))));
        this.loadUserUsageCharts$ = this.actions$.pipe(effects_1.ofType(analytics_actions_1.AnalyticsActionTypes.LoadUserUsageCharts), operators_2.concatMap(_ => this.analyticsService.userUsage().pipe(operators_2.map(data => data.response), operators_2.map(data => new analytics_actions_1.LoadUserUsageChartsSuccess(data)), operators_1.handleError('toast', new analytics_actions_1.LoadAnalyticsFailure()))));
        this.loadUserUsageChart$ = this.actions$.pipe(effects_1.ofType(analytics_actions_1.AnalyticsActionTypes.LoadUserUsageChart), operators_2.concatMap(_ => this.analyticsService.userUsage().pipe(operators_2.map(data => new analytics_actions_1.LoadUserUsageChartSuccess(data)), operators_1.handleError('toast', new analytics_actions_1.LoadAnalyticsFailure()))));
        this.loadApprovalStats$ = this.actions$.pipe(effects_1.ofType(analytics_actions_1.AnalyticsActionTypes.LoadApprovalStats), operators_2.map((action) => action.payload), operators_2.concatMap(payload => this.analyticsService.statsApprovals(payload).pipe(operators_2.map(data => helpers_1.Util.isNullOrUndefined(data.request.breakdown) ?
            new analytics_actions_1.LoadApprovalStatsSuccess(data) :
            new analytics_actions_1.LoadApprovalStatsByBreakdownSuccess(data)), operators_1.handleError('toast', new analytics_actions_1.LoadAnalyticsFailure()))));
        this.loadPolicyViolationStats$ = this.actions$.pipe(effects_1.ofType(analytics_actions_1.AnalyticsActionTypes.LoadPolicyViolationStats), operators_2.map((action) => action.payload), operators_2.concatMap(payload => this.analyticsService.statsPolicyViolations(payload).pipe(operators_2.map(data => helpers_1.Util.isNullOrUndefined(data.request.breakdown) ?
            new analytics_actions_1.LoadPolicyViolationStatsSuccess(data) :
            new analytics_actions_1.LoadPolicyViolationStatsByBreakdownSuccess(data)), operators_1.handleError('toast', new analytics_actions_1.LoadAnalyticsFailure()))));
        this.loadStatsOnNav$ = this.actions$.pipe(operators_1.ofRoute(['/dashboard/stats']), operators_2.map((action) => action.payload), operators_2.mergeMap(_ => [
            new analytics_actions_1.LoadApprovalStats({ lookBackInHours: '720', types: ['approved', 'created', 'cancelled'] }),
            new analytics_actions_1.LoadApprovalStats({ lookBackInHours: '720', breakdown: 'eventType', types: ['created'] }),
            new analytics_actions_1.LoadPolicyViolationStats({ lookBackInHours: '720', types: ['created', 'cancelled'] }),
            new analytics_actions_1.LoadPolicyViolationStats({ lookBackInHours: '720', breakdown: 'policyViolationType', types: ['created'] })
        ]));
        this.loadAnalyticsOnNav$ = this.actions$.pipe(operators_1.ofRoute(['/analytics']), operators_2.map((action) => action.payload), operators_2.mergeMap(_ => [
            new analytics_actions_1.LoadPlatformUsageTotal(),
            new analytics_actions_1.LoadUserUsageCharts()
        ]));
    }
};
__decorate([
    effects_1.Effect()
], AnalyticsEffects.prototype, "loadAnalyticsAction$", void 0);
__decorate([
    effects_1.Effect()
], AnalyticsEffects.prototype, "loadUserUsageCharts$", void 0);
__decorate([
    effects_1.Effect()
], AnalyticsEffects.prototype, "loadUserUsageChart$", void 0);
__decorate([
    effects_1.Effect()
], AnalyticsEffects.prototype, "loadApprovalStats$", void 0);
__decorate([
    effects_1.Effect()
], AnalyticsEffects.prototype, "loadPolicyViolationStats$", void 0);
__decorate([
    effects_1.Effect()
], AnalyticsEffects.prototype, "loadStatsOnNav$", void 0);
__decorate([
    effects_1.Effect()
], AnalyticsEffects.prototype, "loadAnalyticsOnNav$", void 0);
AnalyticsEffects = __decorate([
    core_1.Injectable()
], AnalyticsEffects);
exports.AnalyticsEffects = AnalyticsEffects;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5hbHl0aWNzLmVmZmVjdHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9jb25jb3Vyc2UvamF2YXNjcmlwdC9jb25jb3Vyc2UtYXBwL3NyYy9hcHAvc3RvcmUvYW5hbHl0aWNzL3N0YXRlL2FuYWx5dGljcy5lZmZlY3RzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUEsd0NBQTJDO0FBQzNDLDJDQUF3RDtBQUd4RCx5REFBaUU7QUFFakUsOENBS3dCO0FBR3hCLHVEQUFpRDtBQUVqRCwyREFjNkI7QUFHN0IsSUFBYSxnQkFBZ0IsR0FBN0IsTUFBYSxnQkFBZ0I7SUFrRjNCLFlBQ21CLFFBQWlCLEVBQ2pCLGdCQUFrQztRQURsQyxhQUFRLEdBQVIsUUFBUSxDQUFTO1FBQ2pCLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7UUFsRjNDLHlCQUFvQixHQUF1QixJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FDckUsZ0JBQU0sQ0FBQyx3Q0FBb0IsQ0FBQyxzQkFBc0IsQ0FBQyxFQUNuRCxxQkFBUyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQ1osSUFBSSxDQUFDLGdCQUFnQixDQUFDLGtCQUFrQixFQUFFLENBQUMsSUFBSSxDQUM3QyxlQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQzdCLGVBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLElBQUksaURBQTZCLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FDckQsQ0FDRixDQUNGLENBQUM7UUFFUSx5QkFBb0IsR0FBdUIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQ3JFLGdCQUFNLENBQUMsd0NBQW9CLENBQUMsbUJBQW1CLENBQUMsRUFDaEQscUJBQVMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUNaLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxTQUFTLEVBQUUs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