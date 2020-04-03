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
const dynamic_form_1 = require("@concourse/shared/dynamic-form");
const shared_module_1 = require("@concourse/shared/shared.module");
const angular_fontawesome_1 = require("@fortawesome/angular-fontawesome");
const tabs_1 = require("ngx-bootstrap/tabs");
const tooltip_1 = require("ngx-bootstrap/tooltip");
const ngx_pipes_1 = require("ngx-pipes");
const org_tree_routing_module_1 = require("./org-tree-routing.module");
const panzoom_service_1 = require("./panzoom.service");
const modal_1 = require("@concourse/core/modal");
const deployments_tab_component_1 = require("./deployments-tab/deployments-tab.component");
const logical_deployments_tab_component_1 = require("./logical-deployments-tab/logical-deployments-tab.component");
const org_chart_component_1 = require("./org-chart/org-chart.component");
const policy_group_tab_component_1 = require("./policy-group-tab/policy-group-tab.component");
const role_tab_component_1 = require("./role-tab/role-tab.component");
const tree_component_1 = require("./tree/tree.component");
const view_node_component_1 = require("./view-node/view-node.component");
let OrgTreeModule = class OrgTreeModule {
};
OrgTreeModule = __decorate([
    core_1.NgModule({
        imports: [
            common_1.CommonModule,
            angular_fontawesome_1.FontAwesomeModule,
            tabs_1.TabsModule.forRoot(),
            tooltip_1.TooltipModule.forRoot(),
            ngx_pipes_1.NgArrayPipesModule,
            shared_module_1.SharedModule,
            dynamic_form_1.DynamicFormModule,
            org_tree_routing_module_1.OrgTreeRoutingModule,
            modal_1.ModalModule
        ],
        providers: [panzoom_service_1.PanzoomService],
        declarations: [
            org_chart_component_1.OrgChartComponent,
            tree_component_1.TreeComponent,
            view_node_component_1.ViewNodeComponent,
            policy_group_tab_component_1.PolicyGroupTabComponent,
            deployments_tab_component_1.DeploymentsTabComponent,
            role_tab_component_1.RoleTabComponent,
            logical_deployments_tab_component_1.LogicalDeploymentsTabComponent
        ]
    })
], OrgTreeModule);
exports.OrgTreeModule = OrgTreeModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3JnLXRyZWUubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vY29uY291cnNlL2phdmFzY3JpcHQvY29uY291cnNlLWFwcC9zcmMvYXBwL29yZy10cmVlL29yZy10cmVlLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBLDRDQUErQztBQUMvQyx3Q0FBeUM7QUFDekMsaUVBQW1FO0FBQ25FLG1FQUErRDtBQUMvRCwwRUFBcUU7QUFDckUsNkNBQWdEO0FBQ2hELG1EQUFzRDtBQUN0RCx5Q0FBK0M7QUFFL0MsdUVBQWlFO0FBQ2pFLHVEQUFtRDtBQUVuRCxpREFBb0Q7QUFDcEQsMkZBQXNGO0FBQ3RGLG1IQUE2RztBQUM3Ryx5RUFBb0U7QUFDcEUsOEZBQXdGO0FBQ3hGLHNFQUFpRTtBQUNqRSwwREFBc0Q7QUFDdEQseUVBQW9FO0FBeUJwRSxJQUFhLGFBQWEsR0FBMUIsTUFBYSxhQUFhO0NBQUksQ0FBQTtBQUFqQixhQUFhO0lBdkJ6QixlQUFRLENBQUM7UUFDUixPQUFPLEVBQUU7WUFDUCxxQkFBWTtZQUNaLHVDQUFpQjtZQUNqQixpQkFBVSxDQUFDLE9BQU8sRUFBRTtZQUNwQix1QkFBYSxDQUFDLE9BQU8sRUFBRTtZQUN2Qiw4QkFBa0I7WUFDbEIsNEJBQVk7WUFDWixnQ0FBaUI7WUFDakIsOENBQW9CO1lBQ3BCLG1CQUFXO1NBQ1o7UUFDRCxTQUFTLEVBQUUsQ0FBQyxnQ0FBYyxDQUFDO1FBQzNCLFlBQVksRUFBRTtZQUNaLHVDQUFpQjtZQUNqQiw4QkFBYTtZQUNiLHVDQUFpQjtZQUNqQixvREFBdUI7WUFDdkIsbURBQXVCO1lBQ3ZCLHFDQUFnQjtZQUNoQixrRUFBOEI7U0FDL0I7S0FDRixDQUFDO0dBQ1csYUFBYSxDQUFJO0FBQWpCLHNDQUFhIn0=