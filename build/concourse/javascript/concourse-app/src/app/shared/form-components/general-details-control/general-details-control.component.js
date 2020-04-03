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
const helpers_1 = require("@concourse/shared/helpers");
let GeneralDetailsControlComponent = class GeneralDetailsControlComponent {
    constructor(ctrlContainer, fb) {
        this.ctrlContainer = ctrlContainer;
        this.fb = fb;
    }
    ngOnInit() {
        this.form = this.ctrlContainer.form.controls.generalInfo;
        this.form.addControl('name', this.fb.control('', [
            forms_1.Validators.required
        ]));
        this.form.addControl('description', this.fb.control('', [
            forms_1.Validators.required,
            forms_1.Validators.minLength(3)
        ]));
        this.form.addControl('status', this.fb.control('DRAFT', [
            forms_1.Validators.required
        ]));
        this.form.addControl('versionBump', this.fb.control(undefined));
        if (!helpers_1.Util.isNullOrUndefined(this.owningGroupOptions)) {
            this.form.addControl('owningGroupId', this.fb.control(undefined, [
                forms_1.Validators.required
            ]));
        }
        if (!helpers_1.Util.isNullOrUndefined(this.formData)) {
            this.form.patchValue(this.formData);
        }
    }
};
__decorate([
    core_1.Input()
], GeneralDetailsControlComponent.prototype, "owningGroupOptions", void 0);
__decorate([
    core_1.Input()
], GeneralDetailsControlComponent.prototype, "formData", void 0);
__decorate([
    core_1.Input()
], GeneralDetailsControlComponent.prototype, "draftOnly", void 0);
GeneralDetailsControlComponent = __decorate([
    core_1.Component({
        selector: 'app-general-details-control-form',
        templateUrl: './general-details-control.component.html',
        styleUrls: ['./general-details-control.scss'],
        viewProviders: [{ provide: forms_1.ControlContainer, useExisting: forms_1.FormGroupDirective }]
    })
], GeneralDetailsControlComponent);
exports.GeneralDetailsControlComponent = GeneralDetailsControlComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VuZXJhbC1kZXRhaWxzLWNvbnRyb2wuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vY29uY291cnNlL2phdmFzY3JpcHQvY29uY291cnNlLWFwcC9zcmMvYXBwL3NoYXJlZC9mb3JtLWNvbXBvbmVudHMvZ2VuZXJhbC1kZXRhaWxzLWNvbnRyb2wvZ2VuZXJhbC1kZXRhaWxzLWNvbnRyb2wuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUEsd0NBQXlEO0FBQ3pELDBDQUEwRztBQUMxRyx1REFBaUQ7QUFRakQsSUFBYSw4QkFBOEIsR0FBM0MsTUFBYSw4QkFBOEI7SUFLekMsWUFDbUIsYUFBaUMsRUFDakMsRUFBZTtRQURmLGtCQUFhLEdBQWIsYUFBYSxDQUFvQjtRQUNqQyxPQUFFLEdBQUYsRUFBRSxDQUFhO0lBRWxDLENBQUM7SUFFRCxRQUFRO1FBQ04sSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBd0IsQ0FBQztRQUN0RSxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsRUFBRSxFQUFFO1lBQy9DLGtCQUFVLENBQUMsUUFBUTtTQUNwQixDQUFDLENBQUMsQ0FBQztRQUVKLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsRUFBRSxJQUFJLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxFQUFFLEVBQUU7WUFDdEQsa0JBQVUsQ0FBQyxRQUFRO1lBQ25CLGtCQUFVLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztTQUN4QixDQUNBLENBQUMsQ0FBQztRQUVILElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUU7WUFDdEQsa0JBQVUsQ0FBQyxRQUFRO1NBQ3BCLENBQ0EsQ0FBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxFQUFFLElBQUksQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7UUFFaEUsSUFBSSxDQUFDLGNBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsRUFBRTtZQUNwRCxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxlQUFlLEVBQUUsSUFBSSxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFFO2dCQUMvRCxrQkFBVSxDQUFDLFFBQVE7YUFDcEIsQ0FBQyxDQUFDLENBQUM7U0FDTDtRQUNELElBQUksQ0FBQyxjQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFFO1lBQzFDLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztTQUNyQztJQUVILENBQUM7Q0FDRixDQUFBO0FBdkNVO0lBQVIsWUFBSyxFQUFFOzBFQUF3QjtBQUN2QjtJQUFSLFlBQUssRUFBRTtnRUFBZTtBQUNkO0lBQVIsWUFBSyxFQUFFO2lFQUFvQjtBQUhqQiw4QkFBOEI7SUFQMUMsZ0JBQVMsQ0FBQztRQUNULFFBQVEsRUFBRSxrQ0FBa0M7UUFDNUMsV0FBVyxFQUFFLDBDQUEwQztRQUN2RCxTQUFTLEVBQUUsQ0FBQyxnQ0FBZ0MsQ0FBQztRQUM3QyxhQUFhLEVBQUUsQ0FBQyxFQUFFLE9BQU8sRUFBRSx3QkFBZ0IsRUFBRSxXQUFXLEVBQUUsMEJBQWtCLEVBQUUsQ0FBQztLQUNoRixDQUFDO0dBRVcsOEJBQThCLENBd0MxQztBQXhDWSx3RUFBOEIifQ==