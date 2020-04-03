"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const animations_1 = require("@angular/animations");
const core_1 = require("@angular/core");
const faArrowRight_1 = require("@fortawesome/free-solid-svg-icons/faArrowRight");
const faInbox_1 = require("@fortawesome/free-solid-svg-icons/faInbox");
const faStream_1 = require("@fortawesome/free-solid-svg-icons/faStream");
const faSync_1 = require("@fortawesome/free-solid-svg-icons/faSync");
const faTimes_1 = require("@fortawesome/free-solid-svg-icons/faTimes");
const enums_1 = require("@concourse/shared/enums");
let NotificationBarComponent = class NotificationBarComponent {
    constructor(notificationFacade) {
        this.notificationFacade = notificationFacade;
        this.isExpanded = false;
        this.notificationList$ = this.notificationFacade.notifications$;
        this.notificationBarState$ = this.notificationFacade.getBarState$;
        this.notificationBarLastOpened$ = this.notificationFacade.notificationBarLastOpened$;
        this.notificationBarUpdating$ = this.notificationFacade.isUpdating$;
        this.isLoaded$ = this.notificationFacade.isLoaded$;
        this.icons = { faSync: faSync_1.faSync, faInbox: faInbox_1.faInbox, faArrowRight: faArrowRight_1.faArrowRight, faTimes: faTimes_1.faTimes, faStream: faStream_1.faStream };
    }
    ngOnInit() {
        this.notificationBarState$.subscribe(state => {
            this.isExpanded = state;
        });
    }
    trackItems(_index, notification) {
        return notification.id;
    }
    dismissNotification(notification) {
        this.notificationFacade.dismissNotification(notification);
    }
    reloadNotifications() {
        this.notificationFacade.loadNotifications();
    }
    getRouterPath(notification, type) {
        if (type === 'DEPLOYMENT') {
            return `${enums_1.RouterNames[notification.subjectType]}/${notification.surfaceLayerId}`;
        }
        return enums_1.RouterNames[type];
    }
    dismissAll() {
        this.notificationFacade.dismissAllNotifications();
    }
};
__decorate([
    core_1.HostBinding('class.expanded')
], NotificationBarComponent.prototype, "isExpanded", void 0);
NotificationBarComponent = __decorate([
    core_1.Component({
        selector: 'app-notification-bar',
        templateUrl: './notification-bar.component.html',
        styleUrls: ['./notification-bar.component.scss'],
        animations: [
            animations_1.trigger('listAnimation', [
                animations_1.transition(':increment', [
                    animations_1.query(':enter', animations_1.stagger(50, [
                        animations_1.style({ transform: 'scale(0.5)', opacity: 0 }),
                        animations_1.animate('.2s ease-in-out', animations_1.style({ transform: 'scale(1)', opacity: 1 }))
                    ]), { optional: true })
                ]),
                animations_1.transition(':decrement', [
                    animations_1.query(':leave', [
                        animations_1.style({ transform: 'scale(1)', opacity: 1, height: '*' }),
                        animations_1.animate('.2s ease-in-out', animations_1.style({
                            transform: 'scale(0.5)', opacity: 0,
                            height: '0px', margin: '0px'
                        }))
                    ], { optional: true })
                ])
            ])
        ]
    })
], NotificationBarComponent);
exports.NotificationBarComponent = NotificationBarComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm90aWZpY2F0aW9uLWJhci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9jb25jb3Vyc2UvamF2YXNjcmlwdC9jb25jb3Vyc2UtYXBwL3NyYy9hcHAvY29yZS9jb21wb25lbnRzL25vdGlmaWNhdGlvbi1iYXIvbm90aWZpY2F0aW9uLWJhci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQSxvREFPNkI7QUFDN0Isd0NBSXVCO0FBQ3ZCLGlGQUE4RTtBQUM5RSx1RUFBb0U7QUFDcEUseUVBQXNFO0FBQ3RFLHFFQUFrRTtBQUNsRSx1RUFBb0U7QUFHcEUsbURBQXNEO0FBK0J0RCxJQUFhLHdCQUF3QixHQUFyQyxNQUFhLHdCQUF3QjtJQVduQyxZQUNtQixrQkFBc0M7UUFBdEMsdUJBQWtCLEdBQWxCLGtCQUFrQixDQUFvQjtRQVgxQixlQUFVLEdBQUcsS0FBSyxDQUFDO1FBRWxELHNCQUFpQixHQUFHLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxjQUFjLENBQUM7UUFDM0QsMEJBQXFCLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixDQUFDLFlBQVksQ0FBQztRQUM3RCwrQkFBMEIsR0FBRyxJQUFJLENBQUMsa0JBQWtCLENBQUMsMEJBQTBCLENBQUM7UUFDaEYsNkJBQXdCLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixDQUFDLFdBQVcsQ0FBQztRQUMvRCxjQUFTLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixDQUFDLFNBQVMsQ0FBQztRQUVyQyxVQUFLLEdBQUcsRUFBRSxNQUFNLEVBQU4sZUFBTSxFQUFFLE9BQU8sRUFBUCxpQkFBTyxFQUFFLFlBQVksRUFBWiwyQkFBWSxFQUFFLE9BQU8sRUFBUCxpQkFBTyxFQUFFLFFBQVEsRUFBUixtQkFBUSxFQUFFLENBQUM7SUFJbEUsQ0FBQztJQUVMLFFBQVE7UUFDTixJQUFJLENBQUMscUJBQXFCLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxFQUFFO1lBQzNDLElBQUksQ0FBQyxVQUFVLEdBQUcsS0FBSyxDQUFDO1FBQzFCLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELFVBQVUsQ0FBQyxNQUFjLEVBQUUsWUFBMEI7UUFDbkQsT0FBTyxZQUFZLENBQUMsRUFBRSxDQUFDO0lBQ3pCLENBQUM7SUFFRCxtQkFBbUIsQ0FBQyxZQUEwQjtRQUM1QyxJQUFJLENBQUMsa0JBQWtCLENBQUMsbUJBQW1CLENBQUMsWUFBWSxDQUFDLENBQUM7SUFDNUQsQ0FBQztJQUVELG1CQUFtQjtRQUNqQixJQUFJLENBQUMsa0JBQWtCLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztJQUM5QyxDQUFDO0lBRUQsYUFBYSxDQUFDLFlBQTBCLEVBQUUsSUFBWTtRQUNwRCxJQUFJLElBQUksS0FBSyxZQUFZLEVBQUU7WUFDekIsT0FBTyxHQUFHLG1CQUFXLENBQUMsWUFBWSxDQUFDLFdBQVcsQ0FBQyxJQUFJLFlBQVksQ0FBQyxjQUFjLEVBQUUsQ0FBQztTQUNsRjtRQUNELE9BQU8sbUJBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUMzQixDQUFDO0lBRUQsVUFBVTtRQUNSLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyx1QkFBdUIsRUFBRSxDQUFDO0lBQ3BELENBQUM7Q0FFRixDQUFBO0FBM0NnQztJQUE5QixrQkFBVyxDQUFDLGdCQUFnQixDQUFDOzREQUFvQjtBQUR2Qyx3QkFBd0I7SUE1QnBDLGdCQUFTLENBQUM7UUFDVCxRQUFRLEVBQUUsc0JBQXNCO1FBQ2hDLFdBQVcsRUFBRSxtQ0FBbUM7UUFDaEQsU0FBUyxFQUFFLENBQUMsbUNBQW1DLENBQUM7UUFDaEQsVUFBVSxFQUFFO1lBQ1Ysb0JBQU8sQ0FBQyxlQUFlLEVBQUU7Z0JBQ3ZCLHVCQUFVLENBQUMsWUFBWSxFQUFFO29CQUN2QixrQkFBSyxDQUFDLFFBQVEsRUFDWixvQkFBTyxDQUFDLEVBQUUsRUFBRTt3QkFDVixrQkFBSyxDQUFDLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFFLENBQUM7d0JBQzlDLG9CQUFPLENBQUMsaUJBQWlCLEVBQ3ZCLGtCQUFLLENBQUMsRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLE9BQU8sRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO3FCQUNoRCxDQUFDLEVBQUUsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLENBQ3ZCO2lCQUNGLENBQUM7Z0JBQ0YsdUJBQVUsQ0FBQyxZQUFZLEVBQUU7b0JBQ3ZCLGtCQUFLLENBQUMsUUFBUSxFQUFFO3dCQUNkLGtCQUFLLENBQUMsRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLE9BQU8sRUFBRSxDQUFDLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRSxDQUFDO3dCQUN6RCxvQkFBTyxDQUFDLGlCQUFpQixFQUN2QixrQkFBSyxDQUFDOzRCQUNKLFNBQVMsRUFBRSxZQUFZLEVBQUUsT0FBTyxFQUFFLENBQUM7NEJBQ25DLE1BQU0sRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLEtBQUs7eUJBQzdCLENBQUMsQ0FBQztxQkFDTixFQUFFLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxDQUFDO2lCQUN2QixDQUFDO2FBQ0gsQ0FBQztTQUNIO0tBQ0YsQ0FBQztHQUNXLHdCQUF3QixDQTRDcEM7QUE1Q1ksNERBQXdCIn0=