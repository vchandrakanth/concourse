"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const operators_1 = require("rxjs/operators");
let AlertMessagesComponent = class AlertMessagesComponent {
    constructor(errorFacade) {
        this.errorFacade = errorFacade;
        this.errors$ = this.errorFacade.formErrors$;
        this.hasErrors$ = this.errorFacade.formErrors$.pipe(operators_1.map(errors => errors.length !== 0));
    }
    onClosed(error) {
        this.errorFacade.dismiss(error.id);
    }
    ngOnDestroy() {
        this.errorFacade.dismissByType('form');
    }
};
AlertMessagesComponent = __decorate([
    core_1.Component({
        selector: 'app-alert-messages',
        templateUrl: './alert-messages.component.html',
        styleUrls: ['./alert-messages.component.scss']
    })
], AlertMessagesComponent);
exports.AlertMessagesComponent = AlertMessagesComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWxlcnQtbWVzc2FnZXMuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vY29uY291cnNlL2phdmFzY3JpcHQvY29uY291cnNlLWFwcC9zcmMvYXBwL3NoYXJlZC9jb21wb25lbnRzL2FsZXJ0LW1lc3NhZ2VzL2FsZXJ0LW1lc3NhZ2VzLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBLHdDQUE0RDtBQUU1RCw4Q0FBcUM7QUFVckMsSUFBYSxzQkFBc0IsR0FBbkMsTUFBYSxzQkFBc0I7SUFNakMsWUFDbUIsV0FBbUM7UUFBbkMsZ0JBQVcsR0FBWCxXQUFXLENBQXdCO1FBTnRELFlBQU8sR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLFdBQVcsQ0FBQztRQUN2QyxlQUFVLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUM1QyxlQUFHLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsTUFBTSxLQUFLLENBQUMsQ0FBQyxDQUNuQyxDQUFDO0lBSUUsQ0FBQztJQUVMLFFBQVEsQ0FBQyxLQUF1QjtRQUM5QixJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDckMsQ0FBQztJQUVELFdBQVc7UUFDVCxJQUFJLENBQUMsV0FBVyxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUN6QyxDQUFDO0NBRUYsQ0FBQTtBQWxCWSxzQkFBc0I7SUFMbEMsZ0JBQVMsQ0FBQztRQUNULFFBQVEsRUFBRSxvQkFBb0I7UUFDOUIsV0FBVyxFQUFFLGlDQUFpQztRQUM5QyxTQUFTLEVBQUUsQ0FBQyxpQ0FBaUMsQ0FBQztLQUMvQyxDQUFDO0dBQ1csc0JBQXNCLENBa0JsQztBQWxCWSx3REFBc0IifQ==