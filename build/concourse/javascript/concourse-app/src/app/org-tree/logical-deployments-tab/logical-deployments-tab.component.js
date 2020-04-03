"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const faPlusCircle_1 = require("@fortawesome/free-solid-svg-icons/faPlusCircle");
const operators_1 = require("rxjs/operators");
let LogicalDeploymentsTabComponent = class LogicalDeploymentsTabComponent {
    constructor(surfaceLayerFacade, logicalDeploymentsFacade) {
        this.surfaceLayerFacade = surfaceLayerFacade;
        this.logicalDeploymentsFacade = logicalDeploymentsFacade;
        this.selectedSurfaceLayer$ = this.surfaceLayerFacade.selectedWithChildren$.pipe(operators_1.tap(_ => {
            this.surfaceLayerIds = undefined;
        }));
        this.logicalDeployments$ = this.logicalDeploymentsFacade.listWithRelated$;
        this.isUpdating$ = this.logicalDeploymentsFacade.isUpdating$;
        this.icons = { faPlusCircle: faPlusCircle_1.faPlusCircle };
    }
    trackBy(_index, logicalDeployment) {
        return logicalDeployment.id;
    }
    trackItems(_index, item) {
        return item.id;
    }
    viewDescendants(surfaceLayer) {
        this.surfaceLayerIds = [...surfaceLayer.descendantIds];
        this.logicalDeploymentsFacade.getAllBySurfaceLayerId(this.surfaceLayerIds);
    }
};
LogicalDeploymentsTabComponent = __decorate([
    core_1.Component({
        selector: 'app-logical-deployments-tab',
        templateUrl: './logical-deployments-tab.component.html',
        styleUrls: ['./logical-deployments-tab.component.scss']
    })
], LogicalDeploymentsTabComponent);
exports.LogicalDeploymentsTabComponent = LogicalDeploymentsTabComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9naWNhbC1kZXBsb3ltZW50cy10YWIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vY29uY291cnNlL2phdmFzY3JpcHQvY29uY291cnNlLWFwcC9zcmMvYXBwL29yZy10cmVlL2xvZ2ljYWwtZGVwbG95bWVudHMtdGFiL2xvZ2ljYWwtZGVwbG95bWVudHMtdGFiLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBLHdDQUEwQztBQUMxQyxpRkFBOEU7QUFFOUUsOENBQXFDO0FBVXJDLElBQWEsOEJBQThCLEdBQTNDLE1BQWEsOEJBQThCO0lBV3pDLFlBQ21CLGtCQUFzQyxFQUN0Qyx3QkFBaUQ7UUFEakQsdUJBQWtCLEdBQWxCLGtCQUFrQixDQUFvQjtRQUN0Qyw2QkFBd0IsR0FBeEIsd0JBQXdCLENBQXlCO1FBWnBFLDBCQUFxQixHQUFHLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxxQkFBcUIsQ0FBQyxJQUFJLENBQ3hFLGVBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRTtZQUNOLElBQUksQ0FBQyxlQUFlLEdBQUcsU0FBUyxDQUFDO1FBQ25DLENBQUMsQ0FBQyxDQUNILENBQUM7UUFDRix3QkFBbUIsR0FBRyxJQUFJLENBQUMsd0JBQXdCLENBQUMsZ0JBQWdCLENBQUM7UUFDckUsZ0JBQVcsR0FBRyxJQUFJLENBQUMsd0JBQXdCLENBQUMsV0FBVyxDQUFDO1FBQy9DLFVBQUssR0FBRyxFQUFFLFlBQVksRUFBWiwyQkFBWSxFQUFFLENBQUM7SUFNOUIsQ0FBQztJQUVMLE9BQU8sQ0FBQyxNQUFjLEVBQUUsaUJBQW9DO1FBQzFELE9BQU8saUJBQWlCLENBQUMsRUFBRSxDQUFDO0lBQzlCLENBQUM7SUFFRCxVQUFVLENBQUMsTUFBYyxFQUFFLElBQUk7UUFDN0IsT0FBTyxJQUFJLENBQUMsRUFBRSxDQUFDO0lBQ2pCLENBQUM7SUFFRCxlQUFlLENBQUMsWUFBMEI7UUFDeEMsSUFBSSxDQUFDLGVBQWUsR0FBRyxDQUFDLEdBQUcsWUFBWSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBQ3ZELElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxzQkFBc0IsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUM7SUFDN0UsQ0FBQztDQUVGLENBQUE7QUE3QlksOEJBQThCO0lBTDFDLGdCQUFTLENBQUM7UUFDVCxRQUFRLEVBQUUsNkJBQTZCO1FBQ3ZDLFdBQVcsRUFBRSwwQ0FBMEM7UUFDdkQsU0FBUyxFQUFFLENBQUMsMENBQTBDLENBQUM7S0FDeEQsQ0FBQztHQUNXLDhCQUE4QixDQTZCMUM7QUE3Qlksd0VBQThCIn0=