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
const operators_1 = require("rxjs/operators");
const operators_2 = require("@concourse/core/operators");
const role_actions_1 = require("./role.actions");
let RoleEffects = class RoleEffects {
    constructor(actions$, roleApi) {
        this.actions$ = actions$;
        this.roleApi = roleApi;
        this.loadRoles$ = this.actions$.pipe(effects_1.ofType(role_actions_1.RoleActionTypes.LoadRoles), operators_1.switchMap(_ => this.roleApi.list().pipe(operators_1.map(data => new role_actions_1.LoadRolesSuccess(data)), operators_2.handleError('toast', new role_actions_1.LoadRolesFailure()))));
    }
};
__decorate([
    effects_1.Effect()
], RoleEffects.prototype, "loadRoles$", void 0);
RoleEffects = __decorate([
    core_1.Injectable()
], RoleEffects);
exports.RoleEffects = RoleEffects;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm9sZS5lZmZlY3RzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vY29uY291cnNlL2phdmFzY3JpcHQvY29uY291cnNlLWFwcC9zcmMvYXBwL3N0b3JlL3JvbGUvc3RhdGUvcm9sZS5lZmZlY3RzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUEsd0NBQTJDO0FBQzNDLDJDQUF3RDtBQUl4RCw4Q0FBZ0Q7QUFFaEQseURBQXdEO0FBRXhELGlEQUFxRjtBQUdyRixJQUFhLFdBQVcsR0FBeEIsTUFBYSxXQUFXO0lBWXRCLFlBQ21CLFFBQWlCLEVBQ2pCLE9BQW9CO1FBRHBCLGFBQVEsR0FBUixRQUFRLENBQVM7UUFDakIsWUFBTyxHQUFQLE9BQU8sQ0FBYTtRQVo3QixlQUFVLEdBQXVCLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUMzRCxnQkFBTSxDQUFDLDhCQUFlLENBQUMsU0FBUyxDQUFDLEVBQ2pDLHFCQUFTLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FDWixJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxDQUFDLElBQUksQ0FDdEIsZUFBRyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSwrQkFBZ0IsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUN2Qyx1QkFBVyxDQUFDLE9BQU8sRUFBRSxJQUFJLCtCQUFnQixFQUFFLENBQUMsQ0FDN0MsQ0FDRixDQUNGLENBQUM7SUFLRSxDQUFDO0NBQ04sQ0FBQTtBQWRXO0lBQVQsZ0JBQU0sRUFBRTsrQ0FRUDtBQVZTLFdBQVc7SUFEdkIsaUJBQVUsRUFBRTtHQUNBLFdBQVcsQ0FnQnZCO0FBaEJZLGtDQUFXIn0=