"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const effects_1 = require("@ngrx/effects");
const store_1 = require("@ngrx/store");
const enums_1 = require("@concourse/shared/enums");
const discovered_deployment_service_1 = require("./services/discovered-deployment.service");
const discovered_deployment_effects_1 = require("./state/discovered-deployment.effects");
const discovered_deployment_facade_1 = require("./state/discovered-deployment.facade");
const fromDiscoveredDeployment = require("./state/discovered-deployment.reducer");
let DiscoveredDeploymentStoreModule = class DiscoveredDeploymentStoreModule {
};
DiscoveredDeploymentStoreModule = __decorate([
    core_1.NgModule({
        imports: [
            store_1.StoreModule.forFeature(enums_1.StoreNames.DiscoveredDeployment, fromDiscoveredDeployment.reducer),
            effects_1.EffectsModule.forFeature([discovered_deployment_effects_1.DiscoveredDeploymentEffects])
        ],
        providers: [discovered_deployment_service_1.DiscoveredDeploymentService, discovered_deployment_facade_1.DiscoveredDeploymentFacade]
    })
], DiscoveredDeploymentStoreModule);
exports.DiscoveredDeploymentStoreModule = DiscoveredDeploymentStoreModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlzY292ZXJlZC1kZXBsb3ltZW50Lm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL2NvbmNvdXJzZS9qYXZhc2NyaXB0L2NvbmNvdXJzZS1hcHAvc3JjL2FwcC9zdG9yZS9kaXNjb3ZlcmVkLWRlcGxveW1lbnQvZGlzY292ZXJlZC1kZXBsb3ltZW50Lm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBLHdDQUF5QztBQUN6QywyQ0FBOEM7QUFDOUMsdUNBQTBDO0FBRTFDLG1EQUFxRDtBQUNyRCw0RkFBdUY7QUFDdkYseUZBQW9GO0FBQ3BGLHVGQUFrRjtBQUNsRixrRkFBa0Y7QUFTbEYsSUFBYSwrQkFBK0IsR0FBNUMsTUFBYSwrQkFBK0I7Q0FBSSxDQUFBO0FBQW5DLCtCQUErQjtJQVAzQyxlQUFRLENBQUM7UUFDUixPQUFPLEVBQUU7WUFDUCxtQkFBVyxDQUFDLFVBQVUsQ0FBQyxrQkFBVSxDQUFDLG9CQUFvQixFQUFFLHdCQUF3QixDQUFDLE9BQU8sQ0FBQztZQUN6Rix1QkFBYSxDQUFDLFVBQVUsQ0FBQyxDQUFDLDJEQUEyQixDQUFDLENBQUM7U0FDeEQ7UUFDRCxTQUFTLEVBQUUsQ0FBQywyREFBMkIsRUFBRSx5REFBMEIsQ0FBQztLQUNyRSxDQUFDO0dBQ1csK0JBQStCLENBQUk7QUFBbkMsMEVBQStCIn0=