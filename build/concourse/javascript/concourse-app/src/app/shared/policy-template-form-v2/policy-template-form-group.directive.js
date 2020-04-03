"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const aws_products_component_1 = require("./templates/aws-products/aws-products.component");
const aws_regions_component_1 = require("./templates/aws-regions/aws-regions.component");
const aws_resources_component_1 = require("./templates/aws-resources/aws-resources.component");
const azure_activity_log_audit_in_resources_component_1 = require("./templates/azure-activity-log-audit-in-resources/azure-activity-log-audit-in-resources.component");
const external_network_whitelist_in_stacks_component_1 = require("./templates/external-network-whitelist-in-stacks/external-network-whitelist-in-stacks.component");
const invariant_definition_policy_component_1 = require("./templates/invariant-definition-policy/invariant-definition-policy.component");
const network_connectivity_component_1 = require("./templates/network-connectivity/network-connectivity.component");
const non_configurable_policy_template_component_1 = require("./templates/non-configurable-policy-template/non-configurable-policy-template.component");
const require_approval_component_1 = require("./templates/require-approval/require-approval.component");
const resident_limit_policy_template_component_1 = require("./templates/resident-limit-policy-template/resident-limit-policy-template.component");
const secure_perimeter_in_accounts_component_1 = require("./templates/secure-perimeter-in-accounts/secure-perimeter-in-accounts.component");
const secure_perimeter_in_stacks_component_1 = require("./templates/secure-perimeter-in-stacks/secure-perimeter-in-stacks.component");
const temporal_invariant_resources_in_subscriptions_component_1 = require("./templates/temporal-invariant-resources-in-subscriptions/temporal-invariant-resources-in-subscriptions.component");
const components = {
    10001: secure_perimeter_in_stacks_component_1.SecurePerimeterInStacksComponent,
    10002: non_configurable_policy_template_component_1.NonConfigurablePolicyTemplate,
    10003: non_configurable_policy_template_component_1.NonConfigurablePolicyTemplate,
    10004: non_configurable_policy_template_component_1.NonConfigurablePolicyTemplate,
    10005: non_configurable_policy_template_component_1.NonConfigurablePolicyTemplate,
    10006: aws_products_component_1.AwsProductsComponent,
    10007: aws_regions_component_1.AwsRegionsComponent,
    10010: require_approval_component_1.RequireApprovalComponent,
    10011: network_connectivity_component_1.NetworkConnectivityComponent,
    10012: external_network_whitelist_in_stacks_component_1.ExternalNetworkWhitelistInStacksComponent,
    10013: aws_resources_component_1.AwsResourcesComponent,
    10014: invariant_definition_policy_component_1.InvariantDefinitionPolicyComponent,
    10015: temporal_invariant_resources_in_subscriptions_component_1.TemporalInvariantResourcesInSubscriptionsComponent,
    10020: non_configurable_policy_template_component_1.NonConfigurablePolicyTemplate,
    10021: non_configurable_policy_template_component_1.NonConfigurablePolicyTemplate,
    10022: non_configurable_policy_template_component_1.NonConfigurablePolicyTemplate,
    10023: aws_products_component_1.AwsProductsComponent,
    10024: secure_perimeter_in_accounts_component_1.SecurePerimeterInAccountsComponent,
    10025: non_configurable_policy_template_component_1.NonConfigurablePolicyTemplate,
    10026: non_configurable_policy_template_component_1.NonConfigurablePolicyTemplate,
    10027: non_configurable_policy_template_component_1.NonConfigurablePolicyTemplate,
    10028: non_configurable_policy_template_component_1.NonConfigurablePolicyTemplate,
    10029: non_configurable_policy_template_component_1.NonConfigurablePolicyTemplate,
    10030: non_configurable_policy_template_component_1.NonConfigurablePolicyTemplate,
    10031: azure_activity_log_audit_in_resources_component_1.AzureActivityLogAuditInResourcesComponent,
    10032: resident_limit_policy_template_component_1.ResidentLimitPolicyTemplateComponent
};
let PolicyTemplateFormGroupDirective = class PolicyTemplateFormGroupDirective {
    constructor(resolver, container) {
        this.resolver = resolver;
        this.container = container;
    }
    ngOnInit() {
        const component = this.resolver.resolveComponentFactory(components[this.policyTemplate.id]);
        this.component = this.container.createComponent(component);
        this.component.instance.policyTemplate = this.policyTemplate;
    }
};
__decorate([
    core_1.Input()
], PolicyTemplateFormGroupDirective.prototype, "policyTemplate", void 0);
PolicyTemplateFormGroupDirective = __decorate([
    core_1.Directive({
        // tslint:disable-next-line:directive-selector
        selector: '[policyTemplateFormGroup]'
    })
], PolicyTemplateFormGroupDirective);
exports.PolicyTemplateFormGroupDirective = PolicyTemplateFormGroupDirective;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9saWN5LXRlbXBsYXRlLWZvcm0tZ3JvdXAuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vY29uY291cnNlL2phdmFzY3JpcHQvY29uY291cnNlLWFwcC9zcmMvYXBwL3NoYXJlZC9wb2xpY3ktdGVtcGxhdGUtZm9ybS12Mi9wb2xpY3ktdGVtcGxhdGUtZm9ybS1ncm91cC5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQSx3Q0FRdUI7QUFHdkIsNEZBQXVGO0FBQ3ZGLHlGQUFvRjtBQUNwRiwrRkFBMEY7QUFDMUYsdUtBQThKO0FBQzlKLG9LQUEySjtBQUMzSix5SUFBbUk7QUFDbkksb0hBQStHO0FBQy9HLHdKQUF1STtBQUN2SSx3R0FBbUc7QUFDbkcsa0pBQTJJO0FBQzNJLDRJQUFvSTtBQUNwSSxzSUFBK0g7QUFDL0gsK0xBQXNMO0FBR3RMLE1BQU0sVUFBVSxHQUE4QztJQUM1RCxLQUFLLEVBQUUsdUVBQWdDO0lBQ3ZDLEtBQUssRUFBRSwwRUFBNkI7SUFDcEMsS0FBSyxFQUFFLDBFQUE2QjtJQUNwQyxLQUFLLEVBQUUsMEVBQTZCO0lBQ3BDLEtBQUssRUFBRSwwRUFBNkI7SUFDcEMsS0FBSyxFQUFFLDZDQUFvQjtJQUMzQixLQUFLLEVBQUUsMkNBQW1CO0lBQzFCLEtBQUssRUFBRSxxREFBd0I7SUFDL0IsS0FBSyxFQUFFLDZEQUE0QjtJQUNuQyxLQUFLLEVBQUUsMEZBQXlDO0lBQ2hELEtBQUssRUFBRSwrQ0FBcUI7SUFDNUIsS0FBSyxFQUFFLDBFQUFrQztJQUN6QyxLQUFLLEVBQUUsNEdBQWtEO0lBQ3pELEtBQUssRUFBRSwwRUFBNkI7SUFDcEMsS0FBSyxFQUFFLDBFQUE2QjtJQUNwQyxLQUFLLEVBQUUsMEVBQTZCO0lBQ3BDLEtBQUssRUFBRSw2Q0FBb0I7SUFDM0IsS0FBSyxFQUFFLDJFQUFrQztJQUN6QyxLQUFLLEVBQUUsMEVBQTZCO0lBQ3BDLEtBQUssRUFBRSwwRUFBNkI7SUFDcEMsS0FBSyxFQUFFLDBFQUE2QjtJQUNwQyxLQUFLLEVBQUUsMEVBQTZCO0lBQ3BDLEtBQUssRUFBRSwwRUFBNkI7SUFDcEMsS0FBSyxFQUFFLDBFQUE2QjtJQUNwQyxLQUFLLEVBQUUsMkZBQXlDO0lBQ2hELEtBQUssRUFBRSwrRUFBb0M7Q0FDNUMsQ0FBQztBQU1GLElBQWEsZ0NBQWdDLEdBQTdDLE1BQWEsZ0NBQWdDO0lBSTNDLFlBQ21CLFFBQWtDLEVBQ2xDLFNBQTJCO1FBRDNCLGFBQVEsR0FBUixRQUFRLENBQTBCO1FBQ2xDLGNBQVMsR0FBVCxTQUFTLENBQWtCO0lBQzFDLENBQUM7SUFFTCxRQUFRO1FBRU4sTUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyx1QkFBdUIsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQzVGLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxlQUFlLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDM0QsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUM7SUFDL0QsQ0FBQztDQUVGLENBQUE7QUFmVTtJQUFSLFlBQUssRUFBRTt3RUFBZ0M7QUFEN0IsZ0NBQWdDO0lBSjVDLGdCQUFTLENBQUM7UUFDVCw4Q0FBOEM7UUFDOUMsUUFBUSxFQUFFLDJCQUEyQjtLQUN0QyxDQUFDO0dBQ1csZ0NBQWdDLENBZ0I1QztBQWhCWSw0RUFBZ0MifQ==