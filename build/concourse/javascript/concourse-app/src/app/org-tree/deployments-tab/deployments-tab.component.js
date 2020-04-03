"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
let DeploymentsTabComponent = class DeploymentsTabComponent {
    // its not being used now. will uncomment it later when we are using it.
    // deployments$ = this.surfaceLayerFacade.selectedSurfaceLayerDeployments$;
    constructor(surfaceLayerFacade) {
        this.surfaceLayerFacade = surfaceLayerFacade;
    }
    ngOnInit() {
        //
    }
};
DeploymentsTabComponent = __decorate([
    core_1.Component({
        selector: 'app-deployments-tab',
        templateUrl: './deployments-tab.component.html',
        styleUrls: ['./deployments-tab.component.scss']
    })
], DeploymentsTabComponent);
exports.DeploymentsTabComponent = DeploymentsTabComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVwbG95bWVudHMtdGFiLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL2NvbmNvdXJzZS9qYXZhc2NyaXB0L2NvbmNvdXJzZS1hcHAvc3JjL2FwcC9vcmctdHJlZS9kZXBsb3ltZW50cy10YWIvZGVwbG95bWVudHMtdGFiLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBLHdDQUFrRDtBQVFsRCxJQUFhLHVCQUF1QixHQUFwQyxNQUFhLHVCQUF1QjtJQUNsQyx3RUFBd0U7SUFDeEUsMkVBQTJFO0lBRTNFLFlBQ21CLGtCQUFzQztRQUF0Qyx1QkFBa0IsR0FBbEIsa0JBQWtCLENBQW9CO0lBQ3JELENBQUM7SUFFTCxRQUFRO1FBQ04sRUFBRTtJQUNKLENBQUM7Q0FFRixDQUFBO0FBWlksdUJBQXVCO0lBTG5DLGdCQUFTLENBQUM7UUFDVCxRQUFRLEVBQUUscUJBQXFCO1FBQy9CLFdBQVcsRUFBRSxrQ0FBa0M7UUFDL0MsU0FBUyxFQUFFLENBQUMsa0NBQWtDLENBQUM7S0FDaEQsQ0FBQztHQUNXLHVCQUF1QixDQVluQztBQVpZLDBEQUF1QiJ9