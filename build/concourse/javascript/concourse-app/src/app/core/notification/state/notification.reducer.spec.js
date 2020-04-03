"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const moment = require("moment");
const notification_faker_1 = require("../services/notification.faker");
const notification_actions_1 = require("./notification.actions");
const notification_reducer_1 = require("./notification.reducer");
describe('Notification Reducer', () => {
    describe('unknown action', () => {
        it('should return the initial state', () => {
            const action = {};
            const result = notification_reducer_1.reducer(notification_reducer_1.initialState, action);
            expect(result).toBe(notification_reducer_1.initialState);
        });
    });
    describe('OpenNotificationBar Action', () => {
        const action = {
            type: notification_actions_1.NotificationActionTypes.OpenNotificationBar
        };
        const result = notification_reducer_1.reducer(notification_reducer_1.initialState, action);
        it('should set isBarOpen to true', () => {
            expect(result.isBarOpen).toBe(true);
        });
    });
    describe('CloseNotificationBar Action', () => {
        const action = {
            type: notification_actions_1.NotificationActionTypes.CloseNotificationBar
        };
        const result = notification_reducer_1.reducer(notification_reducer_1.initialState, action);
        it('should set isBarOpen to false', () => {
            expect(result.isBarOpen).toBe(false);
        });
    });
    describe('ToggleNotificationBar Action', () => {
        const action = {
            type: notification_actions_1.NotificationActionTypes.ToggleNotificationBar
        };
        it('should flip isBarOpen from false to true', () => {
            const result = notification_reducer_1.reducer(notification_reducer_1.initialState, action);
            expect(result.isBarOpen).toBe(true);
        });
        it('should flip isBarOpen from true to false', () => {
            // Flip from false to true to initialize
            const previousState = notification_reducer_1.reducer(notification_reducer_1.initialState, action);
            const result = notification_reducer_1.reducer(previousState, action);
            expect(result.isBarOpen).toBe(false);
        });
    });
    describe('Load Notifications action', () => {
        it('should set loading to true', () => {
            const action = {
                type: notification_actions_1.NotificationActionTypes.LoadNotifications
            };
            const result = notification_reducer_1.reducer(notification_reducer_1.initialState, action);
            expect(result.loading).toBe(true);
        });
    });
    describe('Load Notifications Success action', () => {
        let action;
        let result;
        const notifications = notification_faker_1.fakeMany(2);
        const entities = notifications.reduce((acc, n) => (Object.assign(Object.assign({}, acc), { [n.id]: Object.assign(Object.assign({}, n), { received: moment().toDate() }) })), {});
        const ids = notifications.map(n => n.id);
        action = {
            type: notification_actions_1.NotificationActionTypes.LoadNotificationsSuccess,
            payload: notifications
        };
        result = notification_reducer_1.reducer(notification_reducer_1.initialState, action);
        it('should set loading to false', () => {
            expect(result.loading).toBe(false);
        });
        it('should set loaded to true', () => {
            expect(result.loaded).toBe(true);
        });
        it('should have two entities', () => {
            expect(Object.keys(result.entities).length).toBe(2);
        });
        it('should have two ids', () => {
            expect(result.ids.length).toBe(2);
            expect(result.ids).toEqual(ids);
        });
    });
    describe('Load Notifications Failure action', () => {
        const action = new notification_actions_1.LoadNotificationsFailure();
        const result = notification_reducer_1.reducer(notification_reducer_1.initialState, action);
        it('should set loading to false', () => {
            expect(result.loading).toBe(false);
        });
        it('should set loaded to false', () => {
            expect(result.loaded).toBe(false);
        });
    });
    describe('Dismiss Notification Actions', () => {
        const notifications = notification_faker_1.fakeMany(2);
        describe('Dismiss Notification action', () => {
            it('should set loading to true', () => {
                const action = {
                    type: notification_actions_1.NotificationActionTypes.DismissNotification,
                    payload: notifications[0].id
                };
                const result = notification_reducer_1.reducer(notification_reducer_1.initialState, action);
                expect(result.loading).toBe(true);
            });
        });
        describe('Dismiss Notification Success action', () => {
            const action = {
                type: notification_actions_1.NotificationActionTypes.DismissNotificationSuccess,
                payload: notifications[0].id
            };
            const prevState = notification_reducer_1.reducer(notification_reducer_1.initialState, new notification_actions_1.LoadNotificationsSuccess(notifications));
            const result = notification_reducer_1.reducer(prevState, action);
            it('should set loading to false', () => {
                expect(result.loading).toBe(false);
            });
            it('should have notifications[0] removed', () => {
                expect(result.ids.length).toBe(1);
                const found = result.ids.includes(notifications[0].id);
                expect(found).toBeFalsy();
            });
        });
        describe('Dismiss Notification Failure action', () => {
            const action = new notification_actions_1.DismissNotificationFailure();
            const result = notification_reducer_1.reducer(notification_reducer_1.initialState, action);
            it('should set loading to false', () => {
                expect(result.loading).toBe(false);
            });
            it('should set loaded to false', () => {
                expect(result.loaded).toBe(false);
            });
        });
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm90aWZpY2F0aW9uLnJlZHVjZXIuc3BlYy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL2NvbmNvdXJzZS9qYXZhc2NyaXB0L2NvbmNvdXJzZS1hcHAvc3JjL2FwcC9jb3JlL25vdGlmaWNhdGlvbi9zdGF0ZS9ub3RpZmljYXRpb24ucmVkdWNlci5zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsaUNBQWlDO0FBRWpDLHVFQUEwRDtBQUMxRCxpRUFXZ0M7QUFDaEMsaUVBQXNFO0FBRXRFLFFBQVEsQ0FBQyxzQkFBc0IsRUFBRSxHQUFHLEVBQUU7SUFDcEMsUUFBUSxDQUFDLGdCQUFnQixFQUFFLEdBQUcsRUFBRTtRQUM5QixFQUFFLENBQUMsaUNBQWlDLEVBQUUsR0FBRyxFQUFFO1lBQ3pDLE1BQU0sTUFBTSxHQUFHLEVBQVMsQ0FBQztZQUV6QixNQUFNLE1BQU0sR0FBRyw4QkFBTyxDQUFDLG1DQUFZLEVBQUUsTUFBTSxDQUFDLENBQUM7WUFFN0MsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxtQ0FBWSxDQUFDLENBQUM7UUFDcEMsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDLENBQUMsQ0FBQztJQUVILFFBQVEsQ0FBQyw0QkFBNEIsRUFBRSxHQUFHLEVBQUU7UUFDMUMsTUFBTSxNQUFNLEdBQXdCO1lBQ2xDLElBQUksRUFBRSw4Q0FBdUIsQ0FBQyxtQkFBbUI7U0FDbEQsQ0FBQztRQUVGLE1BQU0sTUFBTSxHQUFHLDhCQUFPLENBQUMsbUNBQVksRUFBRSxNQUFNLENBQUMsQ0FBQztRQUU3QyxFQUFFLENBQUMsOEJBQThCLEVBQUUsR0FBRyxFQUFFO1lBQ3RDLE1BQU0sQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3RDLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQyxDQUFDLENBQUM7SUFFSCxRQUFRLENB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