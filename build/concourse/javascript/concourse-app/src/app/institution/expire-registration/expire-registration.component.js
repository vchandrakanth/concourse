"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
let ExpireRegistrationComponent = class ExpireRegistrationComponent {
    constructor(institutionFacade) {
        this.institutionFacade = institutionFacade;
        this.token$ = this.institutionFacade.getValidateInfo$;
    }
    regenerateInvitation(token) {
        this.institutionFacade.regenerateRegistration(token);
    }
};
ExpireRegistrationComponent = __decorate([
    core_1.Component({
        selector: 'app-expire-registration',
        templateUrl: './expire-registration.component.html',
        styleUrls: ['./expire-registration.component.scss']
    })
], ExpireRegistrationComponent);
exports.ExpireRegistrationComponent = ExpireRegistrationComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhwaXJlLXJlZ2lzdHJhdGlvbi5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9jb25jb3Vyc2UvamF2YXNjcmlwdC9jb25jb3Vyc2UtYXBwL3NyYy9hcHAvaW5zdGl0dXRpb24vZXhwaXJlLXJlZ2lzdHJhdGlvbi9leHBpcmUtcmVnaXN0cmF0aW9uLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBLHdDQUEwQztBQVMxQyxJQUFhLDJCQUEyQixHQUF4QyxNQUFhLDJCQUEyQjtJQUV0QyxZQUNtQixpQkFBb0M7UUFBcEMsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFtQjtRQUZ2RCxXQUFNLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLGdCQUFnQixDQUFDO0lBRzdDLENBQUM7SUFFTCxvQkFBb0IsQ0FBQyxLQUFhO1FBQ2hDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxzQkFBc0IsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUN2RCxDQUFDO0NBRUYsQ0FBQTtBQVZZLDJCQUEyQjtJQUx2QyxnQkFBUyxDQUFDO1FBQ1QsUUFBUSxFQUFFLHlCQUF5QjtRQUNuQyxXQUFXLEVBQUUsc0NBQXNDO1FBQ25ELFNBQVMsRUFBRSxDQUFDLHNDQUFzQyxDQUFDO0tBQ3BELENBQUM7R0FDVywyQkFBMkIsQ0FVdkM7QUFWWSxrRUFBMkIifQ==