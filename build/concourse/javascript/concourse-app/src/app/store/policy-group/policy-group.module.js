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
const policy_group_service_1 = require("./services/policy-group.service");
const policy_group_effects_1 = require("./state/policy-group.effects");
const policy_group_facade_1 = require("./state/policy-group.facade");
const fromPolicyGroup = require("./state/policy-group.reducer");
let PolicyGroupStoreModule = class PolicyGroupStoreModule {
};
PolicyGroupStoreModule = __decorate([
    core_1.NgModule({
        imports: [
            store_1.StoreModule.forFeature(enums_1.StoreNames.PolicyGroup, fromPolicyGroup.reducer),
            effects_1.EffectsModule.forFeature([policy_group_effects_1.PolicyGroupEffects])
        ],
        providers: [policy_group_service_1.PolicyGroupService, policy_group_facade_1.PolicyGroupFacade]
    })
], PolicyGroupStoreModule);
exports.PolicyGroupStoreModule = PolicyGroupStoreModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9saWN5LWdyb3VwLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL2NvbmNvdXJzZS9qYXZhc2NyaXB0L2NvbmNvdXJzZS1hcHAvc3JjL2FwcC9zdG9yZS9wb2xpY3ktZ3JvdXAvcG9saWN5LWdyb3VwLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBLHdDQUF5QztBQUN6QywyQ0FBOEM7QUFDOUMsdUNBQTBDO0FBRTFDLG1EQUFxRDtBQUNyRCwwRUFBcUU7QUFDckUsdUVBQWtFO0FBQ2xFLHFFQUFnRTtBQUNoRSxnRUFBZ0U7QUFTaEUsSUFBYSxzQkFBc0IsR0FBbkMsTUFBYSxzQkFBc0I7Q0FBSSxDQUFBO0FBQTFCLHNCQUFzQjtJQVBsQyxlQUFRLENBQUM7UUFDUixPQUFPLEVBQUU7WUFDUCxtQkFBVyxDQUFDLFVBQVUsQ0FBQyxrQkFBVSxDQUFDLFdBQVcsRUFBRSxlQUFlLENBQUMsT0FBTyxDQUFDO1lBQ3ZFLHVCQUFhLENBQUMsVUFBVSxDQUFDLENBQUMseUNBQWtCLENBQUMsQ0FBQztTQUMvQztRQUNELFNBQVMsRUFBRSxDQUFDLHlDQUFrQixFQUFFLHVDQUFpQixDQUFDO0tBQ25ELENBQUM7R0FDVyxzQkFBc0IsQ0FBSTtBQUExQix3REFBc0IifQ==