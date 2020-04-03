"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const faEdit_1 = require("@fortawesome/free-solid-svg-icons/faEdit");
const faFilePdf_1 = require("@fortawesome/free-solid-svg-icons/faFilePdf");
const modal_1 = require("@concourse/core/modal");
let InstitutionOverviewComponent = class InstitutionOverviewComponent {
    constructor(modalFacade, instFacade) {
        this.modalFacade = modalFacade;
        this.instFacade = instFacade;
        this.selected$ = this.instFacade.selected$;
        this.icons = { faEdit: faEdit_1.faEdit, faFilePdf: faFilePdf_1.faFilePdf };
    }
    openEditInstitutionModal() {
        this.modalFacade.openModal({
            component: modal_1.EditInstitutionComponent,
            id: 'enclave-form'
        });
    }
};
InstitutionOverviewComponent = __decorate([
    core_1.Component({
        selector: 'app-institution-overview',
        templateUrl: './institution-overview.component.html',
        styleUrls: ['./institution-overview.component.scss']
    })
], InstitutionOverviewComponent);
exports.InstitutionOverviewComponent = InstitutionOverviewComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5zdGl0dXRpb24tb3ZlcnZpZXcuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vY29uY291cnNlL2phdmFzY3JpcHQvY29uY291cnNlLWFwcC9zcmMvYXBwL2luc3RpdHV0aW9uL2luc3RpdHV0aW9uLW92ZXJ2aWV3L2luc3RpdHV0aW9uLW92ZXJ2aWV3LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBLHdDQUEwQztBQUMxQyxxRUFBa0U7QUFDbEUsMkVBQXdFO0FBRXhFLGlEQUFpRTtBQVFqRSxJQUFhLDRCQUE0QixHQUF6QyxNQUFhLDRCQUE0QjtJQUl2QyxZQUNtQixXQUE2QixFQUM3QixVQUE2QjtRQUQ3QixnQkFBVyxHQUFYLFdBQVcsQ0FBa0I7UUFDN0IsZUFBVSxHQUFWLFVBQVUsQ0FBbUI7UUFMaEQsY0FBUyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDO1FBQzdCLFVBQUssR0FBRyxFQUFFLE1BQU0sRUFBTixlQUFNLEVBQUUsU0FBUyxFQUFULHFCQUFTLEVBQUUsQ0FBQztJQUtuQyxDQUFDO0lBRUwsd0JBQXdCO1FBQ3RCLElBQUksQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDO1lBQ3pCLFNBQVMsRUFBRSxnQ0FBd0I7WUFDbkMsRUFBRSxFQUFFLGNBQWM7U0FDbkIsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztDQUVGLENBQUE7QUFoQlksNEJBQTRCO0lBTHhDLGdCQUFTLENBQUM7UUFDVCxRQUFRLEVBQUUsMEJBQTBCO1FBQ3BDLFdBQVcsRUFBRSx1Q0FBdUM7UUFDcEQsU0FBUyxFQUFFLENBQUMsdUNBQXVDLENBQUM7S0FDckQsQ0FBQztHQUNXLDRCQUE0QixDQWdCeEM7QUFoQlksb0VBQTRCIn0=