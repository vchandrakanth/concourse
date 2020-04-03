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
const list_inst_component_1 = require("./list-inst/list-inst.component");
const view_inst_component_1 = require("./view-inst/view-inst.component");
const routes = [
    {
        path: '', component: list_inst_component_1.ListInstComponent, children: [
            { path: ':id', component: view_inst_component_1.ViewInstComponent }
        ]
    }
];
let InstitutionsRoutingModule = class InstitutionsRoutingModule {
};
InstitutionsRoutingModule = __decorate([
    core_1.NgModule({
        imports: [router_1.RouterModule.forChild(routes)],
        exports: [router_1.RouterModule]
    })
], InstitutionsRoutingModule);
exports.InstitutionsRoutingModule = InstitutionsRoutingModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5zdGl0dXRpb25zLXJvdXRpbmcubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vY29uY291cnNlL2phdmFzY3JpcHQvY29uY291cnNlLWFwcC9zcmMvYXBwL2NvbmNvdXJzZS1hZG1pbi9pbnN0aXR1dGlvbnMvaW5zdGl0dXRpb25zLXJvdXRpbmcubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUEsd0NBQXlDO0FBQ3pDLDRDQUF1RDtBQUV2RCx5RUFBb0U7QUFDcEUseUVBQW9FO0FBRXBFLE1BQU0sTUFBTSxHQUFXO0lBQ3JCO1FBQ0UsSUFBSSxFQUFFLEVBQUUsRUFBRSxTQUFTLEVBQUUsdUNBQWlCLEVBQUUsUUFBUSxFQUFFO1lBQ2hELEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUUsdUNBQWlCLEVBQUU7U0FDOUM7S0FDRjtDQUNGLENBQUM7QUFNRixJQUFhLHlCQUF5QixHQUF0QyxNQUFhLHlCQUF5QjtDQUFJLENBQUE7QUFBN0IseUJBQXlCO0lBSnJDLGVBQVEsQ0FBQztRQUNSLE9BQU8sRUFBRSxDQUFDLHFCQUFZLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3hDLE9BQU8sRUFBRSxDQUFDLHFCQUFZLENBQUM7S0FDeEIsQ0FBQztHQUNXLHlCQUF5QixDQUFJO0FBQTdCLDhEQUF5QiJ9