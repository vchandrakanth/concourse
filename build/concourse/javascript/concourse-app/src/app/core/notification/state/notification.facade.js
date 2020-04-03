"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const store_1 = require("@ngrx/store");
const index_1 = require("@concourse/store/selectors/index");
const notification_actions_1 = require("./notification.actions");
const queryNotification = require("./notification.selectors");
let NotificationFacade = class NotificationFacade {
    constructor(store) {
        this.store = store;
        this.getBarState$ = this.store.pipe(store_1.select(queryNotification.getBarState));
        this.isLoaded$ = this.store.pipe(store_1.select(queryNotification.isLoaded));
        this.isUpdating$ = this.store.pipe(store_1.select(queryNotification.isUpdating));
        this.notifications$ = this.store.pipe(store_1.select(index_1.notificationsWithRelated));
        this.notificationBarLastOpened$ = this.store.select(queryNotification.getNotificationBarLastOpened);
        this.notificationCount$ = this.store.pipe(store_1.select(queryNotification.getNotificationCount));
        this.newNotificationCount$ = this.store.pipe(store_1.select(queryNotification.getNewNotificationCount));
    }
    openBar() {
        this.store.dispatch(new notification_actions_1.OpenNotificationBar());
    }
    closeBar() {
        this.store.dispatch(new notification_actions_1.CloseNotificationBar());
    }
    toggleBar() {
        this.store.dispatch(new notification_actions_1.ToggleNotificationBar());
    }
    loadNotifications() {
        this.store.dispatch(new notification_actions_1.LoadNotifications());
    }
    startNotificationPolling() {
        this.store.dispatch(new notification_actions_1.StartNotificationPolling());
    }
    dismissNotification(notification) {
        this.store.dispatch(new notification_actions_1.DismissNotification(notification.id));
    }
    dismissAllNotifications() {
        this.store.dispatch(new notification_actions_1.DismissAllNotification());
    }
};
NotificationFacade = __decorate([
    core_1.Injectable()
], NotificationFacade);
exports.NotificationFacade = NotificationFacade;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm90aWZpY2F0aW9uLmZhY2FkZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL2NvbmNvdXJzZS9qYXZhc2NyaXB0L2NvbmNvdXJzZS1hcHAvc3JjL2FwcC9jb3JlL25vdGlmaWNhdGlvbi9zdGF0ZS9ub3RpZmljYXRpb24uZmFjYWRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUEsd0NBQTJDO0FBQzNDLHVDQUE0QztBQUc1Qyw0REFBNEU7QUFDNUUsaUVBUWdDO0FBRWhDLDhEQUE4RDtBQUU5RCxJQUFhLGtCQUFrQixHQUEvQixNQUFhLGtCQUFrQjtJQVM3QixZQUNtQixLQUFtQjtRQUFuQixVQUFLLEdBQUwsS0FBSyxDQUFjO1FBVHRDLGlCQUFZLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsY0FBTSxDQUFDLGlCQUFpQixDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7UUFDdEUsY0FBUyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLGNBQU0sQ0FBQyxpQkFBaUIsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO1FBQ2hFLGdCQUFXLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsY0FBTSxDQUFDLGlCQUFpQixDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7UUFDcEUsbUJBQWMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxjQUFNLENBQUMsZ0NBQXdCLENBQUMsQ0FBQyxDQUFDO1FBQ25FLCtCQUEwQixHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLGlCQUFpQixDQUFDLDRCQUE0QixDQUFDLENBQUM7UUFDL0YsdUJBQWtCLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsY0FBTSxDQUFDLGlCQUFpQixDQUFDLG9CQUFvQixDQUFDLENBQUMsQ0FBQztRQUNyRiwwQkFBcUIsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxjQUFNLENBQUMsaUJBQWlCLENBQUMsdUJBQXVCLENBQUMsQ0FBQyxDQUFDO0lBSXZGLENBQUM7SUFFTCxPQUFPO1FBQ0wsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsSUFBSSwwQ0FBbUIsRUFBRSxDQUFDLENBQUM7SUFDakQsQ0FBQztJQUVELFFBQVE7UUFDTixJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxJQUFJLDJDQUFvQixFQUFFLENBQUMsQ0FBQztJQUNsRCxDQUFDO0lBRUQsU0FBUztRQUNQLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLElBQUksNENBQXFCLEVBQUUsQ0FBQyxDQUFDO0lBQ25ELENBQUM7SUFFRCxpQkFBaUI7UUFDZixJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxJQUFJLHdDQUFpQixFQUFFLENBQUMsQ0FBQztJQUMvQyxDQUFDO0lBRUQsd0JBQXdCO1FBQ3RCLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLElBQUksK0NBQXdCLEVBQUUsQ0FBQyxDQUFDO0lBQ3RELENBQUM7SUFFRCxtQkFBbUIsQ0FBQyxZQUEwQjtRQUM1QyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxJQUFJLDBDQUFtQixDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQ2hFLENBQUM7SUFFRCx1QkFBdUI7UUFDckIsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsSUFBSSw2Q0FBc0IsRUFBRSxDQUFDLENBQUM7SUFDcEQsQ0FBQztDQUNGLENBQUE7QUF4Q1ksa0JBQWtCO0lBRDlCLGlCQUFVLEVBQUU7R0FDQSxrQkFBa0IsQ0F3QzlCO0FBeENZLGdEQUFrQiJ9