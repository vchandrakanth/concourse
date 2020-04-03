"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const faArrowRight_1 = require("@fortawesome/free-solid-svg-icons/faArrowRight");
const faBalanceScale_1 = require("@fortawesome/free-solid-svg-icons/faBalanceScale");
const faBook_1 = require("@fortawesome/free-solid-svg-icons/faBook");
const faBookOpen_1 = require("@fortawesome/free-solid-svg-icons/faBookOpen");
const faBuilding_1 = require("@fortawesome/free-solid-svg-icons/faBuilding");
const faChartLine_1 = require("@fortawesome/free-solid-svg-icons/faChartLine");
const faColumns_1 = require("@fortawesome/free-solid-svg-icons/faColumns");
const faDatabase_1 = require("@fortawesome/free-solid-svg-icons/faDatabase");
const faExclamationTriangle_1 = require("@fortawesome/free-solid-svg-icons/faExclamationTriangle");
const faPencilRuler_1 = require("@fortawesome/free-solid-svg-icons/faPencilRuler");
const faPlus_1 = require("@fortawesome/free-solid-svg-icons/faPlus");
const faSearch_1 = require("@fortawesome/free-solid-svg-icons/faSearch");
const faServer_1 = require("@fortawesome/free-solid-svg-icons/faServer");
const faTags_1 = require("@fortawesome/free-solid-svg-icons/faTags");
const faThumbsUp_1 = require("@fortawesome/free-solid-svg-icons/faThumbsUp");
const faUserAlt_1 = require("@fortawesome/free-solid-svg-icons/faUserAlt");
const faUsers_1 = require("@fortawesome/free-solid-svg-icons/faUsers");
const modal_1 = require("@concourse/core/modal");
let DashboardQuicklaunchComponent = class DashboardQuicklaunchComponent {
    constructor(modalFacade, surfaceFacade, userFacade, assetFacade, policyGroupFacade, roleFacade) {
        this.modalFacade = modalFacade;
        this.surfaceFacade = surfaceFacade;
        this.userFacade = userFacade;
        this.assetFacade = assetFacade;
        this.policyGroupFacade = policyGroupFacade;
        this.roleFacade = roleFacade;
        this.icons = {
            faPlus: faPlus_1.faPlus,
            faBalanceScale: faBalanceScale_1.faBalanceScale,
            faColumns: faColumns_1.faColumns,
            faTags: faTags_1.faTags,
            faBook: faBook_1.faBook,
            faBookOpen: faBookOpen_1.faBookOpen,
            faThumbsUp: faThumbsUp_1.faThumbsUp,
            faExclamationTriangle: faExclamationTriangle_1.faExclamationTriangle,
            faUserAlt: faUserAlt_1.faUserAlt,
            faUsers: faUsers_1.faUsers,
            faSearch: faSearch_1.faSearch,
            faDatabase: faDatabase_1.faDatabase,
            faBuilding: faBuilding_1.faBuilding,
            faChartLine: faChartLine_1.faChartLine,
            faServer: faServer_1.faServer,
            faArrowRight: faArrowRight_1.faArrowRight,
            faPencilRuler: faPencilRuler_1.faPencilRuler
        };
        this.authenticatedUser$ = this.userFacade.authenticatedUser$;
        this.assetOwningGroup$ = this.assetFacade.selectableOwningGroups$;
        this.selectedSurfaceId$ = this.surfaceFacade.selectedId$;
        this.policyOwningGroup$ = this.policyGroupFacade.selectableOwningGroups$;
        this.responsibilityById$ = this.roleFacade.responsibilityById$;
    }
    onCreateAsset() {
        this.modalFacade.openModal({ component: modal_1.EnclaveFormModalComponent, id: 'enclave-form' });
    }
    onCreateAttribute() {
        this.modalFacade.openModal({
            component: modal_1.CreateAttributeTagComponent,
            id: 'create-attribute-tag'
        });
    }
    onCreatePolicyGroupTemplate() {
        this.modalFacade.openModal({
            component: modal_1.CreatePolicyGroupTemplateComponent,
            id: 'create-policy-group-template'
        });
    }
    onCreatePolicyGroup() {
        this.modalFacade.openModal({
            component: modal_1.CreatePolicyGroupV2Component,
            id: 'create-policy-group',
            options: {
                class: 'modal-xxl'
            }
        });
    }
    onCreateGroup() {
        this.modalFacade.openModal({
            component: modal_1.CreateGroupComponent,
            id: 'new-group'
        });
    }
    onCreateUser() {
        this.modalFacade.openModal({
            component: modal_1.InviteUserComponent,
            id: 'invite-user'
        });
    }
};
DashboardQuicklaunchComponent = __decorate([
    core_1.Component({
        selector: 'app-dashboard-quicklaunch',
        templateUrl: './dashboard-quicklaunch.component.html',
        styleUrls: ['./dashboard-quicklaunch.component.scss']
    })
], DashboardQuicklaunchComponent);
exports.DashboardQuicklaunchComponent = DashboardQuicklaunchComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGFzaGJvYXJkLXF1aWNrbGF1bmNoLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL2NvbmNvdXJzZS9qYXZhc2NyaXB0L2NvbmNvdXJzZS1hcHAvc3JjL2FwcC9kYXNoYm9hcmQvZGFzaGJvYXJkLXF1aWNrbGF1bmNoL2Rhc2hib2FyZC1xdWlja2xhdW5jaC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQSx3Q0FBMEM7QUFDMUMsaUZBQThFO0FBQzlFLHFGQUFrRjtBQUNsRixxRUFBa0U7QUFDbEUsNkVBQTBFO0FBQzFFLDZFQUEwRTtBQUMxRSwrRUFBNEU7QUFDNUUsMkVBQXdFO0FBQ3hFLDZFQUEwRTtBQUMxRSxtR0FBZ0c7QUFDaEcsbUZBQWdGO0FBQ2hGLHFFQUFrRTtBQUNsRSx5RUFBc0U7QUFDdEUseUVBQXNFO0FBQ3RFLHFFQUFrRTtBQUNsRSw2RUFBMEU7QUFDMUUsMkVBQXdFO0FBQ3hFLHVFQUFvRTtBQUVwRSxpREFPK0I7QUFlL0IsSUFBYSw2QkFBNkIsR0FBMUMsTUFBYSw2QkFBNkI7SUEyQnhDLFlBQ21CLFdBQTZCLEVBQzdCLGFBQTRCLEVBQzVCLFVBQXNCLEVBQ3RCLFdBQXdCLEVBQ3hCLGlCQUFvQyxFQUNwQyxVQUFzQjtRQUx0QixnQkFBVyxHQUFYLFdBQVcsQ0FBa0I7UUFDN0Isa0JBQWEsR0FBYixhQUFhLENBQWU7UUFDNUIsZUFBVSxHQUFWLFVBQVUsQ0FBWTtRQUN0QixnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQUN4QixzQkFBaUIsR0FBakIsaUJBQWlCLENBQW1CO1FBQ3BDLGVBQVUsR0FBVixVQUFVLENBQVk7UUFoQ2hDLFVBQUssR0FBRztZQUNmLE1BQU0sRUFBTixlQUFNO1lBQ04sY0FBYyxFQUFkLCtCQUFjO1lBQ2QsU0FBUyxFQUFULHFCQUFTO1lBQ1QsTUFBTSxFQUFOLGVBQU07WUFDTixNQUFNLEVBQU4sZUFBTTtZQUNOLFVBQVUsRUFBVix1QkFBVTtZQUNWLFVBQVUsRUFBVix1QkFBVTtZQUNWLHFCQUFxQixFQUFyQiw2Q0FBcUI7WUFDckIsU0FBUyxFQUFULHFCQUFTO1lBQ1QsT0FBTyxFQUFQLGlCQUFPO1lBQ1AsUUFBUSxFQUFSLG1CQUFRO1lBQ1IsVUFBVSxFQUFWLHVCQUFVO1lBQ1YsVUFBVSxFQUFWLHVCQUFVO1lBQ1YsV0FBVyxFQUFYLHlCQUFXO1lBQ1gsUUFBUSxFQUFSLG1CQUFRO1lBQ1IsWUFBWSxFQUFaLDJCQUFZO1lBQ1osYUFBYSxFQUFiLDZCQUFhO1NBQ2QsQ0FBQztRQUVGLHVCQUFrQixHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsa0JBQWtCLENBQUM7UUFDeEQsc0JBQWlCLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyx1QkFBdUIsQ0FBQztRQUM3RCx1QkFBa0IsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLFdBQVcsQ0FBQztRQUNwRCx1QkFBa0IsR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUMsdUJBQXVCLENBQUM7UUFDcEUsd0JBQW1CLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxtQkFBbUIsQ0FBQztJQVN0RCxDQUFDO0lBRUwsYUFBYTtRQUNYLElBQUksQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLEVBQUUsU0FBUyxFQUFFLGlDQUF5QixFQUFFLEVBQUUsRUFBRSxjQUFjLEVBQUUsQ0FBQyxDQUFDO0lBQzNGLENBQUM7SUFFRCxpQkFBaUI7UUFDZixJQUFJLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQztZQUN6QixTQUFTLEVBQUUsbUNBQTJCO1lBQ3RDLEVBQUUsRUFBRSxzQkFBc0I7U0FDM0IsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELDJCQUEyQjtRQUN6QixJQUFJLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQztZQUN6QixTQUFTLEVBQUUsMENBQWtDO1lBQzdDLEVBQUUsRUFBRSw4QkFBOEI7U0FDbkMsQ0FBQyxDQUFDO0lBRUwsQ0FBQztJQUVELG1CQUFtQjtRQUNqQixJQUFJLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQztZQUN6QixTQUFTLEVBQUUsb0NBQTRCO1lBQ3ZDLEVBQUUsRUFBRSxxQkFBcUI7WUFDekIsT0FBTyxFQUFFO2dCQUNQLEtBQUssRUFBRSxXQUFXO2FBQ25CO1NBQ0YsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELGFBQWE7UUFDWCxJQUFJLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQztZQUN6QixTQUFTLEVBQUUsNEJBQW9CO1lBQy9CLEVBQUUsRUFBRSxXQUFXO1NBQ2hCLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRCxZQUFZO1FBQ1YsSUFBSSxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUM7WUFDekIsU0FBUyxFQUFFLDJCQUFtQjtZQUM5QixFQUFFLEVBQUUsYUFBYTtTQUNsQixDQUFDLENBQUM7SUFDTCxDQUFDO0NBQ0YsQ0FBQTtBQTlFWSw2QkFBNkI7SUFMekMsZ0JBQVMsQ0FBQztRQUNULFFBQVEsRUFBRSwyQkFBMkI7UUFDckMsV0FBVyxFQUFFLHdDQUF3QztRQUNyRCxTQUFTLEVBQUUsQ0FBQyx3Q0FBd0MsQ0FBQztLQUN0RCxDQUFDO0dBQ1csNkJBQTZCLENBOEV6QztBQTlFWSxzRUFBNkIifQ==