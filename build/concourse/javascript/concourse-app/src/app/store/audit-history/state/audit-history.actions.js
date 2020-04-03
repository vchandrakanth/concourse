"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AuditHistoryActionTypes;
(function (AuditHistoryActionTypes) {
    AuditHistoryActionTypes["GetAuditHistory"] = "[AuditHistory] Get Audit History";
    AuditHistoryActionTypes["GetAuditHistorySuccess"] = "[AuditHistory] Get Audit History Success";
    AuditHistoryActionTypes["GetAuditHistoryFailure"] = "[AuditHistory] Get Audit History Failure";
    AuditHistoryActionTypes["ResetAuditHistory"] = "[AuditHistory] Reset Audit History";
})(AuditHistoryActionTypes = exports.AuditHistoryActionTypes || (exports.AuditHistoryActionTypes = {}));
class GetAuditHistory {
    constructor(payload) {
        this.payload = payload;
        this.type = AuditHistoryActionTypes.GetAuditHistory;
    }
}
exports.GetAuditHistory = GetAuditHistory;
class GetAuditHistorySuccess {
    constructor(payload) {
        this.payload = payload;
        this.type = AuditHistoryActionTypes.GetAuditHistorySuccess;
    }
}
exports.GetAuditHistorySuccess = GetAuditHistorySuccess;
class GetAuditHistoryFailure {
    constructor() {
        this.type = AuditHistoryActionTypes.GetAuditHistoryFailure;
    }
}
exports.GetAuditHistoryFailure = GetAuditHistoryFailure;
class ResetAuditHistory {
    constructor() {
        this.type = AuditHistoryActionTypes.ResetAuditHistory;
    }
}
exports.ResetAuditHistory = ResetAuditHistory;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXVkaXQtaGlzdG9yeS5hY3Rpb25zLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vY29uY291cnNlL2phdmFzY3JpcHQvY29uY291cnNlLWFwcC9zcmMvYXBwL3N0b3JlL2F1ZGl0LWhpc3Rvcnkvc3RhdGUvYXVkaXQtaGlzdG9yeS5hY3Rpb25zLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBR0EsSUFBWSx1QkFNWDtBQU5ELFdBQVksdUJBQXVCO0lBQ2pDLCtFQUFvRCxDQUFBO0lBQ3BELDhGQUFtRSxDQUFBO0lBQ25FLDhGQUFtRSxDQUFBO0lBRW5FLG1GQUF3RCxDQUFBO0FBQzFELENBQUMsRUFOVyx1QkFBdUIsR0FBdkIsK0JBQXVCLEtBQXZCLCtCQUF1QixRQU1sQztBQU9ELE1BQWEsZUFBZTtJQUUxQixZQUFtQixPQUE0QjtRQUE1QixZQUFPLEdBQVAsT0FBTyxDQUFxQjtRQUR0QyxTQUFJLEdBQUcsdUJBQXVCLENBQUMsZUFBZSxDQUFDO0lBQ0wsQ0FBQztDQUNyRDtBQUhELDBDQUdDO0FBRUQsTUFBYSxzQkFBc0I7SUFFakMsWUFBbUIsT0FBdUI7UUFBdkIsWUFBTyxHQUFQLE9BQU8sQ0FBZ0I7UUFEakMsU0FBSSxHQUFHLHVCQUF1QixDQUFDLHNCQUFzQixDQUFDO0lBQ2pCLENBQUM7Q0FDaEQ7QUFIRCx3REFHQztBQUVELE1BQWEsc0JBQXNCO0lBQW5DO1FBQ1csU0FBSSxHQUFHLHVCQUF1QixDQUFDLHNCQUFzQixDQUFDO0lBQ2pFLENBQUM7Q0FBQTtBQUZELHdEQUVDO0FBRUQsTUFBYSxpQkFBaUI7SUFBOUI7UUFDVyxTQUFJLEdBQUcsdUJBQXVCLENBQUMsaUJBQWlCLENBQUM7SUFDNUQsQ0FBQztDQUFBO0FBRkQsOENBRUMifQ==