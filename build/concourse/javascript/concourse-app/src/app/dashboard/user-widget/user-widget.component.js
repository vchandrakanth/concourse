"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
let UserWidgetComponent = class UserWidgetComponent {
    constructor(userFacade) {
        this.userFacade = userFacade;
        this.user$ = this.userFacade.authenticatedUser$;
    }
    trackRoleAssignments(_index, roleAssignment) {
        return roleAssignment.id;
    }
};
UserWidgetComponent = __decorate([
    core_1.Component({
        selector: 'app-user-widget',
        templateUrl: './user-widget.component.html',
        styleUrls: ['./user-widget.component.scss'
        ]
    })
], UserWidgetComponent);
exports.UserWidgetComponent = UserWidgetComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci13aWRnZXQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vY29uY291cnNlL2phdmFzY3JpcHQvY29uY291cnNlLWFwcC9zcmMvYXBwL2Rhc2hib2FyZC91c2VyLXdpZGdldC91c2VyLXdpZGdldC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQSx3Q0FBMEM7QUFXMUMsSUFBYSxtQkFBbUIsR0FBaEMsTUFBYSxtQkFBbUI7SUFHOUIsWUFDVSxVQUFzQjtRQUF0QixlQUFVLEdBQVYsVUFBVSxDQUFZO1FBSGhDLFVBQUssR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLGtCQUFrQixDQUFDO0lBSXZDLENBQUM7SUFFTCxvQkFBb0IsQ0FBQyxNQUFjLEVBQUUsY0FBOEI7UUFDakUsT0FBTyxjQUFjLENBQUMsRUFBRSxDQUFDO0lBQzNCLENBQUM7Q0FFRixDQUFBO0FBWFksbUJBQW1CO0lBTi9CLGdCQUFTLENBQUM7UUFDVCxRQUFRLEVBQUUsaUJBQWlCO1FBQzNCLFdBQVcsRUFBRSw4QkFBOEI7UUFDM0MsU0FBUyxFQUFFLENBQUMsOEJBQThCO1NBQ3pDO0tBQ0YsQ0FBQztHQUNXLG1CQUFtQixDQVcvQjtBQVhZLGtEQUFtQiJ9