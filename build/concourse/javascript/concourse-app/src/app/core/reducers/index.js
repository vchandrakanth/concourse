"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fromRouter = require("@ngrx/router-store");
const fromApplicationError = require("../error/state/error.reducer");
const fromFeatureFlag = require("../feature-flags/state/feature-flag.reducer");
const fromModal = require("../modal/state/modal.reducer");
const fromNotification = require("../notification/state/notification.reducer");
const clear_state_1 = require("./clear-state");
exports.reducers = {
    router: fromRouter.routerReducer,
    notification: fromNotification.reducer,
    modal: fromModal.reducer,
    'application-error': fromApplicationError.reducer,
    'feature-flag': fromFeatureFlag.reducer
};
exports.coreMetaReducers = [clear_state_1.clearState];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9jb25jb3Vyc2UvamF2YXNjcmlwdC9jb25jb3Vyc2UtYXBwL3NyYy9hcHAvY29yZS9yZWR1Y2Vycy9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLGlEQUFpRDtBQUlqRCxxRUFBcUU7QUFDckUsK0VBQStFO0FBQy9FLDBEQUEwRDtBQUMxRCwrRUFBK0U7QUFDL0UsK0NBQTJDO0FBVTlCLFFBQUEsUUFBUSxHQUE0QjtJQUMvQyxNQUFNLEVBQUUsVUFBVSxDQUFDLGFBQWE7SUFDaEMsWUFBWSxFQUFFLGdCQUFnQixDQUFDLE9BQU87SUFDdEMsS0FBSyxFQUFFLFNBQVMsQ0FBQyxPQUFPO0lBQ3hCLG1CQUFtQixFQUFFLG9CQUFvQixDQUFDLE9BQU87SUFDakQsY0FBYyxFQUFFLGVBQWUsQ0FBQyxPQUFPO0NBQ3hDLENBQUM7QUFFVyxRQUFBLGdCQUFnQixHQUFVLENBQUMsd0JBQVUsQ0FBQyxDQUFDIn0=