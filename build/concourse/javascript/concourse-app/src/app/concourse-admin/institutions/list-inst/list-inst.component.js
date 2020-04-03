"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const faPlusCircle_1 = require("@fortawesome/free-solid-svg-icons/faPlusCircle");
const modal_1 = require("@concourse/core/modal");
let ListInstComponent = class ListInstComponent {
    constructor(modalFacade, instFacade) {
        this.modalFacade = modalFacade;
        this.instFacade = instFacade;
        this.institutions$ = this.instFacade.list$;
        this.selectedInstitution$ = this.instFacade.selected$;
        this.isUpdating$ = this.instFacade.isUpdating$;
        this.icons = { faPlusCircle: faPlusCircle_1.faPlusCircle };
    }
    ngOnInit() {
        // tslint:disable-next-line:comment-type
        /* This will be anable once we are going to show list of institutions. */
        // this.instFacade.loadAll();
    }
    trackItems(_index, inst) {
        return inst.id;
    }
    openInviteModal() {
        this.modalFacade.openModal({
            component: modal_1.InviteInstComponent,
            id: 'invite-institution',
            options: {
                class: 'modal-md'
            }
        });
    }
};
ListInstComponent = __decorate([
    core_1.Component({
        selector: 'app-list-inst',
        templateUrl: './list-inst.component.html',
        styleUrls: ['./list-inst.component.scss']
    })
], ListInstComponent);
exports.ListInstComponent = ListInstComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdC1pbnN0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL2NvbmNvdXJzZS9qYXZhc2NyaXB0L2NvbmNvdXJzZS1hcHAvc3JjL2FwcC9jb25jb3Vyc2UtYWRtaW4vaW5zdGl0dXRpb25zL2xpc3QtaW5zdC9saXN0LWluc3QuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUEsd0NBQWtEO0FBQ2xELGlGQUE4RTtBQUU5RSxpREFBNEQ7QUFTNUQsSUFBYSxpQkFBaUIsR0FBOUIsTUFBYSxpQkFBaUI7SUFNNUIsWUFDVyxXQUE2QixFQUM3QixVQUE2QjtRQUQ3QixnQkFBVyxHQUFYLFdBQVcsQ0FBa0I7UUFDN0IsZUFBVSxHQUFWLFVBQVUsQ0FBbUI7UUFQeEMsa0JBQWEsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQztRQUN0Qyx5QkFBb0IsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQztRQUNqRCxnQkFBVyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDO1FBQ2pDLFVBQUssR0FBRyxFQUFFLFlBQVksRUFBWiwyQkFBWSxFQUFFLENBQUM7SUFLOUIsQ0FBQztJQUVMLFFBQVE7UUFDTix3Q0FBd0M7UUFDeEMseUVBQXlFO1FBQ3pFLDZCQUE2QjtJQUMvQixDQUFDO0lBRUQsVUFBVSxDQUFDLE1BQWMsRUFBRSxJQUFpQjtRQUMxQyxPQUFPLElBQUksQ0FBQyxFQUFFLENBQUM7SUFDakIsQ0FBQztJQUVELGVBQWU7UUFDYixJQUFJLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQztZQUN6QixTQUFTLEVBQUUsMkJBQW1CO1lBQzlCLEVBQUUsRUFBRSxvQkFBb0I7WUFDeEIsT0FBTyxFQUFFO2dCQUNQLEtBQUssRUFBRSxVQUFVO2FBQ2xCO1NBQ0YsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztDQUVGLENBQUE7QUEvQlksaUJBQWlCO0lBTDdCLGdCQUFTLENBQUM7UUFDVCxRQUFRLEVBQUUsZUFBZTtRQUN6QixXQUFXLEVBQUUsNEJBQTRCO1FBQ3pDLFNBQVMsRUFBRSxDQUFDLDRCQUE0QixDQUFDO0tBQzFDLENBQUM7R0FDVyxpQkFBaUIsQ0ErQjdCO0FBL0JZLDhDQUFpQiJ9