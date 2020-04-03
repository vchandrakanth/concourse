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
const rxjs_1 = require("rxjs");
const operators_2 = require("rxjs/operators");
const notification_actions_1 = require("./notification.actions");
const POLLING_INTERVAL_SECONDS = 60 * 5;
let NotificationEffects = class NotificationEffects {
    constructor(actions$, notificationApi, notificationFacade) {
        this.actions$ = actions$;
        this.notificationApi = notificationApi;
        this.notificationFacade = notificationFacade;
        this.getBarState$ = this.notificationFacade.getBarState$;
        this.toggleNotificationBar$ = this.actions$.pipe(effects_1.ofType(notification_actions_1.NotificationActionTypes.ToggleNotificationBar), operators_2.withLatestFrom(this.getBarState$), operators_2.flatMap(([, barState]) => barState ? rxjs_1.of(new notification_actions_1.LoadNotifications()) : rxjs_1.EMPTY));
        this.notificationPolling$ = this.actions$.pipe(effects_1.ofType(notification_actions_1.NotificationActionTypes.StartNotificationPolling), operators_2.switchMap(_ => rxjs_1.interval(POLLING_INTERVAL_SECONDS * 1000).pipe(operators_2.takeUntil(this.actions$.pipe(effects_1.ofType(notification_actions_1.NotificationActionTypes.StopNotificationPolling))), operators_2.map(__ => new notification_actions_1.LoadNotifications()))));
        this.loadNotifications$ = this.actions$.pipe(effects_1.ofType(notification_actions_1.NotificationActionTypes.LoadNotifications), operators_2.switchMap(_ => this.notificationApi.list().pipe(operators_2.map(notifications => new notification_actions_1.LoadNotificationsSuccess(notifications)), operators_1.handleError('toast', new notification_actions_1.LoadNotificationsFailure()))));
        this.dismissNotification$ = this.actions$.pipe(effects_1.ofType(notification_actions_1.NotificationActionTypes.DismissNotification), operators_2.map((action) => action.payload), operators_2.mergeMap(id => this.notificationApi.dismiss(id).pipe(operators_2.map(_ => new notification_actions_1.DismissNotificationSuccess(id)), operators_1.handleError('toast', new notification_actions_1.DismissNotificationFailure()))));
        this.dismissAllNotification$ = this.actions$.pipe(effects_1.ofType(notification_actions_1.NotificationActionTypes.DismissAllNotification), operators_2.exhaustMap(_ => this.notificationApi.dismissAll().pipe(operators_2.map(response => new notification_actions_1.DismissAllNotificationSuccess(response)), operators_1.handleError('toast', new notification_actions_1.DismissAllNotificationFailure()))));
    }
};
__decorate([
    effects_1.Effect()
], NotificationEffects.prototype, "toggleNotificationBar$", void 0);
__decorate([
    effects_1.Effect()
], NotificationEffects.prototype, "notificationPolling$", void 0);
__decorate([
    effects_1.Effect()
], NotificationEffects.prototype, "loadNotifications$", void 0);
__decorate([
    effects_1.Effect()
], NotificationEffects.prototype, "dismissNotification$", void 0);
__decorate([
    effects_1.Effect()
], NotificationEffects.prototype, "dismissAllNotification$", void 0);
NotificationEffects = __decorate([
    core_1.Injectable()
], NotificationEffects);
exports.NotificationEffects = NotificationEffects;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm90aWZpY2F0aW9uLmVmZmVjdHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9jb25jb3Vyc2UvamF2YXNjcmlwdC9jb25jb3Vyc2UtYXBwL3NyYy9hcHAvY29yZS9ub3RpZmljYXRpb24vc3RhdGUvbm90aWZpY2F0aW9uLmVmZmVjdHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQSx3Q0FBMkM7QUFDM0MsMkNBQXdEO0FBR3hELHlEQUF3RDtBQUN4RCwrQkFBdUQ7QUFDdkQsOENBUXdCO0FBR3hCLGlFQVVnQztBQUdoQyxNQUFNLHdCQUF3QixHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7QUFHeEMsSUFBYSxtQkFBbUIsR0FBaEMsTUFBYSxtQkFBbUI7SUErQzlCLFlBQ1UsUUFBaUIsRUFDUixlQUFvQyxFQUNwQyxrQkFBc0M7UUFGL0MsYUFBUSxHQUFSLFFBQVEsQ0FBUztRQUNSLG9CQUFlLEdBQWYsZUFBZSxDQUFxQjtRQUNwQyx1QkFBa0IsR0FBbEIsa0JBQWtCLENBQW9CO1FBakRoRCxpQkFBWSxHQUFHLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxZQUFZLENBQUM7UUFFbkQsMkJBQXNCLEdBQXVCLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUN2RSxnQkFBTSxDQUFDLDhDQUF1QixDQUFDLHFCQUFxQixDQUFDLEVBQ3JELDBCQUFjLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxFQUNqQyxtQkFBTyxDQUFDLENBQUMsQ0FBQyxFQUFFLFFBQVEsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLFNBQUUsQ0FBQyxJQUFJLHdDQUFpQixFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsWUFBSyxDQUFDLENBQUMsQ0FBQztRQUVuRSx5QkFBb0IsR0FBdUIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQ3JFLGdCQUFNLENBQUMsOENBQXVCLENBQUMsd0JBQXdCLENBQUMsRUFDeEQscUJBQVMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLGVBQVEsQ0FBQyx3QkFBd0IsR0FBRyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQzNELHFCQUFTLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsZ0JBQU0sQ0FBQyw4Q0FBdUIsQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDLENBQUMsRUFDdEYsZUFBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsSUFBSSx3Q0FBaUIsRUFBRSxDQUFDLENBQ25DLENBQUMsQ0FDSCxDQUFDO1FBRVEsdUJBQWtCLEdBQXVCLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUNuRSxnQkFBTSxDQUFDLDhDQUF1QixDQUFDLGlCQUFpQixDQUFDLEVBQ2pELHFCQUFTLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FDWixJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksRUFBRSxDQUFDLElBQUksQ0FDOUIsZUFBRyxDQUFDLGFBQWEsQ0FBQyxFQUFFLENBQUMsSUFBSSwrQ0FBd0IsQ0FBQyxhQUFhLENBQUMsQ0FBQyxFQUNqRSx1QkFBVyxDQUFDLE9BQU8sRUFBRSxJQUFJLCtDQUF3QixFQUFFLENBQUMsQ0FDckQsQ0FDRixDQUNGLENBQUM7UUFFUSx5QkFBb0IsR0FBdUIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQ3JFLGdCQUFNLENBQUMsOENBQXVCLENBQUMsbUJBQW1CLENBQUMsRUFDbkQsZUFBRyxDQUFDLENBQUMsTUFBMkIsRUFBRSxFQUFFLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxFQUNwRCxvQkFBUSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQ1osSUFBSSxDQUFDLGVBQWUsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUNuQyxlQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxJQUFJLGlEQUEwQixDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQzVDLHVCQUFXLENBQUMsT0FBTyxFQUFFLElBQUksaURBQTBCLEVBQUUsQ0FBQyxDQUN2RCxDQUNGLENBQ0YsQ0FBQztRQUVRLDRCQUF1QixHQUF1QixJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FDeEUsZ0JBQU0sQ0FBQyw4Q0FBdUIsQ0FBQyxzQkFBc0IsQ0FBQyxFQUN0RCxzQkFBVSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQ2IsSUFBSSxDQUFDLGVBQWUsQ0FBQyxVQUFVLEVBQUUsQ0FBQyxJQUFJLENBQ3BDLGVBQUcsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksb0RBQTZCLENBQUMsUUFBUSxDQUFDLENBQUMsRUFDNUQsdUJBQVcsQ0FBQyxPQUFPLEVBQUUsSUFBSSxvREFBNkIsRUFBRSxDQUFDLENBQzFELENBQ0YsQ0FDRixDQUFDO0lBTUUsQ0FBQztDQUNOLENBQUE7QUFqRFc7SUFBVCxnQkFBTSxFQUFFO21FQUdvRTtBQUVuRTtJQUFULGdCQUFNLEVBQUU7aUVBTVA7QUFFUTtJQUFULGdCQUFNLEVBQUU7K0RBUVA7QUFFUTtJQUFULGdCQUFNLEVBQUU7aUVBU1A7QUFFUTtJQUFULGdCQUFNLEVBQUU7b0VBUVA7QUE3Q1MsbUJBQW1CO0lBRC9CLGlCQUFVLEVBQUU7R0FDQSxtQkFBbUIsQ0FvRC9CO0FBcERZLGtEQUFtQiJ9