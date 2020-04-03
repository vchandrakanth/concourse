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
let AssignGroupsComponent = class AssignGroupsComponent {
    constructor(surfaceFacade, groupFacade) {
        this.surfaceFacade = surfaceFacade;
        this.groupFacade = groupFacade;
        this.icons = { faTimes: faTimes_1.faTimes };
    }
    ngOnInit() {
        this.config = [
            {
                type: 'typeahead',
                exType: 'multiselect',
                label: 'Assign Group(s)',
                name: 'groupIds',
                dataE2e: 'assignGroupsSelect',
                placeholder: 'Assign Group(s)',
                textField: 'name',
                options: this.groupFacade.list$,
                value: this.surface.groupIds,
                validation: [forms_1.Validators.required]
            },
            {
                type: 'button',
                label: 'Save',
                name: 'submit'
            }
        ];
    }
    submit(surface) {
        this.surfaceFacade.update(surface.copyWith({ groupIds: this.form.value.groupIds }));
    }
};
__decorate([
    core_1.ViewChild(dynamic_form_1.DynamicFormComponent)
], AssignGroupsComponent.prototype, "form", void 0);
AssignGroupsComponent = __decorate([
    core_1.Component({
        selector: 'app-assign-groups',
        templateUrl: './assign-groups.component.html',
        styleUrls: ['./assign-groups.component.scss']
    })
], AssignGroupsComponent);
exports.AssignGroupsComponent = AssignGroupsComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXNzaWduLWdyb3Vwcy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9jb25jb3Vyc2UvamF2YXNjcmlwdC9jb25jb3Vyc2UtYXBwL3NyYy9hcHAvY29yZS9tb2RhbC9jb21wb25lbnRzL2Fzc2lnbi1ncm91cHMvYXNzaWduLWdyb3Vwcy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQSx3Q0FBNkQ7QUFDN0QsMENBQTRDO0FBQzVDLHVFQUFvRTtBQUdwRSxpRUFBbUY7QUFRbkYsSUFBYSxxQkFBcUIsR0FBbEMsTUFBYSxxQkFBcUI7SUFNaEMsWUFDbUIsYUFBNEIsRUFDNUIsV0FBd0I7UUFEeEIsa0JBQWEsR0FBYixhQUFhLENBQWU7UUFDNUIsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFKbEMsVUFBSyxHQUFHLEVBQUUsT0FBTyxFQUFQLGlCQUFPLEVBQUUsQ0FBQztJQUt6QixDQUFDO0lBRUwsUUFBUTtRQUNOLElBQUksQ0FBQyxNQUFNLEdBQUc7WUFDWjtnQkFDRSxJQUFJLEVBQUUsV0FBVztnQkFDakIsTUFBTSxFQUFFLGFBQWE7Z0JBQ3JCLEtBQUssRUFBRSxpQkFBaUI7Z0JBQ3hCLElBQUksRUFBRSxVQUFVO2dCQUNoQixPQUFPLEVBQUUsb0JBQW9CO2dCQUM3QixXQUFXLEVBQUUsaUJBQWlCO2dCQUM5QixTQUFTLEVBQUUsTUFBTTtnQkFDakIsT0FBTyxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSztnQkFDL0IsS0FBSyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUTtnQkFDNUIsVUFBVSxFQUFFLENBQUMsa0JBQVUsQ0FBQyxRQUFRLENBQUM7YUFDbEM7WUFDRDtnQkFDRSxJQUFJLEVBQUUsUUFBUTtnQkFDZCxLQUFLLEVBQUUsTUFBTTtnQkFDYixJQUFJLEVBQUUsUUFBUTthQUNmO1NBQ0YsQ0FBQztJQUNKLENBQUM7SUFFRCxNQUFNLENBQUMsT0FBZ0I7UUFDckIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxFQUFFLFFBQVEsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDdEYsQ0FBQztDQUNGLENBQUE7QUFuQ2tDO0lBQWhDLGdCQUFTLENBQUMsbUNBQW9CLENBQUM7bURBQTRCO0FBRGpELHFCQUFxQjtJQUxqQyxnQkFBUyxDQUFDO1FBQ1QsUUFBUSxFQUFFLG1CQUFtQjtRQUM3QixXQUFXLEVBQUUsZ0NBQWdDO1FBQzdDLFNBQVMsRUFBRSxDQUFDLGdDQUFnQyxDQUFDO0tBQzlDLENBQUM7R0FDVyxxQkFBcUIsQ0FvQ2pDO0FBcENZLHNEQUFxQiJ9