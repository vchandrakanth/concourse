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
const routes = [
    { path: '', pathMatch: 'full', redirectTo: 'users' },
    {
        path: 'users',
        canActivate: [guards_1.RoleGuard],
        loadChildren: './users/users.module#UsersModule',
        data: {
            roles: 'MANAGE_USERS'
        }
    },
    {
        path: 'groups',
        canActivate: [guards_1.RoleGuard],
        loadChildren: './groups/groups.module#GroupsModule'
    }
];
let UserManagementRoutingModule = class UserManagementRoutingModule {
};
UserManagementRoutingModule = __decorate([
    core_1.NgModule({
        imports: [router_1.RouterModule.forChild(routes)],
        exports: [router_1.RouterModule]
    })
], UserManagementRoutingModule);
exports.UserManagementRoutingModule = UserManagementRoutingModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci1tYW5hZ2VtZW50LXJvdXRpbmcubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vY29uY291cnNlL2phdmFzY3JpcHQvY29uY291cnNlLWFwcC9zcmMvYXBwL3VzZXItbWFuYWdlbWVudC91c2VyLW1hbmFnZW1lbnQtcm91dGluZy5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQSx3Q0FBeUM7QUFDekMsNENBQXVEO0FBRXZELG1EQUFtRDtBQUVuRCxNQUFNLE1BQU0sR0FBVztJQUNyQixFQUFFLElBQUksRUFBRSxFQUFFLEVBQUUsU0FBUyxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsT0FBTyxFQUFFO0lBQ3BEO1FBQ0UsSUFBSSxFQUFFLE9BQU87UUFDYixXQUFXLEVBQUUsQ0FBQyxrQkFBUyxDQUFDO1FBQ3hCLFlBQVksRUFBRSxrQ0FBa0M7UUFDaEQsSUFBSSxFQUFFO1lBQ0osS0FBSyxFQUFFLGNBQWM7U0FDdEI7S0FDRjtJQUNEO1FBQ0UsSUFBSSxFQUFFLFFBQVE7UUFDZCxXQUFXLEVBQUUsQ0FBQyxrQkFBUyxDQUFDO1FBQ3hCLFlBQVksRUFBRSxxQ0FBcUM7S0FDcEQ7Q0FDRixDQUFDO0FBTUYsSUFBYSwyQkFBMkIsR0FBeEMsTUFBYSwyQkFBMkI7Q0FBSSxDQUFBO0FBQS9CLDJCQUEyQjtJQUp2QyxlQUFRLENBQUM7UUFDUixPQUFPLEVBQUUsQ0FBQyxxQkFBWSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUN4QyxPQUFPLEVBQUUsQ0FBQyxxQkFBWSxDQUFDO0tBQ3hCLENBQUM7R0FDVywyQkFBMkIsQ0FBSTtBQUEvQixrRUFBMkIifQ==