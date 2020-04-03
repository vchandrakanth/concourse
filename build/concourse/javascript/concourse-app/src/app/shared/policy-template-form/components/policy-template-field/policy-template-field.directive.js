"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const template_allow_custom_resources_component_1 = require("../allowed-custom-resources/template-allow-custom-resources.component");
const template_allow_component_1 = require("../template-allow/template-allow.component");
const template_approval_groups_component_1 = require("../template-approval-groups/template-approval-groups.component");
const template_connection_specification_component_1 = require("../template-connection-specification/template-connection-specification.component");
const template_currency_component_1 = require("../template-currency/template-currency.component");
const template_deployments_component_1 = require("../template-deployments/template-deployments.component");
const template_direction_component_1 = require("../template-direction/template-direction.component");
const template_entities_component_1 = require("../template-entities/template-entities.component");
const template_events_component_1 = require("../template-events/template-events.component");
const template_external_network_whitelist_1 = require("../template-external-network-whitelist/template-external-network-whitelist");
const template_json_string_component_1 = require("../template-json-string/template-json-string.component");
const template_organizations_component_1 = require("../template-organizations/template-organizations.component");
const template_regions_component_1 = require("../template-regions/template-regions.component");
const template_services_component_1 = require("../template-services/template-services.component");
const template_string_component_1 = require("../template-string/template-string.component");
const components = {
    ALLOW: template_allow_component_1.TemplateAllowComponent,
    APPROVAL_GROUP: template_approval_groups_component_1.TemplateApprovalGroupsComponent,
    AWS_REGION: template_regions_component_1.TemplateRegionsComponent,
    AWS_SERVICE: template_services_component_1.TemplateServicesComponent,
    CONNECTION_SPECIFICATION: template_connection_specification_component_1.TemplateConnectionSpecificationComponent,
    DEPLOYMENT: template_deployments_component_1.TemplateDeploymentsComponent,
    ENTITY: template_entities_component_1.TemplateEntitiesComponent,
    EVENT: template_events_component_1.TemplateEventsComponent,
    DIRECTION: template_direction_component_1.TemplateDirectionComponent,
    CIDR_BLOCK: template_external_network_whitelist_1.TemplateExternalNetworkWhitelistComponent,
    MONETARY_VALUE: template_currency_component_1.TemplateCurrencyComponent,
    SURFACE_LAYER: template_organizations_component_1.TemplateOrganizationsComponent,
    CUSTOM_AWS_RESOURCE: template_allow_custom_resources_component_1.TemplateAllowCustomResourcesComponent,
    STRING: template_string_component_1.TemplateStringComponent,
    RESOURCE_ROOT: template_string_component_1.TemplateStringComponent,
    JSON_STRING: template_json_string_component_1.TemplateJsonStringComponent,
    ALL_OF: template_json_string_component_1.TemplateJsonStringComponent,
    NONE_OF: template_json_string_component_1.TemplateJsonStringComponent,
    SOME_OF: template_json_string_component_1.TemplateJsonStringComponent,
    POSITIVE_INTEGER: undefined // The old PG form will be depricated, we are going to migrate PGV1
};
let PolicyTemplateFieldDirective = class PolicyTemplateFieldDirective {
    constructor(resolver, container) {
        this.resolver = resolver;
        this.container = container;
    }
    ngOnInit() {
        const component = this.resolver.resolveComponentFactory(components[this.fieldConfig.type]);
        this.component = this.container.createComponent(component);
        this.component.instance.templateConfig = this.fieldConfig;
    }
};
__decorate([
    core_1.Input()
], PolicyTemplateFieldDirective.prototype, "fieldConfig", void 0);
PolicyTemplateFieldDirective = __decorate([
    core_1.Directive({
        // tslint:disable-next-line:directive-selector
        selector: '[policyTemplateField]'
    })
], PolicyTemplateFieldDirective);
exports.PolicyTemplateFieldDirective = PolicyTemplateFieldDirective;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9saWN5LXRlbXBsYXRlLWZpZWxkLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL2NvbmNvdXJzZS9qYXZhc2NyaXB0L2NvbmNvdXJzZS1hcHAvc3JjL2FwcC9zaGFyZWQvcG9saWN5LXRlbXBsYXRlLWZvcm0vY29tcG9uZW50cy9wb2xpY3ktdGVtcGxhdGUtZmllbGQvcG9saWN5LXRlbXBsYXRlLWZpZWxkLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBLHdDQVF1QjtBQUd2QixxSUFBOEg7QUFDOUgseUZBQW9GO0FBQ3BGLHVIQUFpSDtBQUNqSCxrSkFBNEk7QUFDNUksa0dBQTZGO0FBQzdGLDJHQUFzRztBQUN0RyxxR0FBZ0c7QUFDaEcsa0dBQTZGO0FBQzdGLDRGQUF1RjtBQUN2RixvSUFBdUk7QUFDdkksMkdBQXFHO0FBQ3JHLGlIQUE0RztBQUM1RywrRkFBMEY7QUFDMUYsa0dBQTZGO0FBQzdGLDRGQUF1RjtBQUV2RixNQUFNLFVBQVUsR0FBMEM7SUFDeEQsS0FBSyxFQUFFLGlEQUFzQjtJQUM3QixjQUFjLEVBQUUsb0VBQStCO0lBQy9DLFVBQVUsRUFBRSxxREFBd0I7SUFDcEMsV0FBVyxFQUFFLHVEQUF5QjtJQUN0Qyx3QkFBd0IsRUFBRSxzRkFBd0M7SUFDbEUsVUFBVSxFQUFFLDZEQUE0QjtJQUN4QyxNQUFNLEVBQUUsdURBQXlCO0lBQ2pDLEtBQUssRUFBRSxtREFBdUI7SUFDOUIsU0FBUyxFQUFFLHlEQUEwQjtJQUNyQyxVQUFVLEVBQUUsK0VBQXlDO0lBQ3JELGNBQWMsRUFBRSx1REFBeUI7SUFDekMsYUFBYSxFQUFFLGlFQUE4QjtJQUM3QyxtQkFBbUIsRUFBRSxpRkFBcUM7SUFDMUQsTUFBTSxFQUFFLG1EQUF1QjtJQUMvQixhQUFhLEVBQUUsbURBQXVCO0lBQ3RDLFdBQVcsRUFBRSw0REFBMkI7SUFDeEMsTUFBTSxFQUFFLDREQUEyQjtJQUNuQyxPQUFPLEVBQUUsNERBQTJCO0lBQ3BDLE9BQU8sRUFBRSw0REFBMkI7SUFDcEMsZ0JBQWdCLEVBQUUsU0FBUyxDQUFDLG1FQUFtRTtDQUdoRyxDQUFDO0FBTUYsSUFBYSw0QkFBNEIsR0FBekMsTUFBYSw0QkFBNEI7SUFJdkMsWUFDbUIsUUFBa0MsRUFDbEMsU0FBMkI7UUFEM0IsYUFBUSxHQUFSLFFBQVEsQ0FBMEI7UUFDbEMsY0FBUyxHQUFULFNBQVMsQ0FBa0I7SUFDMUMsQ0FBQztJQUVMLFFBQVE7UUFDTixNQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLHVCQUF1QixDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7UUFDM0YsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLGVBQWUsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUMzRCxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQztJQUM1RCxDQUFDO0NBRUYsQ0FBQTtBQWRVO0lBQVIsWUFBSyxFQUFFO2lFQUF3QztBQURyQyw0QkFBNEI7SUFKeEMsZ0JBQVMsQ0FBQztRQUNULDhDQUE4QztRQUM5QyxRQUFRLEVBQUUsdUJBQXVCO0tBQ2xDLENBQUM7R0FDVyw0QkFBNEIsQ0FleEM7QUFmWSxvRUFBNEIifQ==