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
let ListPolicyGroupsComponent = class ListPolicyGroupsComponent {
    constructor(modalFacade, policyGroupFacade, roleFacade) {
        this.modalFacade = modalFacade;
        this.policyGroupFacade = policyGroupFacade;
        this.roleFacade = roleFacade;
        this.policyGroupList$ = this.policyGroupFacade.list$;
        this.selectedPolicyGroup$ = this.policyGroupFacade.selected$;
        this.owningGroupOptions$ = this.policyGroupFacade.selectableOwningGroups$;
        this.isLoaded$ = this.policyGroupFacade.isLoaded$;
        this.hasNextLink$ = this.policyGroupFacade.hasNextLink$;
        this.icons = { faPlus: faPlus_1.faPlus };
        // this will be moved in to store.
        this.page = 0;
        this.responsibilityById$ = this.roleFacade.responsibilityById$;
    }
    trackItems(_index, policyGroup) {
        return policyGroup.id;
    }
    ngOnInit() {
        this.searchComponent.searchField.valueChanges.pipe(operators_2.filter(s => s.length > 2 || s.length === 0), operators_2.debounceTime(search_actions_component_1.SEARCH_DEBOUNCE_TIME), operators_1.untilDestroy(this)).subscribe(searchText => {
            this.policyGroupFacade.resetSearch();
            if (searchText.length) {
                this.policyGroupFacade.search(searchText);
            }
        });
    }
    ngOnDestroy() {
        this.policyGroupFacade.resetSearch();
    }
    createNewPolicyGroup() {
        this.modalFacade.openModal({
            component: modal_1.CreatePolicyGroupComponent,
            id: 'create-policy-group',
            options: {
                class: 'modal-xl'
            }
        });
    }
    createNewPolicyGroupV2() {
        this.modalFacade.openModal({
            component: modal_1.CreatePolicyGroupV2Component,
            id: 'create-policy-group-v2',
            options: {
                class: 'modal-full'
            }
        });
    }
    createNewPolicyGroupV3() {
        this.modalFacade.openModal({
            component: modal_1.CreatePolicyGroupV3Component,
            id: 'create-policy-group-v3',
            options: {
                class: 'modal-full'
            }
        });
    }
    onScrollEnd(hasNextLink, isLoaded) {
        if (hasNextLink && isLoaded) {
            this.page++;
            this.policyGroupFacade.getPaginatedList(this.page, 200);
        }
    }
};
__decorate([
    core_1.ViewChild(search_actions_component_1.SearchActionsComponent)
], ListPolicyGroupsComponent.prototype, "searchComponent", void 0);
ListPolicyGroupsComponent = __decorate([
    core_1.Component({
        selector: 'app-list-policy-groups',
        templateUrl: './list-policy-groups.component.html',
        styleUrls: ['./list-policy-groups.component.scss']
    })
], ListPolicyGroupsComponent);
exports.ListPolicyGroupsComponent = ListPolicyGroupsComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdC1wb2xpY3ktZ3JvdXBzLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL2NvbmNvdXJzZS9qYXZhc2NyaXB0L2NvbmNvdXJzZS1hcHAvc3JjL2FwcC9wb2xpY3ktZ3JvdXBzL2xpc3QtcG9saWN5LWdyb3Vwcy9saXN0LXBvbGljeS1ncm91cHMuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUEsd0NBQXdFO0FBQ3hFLHFFQUFrRTtBQUVsRSx5REFBeUQ7QUFDekQsOENBQTJEO0FBRTNELGlEQUErSDtBQUUvSCxtSEFBb0k7QUFRcEksSUFBYSx5QkFBeUIsR0FBdEMsTUFBYSx5QkFBeUI7SUFZcEMsWUFDbUIsV0FBNkIsRUFDN0IsaUJBQW9DLEVBQ3BDLFVBQXNCO1FBRnRCLGdCQUFXLEdBQVgsV0FBVyxDQUFrQjtRQUM3QixzQkFBaUIsR0FBakIsaUJBQWlCLENBQW1CO1FBQ3BDLGVBQVUsR0FBVixVQUFVLENBQVk7UUFiekMscUJBQWdCLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLEtBQUssQ0FBQztRQUNoRCx5QkFBb0IsR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUMsU0FBUyxDQUFDO1FBQ3hELHdCQUFtQixHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyx1QkFBdUIsQ0FBQztRQUNyRSxjQUFTLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFNBQVMsQ0FBQztRQUM3QyxpQkFBWSxHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxZQUFZLENBQUM7UUFDMUMsVUFBSyxHQUFHLEVBQUUsTUFBTSxFQUFOLGVBQU0sRUFBRSxDQUFDO1FBQzVCLGtDQUFrQztRQUNsQyxTQUFJLEdBQVcsQ0FBQyxDQUFDO1FBQ2pCLHdCQUFtQixHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsbUJBQW1CLENBQUM7SUFPdEQsQ0FBQztJQUVMLFVBQVUsQ0FBQyxNQUFjLEVBQUUsV0FBd0I7UUFDakQsT0FBTyxXQUFXLENBQUMsRUFBRSxDQUFDO0lBQ3hCLENBQUM7SUFFRCxRQUFRO1FBQ04sSUFBSSxDQUFDLGVBQWUsQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLElBQUksQ0FDaEQsa0JBQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFNLEtBQUssQ0FBQyxDQUFDLEVBQzNDLHdCQUFZLENBQUMsK0NBQW9CLENBQUMsRUFDbEMsd0JBQVksQ0FBQyxJQUFJLENBQUMsQ0FDbkIsQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLEVBQUU7WUFDdkIsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFdBQVcsRUFBRSxDQUFDO1lBQ3JDLElBQUksVUFBVSxDQUFDLE1BQU0sRUFBRTtnQkFDckIsSUFBSSxDQUFDLGlCQUFpQixDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQzthQUMzQztRQUNILENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUNELFdBQVc7UUFDVCxJQUFJLENBQUMsaUJBQWlCLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDdkMsQ0FBQztJQUVELG9CQUFvQjtRQUNsQixJQUFJLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQztZQUN6QixTQUFTLEVBQUUsa0NBQTBCO1lBQ3JDLEVBQUUsRUFBRSxxQkFBcUI7WUFDekIsT0FBTyxFQUFFO2dCQUNQLEtBQUssRUFBRSxVQUFVO2FBQ2xCO1NBQ0YsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELHNCQUFzQjtRQUNwQixJQUFJLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQztZQUN6QixTQUFTLEVBQUUsb0NBQTRCO1lBQ3ZDLEVBQUUsRUFBRSx3QkFBd0I7WUFDNUIsT0FBTyxFQUFFO2dCQUNQLEtBQUssRUFBRSxZQUFZO2FBQ3BCO1NBQ0YsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELHNCQUFzQjtRQUNwQixJQUFJLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQztZQUN6QixTQUFTLEVBQUUsb0NBQTRCO1lBQ3ZDLEVBQUUsRUFBRSx3QkFBd0I7WUFDNUIsT0FBTyxFQUFFO2dCQUNQLEtBQUssRUFBRSxZQUFZO2FBQ3BCO1NBQ0YsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELFdBQVcsQ0FBQyxXQUFvQixFQUFFLFFBQWlCO1FBQ2pELElBQUksV0FBVyxJQUFJLFFBQVEsRUFBRTtZQUMzQixJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDWixJQUFJLENBQUMsaUJBQWlCLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQztTQUN6RDtJQUNILENBQUM7Q0FDRixDQUFBO0FBMUVvQztJQUFsQyxnQkFBUyxDQUFDLGlEQUFzQixDQUFDO2tFQUF5QztBQURoRSx5QkFBeUI7SUFMckMsZ0JBQVMsQ0FBQztRQUNULFFBQVEsRUFBRSx3QkFBd0I7UUFDbEMsV0FBVyxFQUFFLHFDQUFxQztRQUNsRCxTQUFTLEVBQUUsQ0FBQyxxQ0FBcUMsQ0FBQztLQUNuRCxDQUFDO0dBQ1cseUJBQXlCLENBMkVyQztBQTNFWSw4REFBeUIifQ==