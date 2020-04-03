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
const tabs_1 = require("ngx-bootstrap/tabs");
const shared_module_1 = require("@concourse/shared/shared.module");
const cloud_roles_routing_module_1 = require("./cloud-roles.routing.module");
const list_cloud_roles_component_1 = require("./list-cloud-roles/list-cloud-roles.component");
const view_cloud_role_component_1 = require("./view-cloud-role/view-cloud-role.component");
let CloudRolesModule = class CloudRolesModule {
};
CloudRolesModule = __decorate([
    core_1.NgModule({
        imports: [
            common_1.CommonModule,
            angular_fontawesome_1.FontAwesomeModule,
            tabs_1.TabsModule.forRoot(),
            shared_module_1.SharedModule,
            cloud_roles_routing_module_1.CloudRolesRoutingModule
        ],
        declarations: [
            list_cloud_roles_component_1.ListCloudRolesComponent,
            view_cloud_role_component_1.ViewCloudRoleComponent
        ]
    })
], CloudRolesModule);
exports.CloudRolesModule = CloudRolesModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xvdWQtcm9sZXMubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vY29uY291cnNlL2phdmFzY3JpcHQvY29uY291cnNlLWFwcC9zcmMvYXBwL2Nsb3VkLXJvbGVzL2Nsb3VkLXJvbGVzLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBLDRDQUErQztBQUMvQyx3Q0FBeUM7QUFDekMsMEVBQXFFO0FBQ3JFLDZDQUFnRDtBQUVoRCxtRUFBK0Q7QUFDL0QsNkVBQXVFO0FBQ3ZFLDhGQUF3RjtBQUN4RiwyRkFBcUY7QUFlckYsSUFBYSxnQkFBZ0IsR0FBN0IsTUFBYSxnQkFBZ0I7Q0FBSSxDQUFBO0FBQXBCLGdCQUFnQjtJQWI1QixlQUFRLENBQUM7UUFDUixPQUFPLEVBQUU7WUFDUCxxQkFBWTtZQUNaLHVDQUFpQjtZQUNqQixpQkFBVSxDQUFDLE9BQU8sRUFBRTtZQUNwQiw0QkFBWTtZQUNaLG9EQUF1QjtTQUN4QjtRQUNELFlBQVksRUFBRTtZQUNaLG9EQUF1QjtZQUN2QixrREFBc0I7U0FDdkI7S0FDRixDQUFDO0dBQ1csZ0JBQWdCLENBQUk7QUFBcEIsNENBQWdCIn0=