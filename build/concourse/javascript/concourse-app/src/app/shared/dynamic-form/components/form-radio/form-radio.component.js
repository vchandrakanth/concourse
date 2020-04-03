"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
let FormRadioComponent = class FormRadioComponent {
    onChange() {
        if (this.config.value instanceof Function) {
            event.stopPropagation();
            this.config.value();
        }
    }
};
FormRadioComponent = __decorate([
    core_1.Component({
        // tslint:disable-next-line:component-selector
        selector: 'form-radio',
        template: `
  <span
    class="form-check form-check-inline mt-2 mb-4"
    [formGroup]="group">
    <span *ngFor="let opt of config.options" class="mr-3">
    <input
    [checked]="opt.isChecked"
    (change)="onChange()"
    class="mr-2"
    type="radio"
    [attr.data-e2e]="config.dataE2e"
    [name]="config.name"
    [formControlName]="config.name"
    [value]="opt.value">
    <label class="form-check-label" [attr.for]="config.name">{{ opt.name }}</label>
    </span>
    </span>
  `
    })
], FormRadioComponent);
exports.FormRadioComponent = FormRadioComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS1yYWRpby5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9jb25jb3Vyc2UvamF2YXNjcmlwdC9jb25jb3Vyc2UtYXBwL3NyYy9hcHAvc2hhcmVkL2R5bmFtaWMtZm9ybS9jb21wb25lbnRzL2Zvcm0tcmFkaW8vZm9ybS1yYWRpby5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQSx3Q0FBMEM7QUEyQjFDLElBQWEsa0JBQWtCLEdBQS9CLE1BQWEsa0JBQWtCO0lBSTdCLFFBQVE7UUFDTixJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxZQUFZLFFBQVEsRUFBRTtZQUN6QyxLQUFLLENBQUMsZUFBZSxFQUFFLENBQUM7WUFDeEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQztTQUNyQjtJQUNILENBQUM7Q0FDRixDQUFBO0FBVlksa0JBQWtCO0lBdEI5QixnQkFBUyxDQUFDO1FBQ1QsOENBQThDO1FBQzlDLFFBQVEsRUFBRSxZQUFZO1FBQ3RCLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FpQlQ7S0FDRixDQUFDO0dBQ1csa0JBQWtCLENBVTlCO0FBVlksZ0RBQWtCIn0=