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
const template_allow_custom_resources_component_1 = require("./components/allowed-custom-resources/template-allow-custom-resources.component");
const policy_template_field_directive_1 = require("./components/policy-template-field/policy-template-field.directive");
const template_allow_component_1 = require("./components/template-allow/template-allow.component");
const template_approval_groups_component_1 = require("./components/template-approval-groups/template-approval-groups.component");
const template_connection_specification_component_1 = require("./components/template-connection-specification/template-connection-specification.component");
const template_currency_component_1 = require("./components/template-currency/template-currency.component");
const template_deployments_component_1 = require("./components/template-deployments/template-deployments.component");
const template_direction_component_1 = require("./components/template-direction/template-direction.component");
const template_entities_component_1 = require("./components/template-entities/template-entities.component");
const template_events_component_1 = require("./components/template-events/template-events.component");
const template_external_network_whitelist_1 = require("./components/template-external-network-whitelist/template-external-network-whitelist");
const template_json_string_component_1 = require("./components/template-json-string/template-json-string.component");
const template_organizations_component_1 = require("./components/template-organizations/template-organizations.component");
const template_regions_component_1 = require("./components/template-regions/template-regions.component");
const template_services_component_1 = require("./components/template-services/template-services.component");
const template_string_component_1 = require("./components/template-string/template-string.component");
const policy_template_form_component_1 = require("./policy-template-form.component");
const ngx_codemirror_1 = require("@ctrl/ngx-codemirror");
const shared_module_1 = require("../shared.module");
const entryComponents = [
    template_allow_component_1.TemplateAllowComponent,
    template_approval_groups_component_1.TemplateApprovalGroupsComponent,
    template_connection_specification_component_1.TemplateConnectionSpecificationComponent,
    template_connection_specification_component_1.TemplateConnectionSpecificationComponent,
    template_currency_component_1.TemplateCurrencyComponent,
    template_deployments_component_1.TemplateDeploymentsComponent,
    template_entities_component_1.TemplateEntitiesComponent,
    template_events_component_1.TemplateEventsComponent,
    template_external_network_whitelist_1.TemplateExternalNetworkWhitelistComponent,
    template_organizations_component_1.TemplateOrganizationsComponent,
    template_regions_component_1.TemplateRegionsComponent,
    template_services_component_1.TemplateServicesComponent,
    template_string_component_1.TemplateStringComponent,
    template_json_string_component_1.TemplateJsonStringComponent,
    template_allow_custom_resources_component_1.TemplateAllowCustomResourcesComponent,
    template_direction_component_1.TemplateDirectionComponent
];
let PolicyTemplateFormModule = class PolicyTemplateFormModule {
};
PolicyTemplateFormModule = __decorate([
    core_1.NgModule({
        imports: [
            common_1.CommonModule,
            shared_module_1.SharedModule,
            ngx_codemirror_1.CodemirrorModule,
            forms_1.FormsModule,
            forms_1.ReactiveFormsModule,
            angular_fontawesome_1.FontAwesomeModule,
            ng_select_1.NgSelectModule
        ],
        providers: [
            common_1.JsonPipe
        ],
        declarations: [
            policy_template_form_component_1.PolicyTemplateFormComponent,
            policy_template_field_directive_1.PolicyTemplateFieldDirective,
            ...entryComponents
        ],
        entryComponents: [...entryComponents],
        exports: [policy_template_form_component_1.PolicyTemplateFormComponent]
    })
], PolicyTemplateFormModule);
exports.PolicyTemplateFormModule = PolicyTemplateFormModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9saWN5LXRlbXBsYXRlLWZvcm0ubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vY29uY291cnNlL2phdmFzY3JpcHQvY29uY291cnNlLWFwcC9zcmMvYXBwL3NoYXJlZC9wb2xpY3ktdGVtcGxhdGUtZm9ybS9wb2xpY3ktdGVtcGxhdGUtZm9ybS5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQSw0Q0FBeUQ7QUFDekQsd0NBQXlDO0FBQ3pDLDBDQUFrRTtBQUNsRSwwRUFBcUU7QUFDckUsb0RBQXNEO0FBRXRELCtJQUF3STtBQUN4SSx3SEFBa0g7QUFDbEgsbUdBQThGO0FBQzlGLGlJQUEySDtBQUMzSCw0SkFBc0o7QUFDdEosNEdBQXVHO0FBQ3ZHLHFIQUFnSDtBQUNoSCwrR0FBMEc7QUFDMUcsNEdBQXVHO0FBQ3ZHLHNHQUFpRztBQUNqRyw4SUFBaUo7QUFDakoscUhBQStHO0FBQy9HLDJIQUFzSDtBQUN0SCx5R0FBb0c7QUFDcEcsNEdBQXVHO0FBQ3ZHLHNHQUFpRztBQUNqRyxxRkFBK0U7QUFFL0UseURBQXdEO0FBRXhELG9EQUFnRDtBQUVoRCxNQUFNLGVBQWUsR0FBRztJQUN0QixpREFBc0I7SUFDdEIsb0VBQStCO0lBQy9CLHNGQUF3QztJQUN4QyxzRkFBd0M7SUFDeEMsdURBQXlCO0lBQ3pCLDZEQUE0QjtJQUM1Qix1REFBeUI7SUFDekIsbURBQXVCO0lBQ3ZCLCtFQUF5QztJQUN6QyxpRUFBOEI7SUFDOUIscURBQXdCO0lBQ3hCLHVEQUF5QjtJQUN6QixtREFBdUI7SUFDdkIsNERBQTJCO0lBQzNCLGlGQUFxQztJQUNyQyx5REFBMEI7Q0FDM0IsQ0FBQztBQXVCRixJQUFhLHdCQUF3QixHQUFyQyxNQUFhLHdCQUF3QjtDQUFJLENBQUE7QUFBNUIsd0JBQXdCO0lBckJwQyxlQUFRLENBQUM7UUFDUixPQUFPLEVBQUU7WUFDUCxxQkFBWTtZQUNaLDRCQUFZO1lBQ1osaUNBQWdCO1lBQ2hCLG1CQUFXO1lBQ1gsMkJBQW1CO1lBQ25CLHVDQUFpQjtZQUNqQiwwQkFBYztTQUNmO1FBQ0QsU0FBUyxFQUFFO1lBQ1QsaUJBQVE7U0FDVDtRQUNELFlBQVksRUFBRTtZQUNaLDREQUEyQjtZQUMzQiw4REFBNEI7WUFDNUIsR0FBRyxlQUFlO1NBQ25CO1FBQ0QsZUFBZSxFQUFFLENBQUMsR0FBRyxlQUFlLENBQUM7UUFDckMsT0FBTyxFQUFFLENBQUMsNERBQTJCLENBQUM7S0FDdkMsQ0FBQztHQUNXLHdCQUF3QixDQUFJO0FBQTVCLDREQUF3QiJ9