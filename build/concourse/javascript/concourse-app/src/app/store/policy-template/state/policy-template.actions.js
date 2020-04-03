"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PolicyTemplateActionTypes;
(function (PolicyTemplateActionTypes) {
    PolicyTemplateActionTypes["GetPolicyTemplatesByCategory"] = "[PolicyTemplate] Get Policy Templates By Category";
    PolicyTemplateActionTypes["LoadPolicyTemplates"] = "[PolicyTemplate] Load Policy Templates";
    PolicyTemplateActionTypes["LoadPolicyTemplatesSuccess"] = "[PolicyTemplate] Load Policy Templates Success";
    PolicyTemplateActionTypes["LoadPolicyTemplatesFailure"] = "[PolicyTemplate] Load Policy Templates Failure";
    PolicyTemplateActionTypes["LoadPolicyTemplate"] = "[PolicyTemplate] Load Policy Template";
    PolicyTemplateActionTypes["LoadPolicyTemplateSuccess"] = "[PolicyTemplate] Load Policy Template Success";
    PolicyTemplateActionTypes["LoadPolicyTemplateFailure"] = "[PolicyTemplate] Load Policy Template Failure";
    PolicyTemplateActionTypes["SelectPolicyTemplate"] = "[PolicyTemplate] Select Policy Template";
    PolicyTemplateActionTypes["SearchPolicyTemplate"] = "[PolicyTemplate] Search Policy Template";
    PolicyTemplateActionTypes["SearchPolicyTemplateSuccess"] = "[PolicyTemplate] Search Policy Template Success";
    PolicyTemplateActionTypes["ResetPolicyTemplateResults"] = "[PolicyTemplate] Reset Search Results";
})(PolicyTemplateActionTypes = exports.PolicyTemplateActionTypes || (exports.PolicyTemplateActionTypes = {}));
class GetPolicyTemplatesByCategory {
    constructor(payload) {
        this.payload = payload;
        this.type = PolicyTemplateActionTypes.GetPolicyTemplatesByCategory;
    }
}
exports.GetPolicyTemplatesByCategory = GetPolicyTemplatesByCategory;
class LoadPolicyTemplates {
    constructor() {
        this.type = PolicyTemplateActionTypes.LoadPolicyTemplates;
    }
}
exports.LoadPolicyTemplates = LoadPolicyTemplates;
class LoadPolicyTemplatesSuccess {
    constructor(payload) {
        this.payload = payload;
        this.type = PolicyTemplateActionTypes.LoadPolicyTemplatesSuccess;
    }
}
exports.LoadPolicyTemplatesSuccess = LoadPolicyTemplatesSuccess;
class LoadPolicyTemplatesFailure {
    constructor() {
        this.type = PolicyTemplateActionTypes.LoadPolicyTemplatesFailure;
    }
}
exports.LoadPolicyTemplatesFailure = LoadPolicyTemplatesFailure;
class LoadPolicyTemplate {
    constructor(payload) {
        this.payload = payload;
        this.type = PolicyTemplateActionTypes.LoadPolicyTemplate;
    }
}
exports.LoadPolicyTemplate = LoadPolicyTemplate;
class LoadPolicyTemplateSuccess {
    constructor(payload) {
        this.payload = payload;
        this.type = PolicyTemplateActionTypes.LoadPolicyTemplateSuccess;
    }
}
exports.LoadPolicyTemplateSuccess = LoadPolicyTemplateSuccess;
class LoadPolicyTemplateFailure {
    constructor() {
        this.type = PolicyTemplateActionTypes.LoadPolicyTemplateFailure;
    }
}
exports.LoadPolicyTemplateFailure = LoadPolicyTemplateFailure;
class SelectPolicyTemplate {
    constructor(payload) {
        this.payload = payload;
        this.type = PolicyTemplateActionTypes.SelectPolicyTemplate;
    }
}
exports.SelectPolicyTemplate = SelectPolicyTemplate;
class SearchPolicyTemplate {
    constructor(payload) {
        this.payload = payload;
        this.type = PolicyTemplateActionTypes.SearchPolicyTemplate;
    }
}
exports.SearchPolicyTemplate = SearchPolicyTemplate;
class SearchPolicyTemplateSuccess {
    constructor(payload) {
        this.payload = payload;
        this.type = PolicyTemplateActionTypes.SearchPolicyTemplateSuccess;
    }
}
exports.SearchPolicyTemplateSuccess = SearchPolicyTemplateSuccess;
class ResetPolicyTemplateResults {
    constructor() {
        this.type = PolicyTemplateActionTypes.ResetPolicyTemplateResults;
    }
}
exports.ResetPolicyTemplateResults = ResetPolicyTemplateResults;
LoadPolicyTemplatesFailure;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9saWN5LXRlbXBsYXRlLmFjdGlvbnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9jb25jb3Vyc2UvamF2YXNjcmlwdC9jb25jb3Vyc2UtYXBwL3NyYy9hcHAvc3RvcmUvcG9saWN5LXRlbXBsYXRlL3N0YXRlL3BvbGljeS10ZW1wbGF0ZS5hY3Rpb25zLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBSUEsSUFBWSx5QkFrQlg7QUFsQkQsV0FBWSx5QkFBeUI7SUFFbkMsK0dBQWtGLENBQUE7SUFFbEYsMkZBQThELENBQUE7SUFDOUQsMEdBQTZFLENBQUE7SUFDN0UsMEdBQTZFLENBQUE7SUFFN0UseUZBQTRELENBQUE7SUFDNUQsd0dBQTJFLENBQUE7SUFDM0Usd0dBQTJFLENBQUE7SUFFM0UsNkZBQWdFLENBQUE7SUFFaEUsNkZBQWdFLENBQUE7SUFDaEUsNEdBQStFLENBQUE7SUFFL0UsaUdBQW9FLENBQUE7QUFDdEUsQ0FBQyxFQWxCVyx5QkFBeUIsR0FBekIsaUNBQXlCLEtBQXpCLGlDQUF5QixRQWtCcEM7QUFFRCxNQUFhLDRCQUE0QjtJQUV2QyxZQUFtQixPQUFlO1FBQWYsWUFBTyxHQUFQLE9BQU8sQ0FBUTtRQUR6QixTQUFJLEdBQUcseUJBQXlCLENBQUMsNEJBQTRCLENBQUM7SUFDakMsQ0FBQztDQUN4QztBQUhELG9FQUdDO0FBRUQsTUFBYSxtQkFBbUI7SUFBaEM7UUFDVyxTQUFJLEdBQUcseUJBQXlCLENBQUMsbUJBQW1CLENBQUM7SUFDaEUsQ0FBQztDQUFBO0FBRkQsa0RBRUM7QUFDRCxNQUFhLDBCQUEwQjtJQUVyQyxZQUFtQixPQUF5QjtRQUF6QixZQUFPLEdBQVAsT0FBTyxDQUFrQjtRQURuQyxTQUFJLEdBQUcseUJBQXlCLENBQUMsMEJBQTBCLENBQUM7SUFDckIsQ0FBQztDQUNsRDtBQUhELGdFQUdDO0FBQ0QsTUFBYSwwQkFBMEI7SUFBdkM7UUFDVyxTQUFJLEdBQUcseUJBQXlCLENBQUMsMEJBQTBCLENBQUM7SUFDdkUsQ0FBQztDQUFBO0FBRkQsZ0VBRUM7QUFFRCxNQUFhLGtCQUFrQjtJQUU3QixZQUFtQixPQUFlO1FBQWYsWUFBTyxHQUFQLE9BQU8sQ0FBUTtRQUR6QixTQUFJLEdBQUcseUJBQXlCLENBQUMsa0JBQWtCLENBQUM7SUFDdkIsQ0FBQztDQUN4QztBQUhELGdEQUdDO0FBQ0QsTUFBYSx5QkFBeUI7SUFFcEMsWUFBbUIsT0FBdUI7UUFBdkIsWUFBTyxHQUFQLE9BQU8sQ0FBZ0I7UUFEakMsU0FBSSxHQUFHLHlCQUF5QixDQUFDLHlCQUF5QixDQUFDO0lBQ3RCLENBQUM7Q0FDaEQ7QUFIRCw4REFHQztBQUNELE1BQWEseUJBQXlCO0lBQXRDO1FBQ1csU0FBSSxHQUFHLHlCQUF5QixDQUFDLHlCQUF5QixDQUFDO0lBQ3RFLENBQUM7Q0FBQTtBQUZELDhEQUVDO0FBRUQsTUFBYSxvQkFBb0I7SUFFL0IsWUFBbUIsT0FBZTtRQUFmLFlBQU8sR0FBUCxPQUFPLENBQVE7UUFEekIsU0FBSSxHQUFHLHlCQUF5QixDQUFDLG9CQUFvQixDQUFDO0lBQ3pCLENBQUM7Q0FDeEM7QUFIRCxvREFHQztBQUVELE1BQWEsb0JBQW9CO0lBRS9CLFlBQW1CLE9BQWU7UUFBZixZQUFPLEdBQVAsT0FBTyxDQUFRO1FBRHpCLFNBQUksR0FBRyx5QkFBeUIsQ0FBQyxvQkFBb0IsQ0FBQztJQUN6QixDQUFDO0NBQ3hDO0FBSEQsb0RBR0M7QUFDRCxNQUFhLDJCQUEyQjtJQUV0QyxZQUFtQixPQUFpQjtRQUFqQixZQUFPLEdBQVAsT0FBTyxDQUFVO1FBRDNCLFNBQUksR0FBRyx5QkFBeUIsQ0FBQywyQkFBMkIsQ0FBQztJQUM5QixDQUFDO0NBQzFDO0FBSEQsa0VBR0M7QUFFRCxNQUFhLDBCQUEwQjtJQUF2QztRQUNXLFNBQUksR0FBRyx5QkFBeUIsQ0FBQywwQkFBMEIsQ0FBQztJQUN2RSxDQUFDO0NBQUE7QUFGRCxnRUFFQztBQWNELDBCQUEwQixDQUFBIn0=