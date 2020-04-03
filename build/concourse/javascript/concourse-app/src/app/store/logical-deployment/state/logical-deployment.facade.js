"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const store_1 = require("@ngrx/store");
const selectors_1 = require("@concourse/store/selectors");
const logical_deployment_actions_1 = require("./logical-deployment.actions");
const query = require("./logical-deployment.selectors");
let LogicalDeploymentFacade = class LogicalDeploymentFacade {
    constructor(store) {
        this.store = store;
        this.listWithRelated$ = this.store.pipe(store_1.select(selectors_1.getLogicalDeploymentsWithRelated));
        this.list$ = this.store.pipe(store_1.select(query.getAll));
        this.selectedWithRelated$ = this.store.pipe(store_1.select(selectors_1.getSelectedLogicalDeploymentWithRelated));
        this.resources$ = this.store.pipe(store_1.select(query.getResources));
        this.selectedResource$ = this.store.pipe(store_1.select(query.getSelectedResource));
        this.isLoaded$ = this.store.pipe(store_1.select(query.getIsLoaded));
        this.isUpdating$ = this.store.pipe(store_1.select(query.getIsUpdating));
        this.formPending$ = this.store.pipe(store_1.select(query.getFormPending));
        this.templateGenerating$ = this.store.pipe(store_1.select(query.getTemplateGenerating));
    }
    selectResourceAudit(audit) {
        this.store.dispatch(new logical_deployment_actions_1.SelectResourceAuditData(audit));
    }
    getAllBySurfaceLayerId(surfaceLayerIds) {
        this.store.dispatch(new logical_deployment_actions_1.LoadLogicalDeploymentsBySurfaceLayerId(surfaceLayerIds));
    }
    generatePrivilegeTemplate(deploymentId, surfaceLayerId, generateBy) {
        this.store.dispatch(new logical_deployment_actions_1.GeneratePrivilegeTemplate({ deploymentId, surfaceLayerId, generateBy }));
    }
    create(deploymentData) {
        this.store.dispatch(new logical_deployment_actions_1.CreateLogicalDeployment(deploymentData));
    }
    updateModelVersion(ld) {
        this.store.dispatch(new logical_deployment_actions_1.UpdateModelVersion(ld));
    }
    delete(deploymentId, surfaceLayerId) {
        this.store.dispatch(new logical_deployment_actions_1.DeleteLogicalDeployment({ deploymentId, surfaceLayerId }));
    }
    search(searchText) {
        this.store.dispatch(new logical_deployment_actions_1.SearchLogicalDeployments(searchText));
    }
    resetSearch() {
        this.store.dispatch(new logical_deployment_actions_1.ResetLogicalDeploymentsSearch());
    }
};
LogicalDeploymentFacade = __decorate([
    core_1.Injectable()
], LogicalDeploymentFacade);
exports.LogicalDeploymentFacade = LogicalDeploymentFacade;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9naWNhbC1kZXBsb3ltZW50LmZhY2FkZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL2NvbmNvdXJzZS9qYXZhc2NyaXB0L2NvbmNvdXJzZS1hcHAvc3JjL2FwcC9zdG9yZS9sb2dpY2FsLWRlcGxveW1lbnQvc3RhdGUvbG9naWNhbC1kZXBsb3ltZW50LmZhY2FkZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBLHdDQUEyQztBQUMzQyx1Q0FBNEM7QUFHNUMsMERBR29DO0FBQ3BDLDZFQVNzQztBQUV0Qyx3REFBd0Q7QUFHeEQsSUFBYSx1QkFBdUIsR0FBcEMsTUFBYSx1QkFBdUI7SUFXbEMsWUFBNkIsS0FBbUI7UUFBbkIsVUFBSyxHQUFMLEtBQUssQ0FBYztRQVZoRCxxQkFBZ0IsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxjQUFNLENBQUMsNENBQWdDLENBQUMsQ0FBQyxDQUFDO1FBQzdFLFVBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxjQUFNLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7UUFDOUMseUJBQW9CLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsY0FBTSxDQUFDLG1EQUF1QyxDQUFDLENBQUMsQ0FBQztRQUN4RixlQUFVLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsY0FBTSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDO1FBQ3pELHNCQUFpQixHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLGNBQU0sQ0FBQyxLQUFLLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxDQUFDO1FBQ3ZFLGNBQVMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxjQUFNLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7UUFDdkQsZ0JBQVcsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxjQUFNLENBQUMsS0FBSyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUM7UUFDM0QsaUJBQVksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxjQUFNLENBQUMsS0FBSyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUM7UUFDN0Qsd0JBQW1CLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsY0FBTSxDQUFDLEtBQUssQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDLENBQUM7SUFFdkIsQ0FBQztJQUVyRCxtQkFBbUIsQ0FBQyxLQUFLO1FBQ3ZCLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLElBQUksb0RBQXVCLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztJQUMxRCxDQUFDO0lBRUQsc0JBQXNCLENBQUMsZUFBeUI7UUFDOUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsSUFBSSxtRUFBc0MsQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDO0lBQ25GLENBQUM7SUFFRCx5QkFBeUIsQ0FBQyxZQUFvQixFQUFFLGNBQXNCLEVBQUUsVUFBa0I7UUFDeEYsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsSUFBSSxzREFBeUIsQ0FBQyxFQUFFLFlBQVksRUFBRSxjQUFjLEVBQUUsVUFBVSxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQ25HLENBQUM7SUFFRCxNQUFNLENBQUMsY0FBMEM7UUFDL0MsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsSUFBSSxvREFBdUIsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDO0lBQ25FLENBQUM7SUFDRCxrQkFBa0IsQ0FBQyxFQUFxQjtRQUN0QyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxJQUFJLCtDQUFrQixDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDbEQsQ0FBQztJQUNELE1BQU0sQ0FBQyxZQUFvQixFQUFFLGNBQXNCO1FBQ2pELElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLElBQUksb0RBQXVCLENBQUMsRUFBRSxZQUFZLEVBQUUsY0FBYyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQ3JGLENBQUM7SUFFRCxNQUFNLENBQUMsVUFBa0I7UUFDdkIsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsSUFBSSxxREFBd0IsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO0lBQ2hFLENBQUM7SUFFRCxXQUFXO1FBQ1QsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsSUFBSSwwREFBNkIsRUFBRSxDQUFDLENBQUM7SUFDM0QsQ0FBQztDQUNGLENBQUE7QUExQ1ksdUJBQXVCO0lBRG5DLGlCQUFVLEVBQUU7R0FDQSx1QkFBdUIsQ0EwQ25DO0FBMUNZLDBEQUF1QiJ9