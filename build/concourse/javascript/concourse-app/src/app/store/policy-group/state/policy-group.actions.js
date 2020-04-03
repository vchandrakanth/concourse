"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PolicyGroupActionTypes;
(function (PolicyGroupActionTypes) {
    PolicyGroupActionTypes["LoadPolicyGroups"] = "[PolicyGroup] Load PolicyGroups";
    PolicyGroupActionTypes["LoadPolicyGroupsSuccess"] = "[PolicyGroup] Load PolicyGroups Success";
    PolicyGroupActionTypes["LoadPolicyGroupsFailure"] = "[PolicyGroup] Load PolicyGroups Failure";
    PolicyGroupActionTypes["LoadPolicyGroupsByPagination"] = "[PolicyGroup] Load PolicyGroups By Pagination";
    PolicyGroupActionTypes["LoadPolicyGroupsByPaginationSuccess"] = "[PolicyGroup] Load PolicyGroups By Pagination Success";
    PolicyGroupActionTypes["LoadPolicyGroupsByPaginationFailure"] = "[PolicyGroup] Load PolicyGroups By Pagination Failure";
    PolicyGroupActionTypes["LoadPolicyGroupsBySurfaceLayerIds"] = "[PolicyGroup] Load PolicyGroups By SurfaceLayer Ids";
    PolicyGroupActionTypes["LoadPolicyGroupsBySurfaceLayerIdsSuccess"] = "[PolicyGroup] Load PolicyGroups By SurfaceLayer Ids Success";
    PolicyGroupActionTypes["LoadPolicyGroupsBySurfaceLayerIdsFailure"] = "[PolicyGroup] Load PolicyGroups By SurfaceLayer Ids Failure";
    PolicyGroupActionTypes["LoadPolicyGroup"] = "[PolicyGroup] Load PolicyGroup";
    PolicyGroupActionTypes["LoadPolicyGroupSuccess"] = "[PolicyGroup] Load PolicyGroup Success";
    PolicyGroupActionTypes["LoadPolicyGroupFailure"] = "[PolicyGroup] Load PolicyGroup Failure";
    PolicyGroupActionTypes["SelectPolicyGroup"] = "[PolicyGroup] Select PolicyGroup";
    PolicyGroupActionTypes["DeletePolicyGroup"] = "[PolicyGroup] Delete PolicyGroup";
    PolicyGroupActionTypes["DeletePolicyGroupSuccess"] = "[PolicyGroup] Delete PolicyGroup Success";
    PolicyGroupActionTypes["DeletePolicyGroupPending"] = "[PolicyGroup] Delete PolicyGroup Pending";
    PolicyGroupActionTypes["DeletePolicyGroupFailure"] = "[PolicyGroup] Delete PolicyGroup Failure";
    PolicyGroupActionTypes["UpdatePolicyGroup"] = "[PolicyGroup] Update Policy Group";
    PolicyGroupActionTypes["UpdatePolicyGroupSuccess"] = "[PolicyGroup] Update Policy Group Success";
    PolicyGroupActionTypes["UpdatePolicyGroupFailure"] = "[PolicyGroup] Update Policy Group Failure";
    PolicyGroupActionTypes["UpdatePolicyGroupRelated"] = "[PolicyGroup] Update Policy Group Related";
    PolicyGroupActionTypes["UpdatePolicyGroupRelatedSuccess"] = "[PolicyGroup] Update Policy Group Related Success";
    PolicyGroupActionTypes["UpdatePolicyGroupRelatedFailure"] = "[PolicyGroup] Update Policy Group Related Failure";
    PolicyGroupActionTypes["CreatePolicyGroup"] = "[PolicyGroup] Create Policy Group";
    PolicyGroupActionTypes["CreatePolicyGroupSuccess"] = "[PolicyGroup] Create Policy Group Success";
    PolicyGroupActionTypes["CreatePolicyGroupFailure"] = "[PolicyGroup] Create Policy Group Failure";
    PolicyGroupActionTypes["SearchPolicyGroup"] = "[PolicyGroup] Search Policy Group";
    PolicyGroupActionTypes["SearchPolicyGroupSuccess"] = "[PolicyGroup] Search Policy Group Success";
    PolicyGroupActionTypes["ResetPolicyGroupResults"] = "[PolicyGroup] Reset Search Results";
})(PolicyGroupActionTypes = exports.PolicyGroupActionTypes || (exports.PolicyGroupActionTypes = {}));
class LoadPolicyGroups {
    constructor() {
        this.type = PolicyGroupActionTypes.LoadPolicyGroups;
    }
}
exports.LoadPolicyGroups = LoadPolicyGroups;
class LoadPolicyGroupsSuccess {
    constructor(payload) {
        this.payload = payload;
        this.type = PolicyGroupActionTypes.LoadPolicyGroupsSuccess;
    }
}
exports.LoadPolicyGroupsSuccess = LoadPolicyGroupsSuccess;
class LoadPolicyGroupsFailure {
    constructor() {
        this.type = PolicyGroupActionTypes.LoadPolicyGroupsFailure;
    }
}
exports.LoadPolicyGroupsFailure = LoadPolicyGroupsFailure;
class LoadPolicyGroupsByPagination {
    constructor(payload) {
        this.payload = payload;
        this.type = PolicyGroupActionTypes.LoadPolicyGroupsByPagination;
    }
}
exports.LoadPolicyGroupsByPagination = LoadPolicyGroupsByPagination;
class LoadPolicyGroupsByPaginationSuccess {
    constructor(payload) {
        this.payload = payload;
        this.type = PolicyGroupActionTypes.LoadPolicyGroupsByPaginationSuccess;
    }
}
exports.LoadPolicyGroupsByPaginationSuccess = LoadPolicyGroupsByPaginationSuccess;
class LoadPolicyGroupsByPaginationFailure {
    constructor() {
        this.type = PolicyGroupActionTypes.LoadPolicyGroupsByPaginationFailure;
    }
}
exports.LoadPolicyGroupsByPaginationFailure = LoadPolicyGroupsByPaginationFailure;
class LoadPolicyGroupsBySurfaceLayerIds {
    constructor(payload) {
        this.payload = payload;
        this.type = PolicyGroupActionTypes.LoadPolicyGroupsBySurfaceLayerIds;
    }
}
exports.LoadPolicyGroupsBySurfaceLayerIds = LoadPolicyGroupsBySurfaceLayerIds;
class LoadPolicyGroupsBySurfaceLayerIdsSuccess {
    constructor(payload) {
        this.payload = payload;
        this.type = PolicyGroupActionTypes.LoadPolicyGroupsBySurfaceLayerIdsSuccess;
    }
}
exports.LoadPolicyGroupsBySurfaceLayerIdsSuccess = LoadPolicyGroupsBySurfaceLayerIdsSuccess;
class LoadPolicyGroupsBySurfaceLayerIdsFailure {
    constructor() {
        this.type = PolicyGroupActionTypes.LoadPolicyGroupsBySurfaceLayerIdsFailure;
    }
}
exports.LoadPolicyGroupsBySurfaceLayerIdsFailure = LoadPolicyGroupsBySurfaceLayerIdsFailure;
class LoadPolicyGroup {
    constructor(payload) {
        this.payload = payload;
        this.type = PolicyGroupActionTypes.LoadPolicyGroup;
    }
}
exports.LoadPolicyGroup = LoadPolicyGroup;
class LoadPolicyGroupSuccess {
    constructor(payload) {
        this.payload = payload;
        this.type = PolicyGroupActionTypes.LoadPolicyGroupSuccess;
    }
}
exports.LoadPolicyGroupSuccess = LoadPolicyGroupSuccess;
class LoadPolicyGroupFailure {
    constructor() {
        this.type = PolicyGroupActionTypes.LoadPolicyGroupFailure;
    }
}
exports.LoadPolicyGroupFailure = LoadPolicyGroupFailure;
class SelectPolicyGroup {
    constructor(payload) {
        this.payload = payload;
        this.type = PolicyGroupActionTypes.SelectPolicyGroup;
    }
}
exports.SelectPolicyGroup = SelectPolicyGroup;
class DeletePolicyGroup {
    constructor(payload) {
        this.payload = payload;
        this.type = PolicyGroupActionTypes.DeletePolicyGroup;
    }
}
exports.DeletePolicyGroup = DeletePolicyGroup;
class DeletePolicyGroupSuccess {
    constructor(payload) {
        this.payload = payload;
        this.type = PolicyGroupActionTypes.DeletePolicyGroupSuccess;
    }
}
exports.DeletePolicyGroupSuccess = DeletePolicyGroupSuccess;
class DeletePolicyGroupPending {
    constructor(payload) {
        this.payload = payload;
        this.type = PolicyGroupActionTypes.DeletePolicyGroupPending;
    }
}
exports.DeletePolicyGroupPending = DeletePolicyGroupPending;
class DeletePolicyGroupFailure {
    constructor() {
        this.type = PolicyGroupActionTypes.DeletePolicyGroupFailure;
    }
}
exports.DeletePolicyGroupFailure = DeletePolicyGroupFailure;
class SearchPolicyGroup {
    constructor(payload) {
        this.payload = payload;
        this.type = PolicyGroupActionTypes.SearchPolicyGroup;
    }
}
exports.SearchPolicyGroup = SearchPolicyGroup;
class SearchPolicyGroupSuccess {
    constructor(payload) {
        this.payload = payload;
        this.type = PolicyGroupActionTypes.SearchPolicyGroupSuccess;
    }
}
exports.SearchPolicyGroupSuccess = SearchPolicyGroupSuccess;
class UpdatePolicyGroup {
    constructor(payload) {
        this.payload = payload;
        this.type = PolicyGroupActionTypes.UpdatePolicyGroup;
    }
}
exports.UpdatePolicyGroup = UpdatePolicyGroup;
class UpdatePolicyGroupSuccess {
    constructor(payload) {
        this.payload = payload;
        this.type = PolicyGroupActionTypes.UpdatePolicyGroupSuccess;
    }
}
exports.UpdatePolicyGroupSuccess = UpdatePolicyGroupSuccess;
class UpdatePolicyGroupFailure {
    constructor() {
        this.type = PolicyGroupActionTypes.UpdatePolicyGroupFailure;
    }
}
exports.UpdatePolicyGroupFailure = UpdatePolicyGroupFailure;
class UpdatePolicyGroupRelated {
    constructor(payload) {
        this.payload = payload;
        this.type = PolicyGroupActionTypes.UpdatePolicyGroupRelated;
    }
}
exports.UpdatePolicyGroupRelated = UpdatePolicyGroupRelated;
class UpdatePolicyGroupRelatedSuccess {
    constructor(payload) {
        this.payload = payload;
        this.type = PolicyGroupActionTypes.UpdatePolicyGroupRelatedSuccess;
    }
}
exports.UpdatePolicyGroupRelatedSuccess = UpdatePolicyGroupRelatedSuccess;
class UpdatePolicyGroupRelatedFailure {
    constructor() {
        this.type = PolicyGroupActionTypes.UpdatePolicyGroupRelatedFailure;
    }
}
exports.UpdatePolicyGroupRelatedFailure = UpdatePolicyGroupRelatedFailure;
class ResetPolicyGroupResults {
    constructor() {
        this.type = PolicyGroupActionTypes.ResetPolicyGroupResults;
    }
}
exports.ResetPolicyGroupResults = ResetPolicyGroupResults;
class CreatePolicyGroup {
    constructor(payload) {
        this.payload = payload;
        this.type = PolicyGroupActionTypes.CreatePolicyGroup;
    }
}
exports.CreatePolicyGroup = CreatePolicyGroup;
class CreatePolicyGroupSuccess {
    constructor(payload) {
        this.payload = payload;
        this.type = PolicyGroupActionTypes.CreatePolicyGroupSuccess;
    }
}
exports.CreatePolicyGroupSuccess = CreatePolicyGroupSuccess;
class CreatePolicyGroupFailure {
    constructor() {
        this.type = PolicyGroupActionTypes.CreatePolicyGroupFailure;
    }
}
exports.CreatePolicyGroupFailure = CreatePolicyGroupFailure;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9saWN5LWdyb3VwLmFjdGlvbnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9jb25jb3Vyc2UvamF2YXNjcmlwdC9jb25jb3Vyc2UtYXBwL3NyYy9hcHAvc3RvcmUvcG9saWN5LWdyb3VwL3N0YXRlL3BvbGljeS1ncm91cC5hY3Rpb25zLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBS0EsSUFBWSxzQkF5Q1g7QUF6Q0QsV0FBWSxzQkFBc0I7SUFDaEMsOEVBQW9ELENBQUE7SUFDcEQsNkZBQW1FLENBQUE7SUFDbkUsNkZBQW1FLENBQUE7SUFFbkUsd0dBQThFLENBQUE7SUFDOUUsdUhBQTZGLENBQUE7SUFDN0YsdUhBQTZGLENBQUE7SUFHN0YsbUhBQXlGLENBQUE7SUFDekYsa0lBQXdHLENBQUE7SUFDeEcsa0lBQXdHLENBQUE7SUFFeEcsNEVBQWtELENBQUE7SUFDbEQsMkZBQWlFLENBQUE7SUFDakUsMkZBQWlFLENBQUE7SUFFakUsZ0ZBQXNELENBQUE7SUFFdEQsZ0ZBQXNELENBQUE7SUFDdEQsK0ZBQXFFLENBQUE7SUFDckUsK0ZBQXFFLENBQUE7SUFDckUsK0ZBQXFFLENBQUE7SUFFckUsaUZBQXVELENBQUE7SUFDdkQsZ0dBQXNFLENBQUE7SUFDdEUsZ0dBQXNFLENBQUE7SUFFdEUsZ0dBQXNFLENBQUE7SUFDdEUsK0dBQXFGLENBQUE7SUFDckYsK0dBQXFGLENBQUE7SUFFckYsaUZBQXVELENBQUE7SUFDdkQsZ0dBQXNFLENBQUE7SUFDdEUsZ0dBQXNFLENBQUE7SUFFdEUsaUZBQXVELENBQUE7SUFDdkQsZ0dBQXNFLENBQUE7SUFFdEUsd0ZBQThELENBQUE7QUFDaEUsQ0FBQyxFQXpDVyxzQkFBc0IsR0FBdEIsOEJBQXNCLEtBQXRCLDhCQUFzQixRQXlDakM7QUFFRCxNQUFhLGdCQUFnQjtJQUE3QjtRQUNXLFNBQUksR0FBRyxzQkFBc0IsQ0FBQyxnQkFBZ0IsQ0FBQztJQUMxRCxDQUFDO0NBQUE7QUFGRCw0Q0FFQztBQUNELE1BQWEsdUJBQXVCO0lBRWxDLFlBQW1CLE9BQXNCO1FBQXRCLFlBQU8sR0FBUCxPQUFPLENBQWU7UUFEaEMsU0FBSSxHQUFHLHNCQUFzQixDQUFDLHVCQUF1QixDQUFDO0lBQ2xCLENBQUM7Q0FDL0M7QUFIRCwwREFHQztBQUNELE1BQWEsdUJBQXVCO0lBQXBDO1FBQ1csU0FBSSxHQUFHLHNCQUFzQixDQUFDLHVCQUF1QixDQUFDO0lBQ2pFLENBQUM7Q0FBQTtBQUZELDBEQUVDO0FBRUQsTUFBYSw0QkFBNEI7SUFFdkMsWUFBbUIsT0FBdUM7UUFBdkMsWUFBTyxHQUFQLE9BQU8sQ0FBZ0M7UUFEakQsU0FBSSxHQUFHLHNCQUFzQixDQUFDLDRCQUE0QixDQUFDO0lBQ04sQ0FBQztDQUNoRTtBQUhELG9FQUdDO0FBRUQsTUFBYSxtQ0FBbUM7SUFFOUMsWUFBbUIsT0FBOEQ7UUFBOUQsWUFBTyxHQUFQLE9BQU8sQ0FBdUQ7UUFEeEUsU0FBSSxHQUFHLHNCQUFzQixDQUFDLG1DQUFtQyxDQUFDO0lBQ1UsQ0FBQztDQUN2RjtBQUhELGtGQUdDO0FBQ0QsTUFBYSxtQ0FBbUM7SUFBaEQ7UUFDVyxTQUFJLEdBQUcsc0JBQXNCLENBQUMsbUNBQW1DLENBQUM7SUFDN0UsQ0FBQztDQUFBO0FBRkQsa0ZBRUM7QUFFRCxNQUFhLGlDQUFpQztJQUU1QyxZQUFtQixPQUFpQjtRQUFqQixZQUFPLEdBQVAsT0FBTyxDQUFVO1FBRDNCLFNBQUksR0FBRyxzQkFBc0IsQ0FBQyxpQ0FBaUMsQ0FBQztJQUNqQyxDQUFDO0NBQzFDO0FBSEQsOEVBR0M7QUFDRCxNQUFhLHdDQUF3QztJQUVuRCxZQUFtQixPQUFzQjtRQUF0QixZQUFPLEdBQVAsT0FBTyxDQUFlO1FBRGhDLFNBQUksR0FBRyxzQkFBc0IsQ0FBQyx3Q0FBd0MsQ0FBQztJQUNuQyxDQUFDO0NBQy9DO0FBSEQsNEZBR0M7QUFDRCxNQUFhLHdDQUF3QztJQUFyRDtRQUNXLFNBQUksR0FBRyxzQkFBc0IsQ0FBQyx3Q0FBd0MsQ0FBQztJQUNsRixDQUFDO0NBQUE7QUFGRCw0RkFFQztBQUVELE1BQWEsZUFBZTtJQUUxQixZQUFtQixPQUFlO1FBQWYsWUFBTyxHQUFQLE9BQU8sQ0FBUTtRQUR6QixTQUFJLEdBQUcsc0JBQXNCLENBQUMsZUFBZSxDQUFDO0lBQ2pCLENBQUM7Q0FDeEM7QUFIRCwwQ0FHQztBQUNELE1BQWEsc0JBQXNCO0lBRWpDLFlBQW1CLE9BQW9CO1FBQXBCLFlBQU8sR0FBUCxPQUFPLENBQWE7UUFEOUIsU0FBSSxHQUFHLHNCQUFzQixDQUFDLHNCQUFzQixDQUFDO0lBQ25CLENBQUM7Q0FDN0M7QUFIRCx3REFHQztBQUNELE1BQWEsc0JBQXNCO0lBQW5DO1FBQ1csU0FBSSxHQUFHLHNCQUFzQixDQUFDLHNCQUFzQixDQUFDO0lBQ2hFLENBQUM7Q0FBQTtBQUZELHdEQUVDO0FBRUQsTUFBYSxpQkFBaUI7SUFFNUIsWUFBbUIsT0FBZTtRQUFmLFlBQU8sR0FBUCxPQUFPLENBQVE7UUFEekIsU0FBSSxHQUFHLHNCQUFzQixDQUFDLGlCQUFpQixDQUFDO0lBQ25CLENBQUM7Q0FDeEM7QUFIRCw4Q0FHQztBQUVELE1BQWEsaUJBQWlCO0lBRTVCLFlBQW1CLE9BQWU7UUFBZixZQUFPLEdBQVAsT0FBTyxDQUFRO1FBRHpCLFNBQUksR0FBRyxzQkFBc0IsQ0FBQyxpQkFBaUIsQ0FBQztJQUNuQixDQUFDO0NBQ3hDO0FBSEQsOENBR0M7QUFDRCxNQUFhLHdCQUF3QjtJQUVuQyxZQUFtQixPQUFlO1FBQWYsWUFBTyxHQUFQLE9BQU8sQ0FBUTtRQUR6QixTQUFJLEdBQUcsc0JBQXNCLENBQUMsd0JBQXdCLENBQUM7SUFDMUIsQ0FBQztDQUN4QztBQUhELDREQUdDO0FBQ0QsTUFBYSx3QkFBd0I7SUFFbkMsWUFBbUIsT0FBb0I7UUFBcEIsWUFBTyxHQUFQLE9BQU8sQ0FBYTtRQUQ5QixTQUFJLEdBQUcsc0JBQXNCLENBQUMsd0JBQXdCLENBQUM7SUFDckIsQ0FBQztDQUM3QztBQUhELDREQUdDO0FBQ0QsTUFBYSx3QkFBd0I7SUFBckM7UUFDVyxTQUFJLEdBQUcsc0JBQXNCLENBQUMsd0JBQXdCLENBQUM7SUFDbEUsQ0FBQztDQUFBO0FBRkQsNERBRUM7QUFDRCxNQUFhLGlCQUFpQjtJQUU1QixZQUFtQixPQUFlO1FBQWYsWUFBTyxHQUFQLE9BQU8sQ0FBUTtRQUR6QixTQUFJLEdBQUcsc0JBQXNCLENBQUMsaUJBQWlCLENBQUM7SUFDbkIsQ0FBQztDQUN4QztBQUhELDhDQUdDO0FBQ0QsTUFBYSx3QkFBd0I7SUFFbkMsWUFBbUIsT0FBaUI7UUFBakIsWUFBTyxHQUFQLE9BQU8sQ0FBVTtRQUQzQixTQUFJLEdBQUcsc0JBQXNCLENBQUMsd0JBQXdCLENBQUM7SUFDeEIsQ0FBQztDQUMxQztBQUhELDREQUdDO0FBQ0QsTUFBYSxpQkFBaUI7SUFFNUIsWUFBbUIsT0FBa0Y7UUFBbEYsWUFBTyxHQUFQLE9BQU8sQ0FBMkU7UUFENUYsU0FBSSxHQUFHLHNCQUFzQixDQUFDLGlCQUFpQixDQUFDO0lBQ2dELENBQUM7Q0FDM0c7QUFIRCw4Q0FHQztBQUNELE1BQWEsd0JBQXdCO0lBRW5DLFlBQW1CLE9BQW9CO1FBQXBCLFlBQU8sR0FBUCxPQUFPLENBQWE7UUFEOUIsU0FBSSxHQUFHLHNCQUFzQixDQUFDLHdCQUF3QixDQUFDO0lBQ3JCLENBQUM7Q0FDN0M7QUFIRCw0REFHQztBQUNELE1BQWEsd0JBQXdCO0lBQXJDO1FBQ1csU0FBSSxHQUFHLHNCQUFzQixDQUFDLHdCQUF3QixDQUFDO0lBQ2xFLENBQUM7Q0FBQTtBQUZELDREQUVDO0FBQ0QsTUFBYSx3QkFBd0I7SUFFbkMsWUFBbUIsT0FBNkI7UUFBN0IsWUFBTyxHQUFQLE9BQU8sQ0FBc0I7UUFEdkMsU0FBSSxHQUFHLHNCQUFzQixDQUFDLHdCQUF3QixDQUFDO0lBQ1osQ0FBQztDQUN0RDtBQUhELDREQUdDO0FBQ0QsTUFBYSwrQkFBK0I7SUFFMUMsWUFBbUIsT0FBb0I7UUFBcEIsWUFBTyxHQUFQLE9BQU8sQ0FBYTtRQUQ5QixTQUFJLEdBQUcsc0JBQXNCLENBQUMsK0JBQStCLENBQUM7SUFDNUIsQ0FBQztDQUM3QztBQUhELDBFQUdDO0FBQ0QsTUFBYSwrQkFBK0I7SUFBNUM7UUFDVyxTQUFJLEdBQUcsc0JBQXNCLENBQUMsK0JBQStCLENBQUM7SUFDekUsQ0FBQztDQUFBO0FBRkQsMEVBRUM7QUFDRCxNQUFhLHVCQUF1QjtJQUFwQztRQUNXLFNBQUksR0FBRyxzQkFBc0IsQ0FBQyx1QkFBdUIsQ0FBQztJQUNqRSxDQUFDO0NBQUE7QUFGRCwwREFFQztBQUVELE1BQWEsaUJBQWlCO0lBRTVCLFlBQW1CLE9BQXdFO1FBQXhFLFlBQU8sR0FBUCxPQUFPLENBQWlFO1FBRGxGLFNBQUksR0FBRyxzQkFBc0IsQ0FBQyxpQkFBaUIsQ0FBQztJQUNzQyxDQUFDO0NBQ2pHO0FBSEQsOENBR0M7QUFDRCxNQUFhLHdCQUF3QjtJQUVuQyxZQUFtQixPQUFvQjtRQUFwQixZQUFPLEdBQVAsT0FBTyxDQUFhO1FBRDlCLFNBQUksR0FBRyxzQkFBc0IsQ0FBQyx3QkFBd0IsQ0FBQztJQUNyQixDQUFDO0NBQzdDO0FBSEQsNERBR0M7QUFDRCxNQUFhLHdCQUF3QjtJQUFyQztRQUNXLFNBQUksR0FBRyxzQkFBc0IsQ0FBQyx3QkFBd0IsQ0FBQztJQUNsRSxDQUFDO0NBQUE7QUFGRCw0REFFQyJ9