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
const baseline_assets_details_component_1 = require("./baseline-assets-details/baseline-assets-details.component");
const baseline_assets_list_component_1 = require("./baseline-assets-list/baseline-assets-list.component");
const routes = [
    { path: '', component: baseline_assets_list_component_1.BaselineAssetsListComponent, children: [
            { path: ':id', component: baseline_assets_details_component_1.BaselineAssetsDetailsComponent }
        ] }
];
let BaselineAssetsRoutingModule = class BaselineAssetsRoutingModule {
};
BaselineAssetsRoutingModule = __decorate([
    core_1.NgModule({
        imports: [router_1.RouterModule.forChild(routes)],
        exports: [router_1.RouterModule]
    })
], BaselineAssetsRoutingModule);
exports.BaselineAssetsRoutingModule = BaselineAssetsRoutingModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzZWxpbmUtYXNzZXRzLXJvdXRpbmcubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vY29uY291cnNlL2phdmFzY3JpcHQvY29uY291cnNlLWFwcC9zcmMvYXBwL2Jhc2VsaW5lLWFzc2V0cy9iYXNlbGluZS1hc3NldHMtcm91dGluZy5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQSx3Q0FBeUM7QUFDekMsNENBQXVEO0FBQ3ZELG1IQUE2RztBQUM3RywwR0FBb0c7QUFFcEcsTUFBTSxNQUFNLEdBQVc7SUFDckIsRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFLFNBQVMsRUFBRSw0REFBMkIsRUFBRSxRQUFRLEVBQUU7WUFDNUQsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBRSxrRUFBOEIsRUFBRTtTQUMzRCxFQUFFO0NBQ0osQ0FBQztBQU1GLElBQWEsMkJBQTJCLEdBQXhDLE1BQWEsMkJBQTJCO0NBQUksQ0FBQTtBQUEvQiwyQkFBMkI7SUFKdkMsZUFBUSxDQUFDO1FBQ1IsT0FBTyxFQUFFLENBQUMscUJBQVksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDeEMsT0FBTyxFQUFFLENBQUMscUJBQVksQ0FBQztLQUN4QixDQUFDO0dBQ1csMkJBQTJCLENBQUk7QUFBL0Isa0VBQTJCIn0=