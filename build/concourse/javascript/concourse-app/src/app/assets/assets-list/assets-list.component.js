"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const faPlus_1 = require("@fortawesome/free-solid-svg-icons/faPlus");
const operators_1 = require("@concourse/core/operators");
const operators_2 = require("rxjs/operators");
const modal_1 = require("@concourse/core/modal");
const classes_1 = require("@concourse/shared/classes");
const search_actions_component_1 = require("@concourse/shared/components/search-actions/search-actions.component");
let AssetsListComponent = class AssetsListComponent extends classes_1.NgxDataTable {
    constructor(router, el, assetFacade, assetService, roleFacade, modalFacade) {
        super(router);
        this.router = router;
        this.el = el;
        this.assetFacade = assetFacade;
        this.assetService = assetService;
        this.roleFacade = roleFacade;
        this.modalFacade = modalFacade;
        this.listAssets$ = this.assetFacade.assetList$;
        this.owningGroupOptions$ = this.assetFacade.selectableOwningGroups$;
        this.isLoaded$ = this.assetFacade.isLoaded$;
        this.hasNextLink$ = this.assetFacade.hasNextLink$;
        this.icons = { faPlus: faPlus_1.faPlus };
        this.page = 0;
        this.responsibilityById$ = this.roleFacade.responsibilityById$;
    }
    ngAfterViewInit() {
        this.columns = [
            { prop: 'id', name: 'ID' },
            { prop: 'name', name: 'Name' },
            { prop: 'version', name: 'Version', cellTemplate: this.versionTpl },
            { prop: 'status', name: 'Type', cellTemplate: this.badgeTpl },
            { prop: 'assetType', name: 'Asset Type', cellTemplate: this.badgeTpl },
            { prop: 'managementStrategy', name: 'Management Strategy', cellTemplate: this.badgeTpl },
            { prop: 'owningGroup', name: 'OwningGroup', cellTemplate: this.owningGroupTpl },
            { prop: 'created', name: 'Created', cellTemplate: this.dateTpl },
            { prop: 'updated', name: 'Updated', cellTemplate: this.dateTpl }
        ];
    }
    getData() {
        this.searchFilterComponent.searchField.valueChanges.pipe(operators_2.filter(a => a.length > 2 || a.length === 0), operators_2.debounceTime(search_actions_component_1.SEARCH_DEBOUNCE_TIME), operators_1.untilDestroy(this)).subscribe(searchText => {
            this.assetFacade.resetSearch();
            if (searchText.length) {
                this.assetFacade.search(searchText);
            }
        });
    }
    ngOnDestroy() {
        this.assetFacade.resetSearch();
    }
    createAsset() {
        this.modalFacade.openModal({ component: modal_1.EnclaveFormModalComponent, id: 'enclave-form' });
    }
    trackItems(_index, asset) {
        return asset.id;
    }
    // TODO: refactor this to something more DRY
    onScroll(offsetY, isLoaded, hasNextLink, list) {
        const ROWS_HEIGHT = list.length * this.rowHeight;
        if ((isLoaded && hasNextLink) && offsetY >= (ROWS_HEIGHT / 3)) {
            this.page++;
            this.assetFacade.getPaginatedList(this.page, 200);
        }
    }
};
__decorate([
    core_1.ViewChild(search_actions_component_1.SearchActionsComponent)
], AssetsListComponent.prototype, "searchFilterComponent", void 0);
__decorate([
    core_1.ViewChild('dateTpl')
], AssetsListComponent.prototype, "dateTpl", void 0);
__decorate([
    core_1.ViewChild('badgeTpl')
], AssetsListComponent.prototype, "badgeTpl", void 0);
__decorate([
    core_1.ViewChild('versionTpl')
], AssetsListComponent.prototype, "versionTpl", void 0);
__decorate([
    core_1.ViewChild('owningGroupTpl')
], AssetsListComponent.prototype, "owningGroupTpl", void 0);
AssetsListComponent = __decorate([
    core_1.Component({
        selector: 'app-assets-list',
        templateUrl: './assets-list.component.html',
        styleUrls: ['./assets-list.component.scss']
    })
], AssetsListComponent);
exports.AssetsListComponent = AssetsListComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXNzZXRzLWxpc3QuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vY29uY291cnNlL2phdmFzY3JpcHQvY29uY291cnNlLWFwcC9zcmMvYXBwL2Fzc2V0cy9hc3NldHMtbGlzdC9hc3NldHMtbGlzdC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQSx3Q0FBd0c7QUFFeEcscUVBQWtFO0FBRWxFLHlEQUF5RDtBQUN6RCw4Q0FBNEQ7QUFFNUQsaURBQWtFO0FBRWxFLHVEQUF5RDtBQUN6RCxtSEFBb0k7QUFTcEksSUFBYSxtQkFBbUIsR0FBaEMsTUFBYSxtQkFBb0IsU0FBUSxzQkFBWTtJQWdCbkQsWUFDUyxNQUFjLEVBQ2IsRUFBYyxFQUNMLFdBQXdCLEVBQ2pDLFlBQTBCLEVBQ2pCLFVBQXNCLEVBQ3RCLFdBQTZCO1FBRTlDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztRQVBQLFdBQU0sR0FBTixNQUFNLENBQVE7UUFDYixPQUFFLEdBQUYsRUFBRSxDQUFZO1FBQ0wsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFDakMsaUJBQVksR0FBWixZQUFZLENBQWM7UUFDakIsZUFBVSxHQUFWLFVBQVUsQ0FBWTtRQUN0QixnQkFBVyxHQUFYLFdBQVcsQ0FBa0I7UUFmaEQsZ0JBQVcsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQztRQUMxQyx3QkFBbUIsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLHVCQUF1QixDQUFDO1FBQy9ELGNBQVMsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQztRQUN2QyxpQkFBWSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDO1FBQ3BDLFVBQUssR0FBRyxFQUFFLE1BQU0sRUFBTixlQUFNLEVBQUUsQ0FBQztRQUM1QixTQUFJLEdBQUcsQ0FBQyxDQUFDO1FBRVQsd0JBQW1CLEdBQUcsSUFB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