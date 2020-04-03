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
const policy_group_actions_1 = require("./policy-group.actions");
const query = require("./policy-group.selectors");
let PolicyGroupFacade = class PolicyGroupFacade {
    constructor(store) {
        this.store = store;
        this.list$ = this.store.pipe(store_1.select(query.getAll));
        this.listWithRelated$ = this.store.pipe(store_1.select(selectors_1.getPolicyGroupsWithRelated));
        this.selected$ = this.store.pipe(store_1.select(query.getSelected));
        this.selectableOwningGroups$ = this.store.pipe(store_1.select(selectors_1.getSelectedOwningGroups, { permission: 'MANAGE_POLICY_GROUPS' }));
        this.isLoaded$ = this.store.pipe(store_1.select(query.getIsLoaded));
        this.isUpdating$ = this.store.pipe(store_1.select(query.getIsUpdating));
        this.selectedWithRelated$ = this.store.pipe(store_1.select(selectors_1.getSelectedPolicyGroupWithRelated));
        this.myScopePoliciesByStatus$ = this.store.pipe(store_1.select(query.getAllMyScopePoliciesByStatus));
        this.allSurfaceLayerPoliciesByStatus$ = this.store.pipe(store_1.select(query.getAllSurfaceLayerPoliciesByStatus));
        this.hasNextLink$ = this.store.pipe(store_1.select(query.hasNextLink));
    }
    getBySurfaceLayerIds(surfaceLayerIds) {
        this.store.dispatch(new policy_group_actions_1.LoadPolicyGroupsBySurfaceLayerIds(surfaceLayerIds));
    }
    getPaginatedList(page, size) {
        this.store.dispatch(new policy_group_actions_1.LoadPolicyGroupsByPagination({ page: page.toString(), size: size.toString() }));
    }
    delete(policyGroup) {
        this.store.dispatch(new policy_group_actions_1.DeletePolicyGroup(policyGroup.id));
    }
    updateDetails(newPolicyGroupDetails, versionBump) {
        this.store.dispatch(new policy_group_actions_1.UpdatePolicyGroup({ newPolicyGroupDetails, versionBump }));
    }
    create(policyGroup, versionBump) {
        this.store.dispatch(new policy_group_actions_1.CreatePolicyGroup({ policyGroup, versionBump }));
    }
    updateRelated(updatedPolicyGroup) {
        this.store.dispatch(new policy_group_actions_1.UpdatePolicyGroupRelated(updatedPolicyGroup));
    }
    search(name) {
        this.store.dispatch(new policy_group_actions_1.SearchPolicyGroup(name));
    }
    resetSearch() {
        this.store.dispatch(new policy_group_actions_1.ResetPolicyGroupResults());
    }
};
PolicyGroupFacade = __decorate([
    core_1.Injectable()
], PolicyGroupFacade);
exports.PolicyGroupFacade = PolicyGroupFacade;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9saWN5LWdyb3VwLmZhY2FkZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL2NvbmNvdXJzZS9qYXZhc2NyaXB0L2NvbmNvdXJzZS1hcHAvc3JjL2FwcC9zdG9yZS9wb2xpY3ktZ3JvdXAvc3RhdGUvcG9saWN5LWdyb3VwLmZhY2FkZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBLHdDQUEyQztBQUMzQyx1Q0FBNEM7QUFJNUMsMERBSW9DO0FBQ3BDLGlFQVNnQztBQUVoQyxrREFBa0Q7QUFHbEQsSUFBYSxpQkFBaUIsR0FBOUIsTUFBYSxpQkFBaUI7SUFZNUIsWUFDbUIsS0FBbUI7UUFBbkIsVUFBSyxHQUFMLEtBQUssQ0FBYztRQVp0QyxVQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsY0FBTSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1FBQzlDLHFCQUFnQixHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLGNBQU0sQ0FBQyxzQ0FBMEIsQ0FBQyxDQUFDLENBQUM7UUFDdkUsY0FBUyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLGNBQU0sQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztRQUN2RCw0QkFBdUIsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxjQUFNLENBQUMsbUNBQXVCLEVBQUUsRUFBRSxVQUFVLEVBQUUsc0JBQXNCLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDbkgsY0FBUyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLGNBQU0sQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztRQUN2RCxnQkFBVyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLGNBQU0sQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQztRQUMzRCx5QkFBb0IsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxjQUFNLENBQUMsNkNBQWlDLENBQUMsQ0FBQyxDQUFDO1FBQ2xGLDZCQUF3QixHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLGNBQU0sQ0FBQyxLQUFLLENBQUMsNkJBQTZCLENBQUMsQ0FBQyxDQUFDO1FBQ3hGLHFDQUFnQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLGNBQU0sQ0FBQyxLQUFLLENBQUMsa0NBQWtDLENBQUMsQ0FBQyxDQUFDO1FBQ3JHLGlCQUFZLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsY0FBTSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO0lBSXRELENBQUM7SUFFTCxvQkFBb0IsQ0FBQyxlQUF5QjtRQUM1QyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxJQUFJLHdEQUFpQyxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUM7SUFDOUUsQ0FBQztJQUVELGdCQUFnQixDQUFDLElBQVksRUFBRSxJQUFZO1FBQ3pDLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLElBQUksbURBQTRCLENBQUMsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLFFBQVEsRUFBRSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsUUFBUSxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUE7SUFDekcsQ0FBQztJQUVELE1BQU0sQ0FBQyxXQUF3QjtRQUM3QixJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxJQUFJLHdDQUFpQixDQUFDLFdBQVcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQzdELENBQUM7SUFFRCxhQUFhLENBQUMscUJBQTJDLEVBQUUsV0FBd0I7UUFDakYsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsSUFBSSx3Q0FBaUIsQ0FBQyxFQUFFLHFCQUFxQixFQUFFLFdBQVcsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUNyRixDQUFDO0lBRUQsTUFBTSxDQUFDLFdBQWdCLEVBQUUsV0FBd0I7UUFDL0MsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsSUFBSSx3Q0FBaUIsQ0FBQyxFQUFFLFdBQVcsRUFBRSxXQUFXLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDM0UsQ0FBQztJQUVELGFBQWEsQ0FBQyxrQkFBd0M7UUFDcEQsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsSUFBSSwrQ0FBd0IsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLENBQUM7SUFDeEUsQ0FBQztJQUVELE1BQU0sQ0FBQyxJQUFZO1FBQ2pCLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLElBQUksd0NBQWlCLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztJQUNuRCxDQUFDO0lBRUQsV0FBVztRQUNULElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLElBQUksOENBQXVCLEVBQUUsQ0FBQyxDQUFDO0lBQ3JELENBQUM7Q0FDRixDQUFBO0FBL0NZLGlCQUFpQjtJQUQ3QixpQkFBVSxFQUFFO0dBQ0EsaUJBQWlCLENBK0M3QjtBQS9DWSw4Q0FBaUIifQ==