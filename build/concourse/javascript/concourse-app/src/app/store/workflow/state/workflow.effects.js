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
const router_actions_1 = require("@concourse/core/router/router.actions");
const surface_actions_1 = require("@concourse/store/surface/state/surface.actions");
const workflow_actions_1 = require("./workflow.actions");
let WorkflowEffects = class WorkflowEffects {
    constructor(actions$, workflowApi, workflowFacade) {
        this.actions$ = actions$;
        this.workflowApi = workflowApi;
        this.workflowFacade = workflowFacade;
        this.loadWorkflowSummaryByType$ = this.actions$.pipe(effects_1.ofType(workflow_actions_1.WorkflowActionTypes.LoadWorkflowSummariesByType), operators_2.map((action) => action.payload), operators_2.switchMap(workflowTypes => this.workflowApi.getByTypes(workflowTypes).pipe(operators_2.map(data => new workflow_actions_1.LoadWorkflowSummariesByTypeSuccess(data)), operators_1.handleError('toast', new workflow_actions_1.LoadWorkflowSummariesByTypeFailure()))));
        this.searchWorkflows$ = this.actions$.pipe(effects_1.ofType(workflow_actions_1.WorkflowActionTypes.SearchWorkflowSummaries), operators_2.map((action) => action.payload), operators_2.map(searchText => searchText.toLocaleLowerCase()), operators_2.withLatestFrom(this.workflowFacade.owned$), operators_2.map(([searchText, workflows]) => workflows.filter(w => w.requestEntityId.toString().includes(searchText)).map(ent => ent.id)), operators_2.map(searchResults => new workflow_actions_1.SearchWorkflowSummariesSuccess(searchResults)));
        this.loadRisksListOnNav$ = this.actions$.pipe(operators_1.ofRoute(['/workflows/risks']), operators_2.map(_ => new workflow_actions_1.LoadWorkflowSummariesByType(['POLICY_VIOLATION_RESOLUTION'])));
        this.loadApprovalsListOnNav$ = this.actions$.pipe(operators_1.ofRoute(['/workflows/approvals']), operators_2.map(_ => new workflow_actions_1.LoadWorkflowSummariesByType(['APPROVAL'])));
        this.reloadRisksOnSurfaceSelect$ = this.actions$.pipe(operators_1.ofRoute(['/workflows/risks']), operators_2.map((action) => action.payload), operators_2.switchMap(route => this.actions$.pipe(operators_2.takeUntil(this.actions$.pipe(effects_1.ofType(router_actions_1.RouterActionTypes.Change))), effects_1.ofType(surface_actions_1.SurfaceActionTypes.SelectSurface), operators_2.map(_ => new workflow_actions_1.LoadWorkflowSummariesByType(['POLICY_VIOLATION_RESOLUTION'])))));
        this.reloadApprovalsOnSurfaceSelect$ = this.actions$.pipe(operators_1.ofRoute(['/workflows/approvals']), operators_2.map((action) => action.payload), operators_2.switchMap(route => this.actions$.pipe(operators_2.takeUntil(this.actions$.pipe(effects_1.ofType(router_actions_1.RouterActionTypes.Change))), effects_1.ofType(surface_actions_1.SurfaceActionTypes.SelectSurface), operators_2.map(_ => new workflow_actions_1.LoadWorkflowSummariesByType(['APPROVAL'])))));
    }
};
__decorate([
    effects_1.Effect()
], WorkflowEffects.prototype, "loadWorkflowSummaryByType$", void 0);
__decorate([
    effects_1.Effect()
], WorkflowEffects.prototype, "searchWorkflows$", void 0);
__decorate([
    effects_1.Effect()
], WorkflowEffects.prototype, "loadRisksListOnNav$", void 0);
__decorate([
    effects_1.Effect()
], WorkflowEffects.prototype, "loadApprovalsListOnNav$", void 0);
__decorate([
    effects_1.Effect()
], WorkflowEffects.prototype, "reloadRisksOnSurfaceSelect$", void 0);
__decorate([
    effects_1.Effect()
], WorkflowEffects.prototype, "reloadApprovalsOnSurfaceSelect$", void 0);
WorkflowEffects = __decorate([
    core_1.Injectable()
], WorkflowEffects);
exports.WorkflowEffects = WorkflowEffects;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid29ya2Zsb3cuZWZmZWN0cy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL2NvbmNvdXJzZS9qYXZhc2NyaXB0L2NvbmNvdXJzZS1hcHAvc3JjL2FwcC9zdG9yZS93b3JrZmxvdy9zdGF0ZS93b3JrZmxvdy5lZmZlY3RzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUEsd0NBQTJDO0FBQzNDLDJDQUF3RDtBQUd4RCx5REFBaUU7QUFFakUsOENBQTJFO0FBRTNFLDBFQUF3RjtBQUN4RixvRkFBb0Y7QUFFcEYseURBTzRCO0FBSTVCLElBQWEsZUFBZSxHQUE1QixNQUFhLGVBQWU7SUF5RDFCLFlBQ21CLFFBQWlCLEVBQ2pCLFdBQTRCLEVBQzVCLGNBQThCO1FBRjlCLGFBQVEsR0FBUixRQUFRLENBQVM7UUFDakIsZ0JBQVcsR0FBWCxXQUFXLENBQWlCO1FBQzVCLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtRQTFEdkMsK0JBQTBCLEdBQXVCLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUMzRSxnQkFBTSxDQUFDLHNDQUFtQixDQUFDLDJCQUEyQixDQUFDLEVBQ3ZELGVBQUcsQ0FBQyxDQUFDLE1BQW1DLEVBQUUsRUFBRSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsRUFDNUQscUJBQVMsQ0FBQyxhQUFhLENBQUMsRUFBRSxDQUN4QixJQUFJLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsQ0FBQyxJQUFJLENBQzdDLGVBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLElBQUkscURBQWtDLENBQUMsSUFBSSxDQUFDLENBQUMsRUFDekQsdUJBQVcsQ0FBQyxPQUFPLEVBQUUsSUFBSSxxREFBa0MsRUFBRSxDQUFDLENBQy9ELENBQUMsQ0FDTCxDQUFDO1FBRVEscUJBQWdCLEdBQXVCLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUNqRSxnQkFBTSxDQUFDLHNDQUFt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