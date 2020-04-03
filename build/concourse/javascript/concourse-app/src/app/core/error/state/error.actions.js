"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ApplicationErrorActionTypes;
(function (ApplicationErrorActionTypes) {
    ApplicationErrorActionTypes["AddApplicationError"] = "[Application Error] Add Application Error";
    ApplicationErrorActionTypes["DispatchedApplicationError"] = "[Application Error] Dispatched Application Error";
    ApplicationErrorActionTypes["DismissApplicationError"] = "[Application Error] Dismiss Application Error";
    ApplicationErrorActionTypes["DismissApplicationErrorByDisplayType"] = "[Application Error] Dismiss Application Error By Display Type";
})(ApplicationErrorActionTypes = exports.ApplicationErrorActionTypes || (exports.ApplicationErrorActionTypes = {}));
class AddApplicationError {
    constructor(payload) {
        this.payload = payload;
        this.type = ApplicationErrorActionTypes.AddApplicationError;
    }
}
exports.AddApplicationError = AddApplicationError;
class DispatchedApplicationError {
    constructor(payload) {
        this.payload = payload;
        this.type = ApplicationErrorActionTypes.DispatchedApplicationError;
    }
}
exports.DispatchedApplicationError = DispatchedApplicationError;
class DismissApplicationError {
    constructor(payload) {
        this.payload = payload;
        this.type = ApplicationErrorActionTypes.DismissApplicationError;
    }
}
exports.DismissApplicationError = DismissApplicationError;
class DismissApplicationErrorByDisplayType {
    constructor(payload) {
        this.payload = payload;
        this.type = ApplicationErrorActionTypes.DismissApplicationErrorByDisplayType;
    }
}
exports.DismissApplicationErrorByDisplayType = DismissApplicationErrorByDisplayType;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXJyb3IuYWN0aW9ucy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL2NvbmNvdXJzZS9qYXZhc2NyaXB0L2NvbmNvdXJzZS1hcHAvc3JjL2FwcC9jb3JlL2Vycm9yL3N0YXRlL2Vycm9yLmFjdGlvbnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFJQSxJQUFZLDJCQUtYO0FBTEQsV0FBWSwyQkFBMkI7SUFDckMsZ0dBQWlFLENBQUE7SUFDakUsOEdBQStFLENBQUE7SUFDL0Usd0dBQXlFLENBQUE7SUFDekUscUlBQXNHLENBQUE7QUFDeEcsQ0FBQyxFQUxXLDJCQUEyQixHQUEzQixtQ0FBMkIsS0FBM0IsbUNBQTJCLFFBS3RDO0FBRUQsTUFBYSxtQkFBbUI7SUFFOUIsWUFBbUIsT0FBMEY7UUFBMUYsWUFBTyxHQUFQLE9BQU8sQ0FBbUY7UUFEcEcsU0FBSSxHQUFHLDJCQUEyQixDQUFDLG1CQUFtQixDQUFDO0lBQ2lELENBQUM7Q0FDbkg7QUFIRCxrREFHQztBQUVELE1BQWEsMEJBQTBCO0lBRXJDLFlBQW1CLE9BQXlCO1FBQXpCLFlBQU8sR0FBUCxPQUFPLENBQWtCO1FBRG5DLFNBQUksR0FBRywyQkFBMkIsQ0FBQywwQkFBMEIsQ0FBQztJQUN2QixDQUFDO0NBQ2xEO0FBSEQsZ0VBR0M7QUFFRCxNQUFhLHVCQUF1QjtJQUVsQyxZQUFtQixPQUFlO1FBQWYsWUFBTyxHQUFQLE9BQU8sQ0FBUTtRQUR6QixTQUFJLEdBQUcsMkJBQTJCLENBQUMsdUJBQXVCLENBQUM7SUFDOUIsQ0FBQztDQUN4QztBQUhELDBEQUdDO0FBRUQsTUFBYSxvQ0FBb0M7SUFFL0MsWUFBbUIsT0FBZTtRQUFmLFlBQU8sR0FBUCxPQUFPLENBQVE7UUFEekIsU0FBSSxHQUFHLDJCQUEyQixDQUFDLG9DQUFvQyxDQUFDO0lBQzNDLENBQUM7Q0FDeEM7QUFIRCxvRkFHQyJ9