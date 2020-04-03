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
let RoleTabComponent = class RoleTabComponent {
    constructor(surfaceLayerFacade, groupFacade) {
        this.surfaceLayerFacade = surfaceLayerFacade;
        this.groupFacade = groupFacade;
        this.selectedSurfaceLayer$ = this.surfaceLayerFacade.selectedWithChildren$.pipe(operators_1.tap(surfaceLayer => {
            this.surfaceLayerIds = [surfaceLayer.id];
        }));
        this.roleAssignments$ = this.groupFacade.roleAssignmentsBySurfaceLayerIds$;
        this.raIsUpdating$ = this.groupFacade.isUpdating$;
        this.icons = { faPlusCircle: faPlusCircle_1.faPlusCircle };
    }
    trackBy(_index, roleAssignment) {
        return roleAssignment.id;
    }
    viewDescendants(surfaceLayer) {
        this.surfaceLayerIds = [...surfaceLayer.descendantIds];
        this.groupFacade.getRoleAssignmentsBySurfaceLayerIds(this.surfaceLayerIds);
    }
};
RoleTabComponent = __decorate([
    core_1.Component({
        selector: 'app-role-tab',
        templateUrl: './role-tab.component.html',
        styleUrls: ['./role-tab.component.scss']
    })
], RoleTabComponent);
exports.RoleTabComponent = RoleTabComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm9sZS10YWIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vY29uY291cnNlL2phdmFzY3JpcHQvY29uY291cnNlLWFwcC9zcmMvYXBwL29yZy10cmVlL3JvbGUtdGFiL3JvbGUtdGFiLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBLHdDQUEwQztBQUMxQyxpRkFBOEU7QUFFOUUsOENBQXFDO0FBVXJDLElBQWEsZ0JBQWdCLEdBQTdCLE1BQWEsZ0JBQWdCO0lBVzNCLFlBQ21CLGtCQUFzQyxFQUN0QyxXQUF3QjtRQUR4Qix1QkFBa0IsR0FBbEIsa0JBQWtCLENBQW9CO1FBQ3RDLGdCQUFXLEdBQVgsV0FBVyxDQUFhO1FBWjNDLDBCQUFxQixHQUFHLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxxQkFBcUIsQ0FBQyxJQUFJLENBQ3hFLGVBQUcsQ0FBQyxZQUFZLENBQUMsRUFBRTtZQUNqQixJQUFJLENBQUMsZUFBZSxHQUFHLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQzNDLENBQUMsQ0FBQyxDQUNILENBQUM7UUFDRixxQkFBZ0IsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLGlDQUFpQyxDQUFDO1FBQ3RFLGtCQUFhLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxXQUFXLENBQUM7UUFDcEMsVUFBSyxHQUFHLEVBQUUsWUFBWSxFQUFaLDJCQUFZLEVBQUUsQ0FBQztJQU05QixDQUFDO0lBRUwsT0FBTyxDQUFDLE1BQWMsRUFBRSxjQUE4QjtRQUNwRCxPQUFPLGNBQWMsQ0FBQyxFQUFFLENBQUM7SUFDM0IsQ0FBQztJQUVELGVBQWUsQ0FBQyxZQUEwQjtRQUN4QyxJQUFJLENBQUMsZUFBZSxHQUFHLENBQUMsR0FBRyxZQUFZLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDdkQsSUFBSSxDQUFDLFdBQVcsQ0FBQyxtQ0FBbUMsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUM7SUFDN0UsQ0FBQztDQUNGLENBQUE7QUF4QlksZ0JBQWdCO0lBTDVCLGdCQUFTLENBQUM7UUFDVCxRQUFRLEVBQUUsY0FBYztRQUN4QixXQUFXLEVBQUUsMkJBQTJCO1FBQ3hDLFNBQVMsRUFBRSxDQUFDLDJCQUEyQixDQUFDO0tBQ3pDLENBQUM7R0FDVyxnQkFBZ0IsQ0F3QjVCO0FBeEJZLDRDQUFnQiJ9