"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
let FormButtonComponent = class FormButtonComponent {
    onClick() {
        if (this.config.value instanceof Function) {
            event.stopPropagation();
            this.config.value();
        }
    }
};
FormButtonComponent = __decorate([
    core_1.Component({
        // tslint:disable-next-line:component-selector
        selector: 'form-button',
        template: `
    <span
      class="form-group"
      [formGroup]="group">
      <button
        class="btn {{config.label}} {{ config.exType || 'btn-primary' }} {{config.class}}"
        [attr.data-e2e]="config.dataE2e"
        [type]="config.name || 'submit'"
        (click)="onClick()">
        {{ config.label }}
      </button>
    </span>
  `
    })
], FormButtonComponent);
exports.FormButtonComponent = FormButtonComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS1idXR0b24uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vY29uY291cnNlL2phdmFzY3JpcHQvY29uY291cnNlLWFwcC9zcmMvYXBwL3NoYXJlZC9keW5hbWljLWZvcm0vY29tcG9uZW50cy9mb3JtLWJ1dHRvbi9mb3JtLWJ1dHRvbi5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQSx3Q0FBMEM7QUFzQjFDLElBQWEsbUJBQW1CLEdBQWhDLE1BQWEsbUJBQW1CO0lBSTlCLE9BQU87UUFDTCxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxZQUFZLFFBQVEsRUFBRTtZQUN6QyxLQUFLLENBQUMsZUFBZSxFQUFFLENBQUM7WUFDeEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQztTQUNyQjtJQUNILENBQUM7Q0FDRixDQUFBO0FBVlksbUJBQW1CO0lBakIvQixnQkFBUyxDQUFDO1FBQ1QsOENBQThDO1FBQzlDLFFBQVEsRUFBRSxhQUFhO1FBQ3ZCLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7O0dBWVQ7S0FDRixDQUFDO0dBQ1csbUJBQW1CLENBVS9CO0FBVlksa0RBQW1CIn0=