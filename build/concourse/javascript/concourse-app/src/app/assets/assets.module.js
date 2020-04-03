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
const ngx_datatable_1 = require("@swimlane/ngx-datatable");
const ngx_bootstrap_1 = require("ngx-bootstrap");
const ngx_pipes_1 = require("ngx-pipes");
const shared_module_1 = require("@concourse/shared/shared.module");
const assets_list_item_component_1 = require("./assets-list-item/assets-list-item.component");
const assets_list_component_1 = require("./assets-list/assets-list.component");
const assets_routing_module_1 = require("./assets-routing.module");
let AssetsModule = class AssetsModule {
};
AssetsModule = __decorate([
    core_1.NgModule({
        imports: [
            common_1.CommonModule,
            angular_fontawesome_1.FontAwesomeModule,
            ngx_bootstrap_1.TabsModule.forRoot(),
            ngx_datatable_1.NgxDatatableModule,
            ngx_pipes_1.NgArrayPipesModule,
            ngx_pipes_1.NgStringPipesModule,
            shared_module_1.SharedModule,
            assets_routing_module_1.AssetsRoutingModule
        ],
        declarations: [
            assets_list_component_1.AssetsListComponent,
            assets_list_item_component_1.AssetsListItemComponent
        ]
    })
], AssetsModule);
exports.AssetsModule = AssetsModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXNzZXRzLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL2NvbmNvdXJzZS9qYXZhc2NyaXB0L2NvbmNvdXJzZS1hcHAvc3JjL2FwcC9hc3NldHMvYXNzZXRzLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBLDRDQUErQztBQUMvQyx3Q0FBeUM7QUFDekMsMEVBQXFFO0FBQ3JFLDJEQUE2RDtBQUM3RCxpREFBMkM7QUFDM0MseUNBQW9FO0FBRXBFLG1FQUErRDtBQUUvRCw4RkFBd0Y7QUFDeEYsK0VBQTBFO0FBQzFFLG1FQUE4RDtBQWtCOUQsSUFBYSxZQUFZLEdBQXpCLE1BQWEsWUFBWTtDQUFJLENBQUE7QUFBaEIsWUFBWTtJQWhCeEIsZUFBUSxDQUFDO1FBQ1IsT0FBTyxFQUFFO1lBQ1AscUJBQVk7WUFDWix1Q0FBaUI7WUFDakIsMEJBQVUsQ0FBQyxPQUFPLEVBQUU7WUFDcEIsa0NBQWtCO1lBQ2xCLDhCQUFrQjtZQUNsQiwrQkFBbUI7WUFDbkIsNEJBQVk7WUFDWiwyQ0FBbUI7U0FDcEI7UUFDRCxZQUFZLEVBQUU7WUFDWiwyQ0FBbUI7WUFDbkIsb0RBQXVCO1NBQ3hCO0tBQ0YsQ0FBQztHQUNXLFlBQVksQ0FBSTtBQUFoQixvQ0FBWSJ9