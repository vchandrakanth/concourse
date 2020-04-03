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
let TemplateExternalNetworkWhitelistComponent = class TemplateExternalNetworkWhitelistComponent {
    constructor(institutionDataFacade, ptfComponent) {
        this.institutionDataFacade = institutionDataFacade;
        this.ptfComponent = ptfComponent;
        this.control = new forms_1.FormControl(undefined, [forms_1.Validators.required]);
        this.cidrBlocks$ = this.institutionDataFacade.cidrs$.pipe(operators_1.filter(selected => !!selected), operators_1.map(blocks => Object.entries(blocks.multiMapValues).map(([label, value]) => ({ label, value }))));
    }
    get formGroup() {
        return this.ptfComponent.getGroup(this.templateConfig.parent);
    }
    ngOnInit() {
        this.institutionDataFacade.get({ dataDomain: 'INSTITUTION' }, 'network-whitelists');
        if (!!this.templateConfig) {
            if (this.templateConfig.attributeValues) {
                this.control.setValue(this.templateConfig.attributeValues);
            }
            this.formGroup.addControl(this.templateConfig.name, this.control);
        }
    }
};
TemplateExternalNetworkWhitelistComponent = __decorate([
    core_1.Component({
        selector: 'app-external-network-whitelist',
        // tslint:disable-next-line
        template: `
    <control-validation class="form-group row">
      <label [attr.for]="templateConfig.name">External Network Whitelist</label>
      <ng-select
        *ngLet="cidrBlocks$ | async; let cidrBlocks"
        [closeOnSelect]="true"
        bindValue="value"
        [items]="cidrBlocks"
        placeholder="External Network Whitelist"
        [formControl]="control">
      </ng-select>
    </control-validation>
  `,
        styleUrls: ['../styles/multi-select.scss']
    })
], TemplateExternalNetworkWhitelistComponent);
exports.TemplateExternalNetworkWhitelistComponent = TemplateExternalNetworkWhitelistComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVtcGxhdGUtZXh0ZXJuYWwtbmV0d29yay13aGl0ZWxpc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9jb25jb3Vyc2UvamF2YXNjcmlwdC9jb25jb3Vyc2UtYXBwL3NyYy9hcHAvc2hhcmVkL3BvbGljeS10ZW1wbGF0ZS1mb3JtL2NvbXBvbmVudHMvdGVtcGxhdGUtZXh0ZXJuYWwtbmV0d29yay13aGl0ZWxpc3QvdGVtcGxhdGUtZXh0ZXJuYWwtbmV0d29yay13aGl0ZWxpc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQSx3Q0FBa0Q7QUFDbEQsMENBQW9FO0FBRXBFLDhDQUE2QztBQXdCN0MsSUFBYSx5Q0FBeUMsR0FBdEQsTUFBYSx5Q0FBeUM7SUFZcEQsWUFDbUIscUJBQTRDLEVBQzVDLFlBQXlDO1FBRHpDLDBCQUFxQixHQUFyQixxQkFBcUIsQ0FBdUI7UUFDNUMsaUJBQVksR0FBWixZQUFZLENBQTZCO1FBWjVELFlBQU8sR0FBRyxJQUFJLG1CQUFXLENBQUMsU0FBUyxFQUFFLENBQUMsa0JBQVUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO1FBQzVELGdCQUFXLEdBQUcsSUFBSSxDQUFDLHFCQUFxQixDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQ2xELGtCQUFNLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLEVBQzlCLGVBQUcsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUNqRyxDQUFDO0lBU0UsQ0FBQztJQVBMLElBQUksU0FBUztRQUNYLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNoRSxDQUFDO0lBT0QsUUFBUTtRQUNOLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxHQUFHLENBQUMsRUFBRSxVQUFVLEVBQUUsYUFBYSxFQUFFLEVBQUUsb0JBQW9CLENBQUMsQ0FBQztRQUNwRixJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsY0FBYyxFQUFFO1lBQ3pCLElBQUksSUFBSSxDQUFDLGNBQWMsQ0FBQyxlQUFlLEVBQUU7Z0JBQ3ZDLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsZUFBZSxDQUFDLENBQUM7YUFDNUQ7WUFDRCxJQUFJLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7U0FDbkU7SUFDSCxDQUFDO0NBRUYsQ0FBQTtBQTNCWSx5Q0FBeUM7SUFsQnJELGdCQUFTLENBQUM7UUFDVCxRQUFRLEVBQUUsZ0NBQWdDO1FBQzFDLDJCQUEyQjtRQUMzQixRQUFRLEVBQUU7Ozs7Ozs7Ozs7OztHQVlUO1FBQ0QsU0FBUyxFQUFFLENBQUMsNkJBQTZCLENBQUM7S0FDM0MsQ0FBQztHQUNXLHlDQUF5QyxDQTJCckQ7QUEzQlksOEZBQXlDIn0=