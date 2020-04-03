"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ReportingActionTypes;
(function (ReportingActionTypes) {
    ReportingActionTypes["GenerateGenericDiffReport"] = "[Reporting] Generate Generic Diff Report";
    ReportingActionTypes["GenerateCloudRoleDiffReport"] = "[Reporting] Generate Cloud Role Diff Report";
    ReportingActionTypes["GenerateSurfaceLayerReport"] = "[Reporting] Generate Surface Layer Report";
    ReportingActionTypes["GenerateReportSuccess"] = "[Reporting] Generate Report Success";
    ReportingActionTypes["GenerateReportFailure"] = "[Reporting] Generate Report Failure";
})(ReportingActionTypes = exports.ReportingActionTypes || (exports.ReportingActionTypes = {}));
class GenerateGenericDiffReport {
    constructor(payload) {
        this.payload = payload;
        this.type = ReportingActionTypes.GenerateGenericDiffReport;
    }
}
exports.GenerateGenericDiffReport = GenerateGenericDiffReport;
class GenerateCloudRoleDiffReport {
    constructor(payload) {
        this.payload = payload;
        this.type = ReportingActionTypes.GenerateCloudRoleDiffReport;
    }
}
exports.GenerateCloudRoleDiffReport = GenerateCloudRoleDiffReport;
class GenerateSurfaceLayerReport {
    constructor(payload) {
        this.payload = payload;
        this.type = ReportingActionTypes.GenerateSurfaceLayerReport;
    }
}
exports.GenerateSurfaceLayerReport = GenerateSurfaceLayerReport;
class GenerateReportSuccess {
    constructor() {
        this.type = ReportingActionTypes.GenerateReportSuccess;
    }
}
exports.GenerateReportSuccess = GenerateReportSuccess;
class GenerateReportFailure {
    constructor() {
        this.type = ReportingActionTypes.GenerateReportFailure;
    }
}
exports.GenerateReportFailure = GenerateReportFailure;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVwb3J0aW5nLmFjdGlvbnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9jb25jb3Vyc2UvamF2YXNjcmlwdC9jb25jb3Vyc2UtYXBwL3NyYy9hcHAvc3RvcmUvcmVwb3J0aW5nL3N0YXRlL3JlcG9ydGluZy5hY3Rpb25zLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBRUEsSUFBWSxvQkFPWDtBQVBELFdBQVksb0JBQW9CO0lBQzlCLDhGQUFzRSxDQUFBO0lBQ3RFLG1HQUEyRSxDQUFBO0lBQzNFLGdHQUF3RSxDQUFBO0lBRXhFLHFGQUE2RCxDQUFBO0lBQzdELHFGQUE2RCxDQUFBO0FBQy9ELENBQUMsRUFQVyxvQkFBb0IsR0FBcEIsNEJBQW9CLEtBQXBCLDRCQUFvQixRQU8vQjtBQUVELE1BQWEseUJBQXlCO0lBRXBDLFlBQW1CLE9BQXlEO1FBQXpELFlBQU8sR0FBUCxPQUFPLENBQWtEO1FBRG5FLFNBQUksR0FBRyxvQkFBb0IsQ0FBQyx5QkFBeUIsQ0FBQztJQUNpQixDQUFDO0NBQ2xGO0FBSEQsOERBR0M7QUFFRCxNQUFhLDJCQUEyQjtJQUV0QyxZQUFtQixPQUFtQztRQUFuQyxZQUFPLEdBQVAsT0FBTyxDQUE0QjtRQUQ3QyxTQUFJLEdBQUcsb0JBQW9CLENBQUMsMkJBQTJCLENBQUM7SUFDUCxDQUFDO0NBQzVEO0FBSEQsa0VBR0M7QUFFRCxNQUFhLDBCQUEwQjtJQUVyQyxZQUFtQixPQUFtQztRQUFuQyxZQUFPLEdBQVAsT0FBTyxDQUE0QjtRQUQ3QyxTQUFJLEdBQUcsb0JBQW9CLENBQUMsMEJBQTBCLENBQUM7SUFDTixDQUFDO0NBQzVEO0FBSEQsZ0VBR0M7QUFFRCxNQUFhLHFCQUFxQjtJQUFsQztRQUNXLFNBQUksR0FBRyxvQkFBb0IsQ0FBQyxxQkFBcUIsQ0FBQztJQUM3RCxDQUFDO0NBQUE7QUFGRCxzREFFQztBQUNELE1BQWEscUJBQXFCO0lBQWxDO1FBQ1csU0FBSSxHQUFHLG9CQUFvQixDQUFDLHFCQUFxQixDQUFDO0lBQzdELENBQUM7Q0FBQTtBQUZELHNEQUVDIn0=