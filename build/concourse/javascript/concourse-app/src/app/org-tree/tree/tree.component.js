"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const faAws_1 = require("@fortawesome/free-brands-svg-icons/faAws");
const faDatabase_1 = require("@fortawesome/free-solid-svg-icons/faDatabase");
const faEdit_1 = require("@fortawesome/free-solid-svg-icons/faEdit");
const faLayerGroup_1 = require("@fortawesome/free-solid-svg-icons/faLayerGroup");
const faPlus_1 = require("@fortawesome/free-solid-svg-icons/faPlus");
const faTrashAlt_1 = require("@fortawesome/free-solid-svg-icons/faTrashAlt");
const modal_1 = require("@concourse/core/modal");
let TreeComponent = class TreeComponent {
    constructor(modalFacade, surfaceFacade, surfaceLayerFacade, awsAccountFacade) {
        this.modalFacade = modalFacade;
        this.surfaceFacade = surfaceFacade;
        this.surfaceLayerFacade = surfaceLayerFacade;
        this.awsAccountFacade = awsAccountFacade;
        this.surfaceLayerCount$ = this.surfaceLayerFacade.count$;
        this.selectedSurfaceLayer$ = this.surfaceLayerFacade.selectedWithRelated$;
        this.isLoaded$ = this.surfaceLayerFacade.isLoaded$;
        this.isUpdating$ = this.surfaceLayerFacade.isUpdating$;
        this.surfaces$ = this.surfaceFacade.list$;
        this.surface$ = this.surfaceFacade.selectedWithRelated$;
        this.icons = { faPlus: faPlus_1.faPlus, faEdit: faEdit_1.faEdit, faTrashAlt: faTrashAlt_1.faTrashAlt, faLayerGroup: faLayerGroup_1.faLayerGroup, faDatabase: faDatabase_1.faDatabase, faAws: faAws_1.faAws };
    }
    createSurface() {
        this.modalFacade.openModal({
            component: modal_1.CreateSurfaceComponent,
            id: 'create-surface',
            options: {
                class: 'modal-lg'
            }
        });
    }
    delete(surface) {
        this.modalFacade.confirmDeleteModal('Surface', surface.name, () => this.surfaceFacade.delete(surface));
    }
    edit() {
        this.modalFacade.openModal({
            component: modal_1.EditSurfaceComponent,
            id: 'edit-surface',
            options: {
                class: 'modal-lg'
            }
        });
    }
    manageData(surface) {
        this.modalFacade.openModal({
            component: modal_1.ManageKeyValueDataComponent,
            id: 'manage-surface-data',
            options: {
                initialState: {
                    dataDomain: 'SURFACE',
                    surfaceId: surface.id
                }
            }
        });
    }
    associateGroups(surface) {
        this.modalFacade.openModal({
            component: modal_1.AssignGroupsComponent,
            id: 'assign-groups',
            options: {
                initialState: {
                    surface
                }
            }
        });
    }
    associateAWSAccounts(surface) {
        this.modalFacade.openModal({
            component: modal_1.AssociateAwsAccountsComponent,
            id: 'associate-aws-accounts',
            options: {
                initialState: {
                    surface
                }
            }
        });
    }
    removeAWSAccounts(surface) {
        this.modalFacade.openModal({
            component: modal_1.DisableAwsAccountsComponent,
            id: 'remove-aws-accounts',
            options: {
                initialState: {
                    data: {
                        surfaceId: surface.id,
                        awsAccounts: surface.awsAccounts
                    }
                }
            }
        });
    }
    trackItems(_index, surface) {
        return surface.id;
    }
};
TreeComponent = __decorate([
    core_1.Component({
        selector: 'app-tree',
        templateUrl: './tree.component.html',
        styleUrls: ['./tree.component.scss']
    })
], TreeComponent);
exports.TreeComponent = TreeComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJlZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9jb25jb3Vyc2UvamF2YXNjcmlwdC9jb25jb3Vyc2UtYXBwL3NyYy9hcHAvb3JnLXRyZWUvdHJlZS90cmVlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBLHdDQUEwQztBQUMxQyxvRUFBaUU7QUFDakUsNkVBQTBFO0FBQzFFLHFFQUFrRTtBQUNsRSxpRkFBOEU7QUFDOUUscUVBQWtFO0FBQ2xFLDZFQUEwRTtBQUUxRSxpREFRK0I7QUFTL0IsSUFBYSxhQUFhLEdBQTFCLE1BQWEsYUFBYTtJQVN4QixZQUNtQixXQUE2QixFQUM3QixhQUE0QixFQUM1QixrQkFBc0MsRUFDdEMsZ0JBQWtDO1FBSGxDLGdCQUFXLEdBQVgsV0FBVyxDQUFrQjtRQUM3QixrQkFBYSxHQUFiLGFBQWEsQ0FBZTtRQUM1Qix1QkFBa0IsR0FBbEIsa0JBQWtCLENBQW9CO1FBQ3RDLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7UUFackQsdUJBQWtCLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixDQUFDLE1BQU0sQ0FBQztRQUNwRCwwQkFBcUIsR0FBRyxJQUFJLENBQUMsa0JBQWtCLENBQUMsb0JBQW9CLENBQUM7UUFDckUsY0FBUyxHQUFHLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxTQUFTLENBQUM7UUFDOUMsZ0JBQVcsR0FBRyxJQUFJLENBQUMsa0JBQWtCLENBQUMsV0FBVyxDQUFDO1FBQ2xELGNBQVMsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQztRQUNyQyxhQUFRLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxvQkFBb0IsQ0FBQztRQUMxQyxVQUFLLEdBQUcsRUFBRSxNQUFNLEVBQU4sZUFBTSxFQUFFLE1BQU0sRUFBTixlQUFNLEVBQUUsVUFBVSxFQUFWLHVCQUFVLEVBQUUsWUFBWSxFQUFaLDJCQUFZ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