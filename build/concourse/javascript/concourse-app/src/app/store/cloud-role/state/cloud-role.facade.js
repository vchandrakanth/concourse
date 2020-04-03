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
const toast_actions_1 = require("@concourse/core/toast/toast.actions");
const selectors_1 = require("@concourse/store/selectors");
const cloud_role_actions_1 = require("./cloud-role.actions");
const query = require("./cloud-role.selectors");
let CloudRoleFacade = class CloudRoleFacade {
    constructor(store) {
        this.store = store;
        this.list$ = this.store.pipe(store_1.select(query.getAll));
        this.getSelected$ = this.store.pipe(store_1.select(selectors_1.getSelectedCloudRoleWithRelated));
        this.isLoaded$ = this.store.pipe(store_1.select(query.getIsLoaded));
        this.cloudRoleSyncPending$ = this.store.pipe(store_1.select(query.getCloudRoleSyncPending));
        this.hasNextLink$ = this.store.pipe(store_1.select(query.hasNextLink));
    }
    getCloudRoles() {
        this.store.dispatch(new cloud_role_actions_1.LoadCloudRoles());
    }
    getCloudRole(id) {
        this.store.dispatch(new cloud_role_actions_1.LoadCloudRole(id));
    }
    create(newCloudRole, versionBump) {
        this.store.dispatch(new cloud_role_actions_1.CreateCloudRole({ newCloudRole, versionBump }));
    }
    delete(cloudRole) {
        this.store.dispatch(new cloud_role_actions_1.DeleteCloudRole(cloudRole.id));
    }
    updateAwsActions(awsOperations, id) {
        this.store.dispatch(new cloud_role_actions_1.UpdateAwsActions({ awsOperations, id }));
    }
    updateAwsNonActions(awsOperations, id) {
        this.store.dispatch(new cloud_role_actions_1.UpdateNonAwsActions({ awsOperations, id }));
    }
    updateAzureActions(azureOperations, id) {
        this.store.dispatch(new cloud_role_actions_1.UpdateAzureActions({ azureOperations, id }));
    }
    updateAzureNonActions(azureOperations, id) {
        this.store.dispatch(new cloud_role_actions_1.UpdateNonAzureActions({ azureOperations, id }));
    }
    updateDetails(newCloudRole, versionBump) {
        this.store.dispatch(new cloud_role_actions_1.UpdateCloudRole({ newCloudRole, versionBump }));
    }
    openToaster(message) {
        this.store.dispatch(new toast_actions_1.OpenToast({ message, type: 'warning' }));
    }
    search(searchText) {
        this.store.dispatch(new cloud_role_actions_1.SearchCloudRoles(searchText));
    }
    resetSearch() {
        this.store.dispatch(new cloud_role_actions_1.ResetCloudRoleSearch());
    }
    syncCloudRolesAzure() {
        this.store.dispatch(new cloud_role_actions_1.SyncCloudRolesAzure());
    }
    getCloudRolesByPagination(page, size) {
        this.store.dispatch(new cloud_role_actions_1.LoadCloudRolesByPagination({ page: page.toString(), size: size.toString() }));
    }
};
CloudRoleFacade = __decorate([
    core_1.Injectable()
], CloudRoleFacade);
exports.CloudRoleFacade = CloudRoleFacade;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xvdWQtcm9sZS5mYWNhZGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9jb25jb3Vyc2UvamF2YXNjcmlwdC9jb25jb3Vyc2UtYXBwL3NyYy9hcHAvc3RvcmUvY2xvdWQtcm9sZS9zdGF0ZS9jbG91ZC1yb2xlLmZhY2FkZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBLHdDQUEyQztBQUMzQyx1Q0FBNEM7QUFHNUMsdUVBQWdFO0FBRWhFLDBEQUE2RTtBQUM3RSw2REFjOEI7QUFFOUIsZ0RBQWdEO0FBR2hELElBQWEsZUFBZSxHQUE1QixNQUFhLGVBQWU7SUFPMUIsWUFDbUIsS0FBbUI7UUFBbkIsVUFBSyxHQUFMLEtBQUssQ0FBYztRQVB0QyxVQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsY0FBTSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1FBQzlDLGlCQUFZLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsY0FBTSxDQUFDLDJDQUErQixDQUFDLENBQUMsQ0FBQztRQUN4RSxjQUFTLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsY0FBTSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO1FBQ3ZELDBCQUFxQixHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLGNBQU0sQ0FBQyxLQUFLLENBQUMsdUJBQXVCLENBQUMsQ0FBQyxDQUFDO1FBQy9FLGlCQUFZLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsY0FBTSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO0lBSXRELENBQUM7SUFFTCxhQUFhO1FBQ1gsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsSUFBSSxtQ0FBYyxFQUFFLENBQUMsQ0FBQztJQUM1QyxDQUFDO0lBRUQsWUFB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