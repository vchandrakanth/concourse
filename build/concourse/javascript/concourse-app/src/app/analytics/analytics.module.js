"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@angular/common");
const core_1 = require("@angular/core");
const analytics_routing_module_1 = require("./analytics-routing.module");
const analytics_component_1 = require("./analytics/analytics.component");
const forms_1 = require("@angular/forms");
const shared_module_1 = require("@concourse/shared/shared.module");
const ngx_charts_1 = require("@swimlane/ngx-charts");
const ngx_datatable_1 = require("@swimlane/ngx-datatable");
const ngx_bootstrap_1 = require("ngx-bootstrap");
const activity_prediction_chart_component_1 = require("./components/activity-prediction-chart/activity-prediction-chart.component");
const user_correlation_plot_component_1 = require("./components/user-correlation-plot/user-correlation-plot.component");
let AnalyticsModule = class AnalyticsModule {
};
AnalyticsModule = __decorate([
    core_1.NgModule({
        declarations: [analytics_component_1.AnalyticsComponent, user_correlation_plot_component_1.UserCorrelationPlotComponent, activity_prediction_chart_component_1.ActivityPredictionChartComponent],
        imports: [
            common_1.CommonModule,
            analytics_routing_module_1.AnalyticsRoutingModule,
            ngx_charts_1.NgxChartsModule,
            ngx_datatable_1.NgxDatatableModule,
            shared_module_1.SharedModule,
            forms_1.FormsModule,
            ngx_bootstrap_1.TabsModule.forRoot()
        ],
        providers: [common_1.DatePipe]
    })
], AnalyticsModule);
exports.AnalyticsModule = AnalyticsModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5hbHl0aWNzLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL2NvbmNvdXJzZS9qYXZhc2NyaXB0L2NvbmNvdXJzZS1hcHAvc3JjL2FwcC9hbmFseXRpY3MvYW5hbHl0aWNzLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBLDRDQUF5RDtBQUN6RCx3Q0FBeUM7QUFFekMseUVBQW9FO0FBRXBFLHlFQUFxRTtBQUVyRSwwQ0FBNkM7QUFDN0MsbUVBQStEO0FBQy9ELHFEQUF1RDtBQUN2RCwyREFBNkQ7QUFDN0QsaURBQTJDO0FBQzNDLG9JQUE4SDtBQUM5SCx3SEFBa0g7QUFlbEgsSUFBYSxlQUFlLEdBQTVCLE1BQWEsZUFBZTtDQUFJLENBQUE7QUFBbkIsZUFBZTtJQWIzQixlQUFRLENBQUM7UUFDUixZQUFZLEVBQUUsQ0FBQyx3Q0FBa0IsRUFBRSw4REFBNEIsRUFBRSxzRUFBZ0MsQ0FBQztRQUNsRyxPQUFPLEVBQUU7WUFDUCxxQkFBWTtZQUNaLGlEQUFzQjtZQUN0Qiw0QkFBZTtZQUNmLGtDQUFrQjtZQUNsQiw0QkFBWTtZQUNaLG1CQUFXO1lBQ1gsMEJBQVUsQ0FBQyxPQUFPLEVBQUU7U0FDckI7UUFDRCxTQUFTLEVBQUUsQ0FBQyxpQkFBUSxDQUFDO0tBQ3RCLENBQUM7R0FDVyxlQUFlLENBQUk7QUFBbkIsMENBQWUifQ==