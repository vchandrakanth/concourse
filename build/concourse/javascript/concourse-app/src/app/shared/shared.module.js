"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const portal_1 = require("@angular/cdk/portal");
const scrolling_1 = require("@angular/cdk/scrolling");
const common_1 = require("@angular/common");
const core_1 = require("@angular/core");
const forms_1 = require("@angular/forms");
const router_1 = require("@angular/router");
const ngx_codemirror_1 = require("@ctrl/ngx-codemirror");
const angular_fontawesome_1 = require("@fortawesome/angular-fontawesome");
const ng_select_1 = require("@ng-select/ng-select");
const accordion_1 = require("ngx-bootstrap/accordion");
const alert_1 = require("ngx-bootstrap/alert");
const datepicker_1 = require("ngx-bootstrap/datepicker");
const tooltip_1 = require("ngx-bootstrap/tooltip");
const ngx_countup_1 = require("ngx-countup");
const ngx_pipes_1 = require("ngx-pipes");
const feature_flag_directive_1 = require("./directives/feature-flag.directive");
const has_responsibility_directive_1 = require("./directives/has-responsibility.directive");
const in_owning_group_directive_1 = require("./directives/in-owning-group.directive");
const ng_auto_select_directive_1 = require("./directives/ng-auto-select.directive");
const ng_let_directive_1 = require("./directives/ng-let.directive");
const control_directive_1 = require("./form-components/control-validation/control.directive");
const entity_metadata_pipe_1 = require("./pipes/entity-metadata.pipe");
const get_initials_pipe_1 = require("./pipes/get-initials.pipe");
const join_pipe_1 = require("./pipes/join.pipe");
const slice_initial_pipe_1 = require("./pipes/slice-initial.pipe");
const un_camel_case_pipe_1 = require("./pipes/un-camel-case.pipe");
const underscore_remove_pipe_1 = require("./pipes/underscore-remove.pipe");
const version_text_pipe_1 = require("./pipes/version-text.pipe");
const circle_text_icon_component_1 = require("./components/circle-text-icon/circle-text-icon.component");
const list_cards_component_1 = require("./components/list-cards/list-cards.component");
const page_actions_component_1 = require("./components/page-actions/page-actions.component");
const panel_and_outlet_component_1 = require("./components/panel-and-outlet/panel-and-outlet.component");
const search_actions_component_1 = require("./components/search-actions/search-actions.component");
const alert_messages_component_1 = require("./components/alert-messages/alert-messages.component");
const audit_history_component_1 = require("./components/audit-history/audit-history.component");
const color_badge_component_1 = require("./components/color-badge/color-badge.component");
const count_up_component_1 = require("./components/count-up/count-up.component");
const details_card_component_1 = require("./components/details-card/details-card.component");
const details_null_state_component_1 = require("./components/details-null-state/details-null-state.component");
const dropdown_select_all_component_1 = require("./components/dropdown-select-all/dropdown-select-all.component");
const institution_data_form_component_1 = require("./components/institution-data-form/institution-data-form.component");
const list_component_1 = require("./components/list/list.component");
const null_state_component_1 = require("./components/null-state/null-state.component");
const policy_violations_details_component_1 = require("./components/policy-violations-details/policy-violations-details.component");
const predicate_replacement_default_component_1 = require("./components/predicate-replacement/predicate-replacement-default/predicate-replacement-default.component");
const predicate_replacement_entities_component_1 = require("./components/predicate-replacement/predicate-replacement-entities/predicate-replacement-entities.component");
const pretty_array_component_1 = require("./components/pretty-array/pretty-array.component");
const spinner_component_1 = require("./components/spinner/spinner.component");
const time_range_component_1 = require("./components/time-range/time-range.component");
const tooltip_icon_component_1 = require("./components/tooltip-icon/tooltip-icon.component");
const cloud_role_operation_selector_component_1 = require("./form-components/cloud-role-operation-selector/cloud-role-operation-selector.component");
const control_validation_component_1 = require("./form-components/control-validation/control-validation.component");
const validator_directive_1 = require("./form-components/control-validation/validator.directive");
const general_details_control_component_1 = require("./form-components/general-details-control/general-details-control.component");
const institution_registration_component_1 = require("./form-components/institution-registration/institution-registration.component");
const password_control_component_1 = require("./form-components/password-control/password-control.component");
const surface_layer_tree_selector_component_1 = require("./form-components/surface-layer-tree-selector/surface-layer-tree-selector.component");
const exportedDirectives = [
    control_directive_1.ControlDirective,
    feature_flag_directive_1.FeatureFlagDirective,
    has_responsibility_directive_1.HasResponsibilityDirective,
    in_owning_group_directive_1.InOwningGroupDirective,
    ng_auto_select_directive_1.NgAutoSelectDirective,
    ng_let_directive_1.NgLetDirective,
    validator_directive_1.ValidatorDirective
];
const exportedComponents = [
    alert_messages_component_1.AlertMessagesComponent,
    audit_history_component_1.AuditHistoryComponent,
    circle_text_icon_component_1.CircleTextIconComponent,
    cloud_role_operation_selector_component_1.CloudRoleOperationSelectorComponent,
    color_badge_component_1.ColorBadgeComponent,
    control_validation_component_1.ControlValidationComponent,
    details_card_component_1.DetailsCardComponent,
    details_null_state_component_1.DetailsNullStateComponent,
    dropdown_select_all_component_1.DropdownSelectAllComponent,
    general_details_control_component_1.GeneralDetailsControlComponent,
    institution_data_form_component_1.InstitutionDataFormComponent,
    institution_registration_component_1.InstitutionRegistrationComponent,
    list_cards_component_1.ListCardComponent,
    list_component_1.ListComponent,
    null_state_component_1.NullStateComponent,
    page_actions_component_1.PageActionsComponent,
    panel_and_outlet_component_1.PanelAndOutletComponent,
    password_control_component_1.PasswordControlComponent,
    policy_violations_details_component_1.PolicyViolationsDetailsComponent,
    predicate_replacement_default_component_1.PredicateReplacementDefaultComponent,
    predicate_replacement_entities_component_1.PredicateReplacementEntitiesComponent,
    search_actions_component_1.SearchActionsComponent,
    spinner_component_1.SpinnerComponent,
    surface_layer_tree_selector_component_1.SurfaceLayerTreeSelectorComponent,
    tooltip_icon_component_1.TooltipIconComponent,
    pretty_array_component_1.PrettyArrayComponent,
    time_range_component_1.TimeRangeComponent,
    count_up_component_1.CountUpComponent
];
const exportedPipes = [
    entity_metadata_pipe_1.EntityMetadataPipe,
    get_initials_pipe_1.GetInitialsPipe,
    join_pipe_1.JoinPipe,
    slice_initial_pipe_1.SliceInitialPipe,
    un_camel_case_pipe_1.UnCamelizePipe,
    underscore_remove_pipe_1.UnderscoreRemovePipe,
    version_text_pipe_1.VersionTextPipe
];
let SharedModule = class SharedModule {
};
SharedModule = __decorate([
    core_1.NgModule({
        imports: [
            common_1.CommonModule,
            router_1.RouterModule,
            portal_1.PortalModule,
            scrolling_1.ScrollingModule,
            scrolling_1.ScrollDispatchModule,
            angular_fontawesome_1.FontAwesomeModule,
            forms_1.FormsModule,
            forms_1.ReactiveFormsModule,
            accordion_1.AccordionModule.forRoot(),
            alert_1.AlertModule.forRoot(),
            tooltip_1.TooltipModule.forRoot(),
            ngx_pipes_1.NgArrayPipesModule,
            ngx_pipes_1.NgObjectPipesModule,
            ngx_pipes_1.NgStringPipesModule,
            ngx_codemirror_1.CodemirrorModule,
            ng_select_1.NgSelectModule,
            datepicker_1.BsDatepickerModule.forRoot(),
            ngx_countup_1.CountUpModule
        ],
        declarations: [...exportedDirectives, ...exportedComponents, ...exportedPipes],
        providers: [...exportedPipes],
        exports: [...exportedDirectives, ...exportedComponents, ...exportedPipes]
    })
], SharedModule);
exports.SharedModule = SharedModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2hhcmVkLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL2NvbmNvdXJzZS9qYXZhc2NyaXB0L2NvbmNvdXJzZS1hcHAvc3JjL2FwcC9zaGFyZWQvc2hhcmVkLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBLGdEQUFtRDtBQUNuRCxzREFBK0U7QUFDL0UsNENBQStDO0FBQy9DLHdDQUF5QztBQUN6QywwQ0FBa0U7QUFDbEUsNENBQStDO0FBQy9DLHlEQUF3RDtBQUN4RCwwRUFBcUU7QUFDckUsb0RBQXNEO0FBQ3RELHVEQUEwRDtBQUMxRCwrQ0FBa0Q7QUFDbEQseURBQThEO0FBQzlELG1EQUFzRDtBQUN0RCw2Q0FBNEM7QUFDNUMseUNBQXlGO0FBRXpGLGdGQUEyRTtBQUMzRSw0RkFBdUY7QUFDdkYsc0ZBQWdGO0FBQ2hGLG9GQUE4RTtBQUM5RSxvRUFBK0Q7QUFDL0QsOEZBQTBGO0FBRTFGLHVFQUFrRTtBQUNsRSxpRUFBNEQ7QUFDNUQsaURBQTZDO0FBQzdDLG1FQUE4RDtBQUM5RCxtRUFBNEQ7QUFDNUQsMkVBQXNFO0FBQ3RFLGlFQUE0RDtBQUU1RCx5R0FBbUc7QUFDbkcsdUZBQWlGO0FBQ2pGLDZGQUF3RjtBQUN4Rix5R0FBbUc7QUFDbkcsbUdBQThGO0FBRTlGLG1HQUE4RjtBQUM5RixnR0FBMkY7QUFDM0YsMEZBQXFGO0FBQ3JGLGlGQUE0RTtBQUM1RSw2RkFBd0Y7QUFDeEYsK0dBQXlHO0FBQ3pHLGtIQUE0RztBQUM1Ryx3SEFBa0g7QUFDbEgscUVBQWlFO0FBQ2pFLHVGQUFrRjtBQUNsRixvSUFBOEg7QUFDOUgsc0tBQWdLO0FBQ2hLLHlLQUFtSztBQUNuSyw2RkFBd0Y7QUFDeEYsOEVBQTBFO0FBQzFFLHVGQUFrRjtBQUNsRiw2RkFBd0Y7QUFDeEYscUpBQThJO0FBQzlJLG9IQUErRztBQUMvRyxrR0FBOEY7QUFDOUYsbUlBQTZIO0FBQzdILHNJQUFpSTtBQUNqSSw4R0FBeUc7QUFDekcsK0lBQXdJO0FBRXhJLE1BQU0sa0JBQWtCLEdBQUc7SUFDekIsb0NBQWdCO0lBQ2hCLDZDQUFvQjtJQUNwQix5REFBMEI7SUFDMUIsa0RBQXNCO0lBQ3RCLGdEQUFxQjtJQUNyQixpQ0FBYztJQUNkLHdDQUFrQjtDQUNuQixDQUFDO0FBRUYsTUFBTSxrQkFBa0IsR0FBRztJQUN6QixpREFBc0I7SUFDdEIsK0NBQXFCO0lBQ3JCLG9EQUF1QjtJQUN2Qiw2RUFBbUM7SUFDbkMsMkNBQW1CO0lBQ25CLHlEQUEwQjtJQUMxQiw2Q0FBb0I7SUFDcEIsd0RBQXlCO0lBQ3pCLDBEQUEwQjtJQUMxQixrRUFBOEI7SUFDOUIsOERBQTRCO0lBQzVCLHFFQUFnQztJQUNoQyx3Q0FBaUI7SUFDakIsOEJBQWE7SUFDYix5Q0FBa0I7SUFDbEIsNkNBQW9CO0lBQ3BCLG9EQUF1QjtJQUN2QixxREFBd0I7SUFDeEIsc0VBQWdDO0lBQ2hDLDhFQUFvQztJQUNwQyxnRkFBcUM7SUFDckMsaURBQXNCO0lBQ3RCLG9DQUFnQjtJQUNoQix5RUFBaUM7SUFDakMsNkNBQW9CO0lBQ3BCLDZDQUFvQjtJQUNwQix5Q0FBa0I7SUFDbEIscUNBQWdCO0NBQ2pCLENBQUM7QUFFRixNQUFNLGFBQWEsR0FBRztJQUNwQix5Q0FBa0I7SUFDbEIsbUNBQWU7SUFDZixvQkFBUTtJQUNSLHFDQUFnQjtJQUNoQixtQ0FBYztJQUNkLDZDQUFvQjtJQUNwQixtQ0FBZTtDQUNoQixDQUFDO0FBMkJGLElBQWEsWUFBWSxHQUF6QixNQUFhLFlBQVk7Q0FBSSxDQUFBO0FBQWhCLFlBQVk7SUF6QnhCLGVBQVEsQ0FBQztRQUNSLE9BQU8sRUFBRTtZQUNQLHFCQUFZO1lBQ1oscUJBQVk7WUFDWixxQkFBWTtZQUNaLDJCQUFlO1lBQ2YsZ0NBQW9CO1lBQ3BCLHVDQUFpQjtZQUNqQixtQkFBVztZQUNYLDJCQUFtQjtZQUNuQiwyQkFBZSxDQUFDLE9BQU8sRUFBRTtZQUN6QixtQkFBVyxDQUFDLE9BQU8sRUFBRTtZQUNyQix1QkFBYSxDQUFDLE9BQU8sRUFBRTtZQUN2Qiw4QkFBa0I7WUFDbEIsK0JBQW1CO1lBQ25CLCtCQUFtQjtZQUNuQixpQ0FBZ0I7WUFDaEIsMEJBQWM7WUFDZCwrQkFBa0IsQ0FBQyxPQUFPLEVBQUU7WUFDNUIsMkJBQWE7U0FDZDtRQUNELFlBQVksRUFBRSxDQUFDLEdBQUcsa0JBQWtCLEVBQUUsR0FBRyxrQkFBa0IsRUFBRSxHQUFHLGFBQWEsQ0FBQztRQUM5RSxTQUFTLEVBQUUsQ0FBQyxHQUFHLGFBQWEsQ0FBQztRQUM3QixPQUFPLEVBQUUsQ0FBQyxHQUFHLGtCQUFrQixFQUFFLEdBQUcsa0JBQWtCLEVBQUUsR0FBRyxhQUFhLENBQUM7S0FDMUUsQ0FBQztHQUNXLFlBQVksQ0FBSTtBQUFoQixvQ0FBWSJ9