"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const faCircle_1 = require("@fortawesome/free-regular-svg-icons/faCircle");
const faEdit_1 = require("@fortawesome/free-solid-svg-icons/faEdit");
const faLink_1 = require("@fortawesome/free-solid-svg-icons/faLink");
const faPlusCircle_1 = require("@fortawesome/free-solid-svg-icons/faPlusCircle");
const faQuestion_1 = require("@fortawesome/free-solid-svg-icons/faQuestion");
const faSitemap_1 = require("@fortawesome/free-solid-svg-icons/faSitemap");
const faTrashAlt_1 = require("@fortawesome/free-solid-svg-icons/faTrashAlt");
const modal_1 = require("@concourse/core/modal");
const update_policy_group_v3_component_1 = require("@concourse/core/modal/components/update-policy-group-v3/update-policy-group-v3.component");
let ViewPolicyGroupComponent = class ViewPolicyGroupComponent {
    constructor(modalFacade, policyGroupFacade, auditHistoryFacade) {
        this.modalFacade = modalFacade;
        this.policyGroupFacade = policyGroupFacade;
        this.auditHistoryFacade = auditHistoryFacade;
        this.isLoaded$ = this.policyGroupFacade.isLoaded$;
        this.isUpdating$ = this.policyGroupFacade.isUpdating$;
        this.policyGroup$ = this.policyGroupFacade.selectedWithRelated$;
        this.auditHistory$ = this.auditHistoryFacade.auditHistory$;
        this.loadAuditHistory = false;
        this.icons = {
            faEdit: faEdit_1.faEdit,
            faPlusCircle: faPlusCircle_1.faPlusCircle,
            faSitemap: faSitemap_1.faSitemap,
            faTrashAlt: faTrashAlt_1.faTrashAlt,
            faCircle: faCircle_1.faCircle,
            faQuestion: faQuestion_1.faQuestion,
            faLink: faLink_1.faLink
        };
        this.tooltipConfig = [
            { label: 'Claims', prop: 'policyTemplate.claims' },
            { label: 'Proofs', prop: 'policyTemplate.proofs' }
        ];
    }
    delete(pg) {
        this.modalFacade.confirmDeleteModal('Policy Group', pg.name, () => this.policyGroupFacade.delete(pg));
    }
    editDetails() {
        this.modalFacade.openModal({
            component: modal_1.UpdatePolicyGroupMetadataComponent,
            id: 'update-policy-group-metadata'
        });
    }
    editPolicies() {
        this.modalFacade.openModal({
            component: modal_1.ModifyPolicyGroupComponent,
            id: 'modify-policy-group'
        });
    }
    editPoliciesV2(policyGroup) {
        this.modalFacade.openModal({
            component: modal_1.ModifyPolicyGroupV2Component,
            id: 'modify-policy-group',
            options: {
                class: 'modal-xl',
                initialState: {
                    policyGroup
                }
            }
        });
    }
    editPoliciesV3(policyGroup) {
        this.modalFacade.openModal({
            component: update_policy_group_v3_component_1.UpdatePolicyGroupV3Component,
            id: 'modify-policy-group',
            options: {
                class: 'modal-full',
                initialState: {
                    policyGroup
                }
            }
        });
    }
    editSurfaceLayers() {
        this.modalFacade.openModal({
            component: modal_1.ModifySurfaceLayersComponent,
            id: 'modify-policy-group-surfaceLayers'
        });
    }
    editAttributeTags() {
        this.modalFacade.openModal({
            component: modal_1.ModifyAttributeComponent,
            id: 'modify-policy-group-attribute-tags'
        });
    }
};
ViewPolicyGroupComponent = __decorate([
    core_1.Component({
        selector: 'app-view-policy-group',
        templateUrl: './view-policy-group.component.html',
        styleUrls: ['./view-policy-group.component.scss']
    })
], ViewPolicyGroupComponent);
exports.ViewPolicyGroupComponent = ViewPolicyGroupComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlldy1wb2xpY3ktZ3JvdXAuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vY29uY291cnNlL2phdmFzY3JpcHQvY29uY291cnNlLWFwcC9zcmMvYXBwL3BvbGljeS1ncm91cHMvdmlldy1wb2xpY3ktZ3JvdXAvdmlldy1wb2xpY3ktZ3JvdXAuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUEsd0NBQTBDO0FBQzFDLDJFQUF3RTtBQUN4RSxxRUFBa0U7QUFDbEUscUVBQWtFO0FBQ2xFLGlGQUE4RTtBQUM5RSw2RUFBMEU7QUFDMUUsMkVBQXdFO0FBQ3hFLDZFQUEwRTtBQUUxRSxpREFNK0I7QUFHL0IsK0lBQXdJO0FBT3hJLElBQWEsd0JBQXdCLEdBQXJDLE1BQWEsd0JBQXdCO0lBcUJuQyxZQUNtQixXQUE2QixFQUM3QixpQkFBb0MsRUFDcEMsa0JBQXNDO1FBRnRDLGdCQUFXLEdBQVgsV0FBVyxDQUFrQjtRQUM3QixzQkFBaUIsR0FBakIsaUJBQWlCLENBQW1CO1FBQ3BDLHVCQUFrQixHQUFsQixrQkFBa0IsQ0FBb0I7UUF2QnpELGNBQVMsR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUMsU0FBUyxDQUFDO1FBQzdDLGdCQUFXLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFdBQVcsQ0FBQztRQUNqRCxpQkFBWSxHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxvQkFBb0IsQ0FBQztRQUMzRCxrQkFBYSxHQUFHLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxhQUFhLENBQUM7UUFFdEQscUJBQWdCLEdBQUcsS0FBSyxDQUFDO1FBQ2hCLFVBQUssR0FBRztZQUNmLE1BQU0sRUFBTixlQUFNO1lBQ04sWUFBWSxFQUFaLDJCQUFZO1lBQ1osU0FBUyxFQUFULHFCQUFTO1lBQ1QsVUFBVSxFQUFWLHVCQUFVO1lBQ1YsUUFBUSxFQUFSLG1CQUFRO1lBQ1IsVUFBVSxFQUFWLHVCQUFVO1lBQ1YsTUFBTSxFQUFOLGVBQU07U0FDUCxDQUFDO1FBQ0Ysa0JBQWEsR0FBcUI7WUFDaEMsRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSx1QkFBdUIsRUFBRTtZQUNsRCxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLHVCQUF1QixFQUFFO1NBQ25ELENBQUM7SUFNRSxDQUFDO0lBRUwsTUFBTSxDQUFDLEVBQWU7UUFDcEIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxrQkFBa0IsQ0FBQyxjQUFjLEVBQUUsRUFBRSxDQUFDLElBQUksRUFBRSxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDeEcsQ0FBQztJQUVELFdBQVc7UUFDVCxJQUFJLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQztZQUN6QixTQUFTLEVBQUUsMENBQWtDO1lBQzdDLEVBQUUsRUFBRSw4QkFBOEI7U0FDbkMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELFlBQVk7UUFDVixJQUFJLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQztZQUN6QixTQUFTLEVBQUUsa0NBQTBCO1lBQ3JDLEVBQUUsRUFBRSxxQkFBcUI7U0FDMUIsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELGNBQWMsQ0FBQyxXQUF3QjtRQUNyQyxJQUFJLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQztZQUN6QixTQUFTLEVBQUUsb0NBQTRCO1lBQ3ZDLEVBQUUsRUFBRSxxQkFBcUI7WUFDekIsT0FBTyxFQUFFO2dCQUNQLEtBQUssRUFBRSxVQUFVO2dCQUNqQixZQUFZLEVBQUU7b0JBQ1osV0FBVztpQkFDWjthQUNGO1NBQ0YsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELGNBQWMsQ0FBQyxXQUF3QjtRQUNyQyxJQUFJLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQztZQUN6QixTQUFTLEVBQUUsK0RBQTRCO1lBQ3ZDLEVBQUUsRUFBRSxxQkFBcUI7WUFDekIsT0FBTyxFQUFFO2dCQUNQLEtBQUssRUFBRSxZQUFZO2dCQUNuQixZQUFZLEVBQUU7b0JBQ1osV0FBVztpQkFDWjthQUNGO1NBQ0YsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELGlCQUFpQjtRQUNmLElBQUksQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDO1lBQ3pCLFNBQVMsRUFBRSxvQ0FBNEI7WUFDdkMsRUFBRSxFQUFFLG1DQUFtQztTQUN4QyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQsaUJBQWlCO1FBQ2YsSUFBSSxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUM7WUFDekIsU0FBUyxFQUFFLGdDQUF3QjtZQUNuQyxFQUFFLEVBQUUsb0NBQW9DO1NBQ3pDLENBQUMsQ0FBQztJQUNMLENBQUM7Q0FDRixDQUFBO0FBcEZZLHdCQUF3QjtJQUxwQyxnQkFBUyxDQUFDO1FBQ1QsUUFBUSxFQUFFLHVCQUF1QjtRQUNqQyxXQUFXLEVBQUUsb0NBQW9DO1FBQ2pELFNBQVMsRUFBRSxDQUFDLG9DQUFvQyxDQUFDO0tBQ2xELENBQUM7R0FDVyx3QkFBd0IsQ0FvRnBDO0FBcEZZLDREQUF3QiJ9