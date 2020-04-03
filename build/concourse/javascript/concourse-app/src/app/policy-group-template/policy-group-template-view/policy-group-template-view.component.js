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
let PolicyGroupTemplateViewComponent = class PolicyGroupTemplateViewComponent {
    constructor(modalFacade, policyGroupTemplateFacade, auditHistoryFacade) {
        this.modalFacade = modalFacade;
        this.policyGroupTemplateFacade = policyGroupTemplateFacade;
        this.auditHistoryFacade = auditHistoryFacade;
        this.policyGroupTemplate$ = this.policyGroupTemplateFacade.selectedWithRelated$;
        this.auditHistory$ = this.auditHistoryFacade.auditHistory$;
        this.isUpdated$ = this.policyGroupTemplateFacade.isUpdating$;
        this.icons = { faEdit: faEdit_1.faEdit, faTrashAlt: faTrashAlt_1.faTrashAlt };
        this.tooltipConfig = [
            { label: 'Claims', prop: 'claims' },
            { label: 'Proofs', prop: 'proofs' }
        ];
    }
    delete(pgt) {
        this.modalFacade.confirmDeleteModal('Policy Group Template', pgt.name, () => this.policyGroupTemplateFacade.delete(pgt));
    }
    editPolicyTemplates() {
        this.modalFacade.openModal({
            component: modal_1.ModifyPolicyTemplatesComponent,
            id: 'modify-policy-templates'
        });
    }
    edit() {
        this.modalFacade.openModal({
            component: modal_1.EditPolicyGroupTemplateComponent,
            id: 'edit-policy-group-template'
        });
    }
};
PolicyGroupTemplateViewComponent = __decorate([
    core_1.Component({
        selector: 'app-policy-group-template-view',
        templateUrl: './policy-group-template-view.component.html',
        styleUrls: ['./policy-group-template-view.component.scss']
    })
], PolicyGroupTemplateViewComponent);
exports.PolicyGroupTemplateViewComponent = PolicyGroupTemplateViewComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9saWN5LWdyb3VwLXRlbXBsYXRlLXZpZXcuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vY29uY291cnNlL2phdmFzY3JpcHQvY29uY291cnNlLWFwcC9zcmMvYXBwL3BvbGljeS1ncm91cC10ZW1wbGF0ZS9wb2xpY3ktZ3JvdXAtdGVtcGxhdGUtdmlldy9wb2xpY3ktZ3JvdXAtdGVtcGxhdGUtdmlldy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQSx3Q0FBMEM7QUFDMUMscUVBQWtFO0FBQ2xFLDZFQUEwRTtBQUUxRSxpREFBeUc7QUFTekcsSUFBYSxnQ0FBZ0MsR0FBN0MsTUFBYSxnQ0FBZ0M7SUFXM0MsWUFDbUIsV0FBNkIsRUFDN0IseUJBQW9ELEVBQ3BELGtCQUFzQztRQUZ0QyxnQkFBVyxHQUFYLFdBQVcsQ0FBa0I7UUFDN0IsOEJBQXlCLEdBQXpCLHlCQUF5QixDQUEyQjtRQUNwRCx1QkFBa0IsR0FBbEIsa0JBQWtCLENBQW9CO1FBYnpELHlCQUFvQixHQUFHLElBQUksQ0FBQyx5QkFBeUIsQ0FBQyxvQkFBb0IsQ0FBQztRQUMzRSxrQkFBYSxHQUFHLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxhQUFhLENBQUM7UUFDdEQsZUFBVSxHQUFHLElBQUksQ0FBQyx5QkFBeUIsQ0FBQyxXQUFXLENBQUM7UUFDL0MsVUFBSyxHQUFHLEVBQUUsTUFBTSxFQUFOLGVBQU0sRUFBRSxVQUFVLEVBQVYsdUJBQVUsRUFBRSxDQUFDO1FBRXhDLGtCQUFhLEdBQXFCO1lBQ2hDLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFO1lBQ25DLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFO1NBQ3BDLENBQUM7SUFNRSxDQUFDO0lBRUwsTUFBTSxDQUFDLEdBQXdCO1FBQzdCLElBQUksQ0FBQyxXQUFXLENBQUMsa0JBQWtCLENBQ2pDLHVCQUF1QixFQUN2QixHQUFHLENBQUMsSUFBSSxFQUNSLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyx5QkFBeUIsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQ2pELENBQUM7SUFDSixDQUFDO0lBRUQsbUJBQW1CO1FBQ2pCLElBQUksQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDO1lBQ3pCLFNBQVMsRUFBRSxzQ0FBOEI7WUFDekMsRUFBRSxFQUFFLHlCQUF5QjtTQUM5QixDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQsSUFBSTtRQUNGLElBQUksQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDO1lBQ3pCLFNBQVMsRUFBRSx3Q0FBZ0M7WUFDM0MsRUFBRSxFQUFFLDRCQUE0QjtTQUNqQyxDQUFDLENBQUM7SUFDTCxDQUFDO0NBRUYsQ0FBQTtBQXZDWSxnQ0FBZ0M7SUFMNUMsZ0JBQVMsQ0FBQztRQUNULFFBQVEsRUFBRSxnQ0FBZ0M7UUFDMUMsV0FBVyxFQUFFLDZDQUE2QztRQUMxRCxTQUFTLEVBQUUsQ0FBQyw2Q0FBNkMsQ0FBQztLQUMzRCxDQUFDO0dBQ1csZ0NBQWdDLENBdUM1QztBQXZDWSw0RUFBZ0MifQ==