"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
let ValidatorDirective = class ValidatorDirective {
    constructor(elementRef, controlValidation) {
        this.elementRef = elementRef;
        this.controlValidation = controlValidation;
    }
    // tslint:disable-next-line:prefer-inline-decorator
    get isValid() {
        if (!!!this.control) {
            return false;
        }
        if (this.control && this.control.valid) {
            return true;
        }
        return !this.control.hasError(this.validator);
    }
    get control() {
        return this.controlValidation.control;
    }
    get controlName() {
        return this.controlValidation.controlName;
    }
    ngOnInit() {
        this.controlValidation.addValidator(this);
    }
    ngOnDestroy() {
        this.controlValidation.removeValidator(this);
    }
};
__decorate([
    core_1.Input()
], ValidatorDirective.prototype, "validator", void 0);
__decorate([
    core_1.HostBinding('class.d-none')
], ValidatorDirective.prototype, "isValid", null);
ValidatorDirective = __decorate([
    core_1.Directive({
        // tslint:disable-next-line:directive-selector
        selector: '[validator]'
    })
], ValidatorDirective);
exports.ValidatorDirective = ValidatorDirective;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmFsaWRhdG9yLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL2NvbmNvdXJzZS9qYXZhc2NyaXB0L2NvbmNvdXJzZS1hcHAvc3JjL2FwcC9zaGFyZWQvZm9ybS1jb21wb25lbnRzL2NvbnRyb2wtdmFsaWRhdGlvbi92YWxpZGF0b3IuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUEsd0NBT3VCO0FBU3ZCLElBQWEsa0JBQWtCLEdBQS9CLE1BQWEsa0JBQWtCO0lBb0I3QixZQUNTLFVBQXNCLEVBQ1osaUJBQTZDO1FBRHZELGVBQVUsR0FBVixVQUFVLENBQVk7UUFDWixzQkFBaUIsR0FBakIsaUJBQWlCLENBQTRCO0lBQzVELENBQUM7SUFyQkwsbURBQW1EO0lBRW5ELElBQUksT0FBTztRQUNULElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRTtZQUFFLE9BQU8sS0FBSyxDQUFDO1NBQUU7UUFDdEMsSUFBSSxJQUFJLENBQUMsT0FBTyxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFO1lBQ3RDLE9BQU8sSUFBSSxDQUFDO1NBQ2I7UUFDRCxPQUFPLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQ2hELENBQUM7SUFFRCxJQUFJLE9BQU87UUFDVCxPQUFPLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxPQUFPLENBQUM7SUFDeEMsQ0FBQztJQUVELElBQUksV0FBVztRQUNiLE9BQU8sSUFBSSxDQUFDLGlCQUFpQixDQUFDLFdBQVcsQ0FBQztJQUM1QyxDQUFDO0lBT0QsUUFBUTtRQUNOLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDNUMsQ0FBQztJQUVELFdBQVc7UUFDVCxJQUFJLENBQUMsaUJBQWlCLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQy9DLENBQUM7Q0FFRixDQUFBO0FBaENVO0lBQVIsWUFBSyxFQUFFO3FEQUFtQjtBQUczQjtJQURDLGtCQUFXLENBQUMsY0FBYyxDQUFDO2lEQU8zQjtBQVZVLGtCQUFrQjtJQUo5QixnQkFBUyxDQUFDO1FBQ1QsOENBQThDO1FBQzlDLFFBQVEsRUFBRSxhQUFhO0tBQ3hCLENBQUM7R0FDVyxrQkFBa0IsQ0FpQzlCO0FBakNZLGdEQUFrQiJ9