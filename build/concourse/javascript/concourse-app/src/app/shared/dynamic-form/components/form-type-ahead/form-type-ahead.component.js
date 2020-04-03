"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const rxjs_1 = require("rxjs");
let FormTypeAheadComponent = class FormTypeAheadComponent {
    constructor() {
        this.hostClass = '';
    }
    ngOnInit() {
        if (this.config && !this.config.options) {
            throw new Error('Options are required for type-ahead input type.');
        }
    }
    get isMultiSelect() {
        return !!this.config.exType || this.config.exType === 'multiselect' ? true : false;
    }
    get options() {
        if (rxjs_1.isObservable(this.config.options)) {
            return this.config.options;
        }
        return new rxjs_1.BehaviorSubject(this.config.options);
    }
    get control() {
        return this.group.controls[this.config.name];
    }
};
__decorate([
    core_1.HostBinding('class')
], FormTypeAheadComponent.prototype, "hostClass", void 0);
FormTypeAheadComponent = __decorate([
    core_1.Component({
        // tslint:disable-next-line:component-selector
        selector: 'form-type-ahead',
        styleUrls: ['./form-type-ahead.component.scss'],
        // tslint:disable-next-line
        template: `
    <div
      [id]="config.name"
      class="form-group {{config.class}}"
      [formGroup]="group">
      <label [attr.for]="config.name">{{ config.label }}</label>
      <control-validation>
      <ng-select
        *ngIf="options | async; let options"
        [items]="options"
        [multiple]="isMultiSelect"
        [closeOnSelect]="!isMultiSelect"
        hideSelected="false"
        bindValue="id"
        [bindLabel]="config.textField || 'text'"
        [placeholder]="config.placeholder"
        [attr.data-e2e]="config.dataE2e"
        [formControl]="control"
        [virtualScroll]="true">
        <ng-template ng-label-tmp let-item="item" let-clear="clear">
        <span [attr.data-e2e]="item.id"(click)="clear(item); $event.stopPropagation()" class="ng-value-icon right" aria-hidden="true">×</span>
        <span>{{item?.name || item?.text}}</span>
      </ng-template>
      </ng-select>
      </control-validation>
    </div>
  `
    })
], FormTypeAheadComponent);
exports.FormTypeAheadComponent = FormTypeAheadComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS10eXBlLWFoZWFkLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL2NvbmNvdXJzZS9qYXZhc2NyaXB0L2NvbmNvdXJzZS1hcHAvc3JjL2FwcC9zaGFyZWQvZHluYW1pYy1mb3JtL2NvbXBvbmVudHMvZm9ybS10eXBlLWFoZWFkL2Zvcm0tdHlwZS1haGVhZC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQSx3Q0FBK0Q7QUFHL0QsK0JBQWlFO0FBcUNqRSxJQUFhLHNCQUFzQixHQUFuQyxNQUFhLHNCQUFzQjtJQUFuQztRQUN3QixjQUFTLEdBQUcsRUFBRSxDQUFDO0lBd0J2QyxDQUFDO0lBcEJDLFFBQVE7UUFDTixJQUFJLElBQUksQ0FBQyxNQUFNLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRTtZQUN2QyxNQUFNLElBQUksS0FBSyxDQUFDLGlEQUFpRCxDQUFDLENBQUM7U0FDcEU7SUFDSCxDQUFDO0lBRUQsSUFBSSxhQUFhO1FBQ2YsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEtBQUssYUFBYSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQztJQUNyRixDQUFDO0lBRUQsSUFBSSxPQUFPO1FBQ1QsSUFBSSxtQkFBWSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLEVBQUU7WUFDckMsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQztTQUM1QjtRQUNELE9BQU8sSUFBSSxzQkFBZSxDQUFXLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDNUQsQ0FBQztJQUVELElBQUksT0FBTztRQUNULE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUMvQyxDQUFDO0NBQ0YsQ0FBQTtBQXhCdUI7SUFBckIsa0JBQVcsQ0FBQyxPQUFPLENBQUM7eURBQWdCO0FBRDFCLHNCQUFzQjtJQWpDbEMsZ0JBQVMsQ0FBQztRQUNULDhDQUE4QztRQUM5QyxRQUFRLEVBQUUsaUJBQWlCO1FBQzNCLFNBQVMsRUFBRSxDQUFDLGtDQUFrQyxDQUFDO1FBQy9DLDJCQUEyQjtRQUMzQixRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBMEJUO0tBQ0YsQ0FBQztHQUNXLHNCQUFzQixDQXlCbEM7QUF6Qlksd0RBQXNCIn0=