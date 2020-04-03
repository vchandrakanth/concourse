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
const forms_1 = require("@angular/forms");
const angular_fontawesome_1 = require("@fortawesome/angular-fontawesome");
const ng_select_1 = require("@ng-select/ng-select");
const ngx_charts_1 = require("@swimlane/ngx-charts");
const accordion_1 = require("ngx-bootstrap/accordion");
const tabs_1 = require("ngx-bootstrap/tabs");
const shared_module_1 = require("@concourse/shared/shared.module");
const ngx_echarts_1 = require("ngx-echarts");
const dashboard_metrics_component_1 = require("./dashboard-metrics/dashboard-metrics.component");
const dashboard_quicklaunch_component_1 = require("./dashboard-quicklaunch/dashboard-quicklaunch.component");
const dashboard_routing_module_1 = require("./dashboard-routing.module");
const dashboard_with_widgets_component_1 = require("./dashboard-with-widgets/dashboard-with-widgets.component");
const map_chart_component_1 = require("./dashboard-with-widgets/map-chart/map-chart.component");
const dashboard_component_1 = require("./dashboard/dashboard.component");
const policy_group_widget_component_1 = require("./policy-group-widget/policy-group-widget.component");
const bar_chart_component_1 = require("./stats/bar-chart/bar-chart.component");
const stats_filter_component_1 = require("./stats/stats-filter/stats-filter.component");
const stats_component_1 = require("./stats/stats.component");
const user_widget_component_1 = require("./user-widget/user-widget.component");
const workflow_widget_component_1 = require("./workflow-widget/workflow-widget.component");
const ngx_countup_1 = require("ngx-countup");
let DashboardModule = class DashboardModule {
};
DashboardModule = __decorate([
    core_1.NgModule({
        imports: [
            common_1.CommonModule,
            forms_1.ReactiveFormsModule,
            angular_fontawesome_1.FontAwesomeModule,
            ngx_charts_1.NgxChartsModule,
            ngx_echarts_1.NgxEchartsModule,
            accordion_1.AccordionModule.forRoot(),
            tabs_1.TabsModule.forRoot(),
            shared_module_1.SharedModule,
            dashboard_routing_module_1.DashboardRoutingModule,
            ng_select_1.NgSelectModule,
            ngx_countup_1.CountUpModule
        ],
        declarations: [
            dashboard_component_1.DashboardComponent,
            policy_group_widget_component_1.PolicyGroupWidgetComponent,
            user_widget_component_1.UserWidgetComponent,
            workflow_widget_component_1.WorkflowWidgetComponent,
            dashboard_quicklaunch_component_1.DashboardQuicklaunchComponent,
            stats_component_1.StatsComponent,
            stats_filter_component_1.StatsFilterComponent,
            bar_chart_component_1.BarChartComponent,
            dashboard_with_widgets_component_1.DashboardWithWidgetsComponent,
            map_chart_component_1.MapChartComponent,
            dashboard_metrics_component_1.DashboardMetricsComponent
        ]
    })
], DashboardModule);
exports.DashboardModule = DashboardModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGFzaGJvYXJkLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL2NvbmNvdXJzZS9qYXZhc2NyaXB0L2NvbmNvdXJzZS1hcHAvc3JjL2FwcC9kYXNoYm9hcmQvZGFzaGJvYXJkLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBLDRDQUErQztBQUMvQyx3Q0FBeUM7QUFDekMsMENBQXFEO0FBQ3JELDBFQUFxRTtBQUNyRSxvREFBc0Q7QUFDdEQscURBQXVEO0FBQ3ZELHVEQUEwRDtBQUMxRCw2Q0FBZ0Q7QUFFaEQsbUVBQStEO0FBQy9ELDZDQUErQztBQUMvQyxpR0FBNEY7QUFDNUYsNkdBQXdHO0FBQ3hHLHlFQUFvRTtBQUNwRSxnSEFBMEc7QUFDMUcsZ0dBQTJGO0FBQzNGLHlFQUFxRTtBQUNyRSx1R0FBaUc7QUFDakcsK0VBQTBFO0FBQzFFLHdGQUFtRjtBQUNuRiw2REFBeUQ7QUFDekQsK0VBQTBFO0FBQzFFLDJGQUFzRjtBQUN0Riw2Q0FBNEM7QUE4QjVDLElBQWEsZUFBZSxHQUE1QixNQUFhLGVBQWU7Q0FBSSxDQUFBO0FBQW5CLGVBQWU7SUE1QjNCLGVBQVEsQ0FBQztRQUNSLE9BQU8sRUFBRTtZQUNQLHFCQUFZO1lBQ1osMkJBQW1CO1lBQ25CLHVDQUFpQjtZQUNqQiw0QkFBZTtZQUNmLDhCQUFnQjtZQUNoQiwyQkFBZSxDQUFDLE9BQU8sRUFBRTtZQUN6QixpQkFBVSxDQUFDLE9BQU8sRUFBRTtZQUNwQiw0QkFBWTtZQUNaLGlEQUFzQjtZQUN0QiwwQkFBYztZQUNkLDJCQUFhO1NBQ2Q7UUFDRCxZQUFZLEVBQUU7WUFDWix3Q0FBa0I7WUFDbEIsMERBQTBCO1lBQzFCLDJDQUFtQjtZQUNuQixtREFBdUI7WUFDdkIsK0RBQTZCO1lBQzdCLGdDQUFjO1lBQ2QsNkNBQW9CO1lBQ3BCLHVDQUFpQjtZQUNqQixnRUFBNkI7WUFDN0IsdUNBQWlCO1lBQ2pCLHVEQUF5QjtTQUMxQjtLQUNGLENBQUM7R0FDVyxlQUFlLENBQUk7QUFBbkIsMENBQWUifQ==