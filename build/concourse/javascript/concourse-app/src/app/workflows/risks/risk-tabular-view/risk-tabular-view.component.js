"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const operators_1 = require("@concourse/core/operators");
const operators_2 = require("rxjs/operators");
const search_actions_component_1 = require("@concourse/shared/components/search-actions/search-actions.component");
let RiskTabularViewComponent = class RiskTabularViewComponent {
    constructor(router, workflowFacade, policyResolutionFacade) {
        this.router = router;
        this.workflowFacade = workflowFacade;
        this.policyResolutionFacade = policyResolutionFacade;
        this.policyResolution$ = this.policyResolutionFacade.selected$;
        this.isLoaded$ = this.workflowFacade.isLoaded$;
        this.workflowSummaryList$ = this.workflowFacade.list$;
        this.filteredByType$ = this.workflowFacade.filteredBy$;
    }
    ngOnInit() {
        this.searchFilterComponent.searchField.valueChanges.pipe(operators_2.filter(a => a.length > 2 || a.length === 0), operators_2.debounceTime(search_actions_component_1.SEARCH_DEBOUNCE_TIME), operators_1.untilDestroy(this)).subscribe(searchText => {
            this.workflowFacade.resetSearch();
            if (searchText.length) {
                this.workflowFacade.search(searchText);
            }
        });
    }
    ngOnDestroy() {
        this.workflowFacade.resetSearch();
    }
    filterByType(type) {
        this.workflowFacade.filterByType(type);
    }
};
__decorate([
    core_1.ViewChild(search_actions_component_1.SearchActionsComponent)
], RiskTabularViewComponent.prototype, "searchFilterComponent", void 0);
RiskTabularViewComponent = __decorate([
    core_1.Component({
        selector: 'app-risk-tabular-view',
        templateUrl: './risk-tabular-view.component.html',
        styleUrls: ['./risk-tabular-view.component.scss']
    })
], RiskTabularViewComponent);
exports.RiskTabularViewComponent = RiskTabularViewComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmlzay10YWJ1bGFyLXZpZXcuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vY29uY291cnNlL2phdmFzY3JpcHQvY29uY291cnNlLWFwcC9zcmMvYXBwL3dvcmtmbG93cy9yaXNrcy9yaXNrLXRhYnVsYXItdmlldy9yaXNrLXRhYnVsYXItdmlldy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQSx3Q0FBd0U7QUFHeEUseURBQXlEO0FBQ3pELDhDQUFzRDtBQUV0RCxtSEFBb0k7QUFRcEksSUFBYSx3QkFBd0IsR0FBckMsTUFBYSx3QkFBd0I7SUFRbkMsWUFDVyxNQUFjLEVBQ04sY0FBOEIsRUFDOUIsc0JBQThDO1FBRnRELFdBQU0sR0FBTixNQUFNLENBQVE7UUFDTixtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUFDOUIsMkJBQXNCLEdBQXRCLHNCQUFzQixDQUF3QjtRQVJqRSxzQkFBaUIsR0FBRyxJQUFJLENBQUMsc0JBQXNCLENBQUMsU0FBUyxDQUFDO1FBQzFELGNBQVMsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLFNBQVMsQ0FBQztRQUMxQyx5QkFBb0IsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQztRQUNqRCxvQkFBZSxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsV0FBVyxDQUFDO0lBTTlDLENBQUM7SUFFTCxRQUFRO1FBQ04sSUFBSSxDQUFDLHFCQUFxQixDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUN0RCxrQkFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLE1BQU0sS0FBSyxDQUFDLENBQUMsRUFDM0Msd0JBQVksQ0FBQywrQ0FBb0IsQ0FBQyxFQUNsQyx3QkFBWSxDQUFDLElBQUksQ0FBQyxDQUNuQixDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsRUFBRTtZQUN2QixJQUFJLENBQUMsY0FBYyxDQUFDLFdBQVcsRUFBRSxDQUFDO1lBQ2xDLElBQUksVUFBVSxDQUFDLE1BQU0sRUFBRTtnQkFDckIsSUFBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUM7YUFDeEM7UUFDSCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRCxXQUFXO1FBQ1QsSUFBSSxDQUFDLGNBQWMsQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUNwQyxDQUFDO0lBRUQsWUFBWSxDQUFDLElBQVk7UUFDdkIsSUFBSSxDQUFDLGNBQWMsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDekMsQ0FBQztDQUVGLENBQUE7QUFsQ29DO0lBQWxDLGdCQUFTLENBQUMsaURBQXNCLENBQUM7dUVBQStDO0FBRHRFLHdCQUF3QjtJQUxwQyxnQkFBUyxDQUFDO1FBQ1QsUUFBUSxFQUFFLHVCQUF1QjtRQUNqQyxXQUFXLEVBQUUsb0NBQW9DO1FBQ2pELFNBQVMsRUFBRSxDQUFDLG9DQUFvQyxDQUFDO0tBQ2xELENBQUM7R0FDVyx3QkFBd0IsQ0FtQ3BDO0FBbkNZLDREQUF3QiJ9