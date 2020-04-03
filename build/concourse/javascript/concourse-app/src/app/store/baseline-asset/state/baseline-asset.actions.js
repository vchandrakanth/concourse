"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ActionTypes;
(function (ActionTypes) {
    ActionTypes["LoadBaselineAssets"] = "[Baseline Asset] Load Baseline Assets";
    ActionTypes["LoadBaselineAssetsSuccess"] = "[Baseline Asset] Load Baseline Assets Success";
    ActionTypes["LoadBaselineAssetsFailure"] = "[Baseline Asset] Load Baseline Assets Failure";
    ActionTypes["LoadBaselineAssetsByPagination"] = "[PolicyGroup] Load Baseline Assets By Pagination";
    ActionTypes["LoadBaselineAssetsByPaginationSuccess"] = "[PolicyGroup] Load Baseline Assets By Pagination Success";
    ActionTypes["LoadBaselineAssetsByPaginationFailure"] = "[PolicyGroup] Load Baseline Assets By Pagination Failure";
    ActionTypes["LoadBaselineAsset"] = "[Baseline Asset] Load Baseline Asset";
    ActionTypes["LoadBaselineAssetSuccess"] = "[Baseline Asset] Load Baseline Asset Success";
    ActionTypes["LoadBaselineAssetFailure"] = "[Baseline Asset] Load Baseline Asset Failure";
    ActionTypes["LoadBaselineAssetStats"] = "[Baseline Asset] Load Baseline Stats Asset";
    ActionTypes["LoadBaselineAssetStatsSuccess"] = "[Baseline Asset] Load Baseline Asset Stats Success";
    ActionTypes["LoadBaselineAssetStatsFailure"] = "[Baseline Asset] Load Baseline Asset Stats Failure";
    ActionTypes["LoadBaselineAssetContent"] = "[Baseline Asset] Load Baseline Summary Asset";
    ActionTypes["LoadBaselineAssetContentSuccess"] = "[Baseline Asset] Load Baseline Asset Summary Success";
    ActionTypes["LoadBaselineAssetContentFailure"] = "[Baseline Asset] Load Baseline Asset Summary Failure";
    ActionTypes["LoadBaselineAssetOverview"] = "[Baseline Asset] Load Baseline Overview";
    ActionTypes["LoadBaselineAssetOverviewSuccess"] = "[Baseline Asset] Load Baseline Overview Success";
    ActionTypes["LoadBaselineAssetOverviewFailure"] = "[Baseline Asset] Load Baseline Overview Failure";
    ActionTypes["CreateBaselineAsset"] = "[Baseline Asset] Create Baseline Asset";
    ActionTypes["CreateBaselineAssetSuccess"] = "[Baseline Asset] Create Baseline Asset Success";
    ActionTypes["CreateBaselineAssetFailure"] = "[Baseline Asset] Create Baseline Asset Failure";
    ActionTypes["DeleteBaselineAsset"] = "[Baseline Asset] Delete Baseline Asset";
    ActionTypes["DeleteBaselineAssetSuccess"] = "[Baseline Asset] Delete Baseline Asset Success";
    ActionTypes["DeleteBaselineAssetFailure"] = "[Baseline Asset] Delete Baseline Asset Failure";
    ActionTypes["UpdateBaselineAsset"] = "[Baseline Asset] Update Baseline Asset";
    ActionTypes["UpdateBaselineAssetSuccess"] = "[Baseline Asset] Update Baseline Asset Success";
    ActionTypes["UpdateBaselineAssetFailure"] = "[Baseline Asset] Update Baseline Asset Failure";
    ActionTypes["SelectBaselineAsset"] = "[Baseline Asset] Select Baseline Asset";
    ActionTypes["UpdateBaselineAzure"] = "[Baseline Asset] UpdateBaselineAzure";
    ActionTypes["UpdateBaselineAws"] = "[Baseline Asset] UpdateBaselineAws";
})(ActionTypes = exports.ActionTypes || (exports.ActionTypes = {}));
class LoadBaselineAssets {
    constructor() {
        this.type = ActionTypes.LoadBaselineAssets;
    }
}
exports.LoadBaselineAssets = LoadBaselineAssets;
class LoadBaselineAssetsSuccess {
    constructor(payload) {
        this.payload = payload;
        this.type = ActionTypes.LoadBaselineAssetsSuccess;
    }
}
exports.LoadBaselineAssetsSuccess = LoadBaselineAssetsSuccess;
class LoadBaselineAssetsFailure {
    constructor() {
        this.type = ActionTypes.LoadBaselineAssetsFailure;
    }
}
exports.LoadBaselineAssetsFailure = LoadBaselineAssetsFailure;
class LoadBaselineAssetsByPagination {
    constructor(payload) {
        this.payload = payload;
        this.type = ActionTypes.LoadBaselineAssetsByPagination;
    }
}
exports.LoadBaselineAssetsByPagination = LoadBaselineAssetsByPagination;
class LoadBaselineAssetsByPaginationSuccess {
    constructor(payload) {
        this.payload = payload;
        this.type = ActionTypes.LoadBaselineAssetsByPaginationSuccess;
    }
}
exports.LoadBaselineAssetsByPaginationSuccess = LoadBaselineAssetsByPaginationSuccess;
class LoadBaselineAssetsByPaginationFailure {
    constructor() {
        this.type = ActionTypes.LoadBaselineAssetsByPaginationFailure;
    }
}
exports.LoadBaselineAssetsByPaginationFailure = LoadBaselineAssetsByPaginationFailure;
class CreateBaselineAsset {
    constructor(payload) {
        this.payload = payload;
        this.type = ActionTypes.CreateBaselineAsset;
    }
}
exports.CreateBaselineAsset = CreateBaselineAsset;
class CreateBaselineAssetSuccess {
    constructor(payload) {
        this.payload = payload;
        this.type = ActionTypes.CreateBaselineAssetSuccess;
    }
}
exports.CreateBaselineAssetSuccess = CreateBaselineAssetSuccess;
class CreateBaselineAssetFailure {
    constructor() {
        this.type = ActionTypes.CreateBaselineAssetFailure;
    }
}
exports.CreateBaselineAssetFailure = CreateBaselineAssetFailure;
class UpdateBaselineAsset {
    constructor(payload) {
        this.payload = payload;
        this.type = ActionTypes.UpdateBaselineAsset;
    }
}
exports.UpdateBaselineAsset = UpdateBaselineAsset;
class UpdateBaselineAssetSuccess {
    constructor(payload) {
        this.payload = payload;
        this.type = ActionTypes.UpdateBaselineAssetSuccess;
    }
}
exports.UpdateBaselineAssetSuccess = UpdateBaselineAssetSuccess;
class UpdateBaselineAssetFailure {
    constructor() {
        this.type = ActionTypes.UpdateBaselineAssetFailure;
    }
}
exports.UpdateBaselineAssetFailure = UpdateBaselineAssetFailure;
class UpdateBaselineAzure {
    constructor(payload) {
        this.payload = payload;
        this.type = ActionTypes.UpdateBaselineAzure;
    }
}
exports.UpdateBaselineAzure = UpdateBaselineAzure;
class UpdateBaselineAws {
    constructor(payload) {
        this.payload = payload;
        this.type = ActionTypes.UpdateBaselineAws;
    }
}
exports.UpdateBaselineAws = UpdateBaselineAws;
class DeleteBaselineAsset {
    constructor(payload) {
        this.payload = payload;
        this.type = ActionTypes.DeleteBaselineAsset;
    }
}
exports.DeleteBaselineAsset = DeleteBaselineAsset;
class DeleteBaselineAssetSuccess {
    constructor(payload) {
        this.payload = payload;
        this.type = ActionTypes.DeleteBaselineAssetSuccess;
    }
}
exports.DeleteBaselineAssetSuccess = DeleteBaselineAssetSuccess;
class DeleteBaselineAssetFailure {
    constructor() {
        this.type = ActionTypes.DeleteBaselineAssetFailure;
    }
}
exports.DeleteBaselineAssetFailure = DeleteBaselineAssetFailure;
class LoadBaselineAsset {
    constructor(payload) {
        this.payload = payload;
        this.type = ActionTypes.LoadBaselineAsset;
    }
}
exports.LoadBaselineAsset = LoadBaselineAsset;
class LoadBaselineAssetSuccess {
    constructor(payload) {
        this.payload = payload;
        this.type = ActionTypes.LoadBaselineAssetSuccess;
    }
}
exports.LoadBaselineAssetSuccess = LoadBaselineAssetSuccess;
class LoadBaselineAssetFailure {
    constructor() {
        this.type = ActionTypes.LoadBaselineAssetFailure;
    }
}
exports.LoadBaselineAssetFailure = LoadBaselineAssetFailure;
class LoadBaselineAssetStats {
    constructor(payload) {
        this.payload = payload;
        this.type = ActionTypes.LoadBaselineAssetStats;
    }
}
exports.LoadBaselineAssetStats = LoadBaselineAssetStats;
class LoadBaselineAssetStatsSuccess {
    constructor(payload) {
        this.payload = payload;
        this.type = ActionTypes.LoadBaselineAssetStatsSuccess;
    }
}
exports.LoadBaselineAssetStatsSuccess = LoadBaselineAssetStatsSuccess;
class LoadBaselineAssetStatsFailure {
    constructor() {
        this.type = ActionTypes.LoadBaselineAssetStatsFailure;
    }
}
exports.LoadBaselineAssetStatsFailure = LoadBaselineAssetStatsFailure;
class LoadBaselineAssetContent {
    constructor(payload) {
        this.payload = payload;
        this.type = ActionTypes.LoadBaselineAssetContent;
    }
}
exports.LoadBaselineAssetContent = LoadBaselineAssetContent;
class LoadBaselineAssetContentSuccess {
    constructor(payload) {
        this.payload = payload;
        this.type = ActionTypes.LoadBaselineAssetContentSuccess;
    }
}
exports.LoadBaselineAssetContentSuccess = LoadBaselineAssetContentSuccess;
class LoadBaselineAssetContentFailure {
    constructor() {
        this.type = ActionTypes.LoadBaselineAssetContentFailure;
    }
}
exports.LoadBaselineAssetContentFailure = LoadBaselineAssetContentFailure;
class LoadBaselineAssetOverview {
    constructor(payload) {
        this.payload = payload;
        this.type = ActionTypes.LoadBaselineAssetOverview;
    }
}
exports.LoadBaselineAssetOverview = LoadBaselineAssetOverview;
class LoadBaselineAssetOverviewSuccess {
    constructor(payload) {
        this.payload = payload;
        this.type = ActionTypes.LoadBaselineAssetOverviewSuccess;
    }
}
exports.LoadBaselineAssetOverviewSuccess = LoadBaselineAssetOverviewSuccess;
class LoadBaselineAssetOverviewFailure {
    constructor() {
        this.type = ActionTypes.LoadBaselineAssetOverviewFailure;
    }
}
exports.LoadBaselineAssetOverviewFailure = LoadBaselineAssetOverviewFailure;
class SelectBaselineAsset {
    constructor(payload) {
        this.payload = payload;
        this.type = ActionTypes.SelectBaselineAsset;
    }
}
exports.SelectBaselineAsset = SelectBaselineAsset;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzZWxpbmUtYXNzZXQuYWN0aW9ucy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL2NvbmNvdXJzZS9qYXZhc2NyaXB0L2NvbmNvdXJzZS1hcHAvc3JjL2FwcC9zdG9yZS9iYXNlbGluZS1hc3NldC9zdGF0ZS9iYXNlbGluZS1hc3NldC5hY3Rpb25zLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBR0EsSUFBWSxXQXlDWDtBQXpDRCxXQUFZLFdBQVc7SUFDckIsMkVBQTRELENBQUE7SUFDNUQsMEZBQTJFLENBQUE7SUFDM0UsMEZBQTJFLENBQUE7SUFFM0Usa0dBQW1GLENBQUE7SUFDbkYsaUhBQWtHLENBQUE7SUFDbEcsaUhBQWtHLENBQUE7SUFFbEcseUVBQTBELENBQUE7SUFDMUQsd0ZBQXlFLENBQUE7SUFDekUsd0ZBQXlFLENBQUE7SUFFekUsb0ZBQXFFLENBQUE7SUFDckUsbUdBQW9GLENBQUE7SUFDcEYsbUdBQW9GLENBQUE7SUFFcEYsd0ZBQXlFLENBQUE7SUFDekUsdUdBQXdGLENBQUE7SUFDeEYsdUdBQXdGLENBQUE7SUFFeEYsb0ZBQXFFLENBQUE7SUFDckUsbUdBQW9GLENBQUE7SUFDcEYsbUdBQW9GLENBQUE7SUFFcEYsNkVBQThELENBQUE7SUFDOUQsNEZBQTZFLENBQUE7SUFDN0UsNEZBQTZFLENBQUE7SUFFN0UsNkVBQThELENBQUE7SUFDOUQsNEZBQTZFLENBQUE7SUFDN0UsNEZBQTZFLENBQUE7SUFFN0UsNkVBQThELENBQUE7SUFDOUQsNEZBQTZFLENBQUE7SUFDN0UsNEZBQTZFLENBQUE7SUFFN0UsNkVBQThELENBQUE7SUFFOUQsMkVBQTRELENBQUE7SUFDNUQsdUVBQXdELENBQUE7QUFDMUQsQ0FBQyxFQXpDVyxXQUFXLEdBQVgsbUJBQVcsS0FBWCxtQkFBVyxRQXlDdEI7QUFFRCxNQUFhLGtCQUFrQjtJQUEvQjtRQUNXLFNBQUksR0FBRyxXQUFXLENBQUMsa0JB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