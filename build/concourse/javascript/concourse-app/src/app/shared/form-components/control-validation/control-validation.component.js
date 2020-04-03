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
/**
 * Usage:
 * <control-validation class="form-group">
 *   <label for="name">Name</label>
 *   <input type="text" class="form-control" formControlName="name" placeholder="Name">
 *   <p validator="inUse">Name is already in use.</p>
 * </control-validation>
 */
let ControlValidationComponent = class ControlValidationComponent {
    constructor() {
        this.validators = [];
    }
    setControl(ngControl) {
        this.control = ngControl.control;
        this.controlName = ngControl.name;
    }
    addValidator(validator) {
        this.validators.push(validator);
    }
    removeValidator(validator) {
        const index = this.validators.indexOf(validator);
        if (index === -1) {
            return;
        }
        this.validators.splice(index, 1);
    }
    hasOverride(validator) {
        return this.validators.findIndex(v => v.validator === validator) !== -1;
    }
};
ControlValidationComponent = __decorate([
    core_1.Component({
        // tslint:disable-next-line:component-selector
        selector: 'control-validation',
        templateUrl: './control-validation.component.html',
        styleUrls: ['./control-validation.component.scss'],
        viewProviders: [
            { provide: forms_1.ControlContainer, useExisting: forms_1.NgControl }
        ]
    })
], ControlValidationComponent);
exports.ControlValidationComponent = ControlValidationComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udHJvbC12YWxpZGF0aW9uLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL2NvbmNvdXJzZS9qYXZhc2NyaXB0L2NvbmNvdXJzZS1hcHAvc3JjL2FwcC9zaGFyZWQvZm9ybS1jb21wb25lbnRzL2NvbnRyb2wtdmFsaWRhdGlvbi9jb250cm9sLXZhbGlkYXRpb24uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUEsd0NBQTBDO0FBQzFDLDBDQUE4RTtBQUk5RTs7Ozs7OztHQU9HO0FBVUgsSUFBYSwwQkFBMEIsR0FBdkMsTUFBYSwwQkFBMEI7SUFBdkM7UUFHRSxlQUFVLEdBQXlCLEVBQUUsQ0FBQztJQXVCeEMsQ0FBQztJQXJCQyxVQUFVLENBQUMsU0FBb0I7UUFDN0IsSUFBSSxDQUFDLE9BQU8sR0FBRyxTQUFTLENBQUMsT0FBTyxDQUFDO1FBQ2pDLElBQUksQ0FBQyxXQUFXLEdBQUcsU0FBUyxDQUFDLElBQUksQ0FBQztJQUNwQyxDQUFDO0lBRUQsWUFBWSxDQUFDLFNBQTZCO1FBQ3hDLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQ2xDLENBQUM7SUFFRCxlQUFlLENBQUMsU0FBNkI7UUFDM0MsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDakQsSUFBSSxLQUFLLEtBQUssQ0FBQyxDQUFDLEVBQUU7WUFDaEIsT0FBTztTQUNSO1FBQ0QsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQ25DLENBQUM7SUFFRCxXQUFXLENBQUMsU0FBaUI7UUFDM0IsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxTQUFTLEtBQUssU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7SUFDMUUsQ0FBQztDQUVGLENBQUE7QUExQlksMEJBQTBCO0lBVHRDLGdCQUFTLENBQUM7UUFDVCw4Q0FBOEM7UUFDOUMsUUFBUSxFQUFFLG9CQUFvQjtRQUM5QixXQUFXLEVBQUUscUNBQXFDO1FBQ2xELFNBQVMsRUFBRSxDQUFDLHFDQUFxQyxDQUFDO1FBQ2xELGFBQWEsRUFBRTtZQUNiLEVBQUUsT0FBTyxFQUFFLHdCQUFnQixFQUFFLFdBQVcsRUFBRSxpQkFBUyxFQUFFO1NBQ3REO0tBQ0YsQ0FBQztHQUNXLDBCQUEwQixDQTBCdEM7QUExQlksZ0VBQTBCIn0=