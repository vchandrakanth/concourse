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
const list_groups_component_1 = require("./list-groups/list-groups.component");
const view_group_component_1 = require("./view-group/view-group.component");
const routes = [
    {
        path: '', component: list_groups_component_1.ListGroupsComponent, children: [
            { path: ':id', component: view_group_component_1.ViewGroupComponent }
        ]
    }
];
let GroupsRoutingModule = class GroupsRoutingModule {
};
GroupsRoutingModule = __decorate([
    core_1.NgModule({
        imports: [router_1.RouterModule.forChild(routes)],
        exports: [router_1.RouterModule]
    })
], GroupsRoutingModule);
exports.GroupsRoutingModule = GroupsRoutingModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JvdXBzLXJvdXRpbmcubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vY29uY291cnNlL2phdmFzY3JpcHQvY29uY291cnNlLWFwcC9zcmMvYXBwL3VzZXItbWFuYWdlbWVudC9ncm91cHMvZ3JvdXBzLXJvdXRpbmcubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUEsd0NBQXlDO0FBQ3pDLDRDQUF1RDtBQUV2RCwrRUFBMEU7QUFDMUUsNEVBQXVFO0FBRXZFLE1BQU0sTUFBTSxHQUFXO0lBQ3JCO1FBQ0UsSUFBSSxFQUFFLEVBQUUsRUFBRSxTQUFTLEVBQUUsMkNBQW1CLEVBQUUsUUFBUSxFQUFFO1lBQ2xELEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUUseUNBQWtCLEVBQUU7U0FDL0M7S0FDRjtDQUNGLENBQUM7QUFNRixJQUFhLG1CQUFtQixHQUFoQyxNQUFhLG1CQUFtQjtDQUFJLENBQUE7QUFBdkIsbUJBQW1CO0lBSi9CLGVBQVEsQ0FBQztRQUNSLE9BQU8sRUFBRSxDQUFDLHFCQUFZLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3hDLE9BQU8sRUFBRSxDQUFDLHFCQUFZLENBQUM7S0FDeEIsQ0FBQztHQUNXLG1CQUFtQixDQUFJO0FBQXZCLGtEQUFtQiJ9