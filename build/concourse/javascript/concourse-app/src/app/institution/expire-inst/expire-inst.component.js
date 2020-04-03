"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
let ExpireInstComponent = class ExpireInstComponent {
    constructor(instFacade) {
        this.instFacade = instFacade;
        this.token$ = this.instFacade.getValidateInfo$;
    }
    regenerateLink(token) {
        this.instFacade.regenerateInvitation(token);
    }
};
ExpireInstComponent = __decorate([
    core_1.Component({
        selector: 'app-expire-inst',
        templateUrl: './expire-inst.component.html',
        styleUrls: ['./expire-inst.component.scss']
    })
], ExpireInstComponent);
exports.ExpireInstComponent = ExpireInstComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhwaXJlLWluc3QuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vY29uY291cnNlL2phdmFzY3JpcHQvY29uY291cnNlLWFwcC9zcmMvYXBwL2luc3RpdHV0aW9uL2V4cGlyZS1pbnN0L2V4cGlyZS1pbnN0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBLHdDQUEwQztBQVExQyxJQUFhLG1CQUFtQixHQUFoQyxNQUFhLG1CQUFtQjtJQUc5QixZQUE2QixVQUE2QjtRQUE3QixlQUFVLEdBQVYsVUFBVSxDQUFtQjtRQUYxRCxXQUFNLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxnQkFBZ0IsQ0FBQztJQUVvQixDQUFDO0lBRS9ELGNBQWMsQ0FBQyxLQUFhO1FBQzFCLElBQUksQ0FBQyxVQUFVLENBQUMsb0JBQW9CLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDOUMsQ0FBQztDQUNGLENBQUE7QUFSWSxtQkFBbUI7SUFML0IsZ0JBQVMsQ0FBQztRQUNULFFBQVEsRUFBRSxpQkFBaUI7UUFDM0IsV0FBVyxFQUFFLDhCQUE4QjtRQUMzQyxTQUFTLEVBQUUsQ0FBQyw4QkFBOEIsQ0FBQztLQUM1QyxDQUFDO0dBQ1csbUJBQW1CLENBUS9CO0FBUlksa0RBQW1CIn0=