"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const rxjs_1 = require("rxjs");
let FormSelectComponent = class FormSelectComponent {
    constructor() {
        this.hostClass = '';
    }
    trackItems(_index, option) {
        if (typeof option === 'string') {
            return option;
        }
        return option.value;
    }
    get options() {
        if (rxjs_1.isObservable(this.config.options)) {
            return this.config.options;
        }
        return new rxjs_1.BehaviorSubject(this.config.options);
    }
    onChange() {
        if (this.config.value instanceof Function) {
            this.config.value();
        }
    }
};
__decorate([
    core_1.HostBinding('class')
], FormSelectComponent.prototype, "hostClass", void 0);
FormSelectComponent = __decorate([
    core_1.Component({
        // tslint:disable-next-line:component-selector
        selector: 'form-select',
        template: `
  <div
  [id]="config.name"
  class="form-group {{config.class}}"
  [formGroup]="group">
  <label [attr.for]="config.name">{{ config.label }}</label>
      <select class="form-control" [attr.data-e2e]="config.dataE2e" [formControlName]="config.name" (change)="onChange()">
        <option *ngIf="!!config.placeholder" value="" disabled >{{ config.placeholder }}</option>
        <option *ngFor="let option of options | async; trackBy: trackItems" [ngValue]="option.id">
          {{ option.text }}
        </option>
      </select>
    </div>
  `
    })
], FormSelectComponent);
exports.FormSelectComponent = FormSelectComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS1zZWxlY3QuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vY29uY291cnNlL2phdmFzY3JpcHQvY29uY291cnNlLWFwcC9zcmMvYXBwL3NoYXJlZC9keW5hbWljLWZvcm0vY29tcG9uZW50cy9mb3JtLXNlbGVjdC9mb3JtLXNlbGVjdC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQSx3Q0FBdUQ7QUFHdkQsK0JBQWlFO0FBc0JqRSxJQUFhLG1CQUFtQixHQUFoQyxNQUFhLG1CQUFtQjtJQUFoQztRQUd3QixjQUFTLEdBQUcsRUFBRSxDQUFDO0lBcUJ2QyxDQUFDO0lBbkJDLFVBQVUsQ0FBQyxNQUFjLEVBQUUsTUFBMEQ7UUFDbkYsSUFBSSxPQUFPLE1BQU0sS0FBSyxRQUFRLEVBQUU7WUFDOUIsT0FBTyxNQUFNLENBQUM7U0FDZjtRQUNELE9BQU8sTUFBTSxDQUFDLEtBQUssQ0FBQztJQUN0QixDQUFDO0lBRUQsSUFBSSxPQUFPO1FBQ1QsSUFBSSxtQkFBWSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLEVBQUU7WUFDckMsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQztTQUM1QjtRQUNELE9BQU8sSUFBSSxzQkFBZSxDQUFXLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDNUQsQ0FBQztJQUVELFFBQVE7UUFDTixJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxZQUFZLFFBQVEsRUFBRTtZQUN6QyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFDO1NBQ3JCO0lBQ0gsQ0FBQztDQUNGLENBQUE7QUFyQnVCO0lBQXJCLGtCQUFXLENBQUMsT0FBTyxDQUFDO3NEQUFnQjtBQUgxQixtQkFBbUI7SUFsQi9CLGdCQUFTLENBQUM7UUFDVCw4Q0FBOEM7UUFDOUMsUUFBUSxFQUFFLGFBQWE7UUFDdkIsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7O0dBYVQ7S0FDRixDQUFDO0dBQ1csbUJBQW1CLENBd0IvQjtBQXhCWSxrREFBbUIifQ==