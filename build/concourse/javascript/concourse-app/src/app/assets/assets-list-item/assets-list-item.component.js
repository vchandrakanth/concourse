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
const faPlusCircle_1 = require("@fortawesome/free-solid-svg-icons/faPlusCircle");
const faTrashAlt_1 = require("@fortawesome/free-solid-svg-icons/faTrashAlt");
const faUpload_1 = require("@fortawesome/free-solid-svg-icons/faUpload");
const modal_1 = require("@concourse/core/modal");
let AssetsListItemComponent = class AssetsListItemComponent {
    constructor(modalFacade, assetFacade, auditHistoryFacade, attributeTagFacade) {
        this.modalFacade = modalFacade;
        this.assetFacade = assetFacade;
        this.auditHistoryFacade = auditHistoryFacade;
        this.attributeTagFacade = attributeTagFacade;
        this.asset$ = this.assetFacade.asset$;
        this.auditHistory$ = this.auditHistoryFacade.auditHistory$;
        this.isLoaded$ = this.assetFacade.isLoaded$;
        this.isUpdating$ = this.assetFacade.isUpdating$;
        this.attributeTagsOptions$ = this.attributeTagFacade.list$;
        this.icons = { faEdit: faEdit_1.faEdit, faUpload: faUpload_1.faUpload, faPlusCircle: faPlusCircle_1.faPlusCircle, faTrashAlt: faTrashAlt_1.faTrashAlt };
    }
    create() {
        this.modalFacade.openModal({
            component: modal_1.EnclaveFormModalComponent,
            id: 'enclave-form'
        });
    }
    edit(asset) {
        this.modalFacade.openModal({
            component: modal_1.EnclaveFormModalComponent,
            id: 'enclave-form',
            options: {
                initialState: { enclave: asset }
            }
        });
    }
    delete(asset) {
        this.modalFacade.confirmDeleteModal('Enclave Model', asset.name, asset.assetType === 'enclave' ? () => this.assetFacade.deleteEnclaveModel(asset.id) : () => { });
    }
    deploy() {
        this.modalFacade.openModal({
            component: modal_1.DeployNodeComponent,
            id: 'deploy-form'
        });
    }
    showTemplate(cloudFormationTemplate, fileName, templateType) {
        this.modalFacade.templatePreviewModal(cloudFormationTemplate, fileName, templateType);
    }
};
AssetsListItemComponent = __decorate([
    core_1.Component({
        selector: 'app-assets-list-item',
        templateUrl: './assets-list-item.component.html',
        styleUrls: ['./assets-list-item.component.scss']
    })
], AssetsListItemComponent);
exports.AssetsListItemComponent = AssetsListItemComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXNzZXRzLWxpc3QtaXRlbS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9jb25jb3Vyc2UvamF2YXNjcmlwdC9jb25jb3Vyc2UtYXBwL3NyYy9hcHAvYXNzZXRzL2Fzc2V0cy1saXN0LWl0ZW0vYXNzZXRzLWxpc3QtaXRlbS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQSx3Q0FBMEM7QUFDMUMscUVBQWtFO0FBQ2xFLGlGQUE4RTtBQUM5RSw2RUFBMEU7QUFDMUUseUVBQXNFO0FBRXRFLGlEQUF1RjtBQVN2RixJQUFhLHVCQUF1QixHQUFwQyxNQUFhLHVCQUF1QjtJQVdsQyxZQUNtQixXQUE2QixFQUM3QixXQUF3QixFQUN4QixrQkFBc0MsRUFDdEMsa0JBQXNDO1FBSHRDLGdCQUFXLEdBQVgsV0FBVyxDQUFrQjtRQUM3QixnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQUN4Qix1QkFBa0IsR0FBbEIsa0JBQWtCLENBQW9CO1FBQ3RDLHVCQUFrQixHQUFsQixrQkFBa0IsQ0FBb0I7UUFkekQsV0FBTSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDO1FBQ2pDLGtCQUFhLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixDQUFDLGFBQWEsQ0FBQztRQUN0RCxjQUFTLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUM7UUFDdkMsZ0JBQVcsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLFdBQVcsQ0FBQztRQUMzQywwQkFBcUIsR0FBRyxJQUFJLENBQUMsa0JBQWtCLENBQUMsS0FBSyxDQUFDO1FBSTdDLFVBQUssR0FBRyxFQUFFLE1BQU0sRUFBTixlQUFNLEVBQUUsUUFBUSxFQUFSLG1CQUFRLEVBQUUsWUFBWSxFQUFaLDJCQUFZLEVBQUUsVUFBVSxFQUFWLHVCQUFVLEVBQUUsQ0FBQztJQVE1RCxDQUFDO0lBRUwsTUFBTTtRQUNKLElBQUksQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDO1lBQ3pCLFNBQVMsRUFBRSxpQ0FBeUI7WUFDcEMsRUFBRSxFQUFFLGNBQWM7U0FDbkIsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELElBQUksQ0FBQyxLQUFZO1FBQ2YsSUFBSSxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUM7WUFDekIsU0FBUyxFQUFFLGlDQUF5QjtZQUNwQyxFQUFFLEVBQUUsY0FBYztZQUNsQixPQUFPLEVBQUU7Z0JBQ1AsWUFBWSxFQUFFLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRTthQUNqQztTQUNGLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRCxNQUFNLENBQUMsS0FBWTtRQUNqQixJQUFJLENBQUMsV0FBVyxDQUFDLGtCQUFrQixDQUNqQyxlQUFlLEVBQ2YsS0FBSyxDQUFDLElBQUksRUFDVixLQUFLLENBQUMsU0FBUyxLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxrQkFBa0IsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FDaEcsQ0FBQztJQUNKLENBQUM7SUFFRCxNQUFNO1FBQ0osSUFBSSxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUM7WUFDekIsU0FBUyxFQUFFLDJCQUFtQjtZQUM5QixFQUFFLEVBQUUsYUFBYTtTQUNsQixDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQsWUFBWSxDQUFDLHNCQUE4QixFQUFFLFFBQWdCLEVBQUUsWUFBb0I7UUFDakYsSUFBSSxDQUFDLFdBQVcsQ0FBQyxvQkFBb0IsQ0FBQyxzQkFBc0IsRUFBRSxRQUFRLEVBQUUsWUFBWSxDQUFDLENBQUM7SUFDeEYsQ0FBQztDQUNGLENBQUE7QUF0RFksdUJBQXVCO0lBTG5DLGdCQUFTLENBQUM7UUFDVCxRQUFRLEVBQUUsc0JBQXNCO1FBQ2hDLFdBQVcsRUFBRSxtQ0FBbUM7UUFDaEQsU0FBUyxFQUFFLENBQUMsbUNBQW1DLENBQUM7S0FDakQsQ0FBQztHQUNXLHVCQUF1QixDQXNEbkM7QUF0RFksMERBQXVCIn0=