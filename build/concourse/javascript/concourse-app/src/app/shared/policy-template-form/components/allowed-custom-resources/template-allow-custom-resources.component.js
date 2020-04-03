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
const faMinusCircle_1 = require("@fortawesome/free-solid-svg-icons/faMinusCircle");
const faPlusCircle_1 = require("@fortawesome/free-solid-svg-icons/faPlusCircle");
let TemplateAllowCustomResourcesComponent = class TemplateAllowCustomResourcesComponent {
    constructor(ptfComponent, fb) {
        this.ptfComponent = ptfComponent;
        this.fb = fb;
        this.controlGroup = this.fb.array([]);
        this.icons = { faPlusCircle: faPlusCircle_1.faPlusCircle, faMinusCircle: faMinusCircle_1.faMinusCircle, };
    }
    ngOnInit() {
        if (this.templateConfig && this.templateConfig.attributeValues) {
            this.templateConfig.attributeValues.forEach(value => this.addCustomResouceTemplate(value));
        }
        this.ptfComponent.getGroup(this.templateConfig.parent).addControl(this.templateConfig.name, this.controlGroup);
        if (this.templateConfig && !this.templateConfig.attributeValues) {
            this.addCustomResouceTemplate();
        }
    }
    createControl(value) {
        return this.fb.group({
            customResource: this.fb.control(value, forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.pattern('^Custom::(.*)')])),
        });
    }
    removeCustomResouceTemplate(index) {
        this.customResouceTemplateGroup.removeAt(index);
    }
    addCustomResouceTemplate(value) {
        this.customResouceTemplateGroup.push(this.createControl(value));
    }
    get customResouceTemplateGroup() {
        return this.controlGroup;
    }
};
TemplateAllowCustomResourcesComponent = __decorate([
    core_1.Component({
        // tslint:disable-next-line:component-selector
        selector: 'template-allow-custom-resources',
        // tslint:disable-next-line:max-inline-declarations
        template: `
  <div class="form-group">
  <label for="allowCustomResources" class="w-100">Allowed Custom AWS Resources</label>
  <div class="d-flex mb-1"
    *ngFor="let control of customResouceTemplateGroup?.controls; index as i; last as isLast;">
    <div class="flex-fill" [formGroup]="control">
    <control-validation class="form-group">
      <input type="text" placeholder="Custom Control"  class="form-control" [formControl]="control.get('customResource')">
      <p validator="pattern">Custom Resource must begin with: 'Custom::'</p>
      </control-validation>
    </div>
    <div class="btn-group h-35">
      <button class="btn btn-danger btn-sm" type="button" (click)="removeCustomResouceTemplate(i)">
        <fa-icon [icon]="icons.faMinusCircle"></fa-icon>
      </button>
    </div>
  </div>
  <button class="btn btn-secondary btn-sm" type="button" (click)="addCustomResouceTemplate()">
    <fa-icon [icon]="icons.faPlusCircle"></fa-icon> Add Custom Resource
  </button>
</div>
  `
    })
], TemplateAllowCustomResourcesComponent);
exports.TemplateAllowCustomResourcesComponent = TemplateAllowCustomResourcesComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVtcGxhdGUtYWxsb3ctY3VzdG9tLXJlc291cmNlcy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9jb25jb3Vyc2UvamF2YXNjcmlwdC9jb25jb3Vyc2UtYXBwL3NyYy9hcHAvc2hhcmVkL3BvbGljeS10ZW1wbGF0ZS1mb3JtL2NvbXBvbmVudHMvYWxsb3dlZC1jdXN0b20tcmVzb3VyY2VzL3RlbXBsYXRlLWFsbG93LWN1c3RvbS1yZXNvdXJjZXMuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUEsd0NBQWtEO0FBQ2xELDBDQUErRTtBQUMvRSxtRkFBZ0Y7QUFDaEYsaUZBQThFO0FBK0I5RSxJQUFhLHFDQUFxQyxHQUFsRCxNQUFhLHFDQUFxQztJQU1oRCxZQUNtQixZQUF5QyxFQUN6QyxFQUFlO1FBRGYsaUJBQVksR0FBWixZQUFZLENBQTZCO1FBQ3pDLE9BQUUsR0FBRixFQUFFLENBQWE7UUFObEMsaUJBQVksR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQTtRQUN2QixVQUFLLEdBQUcsRUFBRSxZQUFZLEVBQVosMkJBQVksRUFBRSxhQUFhLEVBQWIsNkJBQWEsR0FBRyxDQUFDO0lBT2xELENBQUM7SUFFRCxRQUFRO1FBQ04sSUFBSSxJQUFJLENBQUMsY0FBYyxJQUFJLElBQUksQ0FBQyxjQUFjLENBQUMsZUFBZSxFQUFFO1lBQzlELElBQUksQ0FBQyxjQUFjLENBQUMsZUFBZSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1NBQzVGO1FBQ0QsSUFBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBRS9HLElBQUksSUFBSSxDQUFDLGNBQWMsSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsZUFBZSxFQUFFO1lBQy9ELElBQUksQ0FBQyx3QkFBd0IsRUFBRSxDQUFDO1NBQ2pDO0lBQ0gsQ0FBQztJQUVELGFBQWEsQ0FBQyxLQUFXO1FBQ3ZCLE9BQU8sSUFBSSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUM7WUFDbkIsY0FBYyxFQUFFLElBQUksQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRyxrQkFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDLGtCQUFVLENBQUMsUUFBUSxFQUFFLGtCQUFVLENBQUMsT0FBTyxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUN4SCxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQsMkJBQTJCLENBQUMsS0FBYTtRQUN2QyxJQUFJLENBQUMsMEJBQTBCLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ2xELENBQUM7SUFFRCx3QkFBd0IsQ0FBQyxLQUFXO1FBQ2xDLElBQUksQ0FBQywwQkFBMEIsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO0lBQ2xFLENBQUM7SUFFRCxJQUFJLDBCQUEwQjtRQUM1QixPQUFPLElBQUksQ0FBQyxZQUF5QixDQUFDO0lBQ3hDLENBQUM7Q0FHRixDQUFBO0FBMUNZLHFDQUFxQztJQTNCakQsZ0JBQVMsQ0FBQztRQUNULDhDQUE4QztRQUM5QyxRQUFRLEVBQUUsaUNBQWlDO1FBQzNDLG1EQUFtRDtRQUNuRCxRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXFCVDtLQUNGLENBQUM7R0FDVyxxQ0FBcUMsQ0EwQ2pEO0FBMUNZLHNGQUFxQyJ9