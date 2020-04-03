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
const group_actions_1 = require("./group.actions");
const query = require("./group.selectors");
let GroupFacade = class GroupFacade {
    constructor(store) {
        this.store = store;
        this.list$ = this.store.pipe(store_1.select(query.getAll));
        this.entities$ = this.store.pipe(store_1.select(query.getEntities));
        this.listWithRelated$ = this.store.pipe(store_1.select(selectors_1.getGroupsWithRelated));
        this.selected$ = this.store.pipe(store_1.select(query.getSelected));
        this.selectedWithRelated$ = this.store.pipe(store_1.select(selectors_1.getSelectedGroupWithRelated));
        this.isLoaded$ = this.store.pipe(store_1.select(query.getIsLoaded));
        this.isUpdating$ = this.store.pipe(store_1.select(query.getIsUpdating));
        this.roleAssignmentList$ = this.store.pipe(store_1.select(selectors_1.getRoleAssignmentsWithRelated));
        this.roleAssignmentsBySurfaceLayerIds$ = this.store.pipe(store_1.select(selectors_1.getRoleAssignmentsWithRelatedBySufaceLayers));
        this.hasNextLink$ = this.store.pipe(store_1.select(query.hasNextLink));
    }
    create(group) {
        this.store.dispatch(new group_actions_1.CreateGroup(group));
    }
    update(group) {
        this.store.dispatch(new group_actions_1.UpdateGroup(group));
    }
    delete(group) {
        this.store.dispatch(new group_actions_1.DeleteGroup(group.id));
    }
    search(searchText) {
        this.store.dispatch(new group_actions_1.SearchGroups(searchText));
    }
    resetSearch() {
        this.store.dispatch(new group_actions_1.ResetGroupSearchResults());
    }
    addUserToGroup(groupId, userId) {
        this.store.dispatch(new group_actions_1.AddUserToGroup({ groupId, userId }));
    }
    removeUserFromGroup(groupId, userId) {
        this.store.dispatch(new group_actions_1.RemoveUserFromGroup({ groupId, userId }));
    }
    getRoleAssignmentsBySurfaceLayerIds(surfaceLayerIds) {
        this.store.dispatch(new group_actions_1.LoadRoleAssignmentsBySurfaceLayerIds(surfaceLayerIds));
    }
    createRoleAssignment(groupId, payload) {
        this.store.dispatch(new group_actions_1.CreateRoleAssignment({ groupId, payload }));
    }
    deleteRoleAssignment(groupId, roleAssignmentId) {
        this.store.dispatch(new group_actions_1.RemoveRoleAssignment({ groupId, roleAssignmentId }));
    }
    getPaginatedList(page, size) {
        this.store.dispatch(new group_actions_1.LoadGroupsByPagination({ page: page.toString(), size: size.toString() }));
    }
};
GroupFacade = __decorate([
    core_1.Injectable()
], GroupFacade);
exports.GroupFacade = GroupFacade;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JvdXAuZmFjYWRlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vY29uY291cnNlL2phdmFzY3JpcHQvY29uY291cnNlLWFwcC9zcmMvYXBwL3N0b3JlL2dyb3VwL3N0YXRlL2dyb3VwLmZhY2FkZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBLHdDQUEyQztBQUMzQyx1Q0FBNEM7QUFHNUMsMERBS29DO0FBQ3BDLG1EQVl5QjtBQUV6QiwyQ0FBMkM7QUFHM0MsSUFBYSxXQUFXLEdBQXhCLE1BQWEsV0FBVztJQVl0QixZQUNtQixLQUFtQjtRQUFuQixVQUFLLEdBQUwsS0FBSyxDQUFjO1FBWnRDLFVBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxjQUFNLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7UUFDOUMsY0FBUyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLGNBQU0sQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztRQUN2RCxxQkFBZ0IsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxjQUFNLENBQUMsZ0NBQW9CLENBQUMsQ0FBQyxDQUFDO1FBQ2pFLGNBQVMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxjQUFNLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7UUFDdkQseUJBQW9CLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsY0FBTSxDQUFDLHVDQUEyQixDQUFDLENBQUMsQ0FBQztRQUM1RSxjQUFTLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsY0FBTSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO1FBQ3ZELGdCQUFXLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsY0FBTSxD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