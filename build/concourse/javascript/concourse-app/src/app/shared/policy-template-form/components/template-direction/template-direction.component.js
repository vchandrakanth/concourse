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
let TemplateDirectionComponent = class TemplateDirectionComponent {
    constructor(ptfComponent) {
        this.ptfComponent = ptfComponent;
        this.control = new forms_1.FormControl('BIDIRECTIONAL', [forms_1.Validators.required]);
    }
    ngOnInit() {
        if (this.templateConfig.attributeValues) {
            this.control.setValue(this.templateConfig.attributeValues);
        }
        this.ptfComponent.getGroup(this.templateConfig.parent).addControl(this.templateConfig.name, this.control);
    }
};
TemplateDirectionComponent = __decorate([
    core_1.Component({
        // tslint:disable-next-line:component-selector
        selector: 'template-string',
        // tslint:disable-next-line:max-inline-declarations
        // tslint:disable-next-line:component-max-inline-declarations
        template: `
  <control-validation class="form-group row">
  <label>Direction</label>
  <select [formControl]="control" class="form-control">
    <option value="BIDIRECTIONAL">BiDirectional</option>
    <option value="INCOMING">Incoming (Ingress)</option>
    <option value="OUTGOING">Outgoing (Egress)</option>
  </select>
</control-validation>
  `
    })
], TemplateDirectionComponent);
exports.TemplateDirectionComponent = TemplateDirectionComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVtcGxhdGUtZGlyZWN0aW9uLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL2NvbmNvdXJzZS9qYXZhc2NyaXB0L2NvbmNvdXJzZS1hcHAvc3JjL2FwcC9zaGFyZWQvcG9saWN5LXRlbXBsYXRlLWZvcm0vY29tcG9uZW50cy90ZW1wbGF0ZS1kaXJlY3Rpb24vdGVtcGxhdGUtZGlyZWN0aW9uLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBLHdDQUFrRDtBQUNsRCwwQ0FBeUQ7QUFxQnpELElBQWEsMEJBQTBCLEdBQXZDLE1BQWEsMEJBQTBCO0lBSXJDLFlBQ21CLFlBQXlDO1FBQXpDLGlCQUFZLEdBQVosWUFBWSxDQUE2QjtRQUg1RCxZQUFPLEdBQUcsSUFBSSxtQkFBVyxDQUFDLGVBQWUsRUFBRSxDQUFDLGtCQUFVLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztJQUk5RCxDQUFDO0lBRUwsUUFBUTtRQUNOLElBQUksSUFBSSxDQUFDLGNBQWMsQ0FBQyxlQUFlLEVBQUU7WUFDdkMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxlQUFlLENBQUMsQ0FBQztTQUM1RDtRQUNELElBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUM1RyxDQUFDO0NBRUYsQ0FBQTtBQWZZLDBCQUEwQjtJQWhCdEMsZ0JBQVMsQ0FBQztRQUNULDhDQUE4QztRQUM5QyxRQUFRLEVBQUUsaUJBQWlCO1FBQzNCLG1EQUFtRDtRQUNuRCw2REFBNkQ7UUFDN0QsUUFBUSxFQUFFOzs7Ozs7Ozs7R0FTVDtLQUNGLENBQUM7R0FDVywwQkFBMEIsQ0FldEM7QUFmWSxnRUFBMEIifQ==