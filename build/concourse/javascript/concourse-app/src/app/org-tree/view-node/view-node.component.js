"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const faAws_1 = require("@fortawesome/free-brands-svg-icons/faAws");
const faDatabase_1 = require("@fortawesome/free-solid-svg-icons/faDatabase");
const faEdit_1 = require("@fortawesome/free-solid-svg-icons/faEdit");
const faFilePdf_1 = require("@fortawesome/free-solid-svg-icons/faFilePdf");
const faPlus_1 = require("@fortawesome/free-solid-svg-icons/faPlus");
const faMinus_1 = require("@fortawesome/free-solid-svg-icons/faMinus");
const faTimes_1 = require("@fortawesome/free-solid-svg-icons/faTimes");
const faTrashAlt_1 = require("@fortawesome/free-solid-svg-icons/faTrashAlt");
const modal_1 = require("@concourse/core/modal");
let ViewNodeComponent = class ViewNodeComponent {
    constructor(modalFacade, surfaceLayerFacade, reportingFacade) {
        this.modalFacade = modalFacade;
        this.surfaceLayerFacade = surfaceLayerFacade;
        this.reportingFacade = reportingFacade;
        this.selectedSurfaceLayer$ = this.surfaceLayerFacade.selectedWithRelated$;
        this.isUpdating$ = this.surfaceLayerFacade.isUpdating$;
        this.icons = { faAws: faAws_1.faAws, faEdit: faEdit_1.faEdit, faMinus: faMinus_1.faMinus, faPlus: faPlus_1.faPlus, faTimes: faTimes_1.faTimes, faTrashAlt: faTrashAlt_1.faTrashAlt, faFilePdf: faFilePdf_1.faFilePdf, faDatabase: faDatabase_1.faDatabase };
    }
    closeSidebar() {
        this.surfaceLayerFacade.select(undefined);
    }
    toggleEdit() {
        this.modalFacade.openModal({
            component: modal_1.EditNodeComponent,
            id: 'edit-org-node'
        });
    }
    manageData(surfaceLayer) {
        this.modalFacade.openModal({
            component: modal_1.ManageKeyValueDataComponent,
            id: 'manage-surface-data',
            options: {
                initialState: {
                    dataDomain: 'SURFACE_LAYER',
                    surfaceId: surfaceLayer.surfaceId,
                    surfaceLayerId: surfaceLayer.id
                }
            }
        });
    }
    associateAWSAccounts() {
        this.modalFacade.openModal({
            component: modal_1.AssociateSurfaceLayersComponent,
            id: 'associate-aws-accounts',
            options: {
                initialState: {}
            }
        });
    }
    removeAWSAccounts(surfaceLayer) {
        this.modalFacade.openModal({
            component: modal_1.DisableAwsAccountsComponent,
            id: 'remove-aws-accounts',
            options: {
                initialState: {
                    data: {
                        surfaceId: surfaceLayer.surfaceId,
                        surfaceLayerId: surfaceLayer.id,
                        awsAccounts: surfaceLayer.awsAccounts
                    }
                }
            }
        });
    }
    generateReports(surfaceLayer) {
        this.reportingFacade.generateSurfaceLayerReport(surfaceLayer.id);
    }
    removeSurfaceLayer(surfaceLayer) {
        this.modalFacade.confirmDeleteModal('SurfaceLayer Node', surfaceLayer.name, () => this.surfaceLayerFacade.remove(surfaceLayer));
    }
};
ViewNodeComponent = __decorate([
    core_1.Component({
        selector: 'app-view-node',
        templateUrl: './view-node.component.html',
        styleUrls: ['./view-node.component.scss']
    })
], ViewNodeComponent);
exports.ViewNodeComponent = ViewNodeComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlldy1ub2RlLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL2NvbmNvdXJzZS9qYXZhc2NyaXB0L2NvbmNvdXJzZS1hcHAvc3JjL2FwcC9vcmctdHJlZS92aWV3LW5vZGUvdmlldy1ub2RlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBLHdDQUEwQztBQUMxQyxvRUFBaUU7QUFDakUsNkVBQTBFO0FBQzFFLHFFQUFrRTtBQUNsRSwyRUFBd0U7QUFDeEUscUVBQWtFO0FBQ2xFLHVFQUFvRTtBQUNwRSx1RUFBb0U7QUFDcEUsNkVBQTBFO0FBRTFFLGlEQUFxSjtBQVNySixJQUFhLGlCQUFpQixHQUE5QixNQUFhLGlCQUFpQjtJQU01QixZQUNtQixXQUE2QixFQUM3QixrQkFBc0MsRUFDdEMsZUFBZ0M7UUFGaEMsZ0JBQVcsR0FBWCxXQUFXLENBQWtCO1FBQzdCLHVCQUFrQixHQUFsQixrQkFBa0IsQ0FBb0I7UUFDdEMsb0JBQWUsR0FBZixlQUFlLENBQWlCO1FBUm5ELDBCQUFxQixHQUFHLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxvQkFBb0IsQ0FBQztRQUNyRSxnQkFBVyxHQUFHLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxXQUFXLENBQUM7UUFFekMsVUFBSyxHQUFHLEVBQUUsS0FBSyxFQUFMLGFBQUssRUFBRSxNQUFNLEVBQU4sZUFBTSxFQUFFLE9BQU8sRUFBUCxpQkFBTyxFQUFFLE1BQU0sRUFBTixlQUFNLEVBQUUsT0FBTyxFQUFQLGlCQUFPLEVBQUUsVUFBVSxFQUFWLHVCQUFVLEVBQUUsU0FBUyxFQUFULHFCQUFTLEVBQUUsVUFBVSxFQUFWLHVCQUFVLEVBQUUsQ0FBQztJQU01RixDQUFDO0lBRUwsWUFBWTtRQUNWLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDNUMsQ0FBQztJQUVELFVBQVU7UUFDUixJQUFJLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQztZQUN6QixTQUFTLEVBQUUseUJBQWlCO1lBQzVCLEVBQUUsRUFBRSxlQUFlO1NBQ3BCLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRCxVQUFVLENBQUMsWUFBMEI7UUFDbkMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUM7WUFDekIsU0FBUyxFQUFFLG1DQUEyQjtZQUN0QyxFQUFFLEVBQUUscUJBQXFCO1lBQ3pCLE9BQU8sRUFBRTtnQkFDUCxZQUFZLEVBQUU7b0JBQ1osVUFBVSxFQUFFLGVBQWU7b0JBQzNCLFNBQVMsRUFBRSxZQUFZLENBQUMsU0FBUztvQkFDakMsY0FBYyxFQUFFLFlBQVksQ0FBQyxFQUFFO2lCQUNoQzthQUNGO1NBQ0YsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELG9CQUFvQjtRQUNsQixJQUFJLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQztZQUN6QixTQUFTLEVBQUUsdUNBQStCO1lBQzFDLEVBQUUsRUFBRSx3QkFBd0I7WUFDNUIsT0FBTyxFQUFFO2dCQUNQLFlBQVksRUFBRSxFQUNiO2FBQ0Y7U0FDRixDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQsaUJBQWlCLENBQUMsWUFBMEI7UUFDMUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUM7WUFDekIsU0FBUyxFQUFFLG1DQUEyQjtZQUN0QyxFQUFFLEVBQUUscUJBQXFCO1lBQ3pCLE9BQU8sRUFBRTtnQkFDUCxZQUFZLEVBQUU7b0JBQ1osSUFBSSxFQUFFO3dCQUNKLFNBQVMsRUFBRSxZQUFZLENBQUMsU0FBUzt3QkFDakMsY0FBYyxFQUFFLFlBQVksQ0FBQyxFQUFFO3dCQUMvQixXQUFXLEVBQUUsWUFBWSxDQUFDLFdBQVc7cUJBQ3RDO2lCQUNGO2FBQ0Y7U0FDRixDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQsZUFBZSxDQUFDLFlBQTBCO1FBQ3hDLElBQUksQ0FBQyxlQUFlLENBQUMsMEJBQTBCLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ25FLENBQUM7SUFFRCxrQkFBa0IsQ0FBQyxZQUEwQjtRQUMzQyxJQUFJLENBQUMsV0FBVyxDQUFDLGtCQUFrQixDQUFDLG1CQUFtQixFQUFFLFlBQVksQ0FBQyxJQUFJLEVBQUUsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDO0lBQ2xJLENBQUM7Q0FDRixDQUFBO0FBdkVZLGlCQUFpQjtJQUw3QixnQkFBUyxDQUFDO1FBQ1QsUUFBUSxFQUFFLGVBQWU7UUFDekIsV0FBVyxFQUFFLDRCQUE0QjtRQUN6QyxTQUFTLEVBQUUsQ0FBQyw0QkFBNEIsQ0FBQztLQUMxQyxDQUFDO0dBQ1csaUJBQWlCLENBdUU3QjtBQXZFWSw4Q0FBaUIifQ==