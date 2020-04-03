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
const analytics_service_1 = require("./services/analytics.service");
const analytics_effects_1 = require("./state/analytics.effects");
const analytics_facade_1 = require("./state/analytics.facade");
const fromReducer = require("./state/analytics.reducer");
let AnalyticsStoreModule = class AnalyticsStoreModule {
};
AnalyticsStoreModule = __decorate([
    core_1.NgModule({
        imports: [
            store_1.StoreModule.forFeature(enums_1.StoreNames.Analytics, fromReducer.reducer),
            effects_1.EffectsModule.forFeature([analytics_effects_1.AnalyticsEffects])
        ],
        providers: [analytics_service_1.AnalyticsService, analytics_facade_1.AnalyticsFacade]
    })
], AnalyticsStoreModule);
exports.AnalyticsStoreModule = AnalyticsStoreModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5hbHl0aWNzLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL2NvbmNvdXJzZS9qYXZhc2NyaXB0L2NvbmNvdXJzZS1hcHAvc3JjL2FwcC9zdG9yZS9hbmFseXRpY3MvYW5hbHl0aWNzLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBLHdDQUF5QztBQUN6QywyQ0FBOEM7QUFDOUMsdUNBQTBDO0FBRTFDLG1EQUFxRDtBQUNyRCxvRUFBZ0U7QUFDaEUsaUVBQTZEO0FBQzdELCtEQUEyRDtBQUMzRCx5REFBeUQ7QUFTekQsSUFBYSxvQkFBb0IsR0FBakMsTUFBYSxvQkFBb0I7Q0FBSSxDQUFBO0FBQXhCLG9CQUFvQjtJQVBoQyxlQUFRLENBQUM7UUFDUixPQUFPLEVBQUU7WUFDUCxtQkFBVyxDQUFDLFVBQVUsQ0FBQyxrQkFBVSxDQUFDLFNBQVMsRUFBRSxXQUFXLENBQUMsT0FBTyxDQUFDO1lBQ2pFLHVCQUFhLENBQUMsVUFBVSxDQUFDLENBQUMsb0NBQWdCLENBQUMsQ0FBQztTQUM3QztRQUNELFNBQVMsRUFBRSxDQUFDLG9DQUFnQixFQUFFLGtDQUFlLENBQUM7S0FDL0MsQ0FBQztHQUNXLG9CQUFvQixDQUFJO0FBQXhCLG9EQUFvQiJ9