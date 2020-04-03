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
const policy_template_service_1 = require("./services/policy-template.service");
const policy_template_effects_1 = require("./state/policy-template.effects");
const policy_template_facade_1 = require("./state/policy-template.facade");
const fromPolicyTemplate = require("./state/policy-template.reducer");
let PolicyTemplateStoreModule = class PolicyTemplateStoreModule {
};
PolicyTemplateStoreModule = __decorate([
    core_1.NgModule({
        imports: [
            store_1.StoreModule.forFeature(enums_1.StoreNames.PolicyTemplate, fromPolicyTemplate.reducer),
            effects_1.EffectsModule.forFeature([policy_template_effects_1.PolicyTemplateEffects])
        ],
        providers: [policy_template_service_1.PolicyTemplateService, policy_template_facade_1.PolicyTemplateFacade]
    })
], PolicyTemplateStoreModule);
exports.PolicyTemplateStoreModule = PolicyTemplateStoreModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9saWN5LXRlbXBsYXRlLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL2NvbmNvdXJzZS9qYXZhc2NyaXB0L2NvbmNvdXJzZS1hcHAvc3JjL2FwcC9zdG9yZS9wb2xpY3ktdGVtcGxhdGUvcG9saWN5LXRlbXBsYXRlLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBLHdDQUF5QztBQUN6QywyQ0FBOEM7QUFDOUMsdUNBQTBDO0FBRTFDLG1EQUFxRDtBQUNyRCxnRkFBMkU7QUFDM0UsNkVBQXdFO0FBQ3hFLDJFQUFzRTtBQUN0RSxzRUFBc0U7QUFTdEUsSUFBYSx5QkFBeUIsR0FBdEMsTUFBYSx5QkFBeUI7Q0FBSSxDQUFBO0FBQTdCLHlCQUF5QjtJQVByQyxlQUFRLENBQUM7UUFDUixPQUFPLEVBQUU7WUFDUCxtQkFBVyxDQUFDLFVBQVUsQ0FBQyxrQkFBVSxDQUFDLGNBQWMsRUFBRSxrQkFBa0IsQ0FBQyxPQUFPLENBQUM7WUFDN0UsdUJBQWEsQ0FBQyxVQUFVLENBQUMsQ0FBQywrQ0FBcUIsQ0FBQyxDQUFDO1NBQ2xEO1FBQ0QsU0FBUyxFQUFFLENBQUMsK0NBQXFCLEVBQUUsNkNBQW9CLENBQUM7S0FDekQsQ0FBQztHQUNXLHlCQUF5QixDQUFJO0FBQTdCLDhEQUF5QiJ9