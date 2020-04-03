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
const helpers_1 = require("@concourse/shared/helpers");
let PolicyGroupTabComponent = class PolicyGroupTabComponent {
    constructor(surfaceLayerFacade, policyGroupFacade) {
        this.surfaceLayerFacade = surfaceLayerFacade;
        this.policyGroupFacade = policyGroupFacade;
        this.selectedSurfaceLayer$ = this.surfaceLayerFacade.selectedWithChildren$.pipe(operators_1.tap(_ => {
            this.surfaceLayerIds = undefined;
        }));
        this.policyGroups$ = this.policyGroupFacade.listWithRelated$.pipe(operators_1.map(policyGroups => policyGroups.map(pg => pg.copyWith({
            surfaceLayers: !!this.surfaceLayerIds ?
                helpers_1.intersection(pg.surfaceLayers, this.surfaceLayerIds, (surfaceLayer, id) => surfaceLayer.id === id) :
                pg.surfaceLayers
        }))));
        this.pgIsUpdating$ = this.policyGroupFacade.isUpdating$;
        this.icons = { faPlusCircle: faPlusCircle_1.faPlusCircle };
    }
    trackBy(_index, policyGroup) {
        return policyGroup.id;
    }
    trackItems(_index, item) {
        return item.id;
    }
    createPolicyGroup() {
        // TODO: open create policy group modal
    }
    viewDescendants(surfaceLayer) {
        this.surfaceLayerIds = [...surfaceLayer.descendantIds];
        this.policyGroupFacade.getBySurfaceLayerIds(this.surfaceLayerIds);
    }
};
PolicyGroupTabComponent = __decorate([
    core_1.Component({
        selector: 'app-policy-group-tab',
        templateUrl: './policy-group-tab.component.html',
        styleUrls: ['./policy-group-tab.component.scss']
    })
], PolicyGroupTabComponent);
exports.PolicyGroupTabComponent = PolicyGroupTabComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9saWN5LWdyb3VwLXRhYi5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9jb25jb3Vyc2UvamF2YXNjcmlwdC9jb25jb3Vyc2UtYXBwL3NyYy9hcHAvb3JnLXRyZWUvcG9saWN5LWdyb3VwLXRhYi9wb2xpY3ktZ3JvdXAtdGFiLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBLHdDQUEwQztBQUMxQyxpRkFBOEU7QUFFOUUsOENBQTBDO0FBRzFDLHVEQUF5RDtBQVF6RCxJQUFhLHVCQUF1QixHQUFwQyxNQUFhLHVCQUF1QjtJQW1CbEMsWUFDbUIsa0JBQXNDLEVBQ3RDLGlCQUFvQztRQURwQyx1QkFBa0IsR0FBbEIsa0JBQWtCLENBQW9CO1FBQ3RDLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBbUI7UUFwQnZELDBCQUFxQixHQUFHLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxxQkFBcUIsQ0FBQyxJQUFJLENBQ3hFLGVBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRTtZQUNOLElBQUksQ0FBQyxlQUFlLEdBQUcsU0FBUyxDQUFDO1FBQ25DLENBQUMsQ0FBQyxDQUNILENBQUM7UUFDRixrQkFBYSxHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQzFELGVBQUcsQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUNqQixZQUFZLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQztZQUNqQyxhQUFhLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQztnQkFDckMsc0JBQVksQ0FBQyxFQUFFLENBQUMsYUFBYSxFQUFFLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQyxZQUFZLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxZQUFZLENBQUMsRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUM7Z0JBQ3BHLEVBQUUsQ0FBQyxhQUFhO1NBQ25CLENBQUMsQ0FBQyxDQUNKLENBQ0YsQ0FBQztRQUNGLGtCQUFhLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFdBQVcsQ0FBQztRQUUxQyxVQUFLLEdBQUcsRUFBRSxZQUFZLEVBQVosMkJBQVksRUFBRSxDQUFDO0lBSzlCLENBQUM7SUFFTCxPQUFPLENBQUMsTUFBYyxFQUFFLFdBQXdCO1FBQzlDLE9BQU8sV0FBVyxDQUFDLEVBQUUsQ0FBQztJQUN4QixDQUFDO0lBRUQsVUFBVSxDQUFDLE1BQWMsRUFBRSxJQUFJO1FBQzdCLE9BQU8sSUFBSSxDQUFDLEVBQUUsQ0FBQztJQUNqQixDQUFDO0lBRUQsaUJBQWlCO1FBQ2YsdUNBQXVDO0lBQ3pDLENBQUM7SUFFRCxlQUFlLENBQUMsWUFBMEI7UUFDeEMsSUFBSSxDQUFDLGVBQWUsR0FBRyxDQUFDLEdBQUcsWUFBWSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBQ3ZELElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUM7SUFDcEUsQ0FBQztDQUVGLENBQUE7QUF6Q1ksdUJBQXVCO0lBTG5DLGdCQUFTLENBQUM7UUFDVCxRQUFRLEVBQUUsc0JBQXNCO1FBQ2hDLFdBQVcsRUFBRSxtQ0FBbUM7UUFDaEQsU0FBUyxFQUFFLENBQUMsbUNBQW1DLENBQUM7S0FDakQsQ0FBQztHQUNXLHVCQUF1QixDQXlDbkM7QUF6Q1ksMERBQXVCIn0=