"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const portal_1 = require("@angular/cdk/portal");
const core_1 = require("@angular/core");
const forms_1 = require("@angular/forms");
const faFilter_1 = require("@fortawesome/free-solid-svg-icons/faFilter");
const faSearch_1 = require("@fortawesome/free-solid-svg-icons/faSearch");
exports.SEARCH_DEBOUNCE_TIME = 300;
let SearchActionsComponent = class SearchActionsComponent {
    constructor(componentFactoryResolver, injector, appRef) {
        this.componentFactoryResolver = componentFactoryResolver;
        this.injector = injector;
        this.appRef = appRef;
        this.form = new forms_1.FormGroup({
            textSearch: new forms_1.FormControl('')
        });
        this.icons = { faFilter: faFilter_1.faFilter, faSearch: faSearch_1.faSearch };
        this.filtersOpened = false;
    }
    get searchField() {
        return this.form.get('textSearch');
    }
    ngAfterViewInit() {
        const container = document.querySelector('#page-search-actions-container');
        if (!!container) {
            // create a portalHost from a DOM element
            this.portalHost = new portal_1.DomPortalHost(container, this.componentFactoryResolver, this.appRef, this.injector);
            // attach portal to host
            if (!!this.portalHost) {
                this.portalHost.attach(this.portal);
            }
        }
    }
    ngOnDestroy() {
        if (!!this.portalHost) {
            this.portalHost.detach();
        }
    }
    openFilters() {
        this.filtersOpened = !this.filtersOpened;
    }
};
__decorate([
    core_1.ViewChild(portal_1.CdkPortal)
], SearchActionsComponent.prototype, "portal", void 0);
__decorate([
    core_1.Input()
], SearchActionsComponent.prototype, "dropdownFilterItems", void 0);
SearchActionsComponent = __decorate([
    core_1.Component({
        exportAs: 'searchActions',
        selector: 'app-search-actions',
        templateUrl: './search-actions.component.html',
        styleUrls: ['./search-actions.component.scss']
    })
], SearchActionsComponent);
exports.SearchActionsComponent = SearchActionsComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VhcmNoLWFjdGlvbnMuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vY29uY291cnNlL2phdmFzY3JpcHQvY29uY291cnNlLWFwcC9zcmMvYXBwL3NoYXJlZC9jb21wb25lbnRzL3NlYXJjaC1hY3Rpb25zL3NlYXJjaC1hY3Rpb25zLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBLGdEQUEyRTtBQUMzRSx3Q0FTdUI7QUFDdkIsMENBQXlFO0FBQ3pFLHlFQUFzRTtBQUN0RSx5RUFBc0U7QUFFekQsUUFBQSxvQkFBb0IsR0FBRyxHQUFHLENBQUM7QUFReEMsSUFBYSxzQkFBc0IsR0FBbkMsTUFBYSxzQkFBc0I7SUFhakMsWUFDbUIsd0JBQWtELEVBQ2xELFFBQWtCLEVBQ2xCLE1BQXNCO1FBRnRCLDZCQUF3QixHQUF4Qix3QkFBd0IsQ0FBMEI7UUFDbEQsYUFBUSxHQUFSLFFBQVEsQ0FBVTtRQUNsQixXQUFNLEdBQU4sTUFBTSxDQUFnQjtRQWJ6QyxTQUFJLEdBQUcsSUFBSSxpQkFBUyxDQUFDO1lBQ25CLFVBQVUsRUFBRSxJQUFJLG1CQUFXLENBQUMsRUFBRSxDQUFDO1NBQ2hDLENBQUMsQ0FBQztRQUlnQixVQUFLLEdBQUcsRUFBRSxRQUFRLEVBQVIsbUJBQVEsRUFBRSxRQUFRLEVBQVIsbUJBQVEsRUFBRSxDQUFDO1FBQ3hDLGtCQUFhLEdBQUcsS0FBSyxDQUFDO0lBTzVCLENBQUM7SUFYTCxJQUFJLFdBQVc7UUFDYixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxDQUFDO0lBQ3JDLENBQUM7SUFXRCxlQUFlO1FBQ2IsTUFBTSxTQUFTLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxnQ0FBZ0MsQ0FBQyxDQUFDO1FBQzNFLElBQUksQ0FBQyxDQUFDLFNBQVMsRUFBRTtZQUNmLHlDQUF5QztZQUN6QyxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksc0JBQWEsQ0FDakMsU0FBUyxFQUNULElBQUksQ0FBQyx3QkFBd0IsRUFDN0IsSUFBSSxDQUFDLE1BQU0sRUFDWCxJQUFJLENBQUMsUUFBUSxDQUNkLENBQUM7WUFDRix3QkFBd0I7WUFDeEIsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRTtnQkFDckIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO2FBQ3JDO1NBQ0Y7SUFDSCxDQUFDO0lBRUQsV0FBVztRQUNULElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUU7WUFDckIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEVBQUUsQ0FBQztTQUMxQjtJQUNILENBQUM7SUFFUyxXQUFXO1FBQ25CLElBQUksQ0FBQyxhQUFhLEdBQUcsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDO0lBQzNDLENBQUM7Q0FDRixDQUFBO0FBNUN1QjtJQUFyQixnQkFBUyxDQUFDLGtCQUFTLENBQUM7c0RBQVE7QUFDcEI7SUFBUixZQUFLLEVBQUU7bUVBQXFCO0FBRmxCLHNCQUFzQjtJQU5sQyxnQkFBUyxDQUFDO1FBQ1QsUUFBUSxFQUFFLGVBQWU7UUFDekIsUUFBUSxFQUFFLG9CQUFvQjtRQUM5QixXQUFXLEVBQUUsaUNBQWlDO1FBQzlDLFNBQVMsRUFBRSxDQUFDLGlDQUFpQyxDQUFDO0tBQy9DLENBQUM7R0FDVyxzQkFBc0IsQ0E2Q2xDO0FBN0NZLHdEQUFzQiJ9