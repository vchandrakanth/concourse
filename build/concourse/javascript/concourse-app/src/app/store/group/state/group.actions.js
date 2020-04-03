"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GroupActionTypes;
(function (GroupActionTypes) {
    GroupActionTypes["LoadGroups"] = "[Group] Load Groups";
    GroupActionTypes["LoadGroupsSuccess"] = "[Group] Load Groups Success";
    GroupActionTypes["LoadGroupsFailure"] = "[Group] Load Groups Failure";
    GroupActionTypes["LoadGroupsByPagination"] = "[PolicyGroup] Load Groups By Pagination";
    GroupActionTypes["LoadGroupsByPaginationSuccess"] = "[PolicyGroup] Load Groups By Pagination Success";
    GroupActionTypes["LoadGroupsByPaginationFailure"] = "[PolicyGroup] Load Groups By Pagination Failure";
    GroupActionTypes["LoadGroup"] = "[Group] Load Group";
    GroupActionTypes["LoadGroupSuccess"] = "[Group] Load Group Success";
    GroupActionTypes["LoadGroupFailure"] = "[Group] Load Group Failure";
    GroupActionTypes["SelectGroup"] = "[Group] Select Group";
    GroupActionTypes["CreateGroup"] = "[Group] Create Group";
    GroupActionTypes["CreateGroupSuccess"] = "[Group] Create Group Success";
    GroupActionTypes["CreateGroupFailure"] = "[Group] Create Group Failure";
    GroupActionTypes["UpdateGroup"] = "[Group] Update Group";
    GroupActionTypes["UpdateGroupSuccess"] = "[Group] Update Group Success";
    GroupActionTypes["UpdateGroupFailure"] = "[Group] Update Group Failure";
    GroupActionTypes["DeleteGroup"] = "[Group] Delete Group";
    GroupActionTypes["DeleteGroupSuccess"] = "[Group] Delete Group Success";
    GroupActionTypes["DeleteGroupFailure"] = "[Group] Delete Group Failure";
    GroupActionTypes["AddUserToGroup"] = "[Group] Add User to Group";
    GroupActionTypes["AddUserToGroupSuccess"] = "[Group] Add User to Group Success";
    GroupActionTypes["AddUserToGroupFailure"] = "[Group] Add User to Group Failure";
    GroupActionTypes["RemoveUserFromGroup"] = "[Group] Remove User from Group";
    GroupActionTypes["RemoveUserFromGroupSuccess"] = "[Group] Remove User from Group Success";
    GroupActionTypes["RemoveUserFromGroupFailure"] = "[Group] Remove User from Group Failure";
    GroupActionTypes["SearchGroups"] = "[Group] Search Groups";
    GroupActionTypes["SearchGroupsSuccess"] = "[Group] Search Groups Success";
    GroupActionTypes["ResetGroupSearchResults"] = "[Group] Reset Search Results";
    GroupActionTypes["LoadRoleAssignmentsBySurfaceLayerIds"] = "[Group] Load Role Assignments by SurfaceLayer Ids";
    GroupActionTypes["LoadRoleAssignmentsBySurfaceLayerIdsSuccess"] = "[Group] Load Role Assignments by SurfaceLayer Ids Success";
    GroupActionTypes["LoadRoleAssignmentsBySurfaceLayerIdsFailure"] = "[Group] Load Role Assignments by SurfaceLayer Ids Failure";
    GroupActionTypes["CreateRoleAssignment"] = "[Group] Create Role Assignment";
    GroupActionTypes["CreateRoleAssignmentSuccess"] = "[Group] Create Role Assignment Success";
    GroupActionTypes["CreateRoleAssignmentFailure"] = "[Group] Create Role Assignment Failure";
    GroupActionTypes["RemoveRoleAssignment"] = "[Group] Remove Role Assignment";
    GroupActionTypes["RemoveRoleAssignmentSuccess"] = "[Group] Remove Role Assignment Success";
    GroupActionTypes["RemoveRoleAssignmentFailure"] = "[Group] Remove Role Assignment Failure";
})(GroupActionTypes = exports.GroupActionTypes || (exports.GroupActionTypes = {}));
class LoadGroups {
    constructor() {
        this.type = GroupActionTypes.LoadGroups;
    }
}
exports.LoadGroups = LoadGroups;
class LoadGroupsSuccess {
    constructor(payload) {
        this.payload = payload;
        this.type = GroupActionTypes.LoadGroupsSuccess;
    }
}
exports.LoadGroupsSuccess = LoadGroupsSuccess;
class LoadGroupsFailure {
    constructor() {
        this.type = GroupActionTypes.LoadGroupsFailure;
    }
}
exports.LoadGroupsFailure = LoadGroupsFailure;
class LoadGroupsByPagination {
    constructor(payload) {
        this.payload = payload;
        this.type = GroupActionTypes.LoadGroupsByPagination;
    }
}
exports.LoadGroupsByPagination = LoadGroupsByPagination;
class LoadGroupsByPaginationSuccess {
    constructor(payload) {
        this.payload = payload;
        this.type = GroupActionTypes.LoadGroupsByPaginationSuccess;
    }
}
exports.LoadGroupsByPaginationSuccess = LoadGroupsByPaginationSuccess;
class LoadGroupsByPaginationFailure {
    constructor() {
        this.type = GroupActionTypes.LoadGroupsByPaginationFailure;
    }
}
exports.LoadGroupsByPaginationFailure = LoadGroupsByPaginationFailure;
class LoadGroup {
    constructor(payload) {
        this.payload = payload;
        this.type = GroupActionTypes.LoadGroup;
    }
}
exports.LoadGroup = LoadGroup;
class LoadGroupSuccess {
    constructor(payload) {
        this.payload = payload;
        this.type = GroupActionTypes.LoadGroupSuccess;
    }
}
exports.LoadGroupSuccess = LoadGroupSuccess;
class LoadGroupFailure {
    constructor() {
        this.type = GroupActionTypes.LoadGroupFailure;
    }
}
exports.LoadGroupFailure = LoadGroupFailure;
class SelectGroup {
    constructor(payload) {
        this.payload = payload;
        this.type = GroupActionTypes.SelectGroup;
    }
}
exports.SelectGroup = SelectGroup;
class CreateGroup {
    constructor(payload) {
        this.payload = payload;
        this.type = GroupActionTypes.CreateGroup;
    }
}
exports.CreateGroup = CreateGroup;
class CreateGroupSuccess {
    constructor(payload) {
        this.payload = payload;
        this.type = GroupActionTypes.CreateGroupSuccess;
    }
}
exports.CreateGroupSuccess = CreateGroupSuccess;
class CreateGroupFailure {
    constructor() {
        this.type = GroupActionTypes.CreateGroupFailure;
    }
}
exports.CreateGroupFailure = CreateGroupFailure;
class UpdateGroup {
    constructor(payload) {
        this.payload = payload;
        this.type = GroupActionTypes.UpdateGroup;
    }
}
exports.UpdateGroup = UpdateGroup;
class UpdateGroupSuccess {
    constructor(payload) {
        this.payload = payload;
        this.type = GroupActionTypes.UpdateGroupSuccess;
    }
}
exports.UpdateGroupSuccess = UpdateGroupSuccess;
class UpdateGroupFailure {
    constructor() {
        this.type = GroupActionTypes.UpdateGroupFailure;
    }
}
exports.UpdateGroupFailure = UpdateGroupFailure;
class DeleteGroup {
    constructor(payload) {
        this.payload = payload;
        this.type = GroupActionTypes.DeleteGroup;
    }
}
exports.DeleteGroup = DeleteGroup;
class DeleteGroupSuccess {
    constructor(payload) {
        this.payload = payload;
        this.type = GroupActionTypes.DeleteGroupSuccess;
    }
}
exports.DeleteGroupSuccess = DeleteGroupSuccess;
class DeleteGroupFailure {
    constructor() {
        this.type = GroupActionTypes.DeleteGroupFailure;
    }
}
exports.DeleteGroupFailure = DeleteGroupFailure;
class AddUserToGroup {
    constructor(payload) {
        this.payload = payload;
        this.type = GroupActionTypes.AddUserToGroup;
    }
}
exports.AddUserToGroup = AddUserToGroup;
class AddUserToGroupSuccess {
    constructor(payload) {
        this.payload = payload;
        this.type = GroupActionTypes.AddUserToGroupSuccess;
    }
}
exports.AddUserToGroupSuccess = AddUserToGroupSuccess;
class AddUserToGroupFailure {
    constructor() {
        this.type = GroupActionTypes.AddUserToGroupFailure;
    }
}
exports.AddUserToGroupFailure = AddUserToGroupFailure;
class RemoveUserFromGroup {
    constructor(payload) {
        this.payload = payload;
        this.type = GroupActionTypes.RemoveUserFromGroup;
    }
}
exports.RemoveUserFromGroup = RemoveUserFromGroup;
class RemoveUserFromGroupSuccess {
    constructor(payload) {
        this.payload = payload;
        this.type = GroupActionTypes.RemoveUserFromGroupSuccess;
    }
}
exports.RemoveUserFromGroupSuccess = RemoveUserFromGroupSuccess;
class RemoveUserFromGroupFailure {
    constructor() {
        this.type = GroupActionTypes.RemoveUserFromGroupFailure;
    }
}
exports.RemoveUserFromGroupFailure = RemoveUserFromGroupFailure;
class SearchGroups {
    constructor(payload) {
        this.payload = payload;
        this.type = GroupActionTypes.SearchGroups;
    }
}
exports.SearchGroups = SearchGroups;
class SearchGroupsSuccess {
    constructor(payload) {
        this.payload = payload;
        this.type = GroupActionTypes.SearchGroupsSuccess;
    }
}
exports.SearchGroupsSuccess = SearchGroupsSuccess;
class ResetGroupSearchResults {
    constructor() {
        this.type = GroupActionTypes.ResetGroupSearchResults;
    }
}
exports.ResetGroupSearchResults = ResetGroupSearchResults;
class LoadRoleAssignmentsBySurfaceLayerIds {
    constructor(payload) {
        this.payload = payload;
        this.type = GroupActionTypes.LoadRoleAssignmentsBySurfaceLayerIds;
    }
}
exports.LoadRoleAssignmentsBySurfaceLayerIds = LoadRoleAssignmentsBySurfaceLayerIds;
class LoadRoleAssignmentsBySurfaceLayerIdsSuccess {
    constructor(payload) {
        this.payload = payload;
        this.type = GroupActionTypes.LoadRoleAssignmentsBySurfaceLayerIdsSuccess;
    }
}
exports.LoadRoleAssignmentsBySurfaceLayerIdsSuccess = LoadRoleAssignmentsBySurfaceLayerIdsSuccess;
class LoadRoleAssignmentsBySurfaceLayerIdsFailure {
    constructor() {
        this.type = GroupActionTypes.LoadRoleAssignmentsBySurfaceLayerIdsFailure;
    }
}
exports.LoadRoleAssignmentsBySurfaceLayerIdsFailure = LoadRoleAssignmentsBySurfaceLayerIdsFailure;
class CreateRoleAssignment {
    constructor(payload) {
        this.payload = payload;
        this.type = GroupActionTypes.CreateRoleAssignment;
    }
}
exports.CreateRoleAssignment = CreateRoleAssignment;
class CreateRoleAssignmentSuccess {
    constructor(payload) {
        this.payload = payload;
        this.type = GroupActionTypes.CreateRoleAssignmentSuccess;
    }
}
exports.CreateRoleAssignmentSuccess = CreateRoleAssignmentSuccess;
class CreateRoleAssignmentFailure {
    constructor() {
        this.type = GroupActionTypes.CreateRoleAssignmentFailure;
    }
}
exports.CreateRoleAssignmentFailure = CreateRoleAssignmentFailure;
class RemoveRoleAssignment {
    constructor(payload) {
        this.payload = payload;
        this.type = GroupActionTypes.RemoveRoleAssignment;
    }
}
exports.RemoveRoleAssignment = RemoveRoleAssignment;
class RemoveRoleAssignmentSuccess {
    constructor(payload) {
        this.payload = payload;
        this.type = GroupActionTypes.RemoveRoleAssignmentSuccess;
    }
}
exports.RemoveRoleAssignmentSuccess = RemoveRoleAssignmentSuccess;
class RemoveRoleAssignmentFailure {
    constructor() {
        this.type = GroupActionTypes.RemoveRoleAssignmentFailure;
    }
}
exports.RemoveRoleAssignmentFailure = RemoveRoleAssignmentFailure;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JvdXAuYWN0aW9ucy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL2NvbmNvdXJzZS9qYXZhc2NyaXB0L2NvbmNvdXJzZS1hcHAvc3JjL2FwcC9zdG9yZS9ncm91cC9zdGF0ZS9ncm91cC5hY3Rpb25zLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBR0EsSUFBWSxnQkFrRFg7QUFsREQsV0FBWSxnQkFBZ0I7SUFDMUIsc0RBQWtDLENBQUE7SUFDbEMscUVBQWlELENBQUE7SUFDakQscUVBQWlELENBQUE7SUFFakQsc0ZBQWtFLENBQUE7SUFDbEUscUdBQWlGLENBQUE7SUFDakYscUdBQWlGLENBQUE7SUFFakYsb0RBQWdDLENBQUE7SUFDaEMsbUVBQStDLENBQUE7SUFDL0MsbUVBQStDLENBQUE7SUFFL0Msd0RBQW9DLENBQUE7SUFFcEMsd0RBQW9DLENBQUE7SUFDcEMsdUVBQW1ELENBQUE7SUFDbkQsdUVBQW1ELENBQUE7SUFFbkQsd0RBQW9DLENBQUE7SUFDcEMsdUVBQW1ELENBQUE7SUFDbkQsdUVBQW1ELENBQUE7SUFFbkQsd0RBQW9DLENBQUE7SUFDcEMsdUVBQW1ELENBQUE7SUFDbkQsdUVBQW1ELENBQUE7SUFFbkQsZ0VBQTRDLENBQUE7SUFDNUMsK0VBQTJELENBQUE7SUFDM0QsK0VBQTJELENBQUE7SUFFM0QsMEVBQXNELENBQUE7SUFDdEQseUZBQXFFLENBQUE7SUFDckUseUZBQXFFLENBQUE7SUFFckUsMERBQXNDLENBQUE7SUFDdEMseUVBQXFELENBQUE7SUFDckQsNEVBQXdELENBQUE7SUFFeEQsOEdBQTBGLENBQUE7SUFDMUYsNkhBQXlHLENBQUE7SUFDekcsNkhBQXlHLENBQUE7SUFFekcsMkVBQXVELENBQUE7SUFDdkQsMEZBQXNFLENBQUE7SUFDdEUsMEZBQXNFLENBQUE7SUFFdEUsMkVBQXVELENBQUE7SUFDdkQsMEZBQXNFLENBQUE7SUFDdEUsMEZBQXNFLENBQUE7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