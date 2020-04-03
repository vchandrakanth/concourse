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
const policy_group_template_service_1 = require("./services/policy-group-template.service");
const policy_group_template_effects_1 = require("./state/policy-group-template.effects");
const policy_group_template_facade_1 = require("./state/policy-group-template.facade");
const fromPolicyGroupTemplate = require("./state/policy-group-template.reducer");
let PolicyGroupTemplateStoreModule = class PolicyGroupTemplateStoreModule {
};
PolicyGroupTemplateStoreModule = __decorate([
    core_1.NgModule({
        imports: [
            store_1.StoreModule.forFeature(enums_1.StoreNames.PolicyGroupTemplate, fromPolicyGroupTemplate.reducer),
            effects_1.EffectsModule.forFeature([policy_group_template_effects_1.PolicyGroupTemplateEffects])
        ],
        providers: [policy_group_template_service_1.PolicyGroupTemplateService, policy_group_template_facade_1.PolicyGroupTemplateFacade]
    })
], PolicyGroupTemplateStoreModule);
exports.PolicyGroupTemplateStoreModule = PolicyGroupTemplateStoreModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9saWN5LWdyb3VwLXRlbXBsYXRlLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL2NvbmNvdXJzZS9qYXZhc2NyaXB0L2NvbmNvdXJzZS1hcHAvc3JjL2FwcC9zdG9yZS9wb2xpY3ktZ3JvdXAtdGVtcGxhdGUvcG9saWN5LWdyb3VwLXRlbXBsYXRlLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBLHdDQUF5QztBQUN6QywyQ0FBOEM7QUFDOUMsdUNBQTBDO0FBRTFDLG1EQUFxRDtBQUNyRCw0RkFBc0Y7QUFDdEYseUZBQW1GO0FBQ25GLHVGQUFpRjtBQUNqRixpRkFBaUY7QUFTakYsSUFBYSw4QkFBOEIsR0FBM0MsTUFBYSw4QkFBOEI7Q0FBSSxDQUFBO0FBQWxDLDhCQUE4QjtJQVAxQyxlQUFRLENBQUM7UUFDUixPQUFPLEVBQUU7WUFDUCxtQkFBVyxDQUFDLFVBQVUsQ0FBQyxrQkFBVSxDQUFDLG1CQUFtQixFQUFFLHVCQUF1QixDQUFDLE9BQU8sQ0FBQztZQUN2Rix1QkFBYSxDQUFDLFVBQVUsQ0FBQyxDQUFDLDBEQUEwQixDQUFDLENBQUM7U0FDdkQ7UUFDRCxTQUFTLEVBQUUsQ0FBQywwREFBMEIsRUFBRSx3REFBeUIsQ0FBQztLQUNuRSxDQUFDO0dBQ1csOEJBQThCLENBQUk7QUFBbEMsd0VBQThCIn0=