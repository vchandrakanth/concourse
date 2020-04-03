"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
let DynamicFormComponent = class DynamicFormComponent {
    constructor(fb) {
        this.fb = fb;
        // tslint:disable-next-line:no-output-named-after-standard-event
        this.dfSubmit = new core_1.EventEmitter();
        this.form = this.fb.group({});
        this.createControl = (config) => {
            const { disabled, validation, asyncValidation, value } = config;
            return this.fb.control({ disabled, value }, validation, asyncValidation);
        };
    }
    set config(config) {
        this._config = config;
        this._controls = this.config.filter(({ type }) => type !== 'button');
        this.buildControls();
    }
    get config() {
        return this._config;
    }
    get controls() { return this._controls; }
    get changes() { return this.form.valueChanges; }
    get valid() { return this.form.valid; }
    get value() { return this.form.value; }
    buildControls() {
        const group = this.fb.group({});
        this.controls.forEach(control => group.addControl(control.name, this.createControl(control)));
        this.form = group;
    }
    trackItems(_index, item) {
        return item.name;
    }
    handleSubmit() {
        /**
         * mark all values as dirty, this triggers validation on entire form.
         * this.form.markAsDirty() marks form as dirty, but doesn't trigger validation
         * perhaps there's a better way?
         */
        Object.values(this.form.controls).forEach(control => {
            control.markAsDirty();
            control.updateValueAndValidity();
        });
        if (this.form.valid) {
            this.dfSubmit.emit(this.value);
        }
    }
    setDisabled(name, disable) {
        if (this.form.controls[name]) {
            const method = disable ? 'disable' : 'enable';
            this.form.controls[name][method]();
            return;
        }
        this.config = this.config.map(item => {
            if (item.name === name) {
                item.disabled = disable;
            }
            return item;
        });
    }
    setValue(name, value) {
        this.form.controls[name].setValue(value, { emitEvent: true });
    }
};
__decorate([
    core_1.Input()
], DynamicFormComponent.prototype, "config", null);
__decorate([
    core_1.Input()
], DynamicFormComponent.prototype, "formProcessing", void 0);
__decorate([
    core_1.Output()
], DynamicFormComponent.prototype, "dfSubmit", void 0);
DynamicFormComponent = __decorate([
    core_1.Component({
        exportAs: 'dynamicForm',
        selector: 'app-dynamic-form',
        styleUrls: ['./dynamic-form.component.scss'],
        // tslint:disable-next-line:max-inline-declarations
        template: `
    <form
      [formGroup]="form"
      (ngSubmit)="handleSubmit()">
      <bs-alert *ngIf="formProcessing | async" dismissable="false" type="info">
        <strong>Sending Request...</strong>
      </bs-alert>
      <ng-container
        *ngFor="let field of config; trackBy: trackItems"
        dynamicField
        [config]="field"
        [group]="form">
      </ng-container>
    </form>
  `
    })
], DynamicFormComponent);
exports.DynamicFormComponent = DynamicFormComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHluYW1pYy1mb3JtLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL2NvbmNvdXJzZS9qYXZhc2NyaXB0L2NvbmNvdXJzZS1hcHAvc3JjL2FwcC9zaGFyZWQvZHluYW1pYy1mb3JtL2R5bmFtaWMtZm9ybS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQSx3Q0FLdUI7QUErQnZCLElBQWEsb0JBQW9CLEdBQWpDLE1BQWEsb0JBQW9CO0lBdUIvQixZQUNtQixFQUFlO1FBQWYsT0FBRSxHQUFGLEVBQUUsQ0FBYTtRQWJsQyxnRUFBZ0U7UUFDN0MsYUFBUSxHQUFHLElBQUksbUJBQVksRUFBTyxDQUFDO1FBT3RELFNBQUksR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQztRQWN6QixrQkFBYSxHQUFHLENBQUMsTUFBbUIsRUFBZSxFQUFFO1lBQ25ELE1BQU0sRUFBRSxRQUFRLEVBQUUsVUFBVSxFQUFFLGVBQWUsRUFBRSxLQUFLLEVBQUUsR0FBRyxNQUFNLENBQUM7WUFDaEUsT0FBTyxJQUFJLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsRUFBRSxVQUFVLEVBQUUsZUFBZSxDQUFDLENBQUM7UUFDM0UsQ0FBQyxDQUFDO0lBWEUsQ0FBQztJQXZCTCxJQUFJLE1BQU0sQ0FBQyxNQUFxQjtRQUM5QixJQUFJLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQztRQUN0QixJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFLENBQUMsSUFBSSxLQUFLLFFBQVEsQ0FBQyxDQUFDO1FBQ3JFLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztJQUN2QixDQUFDO0lBQ0QsSUFBSSxNQUFNO1FBQ1IsT0FB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