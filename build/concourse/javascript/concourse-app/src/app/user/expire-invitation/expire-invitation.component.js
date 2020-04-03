"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
let ExpireInvitationComponent = class ExpireInvitationComponent {
    constructor(userFacade) {
        this.userFacade = userFacade;
        this.token$ = this.userFacade.token$;
    }
    regenerateLink(token) {
        this.userFacade.regenerateInvitation(token);
    }
};
ExpireInvitationComponent = __decorate([
    core_1.Component({
        selector: 'app-expire-invitation',
        templateUrl: './expire-invitation.component.html',
        styleUrls: ['./expire-invitation.component.scss']
    })
], ExpireInvitationComponent);
exports.ExpireInvitationComponent = ExpireInvitationComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhwaXJlLWludml0YXRpb24uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vY29uY291cnNlL2phdmFzY3JpcHQvY29uY291cnNlLWFwcC9zcmMvYXBwL3VzZXIvZXhwaXJlLWludml0YXRpb24vZXhwaXJlLWludml0YXRpb24uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUEsd0NBQTBDO0FBUTFDLElBQWEseUJBQXlCLEdBQXRDLE1BQWEseUJBQXlCO0lBRXBDLFlBQTZCLFVBQXNCO1FBQXRCLGVBQVUsR0FBVixVQUFVLENBQVk7UUFEbkQsV0FBTSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDO0lBQ3VCLENBQUM7SUFFeEQsY0FBYyxDQUFDLEtBQWE7UUFDMUIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxvQkFBb0IsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUM5QyxDQUFDO0NBQ0YsQ0FBQTtBQVBZLHlCQUF5QjtJQUxyQyxnQkFBUyxDQUFDO1FBQ1QsUUFBUSxFQUFFLHVCQUF1QjtRQUNqQyxXQUFXLEVBQUUsb0NBQW9DO1FBQ2pELFNBQVMsRUFBRSxDQUFDLG9DQUFvQyxDQUFDO0tBQ2xELENBQUM7R0FDVyx5QkFBeUIsQ0FPckM7QUFQWSw4REFBeUIifQ==