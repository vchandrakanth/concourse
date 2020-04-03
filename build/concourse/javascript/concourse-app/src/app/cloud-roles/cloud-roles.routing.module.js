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
const list_cloud_roles_component_1 = require("./list-cloud-roles/list-cloud-roles.component");
const view_cloud_role_component_1 = require("./view-cloud-role/view-cloud-role.component");
const routes = [
    {
        path: '', component: list_cloud_roles_component_1.ListCloudRolesComponent, children: [
            { path: ':id', component: view_cloud_role_component_1.ViewCloudRoleComponent }
        ]
    }
];
let CloudRolesRoutingModule = class CloudRolesRoutingModule {
};
CloudRolesRoutingModule = __decorate([
    core_1.NgModule({
        imports: [router_1.RouterModule.forChild(routes)],
        exports: [router_1.RouterModule]
    })
], CloudRolesRoutingModule);
exports.CloudRolesRoutingModule = CloudRolesRoutingModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xvdWQtcm9sZXMucm91dGluZy5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9jb25jb3Vyc2UvamF2YXNjcmlwdC9jb25jb3Vyc2UtYXBwL3NyYy9hcHAvY2xvdWQtcm9sZXMvY2xvdWQtcm9sZXMucm91dGluZy5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQSx3Q0FBeUM7QUFDekMsNENBQXVEO0FBRXZELDhGQUF3RjtBQUN4RiwyRkFBcUY7QUFFckYsTUFBTSxNQUFNLEdBQVc7SUFDckI7UUFDRSxJQUFJLEVBQUUsRUFBRSxFQUFFLFNBQVMsRUFBRSxvREFBdUIsRUFBRSxRQUFRLEVBQUU7WUFDdEQsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBRSxrREFBc0IsRUFBRTtTQUNuRDtLQUNGO0NBQ0YsQ0FBQztBQU1GLElBQWEsdUJBQXVCLEdBQXBDLE1BQWEsdUJBQXVCO0NBQUksQ0FBQTtBQUEzQix1QkFBdUI7SUFKbkMsZUFBUSxDQUFDO1FBQ1IsT0FBTyxFQUFFLENBQUMscUJBQVksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDeEMsT0FBTyxFQUFFLENBQUMscUJBQVksQ0FBQztLQUN4QixDQUFDO0dBQ1csdUJBQXVCLENBQUk7QUFBM0IsMERBQXVCIn0=