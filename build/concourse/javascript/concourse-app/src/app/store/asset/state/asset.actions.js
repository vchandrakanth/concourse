"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AssetsActionTypes;
(function (AssetsActionTypes) {
    AssetsActionTypes["LoadAssets"] = "[Asset] Load Assets";
    AssetsActionTypes["LoadAssetsByType"] = "[Asset] Load Assets By Type";
    AssetsActionTypes["LoadAssetsByTypeSuccess"] = "[Asset] Load Assets By Type Success";
    AssetsActionTypes["LoadAssetsByTypeFailure"] = "[Asset] Load Assets By Type Failure";
    AssetsActionTypes["LoadAssetsByPagination"] = "[PolicyGroup] Load Assets By Pagination";
    AssetsActionTypes["LoadAssetsByPaginationSuccess"] = "[PolicyGroup] Load Assets By Pagination Success";
    AssetsActionTypes["LoadAssetsByPaginationFailure"] = "[PolicyGroup] Load Assets By Pagination Failure";
    AssetsActionTypes["LoadAssetsByLineageId"] = "[Asset] Load Assets By Lineage ID";
    AssetsActionTypes["LoadAssetsByLineageIdSuccess"] = "[Asset] Load Assets By Lineage ID Success";
    AssetsActionTypes["LoadAssetsByLineageIdFailure"] = "[Asset] Load Assets By Lineage ID Failure";
    AssetsActionTypes["LoadAsset"] = "[Asset] Load Asset";
    AssetsActionTypes["LoadAssetSuccess"] = "[Asset] Load Asset Success";
    AssetsActionTypes["LoadAssetFailure"] = "[Asset] Load Asset Failure";
    AssetsActionTypes["SelectAsset"] = "[Asset] Select Asset";
    AssetsActionTypes["SearchAssets"] = "[Asset] Search Search Assets";
    AssetsActionTypes["SearchAssetsSuccess"] = "[Asset] Search Assets Success";
    AssetsActionTypes["ResetAssetsSearchResults"] = "[Asset] Reset Search Results";
    AssetsActionTypes["CreateEnclaveModel"] = "[Asset] Create Enclave Model";
    AssetsActionTypes["CreateEnclaveModelSuccess"] = "[Asset] Create Enclave Model Success";
    AssetsActionTypes["CreateEnclaveModelFailure"] = "[Asset] Create Enclave Model Failure";
    AssetsActionTypes["ResolveCFTResource"] = "[Asset] Resolve Cloud Formation Template Resources";
    AssetsActionTypes["ResolveCFTResourceSuccess"] = "[Asset] Resolve Cloud Formation Template Resources Success";
    AssetsActionTypes["ResolveCFTResourceFailure"] = "[Asset] Resolve Cloud Formation Template Resources Failure";
    AssetsActionTypes["UpdateEnclaveModel"] = "[Asset] Update Enclave Model";
    AssetsActionTypes["UpdateEnclaveModelSuccess"] = "[Asset] Update Enclave Model Success";
    AssetsActionTypes["UpdateEnclaveModelFailure"] = "[Asset] Update Enclave Model Failure";
    AssetsActionTypes["DeleteEnclaveModel"] = "[Asset] Delete Enclave Model";
    AssetsActionTypes["DeleteEnclaveModelSuccess"] = "[Asset] Delete Enclave Model Success";
    AssetsActionTypes["DeleteEnclaveModelFailure"] = "[Asset] Delete Enclave Model Failure";
})(AssetsActionTypes = exports.AssetsActionTypes || (exports.AssetsActionTypes = {}));
class LoadAssets {
    constructor(payload = { includeTemplates: false }) {
        this.payload = payload;
        this.type = AssetsActionTypes.LoadAssets;
    }
}
exports.LoadAssets = LoadAssets;
class LoadAssetsByType {
    constructor(payload) {
        this.payload = payload;
        this.type = AssetsActionTypes.LoadAssetsByType;
    }
}
exports.LoadAssetsByType = LoadAssetsByType;
class LoadAssetsByTypeSuccess {
    constructor(payload) {
        this.payload = payload;
        this.type = AssetsActionTypes.LoadAssetsByTypeSuccess;
    }
}
exports.LoadAssetsByTypeSuccess = LoadAssetsByTypeSuccess;
class LoadAssetsByTypeFailure {
    constructor() {
        this.type = AssetsActionTypes.LoadAssetsByTypeFailure;
    }
}
exports.LoadAssetsByTypeFailure = LoadAssetsByTypeFailure;
class LoadAssetsByPagination {
    constructor(payload) {
        this.payload = payload;
        this.type = AssetsActionTypes.LoadAssetsByPagination;
    }
}
exports.LoadAssetsByPagination = LoadAssetsByPagination;
class LoadAssetsByPaginationSuccess {
    constructor(payload) {
        this.payload = payload;
        this.type = AssetsActionTypes.LoadAssetsByPaginationSuccess;
    }
}
exports.LoadAssetsByPaginationSuccess = LoadAssetsByPaginationSuccess;
class LoadAssetsByPaginationFailure {
    constructor() {
        this.type = AssetsActionTypes.LoadAssetsByPaginationFailure;
    }
}
exports.LoadAssetsByPaginationFailure = LoadAssetsByPaginationFailure;
class LoadAssetsByLineageId {
    constructor(payload) {
        this.payload = payload;
        this.type = AssetsActionTypes.LoadAssetsByLineageId;
    }
}
exports.LoadAssetsByLineageId = LoadAssetsByLineageId;
class LoadAssetsByLineageIdSuccess {
    constructor(payload) {
        this.payload = payload;
        this.type = AssetsActionTypes.LoadAssetsByLineageIdSuccess;
    }
}
exports.LoadAssetsByLineageIdSuccess = LoadAssetsByLineageIdSuccess;
class LoadAssetsByLineageIdFailure {
    constructor() {
        this.type = AssetsActionTypes.LoadAssetsByLineageIdFailure;
    }
}
exports.LoadAssetsByLineageIdFailure = LoadAssetsByLineageIdFailure;
class LoadAsset {
    constructor(payload) {
        this.payload = payload;
        this.type = AssetsActionTypes.LoadAsset;
    }
}
exports.LoadAsset = LoadAsset;
class LoadAssetSuccess {
    constructor(payload) {
        this.payload = payload;
        this.type = AssetsActionTypes.LoadAssetSuccess;
    }
}
exports.LoadAssetSuccess = LoadAssetSuccess;
class LoadAssetFailure {
    constructor() {
        this.type = AssetsActionTypes.LoadAssetFailure;
    }
}
exports.LoadAssetFailure = LoadAssetFailure;
class SelectAsset {
    constructor(payload) {
        this.payload = payload;
        this.type = AssetsActionTypes.SelectAsset;
    }
}
exports.SelectAsset = SelectAsset;
class SearchAssets {
    constructor(payload) {
        this.payload = payload;
        this.type = AssetsActionTypes.SearchAssets;
    }
}
exports.SearchAssets = SearchAssets;
class SearchAssetsSuccess {
    constructor(payload) {
        this.payload = payload;
        this.type = AssetsActionTypes.SearchAssetsSuccess;
    }
}
exports.SearchAssetsSuccess = SearchAssetsSuccess;
class ResetAssetsSearchResults {
    constructor() {
        this.type = AssetsActionTypes.ResetAssetsSearchResults;
    }
}
exports.ResetAssetsSearchResults = ResetAssetsSearchResults;
class ResolveCFTResource {
    constructor(payload) {
        this.payload = payload;
        this.type = AssetsActionTypes.ResolveCFTResource;
    }
}
exports.ResolveCFTResource = ResolveCFTResource;
class ResolveCFTResourceSuccess {
    constructor(payload) {
        this.payload = payload;
        this.type = AssetsActionTypes.ResolveCFTResourceSuccess;
    }
}
exports.ResolveCFTResourceSuccess = ResolveCFTResourceSuccess;
class ResolveCFTResourceFailure {
    constructor() {
        this.type = AssetsActionTypes.ResolveCFTResourceFailure;
    }
}
exports.ResolveCFTResourceFailure = ResolveCFTResourceFailure;
class CreateEnclaveModel {
    constructor(payload) {
        this.payload = payload;
        this.type = AssetsActionTypes.CreateEnclaveModel;
    }
}
exports.CreateEnclaveModel = CreateEnclaveModel;
class CreateEnclaveModelSuccess {
    constructor(payload) {
        this.payload = payload;
        this.type = AssetsActionTypes.CreateEnclaveModelSuccess;
    }
}
exports.CreateEnclaveModelSuccess = CreateEnclaveModelSuccess;
class CreateEnclaveModelFailure {
    constructor() {
        this.type = AssetsActionTypes.CreateEnclaveModelFailure;
    }
}
exports.CreateEnclaveModelFailure = CreateEnclaveModelFailure;
class UpdateEnclaveModel {
    constructor(payload) {
        this.payload = payload;
        this.type = AssetsActionTypes.UpdateEnclaveModel;
    }
}
exports.UpdateEnclaveModel = UpdateEnclaveModel;
class UpdateEnclaveModelSuccess {
    constructor(payload) {
        this.payload = payload;
        this.type = AssetsActionTypes.UpdateEnclaveModelSuccess;
    }
}
exports.UpdateEnclaveModelSuccess = UpdateEnclaveModelSuccess;
class UpdateEnclaveModelFailure {
    constructor() {
        this.type = AssetsActionTypes.UpdateEnclaveModelFailure;
    }
}
exports.UpdateEnclaveModelFailure = UpdateEnclaveModelFailure;
class DeleteEnclaveModel {
    constructor(payload) {
        this.payload = payload;
        this.type = AssetsActionTypes.DeleteEnclaveModel;
    }
}
exports.DeleteEnclaveModel = DeleteEnclaveModel;
class DeleteEnclaveModelSuccess {
    constructor(payload) {
        this.payload = payload;
        this.type = AssetsActionTypes.DeleteEnclaveModelSuccess;
    }
}
exports.DeleteEnclaveModelSuccess = DeleteEnclaveModelSuccess;
class DeleteEnclaveModelFailure {
    constructor() {
        this.type = AssetsActionTypes.DeleteEnclaveModelFailure;
    }
}
exports.DeleteEnclaveModelFailure = DeleteEnclaveModelFailure;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXNzZXQuYWN0aW9ucy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL2NvbmNvdXJzZS9qYXZhc2NyaXB0L2NvbmNvdXJzZS1hcHAvc3JjL2FwcC9zdG9yZS9hc3NldC9zdGF0ZS9hc3NldC5hY3Rpb25zLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBSUEsSUFBWSxpQkF3Q1g7QUF4Q0QsV0FBWSxpQkFBaUI7SUFDM0IsdURBQWtDLENBQUE7SUFFbEMscUVBQWdELENBQUE7SUFDaEQsb0ZBQStELENBQUE7SUFDL0Qsb0ZBQStELENBQUE7SUFFL0QsdUZBQWtFLENBQUE7SUFDbEUsc0dBQWlGLENBQUE7SUFDakYsc0dBQWlGLENBQUE7SUFFakYsZ0ZBQTJELENBQUE7SUFDM0QsK0ZBQTBFLENBQUE7SUFDMUUsK0ZBQTBFLENBQUE7SUFFMUUscURBQWdDLENBQUE7SUFDaEMsb0VBQStDLENBQUE7SUFDL0Msb0VBQStDLENBQUE7SUFFL0MseURBQW9DLENBQUE7SUFFcEMsa0VBQTZDLENBQUE7SUFDN0MsMEVBQXFELENBQUE7SUFDckQsOEVBQXlELENBQUE7SUFFekQsd0VBQW1ELENBQUE7SUFDbkQsdUZBQWtFLENBQUE7SUFDbEUsdUZBQWtFLENBQUE7SUFFbEUsOEZBQXlFLENBQUE7SUFDekUsNkdBQXdGLENBQUE7SUFDeEYsNkdBQXdGLENBQUE7SUFFeEYsd0VBQW1ELENBQUE7SUFDbkQsdUZBQWtFLENBQUE7SUFDbEUsdUZBQWtFLENBQUE7SUFFbEUsd0VBQW1ELENBQUE7SUFDbkQsdUZBQWtFLENBQUE7SUFDbEUsdUZBQWtFLENBQUE7QUFDcEUsQ0FBQyxFQXhDVyxpQkFBaUIsR0FBakIseUJBQWlCLEtBQWpCLHlCQUFpQixRQXdDNUI7QUFFRCxNQUFhLFVBQVU7SUFFckIsWUFBbUIsVUFBVSxFQUFFLGdCQUFnQixFQUFFLEtBQUssRUFBRTtRQUFyQyxZQUFPLEdBQVAsT0FBTyxDQUE4QjtR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