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
const search_actions_component_1 = require("@concourse/shared/components/search-actions/search-actions.component");
const operators_2 = require("rxjs/operators");
let ApprovalTabularViewComponent = class ApprovalTabularViewComponent {
    constructor(router, workflowFacade, approvalFacade) {
        this.router = router;
        this.workflowFacade = workflowFacade;
        this.approvalFacade = approvalFacade;
        this.isUpdating$ = this.workflowFacade.isUpdating$;
        this.isLoaded$ = this.workflowFacade.isLoaded$;
        this.workflowSummaryList$ = this.workflowFacade.list$;
        this.approvalRequestDetails$ = this.approvalFacade.selectedWithRelated$;
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
], ApprovalTabularViewComponent.prototype, "searchFilterComponent", void 0);
__decorate([
    core_1.ViewChild('dateTpl')
], ApprovalTabularViewComponent.prototype, "dateTpl", void 0);
__decorate([
    core_1.ViewChild('badgeTpl')
], ApprovalTabularViewComponent.prototype, "badgeTpl", void 0);
__decorate([
    core_1.ViewChild('entityTypeTpl')
], ApprovalTabularViewComponent.prototype, "entityTypeTpl", void 0);
ApprovalTabularViewComponent = __decorate([
    core_1.Component({
        selector: 'app-approval-tabular-view',
        templateUrl: './approval-tabular-view.component.html',
        styleUrls: ['./approval-tabular-view.component.scss']
    })
], ApprovalTabularViewComponent);
exports.ApprovalTabularViewComponent = ApprovalTabularViewComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwcm92YWwtdGFidWxhci12aWV3LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL2NvbmNvdXJzZS9qYXZhc2NyaXB0L2NvbmNvdXJzZS1hcHAvc3JjL2FwcC93b3JrZmxvd3MvYXBwcm92YWwvYXBwcm92YWwtdGFidWxhci12aWV3L2FwcHJvdmFsLXRhYnVsYXItdmlldy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQSx3Q0FBcUY7QUFHckYseURBQXlEO0FBQ3pELG1IQUFvSTtBQUVwSSw4Q0FBc0Q7QUFPdEQsSUFBYSw0QkFBNEIsR0FBekMsTUFBYSw0QkFBNEI7SUFXdkMsWUFDUyxNQUFjLEVBQ0osY0FBOEIsRUFDOUIsY0FBOEI7UUFGeEMsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUNKLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtRQUM5QixtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUFUakQsZ0JBQVcsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLFdBQVcsQ0FBQztRQUM5QyxjQUFTLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxTQUFTLENBQUM7UUFDMUMseUJBQW9CLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUM7UUFDakQsNEJBQXVCLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxvQkFBb0IsQ0FBQztRQUNuRSxvQkFBZSxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsV0FBVyxDQUFDO0lBTS9DLENBQUM7SUFFSixRQUFRO1FBQ04sSUFBSSxDQUFDLHFCQUFxQixDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUN0RCxrQkFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLE1BQU0sS0FBSyxDQUFDLENBQUMsRUFDM0Msd0JBQVksQ0FBQywrQ0FBb0IsQ0FBQyxFQUNsQyx3QkFBWSxDQUFDLElBQUksQ0FBQyxDQUNuQixDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsRUFBRTtZQUN2QixJQUFJLENBQUMsY0FBYyxDQUFDLFdBQVcsRUFBRSxDQUFDO1lBQ2xDLElBQUksVUFBVSxDQUFDLE1BQU0sRUFBRTtnQkFDckIsSUFBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUM7YUFDeEM7UUFDSCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRCxXQUFXO1FBQ1QsSUFBSSxDQUFDLGNBQWMsQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUNwQyxDQUFDO0lBQ0QsWUFBWSxDQUFDLElBQVk7UUFDdkIsSUFBSSxDQUFDLGNBQWMsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDekMsQ0FBQztDQUNGLENBQUE7QUFuQ29DO0lBQWxDLGdCQUFTLENBQUMsaURBQXNCLENBQUM7MkVBQStDO0FBQzNEO0lBQXJCLGdCQUFTLENBQUMsU0FBUyxDQUFDOzZEQUEyQjtBQUN6QjtJQUF0QixnQkFBUyxDQUFDLFVBQVUsQ0FBQzs4REFBNEI7QUFDdEI7SUFBM0IsZ0JBQVMsQ0FBQyxlQUFlLENBQUM7bUVBQWlDO0FBSmpELDRCQUE0QjtJQUx4QyxnQkFBUyxDQUFDO1FBQ1QsUUFBUSxFQUFFLDJCQUEyQjtRQUNyQyxXQUFXLEVBQUUsd0NBQXdDO1FBQ3JELFNBQVMsRUFBRSxDQUFDLHdDQUF3QyxDQUFDO0tBQ3RELENBQUM7R0FDVyw0QkFBNEIsQ0FvQ3hDO0FBcENZLG9FQUE0QiJ9