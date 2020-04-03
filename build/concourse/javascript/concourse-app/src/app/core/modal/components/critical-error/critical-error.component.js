"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const faExclamationTriangle_1 = require("@fortawesome/free-solid-svg-icons/faExclamationTriangle");
const faTimes_1 = require("@fortawesome/free-solid-svg-icons/faTimes");
let CriticalErrorComponent = class CriticalErrorComponent {
    constructor() {
        this.icons = { faTimes: faTimes_1.faTimes, faExclamationTriangle: faExclamationTriangle_1.faExclamationTriangle };
    }
    reloadApplication() {
        window.location.reload();
    }
};
CriticalErrorComponent = __decorate([
    core_1.Component({
        selector: 'app-critical-error',
        templateUrl: './critical-error.component.html',
        styleUrls: ['./critical-error.component.scss']
    })
], CriticalErrorComponent);
exports.CriticalErrorComponent = CriticalErrorComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JpdGljYWwtZXJyb3IuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vY29uY291cnNlL2phdmFzY3JpcHQvY29uY291cnNlLWFwcC9zcmMvYXBwL2NvcmUvbW9kYWwvY29tcG9uZW50cy9jcml0aWNhbC1lcnJvci9jcml0aWNhbC1lcnJvci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQSx3Q0FBMEM7QUFDMUMsbUdBQWdHO0FBQ2hHLHVFQUFvRTtBQVNwRSxJQUFhLHNCQUFzQixHQUFuQyxNQUFhLHNCQUFzQjtJQUFuQztRQUdXLFVBQUssR0FBRyxFQUFFLE9BQU8sRUFBUCxpQkFBTyxFQUFFLHFCQUFxQixFQUFyQiw2Q0FBcUIsRUFBRSxDQUFDO0lBTXRELENBQUM7SUFKQyxpQkFBaUI7UUFDZixNQUFNLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQzNCLENBQUM7Q0FFRixDQUFBO0FBVFksc0JBQXNCO0lBTGxDLGdCQUFTLENBQUM7UUFDVCxRQUFRLEVBQUUsb0JBQW9CO1FBQzlCLFdBQVcsRUFBRSxpQ0FBaUM7UUFDOUMsU0FBUyxFQUFFLENBQUMsaUNBQWlDLENBQUM7S0FDL0MsQ0FBQztHQUNXLHNCQUFzQixDQVNsQztBQVRZLHdEQUFzQiJ9