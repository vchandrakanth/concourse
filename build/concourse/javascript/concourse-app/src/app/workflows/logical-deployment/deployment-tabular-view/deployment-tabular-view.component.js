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
const classes_1 = require("@concourse/shared/classes");
const search_actions_component_1 = require("@concourse/shared/components/search-actions/search-actions.component");
let DeploymentTabularViewComponent = class DeploymentTabularViewComponent extends classes_1.NgxDataTable {
    constructor(router, logicalDeploymentFacade, logicalDeploymentService) {
        super(router);
        this.router = router;
        this.logicalDeploymentFacade = logicalDeploymentFacade;
        this.logicalDeploymentService = logicalDeploymentService;
        this.logicalDeploymentsList$ = this.logicalDeploymentFacade.listWithRelated$;
        this.isLoaded$ = this.logicalDeploymentFacade.isLoaded$;
    }
    getData() {
        // deprecated - replaced by: javascript/concourse-app/src/app/store/logical-deployment/state/logical-deployment.effects.ts
    }
    ngOnInit() {
        //
    }
    ngOnDestroy() {
        this.logicalDeploymentFacade.resetSearch();
    }
    ngAfterContentInit() {
        this.searchFilterComponent.searchField.valueChanges.pipe(operators_2.filter(a => a.length > 2 || a.length === 0), operators_2.debounceTime(search_actions_component_1.SEARCH_DEBOUNCE_TIME), operators_1.untilDestroy(this)).subscribe(searchText => {
            this.logicalDeploymentFacade.resetSearch();
            if (searchText.length) {
                this.logicalDeploymentFacade.search(searchText);
            }
        });
        this.columns = [
            { prop: 'id', name: 'ID' },
            { prop: 'name', name: 'Deployment Name' },
            { prop: 'stackName', name: 'Stack Name' },
            { prop: 'surfaceLayer?.name', name: 'SurfaceLayer Name', cellTemplate: this.surfaceLayerTpl },
            { prop: 'requester?.name', name: 'Requester', cellTemplate: this.requesterTpl },
            { prop: 'priority', name: 'Priority', cellTemplate: this.badgeTpl },
            { prop: 'created', name: 'Created', cellTemplate: this.dateTpl },
            { prop: 'updated', name: 'Updated', cellTemplate: this.dateTpl }
        ];
        this.loadPage();
    }
    buildRoute(row) {
        return ['/workflows/logical-deployments/', row.surfaceLayerId, row.id];
    }
    trackItems(_index, logicalDeployment) {
        return logicalDeployment.id;
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
        // Pages are 0 indexed; increment afterwards
        const page = this.pagesLoaded.toString();
        this.pagesLoaded++;
        this.logicalDeploymentService.getListPaginated('200', page).pipe(operators_2.take(1)).subscribe(results => {
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
        this.logicalDeploymentService.getListPaginated('200', '0', sortString).pipe(operators_2.take(1)).subscribe(results => {
            const rows = [...results];
            this.rows = rows;
            this.isLoading = false;
        });
    }
};
__decorate([
    core_1.ViewChild(search_actions_component_1.SearchActionsComponent)
], DeploymentTabularViewComponent.prototype, "searchFilterComponent", void 0);
__decorate([
    core_1.ViewChild('dateTpl')
], DeploymentTabularViewComponent.prototype, "dateTpl", void 0);
__decorate([
    core_1.ViewChild('badgeTpl')
], DeploymentTabularViewComponent.prototype, "badgeTpl", void 0);
__decorate([
    core_1.ViewChild('modelTpl')
], DeploymentTabularViewComponent.prototype, "modelTpl", void 0);
__decorate([
    core_1.ViewChild('surfaceLayerTpl')
], DeploymentTabularViewComponent.prototype, "surfaceLayerTpl", void 0);
__decorate([
    core_1.ViewChild('requesterTpl')
], DeploymentTabularViewComponent.prototype, "requesterTpl", void 0);
DeploymentTabularViewComponent = __decorate([
    core_1.Component({
        selector: 'app-deployment-tabular-view',
        templateUrl: './deployment-tabular-view.component.html',
        styleUrls: ['./deployment-tabular-view.component.scss']
    })
], DeploymentTabularViewComponent);
exports.DeploymentTabularViewComponent = DeploymentTabularViewComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVwbG95bWVudC10YWJ1bGFyLXZpZXcuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vY29uY291cnNlL2phdmFzY3JpcHQvY29uY291cnNlLWFwcC9zcmMvYXBwL3dvcmtmbG93cy9sb2dpY2FsLWRlcGxveW1lbnQvZGVwbG95bWVudC10YWJ1bGFyLXZpZXcvZGVwbG95bWVudC10YWJ1bGFyLXZpZXcuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUEsd0NBQXVHO0FBR3ZHLHlEQUF5RDtBQUN6RCw4Q0FBNEQ7QUFHNUQsdURBQXlEO0FBQ3pELG1IQUFvSTtBQVNwSSxJQUFhLDhCQUE4QixHQUEzQyxNQUFhLDhCQUErQixTQUFRLHNCQUFZO0lBVTlELFlBQ1MsTUFBYyxFQUNKLHVCQUFnRCxFQUNoRCx3QkFBa0Q7UUFFbkUsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBSlAsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUNKLDRCQUF1QixHQUF2Qix1QkFBdUIsQ0FBeUI7UUFDaEQsNkJBQXdCLEdBQXhCLHdCQUF3QixDQUEwQjtRQU5yRSw0QkFBdUIsR0FBRyxJQUFJLENBQUMsdUJBQXVCLENBQUMsZ0JBQWdCLENBQUM7UUFDeEUsY0FBUyxHQUFHLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxTQUFTLENBQUM7SUFRbkQsQ0FBQztJQUVELE9BQU87UUFDTCwwSEFBMEg7SUFDNUgsQ0FBQztJQUVELFFBQVE7UUFDTixFQUFFO0lBQ0osQ0FBQztJQUVELFdBQVc7UUFDVCxJQUFJLENBQUMsdUJBQXVCLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDN0MsQ0FBQztJQUVELGtCQUFrQjtRQUNoQixJQUFJLENBQUMscUJBQXFCLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQ3RELGtCQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMs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