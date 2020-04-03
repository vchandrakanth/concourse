"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const store_1 = require("@ngrx/store");
const fromNotification = require("./notification.reducer");
exports.getNotificationState = store_1.createFeatureSelector('notification');
exports.getBarState = store_1.createSelector(exports.getNotificationState, fromNotification.isBarOpen);
exports.getNotificationBarLastOpened = store_1.createSelector(exports.getNotificationState, fromNotification.getLastOpened);
exports.isLoaded = store_1.createSelector(exports.getNotificationState, fromNotification.isLoaded);
exports.isUpdating = store_1.createSelector(exports.getNotificationState, fromNotification.isUpdating);
exports.getAllNotifications = store_1.createSelector(exports.getNotificationState, fromNotification.selectAll);
exports.getNotificationCount = store_1.createSelector(exports.getNotificationState, fromNotification.selectTotal);
exports.getNewNotificationCount = store_1.createSelector(exports.getNotificationBarLastOpened, exports.getAllNotifications, 
// tslint:disable-next-line:no-parameter-reassignment
(lastOpened, notifications) => notifications.reduce((count, n) => lastOpened < n.received ? count += 1 : count, 0));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm90aWZpY2F0aW9uLnNlbGVjdG9ycy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL2NvbmNvdXJzZS9qYXZhc2NyaXB0L2NvbmNvdXJzZS1hcHAvc3JjL2FwcC9jb3JlL25vdGlmaWNhdGlvbi9zdGF0ZS9ub3RpZmljYXRpb24uc2VsZWN0b3JzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsdUNBQW9FO0FBQ3BFLDJEQUEyRDtBQUU5QyxRQUFBLG9CQUFvQixHQUFHLDZCQUFxQixDQUF5QixjQUFjLENBQUMsQ0FBQztBQUNyRixRQUFBLFdBQVcsR0FBRyxzQkFBYyxDQUFDLDRCQUFvQixFQUFFLGdCQUFnQixDQUFDLFNBQVMsQ0FBQyxDQUFDO0FBQy9FLFFBQUEsNEJBQTRCLEdBQUcsc0JBQWMsQ0FBQyw0QkFBb0IsRUFBRSxnQkFBZ0IsQ0FBQyxhQUFhLENBQUMsQ0FBQztBQUNwRyxRQUFBLFFBQVEsR0FBRyxzQkFBYyxDQUFDLDRCQUFvQixFQUFFLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBQzNFLFFBQUEsVUFBVSxHQUFHLHNCQUFjLENBQUMsNEJBQW9CLEVBQUUsZ0JBQWdCLENBQUMsVUFBVSxDQUFDLENBQUM7QUFDL0UsUUFBQSxtQkFBbUIsR0FBRyxzQkFBYyxDQUFDLDRCQUFvQixFQUFFLGdCQUFnQixDQUFDLFNBQVMsQ0FBQyxDQUFDO0FBQ3ZGLFFBQUEsb0JBQW9CLEdBQUcsc0JBQWMsQ0FBQyw0QkFBb0IsRUFBRSxnQkFBZ0IsQ0FBQyxXQUFXLENBQUMsQ0FBQztBQUMxRixRQUFBLHVCQUF1QixHQUFHLHNCQUFjLENBQ25ELG9DQUE0QixFQUM1QiwyQkFBbUI7QUFDbkIscURBQXFEO0FBQ3JELENBQUMsVUFBVSxFQUFFLGFBQWEsRUFBRSxFQUFFLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDLFVBQVUsR0FBRyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyJ9