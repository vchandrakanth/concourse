"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ToastActionTypes;
(function (ToastActionTypes) {
    ToastActionTypes["OpenToast"] = "[Toast] Open Toast";
    ToastActionTypes["OpenApplicationErrorToast"] = "[Toast] Open Application Error Toast";
})(ToastActionTypes = exports.ToastActionTypes || (exports.ToastActionTypes = {}));
class OpenToast {
    constructor(payload) {
        this.payload = payload;
        this.type = ToastActionTypes.OpenToast;
    }
}
exports.OpenToast = OpenToast;
class OpenApplicationErrorToast {
    constructor(payload) {
        this.payload = payload;
        this.type = ToastActionTypes.OpenApplicationErrorToast;
    }
}
exports.OpenApplicationErrorToast = OpenApplicationErrorToast;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9hc3QuYWN0aW9ucy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL2NvbmNvdXJzZS9qYXZhc2NyaXB0L2NvbmNvdXJzZS1hcHAvc3JjL2FwcC9jb3JlL3RvYXN0L3RvYXN0LmFjdGlvbnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFHQSxJQUFZLGdCQUdYO0FBSEQsV0FBWSxnQkFBZ0I7SUFDMUIsb0RBQWdDLENBQUE7SUFDaEMsc0ZBQWtFLENBQUE7QUFDcEUsQ0FBQyxFQUhXLGdCQUFnQixHQUFoQix3QkFBZ0IsS0FBaEIsd0JBQWdCLFFBRzNCO0FBRUQsTUFBYSxTQUFTO0lBRXBCLFlBQW1CLE9BQWM7UUFBZCxZQUFPLEdBQVAsT0FBTyxDQUFPO1FBRHhCLFNBQUksR0FBRyxnQkFBZ0IsQ0FBQyxTQUFTLENBQUM7SUFDTixDQUFDO0NBQ3ZDO0FBSEQsOEJBR0M7QUFFRCxNQUFhLHlCQUF5QjtJQUVwQyxZQUFtQixPQUFxQztRQUFyQyxZQUFPLEdBQVAsT0FBTyxDQUE4QjtRQUQvQyxTQUFJLEdBQUcsZ0JBQWdCLENBQUMseUJBQXlCLENBQUM7SUFDQyxDQUFDO0NBQzlEO0FBSEQsOERBR0MifQ==