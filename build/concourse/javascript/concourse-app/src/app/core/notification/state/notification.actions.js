"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var NotificationActionTypes;
(function (NotificationActionTypes) {
    NotificationActionTypes["OpenNotificationBar"] = "[Notification] Open Notification Bar";
    NotificationActionTypes["CloseNotificationBar"] = "[Notification] Close Notification Bar";
    NotificationActionTypes["ToggleNotificationBar"] = "[Notification] Toggle Notification Bar";
    NotificationActionTypes["StartNotificationPolling"] = "[Notification] Start Notification Polling";
    NotificationActionTypes["StopNotificationPolling"] = "[Notification] Stop Notification Polling";
    NotificationActionTypes["LoadNotifications"] = "[Notification] Load Notifications";
    NotificationActionTypes["LoadNotificationsSuccess"] = "[Notification] Load Notifications Success";
    NotificationActionTypes["LoadNotificationsFailure"] = "[Notification] Load Notifications Failure";
    NotificationActionTypes["DismissNotification"] = "[Notification] Dismiss Notification";
    NotificationActionTypes["DismissNotificationSuccess"] = "[Notification] Dismiss Notification Success";
    NotificationActionTypes["DismissNotificationFailure"] = "[Notification] Dismiss Notification Failure";
    NotificationActionTypes["DismissAllNotification"] = "[Notification] Dismiss All Notifications";
    NotificationActionTypes["DismissAllNotificationSuccess"] = "[Notification] Dismiss All Notification Success";
    NotificationActionTypes["DismissAllNotificationFailure"] = "[Notification] Dismiss All Notification Failure";
})(NotificationActionTypes = exports.NotificationActionTypes || (exports.NotificationActionTypes = {}));
class OpenNotificationBar {
    constructor() {
        this.type = NotificationActionTypes.OpenNotificationBar;
    }
}
exports.OpenNotificationBar = OpenNotificationBar;
class CloseNotificationBar {
    constructor() {
        this.type = NotificationActionTypes.CloseNotificationBar;
    }
}
exports.CloseNotificationBar = CloseNotificationBar;
class ToggleNotificationBar {
    constructor() {
        this.type = NotificationActionTypes.ToggleNotificationBar;
    }
}
exports.ToggleNotificationBar = ToggleNotificationBar;
class StartNotificationPolling {
    constructor() {
        this.type = NotificationActionTypes.StartNotificationPolling;
    }
}
exports.StartNotificationPolling = StartNotificationPolling;
class StopNotificationPolling {
    constructor() {
        this.type = NotificationActionTypes.StopNotificationPolling;
    }
}
exports.StopNotificationPolling = StopNotificationPolling;
class LoadNotifications {
    constructor() {
        this.type = NotificationActionTypes.LoadNotifications;
    }
}
exports.LoadNotifications = LoadNotifications;
class LoadNotificationsSuccess {
    constructor(payload) {
        this.payload = payload;
        this.type = NotificationActionTypes.LoadNotificationsSuccess;
    }
}
exports.LoadNotificationsSuccess = LoadNotificationsSuccess;
class LoadNotificationsFailure {
    constructor() {
        this.type = NotificationActionTypes.LoadNotificationsFailure;
    }
}
exports.LoadNotificationsFailure = LoadNotificationsFailure;
class DismissNotification {
    constructor(payload) {
        this.payload = payload;
        this.type = NotificationActionTypes.DismissNotification;
    }
}
exports.DismissNotification = DismissNotification;
class DismissNotificationSuccess {
    constructor(payload) {
        this.payload = payload;
        this.type = NotificationActionTypes.DismissNotificationSuccess;
    }
}
exports.DismissNotificationSuccess = DismissNotificationSuccess;
class DismissNotificationFailure {
    constructor() {
        this.type = NotificationActionTypes.DismissNotificationFailure;
    }
}
exports.DismissNotificationFailure = DismissNotificationFailure;
class DismissAllNotification {
    constructor() {
        this.type = NotificationActionTypes.DismissAllNotification;
    }
}
exports.DismissAllNotification = DismissAllNotification;
class DismissAllNotificationSuccess {
    constructor(payload) {
        this.payload = payload;
        this.type = NotificationActionTypes.DismissAllNotificationSuccess;
    }
}
exports.DismissAllNotificationSuccess = DismissAllNotificationSuccess;
class DismissAllNotificationFailure {
    constructor() {
        this.type = NotificationActionTypes.DismissAllNotificationFailure;
    }
}
exports.DismissAllNotificationFailure = DismissAllNotificationFailure;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm90aWZpY2F0aW9uLmFjdGlvbnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9jb25jb3Vyc2UvamF2YXNjcmlwdC9jb25jb3Vyc2UtYXBwL3NyYy9hcHAvY29yZS9ub3RpZmljYXRpb24vc3RhdGUvbm90aWZpY2F0aW9uLmFjdGlvbnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFJQSxJQUFZLHVCQW1CWDtBQW5CRCxXQUFZLHVCQUF1QjtJQUNqQyx1RkFBNEQsQ0FBQTtJQUM1RCx5RkFBOEQsQ0FBQTtJQUM5RCwyRkFBZ0UsQ0FBQTtJQUVoRSxpR0FBc0UsQ0FBQTtJQUN0RSwrRkFBb0UsQ0FBQTtJQUVwRSxrRkFBdUQsQ0FBQTtJQUN2RCxpR0FBc0UsQ0FBQTtJQUN0RSxpR0FBc0UsQ0FBQTtJQUV0RSxzRkFBMkQsQ0FBQTtJQUMzRCxxR0FBMEUsQ0FBQTtJQUMxRSxxR0FBMEUsQ0FBQTtJQUUxRSw4RkFBbUUsQ0FBQTtJQUNuRSw0R0FBaUYsQ0FBQTtJQUNqRiw0R0FBaUYsQ0FBQTtBQUNuRixDQUFDLEVBbkJXLHVCQUF1QixHQUF2QiwrQkFBdUIsS0FBdkIsK0JBQXVCLFFBbUJsQztBQUVELE1BQWEsbUJBQW1CO0lBQWhDO1FBQ1csU0FBSSxHQUFHLHVCQUF1QixDQUFDLG1CQUFtQixDQUFDO0lBQzlELENBQUM7Q0FBQTtBQUZELGtEQUVDO0FBQ0QsTUFBYSxvQkFBb0I7SUFBakM7UUFDVyxTQUFJLEdBQUcsdUJBQXVCLENBQUMsb0JBQW9CLENBQUM7SUFDL0QsQ0FBQztDQUFBO0FBRkQsb0RBRUM7QUFDRCxNQUFhLHFCQUFxQjtJQUFsQztRQUNXLFNBQUksR0FBRyx1QkFBdUIsQ0FBQyxxQkFBcUIsQ0FBQztJQUNoRSxDQUFDO0NBQUE7QUFGRCxzREFFQztBQUVELE1BQWEsd0JBQXdCO0lBQXJDO1FBQ1csU0FBSSxHQUFHLHVCQUF1QixDQUFDLHdCQUF3QixDQUFDO0lBQ25FLENBQUM7Q0FBQTtBQUZELDREQUVDO0FBQ0QsTUFBYSx1QkFBdUI7SUFBcEM7UUFDVyxTQUFJLEdBQUcsdUJBQXVCLENBQUMsdUJBQXVCLENBQUM7SUFDbEUsQ0FBQztDQUFBO0FBRkQsMERBRUM7QUFFRCxNQUFhLGlCQUFpQjtJQUE5QjtRQUNXLFNBQUksR0FBRyx1QkFBdUIsQ0FBQyxpQkFBaUIsQ0FBQztJQUM1RCxDQUFDO0NBQUE7QUFGRCw4Q0FFQztBQUNELE1BQWEsd0JBQXdCO0lBRW5DLFlBQW1CLE9BQXVCO1FBQXZCLFlBQU8sR0FBUCxPQUFPLENBQWdCO1FBRGpDLFNBQUksR0FBRyx1QkFBdUIsQ0FBQyx3QkFBd0IsQ0FBQztJQUNuQixDQUFDO0NBQ2hEO0FBSEQsNERBR0M7QUFDRCxNQUFhLHdCQUF3QjtJQUFyQztRQUNXLFNBQUksR0FBRyx1QkFBdUIsQ0FBQyx3QkFBd0IsQ0FBQztJQUNuRSxDQUFDO0NBQUE7QUFGRCw0REFFQztBQUVELE1BQWEsbUJBQW1CO0lBRTlCLFlBQW1CLE9BQWU7UUFBZixZQUFPLEdBQVAsT0FBTyxDQUFRO1FBRHpCLFNBQUksR0FBRyx1QkFBdUIsQ0FBQyxtQkFBbUIsQ0FBQztJQUN0QixDQUFDO0NBQ3hDO0FBSEQsa0RBR0M7QUFDRCxNQUFhLDBCQUEwQjtJQUVyQyxZQUFtQixPQUFlO1FBQWYsWUFBTyxHQUFQLE9BQU8sQ0FBUTtRQUR6QixTQUFJLEdBQUcsdUJBQXVCLENBQUMsMEJBQTBCLENBQUM7SUFDN0IsQ0FBQztDQUN4QztBQUhELGdFQUdDO0FBQ0QsTUFBYSwwQkFBMEI7SUFBdkM7UUFDVyxTQUFJLEdBQUcsdUJBQXVCLENBQUMsMEJBQTBCLENBQUM7SUFDckUsQ0FBQztDQUFBO0FBRkQsZ0VBRUM7QUFFRCxNQUFhLHNCQUFzQjtJQUFuQztRQUNXLFNBQUksR0FBRyx1QkFBdUIsQ0FBQyxzQkFBc0IsQ0FBQztJQUNqRSxDQUFDO0NBQUE7QUFGRCx3REFFQztBQUNELE1BQWEsNkJBQTZCO0lBRXhDLFlBQW1CLE9BQVk7UUFBWixZQUFPLEdBQVAsT0FBTyxDQUFLO1FBRHRCLFNBQUksR0FBRyx1QkFBdUIsQ0FBQyw2QkFBNkIsQ0FBQztJQUNuQyxDQUFDO0NBQ3JDO0FBSEQsc0VBR0M7QUFDRCxNQUFhLDZCQUE2QjtJQUExQztRQUNXLFNBQUksR0FBRyx1QkFBdUIsQ0FBQyw2QkFBNkIsQ0FBQztJQUN4RSxDQUFDO0NBQUE7QUFGRCxzRUFFQyJ9