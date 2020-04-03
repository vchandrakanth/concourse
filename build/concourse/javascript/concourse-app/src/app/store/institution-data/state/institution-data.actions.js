"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var InstitutionDataActionTypes;
(function (InstitutionDataActionTypes) {
    InstitutionDataActionTypes["LoadInstitutionsData"] = "[InstitutionData] Load Institutions Data";
    InstitutionDataActionTypes["LoadInstitutionsDataSuccess"] = "[InstitutionData] Load Institutions Data Success";
    InstitutionDataActionTypes["LoadInstitutionsDataFailure"] = "[InstitutionData] Load Institutions Data Failure";
    InstitutionDataActionTypes["LoadInstitutionData"] = "[InstitutionData] Load Institution Data";
    InstitutionDataActionTypes["LoadInstitutionDataSuccess"] = "[InstitutionData] Load Institution Data Success";
    InstitutionDataActionTypes["LoadInstitutionDataFailure"] = "[InstitutionData] Load Institution Data Failure";
    InstitutionDataActionTypes["CreateInstitutionData"] = "[InstitutionData] Create Institution Data";
    InstitutionDataActionTypes["CreateInstitutionDataSuccess"] = "[InstitutionData] Create Institution Data Success";
    InstitutionDataActionTypes["CreateInstitutionDataFailure"] = "[InstitutionData] Create Institution Data Failure";
    InstitutionDataActionTypes["UpdateInstitutionData"] = "[InstitutionData] Update Institution Data";
    InstitutionDataActionTypes["UpdateInstitutionDataSuccess"] = "[InstitutionData] Update Institution Data Success";
    InstitutionDataActionTypes["UpdateInstitutionDataFailure"] = "[InstitutionData] Update Institution Data Failure";
    InstitutionDataActionTypes["DeleteInstitutionData"] = "[InstitutionData] Delete Institution Data";
    InstitutionDataActionTypes["DeleteInstitutionDataSuccess"] = "[InstitutionData] Delete Institution Data Success";
    InstitutionDataActionTypes["DeleteInstitutionDataFailure"] = "[InstitutionData] Delete Institution Data Failure";
    InstitutionDataActionTypes["SelectInstitutionData"] = "[InstitutionData] Select Institution Data";
    InstitutionDataActionTypes["LoadAzureData"] = "[Institution] Load Data Accounts";
    InstitutionDataActionTypes["LoadAzureDataSuccess"] = "[Institution] Load Azure Data Success";
    InstitutionDataActionTypes["LoadAzureDataFailure"] = "[Institution] Load Azure Data Failure";
    InstitutionDataActionTypes["LoadAzureSubscriptions"] = "[Institution] Load Azure Subscriptions";
    InstitutionDataActionTypes["LoadAzureSubscriptionsSuccess"] = "[Institution] Load Azure Subscriptions Success";
    InstitutionDataActionTypes["LoadAzureSubscriptionsFailure"] = "[Institution] Load Azure Subscriptions Failure";
})(InstitutionDataActionTypes = exports.InstitutionDataActionTypes || (exports.InstitutionDataActionTypes = {}));
class LoadInstitutionsData {
    constructor(payload) {
        this.payload = payload;
        this.type = InstitutionDataActionTypes.LoadInstitutionsData;
    }
}
exports.LoadInstitutionsData = LoadInstitutionsData;
class LoadInstitutionsDataSuccess {
    constructor(payload) {
        this.payload = payload;
        this.type = InstitutionDataActionTypes.LoadInstitutionsDataSuccess;
    }
}
exports.LoadInstitutionsDataSuccess = LoadInstitutionsDataSuccess;
class LoadInstitutionsDataFailure {
    constructor() {
        this.type = InstitutionDataActionTypes.LoadInstitutionsDataFailure;
    }
}
exports.LoadInstitutionsDataFailure = LoadInstitutionsDataFailure;
class LoadInstitutionData {
    constructor(payload) {
        this.payload = payload;
        this.type = InstitutionDataActionTypes.LoadInstitutionData;
    }
}
exports.LoadInstitutionData = LoadInstitutionData;
class LoadInstitutionDataSuccess {
    constructor(payload) {
        this.payload = payload;
        this.type = InstitutionDataActionTypes.LoadInstitutionDataSuccess;
    }
}
exports.LoadInstitutionDataSuccess = LoadInstitutionDataSuccess;
class LoadInstitutionDataFailure {
    constructor() {
        this.type = InstitutionDataActionTypes.LoadInstitutionDataFailure;
    }
}
exports.LoadInstitutionDataFailure = LoadInstitutionDataFailure;
class CreateInstitutionData {
    constructor(payload) {
        this.payload = payload;
        this.type = InstitutionDataActionTypes.CreateInstitutionData;
    }
}
exports.CreateInstitutionData = CreateInstitutionData;
class CreateInstitutionDataSuccess {
    constructor(payload) {
        this.payload = payload;
        this.type = InstitutionDataActionTypes.CreateInstitutionDataSuccess;
    }
}
exports.CreateInstitutionDataSuccess = CreateInstitutionDataSuccess;
class CreateInstitutionDataFailure {
    constructor() {
        this.type = InstitutionDataActionTypes.CreateInstitutionDataFailure;
    }
}
exports.CreateInstitutionDataFailure = CreateInstitutionDataFailure;
class UpdateInstitutionData {
    constructor(payload) {
        this.payload = payload;
        this.type = InstitutionDataActionTypes.UpdateInstitutionData;
    }
}
exports.UpdateInstitutionData = UpdateInstitutionData;
class UpdateInstitutionDataSuccess {
    constructor(payload) {
        this.payload = payload;
        this.type = InstitutionDataActionTypes.UpdateInstitutionDataSuccess;
    }
}
exports.UpdateInstitutionDataSuccess = UpdateInstitutionDataSuccess;
class UpdateInstitutionDataFailure {
    constructor() {
        this.type = InstitutionDataActionTypes.UpdateInstitutionDataFailure;
    }
}
exports.UpdateInstitutionDataFailure = UpdateInstitutionDataFailure;
class DeleteInstitutionData {
    constructor(payload) {
        this.payload = payload;
        this.type = InstitutionDataActionTypes.DeleteInstitutionData;
    }
}
exports.DeleteInstitutionData = DeleteInstitutionData;
class DeleteInstitutionDataSuccess {
    constructor(payload) {
        this.payload = payload;
        this.type = InstitutionDataActionTypes.DeleteInstitutionDataSuccess;
    }
}
exports.DeleteInstitutionDataSuccess = DeleteInstitutionDataSuccess;
class DeleteInstitutionDataFailure {
    constructor() {
        this.type = InstitutionDataActionTypes.DeleteInstitutionDataFailure;
    }
}
exports.DeleteInstitutionDataFailure = DeleteInstitutionDataFailure;
class SelectInstitutionData {
    constructor(payload) {
        this.payload = payload;
        this.type = InstitutionDataActionTypes.SelectInstitutionData;
    }
}
exports.SelectInstitutionData = SelectInstitutionData;
class LoadAzureData {
    constructor(payload) {
        this.payload = payload;
        this.type = InstitutionDataActionTypes.LoadAzureData;
    }
}
exports.LoadAzureData = LoadAzureData;
class LoadAzureDataSuccess {
    constructor(payload) {
        this.payload = payload;
        this.type = InstitutionDataActionTypes.LoadAzureDataSuccess;
    }
}
exports.LoadAzureDataSuccess = LoadAzureDataSuccess;
class LoadAzureDataFailure {
    constructor() {
        this.type = InstitutionDataActionTypes.LoadAzureDataFailure;
    }
}
exports.LoadAzureDataFailure = LoadAzureDataFailure;
class LoadAzureSubscriptions {
    constructor() {
        this.type = InstitutionDataActionTypes.LoadAzureSubscriptions;
    }
}
exports.LoadAzureSubscriptions = LoadAzureSubscriptions;
class LoadAzureSubscriptionsSuccess {
    constructor(payload) {
        this.payload = payload;
        this.type = InstitutionDataActionTypes.LoadAzureSubscriptionsSuccess;
    }
}
exports.LoadAzureSubscriptionsSuccess = LoadAzureSubscriptionsSuccess;
class LoadAzureSubscriptionsFailure {
    constructor() {
        this.type = InstitutionDataActionTypes.LoadAzureSubscriptionsFailure;
    }
}
exports.LoadAzureSubscriptionsFailure = LoadAzureSubscriptionsFailure;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5zdGl0dXRpb24tZGF0YS5hY3Rpb25zLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vY29uY291cnNlL2phdmFzY3JpcHQvY29uY291cnNlLWFwcC9zcmMvYXBwL3N0b3JlL2luc3RpdHV0aW9uLWRhdGEvc3RhdGUvaW5zdGl0dXRpb24tZGF0YS5hY3Rpb25zLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBVUEsSUFBWSwwQkE4Qlg7QUE5QkQsV0FBWSwwQkFBMEI7SUFDcEMsK0ZBQWlFLENBQUE7SUFDakUsOEdBQWdGLENBQUE7SUFDaEYsOEdBQWdGLENBQUE7SUFFaEYsNkZBQStELENBQUE7SUFDL0QsNEdBQThFLENBQUE7SUFDOUUsNEdBQThFLENBQUE7SUFFOUUsaUdBQW1FLENBQUE7SUFDbkUsZ0hBQWtGLENBQUE7SUFDbEYsZ0hBQWtGLENBQUE7SUFFbEYsaUdBQW1FLENBQUE7SUFDbkUsZ0hBQWtGLENBQUE7SUFDbEYsZ0hBQWtGLENBQUE7SUFFbEYsaUdBQW1FLENBQUE7SUFDbkUsZ0hBQWtGLENBQUE7SUFDbEYsZ0hBQWtGLENBQUE7SUFFbEYsaUdBQW1FLENBQUE7SUFFbkUsZ0ZBQWtELENBQUE7SUFDbEQsNEZBQThELENBQUE7SUFDOUQsNEZBQThELENBQUE7SUFFOUQsK0ZBQWlFLENBQUE7SUFDakUsOEdBQWdGLENBQUE7SUFDaEYsOEdBQWdGLENBQUE7QUFDbEYsQ0FBQyxFQTlCVywwQkFBMEIsR0FBMUIsa0NBQTBCLEtBQTFCLGtDQUEwQixRQThCckM7QUFFRCxNQUFhLG9CQUFvQjtJQUUvQixZQUFtQixPQUE4QjtRQUE5QixZQUFPLEdBQVAsT0FBTyxDQUF1QjtRQUR4QyxTQUFJLEdBQUcsMEJBQTBCLENBQUMsb0JBQW9CLENBQUM7SUFDWCxDQUFDO0NBQ3ZEO0FBSEQsb0RBR0M7QUFDRCxNQUFhLDJCQUEyQjtJQUV0QyxZQUFtQixPQUEwQjtRQUExQixZQUFPLEdBQVAsT0FBTyxDQUFtQjtRQURwQyxTQUFJLEdBQUcsMEJBQTBCLENBQUMsMkJBQTJCLENBQUM7SUFDdEIsQ0FBQztDQUNuRDtBQUhELGtFQUdDO0FBQ0QsTUFBYSwyQkFBMkI7SUFBeEM7UUFDVyxTQUFJLEdBQUcsMEJBQTBCLENBQUMsMkJBQTJCLENBQUM7SUFDekUsQ0FBQztDQUFBO0FBRkQsa0VBRUM7QUFFRCxNQUFhLG1CQUFtQjtJQUU5QixZQUFtQixPQUF1RDtRQUF2RCxZQUFPLEdBQVAsT0FBTyxDQUFnRDtRQURqRSxTQUFJLEdBQUcsMEJBQTBCLENBQUMsbUJBQW1CLENBQUM7SUFDZSxDQUFDO0NBQ2hGO0FBSEQsa0RBR0M7QUFDRCxNQUFhLDBCQUEwQjtJQUVyQyxZQUFtQixPQUF3QjtRQUF4QixZQUFPLEdBQVAsT0FBTyxDQUFpQjtRQURsQyxTQUFJLEdBQUcsMEJBQTBCLENBQUMsMEJBQTBCLENBQUM7SUFDdkIsQ0FBQztDQUNqRDtBQUhELGdFQUdDO0FBQ0QsTUFBYSwwQkFBMEI7SUFBdkM7UUFDVyxTQUFJLEdBQUcsMEJBQTBCLENBQUMsMEJBQTBCLENBQUM7SUFDeEUsQ0FBQztDQUFBO0FBRkQsZ0VBRUM7QUFFRCxNQUFhLHFCQUFxQjtJQUVoQyxZQUFtQixPQUFpRTtRQUFqRSxZQUFPLEdBQVAsT0FBTyxDQUEwRDtRQUQzRSxTQUFJLEdBQUcsMEJBQTBCLENBQUMscUJBQXFCLENBQUM7SUFDdUIsQ0FBQztDQUMxRjtBQUhELHNEQUdDO0FBQ0QsTUFBYSw0QkFBNEI7SUFFdkMsWUFBbUIsT0FBd0I7UUFBeEIsWUFBTyxHQUFQLE9BQU8sQ0FBaUI7UUFEbEMsU0FBSSxHQUFHLDBCQUEwQixDQUFDLDRCQUE0QixDQUFDO0lBQ3pCLENBQUM7Q0FDakQ7QUFIRCxvRUFHQztBQUNELE1BQWEsNEJBQTRCO0lBQXpDO1FBQ1csU0FBSSxHQUFHLDBCQUEwQixDQUFDLDRCQUE0QixDQUFDO0lBQzFFLENBQUM7Q0FBQTtBQUZELG9FQUVDO0FBRUQsTUFBYSxxQkFBcUI7SUFFaEMsWUFBbUIsT0FBaUU7UUFBakUsWUFBTyxHQUFQLE9BQU8sQ0FBMEQ7UUFEM0UsU0FBSSxHQUFHLDBCQUEwQixDQUFDLHFCQUFxQixDQUFDO0lBQ3VCLENBQUM7Q0FDMUY7QUFIRCxzREFHQztBQUNELE1BQWEsNEJBQTRCO0lBRXZDLFlBQW1CLE9BQXdCO1FBQXhCLFlBQU8sR0FBUCxPQUFPLENBQWlCO1FBRGxDLFNBQUksR0FBRywwQkFBMEIsQ0FBQyw0QkFBNEIsQ0FBQztJQUN6QixDQUFDO0NBQ2pEO0FBSEQsb0VBR0M7QUFDRCxNQUFhLDRCQUE0QjtJQUF6QztRQUNXLFNBQUksR0FBRywwQkFBMEIsQ0FBQyw0QkFBNEIsQ0FBQztJQUMxRSxDQUFDO0NBQUE7QUFGRCxvRUFFQztBQUVELE1BQWEscUJBQXFCO0lBRWhDLFlBQW1CLE9BQXVEO1FBQXZELFlBQU8sR0FBUCxPQUFPLENBQWdEO1FBRGpFLFNBQUksR0FBRywwQkFBMEIsQ0FBQyxxQkFBcUIsQ0FBQztJQUNhLENBQUM7Q0FDaEY7QUFIRCxzREFHQztBQUNELE1BQWEsNEJBQTRCO0lBRXZDLFlBQW1CLE9BQWU7UUFBZixZQUFPLEdBQVAsT0FBTyxDQUFRO1FBRHpCLFNBQUksR0FBRywwQkFBMEIsQ0FBQyw0QkFBNEIsQ0FBQztJQUNsQyxDQUFDO0NBQ3hDO0FBSEQsb0VBR0M7QUFDRCxNQUFhLDRCQUE0QjtJQUF6QztRQUNXLFNBQUksR0FBRywwQkFBMEIsQ0FBQyw0QkFBNEIsQ0FBQztJQUMxRSxDQUFDO0NBQUE7QUFGRCxvRUFFQztBQUVELE1BQWEscUJBQXFCO0lBRWhDLFlBQW1CLE9BQWU7UUFBZixZQUFPLEdBQVAsT0FBTyxDQUFRO1FBRHpCLFNBQUksR0FBRywwQkFBMEIsQ0FBQyxxQkFBcUIsQ0FBQztJQUMzQixDQUFDO0NBQ3hDO0FBSEQsc0RBR0M7QUFFRCxNQUFhLGFBQWE7SUFFeEIsWUFBbUIsT0FBc0I7UUFBdEIsWUFBTyxHQUFQLE9BQU8sQ0FBZTtRQURoQyxTQUFJLEdBQUcsMEJBQTBCLENBQUMsYUFBYSxDQUFDO0lBQ1osQ0FBQztDQUMvQztBQUhELHNDQUdDO0FBRUQsTUFBYSxvQkFBb0I7SUFFL0IsWUFBbUIsT0FBWTtRQUFaLFlBQU8sR0FBUCxPQUFPLENBQUs7UUFEdEIsU0FBSSxHQUFHLDBCQUEwQixDQUFDLG9CQUFvQixDQUFDO0lBQzdCLENBQUM7Q0FDckM7QUFIRCxvREFHQztBQUVELE1BQWEsb0JBQW9CO0lBQWpDO1FBQ1csU0FBSSxHQUFHLDBCQUEwQixDQUFDLG9CQUFvQixDQUFDO0lBQ2xFLENBQUM7Q0FBQTtBQUZELG9EQUVDO0FBRUQsTUFBYSxzQkFBc0I7SUFBbkM7UUFDVyxTQUFJLEdBQUcsMEJBQTBCLENBQUMsc0JBQXNCLENBQUM7SUFDcEUsQ0FBQztDQUFBO0FBRkQsd0RBRUM7QUFFRCxNQUFhLDZCQUE2QjtJQUV4QyxZQUFtQixPQUFZO1FBQVosWUFBTyxHQUFQLE9BQU8sQ0FBSztRQUR0QixTQUFJLEdBQUcsMEJBQTBCLENBQUMsNkJBQTZCLENBQUM7SUFDdEMsQ0FBQztDQUNyQztBQUhELHNFQUdDO0FBRUQsTUFBYSw2QkFBNkI7SUFBMUM7UUFDVyxTQUFJLEdBQUcsMEJBQTBCLENBQUMsNkJBQTZCLENBQUM7SUFDM0UsQ0FBQztDQUFBO0FBRkQsc0VBRUMifQ==