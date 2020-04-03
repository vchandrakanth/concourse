"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
let StepDirective = class StepDirective {
    constructor(elementRef, multiStepForm) {
        this.elementRef = elementRef;
        this.multiStepForm = multiStepForm;
        this.disabled = false;
        this.addClass = true;
        this.multiStepForm.addStep(this);
    }
    get active() {
        return this._active;
    }
    set active(active) {
        if (this._active === active) {
            return;
        }
        if (!active) {
            if (this._active && !active) {
                this._active = active;
            }
            return;
        }
        this._active = active;
        this.multiStepForm.steps.forEach((step) => {
            if (step !== this) {
                step.active = false;
            }
        });
    }
    ngOnDestroy() {
        this.multiStepForm.removeStep(this);
    }
};
__decorate([
    core_1.Input()
], StepDirective.prototype, "headline", void 0);
__decorate([
    core_1.Input()
], StepDirective.prototype, "formGroupName", void 0);
__decorate([
    core_1.Input()
], StepDirective.prototype, "disabled", void 0);
__decorate([
    core_1.HostBinding('attr.id'), core_1.Input()
], StepDirective.prototype, "id", void 0);
__decorate([
    core_1.HostBinding('class.active'), core_1.Input()
], StepDirective.prototype, "active", null);
__decorate([
    core_1.HostBinding('class.tab-pane')
], StepDirective.prototype, "addClass", void 0);
StepDirective = __decorate([
    core_1.Directive({
        // tslint:disable-next-line:directive-selector
        selector: 'step, [step]'
    })
], StepDirective);
exports.StepDirective = StepDirective;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RlcC5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9jb25jb3Vyc2UvamF2YXNjcmlwdC9jb25jb3Vyc2UtYXBwL3NyYy9hcHAvc2hhcmVkL211bHRpLXBhcnQtZm9ybS9zdGVwLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBLHdDQU11QjtBQVF2QixJQUFhLGFBQWEsR0FBMUIsTUFBYSxhQUFhO0lBK0J4QixZQUNTLFVBQXNCLEVBQ3BCLGFBQXFDO1FBRHZDLGVBQVUsR0FBVixVQUFVLENBQVk7UUFDcEIsa0JBQWEsR0FBYixhQUFhLENBQXdCO1FBOUJ2QyxhQUFRLEdBQUcsS0FBSyxDQUFDO1FBeUJLLGFBQVEsR0FBRyxJQUFJLENBQUM7UUFPN0MsSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDbkMsQ0FBQztJQS9CcUMsSUFBSSxNQUFNO1FBQzlDLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQztJQUN0QixDQUFDO0lBQ0QsSUFBSSxNQUFNLENBQUMsTUFBZTtRQUN4QixJQUFJLElBQUksQ0FBQyxPQUFPLEtBQUssTUFBTSxFQUFFO1lBQzNCLE9BQU87U0FDUjtRQUVELElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDWCxJQUFJLElBQUksQ0FBQyxPQUFPLElBQUksQ0FBQyxNQUFNLEVBQUU7Z0JBQzNCLElBQUksQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDO2FBQ3ZCO1lBRUQsT0FBTztTQUNSO1FBRUQsSUFBSSxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUM7UUFDdEIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBbUIsRUFBRSxFQUFFO1lBQ3ZELElBQUksSUFBSSxLQUFLLElBQUksRUFBRTtnQkFDakIsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7YUFDckI7UUFDSCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFXRCxXQUFXO1FBQ1QsSUFBSSxDQUFDLGFBQWEsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDdEMsQ0FBQztDQUVGLENBQUE7QUF6Q1U7SUFBUixZQUFLLEVBQUU7K0NBQWtCO0FBQ2pCO0lBQVIsWUFBSyxFQUFFO29EQUF1QjtBQUN0QjtJQUFSLFlBQUssRUFBRTsrQ0FBa0I7QUFDTztJQUFoQyxrQkFBVyxDQUFDLFNBQVMsQ0FBQyxFQUFFLFlBQUssRUFBRTt5Q0FBWTtBQUNOO0lBQXJDLGtCQUFXLENBQUMsY0FBYyxDQUFDLEVBQUUsWUFBSyxFQUFFOzJDQUVwQztBQXFCOEI7SUFBOUIsa0JBQVcsQ0FBQyxnQkFBZ0IsQ0FBQzsrQ0FBaUI7QUE1QnBDLGFBQWE7SUFKekIsZ0JBQVMsQ0FBQztRQUNULDhDQUE4QztRQUM5QyxRQUFRLEVBQUUsY0FBYztLQUN6QixDQUFDO0dBQ1csYUFBYSxDQTBDekI7QUExQ1ksc0NBQWEifQ==