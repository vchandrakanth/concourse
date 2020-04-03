"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const router_1 = require("@angular/router");
const dashboard_metrics_component_1 = require("./dashboard-metrics/dashboard-metrics.component");
const dashboard_with_widgets_component_1 = require("./dashboard-with-widgets/dashboard-with-widgets.component");
const stats_component_1 = require("./stats/stats.component");
const routes = [
    { path: '', component: dashboard_metrics_component_1.DashboardMetricsComponent },
    { path: 'stats', component: stats_component_1.StatsComponent },
    { path: 'widgets', component: dashboard_with_widgets_component_1.DashboardWithWidgetsComponent }
];
let DashboardRoutingModule = class DashboardRoutingModule {
};
DashboardRoutingModule = __decorate([
    core_1.NgModule({
        imports: [router_1.RouterModule.forChild(routes)],
        exports: [router_1.RouterModule]
    })
], DashboardRoutingModule);
exports.DashboardRoutingModule = DashboardRoutingModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGFzaGJvYXJkLXJvdXRpbmcubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vY29uY291cnNlL2phdmFzY3JpcHQvY29uY291cnNlLWFwcC9zcmMvYXBwL2Rhc2hib2FyZC9kYXNoYm9hcmQtcm91dGluZy5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQSx3Q0FBeUM7QUFDekMsNENBQXVEO0FBRXZELGlHQUE0RjtBQUM1RixnSEFBMEc7QUFDMUcsNkRBQXlEO0FBRXpELE1BQU0sTUFBTSxHQUFXO0lBQ3JCLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRSxTQUFTLEVBQUUsdURBQXlCLEVBQUU7SUFDbEQsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLFNBQVMsRUFBRSxnQ0FBYyxFQUFFO0lBQzVDLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsZ0VBQTZCLEVBQUU7Q0FDOUQsQ0FBQztBQU1GLElBQWEsc0JBQXNCLEdBQW5DLE1BQWEsc0JBQXNCO0NBQUksQ0FBQTtBQUExQixzQkFBc0I7SUFKbEMsZUFBUSxDQUFDO1FBQ1IsT0FBTyxFQUFFLENBQUMscUJBQVksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDeEMsT0FBTyxFQUFFLENBQUMscUJBQVksQ0FBQztLQUN4QixDQUFDO0dBQ1csc0JBQXNCLENBQUk7QUFBMUIsd0RBQXNCIn0=