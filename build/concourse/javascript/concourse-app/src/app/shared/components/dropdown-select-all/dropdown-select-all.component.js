"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const forms_1 = require("@angular/forms");
let DropdownSelectAllComponent = class DropdownSelectAllComponent {
    constructor(ctrlContainer, ngSelect) {
        this.ctrlContainer = ctrlContainer;
        this.ngSelect = ngSelect;
    }
    ngOnInit() {
        this.formControl = this.control instanceof forms_1.FormControl ? this.control : this.ctrlContainer.form.controls[this.control];
    }
    onSelectAll() {
        const selected = this.optionList.map(item => {
            if (!this.ngSelect.bindValue) {
                return item;
            }
            return item[this.ngSelect.bindValue];
        });
        this.formControl.patchValue(selected);
        if (this.ngSelect.closeOnSelect) {
            this.ngSelect.close();
        }
    }
    onClearAll() {
        this.formControl.patchValue([]);
        if (this.ngSelect.closeOnSelect) {
            this.ngSelect.close();
        }
    }
};
__decorate([
    core_1.Input()
], DropdownSelectAllComponent.prototype, "optionList", void 0);
__decorate([
    core_1.Input()
], DropdownSelectAllComponent.prototype, "control", void 0);
DropdownSelectAllComponent = __decorate([
    core_1.Component({
        selector: 'app-dropdown-select-all',
        templateUrl: './dropdown-select-all.component.html',
        styleUrls: ['./dropdown-select-all.component.scss'],
        viewProviders: [
            { provide: forms_1.ControlContainer, useExisting: forms_1.FormGroupDirective }
        ]
    }),
    __param(1, core_1.Host()), __param(1, core_1.Optional())
], DropdownSelectAllComponent);
exports.DropdownSelectAllComponent = DropdownSelectAllComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJvcGRvd24tc2VsZWN0LWFsbC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9jb25jb3Vyc2UvamF2YXNjcmlwdC9jb25jb3Vyc2UtYXBwL3NyYy9hcHAvc2hhcmVkL2NvbXBvbmVudHMvZHJvcGRvd24tc2VsZWN0LWFsbC9kcm9wZG93bi1zZWxlY3QtYWxsLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLHdDQUF5RTtBQUN6RSwwQ0FBb0c7QUFXcEcsSUFBYSwwQkFBMEIsR0FBdkMsTUFBYSwwQkFBMEI7SUFLckMsWUFDbUIsYUFBaUMsRUFDYixRQUEyQjtRQUQvQyxrQkFBYSxHQUFiLGFBQWEsQ0FBb0I7UUFDYixhQUFRLEdBQVIsUUFBUSxDQUFtQjtJQUM5RCxDQUFDO0lBRUwsUUFBUTtRQUNOLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLE9BQU8sWUFBWSxtQkFBVyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ3pILENBQUM7SUFFRCxXQUFXO1FBQ1QsTUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFDMUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxFQUFFO2dCQUM1QixPQUFPLElBQUksQ0FBQzthQUNiO1lBQ0QsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUN2QyxDQUFDLENBQUMsQ0FBQztRQUNILElBQUksQ0FBQyxXQUFXLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3RDLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLEVBQUU7WUFDL0IsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLEVBQUUsQ0FBQztTQUN2QjtJQUNILENBQUM7SUFFRCxVQUFVO1FBQ1IsSUFBSSxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDaEMsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLGFBQWEsRUFBRTtZQUMvQixJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssRUFBRSxDQUFDO1NBQ3ZCO0lBQ0gsQ0FBQztDQUNGLENBQUE7QUFoQ1U7SUFBUixZQUFLLEVBQUU7OERBQW1CO0FBQ2xCO0lBQVIsWUFBSyxFQUFFOzJEQUErQjtBQUY1QiwwQkFBMEI7SUFSdEMsZ0JBQVMsQ0FBQztRQUNULFFBQVEsRUFBRSx5QkFBeUI7UUFDbkMsV0FBVyxFQUFFLHNDQUFzQztRQUNuRCxTQUFTLEVBQUUsQ0FBQyxzQ0FBc0MsQ0FBQztRQUNuRCxhQUFhLEVBQUU7WUFDYixFQUFFLE9BQU8sRUFBRSx3QkFBZ0IsRUFBRSxXQUFXLEVBQUUsMEJBQWtCLEVBQUU7U0FDL0Q7S0FDRixDQUFDO0lBUUcsV0FBQSxXQUFJLEVBQUUsQ0FBQSxFQUFFLFdBQUEsZUFBUSxFQUFFLENBQUE7R0FQViwwQkFBMEIsQ0FpQ3RDO0FBakNZLGdFQUEwQiJ9