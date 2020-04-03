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
const shared_module_1 = require("@concourse/shared/shared.module");
const institution_data_module_1 = require("@concourse/store/institution-data/institution-data.module");
const insights_routing_module_1 = require("./insights-routing.module");
const insights_component_1 = require("./insights/insights.component");
let InsightsModule = class InsightsModule {
};
InsightsModule = __decorate([
    core_1.NgModule({
        imports: [
            common_1.CommonModule,
            insights_routing_module_1.InsightsRoutingModule,
            institution_data_module_1.InstitutionDataStoreModule,
            shared_module_1.SharedModule
        ],
        declarations: [insights_component_1.InsightsComponent]
    })
], InsightsModule);
exports.InsightsModule = InsightsModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5zaWdodHMubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vY29uY291cnNlL2phdmFzY3JpcHQvY29uY291cnNlLWFwcC9zcmMvYXBwL2luc2lnaHRzL2luc2lnaHRzLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBLDRDQUErQztBQUMvQyx3Q0FBeUM7QUFFekMsbUVBQStEO0FBQy9ELHVHQUF1RztBQUN2Ryx1RUFBa0U7QUFDbEUsc0VBQWtFO0FBV2xFLElBQWEsY0FBYyxHQUEzQixNQUFhLGNBQWM7Q0FBSSxDQUFBO0FBQWxCLGNBQWM7SUFUMUIsZUFBUSxDQUFDO1FBQ1IsT0FBTyxFQUFFO1lBQ1AscUJBQVk7WUFDWiwrQ0FBcUI7WUFDckIsb0RBQTBCO1lBQzFCLDRCQUFZO1NBQ2I7UUFDRCxZQUFZLEVBQUUsQ0FBQyxzQ0FBaUIsQ0FBQztLQUNsQyxDQUFDO0dBQ1csY0FBYyxDQUFJO0FBQWxCLHdDQUFjIn0=