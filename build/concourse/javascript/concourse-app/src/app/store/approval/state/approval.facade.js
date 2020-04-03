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
const selectors_1 = require("@concourse/store/selectors");
const approval_actions_1 = require("./approval.actions");
const query = require("./approval.selectors");
let ApprovalFacade = class ApprovalFacade {
    constructor(store) {
        this.store = store;
        this.list$ = this.store.pipe(store_1.select(query.getAll));
        this.selected$ = this.store.pipe(store_1.select(query.getSelected));
        this.selectedWithRelated$ = this.store.pipe(store_1.select(selectors_1.getSelectedApprovalRequestWithRelated));
        this.isUpdating$ = this.store.pipe(store_1.select(query.getIsUpdating));
    }
    postAction(approvalRequestId, approvalAction) {
        this.store.dispatch(new approval_actions_1.ApprovalRequestAction({ approvalRequestId, approvalAction }));
    }
};
ApprovalFacade = __decorate([
    core_1.Injectable()
], ApprovalFacade);
exports.ApprovalFacade = ApprovalFacade;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwcm92YWwuZmFjYWRlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vY29uY291cnNlL2phdmFzY3JpcHQvY29uY291cnNlLWFwcC9zcmMvYXBwL3N0b3JlL2FwcHJvdmFsL3N0YXRlL2FwcHJvdmFsLmZhY2FkZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBLHdDQUEyQztBQUMzQyx1Q0FBNEM7QUFHNUMsMERBQW1GO0FBQ25GLHlEQUEyRDtBQUUzRCw4Q0FBOEM7QUFHOUMsSUFBYSxjQUFjLEdBQTNCLE1BQWEsY0FBYztJQU16QixZQUNtQixLQUFtQjtRQUFuQixVQUFLLEdBQUwsS0FBSyxDQUFjO1FBTnRDLFVBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxjQUFNLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7UUFDOUMsY0FBUyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLGNBQU0sQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztRQUN2RCx5QkFBb0IsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxjQUFNLENBQUMsaURBQXFDLENBQUMsQ0FBQyxDQUFDO1FBQ3RGLGdCQUFXLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsY0FBTSxDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDO0lBSXZELENBQUM7SUFFTCxVQUFVLENBQ1IsaUJBQXlCLEVBQ3pCLGNBQXVDO1FBRXZDLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLElBQUksd0NBQXFCLENBQUMsRUFBRSxpQkFBaUIsRUFBRSxjQUFjLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDeEYsQ0FBQztDQUVGLENBQUE7QUFqQlksY0FBYztJQUQxQixpQkFBVSxFQUFFO0dBQ0EsY0FBYyxDQWlCMUI7QUFqQlksd0NBQWMifQ==