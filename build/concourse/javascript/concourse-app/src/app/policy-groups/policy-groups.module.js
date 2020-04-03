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
const accordion_1 = require("ngx-bootstrap/accordion");
const alert_1 = require("ngx-bootstrap/alert");
const tooltip_1 = require("ngx-bootstrap/tooltip");
const ngx_pipes_1 = require("ngx-pipes");
const shared_module_1 = require("@concourse/shared/shared.module");
const ngx_bootstrap_1 = require("ngx-bootstrap");
const list_policy_groups_component_1 = require("./list-policy-groups/list-policy-groups.component");
const policy_groups_routing_module_1 = require("./policy-groups-routing.module");
const view_policy_group_component_1 = require("./view-policy-group/view-policy-group.component");
let PolicyGroupsModule = class PolicyGroupsModule {
};
PolicyGroupsModule = __decorate([
    core_1.NgModule({
        imports: [
            common_1.CommonModule,
            forms_1.ReactiveFormsModule,
            ngx_pipes_1.NgArrayPipesModule,
            ngx_pipes_1.NgStringPipesModule,
            angular_fontawesome_1.FontAwesomeModule,
            accordion_1.AccordionModule.forRoot(),
            alert_1.AlertModule.forRoot(),
            tooltip_1.TooltipModule.forRoot(),
            ngx_bootstrap_1.TabsModule.forRoot(),
            shared_module_1.SharedModule,
            policy_groups_routing_module_1.PolicyGroupRoutingModule
        ],
        declarations: [
            view_policy_group_component_1.ViewPolicyGroupComponent,
            list_policy_groups_component_1.ListPolicyGroupsComponent
        ]
    })
], PolicyGroupsModule);
exports.PolicyGroupsModule = PolicyGroupsModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9saWN5LWdyb3Vwcy5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9jb25jb3Vyc2UvamF2YXNjcmlwdC9jb25jb3Vyc2UtYXBwL3NyYy9hcHAvcG9saWN5LWdyb3Vwcy9wb2xpY3ktZ3JvdXBzLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBLDRDQUErQztBQUMvQyx3Q0FBeUM7QUFDekMsMENBQXFEO0FBQ3JELDBFQUFxRTtBQUNyRSx1REFBMEQ7QUFDMUQsK0NBQWtEO0FBQ2xELG1EQUFzRDtBQUN0RCx5Q0FBb0U7QUFFcEUsbUVBQStEO0FBQy9ELGlEQUEyQztBQUMzQyxvR0FBOEY7QUFDOUYsaUZBQTBFO0FBQzFFLGlHQUEyRjtBQXFCM0YsSUFBYSxrQkFBa0IsR0FBL0IsTUFBYSxrQkFBa0I7Q0FBSSxDQUFBO0FBQXRCLGtCQUFrQjtJQW5COUIsZUFBUSxDQUFDO1FBQ1IsT0FBTyxFQUFFO1lBQ1AscUJBQVk7WUFDWiwyQkFBbUI7WUFDbkIsOEJBQWtCO1lBQ2xCLCtCQUFtQjtZQUNuQix1Q0FBaUI7WUFDakIsMkJBQWUsQ0FBQyxPQUFPLEVBQUU7WUFDekIsbUJBQVcsQ0FBQyxPQUFPLEVBQUU7WUFDckIsdUJBQWEsQ0FBQyxPQUFPLEVBQUU7WUFDdkIsMEJBQVUsQ0FBQyxPQUFPLEVBQUU7WUFDcEIsNEJBQVk7WUFDWix1REFBd0I7U0FDekI7UUFDRCxZQUFZLEVBQUU7WUFDWixzREFBd0I7WUFDeEIsd0RBQXlCO1NBQzFCO0tBQ0YsQ0FBQztHQUNXLGtCQUFrQixDQUFJO0FBQXRCLGdEQUFrQiJ9