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
const operators_1 = require("rxjs/operators");
let TemplateRegionsComponent = class TemplateRegionsComponent {
    constructor(ptfComponent, catalogFacade) {
        this.ptfComponent = ptfComponent;
        this.catalogFacade = catalogFacade;
        this.control = new forms_1.FormControl(undefined, [forms_1.Validators.required]);
        this.options$ = this.catalogFacade.awsRegionsList$.pipe(operators_1.skipWhile(regions => regions === undefined || regions.length === 0), operators_1.map(regions => regions.map(region => region.region)), operators_1.startWith([]));
    }
    ngOnInit() {
        this.catalogFacade.getAWSRegions();
        if (this.templateConfig.attributeValues) {
            this.control.setValue(this.templateConfig.attributeValues);
        }
        this.ptfComponent.getGroup(this.templateConfig.parent).addControl(this.templateConfig.name, this.control);
    }
};
TemplateRegionsComponent = __decorate([
    core_1.Component({
        selector: 'app-template-regions',
        // tslint:disable-next-line:max-inline-declarations
        // tslint:disable-next-line:component-max-inline-declarations
        template: `
    <control-validation class="form-group row">
      <label [attr.for]="templateConfig.name">Select Regions</label>
      <ng-select
        *ngLet="options$ | async; let options"
        multiple="true"
        closeOnSelect="false"
        [items]="options"
        placeholder="Select Regions"
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
], TemplateRegionsComponent);
exports.TemplateRegionsComponent = TemplateRegionsComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVtcGxhdGUtcmVnaW9ucy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9jb25jb3Vyc2UvamF2YXNjcmlwdC9jb25jb3Vyc2UtYXBwL3NyYy9hcHAvc2hhcmVkL3BvbGljeS10ZW1wbGF0ZS1mb3JtL2NvbXBvbmVudHMvdGVtcGxhdGUtcmVnaW9ucy90ZW1wbGF0ZS1yZWdpb25zLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBLHdDQUFrRDtBQUNsRCwwQ0FBeUQ7QUFHekQsOENBQTJEO0FBK0IzRCxJQUFhLHdCQUF3QixHQUFyQyxNQUFhLHdCQUF3QjtJQVVuQyxZQUNtQixZQUF5QyxFQUN6QyxhQUFtQztRQURuQyxpQkFBWSxHQUFaLFlBQVksQ0FBNkI7UUFDekMsa0JBQWEsR0FBYixhQUFhLENBQXNCO1FBVnRELFlBQU8sR0FBRyxJQUFJLG1CQUFXLENBQUMsU0FBUyxFQUFFLENBQUMsa0JBQVUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO1FBRTVELGFBQVEsR0FBeUIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUN0RSxxQkFBUyxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsT0FBTyxLQUFLLFNBQVMsSUFBSSxPQUFPLENBQUMsTUFBTSxLQUFLLENBQUMsQ0FBQyxFQUNuRSxlQUFHLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQ3BELHFCQUFTLENBQUMsRUFBRSxDQUFDLENBQ2QsQ0FBQztJQUtFLENBQUM7SUFFTCxRQUFRO1FBQ04sSUFBSSxDQUFDLGFBQWEsQ0FBQyxhQUFhLEVBQUUsQ0FBQztRQUNuQyxJQUFJLElBQUksQ0FBQyxjQUFjLENBQUMsZUFBZSxFQUFFO1lBQ3ZDLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsZUFBZSxDQUFDLENBQUM7U0FDNUQ7UUFDRCxJQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDNUcsQ0FBQztDQUNGLENBQUE7QUF0Qlksd0JBQXdCO0lBekJwQyxnQkFBUyxDQUFDO1FBQ1QsUUFBUSxFQUFFLHNCQUFzQjtRQUNoQyxtREFBbUQ7UUFDbkQsNkRBQTZEO1FBQzdELFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBa0JUO1FBQ0QsU0FBUyxFQUFFLENBQUMsNkJBQTZCLENBQUM7S0FDM0MsQ0FBQztHQUNXLHdCQUF3QixDQXNCcEM7QUF0QlksNERBQXdCIn0=