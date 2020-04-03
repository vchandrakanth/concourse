"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const faFileDownload_1 = require("@fortawesome/free-solid-svg-icons/faFileDownload");
const faSync_1 = require("@fortawesome/free-solid-svg-icons/faSync");
const faTrashAlt_1 = require("@fortawesome/free-solid-svg-icons/faTrashAlt");
const modal_1 = require("@concourse/core/modal");
let DeploymentDetailsComponent = class DeploymentDetailsComponent {
    constructor(modalFacade, logicalDeploymentFacade) {
        this.modalFacade = modalFacade;
        this.logicalDeploymentFacade = logicalDeploymentFacade;
        this.isLoaded$ = this.logicalDeploymentFacade.isLoaded$;
        this.deploymentDetails$ = this.logicalDeploymentFacade.selectedWithRelated$;
        this.deploymentResources$ = this.logicalDeploymentFacade.resources$;
        this.selectedResource$ = this.logicalDeploymentFacade.selectedResource$;
        this.templateGenerating$ = this.logicalDeploymentFacade.templateGenerating$;
        this.icons = { faFileDownload: faFileDownload_1.faFileDownload, faTrashAlt: faTrashAlt_1.faTrashAlt, faSync: faSync_1.faSync };
    }
    delete(ld) {
        this.modalFacade.confirmDeleteModal('Logical Deployment', ld.name, () => this.logicalDeploymentFacade.delete(ld.id, ld.surfaceLayerId));
    }
    changeDeploymentVersion(currentModel) {
        this.modalFacade.openModal({
            component: modal_1.ChangeDeploymentVersionComponent,
            id: 'change-deployment-version',
            options: {
                initialState: {
                    currentModel
                }
            }
        });
    }
    onSelectAuditHistory(audit) {
        this.logicalDeploymentFacade.selectResourceAudit(audit);
    }
    generatePrivilegeTemplate(deployment, generateBy) {
        this.logicalDeploymentFacade.generatePrivilegeTemplate(deployment.id, deployment.surfaceLayerId, generateBy);
    }
};
DeploymentDetailsComponent = __decorate([
    core_1.Component({
        selector: 'app-logical-deployment-details',
        templateUrl: './deployment-details.component.html',
        styleUrls: ['./deployment-details.component.scss']
    })
], DeploymentDetailsComponent);
exports.DeploymentDetailsComponent = DeploymentDetailsComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVwbG95bWVudC1kZXRhaWxzLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL2NvbmNvdXJzZS9qYXZhc2NyaXB0L2NvbmNvdXJzZS1hcHAvc3JjL2FwcC93b3JrZmxvd3MvbG9naWNhbC1kZXBsb3ltZW50L2RlcGxveW1lbnQtZGV0YWlscy9kZXBsb3ltZW50LWRldGFpbHMuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUEsd0NBQTBDO0FBQzFDLHFGQUFrRjtBQUNsRixxRUFBa0U7QUFDbEUsNkVBQTBFO0FBRTFFLGlEQUF5RTtBQVN6RSxJQUFhLDBCQUEwQixHQUF2QyxNQUFhLDBCQUEwQjtJQVNyQyxZQUNtQixXQUE2QixFQUM3Qix1QkFBZ0Q7UUFEaEQsZ0JBQVcsR0FBWCxXQUFXLENBQWtCO1FBQzdCLDRCQUF1QixHQUF2Qix1QkFBdUIsQ0FBeUI7UUFWbkUsY0FBUyxHQUFHLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxTQUFTLENBQUM7UUFDbkQsdUJBQWtCLEdBQUcsSUFBSSxDQUFDLHVCQUF1QixDQUFDLG9CQUFvQixDQUFDO1FBQ3ZFLHlCQUFvQixHQUFHLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxVQUFVLENBQUM7UUFDL0Qsc0JBQWlCLEdBQUcsSUFBSSxDQUFDLHVCQUF1QixDQUFDLGlCQUFpQixDQUFDO1FBQ25FLHdCQUFtQixHQUFHLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxtQkFBbUIsQ0FBQztRQUU5RCxVQUFLLEdBQUcsRUFBRSxjQUFjLEVBQWQsK0JBQWMsRUFBRSxVQUFVLEVBQVYsdUJBQVUsRUFBRSxNQUFNLEVBQU4sZUFBTSxFQUFFLENBQUM7SUFLcEQsQ0FBQztJQUVMLE1BQU0sQ0FBQyxFQUFxQjtRQUMxQixJQUFJLENBQUMsV0FBVyxDQUFDLGtCQUFrQixDQUNqQyxvQkFBb0IsRUFDcEIsRUFBRSxDQUFDLElBQUksRUFDUCxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsdUJBQXVCLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLGNBQWMsQ0FBQyxDQUNwRSxDQUFDO0lBQ0osQ0FBQztJQUVELHVCQUF1QixDQUFDLFlBQXFCO1FBQzNDLElBQUksQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDO1lBQ3pCLFNBQVMsRUFBRSx3Q0FBZ0M7WUFDM0MsRUFBRSxFQUFFLDJCQUEyQjtZQUMvQixPQUFPLEVBQUU7Z0JBQ1AsWUFBWSxFQUFFO29CQUNaLFlBQVk7aUJBQ2I7YUFDRjtTQUNGLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRCxvQkFBb0IsQ0FBQyxLQUFLO1FBQ3hCLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxtQkFBbUIsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUMxRCxDQUFDO0lBRUQseUJBQXlCLENBQUMsVUFBNkIsRUFBRSxVQUFrQjtRQUN6RSxJQUFJLENBQUMsdUJBQXVCLENBQUMseUJBQXlCLENBQUMsVUFBVSxDQUFDLEVBQUUsRUFBRSxVQUFVLENBQUMsY0FBYyxFQUFFLFVBQVUsQ0FBQyxDQUFDO0lBQy9HLENBQUM7Q0FFRixDQUFBO0FBMUNZLDBCQUEwQjtJQUx0QyxnQkFBUyxDQUFDO1FBQ1QsUUFBUSxFQUFFLGdDQUFnQztRQUMxQyxXQUFXLEVBQUUscUNBQXFDO1FBQ2xELFNBQVMsRUFBRSxDQUFDLHFDQUFxQyxDQUFDO0tBQ25ELENBQUM7R0FDVywwQkFBMEIsQ0EwQ3RDO0FBMUNZLGdFQUEwQiJ9