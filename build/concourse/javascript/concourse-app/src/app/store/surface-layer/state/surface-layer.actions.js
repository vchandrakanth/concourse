"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SurfaceLayerActionTypes;
(function (SurfaceLayerActionTypes) {
    SurfaceLayerActionTypes["LoadSurfaceLayers"] = "[SurfaceLayer] Load SurfaceLayers";
    SurfaceLayerActionTypes["LoadSurfaceLayersSuccess"] = "[SurfaceLayer] Load SurfaceLayers Success";
    SurfaceLayerActionTypes["LoadSurfaceLayersFailure"] = "[SurfaceLayer] Load SurfaceLayers Failure";
    SurfaceLayerActionTypes["AddSurfaceLayer"] = "[SurfaceLayer] Add SurfaceLayer";
    SurfaceLayerActionTypes["AddSurfaceLayerSuccess"] = "[SurfaceLayer] Add SurfaceLayer Success";
    SurfaceLayerActionTypes["AddSurfaceLayerFailure"] = "[SurfaceLayer] Add SurfaceLayer Failure";
    SurfaceLayerActionTypes["SelectSurfaceLayer"] = "[SurfaceLayer] Select SurfaceLayer";
    SurfaceLayerActionTypes["ToggleCollapsedSurfaceLayer"] = "[SurfaceLayer] Toggle Toggle Collapsed SurfaceLayer";
    SurfaceLayerActionTypes["UpdateSurfaceLayer"] = "[SurfaceLayer] Update SurfaceLayer";
    SurfaceLayerActionTypes["UpdateSurfaceLayerSuccess"] = "[SurfaceLayer] Update SurfaceLayer Success";
    SurfaceLayerActionTypes["UpdateSurfaceLayerFailure"] = "[SurfaceLayer] Update SurfaceLayer Failure";
    SurfaceLayerActionTypes["RemoveSurfaceLayer"] = "[SurfaceLayer] Remove SurfaceLayer";
    SurfaceLayerActionTypes["RemoveSurfaceLayerSuccess"] = "[SurfaceLayer] Remove SurfaceLayer Success";
    SurfaceLayerActionTypes["RemoveSurfaceLayerFailure"] = "[SurfaceLayer] Remove SurfaceLayer Failure";
})(SurfaceLayerActionTypes = exports.SurfaceLayerActionTypes || (exports.SurfaceLayerActionTypes = {}));
class LoadSurfaceLayers {
    constructor() {
        this.type = SurfaceLayerActionTypes.LoadSurfaceLayers;
    }
}
exports.LoadSurfaceLayers = LoadSurfaceLayers;
class LoadSurfaceLayersSuccess {
    constructor(payload) {
        this.payload = payload;
        this.type = SurfaceLayerActionTypes.LoadSurfaceLayersSuccess;
    }
}
exports.LoadSurfaceLayersSuccess = LoadSurfaceLayersSuccess;
class LoadSurfaceLayersFailure {
    constructor() {
        this.type = SurfaceLayerActionTypes.LoadSurfaceLayersFailure;
    }
}
exports.LoadSurfaceLayersFailure = LoadSurfaceLayersFailure;
class SelectSurfaceLayer {
    constructor(payload) {
        this.payload = payload;
        this.type = SurfaceLayerActionTypes.SelectSurfaceLayer;
    }
}
exports.SelectSurfaceLayer = SelectSurfaceLayer;
class ToggleCollapsedSurfaceLayer {
    // payload=surfaceLayerId
    constructor(payload) {
        this.payload = payload;
        this.type = SurfaceLayerActionTypes.ToggleCollapsedSurfaceLayer;
    }
}
exports.ToggleCollapsedSurfaceLayer = ToggleCollapsedSurfaceLayer;
class AddSurfaceLayer {
    constructor(payload) {
        this.payload = payload;
        this.type = SurfaceLayerActionTypes.AddSurfaceLayer;
    }
}
exports.AddSurfaceLayer = AddSurfaceLayer;
class AddSurfaceLayerSuccess {
    constructor(payload) {
        this.payload = payload;
        this.type = SurfaceLayerActionTypes.AddSurfaceLayerSuccess;
    }
}
exports.AddSurfaceLayerSuccess = AddSurfaceLayerSuccess;
class AddSurfaceLayerFailure {
    constructor() {
        this.type = SurfaceLayerActionTypes.AddSurfaceLayerFailure;
    }
}
exports.AddSurfaceLayerFailure = AddSurfaceLayerFailure;
class UpdateSurfaceLayer {
    constructor(payload) {
        this.payload = payload;
        this.type = SurfaceLayerActionTypes.UpdateSurfaceLayer;
    }
}
exports.UpdateSurfaceLayer = UpdateSurfaceLayer;
class UpdateSurfaceLayerSuccess {
    constructor(payload) {
        this.payload = payload;
        this.type = SurfaceLayerActionTypes.UpdateSurfaceLayerSuccess;
    }
}
exports.UpdateSurfaceLayerSuccess = UpdateSurfaceLayerSuccess;
class UpdateSurfaceLayerFailure {
    constructor() {
        this.type = SurfaceLayerActionTypes.UpdateSurfaceLayerFailure;
    }
}
exports.UpdateSurfaceLayerFailure = UpdateSurfaceLayerFailure;
class RemoveSurfaceLayer {
    constructor(payload) {
        this.payload = payload;
        this.type = SurfaceLayerActionTypes.RemoveSurfaceLayer;
    }
}
exports.RemoveSurfaceLayer = RemoveSurfaceLayer;
class RemoveSurfaceLayerSuccess {
    constructor(payload) {
        this.payload = payload;
        this.type = SurfaceLayerActionTypes.RemoveSurfaceLayerSuccess;
    }
}
exports.RemoveSurfaceLayerSuccess = RemoveSurfaceLayerSuccess;
class RemoveSurfaceLayerFailure {
    constructor() {
        this.type = SurfaceLayerActionTypes.RemoveSurfaceLayerFailure;
    }
}
exports.RemoveSurfaceLayerFailure = RemoveSurfaceLayerFailure;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3VyZmFjZS1sYXllci5hY3Rpb25zLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vY29uY291cnNlL2phdmFzY3JpcHQvY29uY291cnNlLWFwcC9zcmMvYXBwL3N0b3JlL3N1cmZhY2UtbGF5ZXIvc3RhdGUvc3VyZmFjZS1sYXllci5hY3Rpb25zLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBSUEsSUFBWSx1QkFvQlg7QUFwQkQsV0FBWSx1QkFBdUI7SUFDakMsa0ZBQXVELENBQUE7SUFDdkQsaUdBQXNFLENBQUE7SUFDdEUsaUdBQXNFLENBQUE7SUFFdEUsOEVBQW1ELENBQUE7SUFDbkQsNkZBQWtFLENBQUE7SUFDbEUsNkZBQWtFLENBQUE7SUFFbEUsb0ZBQXlELENBQUE7SUFFekQsOEdBQW1GLENBQUE7SUFFbkYsb0ZBQXlELENBQUE7SUFDekQsbUdBQXdFLENBQUE7SUFDeEUsbUdBQXdFLENBQUE7SUFFeEUsb0ZBQXlELENBQUE7SUFDekQsbUdBQXdFLENBQUE7SUFDeEUsbUdBQXdFLENBQUE7QUFDMUUsQ0FBQyxFQXBCVyx1QkFBdUIsR0FBdkIsK0JBQXVCLEtBQXZCLCtCQUF1QixRQW9CbEM7QUFFRCxNQUFhLGlCQUFpQjtJQUE5QjtRQUNXLFNBQUksR0FBRyx1QkFBdUIsQ0FBQyxpQkFBaUIsQ0FBQztJQUM1RCxDQUFDO0NBQUE7QUFGRCw4Q0FFQztBQUNELE1BQWEsd0JBQXdCO0lBRW5DLFlBQW1CLE9BQXVCO1FBQXZCLFlBQU8sR0FBUCxPQUFPLENBQWdCO1FBRGpDLFNBQUksR0FBRyx1QkFBdUIsQ0FBQyx3QkFBd0IsQ0FBQztJQUNuQixDQUFDO0NBQ2hEO0FBSEQsNERBR0M7QUFDRCxNQUFhLHdCQUF3QjtJQUFyQztRQUNXLFNBQUksR0FBRyx1QkFBdUIsQ0FBQyx3QkFBd0IsQ0FBQztJQUNuRSxDQUFDO0NBQUE7QUFGRCw0REFFQztBQUVELE1BQWEsa0JBQWtCO0lBRTdCLFlBQW1CLE9BQWU7UUFBZixZQUFPLEdBQVAsT0FBTyxDQUFRO1FBRHpCLFNBQUksR0FBRyx1QkFBdUIsQ0FBQyxrQkFBa0IsQ0FBQztJQUNyQixDQUFDO0NBQ3hDO0FBSEQsZ0RBR0M7QUFFRCxNQUFhLDJCQUEyQjtJQUV0Qyx5QkFBeUI7SUFDekIsWUFBbUIsT0FBZTtRQUFmLFlBQU8sR0FBUCxPQUFPLENBQVE7UUFGekIsU0FBSSxHQUFHLHVCQUF1QixDQUFDLDJCQUEyQixDQUFDO0lBRTlCLENBQUM7Q0FDeEM7QUFKRCxrRUFJQztBQUVELE1BQWEsZUFBZTtJQUUxQixZQUFtQixPQUE4QjtRQUE5QixZQUFPLEdBQVAsT0FBTyxDQUF1QjtRQUR4QyxTQUFJLEdBQUcsdUJBQXVCLENBQUMsZUFBZSxDQUFDO0lBQ0gsQ0FBQztDQUN2RDtBQUhELDBDQUdDO0FBQ0QsTUFBYSxzQkFBc0I7SUFFakMsWUFBbUIsT0FBcUI7UUFBckIsWUFBTyxHQUFQLE9BQU8sQ0FBYztRQUQvQixTQUFJLEdBQUcsdUJBQXVCLENBQUMsc0JBQXNCLENBQUM7SUFDbkIsQ0FBQztDQUM5QztBQUhELHdEQUdDO0FBQ0QsTUFBYSxzQkFBc0I7SUFBbkM7UUFDVyxTQUFJLEdBQUcsdUJBQXVCLENBQUMsc0JBQXNCLENBQUM7SUFDakUsQ0FBQztDQUFBO0FBRkQsd0RBRUM7QUFFRCxNQUFhLGtCQUFrQjtJQUU3QixZQUFtQixPQUE4QjtRQUE5QixZQUFPLEdBQVAsT0FBTyxDQUF1QjtRQUR4QyxTQUFJLEdBQUcsdUJBQXVCLENBQUMsa0JBQWtCLENBQUM7SUFDTixDQUFDO0NBQ3ZEO0FBSEQsZ0RBR0M7QUFDRCxNQUFhLHlCQUF5QjtJQUVwQyxZQUFtQixPQUFxQjtRQUFyQixZQUFPLEdBQVAsT0FBTyxDQUFjO1FBRC9CLFNBQUksR0FBRyx1QkFBdUIsQ0FBQyx5QkFBeUIsQ0FBQztJQUN0QixDQUFDO0NBQzlDO0FBSEQsOERBR0M7QUFDRCxNQUFhLHlCQUF5QjtJQUF0QztRQUNXLFNBQUksR0FBRyx1QkFBdUIsQ0FBQyx5QkFBeUIsQ0FBQztJQUNwRSxDQUFDO0NBQUE7QUFGRCw4REFFQztBQUVELE1BQWEsa0JBQWtCO0lBRTdCLFlBQW1CLE9BQXFCO1FBQXJCLFlBQU8sR0FBUCxPQUFPLENBQWM7UUFEL0IsU0FBSSxHQUFHLHVCQUF1QixDQUFDLGtCQUFrQixDQUFDO0lBQ2YsQ0FBQztDQUM5QztBQUhELGdEQUdDO0FBQ0QsTUFBYSx5QkFBeUI7SUFFcEMsWUFBbUIsT0FBcUI7UUFBckIsWUFBTyxHQUFQLE9BQU8sQ0FBYztRQUQvQixTQUFJLEdBQUcsdUJBQXVCLENBQUMseUJBQXlCLENBQUM7SUFDdEIsQ0FBQztDQUM5QztBQUhELDhEQUdDO0FBQ0QsTUFBYSx5QkFBeUI7SUFBdEM7UUFDVyxTQUFJLEdBQUcsdUJBQXVCLENBQUMseUJBQXlCLENBQUM7SUFDcEUsQ0FBQztDQUFBO0FBRkQsOERBRUMifQ==