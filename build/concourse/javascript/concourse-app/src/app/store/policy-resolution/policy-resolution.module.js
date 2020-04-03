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
const policy_resolution_service_1 = require("./services/policy-resolution.service");
const policy_resolution_effects_1 = require("./state/policy-resolution.effects");
const policy_resolution_facade_1 = require("./state/policy-resolution.facade");
const fromPolicyResolution = require("./state/policy-resolution.reducer");
let PolicyStoreResolutionModule = class PolicyStoreResolutionModule {
};
PolicyStoreResolutionModule = __decorate([
    core_1.NgModule({
        imports: [
            store_1.StoreModule.forFeature(enums_1.StoreNames.PolicyResolution, fromPolicyResolution.reducer),
            effects_1.EffectsModule.forFeature([policy_resolution_effects_1.PolicyResolutionEffects])
        ],
        providers: [policy_resolution_service_1.PolicyResolutionService, policy_resolution_facade_1.PolicyResolutionFacade]
    })
], PolicyStoreResolutionModule);
exports.PolicyStoreResolutionModule = PolicyStoreResolutionModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9saWN5LXJlc29sdXRpb24ubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vY29uY291cnNlL2phdmFzY3JpcHQvY29uY291cnNlLWFwcC9zcmMvYXBwL3N0b3JlL3BvbGljeS1yZXNvbHV0aW9uL3BvbGljeS1yZXNvbHV0aW9uLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBLHdDQUF5QztBQUN6QywyQ0FBOEM7QUFDOUMsdUNBQTBDO0FBRTFDLG1EQUFxRDtBQUNyRCxvRkFBK0U7QUFDL0UsaUZBQTRFO0FBQzVFLCtFQUEwRTtBQUMxRSwwRUFBMEU7QUFTMUUsSUFBYSwyQkFBMkIsR0FBeEMsTUFBYSwyQkFBMkI7Q0FBSSxDQUFBO0FBQS9CLDJCQUEyQjtJQVB2QyxlQUFRLENBQUM7UUFDUixPQUFPLEVBQUU7WUFDUCxtQkFBVyxDQUFDLFVBQVUsQ0FBQyxrQkFBVSxDQUFDLGdCQUFnQixFQUFFLG9CQUFvQixDQUFDLE9BQU8sQ0FBQztZQUNqRix1QkFBYSxDQUFDLFVBQVUsQ0FBQyxDQUFDLG1EQUF1QixDQUFDLENBQUM7U0FDcEQ7UUFDRCxTQUFTLEVBQUUsQ0FBQyxtREFBdUIsRUFBRSxpREFBc0IsQ0FBQztLQUM3RCxDQUFDO0dBQ1csMkJBQTJCLENBQUk7QUFBL0Isa0VBQTJCIn0=