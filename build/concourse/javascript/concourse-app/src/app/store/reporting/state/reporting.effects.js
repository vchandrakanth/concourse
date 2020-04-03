"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const effects_1 = require("@ngrx/effects");
const operators_1 = require("@concourse/core/operators");
const operators_2 = require("rxjs/operators");
const reporting_actions_1 = require("./reporting.actions");
let ReportingEffects = class ReportingEffects {
    constructor(actions$, reportingApi) {
        this.actions$ = actions$;
        this.reportingApi = reportingApi;
        this.generateSurfaceLayerReport$ = this.actions$.pipe(effects_1.ofType(reporting_actions_1.ReportingActionTypes.GenerateSurfaceLayerReport), operators_2.map((action) => action.payload), operators_2.mergeMap(({ surfaceLayerId }) => {
            const newTab = this.openReportWindow();
            return this.reportingApi.generateSurfaceLayerReport(surfaceLayerId).pipe(operators_2.tap(report => {
                newTab.location.href = URL.createObjectURL(report.content);
            }), operators_2.map(_ => new reporting_actions_1.GenerateReportSuccess()), operators_1.handleError('toast', new reporting_actions_1.GenerateReportFailure(), () => {
                newTab.close();
            }));
        }));
        this.generateGenericDiffReport$ = this.actions$.pipe(effects_1.ofType(reporting_actions_1.ReportingActionTypes.GenerateGenericDiffReport), operators_2.map((action) => action.payload), operators_2.mergeMap(({ lookbackWindow, resourceType }) => {
            const newTab = this.openReportWindow();
            return this.reportingApi.generateGenericDiffReport(lookbackWindow, resourceType).pipe(operators_2.tap(report => {
                newTab.location.href = URL.createObjectURL(report.content);
            }), operators_2.map(_ => new reporting_actions_1.GenerateReportSuccess()), operators_1.handleError('toast', new reporting_actions_1.GenerateReportFailure(), () => {
                newTab.close();
            }));
        }));
        this.generateCloudRoleDiffReport$ = this.actions$.pipe(effects_1.ofType(reporting_actions_1.ReportingActionTypes.GenerateCloudRoleDiffReport), operators_2.map((action) => action.payload), operators_2.mergeMap(({ lookbackWindow }) => {
            const newTab = this.openReportWindow();
            return this.reportingApi.generateCloudRoleDiffReport(lookbackWindow).pipe(operators_2.tap(report => {
                newTab.location.href = URL.createObjectURL(report.content);
            }), operators_2.map(_ => new reporting_actions_1.GenerateReportSuccess()), operators_1.handleError('toast', new reporting_actions_1.GenerateReportFailure(), () => {
                newTab.close();
            }));
        }));
        this.openReportWindow = (loadingText = 'Report Loading...') => {
            const blob = new Blob([`<h1>${loadingText}</h1>`], { type: 'text/html' });
            return window.open(URL.createObjectURL(blob), '_blank', 'toolbar=0,location=0');
        };
    }
};
__decorate([
    effects_1.Effect()
], ReportingEffects.prototype, "generateSurfaceLayerReport$", void 0);
__decorate([
    effects_1.Effect()
], ReportingEffects.prototype, "generateGenericDiffReport$", void 0);
__decorate([
    effects_1.Effect()
], ReportingEffects.prototype, "generateCloudRoleDiffReport$", void 0);
ReportingEffects = __decorate([
    core_1.Injectable()
], ReportingEffects);
exports.ReportingEffects = ReportingEffects;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVwb3J0aW5nLmVmZmVjdHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9jb25jb3Vyc2UvamF2YXNjcmlwdC9jb25jb3Vyc2UtYXBwL3NyYy9hcHAvc3RvcmUvcmVwb3J0aW5nL3N0YXRlL3JlcG9ydGluZy5lZmZlY3RzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUEsd0NBQTJDO0FBQzNDLDJDQUF3RDtBQUd4RCx5REFBd0Q7QUFFeEQsOENBQW9EO0FBR3BELDJEQU82QjtBQUc3QixJQUFhLGdCQUFnQixHQUE3QixNQUFhLGdCQUFnQjtJQTBEM0IsWUFDbUIsUUFBaUIsRUFDakIsWUFBOEI7UUFEOUIsYUFBUSxHQUFSLFFBQVEsQ0FBUztRQUNqQixpQkFBWSxHQUFaLFlBQVksQ0FBa0I7UUExRHZDLGdDQUEyQixHQUF1QixJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FDNUUsZ0JBQU0sQ0FBQyx3Q0FBb0IsQ0FBQywwQkFBMEIsQ0FBQyxFQUN2RCxlQUFHLENBQUMsQ0FBQyxNQUFrQyxFQUFFLEVBQUUsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLEVBQzNELG9CQUFRLENBQUMsQ0FBQyxFQUFFLGNBQWMsRUFBRSxFQUFFLEVBQUU7WUFDOUIsTUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7WUFDdkMsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLDBCQUEwQixDQUFDLGNBQWMsQ0FBQyxDQUFDLElBQUksQ0FDdEUsZUFBRyxDQUFDLE1BQU0sQ0FBQyxFQUFFO2dCQUNYLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxHQUFHLEdBQUcsQ0FBQyxlQUFlLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQzdELENBQUMsQ0FBQyxFQUNGLGVBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLElBQUkseUNBQXFCLEVBQUUsQ0FBQyxFQUNyQyx1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