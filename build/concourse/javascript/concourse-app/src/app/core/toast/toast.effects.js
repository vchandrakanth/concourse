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
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const error_actions_1 = require("../error/state/error.actions");
const toast_actions_1 = require("./toast.actions");
let ToastEffects = class ToastEffects {
    constructor(actions$, toastService) {
        this.actions$ = actions$;
        this.toastService = toastService;
        this.openToast$ = this.actions$.pipe(effects_1.ofType(toast_actions_1.ToastActionTypes.OpenToast), operators_1.map((action) => action.payload), operators_1.tap(options => this.toastService.show(options.message, options.title, { positionClass: 'toast-bottom-right' }, options.type)), operators_1.switchMap(() => rxjs_1.EMPTY));
        this.openApplicationErrorToast$ = this.actions$.pipe(effects_1.ofType(toast_actions_1.ToastActionTypes.OpenApplicationErrorToast), operators_1.map((action) => action.payload), operators_1.mergeMap(({ toast, id }) => this.toastService.show(toast.message, toast.title, { positionClass: 'toast-bottom-right' }, toast.type).onHidden.pipe(operators_1.map(_ => new error_actions_1.DismissApplicationError(id)))));
    }
};
__decorate([
    effects_1.Effect({ dispatch: false })
], ToastEffects.prototype, "openToast$", void 0);
__decorate([
    effects_1.Effect({ dispatch: false })
], ToastEffects.prototype, "openApplicationErrorToast$", void 0);
ToastEffects = __decorate([
    core_1.Injectable()
], ToastEffects);
exports.ToastEffects = ToastEffects;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9hc3QuZWZmZWN0cy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL2NvbmNvdXJzZS9qYXZhc2NyaXB0L2NvbmNvdXJzZS1hcHAvc3JjL2FwcC9jb3JlL3RvYXN0L3RvYXN0LmVmZmVjdHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQSx3Q0FBMkM7QUFDM0MsMkNBQXdEO0FBSXhELCtCQUF5QztBQUN6Qyw4Q0FBK0Q7QUFFL0QsZ0VBQXVFO0FBQ3ZFLG1EQUF5RjtBQUd6RixJQUFhLFlBQVksR0FBekIsTUFBYSxZQUFZO0lBcUJ2QixZQUNtQixRQUFpQixFQUNqQixZQUEyQjtRQUQzQixhQUFRLEdBQVIsUUFBUSxDQUFTO1FBQ2pCLGlCQUFZLEdBQVosWUFBWSxDQUFlO1FBckJqQixlQUFVLEdBQXVCLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUM5RSxnQkFBTSxDQUFDLGdDQUFnQixDQUFDLFNBQVMsQ0FBQyxFQUNsQyxlQUFHLENBQUMsQ0FBQyxNQUFpQixFQUFFLEVBQUUsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLEVBQzFDLGVBQUcsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUNaLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsT0FBTyxDQUFDLEtBQUssRUFBRSxFQUFDLGFBQWEsRUFBQyxvQkFBb0IsRUFBQyxFQUFFLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FDM0csRUFDRCxxQkFBUyxDQUFDLEdBQUcsRUFBRSxDQUFDLFlBQUssQ0FBQyxDQUN2QixDQUFDO1FBRTJCLCtCQUEwQixHQUF1QixJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FDOUYsZ0JBQU0sQ0FBQyxnQ0FBZ0IsQ0FBQyx5QkFBeUIsQ0FBQyxFQUNsRCxlQUFHLENBQUMsQ0FBQyxNQUFpQyxFQUFFLEVBQUUsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLEVBQzFELG9CQUFRLENBQUMsQ0FBQyxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQ3pCLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDLEtBQUssRUFBRSxFQUFDLGFBQWEsRUFBQyxvQkFBb0IsRUFBQyxFQUFFLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUNoSCxlQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxJQUFJLHVDQUF1QixDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQzFDLENBQ0YsQ0FDRixDQUFDO0lBS0UsQ0FBQztDQUNOLENBQUE7QUF2QjhCO0lBQTVCLGdCQUFNLENBQUMsRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLENBQUM7Z0RBTzFCO0FBRTJCO0lBQTVCLGdCQUFNLENBQUMsRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLENBQUM7Z0VBUTFCO0FBbkJTLFlBQVk7SUFEeEIsaUJBQVUsRUFBRTtHQUNBLFlBQVksQ0F5QnhCO0FBekJZLG9DQUFZIn0=