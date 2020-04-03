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
let TemplateApprovalGroupsComponent = class TemplateApprovalGroupsComponent {
    constructor(groupsFacade, ptfComponent) {
        this.groupsFacade = groupsFacade;
        this.ptfComponent = ptfComponent;
        this.control = new forms_1.FormControl(undefined, [forms_1.Validators.required]);
        this.options$ = this.groupsFacade.list$;
    }
    ngOnInit() {
        if (this.templateConfig.attributeValues) {
            this.control.setValue(this.templateConfig.attributeValues);
        }
        this.ptfComponent.getGroup(this.templateConfig.parent).addControl(this.templateConfig.name, this.control);
    }
};
TemplateApprovalGroupsComponent = __decorate([
    core_1.Component({
        selector: 'app-template-approval-groups',
        // tslint:disable-next-line
        template: `
    <control-validation class="form-group row">
      <label [attr.for]="templateConfig.name">Approval Groups</label>
      <ng-select
        *ngLet="options$ | async; let options"
        [items]="options"
        multiple="true"
        closeOnSelect="false"
        bindValue="id"
        bindLabel="name"
        placeholder="Select Approval Groups"
        [formControl]="control">
        <ng-template ng-header-tmp>
          <app-dropdown-select-all
          [optionList]="options"
          [control]="control"
          ></app-dropdown-select-all>
        </ng-template>
      </ng-select>
    </control-validation>
  `,
        styleUrls: ['../styles/multi-select.scss']
    })
], TemplateApprovalGroupsComponent);
exports.TemplateApprovalGroupsComponent = TemplateApprovalGroupsComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVtcGxhdGUtYXBwcm92YWwtZ3JvdXBzLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL2NvbmNvdXJzZS9qYXZhc2NyaXB0L2NvbmNvdXJzZS1hcHAvc3JjL2FwcC9zaGFyZWQvcG9saWN5LXRlbXBsYXRlLWZvcm0vY29tcG9uZW50cy90ZW1wbGF0ZS1hcHByb3ZhbC1ncm91cHMvdGVtcGxhdGUtYXBwcm92YWwtZ3JvdXBzLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBLHdDQUFrRDtBQUNsRCwwQ0FBeUQ7QUFnQ3pELElBQWEsK0JBQStCLEdBQTVDLE1BQWEsK0JBQStCO0lBTTFDLFlBQ21CLFlBQXlCLEVBQ3pCLFlBQXlDO1FBRHpDLGlCQUFZLEdBQVosWUFBWSxDQUFhO1FBQ3pCLGlCQUFZLEdBQVosWUFBWSxDQUE2QjtRQU41RCxZQUFPLEdBQUcsSUFBSSxtQkFBVyxDQUFDLFNBQVMsRUFBRSxDQUFDLGtCQUFVLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztRQUU1RCxhQUFRLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUM7SUFLL0IsQ0FBQztJQUVMLFFBQVE7UUFDTixJQUFJLElBQUksQ0FBQyxjQUFjLENBQUMsZUFBZSxFQUFFO1lBQ3ZDLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsZUFBZSxDQUFDLENBQUM7U0FDNUQ7UUFDRCxJQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDNUcsQ0FBQztDQUNGLENBQUE7QUFqQlksK0JBQStCO0lBMUIzQyxnQkFBUyxDQUFDO1FBQ1QsUUFBUSxFQUFFLDhCQUE4QjtRQUN4QywyQkFBMkI7UUFDM0IsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW9CVDtRQUNELFNBQVMsRUFBRSxDQUFDLDZCQUE2QixDQUFDO0tBQzNDLENBQUM7R0FDVywrQkFBK0IsQ0FpQjNDO0FBakJZLDBFQUErQiJ9