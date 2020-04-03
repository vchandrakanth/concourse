"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
let ValidateInviteUserComponent = class ValidateInviteUserComponent {
    constructor(userFacade) {
        this.userFacade = userFacade;
        this.isUpdating$ = this.userFacade.isUpdating$;
    }
};
ValidateInviteUserComponent = __decorate([
    core_1.Component({
        selector: 'app-validate-invite-user',
        templateUrl: './validate-invite-user.component.html',
        styleUrls: ['./validate-invite-user.component.scss']
    })
], ValidateInviteUserComponent);
exports.ValidateInviteUserComponent = ValidateInviteUserComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmFsaWRhdGUtaW52aXRlLXVzZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vY29uY291cnNlL2phdmFzY3JpcHQvY29uY291cnNlLWFwcC9zcmMvYXBwL3VzZXIvdmFsaWRhdGUtaW52aXRlLXVzZXIvdmFsaWRhdGUtaW52aXRlLXVzZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUEsd0NBQTBDO0FBUTFDLElBQWEsMkJBQTJCLEdBQXhDLE1BQWEsMkJBQTJCO0lBRXRDLFlBQ21CLFVBQXNCO1FBQXRCLGVBQVUsR0FBVixVQUFVLENBQVk7UUFGekMsZ0JBQVcsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQztJQUd0QyxDQUFDO0NBRU4sQ0FBQTtBQU5ZLDJCQUEyQjtJQUx2QyxnQkFBUyxDQUFDO1FBQ1QsUUFBUSxFQUFFLDBCQUEwQjtRQUNwQyxXQUFXLEVBQUUsdUNBQXVDO1FBQ3BELFNBQVMsRUFBRSxDQUFDLHVDQUF1QyxDQUFDO0tBQ3JELENBQUM7R0FDVywyQkFBMkIsQ0FNdkM7QUFOWSxrRUFBMkIifQ==