"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const audit_history_actions_1 = require("./audit-history.actions");
const initialState = {
    auditHistory: [],
    loading: false,
    loaded: false,
    entityType: undefined,
    entityId: undefined
};
// tslint:disable-next-line:only-arrow-functions
function reducer(state = initialState, action) {
    switch (action.type) {
        case audit_history_actions_1.AuditHistoryActionTypes.GetAuditHistory: {
            return Object.assign(Object.assign(Object.assign({}, initialState), action.payload), { loading: true });
        }
        case audit_history_actions_1.AuditHistoryActionTypes.GetAuditHistorySuccess: {
            return Object.assign(Object.assign({}, state), { auditHistory: action.payload, loading: false, loaded: true });
        }
        case audit_history_actions_1.AuditHistoryActionTypes.GetAuditHistoryFailure: {
            return Object.assign(Object.assign({}, state), { loading: false, loaded: false });
        }
        case audit_history_actions_1.AuditHistoryActionTypes.ResetAuditHistory: {
            return initialState;
        }
        default: {
            return state;
        }
    }
}
exports.reducer = reducer;
exports.getAuditHistory = (state) => state.auditHistory;
exports.getIsLoading = (state) => state.loading;
exports.getIsLoaded = (state) => state.loaded;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXVkaXQtaGlzdG9yeS5yZWR1Y2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vY29uY291cnNlL2phdmFzY3JpcHQvY29uY291cnNlLWFwcC9zcmMvYXBwL3N0b3JlL2F1ZGl0LWhpc3Rvcnkvc3RhdGUvYXVkaXQtaGlzdG9yeS5yZWR1Y2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQ0EsbUVBR2lDO0FBVWpDLE1BQU0sWUFBWSxHQUFVO0lBQzFCLFlBQVksRUFBRSxFQUFFO0lBQ2hCLE9BQU8sRUFBRSxLQUFLO0lBQ2QsTUFBTSxFQUFFLEtBQUs7SUFDYixVQUFVLEVBQUUsU0FBUztJQUNyQixRQUFRLEVBQUUsU0FBUztDQUNwQixDQUFDO0FBRUYsZ0RBQWdEO0FBQ2hELFNBQWdCLE9BQU8sQ0FDckIsS0FBSyxHQUFHLFlBQVksRUFDcEIsTUFBMkI7SUFFM0IsUUFBUSxNQUFNLENBQUMsSUFBSSxFQUFFO1FBQ25CLEtBQUssK0NBQXVCLENBQUMsZUFBZSxDQUFDLENBQUM7WUFDNUMscURBQ0ssWUFBWSxHQUNaLE1BQU0sQ0FBQyxPQUFPLEtBQ2pCLE9BQU8sRUFBRSxJQUFJLElBQ2I7U0FDSDtRQUVELEtBQUssK0NBQXVCLENBQUMsc0JBQXNCLENBQUMsQ0FBQztZQUNuRCx1Q0FDSyxLQUFLLEtBQ1IsWUFBWSxFQUFFLE1BQU0sQ0FBQyxPQUFPLEVBQzVCLE9BQU8sRUFBRSxLQUFLLEVBQ2QsTUFBTSxFQUFFLElBQUksSUFDWjtTQUNIO1FBRUQsS0FBSywrQ0FBdUIsQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO1lBQ25ELHVDQUNLLEtBQUssS0FDUixPQUFPLEVBQUUsS0FBSyxFQUNkLE1BQU0sRUFBRSxLQUFLLElBQ2I7U0FDSDtRQUVELEtBQUssK0NBQXVCLENBQUMsaUJBQWlCLENBQUMsQ0FBQztZQUM5QyxPQUFPLFlBQVksQ0FBQztTQUNyQjtRQUVELE9BQU8sQ0FBQyxDQUFDO1lBQ1AsT0FBTyxLQUFLLENBQUM7U0FDZDtLQUNGO0FBQ0gsQ0FBQztBQXRDRCwwQkFzQ0M7QUFFWSxRQUFBLGVBQWUsR0FBRyxDQUFDLEtBQVksRUFBRSxFQUFFLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQztBQUN2RCxRQUFBLFlBQVksR0FBRyxDQUFDLEtBQVksRUFBRSxFQUFFLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQztBQUMvQyxRQUFBLFdBQVcsR0FBRyxDQUFDLEtBQVksRUFBRSxFQUFFLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyJ9