"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const entity_1 = require("@ngrx/entity");
const moment = require("moment");
const notification_actions_1 = require("./notification.actions");
const helpers_1 = require("@concourse/shared/helpers");
exports.adapter = entity_1.createEntityAdapter();
exports.initialState = exports.adapter.getInitialState({
    ids: [],
    isBarOpen: false,
    lastOpened: moment().toDate(),
    loading: false,
    loaded: false
});
function reducer(state = exports.initialState, action) {
    switch (action.type) {
        case notification_actions_1.NotificationActionTypes.OpenNotificationBar: {
            return Object.assign(Object.assign({}, state), { isBarOpen: true });
        }
        case notification_actions_1.NotificationActionTypes.CloseNotificationBar: {
            return Object.assign(Object.assign({}, state), { lastOpened: moment().toDate(), isBarOpen: false });
        }
        case notification_actions_1.NotificationActionTypes.ToggleNotificationBar: {
            return Object.assign(Object.assign({}, state), { lastOpened: state.isBarOpen ? moment().toDate() : state.lastOpened, isBarOpen: !state.isBarOpen });
        }
        case notification_actions_1.NotificationActionTypes.LoadNotifications: {
            return Object.assign(Object.assign({}, state), { loading: true });
        }
        case notification_actions_1.NotificationActionTypes.LoadNotificationsSuccess: {
            const payload = action.payload.map(n => (n.copyWith({
                created: moment(n.created).toDate(),
                updated: moment(n.updated).toDate(),
                received: moment().toDate()
            })));
            return Object.assign(Object.assign({}, exports.adapter.addMany(payload, state)), { loading: false, loaded: true });
        }
        case notification_actions_1.NotificationActionTypes.DismissAllNotification:
        case notification_actions_1.NotificationActionTypes.DismissNotification: {
            return Object.assign(Object.assign({}, state), { loading: true });
        }
        case notification_actions_1.NotificationActionTypes.DismissNotificationSuccess: {
            return Object.assign(Object.assign({}, exports.adapter.removeOne(action.payload, state)), { loading: false });
        }
        case notification_actions_1.NotificationActionTypes.DismissAllNotificationSuccess: {
            return Object.assign(Object.assign({}, exports.adapter.removeAll(state)), { loading: false });
        }
        case notification_actions_1.NotificationActionTypes.LoadNotificationsFailure:
        case notification_actions_1.NotificationActionTypes.DismissNotificationFailure:
        case notification_actions_1.NotificationActionTypes.DismissAllNotificationFailure: {
            return Object.assign(Object.assign({}, state), { loading: false, loaded: false });
        }
        default:
            return state;
    }
}
exports.reducer = reducer;
_a = exports.adapter.getSelectors(), exports.selectAll = _a.selectAll, exports.selectEntities = _a.selectEntities, exports.selectTotal = _a.selectTotal;
exports.isBarOpen = (state) => state.isBarOpen;
exports.getLastOpened = (state) => state.lastOpened;
exports.isLoaded = helpers_1.isStateLoaded();
exports.isUpdating = helpers_1.isStateUpdating();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm90aWZpY2F0aW9uLnJlZHVjZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9jb25jb3Vyc2UvamF2YXNjcmlwdC9jb25jb3Vyc2UtYXBwL3NyYy9hcHAvY29yZS9ub3RpZmljYXRpb24vc3RhdGUvbm90aWZpY2F0aW9uLnJlZHVjZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEseUNBQStFO0FBQy9FLGlDQUFpQztBQUNqQyxpRUFBc0Y7QUFHdEYsdURBQTJFO0FBVTlELFFBQUEsT0FBTyxHQUFnQyw0QkFBbUIsRUFBZ0IsQ0FBQztBQUUzRSxRQUFBLFlBQVksR0FBVSxlQUFPLENBQUMsZUFBZSxDQUFDO0lBQ3pELEdBQUcsRUFBRSxFQUFFO0lBQ1AsU0FBUyxFQUFFLEtBQUs7SUFDaEIsVUFBVSxFQUFFLE1BQU0sRUFBRSxDQUFDLE1BQU0sRUFBRTtJQUM3QixPQUFPLEVBQUUsS0FBSztJQUNkLE1BQU0sRUFBRSxLQUFLO0NBQ2QsQ0FBQyxDQUFDO0FBRUgsU0FBZ0IsT0FBTyxDQUFDLEtBQUssR0FBRyxvQkFBWSxFQUFFLE1BQTJCO0lBQ3ZFLFFBQVEsTUFBTSxDQUFDLElBQUksRUFBRTtRQUNuQixLQUFLLDhDQUF1QixDQUFDLG1CQUFtQixDQUFDLENBQUM7WUFDaEQsdUNBQ0ssS0FBSyxLQUNSLFNBQVMsRUFBRSxJQUFJLElBQ2Y7U0FDSDtRQUVELEtBQUssOENBQXVCLENBQUMsb0JBQW9CLENBQUMsQ0FBQztZQUNqRCx1Q0FDSyxLQUFLLEtBQ1IsVUFBVSxFQUFFLE1BQU0sRUFBRSxDQUFDLE1BQU0sRUFBRSxFQUM3QixTQUFTLEVBQUUsS0FBSyxJQUNoQjtTQUNIO1FBRUQsS0FBSyw4Q0FBdUIsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO1lBQ2xELHVDQUNLLEtBQUssS0FDUixVQUFVLEVBQUUsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxVQUFVLEVBQ2xFLFNBQVMsRUFBRSxDQUFDLEtBQUssQ0FBQyxTQUFTLElBQzNCO1NBQ0g7UUFFRCxLQUFLLDhDQUF1QixDQUFDLGlCQUFpQixDQUFDLENBQUM7WUFDOUMsdUNBQ0ssS0FBSyxLQUNSLE9BQU8sRUFBRSxJQUFJLElBQ2I7U0FDSDtRQUVELEtBQUssOENBQXVCLENBQUMsd0JBQXdCLENBQUMsQ0FBQztZQUNyRCxNQUFNLE9BQU8sR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FDakQ7Z0JBQ0UsT0FBTyxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsTUFBTSxFQUFFO2dCQUNuQyxPQUFPLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxNQUFNLEVBQUU7Z0JBQ25DLFFBQVEsRUFBRSxNQUFNLEVBQUUsQ0FBQyxNQUFNLEVBQUU7YUFDNUIsQ0FDRixDQUFDLENBQUMsQ0FBQztZQUNKLHVDQUNLLGVBQU8sQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQyxLQUNsQyxPQUFPLEVBQUUsS0FBSyxFQUNkLE1BQU0sRUFBRSxJQUFJLElBQ1o7U0FDSDtRQUVELEtBQUssOENBQXVCLENBQUMsc0JBQXNCLENBQUM7UUFDcEQsS0FBSyw4Q0FBdUIsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO1lBQ2hELHVDQUNLLEtBQUssS0FDUixPQUFPLEVBQUUsSUFBSSxJQUNiO1NBQ0g7UUFFRCxLQUFLLDhDQUF1QixDQUFDLDBCQUEwQixDQUFDLENBQUM7WUFDdkQsdUNBQ0ssZUFBTyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQyxLQUMzQyxPQUFPLEVBQUUsS0FBSyxJQUNkO1NBQ0g7UUFFRCxLQUFLLDhDQUF1QixDQUFDLDZCQUE2QixDQUFDLENBQUM7WUFDMUQsdUNBQ0ssZUFBTyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsS0FDM0IsT0FBTyxFQUFFLEtBQUssSUFDZDtTQUNIO1FBRUQsS0FBSyw4Q0FBdUIsQ0FBQyx3QkFBd0IsQ0FBQztRQUN0RCxLQUFLLDhDQUF1QixDQUFDLDBCQUEwQixDQUFDO1FBQ3hELEtBQUssOENBQXVCLENBQUMsNkJBQTZCLENBQUMsQ0FBQztZQUMxRCx1Q0FDSyxLQUFLLEtBQ1IsT0FBTyxFQUFFLEtBQUssRUFDZCxNQUFNLEVBQUUsS0FBSyxJQUNiO1NBQ0g7UUFFRDtZQUNFLE9BQU8sS0FBSyxDQUFDO0tBQ2hCO0FBQ0gsQ0FBQztBQWxGRCwwQkFrRkM7QUFDWSxtQ0FBbUUscUhBQUM7QUFDcEUsUUFBQSxTQUFTLEdBQUcsQ0FBQyxLQUFZLEVBQUUsRUFBRSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUM7QUFDOUMsUUFBQSxhQUFhLEdBQUcsQ0FBQyxLQUFZLEVBQUUsRUFBRSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUM7QUFDbkQsUUFBQSxRQUFRLEdBQUcsdUJBQWEsRUFBRSxDQUFDO0FBQzNCLFFBQUEsVUFBVSxHQUFHLHlCQUFlLEVBQUUsQ0FBQyJ9