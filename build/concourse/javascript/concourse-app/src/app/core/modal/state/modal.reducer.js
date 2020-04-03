"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
const modal_actions_1 = require("./modal.actions");
exports.initialState = {
    activeModal: undefined,
    modals: undefined
};
// tslint:disable-next-line:only-arrow-functions
function reducer(state = exports.initialState, action) {
    switch (action.type) {
        case modal_actions_1.ModalActionTypes.OpenModalSuccess: {
            const _a = action.payload.modalRef, { content } = _a, modalRef = __rest(_a, ["content"]);
            return Object.assign(Object.assign({}, state), { activeModal: action.payload.id, modals: Object.assign(Object.assign({}, state.modals), { [action.payload.id]: modalRef }) });
        }
        case modal_actions_1.ModalActionTypes.CloseModalSuccess: {
            const modalIds = state.modals ? Object.keys(state.modals) : [];
            const activeModal = modalIds[modalIds.length - 2];
            const modals = modalIds.reduce((m, id) => {
                if (id !== action.payload) {
                    m[id] = state.modals[id];
                }
                return m;
            }, {});
            return Object.assign(Object.assign({}, state), { activeModal: typeof state.modals !== 'undefined' ? activeModal : undefined, modals });
        }
        default: {
            return state;
        }
    }
}
exports.reducer = reducer;
exports.modals = (state) => state.modals;
exports.activeModal = (state) => state.activeModal;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kYWwucmVkdWNlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL2NvbmNvdXJzZS9qYXZhc2NyaXB0L2NvbmNvdXJzZS1hcHAvc3JjL2FwcC9jb3JlL21vZGFsL3N0YXRlL21vZGFsLnJlZHVjZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUVBLG1EQUFpRTtBQVNwRCxRQUFBLFlBQVksR0FBVTtJQUNqQyxXQUFXLEVBQUUsU0FBUztJQUN0QixNQUFNLEVBQUUsU0FBUztDQUNsQixDQUFDO0FBRUYsZ0RBQWdEO0FBQ2hELFNBQWdCLE9BQU8sQ0FBQyxLQUFLLEdBQUcsb0JBQVksRUFBRSxNQUFvQjtJQUNoRSxRQUFRLE1BQU0sQ0FBQyxJQUFJLEVBQUU7UUFFbkIsS0FBSyxnQ0FBZ0IsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1lBQ3RDLE1BQU0sNEJBQWtELEVBQWxELEVBQUUsT0FBTyxPQUF5QyxFQUF2QyxrQ0FBdUMsQ0FBQztZQUN6RCx1Q0FDSyxLQUFLLEtBQ1IsV0FBVyxFQUFFLE1BQU0sQ0FBQyxPQUFPLENBQUMsRUFBRSxFQUM5QixNQUFNLGtDQUNELEtBQUssQ0FBQyxNQUFNLEtBQ2YsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxFQUFFLFFBQVEsT0FFL0I7U0FDSDtRQUVELEtBQUssZ0NBQWdCLENBQUMsaUJBQWlCLENBQUMsQ0FBQztZQUN2QyxNQUFNLFFBQVEsR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO1lBQy9ELE1BQU0sV0FBVyxHQUFHLFFBQVEsQ0FBQyxRQUFRLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBQ2xELE1BQU0sTUFBTSxHQUFHLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUU7Z0JBQ3ZDLElBQUksRUFBRSxLQUFLLE1BQU0sQ0FBQyxPQUFPLEVBQUU7b0JBQ3pCLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDO2lCQUMxQjtnQkFDRCxPQUFPLENBQUMsQ0FBQztZQUNYLENBQUMsRUFBRSxFQUE0QyxDQUFDLENBQUM7WUFFakQsdUNBQ0ssS0FBSyxLQUNSLFdBQVcsRUFBRSxPQUFPLEtBQUssQ0FBQyxNQUFNLEtBQUssV0FBVyxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLFNBQVMsRUFDMUUsTUFBTSxJQUNOO1NBQ0g7UUFFRCxPQUFPLENBQUMsQ0FBQztZQUNQLE9BQU8sS0FBSyxDQUFDO1NBQ2Q7S0FDRjtBQUNILENBQUM7QUFwQ0QsMEJBb0NDO0FBRVksUUFBQSxNQUFNLEdBQUcsQ0FBQyxLQUFZLEVBQUUsRUFBRSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUM7QUFDeEMsUUFBQSxXQUFXLEdBQUcsQ0FBQyxLQUFZLEVBQUUsRUFBRSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMifQ==