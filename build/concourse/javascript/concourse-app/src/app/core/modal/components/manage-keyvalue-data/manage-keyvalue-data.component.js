"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const faDatabase_1 = require("@fortawesome/free-solid-svg-icons/faDatabase");
const faEdit_1 = require("@fortawesome/free-solid-svg-icons/faEdit");
const faTimes_1 = require("@fortawesome/free-solid-svg-icons/faTimes");
const faTrashAlt_1 = require("@fortawesome/free-solid-svg-icons/faTrashAlt");
const helpers_1 = require("@concourse/shared/helpers");
const create_institution_data_component_1 = require("../create-institution-data/create-institution-data.component");
let ManageKeyValueDataComponent = class ManageKeyValueDataComponent {
    constructor(modalFacade, instDataFacade) {
        this.modalFacade = modalFacade;
        this.instDataFacade = instDataFacade;
        this.dataList$ = this.instDataFacade.list$;
        this.isLoaded$ = this.instDataFacade.isLoaded$;
        this.icons = { faTimes: faTimes_1.faTimes, faDatabase: faDatabase_1.faDatabase, faEdit: faEdit_1.faEdit, faTrashAlt: faTrashAlt_1.faTrashAlt };
    }
    get dataDomainText() {
        if (!helpers_1.Util.isUndefined(this.dataDomain)) {
            return `${this.dataDomain.replace(/_/g, ' ')} Data`;
        }
        return '';
    }
    createData() {
        this.modalFacade.openModal({
            component: create_institution_data_component_1.CreateInstitutionDataComponent,
            id: 'create-keyvalue-data',
            options: {
                initialState: {
                    dataDomain: this.dataDomain,
                    surfaceId: this.surfaceId,
                    surfaceLayerId: this.surfaceLayerId
                }
            }
        });
    }
    editData(item) {
        this.activeEditId = item.id;
    }
    deleteData(item) {
        this.modalFacade.confirmDeleteModal(this.dataDomainText, item.name, () => this.instDataFacade.delete({
            dataDomain: this.dataDomain,
            surfaceId: this.surfaceId,
            surfaceLayerId: this.surfaceLayerId
        }, item.uri));
    }
};
ManageKeyValueDataComponent = __decorate([
    core_1.Component({
        selector: 'app-manage-keyvalue-data',
        templateUrl: './manage-keyvalue-data.component.html',
        styleUrls: ['./manage-keyvalue-data.component.scss']
    })
], ManageKeyValueDataComponent);
exports.ManageKeyValueDataComponent = ManageKeyValueDataComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFuYWdlLWtleXZhbHVlLWRhdGEuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vY29uY291cnNlL2phdmFzY3JpcHQvY29uY291cnNlLWFwcC9zcmMvYXBwL2NvcmUvbW9kYWwvY29tcG9uZW50cy9tYW5hZ2Uta2V5dmFsdWUtZGF0YS9tYW5hZ2Uta2V5dmFsdWUtZGF0YS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQSx3Q0FBMEM7QUFDMUMsNkVBQTBFO0FBQzFFLHFFQUFrRTtBQUNsRSx1RUFBb0U7QUFDcEUsNkVBQTBFO0FBRzFFLHVEQUFpRDtBQUVqRCxvSEFBOEc7QUFPOUcsSUFBYSwyQkFBMkIsR0FBeEMsTUFBYSwyQkFBMkI7SUFnQnRDLFlBQ21CLFdBQTZCLEVBQzdCLGNBQXFDO1FBRHJDLGdCQUFXLEdBQVgsV0FBVyxDQUFrQjtRQUM3QixtQkFBYyxHQUFkLGNBQWMsQ0FBdUI7UUFqQnhELGNBQVMsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQztRQUN0QyxjQUFTLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxTQUFTLENBQUM7UUFZakMsVUFBSyxHQUFHLEVBQUUsT0FBTyxFQUFQLGlCQUFPLEVBQUUsVUFBVSxFQUFWLHVCQUFVLEVBQUUsTUFBTSxFQUFOLGVBQU0sRUFBRSxVQUFVLEVBQVYsdUJBQVUsRUFBRSxDQUFDO0lBS3pELENBQUM7SUFiTCxJQUFJLGNBQWM7UUFDaEIsSUFBSSxDQUFDLGNBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxFQUFFO1lBQ3RDLE9BQU8sR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDLE9BQU8sQ0FBQztTQUNyRDtRQUNELE9BQU8sRUFBRSxDQUFDO0lBQ1osQ0FBQztJQVVELFVBQVU7UUFDUixJQUFJLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQztZQUN6QixTQUFTLEVBQUUsa0VBQThCO1lBQ3pDLEVBQUUsRUFBRSxzQkFBc0I7WUFDMUIsT0FBTyxFQUFFO2dCQUNQLFlBQVksRUFBRTtvQkFDWixVQUFVLEVBQUUsSUFBSSxDQUFDLFVBQVU7b0JBQzNCLFNBQVMsRUFBRSxJQUFJLENBQUMsU0FBUztvQkFDekIsY0FBYyxFQUFFLElBQUksQ0FBQyxjQUFjO2lCQUNwQzthQUNGO1NBQ0YsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELFFBQVEsQ0FBQyxJQUFxQjtRQUM1QixJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUM7SUFDOUIsQ0FBQztJQUVELFVBQVUsQ0FBQyxJQUFxQjtRQUM5QixJQUFJLENBQUMsV0FBVyxDQUFDLGtCQUFrQixDQUNqQyxJQUFJLENBQUMsY0FBYyxFQUNuQixJQUFJLENBQUMsSUFBSSxFQUNULEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDO1lBQy9CLFVBQVUsRUFBRSxJQUFJLENBQUMsVUFBaUI7WUFDbEMsU0FBUyxFQUFFLElBQUksQ0FBQyxTQUFTO1lBQ3pCLGNBQWMsRUFBRSxJQUFJLENBQUMsY0FBYztTQUNwQyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FDYixDQUFDO0lBQ0osQ0FBQztDQUNGLENBQUE7QUFsRFksMkJBQTJCO0lBTHZDLGdCQUFTLENBQUM7UUFDVCxRQUFRLEVBQUUsMEJBQTBCO1FBQ3BDLFdBQVcsRUFBRSx1Q0FBdUM7UUFDcEQsU0FBUyxFQUFFLENBQUMsdUNBQXVDLENBQUM7S0FDckQsQ0FBQztHQUNXLDJCQUEyQixDQWtEdkM7QUFsRFksa0VBQTJCIn0=