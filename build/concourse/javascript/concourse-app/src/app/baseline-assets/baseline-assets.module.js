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
const shared_module_1 = require("@concourse/shared/shared.module");
const angular_fontawesome_1 = require("@fortawesome/angular-fontawesome");
const ngx_charts_1 = require("@swimlane/ngx-charts");
const ngx_datatable_1 = require("@swimlane/ngx-datatable");
const ngx_bootstrap_1 = require("ngx-bootstrap");
const ngx_pipes_1 = require("ngx-pipes");
const baseline_assets_details_component_1 = require("./baseline-assets-details/baseline-assets-details.component");
const baseline_assets_list_component_1 = require("./baseline-assets-list/baseline-assets-list.component");
const baseline_assets_routing_module_1 = require("./baseline-assets-routing.module");
let BaselineAssetsModule = class BaselineAssetsModule {
};
BaselineAssetsModule = __decorate([
    core_1.NgModule({
        declarations: [baseline_assets_list_component_1.BaselineAssetsListComponent, baseline_assets_details_component_1.BaselineAssetsDetailsComponent],
        imports: [
            common_1.CommonModule,
            angular_fontawesome_1.FontAwesomeModule,
            ngx_pipes_1.NgArrayPipesModule,
            ngx_datatable_1.NgxDatatableModule,
            ngx_charts_1.NgxChartsModule,
            baseline_assets_routing_module_1.BaselineAssetsRoutingModule,
            ngx_bootstrap_1.TabsModule.forRoot(),
            shared_module_1.SharedModule
        ]
    })
], BaselineAssetsModule);
exports.BaselineAssetsModule = BaselineAssetsModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzZWxpbmUtYXNzZXRzLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL2NvbmNvdXJzZS9qYXZhc2NyaXB0L2NvbmNvdXJzZS1hcHAvc3JjL2FwcC9iYXNlbGluZS1hc3NldHMvYmFzZWxpbmUtYXNzZXRzLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBLDRDQUErQztBQUMvQyx3Q0FBeUM7QUFDekMsbUVBQStEO0FBQy9ELDBFQUFxRTtBQUNyRSxxREFBdUQ7QUFDdkQsMkRBQTZEO0FBQzdELGlEQUEyQztBQUMzQyx5Q0FBK0M7QUFDL0MsbUhBQTZHO0FBQzdHLDBHQUFvRztBQUNwRyxxRkFBK0U7QUFlL0UsSUFBYSxvQkFBb0IsR0FBakMsTUFBYSxvQkFBb0I7Q0FBSSxDQUFBO0FBQXhCLG9CQUFvQjtJQWJoQyxlQUFRLENBQUM7UUFDUixZQUFZLEVBQUUsQ0FBQyw0REFBMkIsRUFBRSxrRUFBOEIsQ0FBQztRQUMzRSxPQUFPLEVBQUU7WUFDUCxxQkFBWTtZQUNaLHVDQUFpQjtZQUNqQiw4QkFBa0I7WUFDbEIsa0NBQWtCO1lBQ2xCLDRCQUFlO1lBQ2YsNERBQTJCO1lBQzNCLDBCQUFVLENBQUMsT0FBTyxFQUFFO1lBQ3BCLDRCQUFZO1NBQ2I7S0FDRixDQUFDO0dBQ1csb0JBQW9CLENBQUk7QUFBeEIsb0RBQW9CIn0=