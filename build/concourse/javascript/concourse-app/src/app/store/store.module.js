"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const analytics_module_1 = require("./analytics/analytics.module");
const approval_module_1 = require("./approval/approval.module");
const asset_module_1 = require("./asset/asset.module");
const attribute_tag_module_1 = require("./attribute-tag/attribute-tag.module");
const audit_history_module_1 = require("./audit-history/audit-history.module");
const auth_module_1 = require("./auth/auth.module");
const aws_accounts_module_1 = require("./aws-accounts/aws-accounts.module");
const baseline_asset_module_1 = require("./baseline-asset/baseline-asset.module");
const catalog_service_module_1 = require("./catalog-service/catalog-service.module");
const cloud_role_assignment_module_1 = require("./cloud-role-assignments/cloud-role-assignment.module");
const cloud_role_module_1 = require("./cloud-role/cloud-role.module");
const dashboard_module_1 = require("./dashboard/dashboard.module");
const discovered_deployment_module_1 = require("./discovered-deployment/discovered-deployment.module");
const group_module_1 = require("./group/group.module");
const institution_data_module_1 = require("./institution-data/institution-data.module");
const institution_module_1 = require("./institution/institution.module");
const logical_deployment_module_1 = require("./logical-deployment/logical-deployment.module");
const policy_group_template_module_1 = require("./policy-group-template/policy-group-template.module");
const policy_group_module_1 = require("./policy-group/policy-group.module");
const policy_resolution_module_1 = require("./policy-resolution/policy-resolution.module");
const policy_template_module_1 = require("./policy-template/policy-template.module");
const policy_violation_module_1 = require("./policy-violation/policy-violation.module");
const reporting_module_1 = require("./reporting/reporting.module");
const role_module_1 = require("./role/role.module");
const surface_layer_module_1 = require("./surface-layer/surface-layer.module");
const surface_module_1 = require("./surface/surface.module");
const user_module_1 = require("./user/user.module");
const workflow_module_1 = require("./workflow/workflow.module");
let AppStoreModule = class AppStoreModule {
};
AppStoreModule = __decorate([
    core_1.NgModule({
        imports: [
            // Root
            auth_module_1.AuthStoreModule,
            user_module_1.UserStoreModule,
            surface_layer_module_1.SurfaceLayerStoreModule,
            role_module_1.RoleStoreModule,
            // Features
            analytics_module_1.AnalyticsStoreModule,
            approval_module_1.ApprovalStoreModule,
            asset_module_1.AssetsStoreModule,
            baseline_asset_module_1.BaselineAssetsStoreModule,
            attribute_tag_module_1.AttributeTagStoreModule,
            audit_history_module_1.AuditHistoryStoreModule,
            aws_accounts_module_1.AwsAccountsStoreModule,
            catalog_service_module_1.CatalogServiceModule,
            cloud_role_assignment_module_1.CloudRoleAssignmentStoreModule,
            cloud_role_module_1.CloudRoleStoreModule,
            dashboard_module_1.DashboardStoreModule,
            discovered_deployment_module_1.DiscoveredDeploymentStoreModule,
            group_module_1.GroupStoreModule,
            institution_data_module_1.InstitutionDataStoreModule,
            institution_module_1.InstitutionStoreModule,
            logical_deployment_module_1.LogicalDeploymentStoreModule,
            policy_group_module_1.PolicyGroupStoreModule,
            policy_group_template_module_1.PolicyGroupTemplateStoreModule,
            policy_resolution_module_1.PolicyStoreResolutionModule,
            policy_template_module_1.PolicyTemplateStoreModule,
            policy_violation_module_1.PolicyViolationStoreModule,
            reporting_module_1.ReportingStoreModule,
            surface_module_1.SurfaceStoreModule,
            workflow_module_1.WorkflowStoreModule
        ]
    })
], AppStoreModule);
exports.AppStoreModule = AppStoreModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RvcmUubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vY29uY291cnNlL2phdmFzY3JpcHQvY29uY291cnNlLWFwcC9zcmMvYXBwL3N0b3JlL3N0b3JlLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBLHdDQUF5QztBQUV6QyxtRUFBb0U7QUFDcEUsZ0VBQWlFO0FBQ2pFLHVEQUF5RDtBQUN6RCwrRUFBK0U7QUFDL0UsK0VBQStFO0FBQy9FLG9EQUFxRDtBQUNyRCw0RUFBMkU7QUFDM0Usa0ZBQW1GO0FBQ25GLHFGQUFnRjtBQUNoRix3R0FBdUc7QUFDdkcsc0VBQXNFO0FBQ3RFLG1FQUFvRTtBQUNwRSx1R0FBdUc7QUFDdkcsdURBQXdEO0FBQ3hELHdGQUF3RjtBQUN4Rix5RUFBMEU7QUFDMUUsOEZBQThGO0FBQzlGLHVHQUFzRztBQUN0Ryw0RUFBNEU7QUFDNUUsMkZBQTJGO0FBQzNGLHFGQUFxRjtBQUNyRix3RkFBd0Y7QUFDeEYsbUVBQW9FO0FBQ3BFLG9EQUFxRDtBQUNyRCwrRUFBK0U7QUFDL0UsNkRBQThEO0FBQzlELG9EQUFxRDtBQUNyRCxnRUFBaUU7QUFtQ2pFLElBQWEsY0FBYyxHQUEzQixNQUFhLGNBQWM7Q0FBSSxDQUFBO0FBQWxCLGNBQWM7SUFsQzFCLGVBQVEsQ0FBQztRQUNSLE9BQU8sRUFBRTtZQUNQLE9BQU87WUFDUCw2QkFBZTtZQUNmLDZCQUFlO1lBQ2YsOENBQXVCO1lBQ3ZCLDZCQUFlO1lBQ2YsV0FBVztZQUNYLHVDQUFvQjtZQUNwQixxQ0FBbUI7WUFDbkIsZ0NBQWlCO1lBQ2pCLGlEQUF5QjtZQUN6Qiw4Q0FBdUI7WUFDdkIsOENBQXVCO1lBQ3ZCLDRDQUFzQjtZQUN0Qiw2Q0FBb0I7WUFDcEIsNkRBQThCO1lBQzlCLHdDQUFvQjtZQUNwQix1Q0FBb0I7WUFDcEIsOERBQStCO1lBQy9CLCtCQUFnQjtZQUNoQixvREFBMEI7WUFDMUIsMkNBQXNCO1lBQ3RCLHdEQUE0QjtZQUM1Qiw0Q0FBc0I7WUFDdEIsNkRBQThCO1lBQzlCLHNEQUEyQjtZQUMzQixrREFBeUI7WUFDekIsb0RBQTBCO1lBQzFCLHVDQUFvQjtZQUNwQixtQ0FBa0I7WUFDbEIscUNBQW1CO1NBQ3BCO0tBQ0YsQ0FBQztHQUNXLGNBQWMsQ0FBSTtBQUFsQix3Q0FBYyJ9