"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const faTrashAlt_1 = require("@fortawesome/free-solid-svg-icons/faTrashAlt");
const faUsers_1 = require("@fortawesome/free-solid-svg-icons/faUsers");
let ViewUserComponent = class ViewUserComponent {
    constructor(modalFacade, userFacade, auditHistoryFacade) {
        this.modalFacade = modalFacade;
        this.userFacade = userFacade;
        this.auditHistoryFacade = auditHistoryFacade;
        this.user$ = this.userFacade.selectedWithRelated$;
        this.auditHistory$ = this.auditHistoryFacade.auditHistory$;
        this.roleIndex = -1;
        this.icons = { faTrashAlt: faTrashAlt_1.faTrashAlt, faUsers: faUsers_1.faUsers };
    }
    trackRoleAssignments(_index, roleAssignment) {
        return roleAssignment.id;
    }
    deleteUser(user) {
        this.modalFacade.confirmDeleteModal('User', user.name, () => this.userFacade.delete(user));
    }
    showRoles(index) {
        this.roleIndex = index === this.roleIndex ? -1 : index;
    }
};
ViewUserComponent = __decorate([
    core_1.Component({
        selector: 'app-view-user',
        templateUrl: './view-user.component.html',
        styleUrls: ['./view-user.component.scss']
    })
], ViewUserComponent);
exports.ViewUserComponent = ViewUserComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlldy11c2VyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL2NvbmNvdXJzZS9qYXZhc2NyaXB0L2NvbmNvdXJzZS1hcHAvc3JjL2FwcC91c2VyLW1hbmFnZW1lbnQvdXNlcnMvdmlldy11c2VyL3ZpZXctdXNlci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQSx3Q0FBMEM7QUFDMUMsNkVBQTBFO0FBQzFFLHVFQUFvRTtBQVlwRSxJQUFhLGlCQUFpQixHQUE5QixNQUFhLGlCQUFpQjtJQU01QixZQUNtQixXQUE2QixFQUM3QixVQUFzQixFQUN0QixrQkFBc0M7UUFGdEMsZ0JBQVcsR0FBWCxXQUFXLENBQWtCO1FBQzdCLGVBQVUsR0FBVixVQUFVLENBQVk7UUFDdEIsdUJBQWtCLEdBQWxCLGtCQUFrQixDQUFvQjtRQVJ6RCxVQUFLLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxvQkFBb0IsQ0FBQztRQUM3QyxrQkFBYSxHQUFHLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxhQUFhLENBQUM7UUFDdEQsY0FBUyxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQ04sVUFBSyxHQUFHLEVBQUUsVUFBVSxFQUFWLHVCQUFVLEVBQUUsT0FBTyxFQUFQLGlCQUFPLEVBQUUsQ0FBQztJQU1yQyxDQUFDO0lBRUwsb0JBQW9CLENBQUMsTUFBYyxFQUFFLGNBQThCO1FBQ2pFLE9BQU8sY0FBYyxDQUFDLEVBQUUsQ0FBQztJQUMzQixDQUFDO0lBRUQsVUFBVSxDQUFDLElBQVU7UUFDbkIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxrQkFBa0IsQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLElBQUksRUFBRSxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBQzdGLENBQUM7SUFFRCxTQUFTLENBQUMsS0FBYTtRQUNyQixJQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssS0FBSyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDO0lBQ3pELENBQUM7Q0FFRixDQUFBO0FBeEJZLGlCQUFpQjtJQUw3QixnQkFBUyxDQUFDO1FBQ1QsUUFBUSxFQUFFLGVBQWU7UUFDekIsV0FBVyxFQUFFLDRCQUE0QjtRQUN6QyxTQUFTLEVBQUUsQ0FBQyw0QkFBNEIsQ0FBQztLQUMxQyxDQUFDO0dBQ1csaUJBQWlCLENBd0I3QjtBQXhCWSw4Q0FBaUIifQ==