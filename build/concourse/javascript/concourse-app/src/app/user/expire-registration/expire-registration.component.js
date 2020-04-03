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
    constructor(userFacade) {
        this.userFacade = userFacade;
        this.token$ = this.userFacade.token$;
    }
    regenerateInvitation(token) {
        this.userFacade.regenerateRegistration(token);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhwaXJlLXJlZ2lzdHJhdGlvbi5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9jb25jb3Vyc2UvamF2YXNjcmlwdC9jb25jb3Vyc2UtYXBwL3NyYy9hcHAvdXNlci9leHBpcmUtcmVnaXN0cmF0aW9uL2V4cGlyZS1yZWdpc3RyYXRpb24uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUEsd0NBQTBDO0FBUTFDLElBQWEsMkJBQTJCLEdBQXhDLE1BQWEsMkJBQTJCO0lBR3RDLFlBQTZCLFVBQXNCO1FBQXRCLGVBQVUsR0FBVixVQUFVLENBQVk7UUFEbkQsV0FBTSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDO0lBQ3VCLENBQUM7SUFFeEQsb0JBQW9CLENBQUMsS0FBYTtRQUNoQyxJQUFJLENBQUMsVUFBVSxDQUFDLHNCQUFzQixDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ2hELENBQUM7Q0FDRixDQUFBO0FBUlksMkJBQTJCO0lBTHZDLGdCQUFTLENBQUM7UUFDVCxRQUFRLEVBQUUseUJBQXlCO1FBQ25DLFdBQVcsRUFBRSxzQ0FBc0M7UUFDbkQsU0FBUyxFQUFFLENBQUMsc0NBQXNDLENBQUM7S0FDcEQsQ0FBQztHQUNXLDJCQUEyQixDQVF2QztBQVJZLGtFQUEyQiJ9