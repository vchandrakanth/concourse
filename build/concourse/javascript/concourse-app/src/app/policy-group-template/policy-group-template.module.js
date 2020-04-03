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
const angular_fontawesome_1 = require("@fortawesome/angular-fontawesome");
const alert_1 = require("ngx-bootstrap/alert");
const tabs_1 = require("ngx-bootstrap/tabs");
const ngx_pipes_1 = require("ngx-pipes");
const shared_module_1 = require("@concourse/shared/shared.module");
const policy_group_template_list_component_1 = require("./policy-group-template-list/policy-group-template-list.component");
const policy_group_template_routing_module_1 = require("./policy-group-template-routing.module");
const policy_group_template_view_component_1 = require("./policy-group-template-view/policy-group-template-view.component");
let PolicyGroupTemplateModule = class PolicyGroupTemplateModule {
};
PolicyGroupTemplateModule = __decorate([
    core_1.NgModule({
        imports: [
            common_1.CommonModule,
            angular_fontawesome_1.FontAwesomeModule,
            alert_1.AlertModule.forRoot(),
            tabs_1.TabsModule.forRoot(),
            ngx_pipes_1.NgArrayPipesModule,
            ngx_pipes_1.NgStringPipesModule,
            shared_module_1.SharedModule,
            policy_group_template_routing_module_1.PolicyGroupTemplateRoutingModule
        ],
        declarations: [
            policy_group_template_list_component_1.PolicyGroupTemplateListComponent,
            policy_group_template_view_component_1.PolicyGroupTemplateViewComponent
        ]
    })
], PolicyGroupTemplateModule);
exports.PolicyGroupTemplateModule = PolicyGroupTemplateModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9saWN5LWdyb3VwLXRlbXBsYXRlLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL2NvbmNvdXJzZS9qYXZhc2NyaXB0L2NvbmNvdXJzZS1hcHAvc3JjL2FwcC9wb2xpY3ktZ3JvdXAtdGVtcGxhdGUvcG9saWN5LWdyb3VwLXRlbXBsYXRlLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBLDRDQUErQztBQUMvQyx3Q0FBeUM7QUFDekMsMEVBQXFFO0FBQ3JFLCtDQUFrRDtBQUNsRCw2Q0FBZ0Q7QUFDaEQseUNBQW9FO0FBRXBFLG1FQUErRDtBQUMvRCw0SEFBcUg7QUFDckgsaUdBQTBGO0FBQzFGLDRIQUFxSDtBQWtCckgsSUFBYSx5QkFBeUIsR0FBdEMsTUFBYSx5QkFBeUI7Q0FBSSxDQUFBO0FBQTdCLHlCQUF5QjtJQWhCckMsZUFBUSxDQUFDO1FBQ1IsT0FBTyxFQUFFO1lBQ1AscUJBQVk7WUFDWix1Q0FBaUI7WUFDakIsbUJBQVcsQ0FBQyxPQUFPLEVBQUU7WUFDckIsaUJBQVUsQ0FBQyxPQUFPLEVBQUU7WUFDcEIsOEJBQWtCO1lBQ2xCLCtCQUFtQjtZQUNuQiw0QkFBWTtZQUNaLHVFQUFnQztTQUNqQztRQUNELFlBQVksRUFBRTtZQUNaLHVFQUFnQztZQUNoQyx1RUFBZ0M7U0FDakM7S0FDRixDQUFDO0dBQ1cseUJBQXlCLENBQUk7QUFBN0IsOERBQXlCIn0=