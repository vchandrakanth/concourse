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
const faTimes_1 = require("@fortawesome/free-solid-svg-icons/faTimes");
const dynamic_form_1 = require("@concourse/shared/dynamic-form");
let CreateGroupComponent = class CreateGroupComponent {
    constructor(groupFacade) {
        this.groupFacade = groupFacade;
        this.icons = { faTimes: faTimes_1.faTimes };
        this.config = [
            {
                type: 'input',
                label: 'Group Name',
                name: 'name',
                placeholder: 'Group Name',
                dataE2e: 'inputGroupName',
                autofocus: true,
                validation: [forms_1.Validators.required]
            },
            {
                type: 'textarea',
                label: 'Group Description',
                dataE2e: 'inputGroupDescription',
                name: 'description',
                placeholder: 'Group Description',
                validation: [forms_1.Validators.required]
            },
            {
                type: 'button',
                label: 'Create',
                name: 'submit',
                dataE2e: 'createGroupSaveBtn',
                class: ''
            }
        ];
    }
    submit(formData) {
        this.groupFacade.create(formData);
    }
};
__decorate([
    core_1.ViewChild(dynamic_form_1.DynamicFormComponent)
], CreateGroupComponent.prototype, "form", void 0);
CreateGroupComponent = __decorate([
    core_1.Component({
        selector: 'app-create-group',
        templateUrl: './create-group.component.html',
        styleUrls: ['./create-group.component.scss']
    })
], CreateGroupComponent);
exports.CreateGroupComponent = CreateGroupComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRlLWdyb3VwLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL2NvbmNvdXJzZS9qYXZhc2NyaXB0L2NvbmNvdXJzZS1hcHAvc3JjL2FwcC9jb3JlL21vZGFsL2NvbXBvbmVudHMvY3JlYXRlLWdyb3VwL2NyZWF0ZS1ncm91cC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQSx3Q0FBcUQ7QUFDckQsMENBQTRDO0FBQzVDLHVFQUFvRTtBQUVwRSxpRUFBbUY7QUFRbkYsSUFBYSxvQkFBb0IsR0FBakMsTUFBYSxvQkFBb0I7SUE4Qi9CLFlBQ21CLFdBQXdCO1FBQXhCLGdCQUFXLEdBQVgsV0FBVyxDQUFhO1FBN0JsQyxVQUFLLEdBQUcsRUFBRSxPQUFPLEVBQVAsaUJBQU8sRUFBRSxDQUFDO1FBQzdCLFdBQU0sR0FBa0I7WUFDdEI7Z0JBQ0UsSUFBSSxFQUFFLE9BQU87Z0JBQ2IsS0FBSyxFQUFFLFlBQVk7Z0JBQ25CLElBQUksRUFBRSxNQUFNO2dCQUNaLFdBQVcsRUFBRSxZQUFZO2dCQUN6QixPQUFPLEVBQUUsZ0JBQWdCO2dCQUN6QixTQUFTLEVBQUUsSUFBSTtnQkFDZixVQUFVLEVBQUUsQ0FBQyxrQkFBVSxDQUFDLFFBQVEsQ0FBQzthQUNsQztZQUNEO2dCQUNFLElBQUksRUFBRSxVQUFVO2dCQUNoQixLQUFLLEVBQUUsbUJBQW1CO2dCQUMxQixPQUFPLEVBQUUsdUJBQXVCO2dCQUNoQyxJQUFJLEVBQUUsYUFBYTtnQkFDbkIsV0FBVyxFQUFFLG1CQUFtQjtnQkFDaEMsVUFBVSxFQUFFLENBQUMsa0JBQVUsQ0FBQyxRQUFRLENBQUM7YUFDbEM7WUFDRDtnQkFDRSxJQUFJLEVBQUUsUUFBUTtnQkFDZCxLQUFLLEVBQUUsUUFBUTtnQkFDZixJQUFJLEVBQUUsUUFBUTtnQkFDZCxPQUFPLEVBQUUsb0JBQW9CO2dCQUM3QixLQUFLLEVBQUUsRUFBRTthQUNWO1NBQ0YsQ0FBQztJQUlFLENBQUM7SUFFTCxNQUFNLENBQUMsUUFBYTtRQUNsQixJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUNwQyxDQUFDO0NBRUYsQ0FBQTtBQXJDa0M7SUFBaEMsZ0JBQVMsQ0FBQyxtQ0FBb0IsQ0FBQztrREFBNEI7QUFEakQsb0JBQW9CO0lBTGhDLGdCQUFTLENBQUM7UUFDVCxRQUFRLEVBQUUsa0JBQWtCO1FBQzVCLFdBQVcsRUFBRSwrQkFBK0I7UUFDNUMsU0FBUyxFQUFFLENBQUMsK0JBQStCLENBQUM7S0FDN0MsQ0FBQztHQUNXLG9CQUFvQixDQXNDaEM7QUF0Q1ksb0RBQW9CIn0=