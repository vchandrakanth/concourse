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
const logical_deployment_service_1 = require("./services/logical-deployment.service");
const logical_deployment_effects_1 = require("./state/logical-deployment.effects");
const logical_deployment_facade_1 = require("./state/logical-deployment.facade");
const fromLogicalDeployment = require("./state/logical-deployment.reducer");
let LogicalDeploymentStoreModule = class LogicalDeploymentStoreModule {
};
LogicalDeploymentStoreModule = __decorate([
    core_1.NgModule({
        imports: [
            store_1.StoreModule.forFeature(enums_1.StoreNames.LogicalDeployment, fromLogicalDeployment.reducer),
            effects_1.EffectsModule.forFeature([logical_deployment_effects_1.LogicalDeploymentEffects])
        ],
        providers: [logical_deployment_service_1.LogicalDeploymentService, logical_deployment_facade_1.LogicalDeploymentFacade]
    })
], LogicalDeploymentStoreModule);
exports.LogicalDeploymentStoreModule = LogicalDeploymentStoreModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9naWNhbC1kZXBsb3ltZW50Lm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL2NvbmNvdXJzZS9qYXZhc2NyaXB0L2NvbmNvdXJzZS1hcHAvc3JjL2FwcC9zdG9yZS9sb2dpY2FsLWRlcGxveW1lbnQvbG9naWNhbC1kZXBsb3ltZW50Lm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBLHdDQUF5QztBQUN6QywyQ0FBOEM7QUFDOUMsdUNBQTBDO0FBRTFDLG1EQUFxRDtBQUNyRCxzRkFBaUY7QUFDakYsbUZBQThFO0FBQzlFLGlGQUE0RTtBQUM1RSw0RUFBNEU7QUFTNUUsSUFBYSw0QkFBNEIsR0FBekMsTUFBYSw0QkFBNEI7Q0FBSSxDQUFBO0FBQWhDLDRCQUE0QjtJQVB4QyxlQUFRLENBQUM7UUFDUixPQUFPLEVBQUU7WUFDUCxtQkFBVyxDQUFDLFVBQVUsQ0FBQyxrQkFBVSxDQUFDLGlCQUFpQixFQUFFLHFCQUFxQixDQUFDLE9BQU8sQ0FBQztZQUNuRix1QkFBYSxDQUFDLFVBQVUsQ0FBQyxDQUFDLHFEQUF3QixDQUFDLENBQUM7U0FDckQ7UUFDRCxTQUFTLEVBQUUsQ0FBQyxxREFBd0IsRUFBRSxtREFBdUIsQ0FBQztLQUMvRCxDQUFDO0dBQ1csNEJBQTRCLENBQUk7QUFBaEMsb0VBQTRCIn0=