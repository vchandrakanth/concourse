"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@angular/common");
const core_1 = require("@angular/core");
const angular_fontawesome_1 = require("@fortawesome/angular-fontawesome");
const ngx_pipes_1 = require("ngx-pipes");
const shared_module_1 = require("@concourse/shared/shared.module");
const attribute_tag_routing_module_1 = require("./attribute-tag-routing.module");
const list_attribute_tags_component_1 = require("./list-attribute-tags/list-attribute-tags.component");
const view_attribute_tag_component_1 = require("./view-attribute-tag/view-attribute-tag.component");
const ngx_bootstrap_1 = require("ngx-bootstrap");
let AttributeTagModule = class AttributeTagModule {
};
AttributeTagModule = __decorate([
    core_1.NgModule({
        imports: [
            common_1.CommonModule,
            angular_fontawesome_1.FontAwesomeModule,
            ngx_pipes_1.NgArrayPipesModule,
            shared_module_1.SharedModule,
            ngx_bootstrap_1.TabsModule.forRoot(),
            attribute_tag_routing_module_1.AttributeTagRoutingModule
        ],
        declarations: [
            list_attribute_tags_component_1.ListAttributeTagsComponent,
            view_attribute_tag_component_1.ViewAttributeTagComponent
        ]
    })
], AttributeTagModule);
exports.AttributeTagModule = AttributeTagModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXR0cmlidXRlLXRhZy5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9jb25jb3Vyc2UvamF2YXNjcmlwdC9jb25jb3Vyc2UtYXBwL3NyYy9hcHAvYXR0cmlidXRlLXRhZy9hdHRyaWJ1dGUtdGFnLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBLDRDQUErQztBQUMvQyx3Q0FBeUM7QUFDekMsMEVBQXFFO0FBQ3JFLHlDQUErQztBQUUvQyxtRUFBK0Q7QUFDL0QsaUZBQTJFO0FBRTNFLHVHQUFpRztBQUNqRyxvR0FBOEY7QUFDOUYsaURBQTJDO0FBZ0IzQyxJQUFhLGtCQUFrQixHQUEvQixNQUFhLGtCQUFrQjtDQUFJLENBQUE7QUFBdEIsa0JBQWtCO0lBZDlCLGVBQVEsQ0FBQztRQUNSLE9BQU8sRUFBRTtZQUNQLHFCQUFZO1lBQ1osdUNBQWlCO1lBQ2pCLDhCQUFrQjtZQUNsQiw0QkFBWTtZQUNaLDBCQUFVLENBQUMsT0FBTyxFQUFFO1lBQ3BCLHdEQUF5QjtTQUMxQjtRQUNELFlBQVksRUFBRTtZQUNaLDBEQUEwQjtZQUMxQix3REFBeUI7U0FDMUI7S0FDRixDQUFDO0dBQ1csa0JBQWtCLENBQUk7QUFBdEIsZ0RBQWtCIn0=