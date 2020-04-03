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
const audit_history_actions_1 = require("./audit-history.actions");
let AuditHistoryEffects = class AuditHistoryEffects {
    constructor(actions$, auditHistoryService) {
        this.actions$ = actions$;
        this.auditHistoryService = auditHistoryService;
        this.getAuditHistory$ = this.actions$.pipe(effects_1.ofType(audit_history_actions_1.AuditHistoryActionTypes.GetAuditHistory), operators_2.map((action) => action.payload), operators_2.switchMap(({ entityId, entityType }) => this.auditHistoryService[entityType](entityId).pipe(operators_2.map(data => new audit_history_actions_1.GetAuditHistorySuccess(data)), operators_1.handleError('toast', new audit_history_actions_1.GetAuditHistoryFailure()))));
    }
};
__decorate([
    effects_1.Effect()
], AuditHistoryEffects.prototype, "getAuditHistory$", void 0);
AuditHistoryEffects = __decorate([
    core_1.Injectable()
], AuditHistoryEffects);
exports.AuditHistoryEffects = AuditHistoryEffects;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXVkaXQtaGlzdG9yeS5lZmZlY3RzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vY29uY291cnNlL2phdmFzY3JpcHQvY29uY291cnNlLWFwcC9zcmMvYXBwL3N0b3JlL2F1ZGl0LWhpc3Rvcnkvc3RhdGUvYXVkaXQtaGlzdG9yeS5lZmZlY3RzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUEsd0NBQTJDO0FBQzNDLDJDQUF3RDtBQUd4RCx5REFBd0Q7QUFFeEQsOENBQWdEO0FBR2hELG1FQUtpQztBQUdqQyxJQUFhLG1CQUFtQixHQUFoQyxNQUFhLG1CQUFtQjtJQWE5QixZQUNtQixRQUFpQixFQUNqQixtQkFBd0M7UUFEeEMsYUFBUSxHQUFSLFFBQVEsQ0FBUztRQUNqQix3QkFBbUIsR0FBbkIsbUJBQW1CLENBQXFCO1FBYmpELHFCQUFnQixHQUF1QixJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FDakUsZ0JBQU0sQ0FBQywrQ0FBdUIsQ0FBQyxlQUFlLENBQUMsRUFDL0MsZUFBRyxDQUFDLENBQUMsTUFBdUIsRUFBRSxFQUFFLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxFQUNoRCxxQkFBUyxDQUFDLENBQUMsRUFBRSxRQUFRLEVBQUUsVUFBVSxFQUFFLEVBQUUsRUFBRSxDQUNyQyxJQUFJLENBQUMsbUJBQW1CLENBQUMsVUFBVSxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsSUFBSSxDQUNqRCxlQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLDhDQUFzQixDQUFDLElBQUksQ0FBQyxDQUFDLEVBQzdDLHVCQUFXLENBQUMsT0FBTyxFQUFFLElBQUksOENBQXNCLEVBQUUsQ0FBQyxDQUNuRCxDQUNGLENBQ0YsQ0FBQztJQUtFLENBQUM7Q0FDTixDQUFBO0FBZlc7SUFBVCxnQkFBTSxFQUFFOzZEQVNQO0FBWFMsbUJBQW1CO0lBRC9CLGlCQUFVLEVBQUU7R0FDQSxtQkFBbUIsQ0FpQi9CO0FBakJZLGtEQUFtQiJ9