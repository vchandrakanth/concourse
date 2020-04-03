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
const ngx_pipes_1 = require("ngx-pipes");
const dynamic_form_1 = require("@concourse/shared/dynamic-form");
const shared_module_1 = require("@concourse/shared/shared.module");
const groups_routing_module_1 = require("./groups-routing.module");
const list_groups_component_1 = require("./list-groups/list-groups.component");
const view_group_component_1 = require("./view-group/view-group.component");
let GroupsModule = class GroupsModule {
};
GroupsModule = __decorate([
    core_1.NgModule({
        imports: [
            common_1.CommonModule,
            forms_1.ReactiveFormsModule,
            angular_fontawesome_1.FontAwesomeModule,
            ng_select_1.NgSelectModule,
            alert_1.AlertModule.forRoot(),
            tabs_1.TabsModule.forRoot(),
            ngx_pipes_1.NgArrayPipesModule,
            ngx_pipes_1.NgStringPipesModule,
            shared_module_1.SharedModule,
            dynamic_form_1.DynamicFormModule,
            groups_routing_module_1.GroupsRoutingModule
        ],
        declarations: [
            list_groups_component_1.ListGroupsComponent,
            view_group_component_1.ViewGroupComponent
        ]
    })
], GroupsModule);
exports.GroupsModule = GroupsModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JvdXBzLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL2NvbmNvdXJzZS9qYXZhc2NyaXB0L2NvbmNvdXJzZS1hcHAvc3JjL2FwcC91c2VyLW1hbmFnZW1lbnQvZ3JvdXBzL2dyb3Vwcy5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQSw0Q0FBK0M7QUFDL0Msd0NBQXlDO0FBQ3pDLDBDQUFxRDtBQUNyRCwwRUFBcUU7QUFDckUsb0RBQXNEO0FBQ3RELCtDQUFrRDtBQUNsRCw2Q0FBZ0Q7QUFDaEQseUNBQW9FO0FBRXBFLGlFQUFtRTtBQUNuRSxtRUFBK0Q7QUFFL0QsbUVBQThEO0FBQzlELCtFQUEwRTtBQUMxRSw0RUFBdUU7QUFxQnZFLElBQWEsWUFBWSxHQUF6QixNQUFhLFlBQVk7Q0FBSSxDQUFBO0FBQWhCLFlBQVk7SUFuQnhCLGVBQVEsQ0FBQztRQUNSLE9BQU8sRUFBRTtZQUNQLHFCQUFZO1lBQ1osMkJBQW1CO1lBQ25CLHVDQUFpQjtZQUNqQiwwQkFBYztZQUNkLG1CQUFXLENBQUMsT0FBTyxFQUFFO1lBQ3JCLGlCQUFVLENBQUMsT0FBTyxFQUFFO1lBQ3BCLDhCQUFrQjtZQUNsQiwrQkFBbUI7WUFDbkIsNEJBQVk7WUFDWixnQ0FBaUI7WUFDakIsMkNBQW1CO1NBQ3BCO1FBQ0QsWUFBWSxFQUFFO1lBQ1osMkNBQW1CO1lBQ25CLHlDQUFrQjtTQUNuQjtLQUNGLENBQUM7R0FDVyxZQUFZLENBQUk7QUFBaEIsb0NBQVkifQ==