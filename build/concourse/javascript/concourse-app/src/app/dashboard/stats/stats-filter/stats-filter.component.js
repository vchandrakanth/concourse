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
let StatsFilterComponent = class StatsFilterComponent {
    constructor(ctrlContainer, fb) {
        this.ctrlContainer = ctrlContainer;
        this.fb = fb;
    }
    ngOnInit() {
        this.form = this.ctrlContainer.form;
        this.form.addControl('statsFilterForm', this.fb.group({
            lookBackInHours: ['720', [
                    forms_1.Validators.required
                ]],
            types: [undefined, [
                    forms_1.Validators.required
                ]],
            breakdown: [undefined],
            filters: [undefined],
            statType: [undefined, [forms_1.Validators.required]]
        }));
    }
};
__decorate([
    core_1.Input()
], StatsFilterComponent.prototype, "types", void 0);
StatsFilterComponent = __decorate([
    core_1.Component({
        selector: 'app-stats-filter',
        templateUrl: './stats-filter.component.html',
        styleUrls: ['./stats-filter.component.scss'],
        viewProviders: [{ provide: forms_1.ControlContainer, useExisting: forms_1.FormGroupDirective }]
    })
], StatsFilterComponent);
exports.StatsFilterComponent = StatsFilterComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhdHMtZmlsdGVyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL2NvbmNvdXJzZS9qYXZhc2NyaXB0L2NvbmNvdXJzZS1hcHAvc3JjL2FwcC9kYXNoYm9hcmQvc3RhdHMvc3RhdHMtZmlsdGVyL3N0YXRzLWZpbHRlci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQSx3Q0FBeUQ7QUFDekQsMENBQTBHO0FBTzFHLElBQWEsb0JBQW9CLEdBQWpDLE1BQWEsb0JBQW9CO0lBSS9CLFlBQ21CLGFBQWlDLEVBQ2pDLEVBQWU7UUFEZixrQkFBYSxHQUFiLGFBQWEsQ0FBb0I7UUFDakMsT0FBRSxHQUFGLEVBQUUsQ0FBYTtJQUNsQyxDQUFDO0lBRUQsUUFBUTtRQUNOLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUM7UUFDcEMsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsaUJBQWlCLEVBQ3BDLElBQUksQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDO1lBQ1osZUFBZSxFQUFFLENBQUMsS0FBSyxFQUFFO29CQUN2QixrQkFBVSxDQUFDLFFBQVE7aUJBQ3BCLENBQUM7WUFDRixLQUFLLEVBQUUsQ0FBQyxTQUFTLEVBQUU7b0JBQ2pCLGtCQUFVLENBQUMsUUFBUTtpQkFDcEIsQ0FBQztZQUNGLFNBQVMsRUFBRSxDQUFDLFNBQVMsQ0FBQztZQUN0QixPQUFPLEVBQUUsQ0FBQyxTQUFTLENBQUM7WUFDcEIsUUFBUSxFQUFFLENBQUMsU0FBUyxFQUFFLENBQUMsa0JBQVUsQ0FBQyxRQUFRLENBQUMsQ0FBQztTQUM3QyxDQUFDLENBQ0gsQ0FBQztJQUNKLENBQUM7Q0FFRixDQUFBO0FBeEJVO0lBQVIsWUFBSyxFQUFFO21EQUEwQztBQUZ2QyxvQkFBb0I7SUFOaEMsZ0JBQVMsQ0FBQztRQUNULFFBQVEsRUFBRSxrQkFBa0I7UUFDNUIsV0FBVyxFQUFFLCtCQUErQjtRQUM1QyxTQUFTLEVBQUUsQ0FBQywrQkFBK0IsQ0FBQztRQUM1QyxhQUFhLEVBQUUsQ0FBQyxFQUFFLE9BQU8sRUFBRSx3QkFBZ0IsRUFBRSxXQUFXLEVBQUUsMEJBQWtCLEVBQUUsQ0FBQztLQUNoRixDQUFDO0dBQ1csb0JBQW9CLENBMEJoQztBQTFCWSxvREFBb0IifQ==