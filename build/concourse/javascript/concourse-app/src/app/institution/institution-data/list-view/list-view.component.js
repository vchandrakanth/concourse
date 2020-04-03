"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const faPlus_1 = require("@fortawesome/free-solid-svg-icons/faPlus");
const modal_1 = require("@concourse/core/modal");
let InstitutionDataListComponent = class InstitutionDataListComponent {
    constructor(modalFacade, instDataFacade) {
        this.modalFacade = modalFacade;
        this.instDataFacade = instDataFacade;
        this.instDataList$ = this.instDataFacade.list$;
        this.isLoaded$ = this.instDataFacade.isLoaded$;
        this.instData$ = this.instDataFacade.selected$;
        this.icons = { faPlus: faPlus_1.faPlus };
    }
    trackItems(_index, instData) {
        return instData.id;
    }
    create() {
        this.modalFacade.openModal({
            component: modal_1.CreateInstitutionDataComponent,
            id: 'create-institution-data',
            options: {
                initialState: {
                    dataDomain: 'INSTITUTION'
                }
            }
        });
    }
};
InstitutionDataListComponent = __decorate([
    core_1.Component({
        selector: 'app-inst-list',
        templateUrl: './list-view.component.html',
        styleUrls: ['./list-view.component.scss']
    })
], InstitutionDataListComponent);
exports.InstitutionDataListComponent = InstitutionDataListComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdC12aWV3LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL2NvbmNvdXJzZS9qYXZhc2NyaXB0L2NvbmNvdXJzZS1hcHAvc3JjL2FwcC9pbnN0aXR1dGlvbi9pbnN0aXR1dGlvbi1kYXRhL2xpc3Qtdmlldy9saXN0LXZpZXcuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUEsd0NBQTBDO0FBQzFDLHFFQUFrRTtBQUVsRSxpREFBdUU7QUFTdkUsSUFBYSw0QkFBNEIsR0FBekMsTUFBYSw0QkFBNEI7SUFNdkMsWUFDbUIsV0FBNkIsRUFDN0IsY0FBcUM7UUFEckMsZ0JBQVcsR0FBWCxXQUFXLENBQWtCO1FBQzdCLG1CQUFjLEdBQWQsY0FBYyxDQUF1QjtRQVB4RCxrQkFBYSxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDO1FBQzFDLGNBQVMsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLFNBQVMsQ0FBQztRQUMxQyxjQUFTLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxTQUFTLENBQUM7UUFDakMsVUFBSyxHQUFHLEVBQUUsTUFBTSxFQUFOLGVBQU0sRUFBRSxDQUFDO0lBS3hCLENBQUM7SUFFTCxVQUFVLENBQUMsTUFBYyxFQUFFLFFBQXlCO1FBQ2xELE9BQU8sUUFBUSxDQUFDLEVBQUUsQ0FBQztJQUNyQixDQUFDO0lBRUQsTUFBTTtRQUNKLElBQUksQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDO1lBQ3pCLFNBQVMsRUFBRSxzQ0FBOEI7WUFDekMsRUFBRSxFQUFFLHlCQUF5QjtZQUM3QixPQUFPLEVBQUU7Z0JBQ1AsWUFBWSxFQUFFO29CQUNaLFVBQVUsRUFBRSxhQUFhO2lCQUMxQjthQUNGO1NBQ0YsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztDQUNGLENBQUE7QUExQlksNEJBQTRCO0lBTHhDLGdCQUFTLENBQUM7UUFDVCxRQUFRLEVBQUUsZUFBZTtRQUN6QixXQUFXLEVBQUUsNEJBQTRCO1FBQ3pDLFNBQVMsRUFBRSxDQUFDLDRCQUE0QixDQUFDO0tBQzFDLENBQUM7R0FDVyw0QkFBNEIsQ0EwQnhDO0FBMUJZLG9FQUE0QiJ9