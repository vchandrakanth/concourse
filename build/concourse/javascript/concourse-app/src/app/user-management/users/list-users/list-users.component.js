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
let ListUsersComponent = class ListUsersComponent {
    constructor(modalFacade, userFacade) {
        this.modalFacade = modalFacade;
        this.userFacade = userFacade;
        this.users$ = this.userFacade.list$;
        this.user$ = this.userFacade.selected$;
        this.isUpdating$ = this.userFacade.isUpdating$;
        this.isLoaded$ = this.userFacade.isLoaded$;
        this.hasNextLink$ = this.userFacade.hasNextLink$;
        this.page = 0;
        this.icons = { faPlus: faPlus_1.faPlus };
    }
    ngOnInit() {
        this.searchComponent.searchField.valueChanges.pipe(operators_2.filter(s => s.length > 2 || s.length === 0), operators_2.debounceTime(search_actions_component_1.SEARCH_DEBOUNCE_TIME), operators_1.untilDestroy(this)).subscribe(searchText => {
            this.userFacade.resetSearch();
            if (searchText.length) {
                this.userFacade.search(searchText);
            }
        });
    }
    ngOnDestroy() {
        this.userFacade.resetSearch();
    }
    trackItems(_index, user) {
        return user.id;
    }
    openInviteModal() {
        this.modalFacade.openModal({
            component: modal_1.InviteUserComponent,
            id: 'invite-user'
        });
    }
    onScrollEnd(hasNextLink, isLoaded) {
        if (hasNextLink && isLoaded) {
            this.page++;
            this.userFacade.ListByPagination(this.page, '200');
        }
    }
};
__decorate([
    core_1.ViewChild(search_actions_component_1.SearchActionsComponent)
], ListUsersComponent.prototype, "searchComponent", void 0);
ListUsersComponent = __decorate([
    core_1.Component({
        selector: 'app-list-users',
        templateUrl: './list-users.component.html',
        styleUrls: ['./list-users.component.scss']
    })
], ListUsersComponent);
exports.ListUsersComponent = ListUsersComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdC11c2Vycy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9jb25jb3Vyc2UvamF2YXNjcmlwdC9jb25jb3Vyc2UtYXBwL3NyYy9hcHAvdXNlci1tYW5hZ2VtZW50L3VzZXJzL2xpc3QtdXNlcnMvbGlzdC11c2Vycy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQSx3Q0FBd0U7QUFDeEUscUVBQWtFO0FBRWxFLHlEQUF5RDtBQUN6RCw4Q0FBc0Q7QUFFdEQsaURBQThFO0FBRTlFLG1IQUFvSTtBQVFwSSxJQUFhLGtCQUFrQixHQUEvQixNQUFhLGtCQUFrQjtJQVU3QixZQUNtQixXQUE2QixFQUM3QixVQUFzQjtRQUR0QixnQkFBVyxHQUFYLFdBQVcsQ0FBa0I7UUFDN0IsZUFBVSxHQUFWLFVBQVUsQ0FBWTtRQVZ6QyxXQUFNLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUM7UUFDL0IsVUFBSyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDO1FBQ2xDLGdCQUFXLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUM7UUFDMUMsY0FBUyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDO1FBQ3RDLGlCQUFZLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxZQUFZLENBQUM7UUFDNUMsU0FBSSxHQUFHLENBQUMsQ0FBQztRQUNBLFVBQUssR0FBRyxFQUFFLE1BQU0sRUFBTixlQUFNLEVBQUUsQ0FBQztJQUt4QixDQUFDO0lBQ0wsUUFBUTtRQUNOLElBQUksQ0FBQyxlQUFlLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQ2hELGtCQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsTUFBTSxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBTSxLQUFLLENBQUMsQ0FBQyxFQUMzQyx3QkFBWSxDQUFDLCtDQUFvQixDQUFDLEVBQ2xDLHdCQUFZLENBQUMsSUFBSSxDQUFDLENBQ25CLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxFQUFFO1lBQ3ZCLElBQUksQ0FBQyxVQUFVLENBQUMsV0FBVyxFQUFFLENBQUM7WUFDOUIsSUFBSSxVQUFVLENBQUMsTUFBTSxFQUFFO2dCQUNyQixJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQzthQUNwQztRQUNILENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELFdBQVc7UUFDVCxJQUFJLENBQUMsVUFBVSxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ2hDLENBQUM7SUFFRCxVQUFVLENBQUMsTUFBYyxFQUFFLElBQVU7UUFDbkMsT0FBTyxJQUFJLENBQUMsRUFBRSxDQUFDO0lBQ2pCLENBQUM7SUFFRCxlQUFlO1FBQ2IsSUFBSSxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUM7WUFDekIsU0FBUyxFQUFFLDJCQUFtQjtZQUM5QixFQUFFLEVBQUUsYUFBYTtTQUNsQixDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQsV0FBVyxDQUFDLFdBQW9CLEVBQUUsUUFBaUI7UUFDakQsSUFBSSxXQUFXLElBQUksUUFBUSxFQUFFO1lBQzNCLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUNaLElBQUksQ0FBQyxVQUFVLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsQ0FBQztTQUNwRDtJQUNILENBQUM7Q0FDRixDQUFBO0FBL0NvQztJQUFsQyxnQkFBUyxDQUFDLGlEQUFzQixDQUFDOzJEQUF5QztBQURoRSxrQkFBa0I7SUFMOUIsZ0JBQVMsQ0FBQztRQUNULFFBQVEsRUFBRSxnQkFBZ0I7UUFDMUIsV0FBVyxFQUFFLDZCQUE2QjtRQUMxQyxTQUFTLEVBQUUsQ0FBQyw2QkFBNkIsQ0FBQztLQUMzQyxDQUFDO0dBQ1csa0JBQWtCLENBZ0Q5QjtBQWhEWSxnREFBa0IifQ==