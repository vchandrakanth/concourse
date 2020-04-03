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
const reporting_service_1 = require("./services/reporting.service");
const reporting_effects_1 = require("./state/reporting.effects");
const reporting_facade_1 = require("./state/reporting.facade");
const fromReporting = require("./state/reporting.reducer");
let ReportingStoreModule = class ReportingStoreModule {
};
ReportingStoreModule = __decorate([
    core_1.NgModule({
        imports: [
            store_1.StoreModule.forFeature(enums_1.StoreNames.Reporting, fromReporting.reducer),
            effects_1.EffectsModule.forFeature([reporting_effects_1.ReportingEffects])
        ],
        providers: [reporting_service_1.ReportingService, reporting_facade_1.ReportingFacade]
    })
], ReportingStoreModule);
exports.ReportingStoreModule = ReportingStoreModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVwb3J0aW5nLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL2NvbmNvdXJzZS9qYXZhc2NyaXB0L2NvbmNvdXJzZS1hcHAvc3JjL2FwcC9zdG9yZS9yZXBvcnRpbmcvcmVwb3J0aW5nLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBLHdDQUF5QztBQUN6QywyQ0FBOEM7QUFDOUMsdUNBQTBDO0FBRTFDLG1EQUFxRDtBQUNyRCxvRUFBZ0U7QUFDaEUsaUVBQTZEO0FBQzdELCtEQUEyRDtBQUMzRCwyREFBMkQ7QUFTM0QsSUFBYSxvQkFBb0IsR0FBakMsTUFBYSxvQkFBb0I7Q0FBSSxDQUFBO0FBQXhCLG9CQUFvQjtJQVBoQyxlQUFRLENBQUM7UUFDUixPQUFPLEVBQUU7WUFDUCxtQkFBVyxDQUFDLFVBQVUsQ0FBQyxrQkFBVSxDQUFDLFNBQVMsRUFBRSxhQUFhLENBQUMsT0FBTyxDQUFDO1lBQ25FLHVCQUFhLENBQUMsVUFBVSxDQUFDLENBQUMsb0NBQWdCLENBQUMsQ0FBQztTQUM3QztRQUNELFNBQVMsRUFBRSxDQUFDLG9DQUFnQixFQUFFLGtDQUFlLENBQUM7S0FDL0MsQ0FBQztHQUNXLG9CQUFvQixDQUFJO0FBQXhCLG9EQUFvQiJ9