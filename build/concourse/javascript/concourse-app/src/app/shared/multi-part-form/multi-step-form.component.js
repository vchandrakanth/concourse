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
let MultiStepFormComponent = class MultiStepFormComponent {
    constructor(renderer) {
        this.renderer = renderer;
        this.validationCheck = true;
        this.multiSubmit = new core_1.EventEmitter();
        this.stepEvent = new core_1.EventEmitter();
        this.steps = [];
    }
    get enabledSteps() {
        return this.steps.filter(s => !s.disabled);
    }
    nextStep() {
        if (!this.isLastStep) { // not last step
            const group = this.formGroup.get(this.currentStep.formGroupName);
            this.markAsDirty(group);
            if (group.valid) {
                const nextStep = Object.assign({}, this.enabledSteps[this.currentStepIndex + 1]);
                this.enabledSteps[this.currentStepIndex + 1].active = true;
                this.stepEvent.emit({
                    index: this.currentStepIndex,
                    headline: nextStep.headline,
                    formGroupName: nextStep.formGroupName
                });
            }
        }
        else { // last step submit!
            if (!this.validationCheck || this.formGroup.valid) {
                this.multiSubmit.emit(this.formGroup.value);
            }
        }
    }
    markAsDirty(group) {
        group.markAsDirty();
        group.updateValueAndValidity();
        Object.values(group.controls).forEach(control => {
            if (control instanceof forms_1.FormGroup) {
                this.markAsDirty(control);
            }
            if (control instanceof forms_1.FormArray) {
                this.markAsDirty(control);
            }
            control.markAsDirty();
            control.updateValueAndValidity();
        });
    }
    prevStep() {
        if (!this.isFirstStep) {
            this.enabledSteps[this.currentStepIndex - 1].active = true;
        }
        const prevStep = Object.assign({}, this.enabledSteps[this.currentStepIndex - 1]);
        this.stepEvent.emit({
            index: this.currentStepIndex,
            headline: prevStep.headline,
            formGroupName: prevStep.formGroupName
        });
    }
    get currentStep() {
        return this.enabledSteps.find(s => s.active);
    }
    get currentStepIndex() {
        return this.enabledSteps.findIndex(s => s.active);
    }
    get isFirstStep() {
        return this.currentStepIndex === 0;
    }
    get isLastStep() {
        return (this.currentStepIndex + 1) === this.enabledSteps.length;
    }
    addStep(step) {
        this.steps.push(step);
        step.active = this.steps.length === 1 && typeof step.active === 'undefined';
    }
    removeStep(step) {
        const index = this.steps.indexOf(step);
        if (index === -1) {
            return;
        }
        this.steps.splice(index, 1);
        if (step.elementRef.nativeElement.parentNode) {
            this.renderer.removeChild(step.elementRef.nativeElement.parentNode, step.elementRef.nativeElement);
        }
    }
};
__decorate([
    core_1.Input()
], MultiStepFormComponent.prototype, "formGroup", void 0);
__decorate([
    core_1.Input()
], MultiStepFormComponent.prototype, "validationCheck", void 0);
__decorate([
    core_1.Output()
], MultiStepFormComponent.prototype, "multiSubmit", void 0);
__decorate([
    core_1.Output()
], MultiStepFormComponent.prototype, "stepEvent", void 0);
MultiStepFormComponent = __decorate([
    core_1.Component({
        // tslint:disable-next-line:component-selector
        selector: '[multi-step]',
        templateUrl: './multi-step-form.component.html',
        styleUrls: ['./multi-step-form.component.scss']
    })
], MultiStepFormComponent);
exports.MultiStepFormComponent = MultiStepFormComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXVsdGktc3RlcC1mb3JtLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL2NvbmNvdXJzZS9qYXZhc2NyaXB0L2NvbmNvdXJzZS1hcHAvc3JjL2FwcC9zaGFyZWQvbXVsdGktcGFydC1mb3JtL211bHRpLXN0ZXAtZm9ybS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQSx3Q0FNdUI7QUFDdkIsMENBQXNEO0FBaUJ0RCxJQUFhLHNCQUFzQixHQUFuQyxNQUFhLHNCQUFzQjtJQVdqQyxZQUNtQixRQUFtQjtRQUFuQixhQUFRLEdBQVIsUUFBUSxDQUFXO1FBVjdCLG9CQUFlLEdBQUcsSUFBSSxDQUFDO1FBQ2IsZ0JBQVcsR0FBRyxJQUFJLG1CQUFZLEVBQU8sQ0FBQztRQUN0QyxjQUFTLEdBQUcsSUFBSSxtQkFBWSxFQUFhLENBQUM7UUFDN0QsVUFBSyxHQUFvQixFQUFFLENBQUM7SUFReEIsQ0FBQztJQU5MLElBQUksWUFBWTtRQUNkLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUM3QyxDQUFDO0lBTUQsUUFBUTtRQUNOLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLEVBQUUsZ0JBQWdCO1lBQ3RDLE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsYUFBYSxDQUFjLENBQUM7WUFDOUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUN4QixJQUFJLEtBQUssQ0FBQyxLQUFLLEVBQUU7Z0JBQ2YsTUFBTSxRQUFRLHFCQUFRLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLGdCQUFnQixHQUFHLENBQUMsQ0FBQyxDQUFFLENBQUM7Z0JBQ3JFLElB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