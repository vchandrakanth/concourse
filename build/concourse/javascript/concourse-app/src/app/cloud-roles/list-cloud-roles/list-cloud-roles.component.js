"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const faCloudDownloadAlt_1 = require("@fortawesome/free-solid-svg-icons/faCloudDownloadAlt");
const faPlus_1 = require("@fortawesome/free-solid-svg-icons/faPlus");
const faSync_1 = require("@fortawesome/free-solid-svg-icons/faSync");
const operators_1 = require("@concourse/core/operators");
const operators_2 = require("rxjs/operators");
const modal_1 = require("@concourse/core/modal");
const search_actions_component_1 = require("@concourse/shared/components/search-actions/search-actions.component");
let ListCloudRolesComponent = class ListCloudRolesComponent {
    constructor(modalFacade, cloudRoleFacade) {
        this.modalFacade = modalFacade;
        this.cloudRoleFacade = cloudRoleFacade;
        this.icons = { faPlus: faPlus_1.faPlus, faCloudDownloadAlt: faCloudDownloadAlt_1.faCloudDownloadAlt, faSync: faSync_1.faSync };
        this.cloudRoles$ = this.cloudRoleFacade.list$;
        this.selectedCloudRole$ = this.cloudRoleFacade.getSelected$;
        this.isLoaded$ = this.cloudRoleFacade.isLoaded$;
        this.cloudRoleSyncPending$ = this.cloudRoleFacade.cloudRoleSyncPending$;
        this.hasNextLink$ = this.cloudRoleFacade.hasNextLink$;
        this.page = 0;
    }
    ngOnInit() {
        this.searchComponent.searchField.valueChanges.pipe(operators_2.filter(s => s.length > 2 || s.length === 0), operators_2.debounceTime(search_actions_component_1.SEARCH_DEBOUNCE_TIME), operators_1.untilDestroy(this)).subscribe(searchText => {
            this.cloudRoleFacade.resetSearch();
            if (searchText.length) {
                this.cloudRoleFacade.search(searchText);
            }
        });
    }
    createNewCloudRole() {
        this.modalFacade.openModal({
            component: modal_1.CreateCloudUserRoleComponent,
            id: 'create-cloud-role',
            options: {
                class: 'modal-lg'
            }
        });
    }
    onSyncCloudRoles() {
        this.modalFacade.confirmModal({
            confirmBody: `Do you want to sync your Custom Cloud Roles from Azure?

      This will import the Cloud Roles defined in your Azure Environment and set them to the PUBLISHED status.

      Previously synced CloudRoles with the same name will be updated.
      `,
            triggerConfirm: () => this.cloudRoleFacade.syncCloudRolesAzure()
        });
    }
    onScrollEnd(hasNextLink, isLoaded) {
        if (hasNextLink && isLoaded) {
            this.page++;
            this.cloudRoleFacade.getCloudRolesByPagination(this.page, 200);
        }
    }
    ngOnDestroy() {
        // for untilDestroy.
    }
};
__decorate([
    core_1.ViewChild(search_actions_component_1.SearchActionsComponent)
], ListCloudRolesComponent.prototype, "searchComponent", void 0);
ListCloudRolesComponent = __decorate([
    core_1.Component({
        selector: 'app-cloud-roles',
        templateUrl: './list-cloud-roles.component.html',
        styleUrls: ['./list-cloud-roles.component.scss']
    })
], ListCloudRolesComponent);
exports.ListCloudRolesComponent = ListCloudRolesComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdC1jbG91ZC1yb2xlcy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9jb25jb3Vyc2UvamF2YXNjcmlwdC9jb25jb3Vyc2UtYXBwL3NyYy9hcHAvY2xvdWQtcm9sZXMvbGlzdC1jbG91ZC1yb2xlcy9saXN0LWNsb3VkLXJvbGVzLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBLHdDQUF3RTtBQUN4RSw2RkFBMEY7QUFDMUYscUVBQWtFO0FBQ2xFLHFFQUFrRTtBQUVsRSx5REFBeUQ7QUFDekQsOENBQXNEO0FBRXRELGlEQUF1RjtBQUN2RixtSEFBb0k7QUFRcEksSUFBYSx1QkFBdUIsR0FBcEMsTUFBYSx1QkFBdUI7SUFVbEMsWUFDbUIsV0FBNkIsRUFDN0IsZUFBZ0M7UUFEaEMsZ0JBQVcsR0FBWCxXQUFXLENBQWtCO1FBQzdCLG9CQUFlLEdBQWYsZUFBZSxDQUFpQjtRQVYxQyxVQUFLLEdBQUcsRUFBRSxNQUFNLEVBQU4sZUFBTSxFQUFFLGtCQUFrQixFQUFsQix1Q0FBa0IsRUFBRSxNQUFNLEVBQU4sZUFBTSxFQUFFLENBQUM7UUFDeEQsZ0JBQVcsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLEtBQUssQ0FBQztRQUN6Qyx1QkFBa0IsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLFlBQVksQ0FBQztRQUN2RCxjQUFTLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxTQUFTLENBQUM7UUFDM0MsMEJBQXFCLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxxQkFBcUIsQ0FBQztRQUNuRSxpQkFBWSxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsWUFBWSxDQUFDO1FBQ2pELFNBQUksR0FBRyxDQUFDLENBQUM7SUFNVCxDQUFDO0lBRUQsUUFBUTtRQUNOLElBQUksQ0FBQyxlQUFlLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQ2hELGtCQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsTUFBTSxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBTSxLQUFLLENBQUMsQ0FBQyxFQUMzQyx3QkFBWSxDQUFDLCtDQUFvQixDQUFDLEVBQ2xDLHdCQUFZLENBQUMsSUFBSSxDQUFDLENBQ25CLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxFQUFFO1lBQ3ZCLElBQUksQ0FBQyxlQUFlLENBQUMsV0FBVyxFQUFFLENBQUM7WUFDbkMsSUFBSSxVQUFVLENBQUMsTUFBTSxFQUFFO2dCQUNyQixJQUFJLENBQUMsZUFBZSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQzthQUN6QztRQUNILENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELGtCQUFrQjtRQUNoQixJQUFJLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQztZQUN6QixTQUFTLEVBQUUsb0NBQTRCO1lBQ3ZDLEVBQUUsRUFBRSxtQkFBbUI7WUFDdkIsT0FBTyxFQUFFO2dCQUNQLEtBQUssRUFBRSxVQUFVO2FBQ2xCO1NBQ0YsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELGdCQUFnQjtRQUNkLElBQUksQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDO1lBQzVCLFdBQVcsRUFBRTs7Ozs7T0FLWjtZQUNELGNBQWMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLG1CQUFtQixFQUFFO1NBQ2pFLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRCxXQUFXLENBQUMsV0FBb0IsRUFBRSxRQUFpQjtRQUNqRCxJQUFJLFdBQVcsSUFBSSxRQUFRLEVBQUU7WUFDM0IsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO1lBQ1osSUFBSSxDQUFDLGVBQWUsQ0FBQyx5QkFBeUIsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDO1NBQ2hFO0lBQ0gsQ0FBQztJQUVELFdBQVc7UUFDVCxvQkFBb0I7SUFDdEIsQ0FBQztDQUNGLENBQUE7QUE1RG9DO0lBQWxDLGdCQUFTLENBQUMsaURBQXNCLENBQUM7Z0VBQXlDO0FBRGhFLHVCQUF1QjtJQUxuQyxnQkFBUyxDQUFDO1FBQ1QsUUFBUSxFQUFFLGlCQUFpQjtRQUMzQixXQUFXLEVBQUUsbUNBQW1DO1FBQ2hELFNBQVMsRUFBRSxDQUFDLG1DQUFtQyxDQUFDO0tBQ2pELENBQUM7R0FDVyx1QkFBdUIsQ0E2RG5DO0FBN0RZLDBEQUF1QiJ9