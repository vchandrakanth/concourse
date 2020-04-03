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
const tree_component_1 = require("./tree/tree.component");
const view_node_component_1 = require("./view-node/view-node.component");
const routes = [
    {
        path: '', component: tree_component_1.TreeComponent,
        children: [
            { path: ':id', component: view_node_component_1.ViewNodeComponent }
        ]
    }
];
let OrgTreeRoutingModule = class OrgTreeRoutingModule {
};
OrgTreeRoutingModule = __decorate([
    core_1.NgModule({
        imports: [router_1.RouterModule.forChild(routes)],
        exports: [router_1.RouterModule]
    })
], OrgTreeRoutingModule);
exports.OrgTreeRoutingModule = OrgTreeRoutingModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3JnLXRyZWUtcm91dGluZy5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9jb25jb3Vyc2UvamF2YXNjcmlwdC9jb25jb3Vyc2UtYXBwL3NyYy9hcHAvb3JnLXRyZWUvb3JnLXRyZWUtcm91dGluZy5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQSx3Q0FBeUM7QUFDekMsNENBQXVEO0FBRXZELDBEQUFzRDtBQUN0RCx5RUFBb0U7QUFFcEUsTUFBTSxNQUFNLEdBQVc7SUFDckI7UUFDRSxJQUFJLEVBQUUsRUFBRSxFQUFFLFNBQVMsRUFBRSw4QkFBYTtRQUNsQyxRQUFRLEVBQUU7WUFDUixFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFFLHVDQUFpQixFQUFFO1NBQzlDO0tBQ0Y7Q0FDRixDQUFDO0FBTUYsSUFBYSxvQkFBb0IsR0FBakMsTUFBYSxvQkFBb0I7Q0FBSSxDQUFBO0FBQXhCLG9CQUFvQjtJQUpoQyxlQUFRLENBQUM7UUFDUixPQUFPLEVBQUUsQ0FBQyxxQkFBWSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUN4QyxPQUFPLEVBQUUsQ0FBQyxxQkFBWSxDQUFDO0tBQ3hCLENBQUM7R0FDVyxvQkFBb0IsQ0FBSTtBQUF4QixvREFBb0IifQ==