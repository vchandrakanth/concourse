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
const policy_template_actions_1 = require("./policy-template.actions");
let PolicyTemplateEffects = class PolicyTemplateEffects {
    constructor(actions$, policyTemplateApi, policyTemplateFacade) {
        this.actions$ = actions$;
        this.policyTemplateApi = policyTemplateApi;
        this.policyTemplateFacade = policyTemplateFacade;
        this.list$ = this.policyTemplateFacade.list$;
        this.loadPolicyTemplates$ = this.actions$.pipe(effects_1.ofType(policy_template_actions_1.PolicyTemplateActionTypes.LoadPolicyTemplates), operators_2.switchMap(_ => this.policyTemplateApi.list().pipe(operators_2.map(data => new policy_template_actions_1.LoadPolicyTemplatesSuccess(data)), operators_1.handleError('toast', new policy_template_actions_1.LoadPolicyTemplatesFailure()))));
        this.loadPolicyTemplate$ = this.actions$.pipe(effects_1.ofType(policy_template_actions_1.PolicyTemplateActionTypes.LoadPolicyTemplate), operators_2.map((action) => action.payload), operators_2.switchMap(payload => this.policyTemplateApi.get(payload).pipe(operators_2.map(data => new policy_template_actions_1.LoadPolicyTemplateSuccess(data)), operators_1.handleError('toast', new policy_template_actions_1.LoadPolicyTemplateFailure()))));
        this.searchPolicyTemplate$ = this.actions$.pipe(effects_1.ofType(policy_template_actions_1.PolicyTemplateActionTypes.SearchPolicyTemplate), operators_2.map((action) => action.payload), operators_2.map(searchText => searchText.toLowerCase()), operators_2.withLatestFrom(this.list$), operators_2.map(([searchText, policyTemplates]) => policyTemplates.filter(pt => pt.name.toLocaleLowerCase().includes(searchText)).map(u => u.id)), operators_2.map(results => new policy_template_actions_1.SearchPolicyTemplateSuccess(results)));
    }
};
__decorate([
    effects_1.Effect()
], PolicyTemplateEffects.prototype, "loadPolicyTemplates$", void 0);
__decorate([
    effects_1.Effect()
], PolicyTemplateEffects.prototype, "loadPolicyTemplate$", void 0);
__decorate([
    effects_1.Effect()
], PolicyTemplateEffects.prototype, "searchPolicyTemplate$", void 0);
PolicyTemplateEffects = __decorate([
    core_1.Injectable()
], PolicyTemplateEffects);
exports.PolicyTemplateEffects = PolicyTemplateEffects;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9saWN5LXRlbXBsYXRlLmVmZmVjdHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9jb25jb3Vyc2UvamF2YXNjcmlwdC9jb25jb3Vyc2UtYXBwL3NyYy9hcHAvc3RvcmUvcG9saWN5LXRlbXBsYXRlL3N0YXRlL3BvbGljeS10ZW1wbGF0ZS5lZmZlY3RzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUEsd0NBQTJDO0FBQzNDLDJDQUF3RDtBQUd4RCx5REFBd0Q7QUFFeEQsOENBSXdCO0FBR3hCLHVFQVNtQztBQUluQyxJQUFhLHFCQUFxQixHQUFsQyxNQUFhLHFCQUFxQjtJQW9DaEMsWUFDbUIsUUFBaUIsRUFDakIsaUJBQXdDLEVBQ3hDLG9CQUEwQztRQUYxQyxhQUFRLEdBQVIsUUFBUSxDQUFTO1FBQ2pCLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBdUI7UUFDeEMseUJBQW9CLEdBQXBCLG9CQUFvQixDQUFzQjtRQXJDN0QsVUFBSyxHQUFHLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxLQUFLLENBQUM7UUFFOUIseUJBQW9CLEdBQXVCLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUNyRSxnQkFBTSxDQUFDLG1EQUF5QixDQUFDLG1CQUFtQixDQUFDLEVBQ3JELHFCQUFTLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FDWixJQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxFQUFFLENBQUMsSUFBSSxDQUNoQyxlQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLG9EQUEwQixDQUFDLElBQUksQ0FBQyxDQUFDLEVBQ2pELHVCQUFXLENBQUMsT0FBTyxFQUFFLElBQUksb0RBQTBCLEVBQUUsQ0FBQyxDQUN2RCxDQUNGLENBQ0YsQ0FBQztRQUVRLHdCQUFtQixHQUF1QixJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FDcEUsZ0JBQU0sQ0FBQyxtREFBeUIsQ0FBQyxrQkFBa0IsQ0FBQyxFQUNwRCxlQUFHLENBQUMsQ0FBQyxNQUEwQixFQUFFLEVBQUUsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLEVBQ25ELHFCQUFTLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FDbEIsSUFBSSxDQUFDLGlCQUFpQixDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQ3RDLGVBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLElBQUksbURBQXlCLENBQUMsSUFBSSxDQUFDLENBQUMsRUFDaEQsdUJBQVcsQ0FBQyxPQUFPLEVBQUUsSUFBSSxtREFBeUIsRUFBRSxDQUFDLENBQ3RELENBQ0YsQ0FDRixDQUFDO1FBRVEsMEJBQXFCLEdBQXVCLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUN0RSxnQkFBTSxDQUFDLG1EQUF5QixDQUFDLG9CQUFvQixDQUFDLEVBQ3RELGVBQUcsQ0FBQyxDQUFDLE1BQTRCLEVBQUUsRUFBRSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsRUFDckQsZUFBRyxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsVUFBVSxDQUFDLFdBQVcsRUFBRSxDQUFDLEVBQzNDLDBCQUFjLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUMxQixlQUFHLENBQUMsQ0FBQyxDQUFDLFVBQVUsRUFBRSxlQUFlLENBQUMsRUFBRSxFQUFFLENBQ3BDLGVBQWUsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUM5RixFQUNELGVBQUcsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLElBQUkscURBQTJCLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FDekQsQ0FBQztJQU1FLENBQUM7Q0FDTixDQUFBO0FBckNXO0lBQVQsZ0JBQU0sRUFBRTttRUFRUDtBQUVRO0lBQVQsZ0JBQU0sRUFBRTtrRUFTUDtBQUVRO0lBQVQsZ0JBQU0sRUFBRTtvRUFTUDtBQWxDUyxxQkFBcUI7SUFEakMsaUJBQVUsRUFBRTtHQUNBLHFCQUFxQixDQXlDakM7QUF6Q1ksc0RBQXFCIn0=