"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
let FormInputComponent = class FormInputComponent {
    ngOnChanges() {
        if (this.config) {
            this.group.setValue({ [this.config.name]: this.config.value });
        }
    }
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
FormInputComponent = __decorate([
    core_1.Component({
        // tslint:disable-next-line:component-selector
        selector: 'form-input',
        template: `
    <div
      id= "{{ config.label }}"
      class="form-group {{config.class}}"
      [formGroup]="group">
      <label for="{{ config.name }}">{{ config.label }}</label>
      <input
        id="{{ config.name }}"
        attr.data-e2e="{{config.dataE2e || config.name}}"
        autocomplete="off"
        [readonly]="config.isReadOnly"
        type="{{ config.exType || 'text' }}"
        class="form-control"
        [ngClass]="{'is-invalid': hasError()}"
        [attr.placeholder]="config.placeholder"
        [formControlName]="config.name"
        autofocus="config.autofocus">
        <p *ngIf="hasError() && !!errors" class="invalid-feedback mb-0">{{ errors }}</p>
    </div>
  `
    })
], FormInputComponent);
exports.FormInputComponent = FormInputComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS1pbnB1dC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9jb25jb3Vyc2UvamF2YXNjcmlwdC9jb25jb3Vyc2UtYXBwL3NyYy9hcHAvc2hhcmVkL2R5bmFtaWMtZm9ybS9jb21wb25lbnRzL2Zvcm0taW5wdXQvZm9ybS1pbnB1dC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQSx3Q0FBcUQ7QUE2QnJELElBQWEsa0JBQWtCLEdBQS9CLE1BQWEsa0JBQWtCO0lBSTdCLFdBQVc7UUFDVCxJQUFJLElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDZixJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUM7U0FDaEU7SUFDSCxDQUFDO0lBRUQsSUFBSSxPQUFPO1FBQ1QsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQy9DLENBQUM7SUFFRCxRQUFRLENBQUMsU0FBa0I7UUFDekIsSUFBSSxDQUFDLENBQUMsU0FBUyxFQUFFO1lBQ2YsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQztTQUMvRDtRQUNELE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDO0lBQ3JELENBQUM7SUFFRCxJQUFJLE1BQU07UUFDUixPQUFPLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxJQUFJLEVBQUUsR0FBRyxFQUFFLEVBQUU7WUFDM0QsSUFBSSxHQUFHLEtBQUssVUFBVSxFQUFFO2dCQUN0QixPQUFPLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLE9BQU8sR0FBRyxHQUFHLENBQUM7YUFDMUM7WUFDRCxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLGlCQUFpQixFQUFFO2dCQUNuQyxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsaUJBQWlCLENBQUMsR0FBRyxDQUFDLENBQUM7YUFDM0M7WUFDRCxPQUFPLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLDJCQUEyQixHQUFHLEdBQUcsQ0FBQztRQUMvRCxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFDVCxDQUFDO0NBRUYsQ0FBQTtBQWpDWSxrQkFBa0I7SUF4QjlCLGdCQUFTLENBQUM7UUFDVCw4Q0FBOEM7UUFDOUMsUUFBUSxFQUFFLFlBQVk7UUFDdEIsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBbUJUO0tBQ0YsQ0FBQztHQUNXLGtCQUFrQixDQWlDOUI7QUFqQ1ksZ0RBQWtCIn0=