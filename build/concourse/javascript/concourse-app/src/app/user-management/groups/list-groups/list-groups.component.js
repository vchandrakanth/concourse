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
const search_actions_component_1 = require("@concourse/shared/components/search-actions/search-actions.component");
let ListGroupsComponent = class ListGroupsComponent {
    constructor(modalFacade, groupFacade) {
        this.modalFacade = modalFacade;
        this.groupFacade = groupFacade;
        this.groups$ = this.groupFacade.list$;
        this.group$ = this.groupFacade.selected$;
        this.isUpdating$ = this.groupFacade.isUpdating$;
        this.isLoaded$ = this.groupFacade.isLoaded$;
        this.hasNextLink$ = this.groupFacade.hasNextLink$;
        this.icons = { faPlus: faPlus_1.faPlus };
    }
    ngOnInit() {
        this.searchComponent.searchField.valueChanges.pipe(operators_2.filter(s => s.length > 2 || s.length === 0), operators_2.debounceTime(search_actions_component_1.SEARCH_DEBOUNCE_TIME), operators_1.untilDestroy(this)).subscribe(searchText => {
            this.groupFacade.resetSearch();
            if (searchText.length) {
                this.groupFacade.search(searchText);
            }
        });
    }
    ngOnDestroy() {
        this.groupFacade.resetSearch();
    }
    trackItems(_index, group) {
        return group.id;
    }
    newGroupModal() {
        this.modalFacade.openModal({
            component: modal_1.CreateGroupComponent,
            id: 'new-group'
        });
    }
    onScrollEnd(hasNextLink, isLoaded) {
        if (hasNextLink && isLoaded) {
            this.page++;
            this.groupFacade.getPaginatedList(this.page, 200);
        }
    }
};
__decorate([
    core_1.ViewChild(search_actions_component_1.SearchActionsComponent)
], ListGroupsComponent.prototype, "searchComponent", void 0);
ListGroupsComponent = __decorate([
    core_1.Component({
        selector: 'app-list-groups',
        templateUrl: './list-groups.component.html',
        styleUrls: ['./list-groups.component.scss']
    })
], ListGroupsComponent);
exports.ListGroupsComponent = ListGroupsComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdC1ncm91cHMuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vY29uY291cnNlL2phdmFzY3JpcHQvY29uY291cnNlLWFwcC9zcmMvYXBwL3VzZXItbWFuYWdlbWVudC9ncm91cHMvbGlzdC1ncm91cHMvbGlzdC1ncm91cHMuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUEsd0NBQXdFO0FBQ3hFLHFFQUFrRTtBQUVsRSx5REFBeUQ7QUFDekQsOENBQXNEO0FBRXRELGlEQUErRTtBQUUvRSxtSEFBb0k7QUFRcEksSUFBYSxtQkFBbUIsR0FBaEMsTUFBYSxtQkFBbUI7SUFVOUIsWUFDbUIsV0FBNkIsRUFDN0IsV0FBd0I7UUFEeEIsZ0JBQVcsR0FBWCxXQUFXLENBQWtCO1FBQzdCLGdCQUFXLEdBQVgsV0FBVyxDQUFhO1FBVjNDLFlBQU8sR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQztRQUNqQyxXQUFNLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUM7UUFDcEMsZ0JBQVcsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLFdBQVcsQ0FBQztRQUMzQyxjQUFTLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUM7UUFDdkMsaUJBQVksR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQztRQUVwQyxVQUFLLEdBQUcsRUFBRSxNQUFNLEVBQU4sZUFBTSxFQUFFLENBQUM7SUFLeEIsQ0FBQztJQUVMLFFBQVE7UUFDTixJQUFJLENBQUMsZUFBZSxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUNoRCxrQkFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLE1BQU0sS0FBSyxDQUFDLENBQUMsRUFDM0Msd0JBQVksQ0FBQywrQ0FBb0IsQ0FBQyxFQUNsQyx3QkFBWSxDQUFDLElBQUksQ0FBQyxDQUNuQixDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsRUFBRTtZQUN2QixJQUFJLENBQUMsV0FBVyxDQUFDLFdBQVcsRUFBRSxDQUFDO1lBQy9CLElBQUksVUFBVSxDQUFDLE1BQU0sRUFBRTtnQkFDckIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUM7YUFDckM7UUFDSCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRCxXQUFXO1FBQ1QsSUFBSSxDQUFDLFdBQVcsQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUNqQyxDQUFDO0lBRUQsVUFBVSxDQUFDLE1BQWMsRUFBRSxLQUFZO1FBQ3JDLE9BQU8sS0FBSyxDQUFDLEVBQUUsQ0FBQztJQUNsQixDQUFDO0lBRUQsYUFBYTtRQUNYLElBQUksQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDO1lBQ3pCLFNBQVMsRUFBRSw0QkFBb0I7WUFDL0IsRUFBRSxFQUFFLFdBQVc7U0FDaEIsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELFdBQVcsQ0FBQyxXQUFvQixFQUFFLFFBQWlCO1FBQ2pELElBQUksV0FBVyxJQUFJLFFBQVEsRUFBRTtZQUMzQixJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDWixJQUFJLENBQUMsV0FBVyxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDLENBQUM7U0FDbkQ7SUFDSCxDQUFDO0NBRUYsQ0FBQTtBQWpEb0M7SUFBbEMsZ0JBQVMsQ0FBQyxpREFBc0IsQ0FBQzs0REFBeUM7QUFEaEUsbUJBQW1CO0lBTC9CLGdCQUFTLENBQUM7UUFDVCxRQUFRLEVBQUUsaUJBQWlCO1FBQzNCLFdBQVcsRUFBRSw4QkFBOEI7UUFDM0MsU0FBUyxFQUFFLENBQUMsOEJBQThCLENBQUM7S0FDNUMsQ0FBQztHQUNXLG1CQUFtQixDQWtEL0I7QUFsRFksa0RBQW1CIn0=