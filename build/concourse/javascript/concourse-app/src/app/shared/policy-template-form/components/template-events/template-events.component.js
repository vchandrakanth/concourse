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
const operators_1 = require("@concourse/core/operators");
const operators_2 = require("rxjs/operators");
let TemplateEventsComponent = class TemplateEventsComponent {
    constructor(ptfComponent) {
        this.ptfComponent = ptfComponent;
        this.control = new forms_1.FormControl(undefined, [forms_1.Validators.required]);
        this.entityEvents = {
            POLICY_GROUP: ['PUBLISH', 'DELETE'],
            DEPLOYMENT: ['CREATE', 'UPDATE', 'DELETE'],
            MODEL: ['PUBLISH', 'DELETE'],
            CLOUD_ROLE: ['PUBLISH', 'DELETE'],
            BASELINE: ['PUBLISH', 'DELETE'],
            LOGICAL_BASELINE_DEPLOYMENT: ['PUBLISH', 'DELETE']
        };
    }
    get formGroup() {
        return this.ptfComponent.getGroup(this.templateConfig.parent);
    }
    ngOnInit() {
        if (!!this.templateConfig) {
            if (this.templateConfig.attributeValues) {
                this.control.setValue(this.templateConfig.attributeValues);
            }
            this.formGroup.addControl(this.templateConfig.name, this.control);
            this.eventList$ = this.formGroup.valueChanges.pipe(operators_1.untilDestroy(this), operators_2.filter(g => !!g.entity), operators_2.map(a => this.entityEvents[a.entity]));
        }
    }
    ngOnDestroy() {
        // stub for untilDestroy
    }
};
TemplateEventsComponent = __decorate([
    core_1.Component({
        selector: 'app-template-events',
        // tslint:disable-next-line
        template: `
    <control-validation class="form-group row">
      <label [attr.for]="templateConfig.name">Event</label>
      <ng-select
        data-e2e="eventType"
        *ngLet="eventList$ | async; let eventList"
        multiple="true"
        closeOnSelect="false"
        [items]="eventList"
        placeholder="Events"
        [formControl]="control">
        <ng-template ng-header-tmp>
          <app-dropdown-select-all
          [optionList]="eventList"
          [control]="control"
          ></app-dropdown-select-all>
        </ng-template>
      </ng-select>
    </control-validation>
  `,
        styleUrls: ['../styles/multi-select.scss']
    })
], TemplateEventsComponent);
exports.TemplateEventsComponent = TemplateEventsComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVtcGxhdGUtZXZlbnRzLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL2NvbmNvdXJzZS9qYXZhc2NyaXB0L2NvbmNvdXJzZS1hcHAvc3JjL2FwcC9zaGFyZWQvcG9saWN5LXRlbXBsYXRlLWZvcm0vY29tcG9uZW50cy90ZW1wbGF0ZS1ldmVudHMvdGVtcGxhdGUtZXZlbnRzLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBLHdDQUE2RDtBQUM3RCwwQ0FBb0U7QUFFcEUseURBQXlEO0FBRXpELDhDQUE2QztBQThCN0MsSUFBYSx1QkFBdUIsR0FBcEMsTUFBYSx1QkFBdUI7SUFtQmxDLFlBQ21CLFlBQXlDO1FBQXpDLGlCQUFZLEdBQVosWUFBWSxDQUE2QjtRQWxCNUQsWUFBTyxHQUFHLElBQUksbUJBQVcsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxrQkFBVSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7UUFFNUQsaUJBQVksR0FBRztZQUNiLFlBQVksRUFBRSxDQUFDLFNBQVMsRUFBRSxRQUFRLENBQUM7WUFDbkMsVUFBVSxFQUFFLENBQUMsUUFBUSxFQUFFLFFBQVEsRUFBRSxRQUFRLENBQUM7WUFDMUMsS0FBSyxFQUFFLENBQUMsU0FBUyxFQUFFLFFBQVEsQ0FBQztZQUM1QixVQUFVLEVBQUUsQ0FBQyxTQUFTLEVBQUUsUUFBUSxDQUFDO1lBQ2pDLFFBQVEsRUFBRSxDQUFDLFNBQVMsRUFBRSxRQUFRLENBQUM7WUFDL0IsMkJBQTJCLEVBQUUsQ0FBQyxTQUFTLEVBQUUsUUFBUSxDQUFDO1NBQ25ELENBQUM7SUFVRSxDQUFDO0lBTkwsSUFBSSxTQUFTO1FBQ1gsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ2hFLENBQUM7SUFNRCxRQUFRO1FBQ04sSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLGNBQWMsRUFBRTtZQUN6QixJQUFJLElBQUksQ0FBQyxjQUFjLENBQUMsZUFBZSxFQUFFO2dCQUN2QyxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLGVBQWUsQ0FBQyxDQUFDO2FBQzVEO1lBQ0QsSUFBSSxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQ2xFLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUNoRCx3QkFBWSxDQUFDLElBQUksQ0FBQyxFQUNsQixrQkFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsRUFDdkIsZUFBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FDdEMsQ0FBQztTQUNIO0lBQ0gsQ0FBQztJQUVELFdBQVc7UUFDVCx3QkFBd0I7SUFDMUIsQ0FBQztDQUVGLENBQUE7QUF6Q1ksdUJBQXVCO0lBekJuQyxnQkFBUyxDQUFDO1FBQ1QsUUFBUSxFQUFFLHFCQUFxQjtRQUMvQiwyQkFBMkI7UUFDM0IsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBbUJUO1FBQ0QsU0FBUyxFQUFFLENBQUMsNkJBQTZCLENBQUM7S0FDM0MsQ0FBQztHQUNXLHVCQUF1QixDQXlDbkM7QUF6Q1ksMERBQXVCIn0=