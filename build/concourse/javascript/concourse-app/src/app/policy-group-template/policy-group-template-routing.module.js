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
const policy_group_template_list_component_1 = require("./policy-group-template-list/policy-group-template-list.component");
const policy_group_template_view_component_1 = require("./policy-group-template-view/policy-group-template-view.component");
const routes = [
    {
        path: '', component: policy_group_template_list_component_1.PolicyGroupTemplateListComponent, children: [
            { path: ':id', component: policy_group_template_view_component_1.PolicyGroupTemplateViewComponent }
        ]
    }
];
let PolicyGroupTemplateRoutingModule = class PolicyGroupTemplateRoutingModule {
};
PolicyGroupTemplateRoutingModule = __decorate([
    core_1.NgModule({
        imports: [router_1.RouterModule.forChild(routes)],
        exports: [router_1.RouterModule]
    })
], PolicyGroupTemplateRoutingModule);
exports.PolicyGroupTemplateRoutingModule = PolicyGroupTemplateRoutingModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9saWN5LWdyb3VwLXRlbXBsYXRlLXJvdXRpbmcubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vY29uY291cnNlL2phdmFzY3JpcHQvY29uY291cnNlLWFwcC9zcmMvYXBwL3BvbGljeS1ncm91cC10ZW1wbGF0ZS9wb2xpY3ktZ3JvdXAtdGVtcGxhdGUtcm91dGluZy5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQSx3Q0FBeUM7QUFDekMsNENBQXVEO0FBQ3ZELDRIQUFxSDtBQUNySCw0SEFBcUg7QUFFckgsTUFBTSxNQUFNLEdBQVc7SUFDckI7UUFDRSxJQUFJLEVBQUUsRUFBRSxFQUFFLFNBQVMsRUFBRSx1RUFBZ0MsRUFBRSxRQUFRLEVBQzdEO1lBQ0UsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBRSx1RUFBZ0MsRUFBRTtTQUM3RDtLQUNKO0NBQ0YsQ0FBQztBQU1GLElBQWEsZ0NBQWdDLEdBQTdDLE1BQWEsZ0NBQWdDO0NBQUksQ0FBQTtBQUFwQyxnQ0FBZ0M7SUFKNUMsZUFBUSxDQUFDO1FBQ1IsT0FBTyxFQUFFLENBQUMscUJBQVksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDeEMsT0FBTyxFQUFFLENBQUMscUJBQVksQ0FBQztLQUN4QixDQUFDO0dBQ1csZ0NBQWdDLENBQUk7QUFBcEMsNEVBQWdDIn0=