"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const effects_1 = require("@ngrx/effects");
const operators_1 = require("rxjs/operators");
const modal_1 = require("@concourse/core/modal");
const models_1 = require("@concourse/core/models");
const toast_actions_1 = require("@concourse/core/toast/toast.actions");
const error_actions_1 = require("./error.actions");
let ApplicationErrorEffects = class ApplicationErrorEffects {
    constructor(actions$) {
        this.actions$ = actions$;
        this.dispatchApplicationError$ = this.actions$.pipe(effects_1.ofType(error_actions_1.ApplicationErrorActionTypes.AddApplicationError), operators_1.map((action) => action.payload), operators_1.map(payload => new error_actions_1.DispatchedApplicationError(new models_1.ApplicationError().deserialize(Object.assign(Object.assign({}, payload), { message: payload.message || 'An unknown error occurred', type: payload.type || 'danger', id: new Date().getTime() })))));
        this.openToast$ = this.actions$.pipe(effects_1.ofType(error_actions_1.ApplicationErrorActionTypes.DispatchedApplicationError), operators_1.map((action) => action.payload), operators_1.filter(payload => payload.displayType === 'toast'), operators_1.map((_a) => {
            var { id } = _a, toast = __rest(_a, ["id"]);
            return new toast_actions_1.OpenApplicationErrorToast({ toast, id });
        }));
        this.openModal$ = this.actions$.pipe(effects_1.ofType(error_actions_1.ApplicationErrorActionTypes.DismissApplicationError), operators_1.map((action) => action.payload), operators_1.filter(payload => payload.displayType === 'modal'), operators_1.tap(_ => console.error('Modal Error not supported')));
        this.openCriticalModal$ = this.actions$.pipe(effects_1.ofType(error_actions_1.ApplicationErrorActionTypes.DispatchedApplicationError), operators_1.map((action) => action.payload), operators_1.filter(payload => payload.displayType === 'critical'), operators_1.map(error => new modal_1.OpenModal({
            component: modal_1.CriticalErrorComponent,
            id: `${error.id}-critical-error`,
            options: {
                initialState: { error },
                ignoreBackdropClick: true,
                keyboard: true,
                backdrop: 'static'
            }
        })));
    }
};
__decorate([
    effects_1.Effect()
], ApplicationErrorEffects.prototype, "dispatchApplicationError$", void 0);
__decorate([
    effects_1.Effect()
], ApplicationErrorEffects.prototype, "openToast$", void 0);
__decorate([
    effects_1.Effect()
], ApplicationErrorEffects.prototype, "openModal$", void 0);
__decorate([
    effects_1.Effect()
], ApplicationErrorEffects.prototype, "openCriticalModal$", void 0);
ApplicationErrorEffects = __decorate([
    core_1.Injectable()
], ApplicationErrorEffects);
exports.ApplicationErrorEffects = ApplicationErrorEffects;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXJyb3IuZWZmZWN0cy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL2NvbmNvdXJzZS9qYXZhc2NyaXB0L2NvbmNvdXJzZS1hcHAvc3JjL2FwcC9jb3JlL2Vycm9yL3N0YXRlL2Vycm9yLmVmZmVjdHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHdDQUEyQztBQUMzQywyQ0FBd0Q7QUFJeEQsOENBQWtEO0FBRWxELGlEQUEwRTtBQUMxRSxtREFBMEQ7QUFDMUQsdUVBQWdGO0FBQ2hGLG1EQUErRztBQUcvRyxJQUFhLHVCQUF1QixHQUFwQyxNQUFhLHVCQUF1QjtJQTZDbEMsWUFDbUIsUUFBaUI7UUFBakIsYUFBUSxHQUFSLFFBQVEsQ0FBUztRQTVDMUIsOEJBQXlCLEdBQXVCLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUMxRSxnQkFBTSxDQUFDLDJDQUEyQixDQUFDLG1CQUFtQixDQUFDLEVBQ3ZELGVBQUcsQ0FBQyxDQUFDLE1BQTJCLEVBQUUsRUFBRSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsRUFDcEQsZUFBRyxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsSUFBSSwwQ0FBMEIsQ0FDM0MsSUFBSSx5QkFBZ0IsRUFBRSxDQUFDLFdBQVcsaUNBQzdCLE9BQU8sS0FDVixPQUFPLEVBQUUsT0FBTyxDQUFDLE9BQU8sSUFBSSwyQkFBMkIsRUFDdkQsSUFBSSxFQUFFLE9BQU8sQ0FBQyxJQUFJLElBQUksUUFBUSxFQUM5QixFQUFFLEVBQUUsSUFBSSxJQUFJLEVBQUUsQ0FBQyxPQUFPLEVBQUUsSUFDeEIsQ0FDSCxDQUFDLENBQ0gsQ0FBQztRQUVRLGVBQVUsR0FBdUIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQzNELGdCQUFNLENBQUMsMkNBQTJCLENBQUMsMEJBQTBCLENBQUMsRUFDOUQsZUFBRyxDQUFDLENBQUMsTUFBa0MsRUFBRSxFQUFFLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxFQUMzRCxrQkFBTSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLFdBQVcsS0FBSyxPQUFPLENBQUMsRUFDbEQsZUFBRyxDQUFDLENBQUMsRUFBZ0IsRUFBRSxFQUFFO2dCQUFwQixFQUFFLEVBQUUsT0FBWSxFQUFWLDBCQUFRO1lBQU8sT0FBQSxJQUFJLHlDQUF5QixDQUFDLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUE7U0FBQSxDQUFDLENBQ3hFLENBQUM7UUFFUSxlQUFVLEdBQXVCLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUMzRCxnQkFBTSxDQUFDLDJDQUEyQixDQUFDLHVCQUF1QixDQUFDLEVBQzNELGVBQUcsQ0FBQyxDQUFDLE1BQWtDLEVBQUUsRUFBRSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsRUFDM0Qsa0JBQU0sQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxXQUFXLEtBQUssT0FBTyxDQUFDLEVBQ2xELGVBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsMkJBQTJCLENBQUMsQ0FBQyxDQUNyRCxDQUFDO1FBRVEsdUJBQWtCLEdBQXVCLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUNuRSxnQkFBTSxDQUFDLDJDQUEyQixDQUFDLDBCQUEwQixDQUFDLEVBQzlELGVBQUcsQ0FBQyxDQUFDLE1BQWtDLEVBQUUsRUFBRSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsRUFDM0Qsa0JBQU0sQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxXQUFXLEtBQUssVUFBVSxDQUFDLEVBQ3JELGVBQUcsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLElBQUksaUJBQVMsQ0FBQztZQUN6QixTQUFTLEVBQUUsOEJBQXNCO1lBQ2pDLEVBQUUsRUFBRSxHQUFHLEtBQUssQ0FBQyxFQUFFLGlCQUFpQjtZQUNoQyxPQUFPLEVBQUU7Z0JBQ1AsWUFBWSxFQUFFLEVBQUUsS0FBSyxFQUFFO2dCQUN2QixtQkFBbUIsRUFBRSxJQUFJO2dCQUN6QixRQUFRLEVBQUUsSUFBSTtnQkFDZCxRQUFRLEVBQUUsUUFBUTthQUNuQjtTQUNGLENBQUMsQ0FBQyxDQUNKLENBQUM7SUFJRSxDQUFDO0NBQ04sQ0FBQTtBQTlDVztJQUFULGdCQUFNLEVBQUU7MEVBV1A7QUFFUTtJQUFULGdCQUFNLEVBQUU7MkRBS1A7QUFFUTtJQUFULGdCQUFNLEVBQUU7MkRBS1A7QUFFUTtJQUFULGdCQUFNLEVBQUU7bUVBY1A7QUEzQ1MsdUJBQXVCO0lBRG5DLGlCQUFVLEVBQUU7R0FDQSx1QkFBdUIsQ0FnRG5DO0FBaERZLDBEQUF1QiJ9