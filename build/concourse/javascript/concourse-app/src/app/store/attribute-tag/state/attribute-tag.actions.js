"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AttributeTagActionTypes;
(function (AttributeTagActionTypes) {
    AttributeTagActionTypes["LoadAttributeTags"] = "[AttributeTag] Load AttributeTags";
    AttributeTagActionTypes["LoadAttributeTagsSuccess"] = "[AttributeTag] Load AttributeTags Success";
    AttributeTagActionTypes["LoadAttributeTagsFailure"] = "[AttributeTag] Load AttributeTags Failure";
    AttributeTagActionTypes["LoadAttributeTagsByPagination"] = "[PolicyGroup] Load Attribute Tags By Pagination";
    AttributeTagActionTypes["LoadAttributeTagsByPaginationSuccess"] = "[PolicyGroup] Load Attribute Tags By Pagination Success";
    AttributeTagActionTypes["LoadAttributeTagsByPaginationFailure"] = "[PolicyGroup] Load Attribute Tags By Pagination Failure";
    AttributeTagActionTypes["LoadAttributeTag"] = "[AttributeTag] Load AttributeTag";
    AttributeTagActionTypes["LoadAttributeTagSuccess"] = "[AttributeTag] Load AttributeTag Success";
    AttributeTagActionTypes["LoadAttributeTagFailure"] = "[AttributeTag] Load AttributeTag Failure";
    AttributeTagActionTypes["SelectAttributeTag"] = "[AttributeTag] Select AttributeTag";
    AttributeTagActionTypes["CreateAttributeTag"] = "[AttributeTag] Create AttributeTag";
    AttributeTagActionTypes["CreateAttributeTagSuccess"] = "[AttributeTag] Create AttributeTag Success";
    AttributeTagActionTypes["CreateAttributeTagFailure"] = "[AttributeTag] Create AttributeTag Failure";
    AttributeTagActionTypes["UpdateAttributeTag"] = "[AttributeTag] Update AttributeTag";
    AttributeTagActionTypes["UpdateAttributeTagSuccess"] = "[AttributeTag] Update AttributeTag Success";
    AttributeTagActionTypes["UpdateAttributeTagFailure"] = "[AttributeTag] Update AttributeTag Failure";
    AttributeTagActionTypes["DeleteAttributeTag"] = "[AttributeTag] Delete AttributeTag";
    AttributeTagActionTypes["DeleteAttributeTagSuccess"] = "[AttributeTag] Delete AttributeTag Success";
    AttributeTagActionTypes["DeleteAttributeTagFailure"] = "[AttributeTag] Delete AttributeTag Failure";
    AttributeTagActionTypes["SearchAttributeTags"] = "[AttributeTag] Search AttributeTags";
    AttributeTagActionTypes["SearchAttributeTagsSuccess"] = "[AttributeTag] Search AttributeTags Success";
    AttributeTagActionTypes["ResetAttributeTagSearch"] = "[AttributeTag] Reset AttributeTag Search";
})(AttributeTagActionTypes = exports.AttributeTagActionTypes || (exports.AttributeTagActionTypes = {}));
class LoadAttributeTags {
    constructor() {
        this.type = AttributeTagActionTypes.LoadAttributeTags;
    }
}
exports.LoadAttributeTags = LoadAttributeTags;
class LoadAttributeTagsSuccess {
    constructor(payload) {
        this.payload = payload;
        this.type = AttributeTagActionTypes.LoadAttributeTagsSuccess;
    }
}
exports.LoadAttributeTagsSuccess = LoadAttributeTagsSuccess;
class LoadAttributeTagsFailure {
    constructor() {
        this.type = AttributeTagActionTypes.LoadAttributeTagsFailure;
    }
}
exports.LoadAttributeTagsFailure = LoadAttributeTagsFailure;
class LoadAttributeTagsByPagination {
    constructor(payload) {
        this.payload = payload;
        this.type = AttributeTagActionTypes.LoadAttributeTagsByPagination;
    }
}
exports.LoadAttributeTagsByPagination = LoadAttributeTagsByPagination;
class LoadAttributeTagsByPaginationSuccess {
    constructor(payload) {
        this.payload = payload;
        this.type = AttributeTagActionTypes.LoadAttributeTagsByPaginationSuccess;
    }
}
exports.LoadAttributeTagsByPaginationSuccess = LoadAttributeTagsByPaginationSuccess;
class LoadAttributeTagsByPaginationFailure {
    constructor() {
        this.type = AttributeTagActionTypes.LoadAttributeTagsByPaginationFailure;
    }
}
exports.LoadAttributeTagsByPaginationFailure = LoadAttributeTagsByPaginationFailure;
class SelectAttributeTag {
    constructor(payload) {
        this.payload = payload;
        this.type = AttributeTagActionTypes.SelectAttributeTag;
    }
}
exports.SelectAttributeTag = SelectAttributeTag;
class LoadAttributeTag {
    constructor(payload) {
        this.payload = payload;
        this.type = AttributeTagActionTypes.LoadAttributeTag;
    }
}
exports.LoadAttributeTag = LoadAttributeTag;
class LoadAttributeTagSuccess {
    constructor(payload) {
        this.payload = payload;
        this.type = AttributeTagActionTypes.LoadAttributeTagSuccess;
    }
}
exports.LoadAttributeTagSuccess = LoadAttributeTagSuccess;
class LoadAttributeTagFailure {
    constructor() {
        this.type = AttributeTagActionTypes.LoadAttributeTagFailure;
    }
}
exports.LoadAttributeTagFailure = LoadAttributeTagFailure;
class CreateAttributeTag {
    constructor(payload) {
        this.payload = payload;
        this.type = AttributeTagActionTypes.CreateAttributeTag;
    }
}
exports.CreateAttributeTag = CreateAttributeTag;
class CreateAttributeTagSuccess {
    constructor(payload) {
        this.payload = payload;
        this.type = AttributeTagActionTypes.CreateAttributeTagSuccess;
    }
}
exports.CreateAttributeTagSuccess = CreateAttributeTagSuccess;
class CreateAttributeTagFailure {
    constructor() {
        this.type = AttributeTagActionTypes.CreateAttributeTagFailure;
    }
}
exports.CreateAttributeTagFailure = CreateAttributeTagFailure;
class UpdateAttributeTag {
    constructor(payload) {
        this.payload = payload;
        this.type = AttributeTagActionTypes.UpdateAttributeTag;
    }
}
exports.UpdateAttributeTag = UpdateAttributeTag;
class UpdateAttributeTagSuccess {
    constructor(payload) {
        this.payload = payload;
        this.type = AttributeTagActionTypes.UpdateAttributeTagSuccess;
    }
}
exports.UpdateAttributeTagSuccess = UpdateAttributeTagSuccess;
class UpdateAttributeTagFailure {
    constructor() {
        this.type = AttributeTagActionTypes.UpdateAttributeTagFailure;
    }
}
exports.UpdateAttributeTagFailure = UpdateAttributeTagFailure;
class DeleteAttributeTag {
    constructor(payload) {
        this.payload = payload;
        this.type = AttributeTagActionTypes.DeleteAttributeTag;
    }
}
exports.DeleteAttributeTag = DeleteAttributeTag;
class DeleteAttributeTagSuccess {
    constructor(payload) {
        this.payload = payload;
        this.type = AttributeTagActionTypes.DeleteAttributeTagSuccess;
    }
}
exports.DeleteAttributeTagSuccess = DeleteAttributeTagSuccess;
class DeleteAttributeTagFailure {
    constructor() {
        this.type = AttributeTagActionTypes.DeleteAttributeTagFailure;
    }
}
exports.DeleteAttributeTagFailure = DeleteAttributeTagFailure;
class SearchAttributeTags {
    constructor(payload) {
        this.payload = payload;
        this.type = AttributeTagActionTypes.SearchAttributeTags;
    }
}
exports.SearchAttributeTags = SearchAttributeTags;
class SearchAttributeTagsSuccess {
    constructor(payload) {
        this.payload = payload;
        this.type = AttributeTagActionTypes.SearchAttributeTagsSuccess;
    }
}
exports.SearchAttributeTagsSuccess = SearchAttributeTagsSuccess;
class ResetAttributeTagSearch {
    constructor() {
        this.type = AttributeTagActionTypes.ResetAttributeTagSearch;
    }
}
exports.ResetAttributeTagSearch = ResetAttributeTagSearch;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXR0cmlidXRlLXRhZy5hY3Rpb25zLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vY29uY291cnNlL2phdmFzY3JpcHQvY29uY291cnNlLWFwcC9zcmMvYXBwL3N0b3JlL2F0dHJpYnV0ZS10YWcvc3RhdGUvYXR0cmlidXRlLXRhZy5hY3Rpb25zLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBR0EsSUFBWSx1QkE4Qlg7QUE5QkQsV0FBWSx1QkFBdUI7SUFDakMsa0ZBQXVELENBQUE7SUFDdkQsaUdBQXNFLENBQUE7SUFDdEUsaUdBQXNFLENBQUE7SUFFdEUsNEdBQWlGLENBQUE7SUFDakYsMkhBQWdHLENBQUE7SUFDaEcsMkhBQWdHLENBQUE7SUFFaEcsZ0ZBQXFELENBQUE7SUFDckQsK0ZBQW9FLENBQUE7SUFDcEUsK0ZBQW9FLENBQUE7SUFFcEUsb0ZBQXlELENBQUE7SUFFekQsb0ZBQXlELENBQUE7SUFDekQsbUdBQXdFLENBQUE7SUFDeEUsbUdBQXdFLENBQUE7SUFFeEUsb0ZBQXlELENBQUE7SUFDekQsbUdBQXdFLENBQUE7SUFDeEUsbUdBQXdFLENBQUE7SUFFeEUsb0ZBQXlELENBQUE7SUFDekQsbUdBQXdFLENBQUE7SUFDeEUsbUdBQXdFLENBQUE7SUFFeEUsc0ZBQTJELENBQUE7SUFDM0QscUdBQTBFLENBQUE7SUFDMUUsK0ZBQW9FLENBQUE7QUFDdEUsQ0FBQyxFQTlCVyx1QkFBdUIsR0FBdkIsK0JBQXVCLEtBQXZCLCtCQUF1QixRQThCbEM7QUFFRCxNQUFhLGlCQUFpQjtJQUE5QjtRQUNXLFNBQUksR0FBRyx1QkFBdUIsQ0FBQyxpQkFBaUIsQ0FBQztJQUM1RCxDQUFDO0NBQUE7QUFGRCw4Q0FFQztBQUNELE1BQWEsd0JBQXdCO0lBRW5DLFlBQW1CLE9BQXVCO1FBQXZCLFlBQU8sR0FBUCxPQUFPLENBQWdCO1FBRGpDLFNBQUksR0FBRyx1QkFBdUIsQ0FBQyx3QkFBd0IsQ0FB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