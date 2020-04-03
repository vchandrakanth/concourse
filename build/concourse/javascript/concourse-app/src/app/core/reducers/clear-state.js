"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const auth_actions_1 = require("@concourse/store/auth/state/auth.actions");
/**
 * clearState will clear entire stored state, useful to reset everything when logging out
 */
function clearState(reducer) {
    return (state, action) => {
        if (action.type === auth_actions_1.AuthActionTypes.LogoutSuccess) {
            state = undefined;
        }
        return reducer(state, action);
    };
}
exports.clearState = clearState;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xlYXItc3RhdGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9jb25jb3Vyc2UvamF2YXNjcmlwdC9jb25jb3Vyc2UtYXBwL3NyYy9hcHAvY29yZS9yZWR1Y2Vycy9jbGVhci1zdGF0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDJFQUEyRTtBQUczRTs7R0FFRztBQUNILFNBQWdCLFVBQVUsQ0FBQyxPQUEyQjtJQUNwRCxPQUFPLENBQUMsS0FBSyxFQUFFLE1BQU0sRUFBRSxFQUFFO1FBRXZCLElBQUksTUFBTSxDQUFDLElBQUksS0FBSyw4QkFBZSxDQUFDLGFBQWEsRUFBRTtZQUNqRCxLQUFLLEdBQUcsU0FBUyxDQUFDO1NBQ25CO1FBRUQsT0FBTyxPQUFPLENBQUMsS0FBSyxFQUFFLE1BQU0sQ0FBQyxDQUFDO0lBQ2hDLENBQUMsQ0FBQztBQUNKLENBQUM7QUFURCxnQ0FTQyJ9