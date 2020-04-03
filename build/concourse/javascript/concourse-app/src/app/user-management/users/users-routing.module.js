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
const list_users_component_1 = require("./list-users/list-users.component");
const view_user_component_1 = require("./view-user/view-user.component");
const routes = [
    {
        path: '', component: list_users_component_1.ListUsersComponent, children: [
            { path: ':id', component: view_user_component_1.ViewUserComponent }
        ]
    }
];
let UsersRoutingModule = class UsersRoutingModule {
};
UsersRoutingModule = __decorate([
    core_1.NgModule({
        imports: [router_1.RouterModule.forChild(routes)],
        exports: [router_1.RouterModule]
    })
], UsersRoutingModule);
exports.UsersRoutingModule = UsersRoutingModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlcnMtcm91dGluZy5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9jb25jb3Vyc2UvamF2YXNjcmlwdC9jb25jb3Vyc2UtYXBwL3NyYy9hcHAvdXNlci1tYW5hZ2VtZW50L3VzZXJzL3VzZXJzLXJvdXRpbmcubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUEsd0NBQXlDO0FBQ3pDLDRDQUF1RDtBQUV2RCw0RUFBdUU7QUFDdkUseUVBQW9FO0FBRXBFLE1BQU0sTUFBTSxHQUFXO0lBQ3JCO1FBQ0UsSUFBSSxFQUFFLEVBQUUsRUFBRSxTQUFTLEVBQUUseUNBQWtCLEVBQUUsUUFBUSxFQUFFO1lBQ2pELEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUUsdUNBQWlCLEVBQUU7U0FDOUM7S0FDRjtDQUNGLENBQUM7QUFNRixJQUFhLGtCQUFrQixHQUEvQixNQUFhLGtCQUFrQjtDQUFJLENBQUE7QUFBdEIsa0JBQWtCO0lBSjlCLGVBQVEsQ0FBQztRQUNSLE9BQU8sRUFBRSxDQUFDLHFCQUFZLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3hDLE9BQU8sRUFBRSxDQUFDLHFCQUFZLENBQUM7S0FDeEIsQ0FBQztHQUNXLGtCQUFrQixDQUFJO0FBQXRCLGdEQUFrQiJ9