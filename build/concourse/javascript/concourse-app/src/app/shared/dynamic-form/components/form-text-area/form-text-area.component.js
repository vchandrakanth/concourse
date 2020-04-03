"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
let FormTextAreaComponent = class FormTextAreaComponent {
    get control() {
        return this.group.controls[this.config.name];
    }
    hasError(errorCode) {
        if (!!errorCode) {
            return this.control.dirty && this.control.hasError(errorCode);
        }
        return this.control.dirty && !!this.control.errors;
    }
    get errors() {
        return Object.keys(this.control.errors).reduce((_acc, key) => {
            if (key === 'required') {
                return `${this.config.label} is ${key}.`;
            }
            if (!!this.config.validationPhrases) {
                return this.config.validationPhrases[key];
            }
            return `${this.config.label} has a unmet validator: ${key}.`;
        }, '');
    }
};
FormTextAreaComponent = __decorate([
    core_1.Component({
        // tslint:disable-next-line:component-selector
        selector: 'form-text-area',
        styleUrls: ['./form-text-area.component.scss'],
        template: `
    <div
      class="form-group"
      [formGroup]="group">
      <label for="{{ config.name }}">{{ config.label }}</label>
      <textarea
        [attr.data-e2e]="config.dataE2e"
        [id]="config.name"
        class="form-control"
        rows="4"
        [ngClass]="{'is-invalid': hasError()}"
        [attr.placeholder]="config.placeholder"
        [formControlName]="config.name">
      </textarea>
      <p *ngIf="hasError() && !!errors" class="invalid-feedback mb-0">{{ errors }}</p>
    </div>
  `
    })
], FormTextAreaComponent);
exports.FormTextAreaComponent = FormTextAreaComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS10ZXh0LWFyZWEuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vY29uY291cnNlL2phdmFzY3JpcHQvY29uY291cnNlLWFwcC9zcmMvYXBwL3NoYXJlZC9keW5hbWljLWZvcm0vY29tcG9uZW50cy9mb3JtLXRleHQtYXJlYS9mb3JtLXRleHQtYXJlYS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQSx3Q0FBMEM7QUEyQjFDLElBQWEscUJBQXFCLEdBQWxDLE1BQWEscUJBQXFCO0lBSWhDLElBQUksT0FBTztRQUNULE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUMvQyxDQUFDO0lBRUQsUUFBUSxDQUFDLFNBQWtCO1FBQ3pCLElBQUksQ0FBQyxDQUFDLFNBQVMsRUFBRTtZQUNmLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLENBQUM7U0FDL0Q7UUFDRCxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQztJQUNyRCxDQUFDO0lBRUQsSUFBSSxNQUFNO1FBQ1IsT0FBTyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBSSxFQUFFLEdBQUcsRUFBRSxFQUFFO1lBQzNELElBQUksR0FBRyxLQUFLLFVBQVUsRUFBRTtnQkFDdEIsT0FBTyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxPQUFPLEdBQUcsR0FBRyxDQUFDO2FBQzFDO1lBQ0QsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxpQkFBaUIsRUFBRTtnQkFDbkMsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLGlCQUFpQixDQUFDLEdBQUcsQ0FBQyxDQUFDO2FBQzNDO1lBQ0QsT0FBTyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSywyQkFBMkIsR0FBRyxHQUFHLENBQUM7UUFDL0QsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQ1QsQ0FBQztDQUVGLENBQUE7QUEzQlkscUJBQXFCO0lBdEJqQyxnQkFBUyxDQUFDO1FBQ1QsOENBQThDO1FBQzlDLFFBQVEsRUFBRSxnQkFBZ0I7UUFDMUIsU0FBUyxFQUFFLENBQUMsaUNBQWlDLENBQUM7UUFDOUMsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7O0dBZ0JUO0tBQ0YsQ0FBQztHQUNXLHFCQUFxQixDQTJCakM7QUEzQlksc0RBQXFCIn0=