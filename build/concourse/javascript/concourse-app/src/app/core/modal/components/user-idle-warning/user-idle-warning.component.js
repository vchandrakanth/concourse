"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const faTimes_1 = require("@fortawesome/free-solid-svg-icons/faTimes");
let UserIdleWarningComponent = class UserIdleWarningComponent {
    constructor() {
        this.icons = { faTimes: faTimes_1.faTimes };
    }
};
UserIdleWarningComponent = __decorate([
    core_1.Component({
        selector: 'app-user-idle-warning',
        templateUrl: './user-idle-warning.component.html',
        styleUrls: ['./user-idle-warning.component.scss']
    })
], UserIdleWarningComponent);
exports.UserIdleWarningComponent = UserIdleWarningComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci1pZGxlLXdhcm5pbmcuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vY29uY291cnNlL2phdmFzY3JpcHQvY29uY291cnNlLWFwcC9zcmMvYXBwL2NvcmUvbW9kYWwvY29tcG9uZW50cy91c2VyLWlkbGUtd2FybmluZy91c2VyLWlkbGUtd2FybmluZy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQSx3Q0FBMEM7QUFDMUMsdUVBQW9FO0FBT3BFLElBQWEsd0JBQXdCLEdBQXJDLE1BQWEsd0JBQXdCO0lBQXJDO1FBQ1csVUFBSyxHQUFHLEVBQUUsT0FBTyxFQUFQLGlCQUFPLEVBQUUsQ0FBQztJQUUvQixDQUFDO0NBQUEsQ0FBQTtBQUhZLHdCQUF3QjtJQUxwQyxnQkFBUyxDQUFDO1FBQ1QsUUFBUSxFQUFFLHVCQUF1QjtRQUNqQyxXQUFXLEVBQUUsb0NBQW9DO1FBQ2pELFNBQVMsRUFBRSxDQUFDLG9DQUFvQyxDQUFDO0tBQ2xELENBQUM7R0FDVyx3QkFBd0IsQ0FHcEM7QUFIWSw0REFBd0IifQ==