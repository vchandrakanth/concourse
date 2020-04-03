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
const list_policy_groups_component_1 = require("./list-policy-groups/list-policy-groups.component");
const view_policy_group_component_1 = require("./view-policy-group/view-policy-group.component");
const routes = [
    {
        path: '', component: list_policy_groups_component_1.ListPolicyGroupsComponent, children: [
            { path: ':id', component: view_policy_group_component_1.ViewPolicyGroupComponent }
        ]
    }
];
let PolicyGroupRoutingModule = class PolicyGroupRoutingModule {
};
PolicyGroupRoutingModule = __decorate([
    core_1.NgModule({
        imports: [router_1.RouterModule.forChild(routes)],
        exports: [router_1.RouterModule]
    })
], PolicyGroupRoutingModule);
exports.PolicyGroupRoutingModule = PolicyGroupRoutingModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9saWN5LWdyb3Vwcy1yb3V0aW5nLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL2NvbmNvdXJzZS9qYXZhc2NyaXB0L2NvbmNvdXJzZS1hcHAvc3JjL2FwcC9wb2xpY3ktZ3JvdXBzL3BvbGljeS1ncm91cHMtcm91dGluZy5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQSx3Q0FBeUM7QUFDekMsNENBQXVEO0FBRXZELG9HQUE4RjtBQUM5RixpR0FBMkY7QUFFM0YsTUFBTSxNQUFNLEdBQVc7SUFDckI7UUFDRSxJQUFJLEVBQUUsRUFBRSxFQUFFLFNBQVMsRUFBRSx3REFBeUIsRUFBRSxRQUFRLEVBQUU7WUFDeEQsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBRSxzREFBd0IsRUFBRTtTQUNyRDtLQUNGO0NBQ0YsQ0FBQztBQU1GLElBQWEsd0JBQXdCLEdBQXJDLE1BQWEsd0JBQXdCO0NBQUksQ0FBQTtBQUE1Qix3QkFBd0I7SUFKcEMsZUFBUSxDQUFDO1FBQ1IsT0FBTyxFQUFFLENBQUMscUJBQVksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDeEMsT0FBTyxFQUFFLENBQUMscUJBQVksQ0FBQztLQUN4QixDQUFDO0dBQ1csd0JBQXdCLENBQUk7QUFBNUIsNERBQXdCIn0=