"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SurfaceActionTypes;
(function (SurfaceActionTypes) {
    SurfaceActionTypes["LoadSurfaces"] = "[Surface] Load Surfaces";
    SurfaceActionTypes["LoadSurfacesSuccess"] = "[Surface] Load Surfaces Success";
    SurfaceActionTypes["LoadSurfacesFailure"] = "[Surface] Load Surfaces Failure";
    SurfaceActionTypes["LoadSurface"] = "[Surface] Load Surface";
    SurfaceActionTypes["LoadSurfaceSuccess"] = "[Surface] Load Surface Success";
    SurfaceActionTypes["LoadSurfaceFailure"] = "[Surface] Load Surface Failure";
    SurfaceActionTypes["SelectSurface"] = "[Surface] Select Surface";
    SurfaceActionTypes["CreateSurface"] = "[Surface] Create Surface";
    SurfaceActionTypes["CreateSurfaceSuccess"] = "[Surface] Create Surface Success";
    SurfaceActionTypes["CreateSurfaceFailure"] = "[Surface] Create Surface Failure";
    SurfaceActionTypes["UpdateSurface"] = "[Surface] Update Surface";
    SurfaceActionTypes["UpdateSurfaceSuccess"] = "[Surface] Update Surface Success";
    SurfaceActionTypes["UpdateSurfaceFailure"] = "[Surface] Update Surface Failure";
    SurfaceActionTypes["DeleteSurface"] = "[Surface] Delete Surface";
    SurfaceActionTypes["DeleteSurfaceSuccess"] = "[Surface] Delete Surface Success";
    SurfaceActionTypes["DeleteSurfaceFailure"] = "[Surface] Delete Surface Failure";
})(SurfaceActionTypes = exports.SurfaceActionTypes || (exports.SurfaceActionTypes = {}));
class LoadSurfaces {
    constructor() {
        this.type = SurfaceActionTypes.LoadSurfaces;
    }
}
exports.LoadSurfaces = LoadSurfaces;
class LoadSurfacesSuccess {
    constructor(payload) {
        this.payload = payload;
        this.type = SurfaceActionTypes.LoadSurfacesSuccess;
    }
}
exports.LoadSurfacesSuccess = LoadSurfacesSuccess;
class LoadSurfacesFailure {
    constructor() {
        this.type = SurfaceActionTypes.LoadSurfacesFailure;
    }
}
exports.LoadSurfacesFailure = LoadSurfacesFailure;
class LoadSurface {
    constructor(payload) {
        this.payload = payload;
        this.type = SurfaceActionTypes.LoadSurface;
    }
}
exports.LoadSurface = LoadSurface;
class LoadSurfaceSuccess {
    constructor(payload) {
        this.payload = payload;
        this.type = SurfaceActionTypes.LoadSurfaceSuccess;
    }
}
exports.LoadSurfaceSuccess = LoadSurfaceSuccess;
class LoadSurfaceFailure {
    constructor() {
        this.type = SurfaceActionTypes.LoadSurfaceFailure;
    }
}
exports.LoadSurfaceFailure = LoadSurfaceFailure;
class SelectSurface {
    // payload = Surface.id
    constructor(payload) {
        this.payload = payload;
        this.type = SurfaceActionTypes.SelectSurface;
    }
}
exports.SelectSurface = SelectSurface;
class CreateSurface {
    constructor(payload) {
        this.payload = payload;
        this.type = SurfaceActionTypes.CreateSurface;
    }
}
exports.CreateSurface = CreateSurface;
class CreateSurfaceSuccess {
    constructor(payload) {
        this.payload = payload;
        this.type = SurfaceActionTypes.CreateSurfaceSuccess;
    }
}
exports.CreateSurfaceSuccess = CreateSurfaceSuccess;
class CreateSurfaceFailure {
    constructor() {
        this.type = SurfaceActionTypes.CreateSurfaceFailure;
    }
}
exports.CreateSurfaceFailure = CreateSurfaceFailure;
class UpdateSurface {
    constructor(payload) {
        this.payload = payload;
        this.type = SurfaceActionTypes.UpdateSurface;
    }
}
exports.UpdateSurface = UpdateSurface;
class UpdateSurfaceSuccess {
    constructor(payload) {
        this.payload = payload;
        this.type = SurfaceActionTypes.UpdateSurfaceSuccess;
    }
}
exports.UpdateSurfaceSuccess = UpdateSurfaceSuccess;
class UpdateSurfaceFailure {
    constructor() {
        this.type = SurfaceActionTypes.UpdateSurfaceFailure;
    }
}
exports.UpdateSurfaceFailure = UpdateSurfaceFailure;
class DeleteSurface {
    // payload = Surface.id
    constructor(payload) {
        this.payload = payload;
        this.type = SurfaceActionTypes.DeleteSurface;
    }
}
exports.DeleteSurface = DeleteSurface;
class DeleteSurfaceSuccess {
    // payload = Surface.id
    constructor(payload) {
        this.payload = payload;
        this.type = SurfaceActionTypes.DeleteSurfaceSuccess;
    }
}
exports.DeleteSurfaceSuccess = DeleteSurfaceSuccess;
class DeleteSurfaceFailure {
    constructor() {
        this.type = SurfaceActionTypes.DeleteSurfaceFailure;
    }
}
exports.DeleteSurfaceFailure = DeleteSurfaceFailure;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3VyZmFjZS5hY3Rpb25zLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vY29uY291cnNlL2phdmFzY3JpcHQvY29uY291cnNlLWFwcC9zcmMvYXBwL3N0b3JlL3N1cmZhY2Uvc3RhdGUvc3VyZmFjZS5hY3Rpb25zLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBTUEsSUFBWSxrQkFzQlg7QUF0QkQsV0FBWSxrQkFBa0I7SUFDNUIsOERBQXdDLENBQUE7SUFDeEMsNkVBQXVELENBQUE7SUFDdkQsNkVBQXVELENBQUE7SUFFdkQsNERBQXNDLENBQUE7SUFDdEMsMkVBQXFELENBQUE7SUFDckQsMkVBQXFELENBQUE7SUFFckQsZ0VBQTBDLENBQUE7SUFFMUMsZ0VBQTBDLENBQUE7SUFDMUMsK0VBQXlELENBQUE7SUFDekQsK0VBQXlELENBQUE7SUFFekQsZ0VBQTBDLENBQUE7SUFDMUMsK0VBQXlELENBQUE7SUFDekQsK0VBQXlELENBQUE7SUFFekQsZ0VBQTBDLENBQUE7SUFDMUMsK0VBQXlELENBQUE7SUFDekQsK0VBQXlELENBQUE7QUFDM0QsQ0FBQyxFQXRCVyxrQkFBa0IsR0FBbEIsMEJBQWtCLEtBQWxCLDBCQUFrQixRQXNCN0I7QUFFRCxNQUFhLFlBQVk7SUFBekI7UUFDVyxTQUFJLEdBQUcsa0JBQWtCLENBQUMsWUFBWSxDQUFDO0lBQ2xELENBQUM7Q0FBQTtBQUZELG9DQUVDO0FBQ0QsTUFBYSxtQkFBbUI7SUFFOUIsWUFBbUIsT0FBa0I7UUFBbEIsWUFBTyxHQUFQLE9BQU8sQ0FBVztRQUQ1QixTQUFJLEdBQUcsa0JBQWtCLENBQUMsbUJBQW1CLENBQUM7SUFDZCxDQUFDO0NBQzNDO0FBSEQsa0RBR0M7QUFDRCxNQUFhLG1CQUFtQjtJQUFoQztRQUNXLFNBQUksR0FBRyxrQkFBa0IsQ0FBQyxtQkFBbUIsQ0FBQztJQUN6RCxDQUFDO0NBQUE7QUFGRCxrREFFQztBQUVELE1BQWEsV0FB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