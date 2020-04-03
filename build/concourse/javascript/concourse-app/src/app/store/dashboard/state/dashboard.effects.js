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
const group_actions_1 = require("@concourse/store/group/state/group.actions");
const surface_layer_actions_1 = require("@concourse/store/surface-layer/state/surface-layer.actions");
const workflow_actions_1 = require("@concourse/store/workflow/state/workflow.actions");
let DashboardEffects = class DashboardEffects {
    constructor(actions$, dashboardApi) {
        this.actions$ = actions$;
        this.dashboardApi = dashboardApi;
        this.loadListOnNav$ = this.actions$.pipe(operators_1.ofRoute(['/dashboard']), operators_2.mergeMap(_ => [
            new workflow_actions_1.LoadWorkflowSummariesByType(['APPROVAL', 'POLICY_VIOLATION_RESOLUTION']),
            new surface_layer_actions_1.LoadSurfaceLayers(),
            new group_actions_1.LoadGroups()
        ]));
    }
};
__decorate([
    effects_1.Effect()
], DashboardEffects.prototype, "loadListOnNav$", void 0);
DashboardEffects = __decorate([
    core_1.Injectable()
], DashboardEffects);
exports.DashboardEffects = DashboardEffects;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGFzaGJvYXJkLmVmZmVjdHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9jb25jb3Vyc2UvamF2YXNjcmlwdC9jb25jb3Vyc2UtYXBwL3NyYy9hcHAvc3RvcmUvZGFzaGJvYXJkL3N0YXRlL2Rhc2hib2FyZC5lZmZlY3RzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUEsd0NBQTJDO0FBQzNDLDJDQUF3RDtBQUd4RCx5REFBb0Q7QUFFcEQsOENBQTBDO0FBRTFDLDhFQUF3RTtBQUN4RSxzR0FBK0Y7QUFDL0YsdUZBQStGO0FBSS9GLElBQWEsZ0JBQWdCLEdBQTdCLE1BQWEsZ0JBQWdCO0lBVzNCLFlBQ21CLFFBQWlCLEVBQ2pCLFlBQThCO1FBRDlCLGFBQVEsR0FBUixRQUFRLENBQVM7UUFDakIsaUJBQVksR0FBWixZQUFZLENBQWtCO1FBWHZDLG1CQUFjLEdBQXVCLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUMvRCxtQkFBTyxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUMsRUFDdkIsb0JBQVEsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO1lBQ1osSUFBSSw4Q0FBMkIsQ0FBQyxDQUFDLFVBQVUsRUFBRSw2QkFBNkIsQ0FBQyxDQUFDO1lBQzVFLElBQUkseUNBQWlCLEVBQUU7WUFDdkIsSUFBSSwwQkFBVSxFQUFFO1NBQ2pCLENBQUMsQ0FDSCxDQUFDO0lBS0UsQ0FBQztDQUNOLENBQUE7QUFiVztJQUFULGdCQUFNLEVBQUU7d0RBT1A7QUFUUyxnQkFBZ0I7SUFENUIsaUJBQVUsRUFBRTtHQUNBLGdCQUFnQixDQWU1QjtBQWZZLDRDQUFnQiJ9