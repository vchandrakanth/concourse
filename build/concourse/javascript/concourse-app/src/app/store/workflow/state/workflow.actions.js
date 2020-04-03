"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var WorkflowActionTypes;
(function (WorkflowActionTypes) {
    WorkflowActionTypes["LoadWorkflowSummariesByType"] = "[Workflow] Load WorkflowSummaries by Type";
    WorkflowActionTypes["LoadWorkflowSummariesByTypeSuccess"] = "[Workflow] Load WorkflowSummaries by Type Success";
    WorkflowActionTypes["LoadWorkflowSummariesByTypeFailure"] = "[Workflow] Load WorkflowSummaries by Type Failure";
    WorkflowActionTypes["FilterWorkflowSummariesByType"] = "[Workflow] Filter WorkflowSummaries by Type";
    WorkflowActionTypes["SearchWorkflowSummaries"] = "[Workflow] Search WorkflowSummaries";
    WorkflowActionTypes["SearchWorkflowSummariesSuccess"] = "[Workflow] Search WorkflowSummaries Success";
    WorkflowActionTypes["ResetWorkflowSummariesSearch"] = "[Workflow] Reset WorkflowSummaries Search";
})(WorkflowActionTypes = exports.WorkflowActionTypes || (exports.WorkflowActionTypes = {}));
class LoadWorkflowSummariesByType {
    constructor(payload) {
        this.payload = payload;
        this.type = WorkflowActionTypes.LoadWorkflowSummariesByType;
    }
}
exports.LoadWorkflowSummariesByType = LoadWorkflowSummariesByType;
class LoadWorkflowSummariesByTypeSuccess {
    constructor(payload) {
        this.payload = payload;
        this.type = WorkflowActionTypes.LoadWorkflowSummariesByTypeSuccess;
    }
}
exports.LoadWorkflowSummariesByTypeSuccess = LoadWorkflowSummariesByTypeSuccess;
class LoadWorkflowSummariesByTypeFailure {
    constructor() {
        this.type = WorkflowActionTypes.LoadWorkflowSummariesByTypeFailure;
    }
}
exports.LoadWorkflowSummariesByTypeFailure = LoadWorkflowSummariesByTypeFailure;
class FilterWorkflowSummariesByType {
    constructor(payload) {
        this.payload = payload;
        this.type = WorkflowActionTypes.FilterWorkflowSummariesByType;
    }
}
exports.FilterWorkflowSummariesByType = FilterWorkflowSummariesByType;
class SearchWorkflowSummaries {
    constructor(payload) {
        this.payload = payload;
        this.type = WorkflowActionTypes.SearchWorkflowSummaries;
    }
}
exports.SearchWorkflowSummaries = SearchWorkflowSummaries;
class SearchWorkflowSummariesSuccess {
    constructor(payload) {
        this.payload = payload;
        this.type = WorkflowActionTypes.SearchWorkflowSummariesSuccess;
    }
}
exports.SearchWorkflowSummariesSuccess = SearchWorkflowSummariesSuccess;
class ResetWorkflowSummariesSearchResults {
    constructor() {
        this.type = WorkflowActionTypes.ResetWorkflowSummariesSearch;
    }
}
exports.ResetWorkflowSummariesSearchResults = ResetWorkflowSummariesSearchResults;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid29ya2Zsb3cuYWN0aW9ucy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL2NvbmNvdXJzZS9qYXZhc2NyaXB0L2NvbmNvdXJzZS1hcHAvc3JjL2FwcC9zdG9yZS93b3JrZmxvdy9zdGF0ZS93b3JrZmxvdy5hY3Rpb25zLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBSUEsSUFBWSxtQkFVWDtBQVZELFdBQVksbUJBQW1CO0lBQzdCLGdHQUF5RSxDQUFBO0lBQ3pFLCtHQUF3RixDQUFBO0lBQ3hGLCtHQUF3RixDQUFBO0lBRXhGLG9HQUE2RSxDQUFBO0lBRTdFLHNGQUErRCxDQUFBO0lBQy9ELHFHQUE4RSxDQUFBO0lBQzlFLGlHQUEwRSxDQUFBO0FBQzVFLENBQUMsRUFWVyxtQkFBbUIsR0FBbkIsMkJBQW1CLEtBQW5CLDJCQUFtQixRQVU5QjtBQUVELE1BQWEsMkJBQTJCO0lBRXRDLFlBQW1CLE9BQXVCO1FBQXZCLFlBQU8sR0FBUCxPQUFPLENBQWdCO1FBRGpDLFNBQUksR0FBRyxtQkFBbUIsQ0FBQywyQkFBMkIsQ0FBQztJQUNsQixDQUFDO0NBQ2hEO0FBSEQsa0VBR0M7QUFDRCxNQUFhLGtDQUFrQztJQUU3QyxZQUFtQixPQUF3QjtRQUF4QixZQUFPLEdBQVAsT0FBTyxDQUFpQjtRQURsQyxTQUFJLEdBQUcsbUJBQW1CLENBQUMsa0NBQWtDLENBQUM7SUFDeEIsQ0FBQztDQUNqRDtBQUhELGdGQUdDO0FBQ0QsTUFBYSxrQ0FBa0M7SUFBL0M7UUFDVyxTQUFJLEdBQUcsbUJBQW1CLENBQUMsa0NBQWtDLENBQUM7SUFDekUsQ0FBQztDQUFBO0FBRkQsZ0ZBRUM7QUFFRCxNQUFhLDZCQUE2QjtJQUV4QyxZQUFtQixPQUFlO1FBQWYsWUFBTyxHQUFQLE9BQU8sQ0FBUTtRQUR6QixTQUFJLEdBQUcsbUJBQW1CLENBQUMsNkJBQTZCLENBQUM7SUFDNUIsQ0FBQztDQUN4QztBQUhELHNFQUdDO0FBRUQsTUFBYSx1QkFBdUI7SUFFbEMsWUFBbUIsT0FBZTtRQUFmLFlBQU8sR0FBUCxPQUFPLENBQVE7UUFEekIsU0FBSSxHQUFHLG1CQUFtQixDQUFDLHVCQUF1QixDQUFDO0lBQ3RCLENBQUM7Q0FDeEM7QUFIRCwwREFHQztBQUNELE1BQWEsOEJBQThCO0lBRXpDLFlBQW1CLE9BQWlCO1FBQWpCLFlBQU8sR0FBUCxPQUFPLENBQVU7UUFEM0IsU0FBSSxHQUFHLG1CQUFtQixDQUFDLDhCQUE4QixDQUFDO0lBQzNCLENBQUM7Q0FDMUM7QUFIRCx3RUFHQztBQUNELE1BQWEsbUNBQW1DO0lBQWhEO1FBQ1csU0FBSSxHQUFHLG1CQUFtQixDQUFDLDRCQUE0QixDQUFDO0lBQ25FLENBQUM7Q0FBQTtBQUZELGtGQUVDIn0=