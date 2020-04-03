"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const forms_1 = require("@angular/forms");
const faTimes_1 = require("@fortawesome/free-solid-svg-icons/faTimes");
const operators_1 = require("rxjs/operators");
const rxjs_1 = require("rxjs");
let InviteUserComponent = class InviteUserComponent {
    constructor(userFacade, instFacade, fb) {
        this.userFacade = userFacade;
        this.instFacade = instFacade;
        this.fb = fb;
        this.buttonText = new Map().set(true, 'Sending Invite...').set(false, 'Invite');
        this.currentButtonText = new rxjs_1.BehaviorSubject(this.buttonText.get(false));
        this.updating$ = this.userFacade.isUpdating$;
        this.formPending$ = this.userFacade.formPending$.pipe(operators_1.tap(status => this.currentButtonText.next(this.buttonText.get(status))));
        this.icons = { faTimes: faTimes_1.faTimes };
        this.form = this.fb.group({
            userEmail: ['', [forms_1.Validators.email, forms_1.Validators.required]],
            authenticationType: ['BASIC']
        });
        this.instAuthType = this.instFacade.selected$.pipe(operators_1.map(inst => inst.authenticationType), operators_1.tap(authType => this.form.get('authenticationType').setValue(authType)));
    }
    submit() {
        this.userFacade.invite(this.form.value);
    }
};
InviteUserComponent = __decorate([
    core_1.Component({
        selector: 'app-invite-user',
        templateUrl: './invite-user.component.html',
        styleUrls: ['./invite-user.component.scss']
    })
], InviteUserComponent);
exports.InviteUserComponent = InviteUserComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW52aXRlLXVzZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vY29uY291cnNlL2phdmFzY3JpcHQvY29uY291cnNlLWFwcC9zcmMvYXBwL2NvcmUvbW9kYWwvY29tcG9uZW50cy9pbnZpdGUtdXNlci9pbnZpdGUtdXNlci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQSx3Q0FBa0Q7QUFDbEQsMENBQW9FO0FBQ3BFLHVFQUFvRTtBQUdwRSw4Q0FBMEM7QUFDMUMsK0JBQXVDO0FBT3ZDLElBQWEsbUJBQW1CLEdBQWhDLE1BQWEsbUJBQW1CO0lBaUI5QixZQUNtQixVQUFzQixFQUN0QixVQUE2QixFQUM3QixFQUFlO1FBRmYsZUFBVSxHQUFWLFVBQVUsQ0FBWTtRQUN0QixlQUFVLEdBQVYsVUFBVSxDQUFtQjtRQUM3QixPQUFFLEdBQUYsRUFBRSxDQUFhO1FBbkJsQyxlQUFVLEdBQUcsSUFBSSxHQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLG1CQUFtQixDQUFDLENBQUMsR0FBRyxDQUFDLEtBQUssRUFBRSxRQUFRLENBQUMsQ0FBQztRQUMzRSxzQkFBaUIsR0FBRyxJQUFJLHNCQUFlLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztRQUNwRSxjQUFTLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUM7UUFDeEMsaUJBQVksR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQzlDLGVBQUcsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUN4RSxDQUFDO1FBQ08sVUFBSyxHQUFHLEVBQUUsT0FBTyxFQUFQLGlCQUFPLEVBQUUsQ0FBQztRQUM3QixTQUFJLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUM7WUFDbkIsU0FBUyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsa0JBQVUsQ0FBQyxLQUFLLEVBQUUsa0JBQVUsQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUN4RCxrQkFBa0IsRUFBRSxDQUFDLE9BQU8sQ0FBQztTQUM5QixDQUFDLENBQUM7UUFDSCxpQkFBWSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLElBQUksQ0FDM0MsZUFBRyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLEVBQ3BDLGVBQUcsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLG9CQUFvQixDQUFDLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQ3hFLENBQUM7SUFNRSxDQUFDO0lBQ0wsTUFBTTtRQUNKLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDMUMsQ0FBQztDQUVGLENBQUE7QUExQlksbUJBQW1CO0lBTC9CLGdCQUFTLENBQUM7UUFDVCxRQUFRLEVBQUUsaUJBQWlCO1FBQzNCLFdBQVcsRUFBRSw4QkFBOEI7UUFDM0MsU0FBUyxFQUFFLENBQUMsOEJBQThCLENBQUM7S0FDNUMsQ0FBQztHQUNXLG1CQUFtQixDQTBCL0I7QUExQlksa0RBQW1CIn0=