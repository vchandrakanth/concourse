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
const index_1 = require("../../selectors/index");
const discovered_deployment_actions_1 = require("./discovered-deployment.actions");
const DiscoveredDeploymentQuery = require("./discovered-deployment.selectors");
let DiscoveredDeploymentFacade = class DiscoveredDeploymentFacade {
    constructor(store) {
        this.store = store;
        this.list$ = this.store.pipe(store_1.select(index_1.getDiscoveredDeploymentsWithRelated));
        this.isLoaded$ = this.store.pipe(store_1.select(DiscoveredDeploymentQuery.getIsLoaded));
        this.isUpdating$ = this.store.pipe(store_1.select(DiscoveredDeploymentQuery.getIsUpdating));
        this.discoveredDeployment$ = this.store.pipe(store_1.select(index_1.getSelectedDiscoveredDeploymentWithRelated));
        this.discoveredDeploymentResources$ = this.store.pipe(store_1.select(DiscoveredDeploymentQuery.getResources));
        this.selectedResource$ = this.store.pipe(store_1.select(DiscoveredDeploymentQuery.getSelectedResource));
    }
    getAllDiscoveredDeployments() {
        this.store.dispatch(new discovered_deployment_actions_1.LoadDiscoveredDeployments());
    }
    selectResource(audit) {
        this.store.dispatch(new discovered_deployment_actions_1.SelectResourceAuditData(audit));
    }
    search(searchText) {
        this.store.dispatch(new discovered_deployment_actions_1.SearchDiscoveredDeployments(searchText));
    }
    resetSearch() {
        this.store.dispatch(new discovered_deployment_actions_1.ResetDiscoveredDeploymentsSearch());
    }
};
DiscoveredDeploymentFacade = __decorate([
    core_1.Injectable()
], DiscoveredDeploymentFacade);
exports.DiscoveredDeploymentFacade = DiscoveredDeploymentFacade;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlzY292ZXJlZC1kZXBsb3ltZW50LmZhY2FkZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL2NvbmNvdXJzZS9qYXZhc2NyaXB0L2NvbmNvdXJzZS1hcHAvc3JjL2FwcC9zdG9yZS9kaXNjb3ZlcmVkLWRlcGxveW1lbnQvc3RhdGUvZGlzY292ZXJlZC1kZXBsb3ltZW50LmZhY2FkZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBLHdDQUEyQztBQUMzQyx1Q0FBNEM7QUFFNUMsaURBQXdIO0FBQ3hILG1GQUV5QztBQUV6QywrRUFBK0U7QUFFL0UsSUFBYSwwQkFBMEIsR0FBdkMsTUFBYSwwQkFBMEI7SUFRckMsWUFDbUIsS0FBbUI7UUFBbkIsVUFBSyxHQUFMLEtBQUssQ0FBYztRQVJ0QyxVQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsY0FBTSxDQUFDLDJDQUFtQyxDQUFDLENBQUMsQ0FBQztRQUNyRSxjQUFTLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsY0FBTSxDQUFDLHlCQUF5QixDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7UUFDM0UsZ0JBQVcsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxjQUFNLENBQUMseUJBQXlCLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQztRQUMvRSwwQkFBcUIsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxjQUFNLENBQUMsa0RBQTBDLENBQUMsQ0FBQyxDQUFDO1FBQzVGLG1DQUE4QixHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLGNBQU0sQ0FBQyx5QkFBeUIsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDO1FBQ2pHLHNCQUFpQixHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLGNBQU0sQ0FBQyx5QkFBeUIsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLENBQUM7SUFJdkYsQ0FBQztJQUVMLDJCQUEyQjtRQUN6QixJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxJQUFJLHlEQUF5QixFQUFFLENBQUMsQ0FBQztJQUN2RCxDQUFDO0lBRUQsY0FBYyxDQUFDLEtBQUs7UUFDbEIsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsSUFBSSx1REFBdUIsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO0lBQzFELENBQUM7SUFFRCxNQUFNLENBQUMsVUFBa0I7UUFDdkIsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsSUFBSSwyREFBMkIsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO0lBQ25FLENBQUM7SUFDRCxXQUFXO1FBQ1QsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsSUFBSSxnRUFBZ0MsRUFBRSxDQUFDLENBQUM7SUFDOUQsQ0FBQztDQUNGLENBQUE7QUExQlksMEJBQTBCO0lBRHRDLGlCQUFVLEVBQUU7R0FDQSwwQkFBMEIsQ0EwQnRDO0FBMUJZLGdFQUEwQiJ9