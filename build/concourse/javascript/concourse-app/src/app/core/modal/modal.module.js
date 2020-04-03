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
const alert_1 = require("ngx-bootstrap/alert");
const modal_1 = require("ngx-bootstrap/modal");
const tabs_1 = require("ngx-bootstrap/tabs");
const tooltip_1 = require("ngx-bootstrap/tooltip");
const ngx_pipes_1 = require("ngx-pipes");
const dynamic_form_1 = require("@concourse/shared/dynamic-form");
const multi_part_form_1 = require("@concourse/shared/multi-part-form");
const policy_template_form_1 = require("@concourse/shared/policy-template-form");
const policy_template_form_v2_1 = require("@concourse/shared/policy-template-form-v2");
const shared_module_1 = require("@concourse/shared/shared.module");
const close_modal_directive_1 = require("./close-modal.directive");
const modal_facade_1 = require("./state/modal.facade");
const router_1 = require("@angular/router");
const components_1 = require("./components");
const modalComponents = [
    components_1.AssignGroupsComponent,
    components_1.CreateBaselineAssetComponent,
    components_1.ChangeDeploymentVersionComponent,
    components_1.CodePreviewModalComponent,
    components_1.ConfirmDeleteModalComponent,
    components_1.ConfirmModalComponent,
    components_1.CreateAttributeTagComponent,
    components_1.CreateCloudUserRoleComponent,
    components_1.CreateGroupComponent,
    components_1.CreateInstitutionDataComponent,
    components_1.CreateNodeComponent,
    components_1.CreatePolicyGroupComponent,
    components_1.CreatePolicyGroupTemplateComponent,
    components_1.CreatePolicyGroupV2Component,
    components_1.CreatePolicyGroupV3Component,
    components_1.CreateSurfaceComponent,
    components_1.CriticalErrorComponent,
    components_1.DeployNodeComponent,
    components_1.EditAttributeTagComponent,
    components_1.EditCloudRoleTemplateComponent,
    components_1.EditGroupComponent,
    components_1.EditInstitutionComponent,
    components_1.EditNodeComponent,
    components_1.EditBaselineAssetComponent,
    components_1.EditPolicyGroupTemplateComponent,
    components_1.EditSurfaceComponent,
    components_1.EnclaveFormModalComponent,
    components_1.InviteInstComponent,
    components_1.InviteUserComponent,
    components_1.ManageKeyValueDataComponent,
    components_1.ModifyAttributeComponent,
    components_1.ModifyAwsActionsComponent,
    components_1.ModifyAwsNonActionsComponent,
    components_1.ModifyAzureActionsComponent,
    components_1.ModifyAzureNonActionsComponent,
    components_1.ModifyPolicyGroupComponent,
    components_1.ModifyPolicyGroupV2Component,
    components_1.ModifyPolicyTemplatesComponent,
    components_1.ModifySurfaceLayersComponent,
    components_1.ResponseCloudRoleSyncComponent,
    components_1.UpdatePolicyGroupMetadataComponent,
    components_1.UserIdleWarningComponent,
    components_1.UpdatePolicyGroupV3Component,
    components_1.CreateAwsAccountComponent,
    components_1.UpdateAwsAccountComponent,
    components_1.AssociateAwsAccountsComponent,
    components_1.DisableAwsAccountsComponent,
    components_1.AssociateSurfaceLayersComponent,
    components_1.EditBaselineAssetAwsComponent,
    components_1.EditBaselineAssetAzureComponent,
    components_1.ViewDataComponent
];
let ModalModule = class ModalModule {
};
ModalModule = __decorate([
    core_1.NgModule({
        imports: [
            common_1.CommonModule,
            forms_1.FormsModule,
            forms_1.ReactiveFormsModule,
            ngx_codemirror_1.CodemirrorModule,
            angular_fontawesome_1.FontAwesomeModule,
            ngx_pipes_1.NgArrayPipesModule,
            ngx_pipes_1.NgObjectPipesModule,
            ngx_pipes_1.NgStringPipesModule,
            ng_select_1.NgSelectModule,
            alert_1.AlertModule.forRoot(),
            modal_1.ModalModule.forRoot(),
            tooltip_1.TooltipModule.forRoot(),
            tabs_1.TabsModule.forRoot(),
            dynamic_form_1.DynamicFormModule,
            multi_part_form_1.MultiStepFormModule,
            policy_template_form_1.PolicyTemplateFormModule,
            policy_template_form_v2_1.PolicyTemplateFormV2Module,
            shared_module_1.SharedModule,
            router_1.RouterModule
        ],
        providers: [
            modal_1.BsModalService,
            modal_facade_1.ModalStoreFacade
        ],
        declarations: [
            ...modalComponents,
            close_modal_directive_1.CloseModalDirective,
            components_1.UpdatePolicyGroupV3Component
        ],
        entryComponents: [...modalComponents]
    })
], ModalModule);
exports.ModalModule = ModalModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kYWwubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vY29uY291cnNlL2phdmFzY3JpcHQvY29uY291cnNlLWFwcC9zcmMvYXBwL2NvcmUvbW9kYWwvbW9kYWwubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUEsNENBQStDO0FBQy9DLHdDQUF5QztBQUN6QywwQ0FBa0U7QUFDbEUseURBQXdEO0FBQ3hELDBFQUFxRTtBQUNyRSxvREFBc0Q7QUFDdEQsK0NBQWtEO0FBQ2xELCtDQUFtRjtBQUNuRiw2Q0FBZ0Q7QUFDaEQsbURBQXNEO0FBQ3RELHlDQUF5RjtBQUV6RixpRUFBbUU7QUFDbkUsdUVBQXdFO0FBQ3hFLGlGQUFrRjtBQUNsRix1RkFBdUY7QUFDdkYsbUVBQStEO0FBQy9ELG1FQUE4RDtBQUM5RCx1REFBd0Q7QUFFeEQsNENBQStDO0FBQy9DLDZDQW9Ec0I7QUFFdEIsTUFBTSxlQUFlLEdBQUc7SUFDdEIsa0NBQXFCO0lBQ3JCLHlDQUE0QjtJQUM1Qiw2Q0FBZ0M7SUFDaEMsc0NBQXlCO0lBQ3pCLHdDQUEyQjtJQUMzQixrQ0FBcUI7SUFDckIsd0NBQTJCO0lBQzNCLHlDQUE0QjtJQUM1QixpQ0FBb0I7SUFDcEIsMkNBQThCO0lBQzlCLGdDQUFtQjtJQUNuQix1Q0FBMEI7SUFDMUIsK0NBQWtDO0lBQ2xDLHlDQUE0QjtJQUM1Qix5Q0FBNEI7SUFDNUIsbUNBQXNCO0lBQ3RCLG1DQUFzQjtJQUN0QixnQ0FBbUI7SUFDbkIsc0NBQXlCO0lBQ3pCLDJDQUE4QjtJQUM5QiwrQkFBa0I7SUFDbEIscUNBQXdCO0lBQ3hCLDhCQUFpQjtJQUNqQix1Q0FBMEI7SUFDMUIsNkNBQWdDO0lBQ2hDLGlDQUFvQjtJQUNwQixzQ0FBeUI7SUFDekIsZ0NBQW1CO0lBQ25CLGdDQUFtQjtJQUNuQix3Q0FBMkI7SUFDM0IscUNBQXdCO0lBQ3hCLHNDQUF5QjtJQUN6Qix5Q0FBNEI7SUFDNUIsd0NBQTJCO0lBQzNCLDJDQUE4QjtJQUM5Qix1Q0FBMEI7SUFDMUIseUNBQTRCO0lBQzVCLDJDQUE4QjtJQUM5Qix5Q0FBNEI7SUFDNUIsMkNBQThCO0lBQzlCLCtDQUFrQztJQUNsQyxxQ0FBd0I7SUFDeEIseUNBQTRCO0lBQzVCLHNDQUF5QjtJQUN6QixzQ0FBeUI7SUFDekIsMENBQTZCO0lBQzdCLHdDQUEyQjtJQUMzQiw0Q0FBK0I7SUFDL0IsMENBQTZCO0lBQzdCLDRDQUErQjtJQUMvQiw4QkFBaUI7Q0FDbEIsQ0FBQztBQW1DRixJQUFhLFdBQVcsR0FBeEIsTUFBYSxXQUFXO0NBQUksQ0FBQTtBQUFmLFdBQVc7SUFqQ3ZCLGVBQVEsQ0FBQztRQUNSLE9BQU8sRUFBRTtZQUNQLHFCQUFZO1lBQ1osbUJBQVc7WUFDWCwyQkFBbUI7WUFDbkIsaUNBQWdCO1lBQ2hCLHVDQUFpQjtZQUNqQiw4QkFBa0I7WUFDbEIsK0JBQW1CO1lBQ25CLCtCQUFtQjtZQUNuQiwwQkFBYztZQUNkLG1CQUFXLENBQUMsT0FBTyxFQUFFO1lBQ3JCLG1CQUFhLENBQUMsT0FBTyxFQUFFO1lBQ3ZCLHVCQUFhLENBQUMsT0FBTyxFQUFFO1lBQ3ZCLGlCQUFVLENBQUMsT0FBTyxFQUFFO1lBQ3BCLGdDQUFpQjtZQUNqQixxQ0FBbUI7WUFDbkIsK0NBQXdCO1lBQ3hCLG9EQUEwQjtZQUMxQiw0QkFBWTtZQUNaLHFCQUFZO1NBQ2I7UUFDRCxTQUFTLEVBQUU7WUFDVCxzQkFBYztZQUNkLCtCQUFnQjtTQUNqQjtRQUNELFlBQVksRUFBRTtZQUNaLEdBQUcsZUFBZTtZQUNsQiwyQ0FBbUI7WUFDbkIseUNBQTRCO1NBQzdCO1FBQ0QsZUFBZSxFQUFFLENBQUMsR0FBRyxlQUFlLENBQUM7S0FDdEMsQ0FBQztHQUNXLFdBQVcsQ0FBSTtBQUFmLGtDQUFXIn0=