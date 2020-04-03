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
const accordion_1 = require("ngx-bootstrap/accordion");
const ngx_pipes_1 = require("ngx-pipes");
const shared_module_1 = require("../shared.module");
const policy_template_form_group_directive_1 = require("./policy-template-form-group.directive");
const policy_template_form_component_1 = require("./policy-template-form.component");
const aws_products_component_1 = require("./templates/aws-products/aws-products.component");
const aws_regions_component_1 = require("./templates/aws-regions/aws-regions.component");
const aws_resources_component_1 = require("./templates/aws-resources/aws-resources.component");
const azure_activity_log_audit_in_resources_component_1 = require("./templates/azure-activity-log-audit-in-resources/azure-activity-log-audit-in-resources.component");
const connection_specification_component_1 = require("./templates/components/connection-specification/connection-specification.component");
const invariant_json_form_component_1 = require("./templates/components/invariant-json-form/invariant-json-form.component");
const external_network_whitelist_in_stacks_component_1 = require("./templates/external-network-whitelist-in-stacks/external-network-whitelist-in-stacks.component");
const invariant_definition_policy_component_1 = require("./templates/invariant-definition-policy/invariant-definition-policy.component");
const network_connectivity_component_1 = require("./templates/network-connectivity/network-connectivity.component");
const non_configurable_policy_template_component_1 = require("./templates/non-configurable-policy-template/non-configurable-policy-template.component");
const require_approval_component_1 = require("./templates/require-approval/require-approval.component");
const resident_limit_policy_template_component_1 = require("./templates/resident-limit-policy-template/resident-limit-policy-template.component");
const secure_perimeter_in_accounts_component_1 = require("./templates/secure-perimeter-in-accounts/secure-perimeter-in-accounts.component");
const secure_perimeter_in_stacks_component_1 = require("./templates/secure-perimeter-in-stacks/secure-perimeter-in-stacks.component");
const temporal_invariant_resources_in_subscriptions_component_1 = require("./templates/temporal-invariant-resources-in-subscriptions/temporal-invariant-resources-in-subscriptions.component");
const unsupported_component_1 = require("./templates/unsupported/unsupported.component");
const entryComponents = [
    azure_activity_log_audit_in_resources_component_1.AzureActivityLogAuditInResourcesComponent,
    invariant_definition_policy_component_1.InvariantDefinitionPolicyComponent,
    unsupported_component_1.PolicyUnsupportedComponent,
    require_approval_component_1.RequireApprovalComponent,
    aws_regions_component_1.AwsRegionsComponent,
    aws_resources_component_1.AwsResourcesComponent,
    aws_products_component_1.AwsProductsComponent,
    non_configurable_policy_template_component_1.NonConfigurablePolicyTemplate,
    secure_perimeter_in_accounts_component_1.SecurePerimeterInAccountsComponent,
    temporal_invariant_resources_in_subscriptions_component_1.TemporalInvariantResourcesInSubscriptionsComponent,
    external_network_whitelist_in_stacks_component_1.ExternalNetworkWhitelistInStacksComponent,
    resident_limit_policy_template_component_1.ResidentLimitPolicyTemplateComponent,
    network_connectivity_component_1.NetworkConnectivityComponent,
    secure_perimeter_in_stacks_component_1.SecurePerimeterInStacksComponent
];
let PolicyTemplateFormV2Module = class PolicyTemplateFormV2Module {
};
PolicyTemplateFormV2Module = __decorate([
    core_1.NgModule({
        imports: [
            common_1.CommonModule,
            forms_1.FormsModule,
            forms_1.ReactiveFormsModule,
            ngx_codemirror_1.CodemirrorModule,
            angular_fontawesome_1.FontAwesomeModule,
            accordion_1.AccordionModule.forRoot(),
            ng_select_1.NgSelectModule,
            ngx_pipes_1.NgArrayPipesModule,
            ngx_pipes_1.NgObjectPipesModule,
            ngx_pipes_1.NgStringPipesModule,
            shared_module_1.SharedModule
        ],
        declarations: [
            policy_template_form_group_directive_1.PolicyTemplateFormGroupDirective,
            policy_template_form_component_1.PolicyTemplateFormComponent,
            invariant_json_form_component_1.InvariantJsonBuilderComponent,
            connection_specification_component_1.ConnectionSpecificationComponent,
            ...entryComponents
        ],
        entryComponents: [...entryComponents],
        exports: [policy_template_form_component_1.PolicyTemplateFormComponent]
    })
], PolicyTemplateFormV2Module);
exports.PolicyTemplateFormV2Module = PolicyTemplateFormV2Module;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9saWN5LXRlbXBsYXRlLWZvcm0tdjIubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vY29uY291cnNlL2phdmFzY3JpcHQvY29uY291cnNlLWFwcC9zcmMvYXBwL3NoYXJlZC9wb2xpY3ktdGVtcGxhdGUtZm9ybS12Mi9wb2xpY3ktdGVtcGxhdGUtZm9ybS12Mi5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQSw0Q0FBK0M7QUFDL0Msd0NBQXlDO0FBQ3pDLDBDQUFrRTtBQUNsRSx5REFBd0Q7QUFDeEQsMEVBQXFFO0FBQ3JFLG9EQUFzRDtBQUN0RCx1REFBMEQ7QUFDMUQseUNBQXlGO0FBRXpGLG9EQUFnRDtBQUNoRCxpR0FBMEY7QUFDMUYscUZBQStFO0FBRS9FLDRGQUF1RjtBQUN2Rix5RkFBb0Y7QUFDcEYsK0ZBQTBGO0FBQzFGLHVLQUE4SjtBQUM5SiwySUFBc0k7QUFDdEksNEhBQXlIO0FBQ3pILG9LQUE0SjtBQUM1Six5SUFBbUk7QUFDbkksb0hBQStHO0FBQy9HLHdKQUF1STtBQUN2SSx3R0FBbUc7QUFDbkcsa0pBQTJJO0FBQzNJLDRJQUFxSTtBQUNySSxzSUFBK0g7QUFDL0gsK0xBQXVMO0FBQ3ZMLHlGQUEyRjtBQUUzRixNQUFNLGVBQWUsR0FBRztJQUN0QiwyRkFBeUM7SUFDekMsMEVBQWtDO0lBQ2xDLGtEQUEwQjtJQUMxQixxREFBd0I7SUFDeEIsMkNBQW1CO0lBQ25CLCtDQUFxQjtJQUNyQiw2Q0FBb0I7SUFDcEIsMEVBQTZCO0lBQzdCLDJFQUFrQztJQUNsQyw0R0FBa0Q7SUFDbEQsMEZBQXlDO0lBQ3pDLCtFQUFvQztJQUNwQyw2REFBNEI7SUFDNUIsdUVBQWdDO0NBQ2pDLENBQUM7QUEwQkYsSUFBYSwwQkFBMEIsR0FBdkMsTUFBYSwwQkFBMEI7Q0FBSSxDQUFBO0FBQTlCLDBCQUEwQjtJQXhCdEMsZUFBUSxDQUFDO1FBQ1IsT0FBTyxFQUFFO1lBQ1AscUJBQVk7WUFDWixtQkFBVztZQUNYLDJCQUFtQjtZQUNuQixpQ0FBZ0I7WUFDaEIsdUNBQWlCO1lBQ2pCLDJCQUFlLENBQUMsT0FBTyxFQUFFO1lBQ3pCLDBCQUFjO1lBQ2QsOEJBQWtCO1lBQ2xCLCtCQUFtQjtZQUNuQiwrQkFBbUI7WUFDbkIsNEJBQVk7U0FDYjtRQUNELFlBQVksRUFBRTtZQUNaLHVFQUFnQztZQUNoQyw0REFBMkI7WUFDM0IsNkRBQTZCO1lBQzdCLHFFQUFnQztZQUNoQyxHQUFHLGVBQWU7U0FDbkI7UUFDRCxlQUFlLEVBQUUsQ0FBQyxHQUFHLGVBQWUsQ0FBQztRQUNyQyxPQUFPLEVBQUUsQ0FBQyw0REFBMkIsQ0FBQztLQUN2QyxDQUFDO0dBQ1csMEJBQTBCLENBQUk7QUFBOUIsZ0VBQTBCIn0=