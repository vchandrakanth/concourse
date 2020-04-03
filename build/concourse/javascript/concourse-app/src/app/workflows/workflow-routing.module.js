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
const approval_details_component_1 = require("./approval/approval-details/approval-details.component");
const approval_tabular_view_component_1 = require("./approval/approval-tabular-view/approval-tabular-view.component");
const discovered_deployment_details_component_1 = require("./discovered-deployment/discovered-deployment-details/discovered-deployment-details.component");
const discovered_deployment_tabular_view_component_1 = require("./discovered-deployment/discovered-deployment-tabular-view/discovered-deployment-tabular-view.component");
const deployment_details_component_1 = require("./logical-deployment/deployment-details/deployment-details.component");
const deployment_tabular_view_component_1 = require("./logical-deployment/deployment-tabular-view/deployment-tabular-view.component");
const risk_details_component_1 = require("./risks/risk-details/risk-details.component");
const risk_tabular_view_component_1 = require("./risks/risk-tabular-view/risk-tabular-view.component");
const routes = [
    {
        path: 'approvals', component: approval_tabular_view_component_1.ApprovalTabularViewComponent, children: [
            { path: ':id', component: approval_details_component_1.ApprovalDetailsComponent }
        ]
    },
    { path: 'logical-deployments', component: deployment_tabular_view_component_1.DeploymentTabularViewComponent },
    { path: 'logical-deployments/:surfaceLayerId/:id', component: deployment_details_component_1.DeploymentDetailsComponent },
    {
        path: 'risks', component: risk_tabular_view_component_1.RiskTabularViewComponent, children: [
            { path: ':id', component: risk_details_component_1.RiskDetailsComponent }
        ]
    },
    { path: 'discovered-deployments', component: discovered_deployment_tabular_view_component_1.DiscoveredDeploymentTabularViewComponent },
    { path: 'discovered-deployments/:id', component: discovered_deployment_details_component_1.DiscoveredDeploymentDetailsComponent }
];
let WorkflowRoutingModule = class WorkflowRoutingModule {
};
WorkflowRoutingModule = __decorate([
    core_1.NgModule({
        imports: [router_1.RouterModule.forChild(routes)],
        exports: [router_1.RouterModule]
    })
], WorkflowRoutingModule);
exports.WorkflowRoutingModule = WorkflowRoutingModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid29ya2Zsb3ctcm91dGluZy5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9jb25jb3Vyc2UvamF2YXNjcmlwdC9jb25jb3Vyc2UtYXBwL3NyYy9hcHAvd29ya2Zsb3dzL3dvcmtmbG93LXJvdXRpbmcubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUEsd0NBQXlDO0FBQ3pDLDRDQUF1RDtBQUV2RCx1R0FBa0c7QUFDbEcsc0hBQWdIO0FBQ2hILDJKQUV1RztBQUN2RywwS0FFaUg7QUFDakgsdUhBQWtIO0FBQ2xILHNJQUFnSTtBQUNoSSx3RkFBbUY7QUFDbkYsdUdBQWlHO0FBRWpHLE1BQU0sTUFBTSxHQUFXO0lBQ3JCO1FBQ0UsSUFBSSxFQUFFLFdBQVcsRUFBRSxTQUFTLEVBQUUsOERBQTRCLEVBQUUsUUFBUSxFQUFFO1lBQ3BFLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUUscURBQXdCLEVBQUU7U0FDckQ7S0FDRjtJQUNELEVBQUUsSUFBSSxFQUFFLHFCQUFxQixFQUFFLFNBQVMsRUFBRSxrRUFBOEIsRUFBRTtJQUMxRSxFQUFFLElBQUksRUFBRSx5Q0FBeUMsRUFBRSxTQUFTLEVBQUUseURBQTBCLEVBQUU7SUFFMUY7UUFDRSxJQUFJLEVBQUUsT0FBTyxFQUFFLFNBQVMsRUFBRSxzREFBd0IsRUFBRSxRQUFRLEVBQUU7WUFDNUQsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBRSw2Q0FBb0IsRUFBRTtTQUNqRDtLQUNGO0lBQ0QsRUFBRSxJQUFJLEVBQUUsd0JBQXdCLEVBQUUsU0FBUyxFQUFFLHVGQUF3QyxFQUFFO0lBQ3ZGLEVBQUUsSUFBSSxFQUFFLDRCQUE0QixFQUFFLFNBQVMsRUFBRSw4RUFBb0MsRUFBRTtDQUN4RixDQUFDO0FBTUYsSUFBYSxxQkFBcUIsR0FBbEMsTUFBYSxxQkFBcUI7Q0FBSSxDQUFBO0FBQXpCLHFCQUFxQjtJQUpqQyxlQUFRLENBQUM7UUFDUixPQUFPLEVBQUUsQ0FBQyxxQkFBWSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUN4QyxPQUFPLEVBQUUsQ0FBQyxxQkFBWSxDQUFDO0tBQ3hCLENBQUM7R0FDVyxxQkFBcUIsQ0FBSTtBQUF6QixzREFBcUIifQ==