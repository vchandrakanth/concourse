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
const list_attribute_tags_component_1 = require("./list-attribute-tags/list-attribute-tags.component");
const view_attribute_tag_component_1 = require("./view-attribute-tag/view-attribute-tag.component");
const routes = [
    {
        path: '', component: list_attribute_tags_component_1.ListAttributeTagsComponent, children: [
            { path: ':id', component: view_attribute_tag_component_1.ViewAttributeTagComponent }
        ]
    }
];
let AttributeTagRoutingModule = class AttributeTagRoutingModule {
};
AttributeTagRoutingModule = __decorate([
    core_1.NgModule({
        imports: [router_1.RouterModule.forChild(routes)],
        exports: [router_1.RouterModule]
    })
], AttributeTagRoutingModule);
exports.AttributeTagRoutingModule = AttributeTagRoutingModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXR0cmlidXRlLXRhZy1yb3V0aW5nLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL2NvbmNvdXJzZS9qYXZhc2NyaXB0L2NvbmNvdXJzZS1hcHAvc3JjL2FwcC9hdHRyaWJ1dGUtdGFnL2F0dHJpYnV0ZS10YWctcm91dGluZy5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQSx3Q0FBeUM7QUFDekMsNENBQXVEO0FBRXZELHVHQUFpRztBQUNqRyxvR0FBOEY7QUFFOUYsTUFBTSxNQUFNLEdBQVc7SUFDckI7UUFDRSxJQUFJLEVBQUUsRUFBRSxFQUFFLFNBQVMsRUFBRSwwREFBMEIsRUFBRSxRQUFRLEVBQUU7WUFDekQsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBRSx3REFBeUIsRUFBRTtTQUN0RDtLQUNGO0NBQ0YsQ0FBQztBQU1GLElBQWEseUJBQXlCLEdBQXRDLE1BQWEseUJBQXlCO0NBQUksQ0FBQTtBQUE3Qix5QkFBeUI7SUFKckMsZUFBUSxDQUFDO1FBQ1IsT0FBTyxFQUFFLENBQUMscUJBQVksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDeEMsT0FBTyxFQUFFLENBQUMscUJBQVksQ0FBQztLQUN4QixDQUFDO0dBQ1cseUJBQXlCLENBQUk7QUFBN0IsOERBQXlCIn0=