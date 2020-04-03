"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const faEdit_1 = require("@fortawesome/free-solid-svg-icons/faEdit");
const faTrashAlt_1 = require("@fortawesome/free-solid-svg-icons/faTrashAlt");
const modal_1 = require("@concourse/core/modal");
let ViewCloudRoleComponent = class ViewCloudRoleComponent {
    constructor(cloudRoleFacade, modalStoreFacade, auditHistoryFacade) {
        this.cloudRoleFacade = cloudRoleFacade;
        this.modalStoreFacade = modalStoreFacade;
        this.auditHistoryFacade = auditHistoryFacade;
        this.cloudRole$ = this.cloudRoleFacade.getSelected$;
        this.auditHistory$ = this.auditHistoryFacade.auditHistory$;
        this.icons = { faEdit: faEdit_1.faEdit, faTrashAlt: faTrashAlt_1.faTrashAlt };
    }
    delete(cloudRole) {
        this.modalStoreFacade.confirmDeleteModal('Cloud Role', cloudRole.name, () => this.cloudRoleFacade.delete(cloudRole));
    }
    editAwsActions(selectedCloudRole) {
        this.modalStoreFacade.openModal({
            component: modal_1.ModifyAwsActionsComponent,
            id: 'edit-aws-actions',
            options: {
                class: 'modal-xl',
                initialState: {
                    selectedCloudRole
                }
            }
        });
    }
    editAwsNonActions(selectedCloudRole) {
        this.modalStoreFacade.openModal({
            component: modal_1.ModifyAwsNonActionsComponent,
            id: 'edit-aws-non-actions',
            options: {
                class: 'modal-xl',
                initialState: {
                    selectedCloudRole
                }
            }
        });
    }
    editAzureActions(selectedCloudRole) {
        this.modalStoreFacade.openModal({
            component: modal_1.ModifyAzureActionsComponent,
            id: 'edit-azure-actions',
            options: {
                class: 'modal-xl',
                initialState: {
                    selectedCloudRole
                }
            }
        });
    }
    editAzureNonActions(selectedCloudRole) {
        this.modalStoreFacade.openModal({
            component: modal_1.ModifyAzureNonActionsComponent,
            id: 'edit-azure-non-actions',
            options: {
                class: 'modal-xl',
                initialState: {
                    selectedCloudRole
                }
            }
        });
    }
    edit() {
        this.modalStoreFacade.openModal({
            component: modal_1.EditCloudRoleTemplateComponent,
            id: 'edit-cloud-role',
            options: {
                class: 'modal-lg'
            }
        });
    }
    trackCloudRoleAssignments(_index, cra) {
        return cra.id;
    }
};
ViewCloudRoleComponent = __decorate([
    core_1.Component({
        selector: 'app-view-cloud-role',
        templateUrl: './view-cloud-role.component.html',
        styleUrls: ['./view-cloud-role.component.scss']
    })
], ViewCloudRoleComponent);
exports.ViewCloudRoleComponent = ViewCloudRoleComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlldy1jbG91ZC1yb2xlLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL2NvbmNvdXJzZS9qYXZhc2NyaXB0L2NvbmNvdXJzZS1hcHAvc3JjL2FwcC9jbG91ZC1yb2xlcy92aWV3LWNsb3VkLXJvbGUvdmlldy1jbG91ZC1yb2xlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBLHdDQUEwQztBQUMxQyxxRUFBa0U7QUFDbEUsNkVBQTBFO0FBRTFFLGlEQU0rQjtBQVUvQixJQUFhLHNCQUFzQixHQUFuQyxNQUFhLHNCQUFzQjtJQUtqQyxZQUNtQixlQUFnQyxFQUNoQyxnQkFBa0MsRUFDbEMsa0JBQXNDO1FBRnRDLG9CQUFlLEdBQWYsZUFBZSxDQUFpQjtRQUNoQyxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO1FBQ2xDLHVCQUFrQixHQUFsQixrQkFBa0IsQ0FBb0I7UUFQekQsZUFBVSxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsWUFBWSxDQUFDO1FBQy9DLGtCQUFhLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixDQUFDLGFBQWEsQ0FBQztRQUM3QyxVQUFLLEdBQUcsRUFBRSxNQUFNLEVBQU4sZUFBTSxFQUFFLFVBQVUsRUFBVix1QkFBVSxFQUFFLENBQUM7SUFNcEMsQ0FBQztJQUVMLE1BQU0sQ0FBQyxTQUFvQjtRQUN6QixJQUFJLENBQUMsZ0JBQWdCLENBQUMsa0JBQWtCLENBQ3RDLFlBQVksRUFDWixTQUFTLENBQUMsSUFBSSxFQUNkLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUM3QyxDQUFDO0lBQ0osQ0FBQztJQUVELGNBQWMsQ0FBQyxpQkFBNEI7UUFDekMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFNBQVMsQ0FBQztZQUM5QixTQUFTLEVBQUUsaUNBQXlCO1lBQ3BDLEVBQUUsRUFBRSxrQkFBa0I7WUFDdEIsT0FBTyxFQUFFO2dCQUNQLEtBQUssRUFBRSxVQUFVO2dCQUNqQixZQUFZLEVBQUU7b0JBQ1osaUJBQWlCO2lCQUNsQjthQUNGO1NBQ0YsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELGlCQUFpQixDQUFDLGlCQUE0QjtRQUM1QyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsU0FBUyxDQUFDO1lBQzlCLFNBQVMsRUFBRSxvQ0FBNEI7WUFDdkMsRUFBRSxFQUFFLHNCQUFzQjtZQUMxQixPQUFPLEVBQUU7Z0JBQ1AsS0FBSyxFQUFFLFVBQVU7Z0JBQ2pCLFlBQVksRUFBRTtvQkFDWixpQkFBaUI7aUJBQ2xCO2FBQ0Y7U0FDRixDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQsZ0JBQWdCLENBQUMsaUJBQTRCO1FBQzNDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxTQUFTLENBQUM7WUFDOUIsU0FBUyxFQUFFLG1DQUEyQjtZQUN0QyxFQUFFLEVBQUUsb0JBQW9CO1lBQ3hCLE9BQU8sRUFBRTtnQkFDUCxLQUFLLEVBQUUsVUFBVTtnQkFDakIsWUFBWSxFQUFFO29CQUNaLGlCQUFpQjtpQkFDbEI7YUFDRjtTQUNGLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRCxtQkFBbUIsQ0FBQyxpQkFBNEI7UUFDOUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFNBQVMsQ0FBQztZQUM5QixTQUFTLEVBQUUsc0NBQThCO1lBQ3pDLEVBQUUsRUFBRSx3QkFBd0I7WUFDNUIsT0FBTyxFQUFFO2dCQUNQLEtBQUssRUFBRSxVQUFVO2dCQUNqQixZQUFZLEVBQUU7b0JBQ1osaUJBQWlCO2lCQUNsQjthQUNGO1NBQ0YsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELElBQUk7UUFDRixJQUFJLENBQUMsZ0JBQWdCLENBQUMsU0FBUyxDQUFDO1lBQzlCLFNBQVMsRUFBRSxzQ0FBOEI7WUFDekMsRUFBRSxFQUFFLGlCQUFpQjtZQUNyQixPQUFPLEVBQUU7Z0JBQ1AsS0FBSyxFQUFFLFVBQVU7YUFDbEI7U0FDRixDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQseUJBQXlCLENBQUMsTUFBYyxFQUFFLEdBQXdCO1FBQ2hFLE9BQU8sR0FBRyxDQUFDLEVBQUUsQ0FBQztJQUNoQixDQUFDO0NBQ0YsQ0FBQTtBQXBGWSxzQkFBc0I7SUFObEMsZ0JBQVMsQ0FBQztRQUNULFFBQVEsRUFBRSxxQkFBcUI7UUFDL0IsV0FBVyxFQUFFLGtDQUFrQztRQUMvQyxTQUFTLEVBQUUsQ0FBQyxrQ0FBa0MsQ0FBQztLQUNoRCxDQUFDO0dBRVcsc0JBQXNCLENBb0ZsQztBQXBGWSx3REFBc0IifQ==