"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
let ControlDirective = class ControlDirective {
    constructor(ngControl, controlValidation) {
        this.ngControl = ngControl;
        this.controlValidation = controlValidation;
    }
    ngOnInit() {
        if (this.controlValidation) {
            this.controlValidation.setControl(this.ngControl);
        }
    }
};
ControlDirective = __decorate([
    core_1.Directive({
        // tslint:disable-next-line:directive-selector
        selector: '[formControlName], [formControl]'
    }),
    __param(0, core_1.Self()),
    __param(1, core_1.Host()), __param(1, core_1.Optional())
], ControlDirective);
exports.ControlDirective = ControlDirective;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udHJvbC5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9jb25jb3Vyc2UvamF2YXNjcmlwdC9jb25jb3Vyc2UtYXBwL3NyYy9hcHAvc2hhcmVkL2Zvcm0tY29tcG9uZW50cy9jb250cm9sLXZhbGlkYXRpb24vY29udHJvbC5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSx3Q0FBd0U7QUFTeEUsSUFBYSxnQkFBZ0IsR0FBN0IsTUFBYSxnQkFBZ0I7SUFFM0IsWUFDMkIsU0FBb0IsRUFDaEIsaUJBQTZDO1FBRGpELGNBQVMsR0FBVCxTQUFTLENBQVc7UUFDaEIsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUE0QjtJQUN4RSxDQUFDO0lBRUwsUUFBUTtRQUNOLElBQUksSUFBSSxDQUFDLGlCQUFpQixFQUFFO1lBQzFCLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1NBQ25EO0lBQ0gsQ0FBQztDQUVGLENBQUE7QUFiWSxnQkFBZ0I7SUFKNUIsZ0JBQVMsQ0FBQztRQUNULDhDQUE4QztRQUM5QyxRQUFRLEVBQUUsa0NBQWtDO0tBQzdDLENBQUM7SUFJRyxXQUFBLFdBQUksRUFBRSxDQUFBO0lBQ04sV0FBQSxXQUFJLEVBQUUsQ0FBQSxFQUFFLFdBQUEsZUFBUSxFQUFFLENBQUE7R0FKVixnQkFBZ0IsQ0FhNUI7QUFiWSw0Q0FBZ0IifQ==