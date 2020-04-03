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
let FormFileUploadComponent = class FormFileUploadComponent {
    onSelectFile(event) {
        if (event.target.files && event.target.files[0]) {
            const reader = new FileReader();
            reader.onload = (getBinary) => {
                this.binaryData = getBinary.target.result;
                if (this.config) {
                    this.group.addControl('fileType', new forms_1.FormControl());
                    this.group.controls.fileType.setValue(event.target.files[0].type);
                    this.group.controls[this.config.name].setValue(this.binaryData);
                }
            };
            return reader.readAsDataURL(event.target.files[0]);
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
FormFileUploadComponent = __decorate([
    core_1.Component({
        // tslint:disable-next-line:component-selector
        selector: 'form-file-upload',
        template: `
    <div id= "{{ config.name }}"
      class="form-group {{config.class}}"
      [formGroup]="group">
      <input
       type="file"
       [attr.data-e2e]="config.dataE2e"
       id="{{ config.name }}"
       name="{{ config.name }}"
       [ngClass]="{'is-invalid': hasError()}"
       (change)="onSelectFile($event)"
       class="form-control">
       <p *ngIf="hasError() && !!errors" class="invalid-feedback mb-0">{{ errors }}</p>
    </div>
  `
    })
], FormFileUploadComponent);
exports.FormFileUploadComponent = FormFileUploadComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS1maWxlLXVwbG9hZC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9jb25jb3Vyc2UvamF2YXNjcmlwdC9jb25jb3Vyc2UtYXBwL3NyYy9hcHAvc2hhcmVkL2R5bmFtaWMtZm9ybS9jb21wb25lbnRzL2Zvcm0tZmlsZS11cGxvYWQvZm9ybS1maWxlLXVwbG9hZC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQSx3Q0FBMEM7QUFDMUMsMENBQXlFO0FBc0J6RSxJQUFhLHVCQUF1QixHQUFwQyxNQUFhLHVCQUF1QjtJQUtsQyxZQUFZLENBQUMsS0FBVTtRQUNyQixJQUFJLEtBQUssQ0FBQyxNQUFNLENBQUMsS0FBSyxJQUFJLEtBQUssQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFFO1lBQy9DLE1BQU0sTUFBTSxHQUFHLElBQUksVUFBVSxFQUFFLENBQUM7WUFDaEMsTUFBTSxDQUFDLE1BQU0sR0FBRyxDQUFDLFNBQXdCLEVBQUUsRUFBRTtnQkFDM0MsSUFBSSxDQUFDLFVBQVUsR0FBSSxTQUFTLENBQUMsTUFBcUIsQ0FBQyxNQUFNLENBQUM7Z0JBQzFELElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRTtvQkFDZixJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxVQUFVLEVBQUUsSUFBSSxtQkFBVyxFQUFFLENBQUMsQ0FBQztvQkFDckQsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQztvQkFDbEUsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO2lCQUNqRTtZQUNILENBQUMsQ0FBQztZQUNGLE9BQU8sTUFBTSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQ3BEO0lBQ0gsQ0FBQztJQUVELElBQUksT0FBTztRQUNULE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUMvQyxDQUFDO0lBRUQsUUFBUSxDQUFDLFNBQWtCO1FBQ3pCLElBQUksQ0FBQyxDQUFDLFNBQVMsRUFBRTtZQUNmLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLENBQUM7U0FDL0Q7UUFDRCxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQztJQUNyRCxDQUFDO0lBRUQsSUFBSSxNQUFNO1FBQ1IsT0FBTyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBSSxFQUFFLEdBQUcsRUFBRSxFQUFFO1lBQzNELElBQUksR0FBRyxLQUFLLFVBQVUsRUFBRTtnQkFDdEIsT0FBTyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxPQUFPLEdBQUcsR0FBRyxDQUFDO2FBQzFDO1lBQ0QsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxpQkFBaUIsRUFBRTtnQkFDbkMsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLGlCQUFpQixDQUFDLEdBQUcsQ0FBQyxDQUFDO2FBQzNDO1lBQ0QsT0FBTyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSywyQkFBMkIsR0FBRyxHQUFHLENBQUM7UUFDL0QsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQ1QsQ0FBQztDQUNGLENBQUE7QUExQ1ksdUJBQXVCO0lBbkJuQyxnQkFBUyxDQUFDO1FBQ1QsOENBQThDO1FBQzlDLFFBQVEsRUFBRSxrQkFBa0I7UUFDNUIsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7OztHQWNUO0tBQ0YsQ0FBQztHQUNXLHVCQUF1QixDQTBDbkM7QUExQ1ksMERBQXVCIn0=