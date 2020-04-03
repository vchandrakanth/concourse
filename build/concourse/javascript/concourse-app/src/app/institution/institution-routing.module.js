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
const guards_1 = require("@concourse/core/guards");
const accounts_component_1 = require("./accounts/accounts.component");
const config_idp_component_1 = require("./config-idp/config-idp.component");
const expire_inst_component_1 = require("./expire-inst/expire-inst.component");
const expire_registration_component_1 = require("./expire-registration/expire-registration.component");
const list_view_component_1 = require("./institution-data/list-view/list-view.component");
const update_inst_data_component_1 = require("./institution-data/update-inst-data/update-inst-data.component");
const institution_overview_component_1 = require("./institution-overview/institution-overview.component");
const institution_page_component_1 = require("./institution-page.component");
const register_inst_component_1 = require("./register-inst/register-inst.component");
const registration_validate_component_1 = require("./registration-validate/registration-validate.component");
const reports_component_1 = require("./reports/reports.component");
const validate_inst_component_1 = require("./validate-inst/validate-inst.component");
const routes = [
    {
        path: '',
        component: institution_page_component_1.InstitutionPageComponent,
        canActivate: [guards_1.AuthGuard, guards_1.RoleGuard],
        data: {
            roles: 'MANAGE_INSTITUTIONS'
        },
        children: [
            {
                path: 'overview', component: institution_overview_component_1.InstitutionOverviewComponent
            },
            {
                path: 'data', component: list_view_component_1.InstitutionDataListComponent, children: [
                    { path: ':uri', component: update_inst_data_component_1.UpdateInstDataComponent }
                ]
            },
            { path: 'config/idp', component: config_idp_component_1.ConfigIdpComponent },
            {
                path: 'reports', component: reports_component_1.ReportsComponent
            },
            {
                path: 'accounts', component: accounts_component_1.AccountsComponent
            }
        ]
    },
    { path: 'validate-invitation', component: validate_inst_component_1.ValidateInstComponent },
    { path: 'register', component: register_inst_component_1.RegisterInstComponent },
    { path: 'invitation-expire', component: expire_inst_component_1.ExpireInstComponent },
    { path: 'validate-registration', component: registration_validate_component_1.RegistrationValidateComponent },
    { path: 'registration-expire', component: expire_registration_component_1.ExpireRegistrationComponent }
];
let InstitutionRoutingModule = class InstitutionRoutingModule {
};
InstitutionRoutingModule = __decorate([
    core_1.NgModule({
        imports: [router_1.RouterModule.forChild(routes)],
        exports: [router_1.RouterModule]
    })
], InstitutionRoutingModule);
exports.InstitutionRoutingModule = InstitutionRoutingModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5zdGl0dXRpb24tcm91dGluZy5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9jb25jb3Vyc2UvamF2YXNjcmlwdC9jb25jb3Vyc2UtYXBwL3NyYy9hcHAvaW5zdGl0dXRpb24vaW5zdGl0dXRpb24tcm91dGluZy5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQSx3Q0FBeUM7QUFDekMsNENBQXVEO0FBRXZELG1EQUE4RDtBQUU5RCxzRUFBa0U7QUFDbEUsNEVBQXVFO0FBQ3ZFLCtFQUEwRTtBQUMxRSx1R0FBa0c7QUFDbEcsMEZBQWdHO0FBQ2hHLCtHQUF5RztBQUN6RywwR0FBcUc7QUFDckcsNkVBQXdFO0FBQ3hFLHFGQUFnRjtBQUNoRiw2R0FBd0c7QUFDeEcsbUVBQStEO0FBQy9ELHFGQUFnRjtBQUVoRixNQUFNLE1BQU0sR0FBVztJQUNyQjtRQUNFLElBQUksRUFBRSxFQUFFO1FBQ1IsU0FBUyxFQUFFLHFEQUF3QjtRQUNuQyxXQUFXLEVBQUUsQ0FBQyxrQkFBUyxFQUFFLGtCQUFTLENBQUM7UUFDbkMsSUFBSSxFQUFFO1lBQ0osS0FBSyxFQUFFLHFCQUFxQjtTQUM3QjtRQUNELFFBQVEsRUFBRTtZQUNSO2dCQUNFLElBQUksRUFBRSxVQUFVLEVBQUUsU0FBUyxFQUFFLDZEQUE0QjthQUMxRDtZQUNEO2dCQUNFLElBQUksRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLGtEQUE0QixFQUFFLFFBQVEsRUFBRTtvQkFDL0QsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxvREFBdUIsRUFBRTtpQkFDckQ7YUFDRjtZQUNELEVBQUUsSUFBSSxFQUFFLFlBQVksRUFBRSxTQUFTLEVBQUUseUNBQWtCLEVBQUU7WUFDckQ7Z0JBQ0UsSUFBSSxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsb0NBQWdCO2FBQzdDO1lBQ0Q7Z0JBQ0UsSUFBSSxFQUFFLFVBQVUsRUFBRSxTQUFTLEVBQUUsc0NBQWlCO2FBQy9DO1NBQ0Y7S0FDRjtJQUNELEVBQUUsSUFBSSxFQUFFLHFCQUFxQixFQUFFLFNBQVMsRUFBRSwrQ0FBcUIsRUFBRTtJQUNqRSxFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsU0FBUyxFQUFFLCtDQUFxQixFQUFFO0lBQ3RELEVBQUUsSUFBSSxFQUFFLG1CQUFtQixFQUFFLFNBQVMsRUFBRSwyQ0FBbUIsRUFBRTtJQUM3RCxFQUFFLElBQUksRUFBRSx1QkFBdUIsRUFBRSxTQUFTLEVBQUUsK0RBQTZCLEVBQUU7SUFDM0UsRUFBRSxJQUFJLEVBQUUscUJBQXFCLEVBQUUsU0FBUyxFQUFFLDJEQUEyQixFQUFFO0NBQ3hFLENBQUM7QUFLRixJQUFhLHdCQUF3QixHQUFyQyxNQUFhLHdCQUF3QjtDQUFJLENBQUE7QUFBNUIsd0JBQXdCO0lBSnBDLGVBQVEsQ0FBQztRQUNSLE9BQU8sRUFBRSxDQUFDLHFCQUFZLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3hDLE9BQU8sRUFBRSxDQUFDLHFCQUFZLENBQUM7S0FDeEIsQ0FBQztHQUNXLHdCQUF3QixDQUFJO0FBQTVCLDREQUF3QiJ9