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
let TemplateEntitiesComponent = class TemplateEntitiesComponent {
    constructor(ptfComponent) {
        this.ptfComponent = ptfComponent;
        this.control = new forms_1.FormControl('', [forms_1.Validators.required]);
    }
    ngOnInit() {
        if (this.templateConfig.attributeValues) {
            this.control.setValue(this.templateConfig.attributeValues);
        }
        this.ptfComponent.getGroup(this.templateConfig.parent).addControl(this.templateConfig.name, this.control);
    }
};
TemplateEntitiesComponent = __decorate([
    core_1.Component({
        selector: 'app-template-entities',
        // tslint:disable-next-line
        template: `
    <control-validation class="form-group row">
      <label [attr.for]="templateConfig.name">Entity Type</label>
      <select data-e2e="entityType" class="form-control" [formControl]="control">
        <option value="POLICY_GROUP">Policy Group</option>
        <option value="DEPLOYMENT">Deployment</option>
        <option value="MODEL">Model</option>
        <option value="CLOUD_ROLE">Cloud Role</option>
        <option value="BASELINE">Baseline</option>
        <option value="LOGICAL_BASELINE_DEPLOYMENT">Logical Baseline Deployment</option>
      </select>
    </control-validation>
  `,
        styleUrls: ['../styles/multi-select.scss']
    })
], TemplateEntitiesComponent);
exports.TemplateEntitiesComponent = TemplateEntitiesComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVtcGxhdGUtZW50aXRpZXMuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vY29uY291cnNlL2phdmFzY3JpcHQvY29uY291cnNlLWFwcC9zcmMvYXBwL3NoYXJlZC9wb2xpY3ktdGVtcGxhdGUtZm9ybS9jb21wb25lbnRzL3RlbXBsYXRlLWVudGl0aWVzL3RlbXBsYXRlLWVudGl0aWVzLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBLHdDQUFrRDtBQUNsRCwwQ0FBeUQ7QUF3QnpELElBQWEseUJBQXlCLEdBQXRDLE1BQWEseUJBQXlCO0lBSXBDLFlBQ21CLFlBQXlDO1FBQXpDLGlCQUFZLEdBQVosWUFBWSxDQUE2QjtRQUg1RCxZQUFPLEdBQUcsSUFBSSxtQkFBVyxDQUFDLEVBQUUsRUFBRSxDQUFDLGtCQUFVLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztJQUlqRCxDQUFDO0lBRUwsUUFBUTtRQUNOLElBQUksSUFBSSxDQUFDLGNBQWMsQ0FBQyxlQUFlLEVBQUU7WUFDdkMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxlQUFlLENBQUMsQ0FBQztTQUM1RDtRQUNELElBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUM1RyxDQUFDO0NBRUYsQ0FBQTtBQWZZLHlCQUF5QjtJQW5CckMsZ0JBQVMsQ0FBQztRQUNULFFBQVEsRUFBRSx1QkFBdUI7UUFDakMsMkJBQTJCO1FBQzNCLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7O0dBWVQ7UUFDRCxTQUFTLEVBQUUsQ0FBQyw2QkFBNkIsQ0FBQztLQUMzQyxDQUFDO0dBRVcseUJBQXlCLENBZXJDO0FBZlksOERBQXlCIn0=