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
const classes_1 = require("@concourse/shared/classes");
const search_actions_component_1 = require("@concourse/shared/components/search-actions/search-actions.component");
const operators_2 = require("rxjs/operators");
let DiscoveredDeploymentTabularViewComponent = class DiscoveredDeploymentTabularViewComponent extends classes_1.NgxDataTable {
    // discoveredDeploymentsList$ = this.discoveredDeploymentFacade.list$;
    constructor(router, discoveredDeploymentService, discoveredDeploymentFacade) {
        super(router);
        this.router = router;
        this.discoveredDeploymentService = discoveredDeploymentService;
        this.discoveredDeploymentFacade = discoveredDeploymentFacade;
        this.isLoaded$ = this.discoveredDeploymentFacade.isLoaded$;
    }
    getData() {
        // deprecated - now in javascript/concourse-app/src/app/store/discovered-deployment/state/discovered-deployment.effects.ts
    }
    ngOnInit() {
        this.searchFilterComponent.searchField.valueChanges.pipe(operators_2.filter(a => a.length > 2 || a.length === 0), operators_2.debounceTime(search_actions_component_1.SEARCH_DEBOUNCE_TIME), operators_1.untilDestroy(this)).subscribe(searchText => {
            this.discoveredDeploymentFacade.resetSearch();
            if (searchText.length) {
                this.discoveredDeploymentFacade.search(searchText);
            }
        });
        this.loadPage();
    }
    ngOnDestroy() {
        this.discoveredDeploymentFacade.resetSearch();
    }
    ngAfterViewInit() {
        this.columns = [
            { prop: 'id', name: 'Deployment ID' },
            { prop: 'stackName', name: 'Stack Name' },
            { prop: 'stackStatus', name: 'Status', cellTemplate: this.badgeTpl },
            { prop: 'driftStatus', name: 'Drift Status', cellTemplate: this.badgeTpl },
            { prop: 'model', name: 'Model Name', cellTemplate: this.modelTpl },
            { prop: 'createdTime', name: 'Created', cellTemplate: this.dateTpl }
        ];
    }
    trackItems(_index, discoveredDeployment) {
        return discoveredDeployment.id;
    }
    // TODO: refactor this to something more DRY
    onScroll(offsetY) {
        const ROWS_HEIGHT = this.rows.length * this.rowHeight;
        if (!this.isLoading && offsetY >= (ROWS_HEIGHT / 3)) {
            this.loadPage();
        }
    }
    // TODO: figure out a way to remove this from each component, find a way to make it more DRY
    loadPage() {
        this.isLoading = true;
        const page = this.pagesLoaded.toString();
        this.pagesLoaded++;
        this.discoveredDeploymentService.getListPaginated('200', page).pipe(operators_2.take(1)).subscribe(results => {
            let rows = [...this.rows, ...results];
            rows = this.removeDuplicates(rows, 'id');
            this.rows = rows;
            this.isLoading = false;
        });
    }
    onSort(event) {
        this.pagesLoaded = 0; // set pages back to zero since its a new sort
        this.isLoading = true;
        const name = event.sorts[0].prop;
        const dir = event.sorts[0].dir.toUpperCase();
        const sortString = `${name},${dir}`;
        this.discoveredDeploymentService.getListPaginated('200', '0', sortString).pipe(operators_2.take(1)).subscribe(results => {
            const rows = [...results];
            this.rows = rows;
            this.isLoading = false;
        });
    }
};
__decorate([
    core_1.ViewChild(search_actions_component_1.SearchActionsComponent)
], DiscoveredDeploymentTabularViewComponent.prototype, "searchFilterComponent", void 0);
__decorate([
    core_1.ViewChild('dateTpl')
], DiscoveredDeploymentTabularViewComponent.prototype, "dateTpl", void 0);
__decorate([
    core_1.ViewChild('badgeTpl')
], DiscoveredDeploymentTabularViewComponent.prototype, "badgeTpl", void 0);
__decorate([
    core_1.ViewChild('modelTpl')
], DiscoveredDeploymentTabularViewComponent.prototype, "modelTpl", void 0);
DiscoveredDeploymentTabularViewComponent = __decorate([
    core_1.Component({
        selector: 'app-list-view',
        templateUrl: './discovered-deployment-tabular-view.component.html',
        styleUrls: ['./discovered-deployment-tabular-view.component.scss']
    })
], DiscoveredDeploymentTabularViewComponent);
exports.DiscoveredDeploymentTabularViewComponent = DiscoveredDeploymentTabularViewComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlzY292ZXJlZC1kZXBsb3ltZW50LXRhYnVsYXItdmlldy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9jb25jb3Vyc2UvamF2YXNjcmlwdC9jb25jb3Vyc2UtYXBwL3NyYy9hcHAvd29ya2Zsb3dzL2Rpc2NvdmVyZWQtZGVwbG95bWVudC9kaXNjb3ZlcmVkLWRlcGxveW1lbnQtdGFidWxhci12aWV3L2Rpc2NvdmVyZWQtZGVwbG95bWVudC10YWJ1bGFyLXZpZXcuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUEsd0NBQW9HO0FBSXBHLHlEQUF5RDtBQUN6RCx1REFBeUQ7QUFDekQsbUhBQW9JO0FBR3BJLDhDQUE0RDtBQU81RCxJQUFhLHdDQUF3QyxHQUFyRCxNQUFhLHdDQUF5QyxTQUFRLHNCQUFZO0lBTXhFLHNFQUFzRTtJQUV0RSxZQUNTLE1BQWMsRUFDZCwyQkFBd0QsRUFDOUMsMEJBQXNEO1FBRXZFLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUpQLFdBQU0sR0FBTixNQUFNLENBQVE7UUFDZCxnQ0FBMkIsR0FBM0IsMkJBQTJCLENBQTZCO1FBQzlDLCtCQUEwQixHQUExQiwwQkFBMEIsQ0FBNEI7UUFOekUsY0FBUyxHQUFHLElBQUksQ0FBQywwQkFBMEIsQ0FBQyxTQUFTLENBQUM7SUFTdEQsQ0FBQztJQUVELE9BQU87UUFDTCwwSEFBMEg7SUFDNUgsQ0FBQztJQUNELFFBQVE7UUFDTixJQUFJLENBQUMscUJBQXFCLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQ3RELGtCQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsTUFBTSxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBTSxLQUFLLENBQUMsQ0FBQyxFQUMzQyx3QkFBWSxDQUFDLCtDQUFvQixDQUFDLEVBQ2xDLHdCQUFZLENBQUMsSUFB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