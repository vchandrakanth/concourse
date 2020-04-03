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
const operators_1 = require("rxjs/operators");
const dynamic_form_1 = require("@concourse/shared/dynamic-form");
let EditGroupComponent = class EditGroupComponent {
    constructor(groupFacade) {
        this.groupFacade = groupFacade;
        this.icons = { faTimes: faTimes_1.faTimes };
        this.selectedGroup$ = this.groupFacade.selected$;
        this.updating$ = this.groupFacade.isUpdating$;
        this.config$ = this.selectedGroup$.pipe(operators_1.map(group => [
            {
                type: 'input',
                label: 'Group Name',
                name: 'name',
                placeholder: 'Group Name',
                value: group.name,
                validation: [forms_1.Validators.required, forms_1.Validators.minLength(3)],
                dataE2e: 'inputGroupName'
            },
            {
                type: 'textarea',
                label: 'Description',
                name: 'description',
                value: group.description,
                dataE2e: 'inputGroupDescription'
            },
            {
                type: 'button',
                label: 'Save',
                name: 'submit'
            }
        ]));
    }
    submit(group, formData) {
        this.groupFacade.update(group.copyWith(formData));
    }
};
__decorate([
    core_1.ViewChild(dynamic_form_1.DynamicFormComponent)
], EditGroupComponent.prototype, "form", void 0);
EditGroupComponent = __decorate([
    core_1.Component({
        selector: 'app-edit-group',
        templateUrl: './edit-group.component.html',
        styleUrls: ['./edit-group.component.scss']
    })
], EditGroupComponent);
exports.EditGroupComponent = EditGroupComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWRpdC1ncm91cC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9jb25jb3Vyc2UvamF2YXNjcmlwdC9jb25jb3Vyc2UtYXBwL3NyYy9hcHAvY29yZS9tb2RhbC9jb21wb25lbnRzL2VkaXQtZ3JvdXAvZWRpdC1ncm91cC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQSx3Q0FBcUQ7QUFDckQsMENBQTRDO0FBQzVDLHVFQUFvRTtBQUVwRSw4Q0FBcUM7QUFHckMsaUVBQXNFO0FBUXRFLElBQWEsa0JBQWtCLEdBQS9CLE1BQWEsa0JBQWtCO0lBK0I3QixZQUNtQixXQUF3QjtRQUF4QixnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQTlCbEMsVUFBSyxHQUFHLEVBQUUsT0FBTyxFQUFQLGlCQUFPLEVBQUUsQ0FBQztRQUM3QixtQkFBYyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDO1FBQzVDLGNBQVMsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLFdBQVcsQ0FBQztRQUN6QyxZQUFPLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQ2hDLGVBQUcsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDO1lBQ1g7Z0JBQ0UsSUFBSSxFQUFFLE9BQU87Z0JBQ2IsS0FBSyxFQUFFLFlBQVk7Z0JBQ25CLElBQUksRUFBRSxNQUFNO2dCQUNaLFdBQVcsRUFBRSxZQUFZO2dCQUN6QixLQUFLLEVBQUUsS0FBSyxDQUFDLElBQUk7Z0JBQ2pCLFVBQVUsRUFBRSxDQUFDLGtCQUFVLENBQUMsUUFBUSxFQUFFLGtCQUFVLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUMxRCxPQUFPLEVBQUUsZ0JBQWdCO2FBQzFCO1lBQ0Q7Z0JBQ0UsSUFBSSxFQUFFLFVBQVU7Z0JBQ2hCLEtBQUssRUFBRSxhQUFhO2dCQUNwQixJQUFJLEVBQUUsYUFBYTtnQkFDbkIsS0FBSyxFQUFFLEtBQUssQ0FBQyxXQUFXO2dCQUN4QixPQUFPLEVBQUUsdUJBQXVCO2FBQ2pDO1lBQ0Q7Z0JBQ0UsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsS0FBSyxFQUFFLE1BQU07Z0JBQ2IsSUFBSSxFQUFFLFFBQVE7YUFDZjtTQUNGLENBQUMsQ0FDSCxDQUFDO0lBSUUsQ0FBQztJQUVMLE1BQU0sQ0FBQyxLQUFZLEVBQUUsUUFBYTtRQUNoQyxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7SUFDcEQsQ0FBQztDQUVGLENBQUE7QUF0Q2tDO0lBQWhDLGdCQUFTLENBQUMsbUNBQW9CLENBQUM7Z0RBQTRCO0FBRGpELGtCQUFrQjtJQUw5QixnQkFBUyxDQUFDO1FBQ1QsUUFBUSxFQUFFLGdCQUFnQjtRQUMxQixXQUFXLEVBQUUsNkJBQTZCO1FBQzFDLFNBQVMsRUFBRSxDQUFDLDZCQUE2QixDQUFDO0tBQzNDLENBQUM7R0FDVyxrQkFBa0IsQ0F1QzlCO0FBdkNZLGdEQUFrQiJ9