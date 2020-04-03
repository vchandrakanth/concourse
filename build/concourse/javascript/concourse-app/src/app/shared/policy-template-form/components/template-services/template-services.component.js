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
let TemplateServicesComponent = class TemplateServicesComponent {
    constructor(ptfComponent, catalogFacade) {
        this.ptfComponent = ptfComponent;
        this.catalogFacade = catalogFacade;
        this.control = new forms_1.FormControl(undefined, [forms_1.Validators.required]);
        this.options$ = this.catalogFacade.awsProductsList$.pipe(operators_1.skipWhile(services => services === undefined || services.length === 0), operators_1.map(services => services.map(s => s.namespace)), operators_1.startWith([]));
    }
    ngOnInit() {
        this.catalogFacade.getAwsProducts();
        if (this.templateConfig.attributeValues) {
            this.control.setValue(this.templateConfig.attributeValues);
        }
        this.ptfComponent.getGroup(this.templateConfig.parent).addControl(this.templateConfig.name, this.control);
    }
};
TemplateServicesComponent = __decorate([
    core_1.Component({
        selector: 'app-template-services',
        // tslint:disable-next-line:max-inline-declarations
        // tslint:disable-next-line:component-max-inline-declarations
        template: `
    <control-validation class="form-group row">
      <label [attr.for]="templateConfig.name">Select Products</label>
      <ng-select
        *ngLet="options$ | async; let options"
        multiple="true"
        closeOnSelect="false"
        [items]="options"
        data-e2e="serviceDropdown"
        placeholder="Select Products"
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
], TemplateServicesComponent);
exports.TemplateServicesComponent = TemplateServicesComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVtcGxhdGUtc2VydmljZXMuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vY29uY291cnNlL2phdmFzY3JpcHQvY29uY291cnNlLWFwcC9zcmMvYXBwL3NoYXJlZC9wb2xpY3ktdGVtcGxhdGUtZm9ybS9jb21wb25lbnRzL3RlbXBsYXRlLXNlcnZpY2VzL3RlbXBsYXRlLXNlcnZpY2VzLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBLHdDQUFrRDtBQUNsRCwwQ0FBeUQ7QUFHekQsOENBQTJEO0FBaUMzRCxJQUFhLHlCQUF5QixHQUF0QyxNQUFhLHlCQUF5QjtJQVVwQyxZQUNtQixZQUF5QyxFQUN6QyxhQUFtQztRQURuQyxpQkFBWSxHQUFaLFlBQVksQ0FBNkI7UUFDekMsa0JBQWEsR0FBYixhQUFhLENBQXNCO1FBVnRELFlBQU8sR0FBRyxJQUFJLG1CQUFXLENBQUMsU0FBUyxFQUFFLENBQUMsa0JBQVUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO1FBRTVELGFBQVEsR0FBeUIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQ3ZFLHFCQUFTLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxRQUFRLEtBQUssU0FBUyxJQUFJLFFBQVEsQ0FBQyxNQUFNLEtBQUssQ0FBQyxDQUFDLEVBQ3RFLGVBQUcsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsRUFDL0MscUJBQVMsQ0FBQyxFQUFFLENBQUMsQ0FDZCxDQUFDO0lBS0UsQ0FBQztJQUVMLFFBQVE7UUFDTixJQUFJLENBQUMsYUFBYSxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQ3BDLElBQUksSUFBSSxDQUFDLGNBQWMsQ0FBQyxlQUFlLEVBQUU7WUFDdkMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxlQUFlLENBQUMsQ0FBQztTQUM1RDtRQUNELElBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUM1RyxDQUFDO0NBQ0YsQ0FBQTtBQXRCWSx5QkFBeUI7SUEzQnJDLGdCQUFTLENBQUM7UUFDVCxRQUFRLEVBQUUsdUJBQXVCO1FBQ2pDLG1EQUFtRDtRQUNuRCw2REFBNkQ7UUFDN0QsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBbUJUO1FBQ0QsU0FBUyxFQUFFLENBQUMsNkJBQTZCLENBQUM7S0FDM0MsQ0FBQztHQUVXLHlCQUF5QixDQXNCckM7QUF0QlksOERBQXlCIn0=