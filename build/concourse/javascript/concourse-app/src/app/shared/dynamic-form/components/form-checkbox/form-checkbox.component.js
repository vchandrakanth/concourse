"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
let FormCheckboxComponent = class FormCheckboxComponent {
    onChange(value) {
        this.group.patchValue({ [this.config.name]: value });
    }
};
FormCheckboxComponent = __decorate([
    core_1.Component({
        // tslint:disable-next-line:component-selector
        selector: 'form-checkbox',
        styleUrls: ['./form-checkbox.component.scss'],
        template: `
  <div class="form-group" [formGroup]="group">
   <label class="checkbox-label" [attr.for]="config.name">
    <input
      [attr.data-e2e]="config.dataE2e"
      [id]="config.name" [type]="config.exType || 'checkbox'"
      [checked]="config.checked || false" class="custom-control-indicator"
      [formControlName]="config.name"
      (change)="onChange($event.target.checked)">
      <span>{{ config.label }}</span>
  </label>
  </div>
`
    })
], FormCheckboxComponent);
exports.FormCheckboxComponent = FormCheckboxComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS1jaGVja2JveC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9jb25jb3Vyc2UvamF2YXNjcmlwdC9jb25jb3Vyc2UtYXBwL3NyYy9hcHAvc2hhcmVkL2R5bmFtaWMtZm9ybS9jb21wb25lbnRzL2Zvcm0tY2hlY2tib3gvZm9ybS1jaGVja2JveC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQSx3Q0FBMEM7QUF1QjFDLElBQWEscUJBQXFCLEdBQWxDLE1BQWEscUJBQXFCO0lBSWhDLFFBQVEsQ0FBQyxLQUFjO1FBQ3JCLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUM7SUFDdkQsQ0FBQztDQUNGLENBQUE7QUFQWSxxQkFBcUI7SUFsQmpDLGdCQUFTLENBQUM7UUFDVCw4Q0FBOEM7UUFDOUMsUUFBUSxFQUFFLGVBQWU7UUFDekIsU0FBUyxFQUFFLENBQUMsZ0NBQWdDLENBQUM7UUFDN0MsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Q0FZWDtLQUNBLENBQUM7R0FDVyxxQkFBcUIsQ0FPakM7QUFQWSxzREFBcUIifQ==