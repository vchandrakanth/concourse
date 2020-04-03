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
const ngx_codemirror_1 = require("@ctrl/ngx-codemirror");
const angular_fontawesome_1 = require("@fortawesome/angular-fontawesome");
const ng_select_1 = require("@ng-select/ng-select");
const ngx_datatable_1 = require("@swimlane/ngx-datatable");
const alert_1 = require("ngx-bootstrap/alert");
const dropdown_1 = require("ngx-bootstrap/dropdown");
const modal_1 = require("ngx-bootstrap/modal");
const tabs_1 = require("ngx-bootstrap/tabs");
const ngx_pipes_1 = require("ngx-pipes");
const shared_module_1 = require("@concourse/shared/shared.module");
const approval_details_component_1 = require("./approval/approval-details/approval-details.component");
const approval_tabular_view_component_1 = require("./approval/approval-tabular-view/approval-tabular-view.component");
const discovered_deployment_details_component_1 = require("./discovered-deployment/discovered-deployment-details/discovered-deployment-details.component");
const discovered_deployment_tabular_view_component_1 = require("./discovered-deployment/discovered-deployment-tabular-view/discovered-deployment-tabular-view.component");
const deployment_details_component_1 = require("./logical-deployment/deployment-details/deployment-details.component");
const deployment_tabular_view_component_1 = require("./logical-deployment/deployment-tabular-view/deployment-tabular-view.component");
const risk_details_component_1 = require("./risks/risk-details/risk-details.component");
const risk_tabular_view_component_1 = require("./risks/risk-tabular-view/risk-tabular-view.component");
const actions_list_component_1 = require("./shared/actions-list/actions-list.component");
const comment_box_form_component_1 = require("./shared/comment-box-form/comment-box-form.component");
const resource_timeline_component_1 = require("./shared/resource-timeline/resource-timeline.component");
const workflow_routing_module_1 = require("./workflow-routing.module");
let WorkflowsModule = class WorkflowsModule {
};
WorkflowsModule = __decorate([
    core_1.NgModule({
        imports: [
            common_1.CommonModule,
            forms_1.FormsModule,
            forms_1.ReactiveFormsModule,
            angular_fontawesome_1.FontAwesomeModule,
            ngx_datatable_1.NgxDatatableModule,
            ng_select_1.NgSelectModule,
            alert_1.AlertModule.forRoot(),
            modal_1.ModalModule.forRoot(),
            tabs_1.TabsModule.forRoot(),
            dropdown_1.BsDropdownModule.forRoot(),
            ngx_pipes_1.NgArrayPipesModule,
            ngx_pipes_1.NgStringPipesModule,
            ngx_codemirror_1.CodemirrorModule,
            shared_module_1.SharedModule,
            workflow_routing_module_1.WorkflowRoutingModule
        ],
        declarations: [
            approval_details_component_1.ApprovalDetailsComponent,
            approval_tabular_view_component_1.ApprovalTabularViewComponent,
            comment_box_form_component_1.CommentBoxFormComponent,
            deployment_details_component_1.DeploymentDetailsComponent,
            deployment_tabular_view_component_1.DeploymentTabularViewComponent,
            discovered_deployment_details_component_1.DiscoveredDeploymentDetailsComponent,
            discovered_deployment_tabular_view_component_1.DiscoveredDeploymentTabularViewComponent,
            risk_details_component_1.RiskDetailsComponent,
            risk_tabular_view_component_1.RiskTabularViewComponent,
            actions_list_component_1.ActionsListComponent,
            resource_timeline_component_1.ResourceTimelineComponent
        ]
    })
], WorkflowsModule);
exports.WorkflowsModule = WorkflowsModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid29ya2Zsb3dzLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL2NvbmNvdXJzZS9qYXZhc2NyaXB0L2NvbmNvdXJzZS1hcHAvc3JjL2FwcC93b3JrZmxvd3Mvd29ya2Zsb3dzLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBLDRDQUErQztBQUMvQyx3Q0FBeUM7QUFDekMsMENBQWtFO0FBQ2xFLHlEQUF3RDtBQUN4RCwwRUFBcUU7QUFDckUsb0RBQXNEO0FBQ3RELDJEQUE2RDtBQUM3RCwrQ0FBa0Q7QUFDbEQscURBQTBEO0FBQzFELCtDQUFrRDtBQUNsRCw2Q0FBZ0Q7QUFDaEQseUNBQW9FO0FBRXBFLG1FQUErRDtBQUMvRCx1R0FBa0c7QUFDbEcsc0hBQWdIO0FBQ2hILDJKQUV1RztBQUN2RywwS0FFaUg7QUFDakgsdUhBQWtIO0FBQ2xILHNJQUFnSTtBQUNoSSx3RkFBbUY7QUFDbkYsdUdBQWlHO0FBQ2pHLHlGQUFvRjtBQUNwRixxR0FBK0Y7QUFDL0Ysd0dBQW1HO0FBQ25HLHVFQUFrRTtBQW1DbEUsSUFBYSxlQUFlLEdBQTVCLE1BQWEsZUFBZTtDQUFJLENBQUE7QUFBbkIsZUFBZTtJQWpDM0IsZUFBUSxDQUFDO1FBQ1IsT0FBTyxFQUFFO1lBQ1AscUJBQVk7WUFDWixtQkFBVztZQUNYLDJCQUFtQjtZQUNuQix1Q0FBaUI7WUFDakIsa0NBQWtCO1lBQ2xCLDBCQUFjO1lBQ2QsbUJBQVcsQ0FBQyxPQUFPLEVBQUU7WUFDckIsbUJBQVcsQ0FBQyxPQUFPLEVBQUU7WUFDckIsaUJBQVUsQ0FBQyxPQUFPLEVBQUU7WUFDcEIsMkJBQWdCLENBQUMsT0FBTyxFQUFFO1lBQzFCLDhCQUFrQjtZQUNsQiwrQkFBbUI7WUFDbkIsaUNBQWdCO1lBQ2hCLDRCQUFZO1lBQ1osK0NBQXFCO1NBQ3RCO1FBQ0QsWUFBWSxFQUFFO1lBQ1oscURBQXdCO1lBQ3hCLDhEQUE0QjtZQUM1QixvREFBdUI7WUFDdkIseURBQTBCO1lBQzFCLGtFQUE4QjtZQUM5Qiw4RUFBb0M7WUFDcEMsdUZBQXdDO1lBQ3hDLDZDQUFvQjtZQUNwQixzREFBd0I7WUFDeEIsNkNBQW9CO1lBQ3BCLHVEQUF5QjtTQUMxQjtLQUVGLENBQUM7R0FDVyxlQUFlLENBQUk7QUFBbkIsMENBQWUifQ==