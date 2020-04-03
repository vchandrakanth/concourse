"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const faBell_1 = require("@fortawesome/free-regular-svg-icons/faBell");
const faBell_2 = require("@fortawesome/free-solid-svg-icons/faBell");
let NotificationIconComponent = class NotificationIconComponent {
    constructor(notifFacade) {
        this.notifFacade = notifFacade;
        this.isExpanded = false;
        this.notificationBarState$ = this.notifFacade.getBarState$;
        this.notificationCount$ = this.notifFacade.newNotificationCount$;
        this.icons = { faBell: faBell_1.faBell, faBellSolid: faBell_2.faBell };
    }
    ngOnInit() {
        this.notifFacade.startNotificationPolling();
        this.notifFacade.loadNotifications();
        this.notificationBarState$.subscribe(state => {
            this.isExpanded = state;
        });
    }
    toggleNotificationBar() {
        this.notifFacade.toggleBar();
    }
};
__decorate([
    core_1.HostBinding('class.expanded')
], NotificationIconComponent.prototype, "isExpanded", void 0);
NotificationIconComponent = __decorate([
    core_1.Component({
        selector: 'app-notification-icon',
        templateUrl: './notification-icon.component.html',
        styleUrls: ['./notification-icon.component.scss']
    })
], NotificationIconComponent);
exports.NotificationIconComponent = NotificationIconComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm90aWZpY2F0aW9uLWljb24uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vY29uY291cnNlL2phdmFzY3JpcHQvY29uY291cnNlLWFwcC9zcmMvYXBwL2NvcmUvY29tcG9uZW50cy9ub3RpZmljYXRpb24taWNvbi9ub3RpZmljYXRpb24taWNvbi5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQSx3Q0FBK0Q7QUFDL0QsdUVBQW9FO0FBQ3BFLHFFQUFpRjtBQVNqRixJQUFhLHlCQUF5QixHQUF0QyxNQUFhLHlCQUF5QjtJQU1wQyxZQUNtQixXQUErQjtRQUEvQixnQkFBVyxHQUFYLFdBQVcsQ0FBb0I7UUFObkIsZUFBVSxHQUFHLEtBQUssQ0FBQztRQUNsRCwwQkFBcUIsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQztRQUN0RCx1QkFBa0IsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLHFCQUFxQixDQUFDO1FBQ25ELFVBQUssR0FBRyxFQUFFLE1BQU0sRUFBTixlQUFNLEVBQUUsV0FBVyxFQUFYLGVBQVcsRUFBRSxDQUFDO0lBSXJDLENBQUM7SUFFTCxRQUFRO1FBQ04sSUFBSSxDQUFDLFdBQVcsQ0FBQyx3QkFBd0IsRUFBRSxDQUFDO1FBQzVDLElBQUksQ0FBQyxXQUFXLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztRQUNyQyxJQUFJLENBQUMscUJBQXFCLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxFQUFFO1lBQzNDLElBQUksQ0FBQyxVQUFVLEdBQUcsS0FBSyxDQUFDO1FBQzFCLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELHFCQUFxQjtRQUNuQixJQUFJLENBQUMsV0FBVyxDQUFDLFNBQVMsRUFBRSxDQUFDO0lBQy9CLENBQUM7Q0FFRixDQUFBO0FBckJnQztJQUE5QixrQkFBVyxDQUFDLGdCQUFnQixDQUFDOzZEQUFvQjtBQUR2Qyx5QkFBeUI7SUFMckMsZ0JBQVMsQ0FBQztRQUNULFFBQVEsRUFBRSx1QkFBdUI7UUFDakMsV0FBVyxFQUFFLG9DQUFvQztRQUNqRCxTQUFTLEVBQUUsQ0FBQyxvQ0FBb0MsQ0FBQztLQUNsRCxDQUFDO0dBQ1cseUJBQXlCLENBc0JyQztBQXRCWSw4REFBeUIifQ==