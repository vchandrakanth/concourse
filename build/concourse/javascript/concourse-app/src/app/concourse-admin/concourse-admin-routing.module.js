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
const routes = [
    { path: '', pathMatch: 'full', redirectTo: 'institutions' },
    { path: 'institutions', loadChildren: './institutions/institutions.module#InstitutionsModule' }
];
let ConcourseAdminRoutingModule = class ConcourseAdminRoutingModule {
};
ConcourseAdminRoutingModule = __decorate([
    core_1.NgModule({
        imports: [router_1.RouterModule.forChild(routes)],
        exports: [router_1.RouterModule]
    })
], ConcourseAdminRoutingModule);
exports.ConcourseAdminRoutingModule = ConcourseAdminRoutingModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uY291cnNlLWFkbWluLXJvdXRpbmcubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vY29uY291cnNlL2phdmFzY3JpcHQvY29uY291cnNlLWFwcC9zcmMvYXBwL2NvbmNvdXJzZS1hZG1pbi9jb25jb3Vyc2UtYWRtaW4tcm91dGluZy5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQSx3Q0FBeUM7QUFDekMsNENBQXVEO0FBRXZELE1BQU0sTUFBTSxHQUFXO0lBQ3JCLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRSxTQUFTLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxjQUFjLEVBQUU7SUFDM0QsRUFBRSxJQUFJLEVBQUUsY0FBYyxFQUFFLFlBQVksRUFBRSx1REFBdUQsRUFBRTtDQUNoRyxDQUFDO0FBTUYsSUFBYSwyQkFBMkIsR0FBeEMsTUFBYSwyQkFBMkI7Q0FBSSxDQUFBO0FBQS9CLDJCQUEyQjtJQUp2QyxlQUFRLENBQUM7UUFDUixPQUFPLEVBQUUsQ0FBQyxxQkFBWSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUN4QyxPQUFPLEVBQUUsQ0FBQyxxQkFBWSxDQUFDO0tBQ3hCLENBQUM7R0FDVywyQkFBMkIsQ0FBSTtBQUEvQixrRUFBMkIifQ==