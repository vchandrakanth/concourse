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
const audit_history_actions_1 = require("./audit-history.actions");
const query = require("./audit-history.selectors");
let AuditHistoryFacade = class AuditHistoryFacade {
    constructor(store) {
        this.store = store;
        this.isLoading$ = this.store.pipe(store_1.select(query.getIsLoading));
        this.isLoaded$ = this.store.pipe(store_1.select(query.getIsLoaded));
        this.auditHistory$ = this.store.pipe(store_1.select(selectors_1.getAuditHistoryWithRelated));
    }
    load(payload) {
        this.store.dispatch(new audit_history_actions_1.GetAuditHistory(payload));
    }
    reset() {
        this.store.dispatch(new audit_history_actions_1.ResetAuditHistory());
    }
};
AuditHistoryFacade = __decorate([
    core_1.Injectable()
], AuditHistoryFacade);
exports.AuditHistoryFacade = AuditHistoryFacade;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXVkaXQtaGlzdG9yeS5mYWNhZGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9jb25jb3Vyc2UvamF2YXNjcmlwdC9jb25jb3Vyc2UtYXBwL3NyYy9hcHAvc3RvcmUvYXVkaXQtaGlzdG9yeS9zdGF0ZS9hdWRpdC1oaXN0b3J5LmZhY2FkZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBLHdDQUEyQztBQUMzQyx1Q0FBNEM7QUFFNUMsMERBQXdFO0FBQ3hFLG1FQUlpQztBQUVqQyxtREFBbUQ7QUFHbkQsSUFBYSxrQkFBa0IsR0FBL0IsTUFBYSxrQkFBa0I7SUFLN0IsWUFDbUIsS0FBbUI7UUFBbkIsVUFBSyxHQUFMLEtBQUssQ0FBYztRQUx0QyxlQUFVLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsY0FBTSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDO1FBQ3pELGNBQVMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxjQUFNLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7UUFDdkQsa0JBQWEsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxjQUFNLENBQUMsc0NBQTBCLENBQUMsQ0FBQyxDQUFDO0lBSWhFLENBQUM7SUFFTCxJQUFJLENBQUMsT0FBNEI7UUFDL0IsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsSUFBSSx1Q0FBZSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7SUFDcEQsQ0FBQztJQUVELEtBQUs7UUFDSCxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxJQUFJLHlDQUFpQixFQUFFLENBQUMsQ0FBQztJQUMvQyxDQUFDO0NBRUYsQ0FBQTtBQWpCWSxrQkFBa0I7SUFEOUIsaUJBQVUsRUFBRTtHQUNBLGtCQUFrQixDQWlCOUI7QUFqQlksZ0RBQWtCIn0=