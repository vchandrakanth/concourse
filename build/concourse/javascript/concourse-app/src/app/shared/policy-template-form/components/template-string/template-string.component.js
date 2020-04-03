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
let TemplateStringComponent = class TemplateStringComponent {
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
TemplateStringComponent = __decorate([
    core_1.Component({
        // tslint:disable-next-line:component-selector
        selector: 'template-string',
        // tslint:disable-next-line:max-inline-declarations
        // tslint:disable-next-line:component-max-inline-declarations
        template: `
  <control-validation class="form-group row">
    <label>{{ templateConfig.name }}</label>
    <input type="text" class="form-control"
    [formControl]="control" />
  </control-validation>
  `
    })
], TemplateStringComponent);
exports.TemplateStringComponent = TemplateStringComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVtcGxhdGUtc3RyaW5nLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL2NvbmNvdXJzZS9qYXZhc2NyaXB0L2NvbmNvdXJzZS1hcHAvc3JjL2FwcC9zaGFyZWQvcG9saWN5LXRlbXBsYXRlLWZvcm0vY29tcG9uZW50cy90ZW1wbGF0ZS1zdHJpbmcvdGVtcGxhdGUtc3RyaW5nLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBLHdDQUFrRDtBQUNsRCwwQ0FBeUQ7QUFrQnpELElBQWEsdUJBQXVCLEdBQXBDLE1BQWEsdUJBQXVCO0lBSWxDLFlBQ21CLFlBQXlDO1FBQXpDLGlCQUFZLEdBQVosWUFBWSxDQUE2QjtRQUg1RCxZQUFPLEdBQUcsSUFBSSxtQkFBVyxDQUFDLEVBQUUsRUFBRSxDQUFDLGtCQUFVLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztJQUlqRCxDQUFDO0lBRUwsUUFBUTtRQUNOLElBQUksSUFBSSxDQUFDLGNBQWMsQ0FBQyxlQUFlLEVBQUU7WUFDdkMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxlQUFlLENBQUMsQ0FBQztTQUM1RDtRQUNELElBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUM1RyxDQUFDO0NBRUYsQ0FBQTtBQWZZLHVCQUF1QjtJQWJuQyxnQkFBUyxDQUFDO1FBQ1QsOENBQThDO1FBQzlDLFFBQVEsRUFBRSxpQkFBaUI7UUFDM0IsbURBQW1EO1FBQ25ELDZEQUE2RDtRQUM3RCxRQUFRLEVBQUU7Ozs7OztHQU1UO0tBQ0YsQ0FBQztHQUNXLHVCQUF1QixDQWVuQztBQWZZLDBEQUF1QiJ9