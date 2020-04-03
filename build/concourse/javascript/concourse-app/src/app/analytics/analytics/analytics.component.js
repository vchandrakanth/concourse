"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
let AnalyticsComponent = class AnalyticsComponent {
    constructor(analyticsFacade, datePipe, analyticsService) {
        this.analyticsFacade = analyticsFacade;
        this.datePipe = datePipe;
        this.analyticsService = analyticsService;
        this.view = [700, 300];
        this.xAxisLabel = 'Date';
        this.yAxisLabel = 'Total User Actions';
        this.colorScheme = {
            domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5']
        };
        this.isLoading$ = this.analyticsFacade.isLoading$;
        this.userTotalUsageData$ = this.analyticsFacade.userTotalUsageChart$;
        this.usersUsageData$ = this.analyticsFacade.usersUsageChart$;
        this.usersChartsActive = false;
    }
    onTabSelect(e, tabKey) {
        // tslint:disable-next-line:prefer-conditional-expression
        if (tabKey === 'allUsers') {
            this.usersChartsActive = true;
        }
        else {
            this.usersChartsActive = false;
        }
    }
};
AnalyticsComponent = __decorate([
    core_1.Component({
        selector: 'app-analytics',
        templateUrl: './analytics.component.html',
        styleUrls: ['./analytics.component.scss']
    })
], AnalyticsComponent);
exports.AnalyticsComponent = AnalyticsComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5hbHl0aWNzLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL2NvbmNvdXJzZS9qYXZhc2NyaXB0L2NvbmNvdXJzZS1hcHAvc3JjL2FwcC9hbmFseXRpY3MvYW5hbHl0aWNzL2FuYWx5dGljcy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQSx3Q0FBMEM7QUFZMUMsSUFBYSxrQkFBa0IsR0FBL0IsTUFBYSxrQkFBa0I7SUFnQjdCLFlBQ21CLGVBQWdDLEVBQ2hDLFFBQWtCLEVBQzNCLGdCQUFrQztRQUZ6QixvQkFBZSxHQUFmLGVBQWUsQ0FBaUI7UUFDaEMsYUFBUSxHQUFSLFFBQVEsQ0FBVTtRQUMzQixxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO1FBbEI1QyxTQUFJLEdBQUcsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFFbEIsZUFBVSxHQUFHLE1BQU0sQ0FBQztRQUNwQixlQUFVLEdBQUcsb0JBQW9CLENBQUM7UUFFbEMsZ0JBQVcsR0FBRztZQUNaLE1BQU0sRUFBRSxDQUFDLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxDQUFDO1NBQzNFLENBQUM7UUFFRixlQUFVLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxVQUFVLENBQUM7UUFDN0Msd0JBQW1CLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxvQkFBb0IsQ0FBQztRQUNoRSxvQkFBZSxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsZ0JBQWdCLENBQUM7UUFFeEQsc0JBQWlCLEdBQUcsS0FBSyxDQUFDO0lBTXRCLENBQUM7SUFFTCxXQUFXLENBQUMsQ0FBQyxFQUFFLE1BQWM7UUFDM0IseURBQXlEO1FBQ3pELElBQUksTUFBTSxLQUFLLFVBQVUsRUFBRTtZQUN6QixJQUFJLENBQUMsaUJBQWlCLEdBQUcsSUFBSSxDQUFDO1NBQy9CO2FBQU07WUFDTCxJQUFJLENBQUMsaUJBQWlCLEdBQUcsS0FBSyxDQUFDO1NBQ2hDO0lBQ0gsQ0FBQztDQUNGLENBQUE7QUE5Qlksa0JBQWtCO0lBTDlCLGdCQUFTLENBQUM7UUFDVCxRQUFRLEVBQUUsZUFBZTtRQUN6QixXQUFXLEVBQUUsNEJBQTRCO1FBQ3pDLFNBQVMsRUFBRSxDQUFDLDRCQUE0QixDQUFDO0tBQzFDLENBQUM7R0FDVyxrQkFBa0IsQ0E4QjlCO0FBOUJZLGdEQUFrQiJ9