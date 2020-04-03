"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const store_1 = require("@ngrx/store");
const reporting_actions_1 = require("./reporting.actions");
const query = require("./reporting.selectors");
let ReportingFacade = class ReportingFacade {
    constructor(store) {
        this.store = store;
        this.isLoading$ = this.store.pipe(store_1.select(query.isLoading));
    }
    generateSurfaceLayerReport(surfaceLayerId) {
        this.store.dispatch(new reporting_actions_1.GenerateSurfaceLayerReport({ surfaceLayerId }));
    }
    generateGenericDiffReport(lookbackWindow, resourceType) {
        this.store.dispatch(new reporting_actions_1.GenerateGenericDiffReport({ lookbackWindow, resourceType }));
    }
    generateCloudRoleDiffReport(lookbackWindow) {
        this.store.dispatch(new reporting_actions_1.GenerateCloudRoleDiffReport({ lookbackWindow }));
    }
};
ReportingFacade = __decorate([
    core_1.Injectable()
], ReportingFacade);
exports.ReportingFacade = ReportingFacade;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVwb3J0aW5nLmZhY2FkZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL2NvbmNvdXJzZS9qYXZhc2NyaXB0L2NvbmNvdXJzZS1hcHAvc3JjL2FwcC9zdG9yZS9yZXBvcnRpbmcvc3RhdGUvcmVwb3J0aW5nLmZhY2FkZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBLHdDQUEyQztBQUMzQyx1Q0FBNEM7QUFFNUMsMkRBSTZCO0FBRTdCLCtDQUErQztBQUcvQyxJQUFhLGVBQWUsR0FBNUIsTUFBYSxlQUFlO0lBRzFCLFlBQ21CLEtBQW1CO1FBQW5CLFVBQUssR0FBTCxLQUFLLENBQWM7UUFIdEMsZUFBVSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLGNBQU0sQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztJQUlsRCxDQUFDO0lBRUwsMEJBQTBCLENBQUMsY0FBc0I7UUFDL0MsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsSUFBSSw4Q0FBMEIsQ0FBQyxFQUFFLGNBQWMsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUMxRSxDQUFDO0lBRUQseUJBQXlCLENBQUMsY0FBc0IsRUFBRSxZQUFvQjtRQUNwRSxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxJQUFJLDZDQUF5QixDQUFDLEVBQUUsY0FBYyxFQUFFLFlBQVksRUFBRSxDQUFDLENBQUMsQ0FBQztJQUN2RixDQUFDO0lBRUQsMkJBQTJCLENBQUMsY0FBc0I7UUFDaEQsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsSUFBSSwrQ0FBMkIsQ0FBQyxFQUFFLGNBQWMsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUMzRSxDQUFDO0NBRUYsQ0FBQTtBQW5CWSxlQUFlO0lBRDNCLGlCQUFVLEVBQUU7R0FDQSxlQUFlLENBbUIzQjtBQW5CWSwwQ0FBZSJ9