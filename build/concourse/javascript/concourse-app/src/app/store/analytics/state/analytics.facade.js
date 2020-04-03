"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const store_1 = require("@ngrx/store");
const analytics_actions_1 = require("./analytics.actions");
const query = require("./analytics.selectors");
let AnalyticsFacade = class AnalyticsFacade {
    constructor(store) {
        this.store = store;
        this.userTotalUsageChart$ = this.store.pipe(store_1.select(query.getChartByName, { chartName: 'userTotalUsage' }));
        this.usersUsageChart$ = this.store.pipe(store_1.select(query.getChartByName, { chartName: 'usersUsage' }));
        this.approvalStats$ = this.store.pipe(store_1.select(query.getChartByName, { chartName: 'approvalStats' }));
        this.policyViolationStats$ = this.store.pipe(store_1.select(query.getChartByName, { chartName: 'policyViolationStats' }));
        this.getChartNames$ = this.store.pipe(store_1.select(query.getChartNames));
        this.statsBreakdown$ = this.store.pipe(store_1.select(query.getChartByName, { chartName: 'breakdownStats' }));
        this.isLoaded$ = this.store.pipe(store_1.select(query.getIsLoaded));
        this.isLoading$ = this.store.pipe(store_1.select(query.getIsLoading));
        this.isUpdating$ = this.store.pipe(store_1.select(query.getIsUpdating));
    }
    chartByName$(chartName) {
        return this.store.pipe(store_1.select(query.getChartByName, { chartName }));
    }
    loadStatsByType(data) {
        switch (data.statType) {
            case 'approval': {
                this.store.dispatch(new analytics_actions_1.LoadApprovalStats(data));
                break;
            }
            case 'risks': {
                this.store.dispatch(new analytics_actions_1.LoadPolicyViolationStats(data));
                break;
            }
            default:
                console.warn('%s not supported statType', data.statType);
                break;
        }
    }
};
AnalyticsFacade = __decorate([
    core_1.Injectable()
], AnalyticsFacade);
exports.AnalyticsFacade = AnalyticsFacade;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5hbHl0aWNzLmZhY2FkZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL2NvbmNvdXJzZS9qYXZhc2NyaXB0L2NvbmNvdXJzZS1hcHAvc3JjL2FwcC9zdG9yZS9hbmFseXRpY3Mvc3RhdGUvYW5hbHl0aWNzLmZhY2FkZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBLHdDQUEyQztBQUMzQyx1Q0FBNEM7QUFLNUMsMkRBQWtGO0FBRWxGLCtDQUErQztBQUcvQyxJQUFhLGVBQWUsR0FBNUIsTUFBYSxlQUFlO0lBVzFCLFlBQ21CLEtBQW1CO1FBQW5CLFVBQUssR0FBTCxLQUFLLENBQWM7UUFYdEMseUJBQW9CLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsY0FBTSxDQUFDLEtBQUssQ0FBQyxjQUFjLEVBQUUsRUFBRSxTQUFTLEVBQUUsZ0JBQWdCLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDdEcscUJBQWdCLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsY0FBTSxDQUFDLEtBQUssQ0FBQyxjQUFjLEVBQUUsRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQzlGLG1CQUFjLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsY0FBTSxDQUFDLEtBQUssQ0FBQyxjQUFjLEVBQUUsRUFBRSxTQUFTLEVBQUUsZUFBZSxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQy9GLDBCQUFxQixHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLGNBQU0sQ0FBQyxLQUFLLENBQUMsY0FBYyxFQUFFLEVBQUUsU0FBUyxFQUFFLHNCQUFzQixFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQzdHLG1CQUFjLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsY0FBTSxDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDO1FBQzlELG9CQUFlLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsY0FBTSxDQUFDLEtBQUssQ0FBQyxjQUFjLEVBQUUsRUFBRSxTQUFTLEVBQUUsZ0JBQWdCLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDakcsY0FBUyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLGNBQU0sQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztRQUN2RCxlQUFVLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsY0FBTSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDO1FBQ3pELGdCQUFXLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsY0FBTSxDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDO0lBSXZELENBQUM7SUFFTCxZQUFZLENBQUMsU0FBaUI7UUFDNUIsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxjQUFNLENBQUMsS0FBSyxDQUFDLGNBQWMsRUFBRSxFQUFFLFNBQVMsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUN0RSxDQUFDO0lBRUQsZUFBZSxDQUFDLElBQWtCO1FBQ2hDLFFBQVEsSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUNyQixLQUFLLFVBQVUsQ0FBQyxDQUFDO2dCQUNmLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLElBQUkscUNBQWlCLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztnQkFDakQsTUFBTTthQUNQO1lBQ0QsS0FBSyxPQUFPLENBQUMsQ0FBQztnQkFDWixJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxJQUFJLDRDQUF3QixDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7Z0JBQ3hELE1BQU07YUFDUDtZQUNEO2dCQUNFLE9BQU8sQ0FBQyxJQUFJLENBQUMsMkJBQTJCLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO2dCQUN6RCxNQUFNO1NBQ1Q7SUFDSCxDQUFDO0NBRUYsQ0FBQTtBQW5DWSxlQUFlO0lBRDNCLGlCQUFVLEVBQUU7R0FDQSxlQUFlLENBbUMzQjtBQW5DWSwwQ0FBZSJ9