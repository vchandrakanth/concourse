"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
let BarChartComponent = class BarChartComponent {
    constructor() {
        this.view = [530, 350];
        this.showXAxis = true;
        this.showYAxis = true;
        this.gradient = false;
        this.showLegend = false;
        this.showXAxisLabel = true;
        this.xAxisLabel = 'Date';
        this.showYAxisLabel = true;
        this.colorScheme = {
            domain: ['#5AA454', '#A10A28', '#C7B42C']
        };
    }
};
__decorate([
    core_1.Input()
], BarChartComponent.prototype, "yAxisLabel", void 0);
__decorate([
    core_1.Input()
], BarChartComponent.prototype, "statsData", void 0);
BarChartComponent = __decorate([
    core_1.Component({
        selector: 'app-bar-chart',
        templateUrl: './bar-chart.component.html',
        styleUrls: ['./bar-chart.component.scss']
    })
], BarChartComponent);
exports.BarChartComponent = BarChartComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFyLWNoYXJ0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL2NvbmNvdXJzZS9qYXZhc2NyaXB0L2NvbmNvdXJzZS1hcHAvc3JjL2FwcC9kYXNoYm9hcmQvc3RhdHMvYmFyLWNoYXJ0L2Jhci1jaGFydC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQSx3Q0FBaUQ7QUFPakQsSUFBYSxpQkFBaUIsR0FBOUIsTUFBYSxpQkFBaUI7SUFBOUI7UUFHRSxTQUFJLEdBQVUsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDekIsY0FBUyxHQUFHLElBQUksQ0FBQztRQUNqQixjQUFTLEdBQUcsSUFBSSxDQUFDO1FBQ2pCLGFBQVEsR0FBRyxLQUFLLENBQUM7UUFDakIsZUFBVSxHQUFHLEtBQUssQ0FBQztRQUNuQixtQkFBYyxHQUFHLElBQUksQ0FBQztRQUN0QixlQUFVLEdBQUcsTUFBTSxDQUFDO1FBQ3BCLG1CQUFjLEdBQUcsSUFBSSxDQUFDO1FBQ3RCLGdCQUFXLEdBQUc7WUFDWixNQUFNLEVBQUUsQ0FBQyxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsQ0FBQztTQUMxQyxDQUFDO0lBRUosQ0FBQztDQUFBLENBQUE7QUFkVTtJQUFSLFlBQUssRUFBRTtxREFBbUI7QUFDbEI7SUFBUixZQUFLLEVBQUU7b0RBQWU7QUFGWixpQkFBaUI7SUFMN0IsZ0JBQVMsQ0FBQztRQUNULFFBQVEsRUFBRSxlQUFlO1FBQ3pCLFdBQVcsRUFBRSw0QkFBNEI7UUFDekMsU0FBUyxFQUFFLENBQUMsNEJBQTRCLENBQUM7S0FDMUMsQ0FBQztHQUNXLGlCQUFpQixDQWU3QjtBQWZZLDhDQUFpQiJ9