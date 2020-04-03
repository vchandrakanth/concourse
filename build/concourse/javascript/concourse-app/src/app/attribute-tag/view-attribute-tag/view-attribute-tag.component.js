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
const faTrashAlt_1 = require("@fortawesome/free-solid-svg-icons/faTrashAlt");
const modal_1 = require("@concourse/core/modal");
let ViewAttributeTagComponent = class ViewAttributeTagComponent {
    constructor(modalStoreFacade, attributeTagFacade, auditHistoryFacade) {
        this.modalStoreFacade = modalStoreFacade;
        this.attributeTagFacade = attributeTagFacade;
        this.auditHistoryFacade = auditHistoryFacade;
        this.attributeTag$ = this.attributeTagFacade.selectedWithRelated$;
        this.auditHistory$ = this.auditHistoryFacade.auditHistory$;
        this.isLoaded$ = this.attributeTagFacade.isLoaded$;
        this.isUpdating$ = this.attributeTagFacade.isUpdating$;
        this.icons = { faEdit: faEdit_1.faEdit, faTrashAlt: faTrashAlt_1.faTrashAlt };
    }
    delete(attributeTag) {
        this.modalStoreFacade.confirmDeleteModal('Attribute Tag', attributeTag.name, () => this.attributeTagFacade.delete(attributeTag));
    }
    edit() {
        this.attributeTagFacade.resetSearch();
        this.modalStoreFacade.openModal({
            component: modal_1.EditAttributeTagComponent,
            id: 'edit-attribute-tag'
        });
    }
};
ViewAttributeTagComponent = __decorate([
    core_1.Component({
        selector: 'app-view-attribute-tag',
        templateUrl: './view-attribute-tag.component.html',
        styleUrls: ['./view-attribute-tag.component.scss']
    })
], ViewAttributeTagComponent);
exports.ViewAttributeTagComponent = ViewAttributeTagComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlldy1hdHRyaWJ1dGUtdGFnLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL2NvbmNvdXJzZS9qYXZhc2NyaXB0L2NvbmNvdXJzZS1hcHAvc3JjL2FwcC9hdHRyaWJ1dGUtdGFnL3ZpZXctYXR0cmlidXRlLXRhZy92aWV3LWF0dHJpYnV0ZS10YWcuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUEsd0NBQTBDO0FBQzFDLHFFQUFrRTtBQUNsRSw2RUFBMEU7QUFFMUUsaURBQWtFO0FBVWxFLElBQWEseUJBQXlCLEdBQXRDLE1BQWEseUJBQXlCO0lBUXBDLFlBQ21CLGdCQUFrQyxFQUNsQyxrQkFBc0MsRUFDdEMsa0JBQXNDO1FBRnRDLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7UUFDbEMsdUJBQWtCLEdBQWxCLGtCQUFrQixDQUFvQjtRQUN0Qyx1QkFBa0IsR0FBbEIsa0JBQWtCLENBQW9CO1FBVnpELGtCQUFhLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixDQUFDLG9CQUFvQixDQUFDO1FBQzdELGtCQUFhLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixDQUFDLGFBQWEsQ0FBQztRQUN0RCxjQUFTLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixDQUFDLFNBQVMsQ0FBQztRQUM5QyxnQkFBVyxHQUFHLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxXQUFXLENBQUM7UUFFekMsVUFBSyxHQUFHLEVBQUUsTUFBTSxFQUFOLGVBQU0sRUFBRSxVQUFVLEVBQVYsdUJBQVUsRUFBRSxDQUFDO0lBTXBDLENBQUM7SUFFTCxNQUFNLENBQUMsWUFBMEI7UUFDL0IsSUFBSSxDQUFDLGdCQUFnQixDQUFDLGtCQUFrQixDQUN0QyxlQUFlLEVBQ2YsWUFBWSxDQUFDLElBQUksRUFDakIsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsQ0FDbkQsQ0FBQztJQUNKLENBQUM7SUFFRCxJQUFJO1FBQ0YsSUFBSSxDQUFDLGtCQUFrQixDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ3RDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxTQUFTLENBQUM7WUFDOUIsU0FBUyxFQUFFLGlDQUF5QjtZQUNwQyxFQUFFLEVBQUUsb0JBQW9CO1NBQ3pCLENBQUMsQ0FBQztJQUNMLENBQUM7Q0FFRixDQUFBO0FBOUJZLHlCQUF5QjtJQU5yQyxnQkFBUyxDQUFDO1FBQ1QsUUFBUSxFQUFFLHdCQUF3QjtRQUNsQyxXQUFXLEVBQUUscUNBQXFDO1FBQ2xELFNBQVMsRUFBRSxDQUFDLHFDQUFxQyxDQUFDO0tBQ25ELENBQUM7R0FFVyx5QkFBeUIsQ0E4QnJDO0FBOUJZLDhEQUF5QiJ9