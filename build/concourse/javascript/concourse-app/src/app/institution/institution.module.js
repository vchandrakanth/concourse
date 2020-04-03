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
const alert_1 = require("ngx-bootstrap/alert");
const tabs_1 = require("ngx-bootstrap/tabs");
const dynamic_form_1 = require("@concourse/shared/dynamic-form");
const shared_module_1 = require("@concourse/shared/shared.module");
const accounts_component_1 = require("./accounts/accounts.component");
const config_idp_component_1 = require("./config-idp/config-idp.component");
const expire_inst_component_1 = require("./expire-inst/expire-inst.component");
const expire_registration_component_1 = require("./expire-registration/expire-registration.component");
const institution_audit_history_component_1 = require("./institution-audit-history/institution-audit-history.component");
const list_view_component_1 = require("./institution-data/list-view/list-view.component");
const update_inst_data_component_1 = require("./institution-data/update-inst-data/update-inst-data.component");
const institution_overview_component_1 = require("./institution-overview/institution-overview.component");
const institution_page_component_1 = require("./institution-page.component");
const institution_routing_module_1 = require("./institution-routing.module");
const register_inst_component_1 = require("./register-inst/register-inst.component");
const registration_validate_component_1 = require("./registration-validate/registration-validate.component");
const reports_component_1 = require("./reports/reports.component");
const validate_inst_component_1 = require("./validate-inst/validate-inst.component");
let InstitutionModule = class InstitutionModule {
};
InstitutionModule = __decorate([
    core_1.NgModule({
        imports: [
            common_1.CommonModule,
            forms_1.ReactiveFormsModule,
            alert_1.AlertModule.forRoot(),
            tabs_1.TabsModule.forRoot(),
            ng_select_1.NgSelectModule,
            angular_fontawesome_1.FontAwesomeModule,
            shared_module_1.SharedModule,
            dynamic_form_1.DynamicFormModule,
            institution_routing_module_1.InstitutionRoutingModule
        ],
        declarations: [
            config_idp_component_1.ConfigIdpComponent,
            expire_inst_component_1.ExpireInstComponent,
            expire_registration_component_1.ExpireRegistrationComponent,
            institution_audit_history_component_1.InstitutionAuditHistoryComponent,
            list_view_component_1.InstitutionDataListComponent,
            institution_overview_component_1.InstitutionOverviewComponent,
            institution_page_component_1.InstitutionPageComponent,
            register_inst_component_1.RegisterInstComponent,
            registration_validate_component_1.RegistrationValidateComponent,
            reports_component_1.ReportsComponent,
            update_inst_data_component_1.UpdateInstDataComponent,
            validate_inst_component_1.ValidateInstComponent,
            accounts_component_1.AccountsComponent
        ]
    })
], InstitutionModule);
exports.InstitutionModule = InstitutionModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5zdGl0dXRpb24ubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vY29uY291cnNlL2phdmFzY3JpcHQvY29uY291cnNlLWFwcC9zcmMvYXBwL2luc3RpdHV0aW9uL2luc3RpdHV0aW9uLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBLDRDQUErQztBQUMvQyx3Q0FBeUM7QUFDekMsMENBQXFEO0FBQ3JELDBFQUFxRTtBQUNyRSxvREFBc0Q7QUFDdEQsK0NBQWtEO0FBQ2xELDZDQUFnRDtBQUVoRCxpRUFBbUU7QUFDbkUsbUVBQStEO0FBRS9ELHNFQUFrRTtBQUNsRSw0RUFBdUU7QUFDdkUsK0VBQTBFO0FBQzFFLHVHQUFrRztBQUNsRyx5SEFBbUg7QUFDbkgsMEZBQWdHO0FBQ2hHLCtHQUF5RztBQUN6RywwR0FBcUc7QUFDckcsNkVBQXdFO0FBQ3hFLDZFQUF3RTtBQUN4RSxxRkFBZ0Y7QUFDaEYsNkdBQXdHO0FBQ3hHLG1FQUErRDtBQUMvRCxxRkFBZ0Y7QUErQmhGLElBQWEsaUJBQWlCLEdBQTlCLE1BQWEsaUJBQWlCO0NBQUksQ0FBQTtBQUFyQixpQkFBaUI7SUE3QjdCLGVBQVEsQ0FBQztRQUNSLE9BQU8sRUFBRTtZQUNQLHFCQUFZO1lBQ1osMkJBQW1CO1lBQ25CLG1CQUFXLENBQUMsT0FBTyxFQUFFO1lBQ3JCLGlCQUFVLENBQUMsT0FBTyxFQUFFO1lBQ3BCLDBCQUFjO1lBQ2QsdUNBQWlCO1lBQ2pCLDRCQUFZO1lBQ1osZ0NBQWlCO1lBQ2pCLHFEQUF3QjtTQUN6QjtRQUNELFlBQVksRUFBRTtZQUNaLHlDQUFrQjtZQUNsQiwyQ0FBbUI7WUFDbkIsMkRBQTJCO1lBQzNCLHNFQUFnQztZQUNoQyxrREFBNEI7WUFDNUIsNkRBQTRCO1lBQzVCLHFEQUF3QjtZQUN4QiwrQ0FBcUI7WUFDckIsK0RBQTZCO1lBQzdCLG9DQUFnQjtZQUNoQixvREFBdUI7WUFDdkIsK0NBQXFCO1lBQ3JCLHNDQUFpQjtTQUNsQjtLQUNGLENBQUM7R0FFVyxpQkFBaUIsQ0FBSTtBQUFyQiw4Q0FBaUIifQ==