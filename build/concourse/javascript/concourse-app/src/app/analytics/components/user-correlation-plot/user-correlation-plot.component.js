"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const helpers_1 = require("@concourse/shared/helpers");
const operators_1 = require("rxjs/operators");
let UserCorrelationPlotComponent = class UserCorrelationPlotComponent {
    constructor(analyticsService) {
        this.analyticsService = analyticsService;
        this.view = [600, 300];
        this.xAxisLabel = 'Date';
        this.analyticsService.userCorrelationPlot().pipe(operators_1.take(1)).subscribe(res => {
            const usersData = res['response'];
            const cleanUsersData = [];
            for (const user of usersData) {
                const cleanUserSeries = user.series.filter(x => !helpers_1.Util.isNullOrUndefined(x.value));
                user.series = cleanUserSeries;
                cleanUsersData.push(user);
            }
            this.originalData = cleanUsersData;
            this.data = cleanUsersData;
        });
    }
    onFilter() {
        const data = [...this.data];
        if (this.filter) {
            const filtered = data.filter(x => x.name.toLowerCase().includes(this.filter.toLowerCase()));
            this.data = filtered;
        }
        else {
            this.data = this.originalData;
        }
    }
};
UserCorrelationPlotComponent = __decorate([
    core_1.Component({
        selector: 'app-user-correlation-plot',
        templateUrl: './user-correlation-plot.component.html',
        styleUrls: ['./user-correlation-plot.component.scss']
    })
], UserCorrelationPlotComponent);
exports.UserCorrelationPlotComponent = UserCorrelationPlotComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci1jb3JyZWxhdGlvbi1wbG90LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL2NvbmNvdXJzZS9qYXZhc2NyaXB0L2NvbmNvdXJzZS1hcHAvc3JjL2FwcC9hbmFseXRpY3MvY29tcG9uZW50cy91c2VyLWNvcnJlbGF0aW9uLXBsb3QvdXNlci1jb3JyZWxhdGlvbi1wbG90LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBLHdDQUEwQztBQUMxQyx1REFBaUQ7QUFFakQsOENBQXNDO0FBT3RDLElBQWEsNEJBQTRCLEdBQXpDLE1BQWEsNEJBQTRCO0lBUXZDLFlBQ1UsZ0JBQWtDO1FBQWxDLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7UUFMNUMsU0FBSSxHQUFVLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQ3pCLGVBQVUsR0FBRyxNQUFNLENBQUM7UUFNbEIsSUFBSSxDQUFDLGdCQUFnQixDQUFDLG1CQUFtQixFQUFFLENBQUMsSUFBSSxDQUFDLGdCQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLEVBQUU7WUFDeEUsTUFBTSxTQUFTLEdBQUcsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQ2xDLE1BQU0sY0FBYyxHQUFHLEVBQUUsQ0FBQztZQUMxQixLQUFLLE1BQU0sSUFBSSxJQUFJLFNBQVMsRUFBRTtnQkFDNUIsTUFBTSxlQUFlLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLGNBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztnQkFDbEYsSUFBSSxDQUFDLE1BQU0sR0FBRyxlQUFlLENBQUM7Z0JBQzlCLGNBQWMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7YUFDM0I7WUFDRCxJQUFJLENBQUMsWUFBWSxHQUFHLGNBQWMsQ0FBQztZQUNuQyxJQUFJLENBQUMsSUFBSSxHQUFHLGNBQWMsQ0FBQztRQUM3QixDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRCxRQUFRO1FBQ04sTUFBTSxJQUFJLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUM1QixJQUFJLElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDZixNQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDNUYsSUFBSSxDQUFDLElBQUksR0FBRyxRQUFRLENBQUM7U0FDdEI7YUFBTTtZQUNMLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQztTQUMvQjtJQUNILENBQUM7Q0FDRixDQUFBO0FBakNZLDRCQUE0QjtJQUx4QyxnQkFBUyxDQUFDO1FBQ1QsUUFBUSxFQUFFLDJCQUEyQjtRQUNyQyxXQUFXLEVBQUUsd0NBQXdDO1FBQ3JELFNBQVMsRUFBRSxDQUFDLHdDQUF3QyxDQUFDO0tBQ3RELENBQUM7R0FDVyw0QkFBNEIsQ0FpQ3hDO0FBakNZLG9FQUE0QiJ9