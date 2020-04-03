"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const operators_1 = require("rxjs/operators");
let ActivityPredictionChartComponent = class ActivityPredictionChartComponent {
    constructor(analyticsService) {
        this.analyticsService = analyticsService;
        this.analyticsService.activityDistribution().pipe(operators_1.take(1)).subscribe(res => {
            const usersData = res['response'];
            const cleanUsersData = [];
            for (let user of usersData) {
                user = user.series[0];
                cleanUsersData.push(user);
            }
            this.originalData = cleanUsersData;
            this.data = cleanUsersData;
        });
    }
    ngAfterViewInit() {
        this.columns = [
            { prop: 'id', name: 'ID' },
            { prop: 'date', name: 'Date', cellTemplate: this.dateTpl },
            { prop: 'lower75Percentile', name: 'lower75Percentile' },
            { prop: 'lower25Percentile', name: 'lower25Percentile' },
            { prop: 'total', name: 'Actual Activity' },
            { prop: 'upper25Percentile', name: 'upper25Percentile' },
            { prop: 'upper75Percentile', name: 'upper75Percentile' }
        ];
    }
};
__decorate([
    core_1.ViewChild('dateTpl')
], ActivityPredictionChartComponent.prototype, "dateTpl", void 0);
ActivityPredictionChartComponent = __decorate([
    core_1.Component({
        selector: 'app-activity-prediction-chart',
        templateUrl: './activity-prediction-chart.component.html',
        styleUrls: ['./activity-prediction-chart.component.scss']
    })
], ActivityPredictionChartComponent);
exports.ActivityPredictionChartComponent = ActivityPredictionChartComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWN0aXZpdHktcHJlZGljdGlvbi1jaGFydC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9jb25jb3Vyc2UvamF2YXNjcmlwdC9jb25jb3Vyc2UtYXBwL3NyYy9hcHAvYW5hbHl0aWNzL2NvbXBvbmVudHMvYWN0aXZpdHktcHJlZGljdGlvbi1jaGFydC9hY3Rpdml0eS1wcmVkaWN0aW9uLWNoYXJ0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBLHdDQUF5RjtBQUd6Riw4Q0FBc0M7QUFPdEMsSUFBYSxnQ0FBZ0MsR0FBN0MsTUFBYSxnQ0FBZ0M7SUFPM0MsWUFDVSxnQkFBa0M7UUFBbEMscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQUUxQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsb0JBQW9CLEVBQUUsQ0FBQyxJQUFJLENBQUMsZ0JBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsRUFBRTtZQUN6RSxNQUFNLFNBQVMsR0FBRyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUM7WUFDbEMsTUFBTSxjQUFjLEdBQUcsRUFBRSxDQUFDO1lBQzFCLEtBQUssSUFBSSxJQUFJLElBQUksU0FBUyxFQUFFO2dCQUMxQixJQUFJLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDdEIsY0FBYyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQzthQUMzQjtZQUNELElBQUksQ0FBQyxZQUFZLEdBQUcsY0FBYyxDQUFDO1lBQ25DLElBQUksQ0FBQyxJQUFJLEdBQUcsY0FBYyxDQUFDO1FBQzdCLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELGVBQWU7UUFDYixJQUFJLENBQUMsT0FBTyxHQUFHO1lBQ2IsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUU7WUFDMUIsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFFLElBQUksQ0FBQyxPQUFPLEVBQUU7WUFDMUQsRUFBRSxJQUFJLEVBQUUsbUJBQW1CLEVBQUUsSUFBSSxFQUFFLG1CQUFtQixFQUFFO1lBQ3hELEVBQUUsSUFBSSxFQUFFLG1CQUFtQixFQUFFLElBQUksRUFBRSxtQkFBbUIsRUFBRTtZQUN4RCxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLGlCQUFpQixFQUFFO1lBQzFDLEVBQUUsSUFBSSxFQUFFLG1CQUFtQixFQUFFLElBQUksRUFBRSxtQkFBbUIsRUFBRTtZQUN4RCxFQUFFLElBQUksRUFBRSxtQkFBbUIsRUFBRSxJQUFJLEVBQUUsbUJBQW1CLEVBQUU7U0FDekQsQ0FBQztJQUVKLENBQUM7Q0FFRixDQUFBO0FBOUJ1QjtJQUFyQixnQkFBUyxDQUFDLFNBQVMsQ0FBQztpRUFBMkI7QUFMckMsZ0NBQWdDO0lBTDVDLGdCQUFTLENBQUM7UUFDVCxRQUFRLEVBQUUsK0JBQStCO1FBQ3pDLFdBQVcsRUFBRSw0Q0FBNEM7UUFDekQsU0FBUyxFQUFFLENBQUMsNENBQTRDLENBQUM7S0FDMUQsQ0FBQztHQUNXLGdDQUFnQyxDQW1DNUM7QUFuQ1ksNEVBQWdDIn0=