"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
let RegistrationValidateComponent = class RegistrationValidateComponent {
    constructor(userFacade) {
        this.userFacade = userFacade;
        this.isUpdating$ = this.userFacade.isUpdating$;
    }
};
RegistrationValidateComponent = __decorate([
    core_1.Component({
        selector: 'app-registration-validate',
        templateUrl: './registration-validate.component.html',
        styleUrls: ['./registration-validate.component.scss']
    })
], RegistrationValidateComponent);
exports.RegistrationValidateComponent = RegistrationValidateComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVnaXN0cmF0aW9uLXZhbGlkYXRlLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL2NvbmNvdXJzZS9qYXZhc2NyaXB0L2NvbmNvdXJzZS1hcHAvc3JjL2FwcC91c2VyL3JlZ2lzdHJhdGlvbi12YWxpZGF0ZS9yZWdpc3RyYXRpb24tdmFsaWRhdGUuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUEsd0NBQTBDO0FBUTFDLElBQWEsNkJBQTZCLEdBQTFDLE1BQWEsNkJBQTZCO0lBRXhDLFlBQ21CLFVBQXNCO1FBQXRCLGVBQVUsR0FBVixVQUFVLENBQVk7UUFGekMsZ0JBQVcsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQztJQUd0QyxDQUFDO0NBQ04sQ0FBQTtBQUxZLDZCQUE2QjtJQUx6QyxnQkFBUyxDQUFDO1FBQ1QsUUFBUSxFQUFFLDJCQUEyQjtRQUNyQyxXQUFXLEVBQUUsd0NBQXdDO1FBQ3JELFNBQVMsRUFBRSxDQUFDLHdDQUF3QyxDQUFDO0tBQ3RELENBQUM7R0FDVyw2QkFBNkIsQ0FLekM7QUFMWSxzRUFBNkIifQ==