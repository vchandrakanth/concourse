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
let TemplateAllowComponent = class TemplateAllowComponent {
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
TemplateAllowComponent = __decorate([
    core_1.Component({
        // tslint:disable-next-line:component-selector
        selector: 'template-allow',
        // tslint:disable-next-line:max-inline-declarations
        template: `
    <control-validation class="form-group row">
      <label>Allow/Disallow</label>
      <select class="form-control"
        [formControl]="control">
        <option value="ALLOW">Allow</option>
        <option disabled value="DISALLOW">Disallow</option>
      </select>
    </control-validation>
  `
    })
], TemplateAllowComponent);
exports.TemplateAllowComponent = TemplateAllowComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVtcGxhdGUtYWxsb3cuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vY29uY291cnNlL2phdmFzY3JpcHQvY29uY291cnNlLWFwcC9zcmMvYXBwL3NoYXJlZC9wb2xpY3ktdGVtcGxhdGUtZm9ybS9jb21wb25lbnRzL3RlbXBsYXRlLWFsbG93L3RlbXBsYXRlLWFsbG93LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBLHdDQUFrRDtBQUNsRCwwQ0FBeUQ7QUFvQnpELElBQWEsc0JBQXNCLEdBQW5DLE1BQWEsc0JBQXNCO0lBSWpDLFlBQ21CLFlBQXlDO1FBQXpDLGlCQUFZLEdBQVosWUFBWSxDQUE2QjtRQUg1RCxZQUFPLEdBQUcsSUFBSSxtQkFBVyxDQUFDLEVBQUUsRUFBRSxDQUFDLGtCQUFVLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztJQUlqRCxDQUFDO0lBRUwsUUFBUTtRQUNOLElBQUksSUFBSSxDQUFDLGNBQWMsQ0FBQyxlQUFlLEVBQUU7WUFDdkMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxlQUFlLENBQUMsQ0FBQztTQUM1RDtRQUNELElBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUM1RyxDQUFDO0NBRUYsQ0FBQTtBQWZZLHNCQUFzQjtJQWZsQyxnQkFBUyxDQUFDO1FBQ1QsOENBQThDO1FBQzlDLFFBQVEsRUFBRSxnQkFBZ0I7UUFDMUIsbURBQW1EO1FBQ25ELFFBQVEsRUFBRTs7Ozs7Ozs7O0dBU1Q7S0FDRixDQUFDO0dBQ1csc0JBQXNCLENBZWxDO0FBZlksd0RBQXNCIn0=