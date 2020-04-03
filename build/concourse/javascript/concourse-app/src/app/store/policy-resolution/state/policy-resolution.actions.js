"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PolicyResolutionTypes;
(function (PolicyResolutionTypes) {
    PolicyResolutionTypes["LoadPolicyResolutions"] = "[PolicyResolutions] Load PolicyResolutions";
    PolicyResolutionTypes["LoadPolicyResolutionsSuccess"] = "[PolicyResolutions] Load PolicyResolutions Success";
    PolicyResolutionTypes["LoadPolicyResolutionsFailure"] = "[PolicyResolutions] Load PolicyResolutions Failure";
    PolicyResolutionTypes["LoadPolicyResolution"] = "[PolicyResolutions] Load PolicyResolution";
    PolicyResolutionTypes["LoadPolicyResolutionSuccess"] = "[PolicyResolutions] Load PolicyResolution Success";
    PolicyResolutionTypes["LoadPolicyResolutionFailure"] = "[PolicyResolutions] Load PolicyResolution Failure";
    PolicyResolutionTypes["SelectPolicyResolution"] = "[PolicyResolutions] Select Policy Resolution";
    PolicyResolutionTypes["PostActionForPolicyResolution"] = "[PolicyResolutions] Post Action For Policy Resolution";
    PolicyResolutionTypes["PostActionForPolicyResolutionSuccess"] = "[PolicyResolutions] Post Action For Policy Resolution Success";
    PolicyResolutionTypes["PostActionForPolicyResolutionFailure"] = "[PolicyResolutions] Post Action For Policy Resolution Failure";
    PolicyResolutionTypes["LoadPolicyResolutionsByEntityId"] = "[PolicyResolutions] Load Policy Resolutions By Entity Id";
    PolicyResolutionTypes["LoadPolicyResolutionsByEntityIdSuccess"] = "[PolicyResolutions] Load Resolutions By Entity Id Success";
    PolicyResolutionTypes["LoadPolicyResolutionsByEntityIdFailure"] = "[PolicyResolutions] Load Policy Resolutions By Entity Id Failure";
})(PolicyResolutionTypes = exports.PolicyResolutionTypes || (exports.PolicyResolutionTypes = {}));
class LoadPolicyResolution {
    constructor(payload) {
        this.payload = payload;
        this.type = PolicyResolutionTypes.LoadPolicyResolution;
    }
}
exports.LoadPolicyResolution = LoadPolicyResolution;
class LoadPolicyResolutionSuccess {
    constructor(payload) {
        this.payload = payload;
        this.type = PolicyResolutionTypes.LoadPolicyResolutionSuccess;
    }
}
exports.LoadPolicyResolutionSuccess = LoadPolicyResolutionSuccess;
class LoadPolicyResolutionFailure {
    constructor() {
        this.type = PolicyResolutionTypes.LoadPolicyResolutionFailure;
    }
}
exports.LoadPolicyResolutionFailure = LoadPolicyResolutionFailure;
class LoadPolicyResolutions {
    constructor() {
        this.type = PolicyResolutionTypes.LoadPolicyResolutions;
    }
}
exports.LoadPolicyResolutions = LoadPolicyResolutions;
class LoadPolicyResolutionsSuccess {
    constructor(payload) {
        this.payload = payload;
        this.type = PolicyResolutionTypes.LoadPolicyResolutionsSuccess;
    }
}
exports.LoadPolicyResolutionsSuccess = LoadPolicyResolutionsSuccess;
class LoadPolicyResolutionsFailure {
    constructor() {
        this.type = PolicyResolutionTypes.LoadPolicyResolutionsFailure;
    }
}
exports.LoadPolicyResolutionsFailure = LoadPolicyResolutionsFailure;
class SelectPolicyResolution {
    constructor(payload) {
        this.payload = payload;
        this.type = PolicyResolutionTypes.SelectPolicyResolution;
    }
}
exports.SelectPolicyResolution = SelectPolicyResolution;
class PostActionForPolicyResolution {
    constructor(payload) {
        this.payload = payload;
        this.type = PolicyResolutionTypes.PostActionForPolicyResolution;
    }
}
exports.PostActionForPolicyResolution = PostActionForPolicyResolution;
class PostActionForPolicyResolutionSuccess {
    constructor(payload) {
        this.payload = payload;
        this.type = PolicyResolutionTypes.PostActionForPolicyResolutionSuccess;
    }
}
exports.PostActionForPolicyResolutionSuccess = PostActionForPolicyResolutionSuccess;
class PostActionForPolicyResolutionFailure {
    constructor() {
        this.type = PolicyResolutionTypes.PostActionForPolicyResolutionFailure;
    }
}
exports.PostActionForPolicyResolutionFailure = PostActionForPolicyResolutionFailure;
class LoadPolicyResolutionsByEntityId {
    constructor(payload) {
        this.payload = payload;
        this.type = PolicyResolutionTypes.LoadPolicyResolutionsByEntityId;
    }
}
exports.LoadPolicyResolutionsByEntityId = LoadPolicyResolutionsByEntityId;
class LoadPolicyResolutionsByEntityIdSuccess {
    constructor(payload) {
        this.payload = payload;
        this.type = PolicyResolutionTypes.LoadPolicyResolutionsByEntityIdSuccess;
    }
}
exports.LoadPolicyResolutionsByEntityIdSuccess = LoadPolicyResolutionsByEntityIdSuccess;
class LoadPolicyResolutionsByEntityIdFailure {
    constructor() {
        this.type = PolicyResolutionTypes.LoadPolicyResolutionsByEntityIdFailure;
    }
}
exports.LoadPolicyResolutionsByEntityIdFailure = LoadPolicyResolutionsByEntityIdFailure;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9saWN5LXJlc29sdXRpb24uYWN0aW9ucy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL2NvbmNvdXJzZS9qYXZhc2NyaXB0L2NvbmNvdXJzZS1hcHAvc3JjL2FwcC9zdG9yZS9wb2xpY3ktcmVzb2x1dGlvbi9zdGF0ZS9wb2xpY3ktcmVzb2x1dGlvbi5hY3Rpb25zLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBR0EsSUFBWSxxQkFrQlg7QUFsQkQsV0FBWSxxQkFBcUI7SUFDL0IsNkZBQW9FLENBQUE7SUFDcEUsNEdBQW1GLENBQUE7SUFDbkYsNEdBQW1GLENBQUE7SUFFbkYsMkZBQWtFLENBQUE7SUFDbEUsMEdBQWlGLENBQUE7SUFDakYsMEdBQWlGLENBQUE7SUFFakYsZ0dBQXVFLENBQUE7SUFFdkUsZ0hBQXVGLENBQUE7SUFDdkYsK0hBQXNHLENBQUE7SUFDdEcsK0hBQXNHLENBQUE7SUFFdEcscUhBQTRGLENBQUE7SUFDNUYsNkhBQW9HLENBQUE7SUFDcEcsb0lBQTJHLENBQUE7QUFDN0csQ0FBQyxFQWxCVyxxQkFBcUIsR0FBckIsNkJBQXFCLEtBQXJCLDZCQUFxQixRQWtCaEM7QUFFRCxNQUFhLG9CQUFvQjtJQUUvQixZQUFtQixPQUFlO1FBQWYsWUFBTyxHQUFQLE9BQU8sQ0FBUTtRQUR6QixTQUFJLEdBQUcscUJBQXFCLENBQUMsb0JBQW9CLENBQUM7SUFDckIsQ0FBQztDQUN4QztBQUhELG9EQUdDO0FBRUQsTUFBYSwyQkFBMkI7SUFFdEMsWUFBbUIsT0FBeUI7UUFBekIsWUFBTyxHQUFQLE9BQU8sQ0FBa0I7UUFEbkMsU0FBSSxHQUFHLHFCQUFxQixDQUFDLDJCQUEyQixDQUFDO0lBQ2xCLENBQUM7Q0FDbEQ7QUFIRCxrRUFHQztBQUVELE1BQWEsMkJBQTJCO0lBQXhDO1FBQ1csU0FBSSxHQUFHLHFCQUFxQixDQUFDLDJCQUEyQixDQUFDO0lBQ3BFLENBQUM7Q0FBQTtBQUZELGtFQUVDO0FBRUQsTUFBYSxxQkFBcUI7SUFBbEM7UUFDVyxTQUFJLEdBQUcscUJBQXFCLENBQUMscUJBQXFCLENBQUM7SUFDOUQsQ0FBQztDQUFBO0FBRkQsc0RBRUM7QUFFRCxNQUFhLDRCQUE0QjtJQUV2QyxZQUFtQixPQUEyQjtRQUEzQixZQUFPLEdBQVAsT0FBTyxDQUFvQjtRQURyQyxTQUFJLEdBQUcscUJBQXFCLENBQUMsNEJBQTRCLENBQUM7SUFDakIsQ0FBQztDQUNwRDtBQUhELG9FQUdDO0FBRUQsTUFBYSw0QkFBNEI7SUFBekM7UUFDVyxTQUFJLEdBQUcscUJBQXFCLENBQUMsNEJBQTRCLENBQUM7SUFDckUsQ0FBQztDQUFBO0FBRkQsb0VBRUM7QUFFRCxNQUFhLHNCQUFzQjtJQUVqQyxZQUFtQixPQUFlO1FBQWYsWUFBTyxHQUFQLE9BQU8sQ0FBUTtRQUR6QixTQUFJLEdBQUcscUJBQXFCLENBQUMsc0JBQXNCLENBQUM7SUFDdkIsQ0FBQztDQUN4QztBQUhELHdEQUdDO0FBRUQsTUFBYSw2QkFBNkI7SUFFeEMsWUFBbUIsT0FHbEI7UUFIa0IsWUFBTyxHQUFQLE9BQU8sQ0FHekI7UUFKUSxTQUFJLEdBQUcscUJBQXFCLENBQUMsNkJBQTZCLENBQUM7SUFJL0QsQ0FBQztDQUNQO0FBTkQsc0VBTUM7QUFFRCxNQUFhLG9DQUFvQztJQUUvQyxZQUFtQixPQUdsQjtRQUhrQixZQUFPLEdBQVAsT0FBTyxDQUd6QjtRQUpRLFNBQUksR0FBRyxxQkFBcUIsQ0FBQyxvQ0FBb0MsQ0FBQztJQUl0RSxDQUFDO0NBQ1A7QUFORCxvRkFNQztBQUVELE1BQWEsb0NBQW9DO0lBQWpEO1FBQ1csU0FBSSxHQUFHLHFCQUFxQixDQUFDLG9DQUFvQyxDQUFDO0lBQzdFLENBQUM7Q0FBQTtBQUZELG9GQUVDO0FBRUQsTUFBYSwrQkFBK0I7SUFFMUMsWUFBbUIsT0FHbEI7UUFIa0IsWUFBTyxHQUFQLE9BQU8sQ0FHekI7UUFKUSxTQUFJLEdBQUcscUJBQXFCLENBQUMsK0JBQStCLENBQUM7SUFJakUsQ0FBQztDQUNQO0FBTkQsMEVBTUM7QUFDRCxNQUFhLHNDQUFzQztJQUVqRCxZQUFtQixPQUEyQjtRQUEzQixZQUFPLEdBQVAsT0FBTyxDQUFvQjtRQURyQyxTQUFJLEdBQUcscUJBQXFCLENBQUMsc0NBQXNDLENBQUM7SUFDM0IsQ0FBQztDQUNwRDtBQUhELHdGQUdDO0FBQ0QsTUFBYSxzQ0FBc0M7SUFBbkQ7UUFDVyxTQUFJLEdBQUcscUJBQXFCLENBQUMsc0NBQXNDLENBQUM7SUFDL0UsQ0FBQztDQUFBO0FBRkQsd0ZBRUMifQ==