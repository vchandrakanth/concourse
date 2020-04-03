"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const faTimes_1 = require("@fortawesome/free-solid-svg-icons/faTimes");
const models_1 = require("@concourse/core/models");
let ModifyAzureNonActionsComponent = class ModifyAzureNonActionsComponent {
    constructor(fb, cloudRoleFacade, catalogServiceFacade) {
        this.fb = fb;
        this.cloudRoleFacade = cloudRoleFacade;
        this.catalogServiceFacade = catalogServiceFacade;
        this.availableActions$ = this.catalogServiceFacade.azureActions$;
        this.form = this.fb.group({
            nonOperations: [undefined]
        });
        this.icons = { faTimes: faTimes_1.faTimes };
    }
    ngOnInit() {
        if (!!this.selectedCloudRole) {
            this.form.patchValue({
                nonOperations: this.selectedCloudRole.azureNonActions
            });
        }
    }
    submit() {
        this.cloudRoleFacade.updateAzureActions(this.form.value.nonOperations.map(o => new models_1.AzureOperation().deserialize(o)), this.selectedCloudRole.id);
    }
};
ModifyAzureNonActionsComponent = __decorate([
    core_1.Component({
        selector: 'app-azure-non-actions-templates',
        templateUrl: './modify-azure-non-actions.component.html',
        styleUrls: ['./modify-azure-non-actions.component.scss']
    })
], ModifyAzureNonActionsComponent);
exports.ModifyAzureNonActionsComponent = ModifyAzureNonActionsComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kaWZ5LWF6dXJlLW5vbi1hY3Rpb25zLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL2NvbmNvdXJzZS9qYXZhc2NyaXB0L2NvbmNvdXJzZS1hcHAvc3JjL2FwcC9jb3JlL21vZGFsL2NvbXBvbmVudHMvbW9kaWZ5LWF6dXJlLW5vbi1hY3Rpb25zL21vZGlmeS1henVyZS1ub24tYWN0aW9ucy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQSx3Q0FBa0Q7QUFFbEQsdUVBQW9FO0FBRXBFLG1EQUFtRTtBQVFuRSxJQUFhLDhCQUE4QixHQUEzQyxNQUFhLDhCQUE4QjtJQVN6QyxZQUNtQixFQUFlLEVBQ2YsZUFBZ0MsRUFDaEMsb0JBQTBDO1FBRjFDLE9BQUUsR0FBRixFQUFFLENBQWE7UUFDZixvQkFBZSxHQUFmLGVBQWUsQ0FBaUI7UUFDaEMseUJBQW9CLEdBQXBCLG9CQUFvQixDQUFzQjtRQVg3RCxzQkFBaUIsR0FBRyxJQUFJLENBQUMsb0JBQW9CLENBQUMsYUFBYSxDQUFDO1FBRzVELFNBQUksR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQztZQUNuQixhQUFhLEVBQUUsQ0FBQyxTQUFTLENBQUM7U0FDM0IsQ0FBQyxDQUFDO1FBQ00sVUFBSyxHQUFHLEVBQUUsT0FBTyxFQUFQLGlCQUFPLEVBQUUsQ0FBQztJQU16QixDQUFDO0lBRUwsUUFBUTtRQUNOLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxpQkFBaUIsRUFBRTtZQUM1QixJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQztnQkFDbkIsYUFBYSxFQUFFLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxlQUFlO2FBQ3RELENBQUMsQ0FBQztTQUNKO0lBQ0gsQ0FBQztJQUVELE1BQU07UUFDSixJQUFJLENBQUMsZUFBZSxDQUFDLGtCQUFrQixDQUNyQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsSUFBSSx1QkFBYyxFQUFFLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQzNFLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxFQUFFLENBQzFCLENBQUM7SUFDSixDQUFDO0NBQ0YsQ0FBQTtBQTdCWSw4QkFBOEI7SUFMMUMsZ0JBQVMsQ0FBQztRQUNULFFBQVEsRUFBRSxpQ0FBaUM7UUFDM0MsV0FBVyxFQUFFLDJDQUEyQztRQUN4RCxTQUFTLEVBQUUsQ0FBQywyQ0FBMkMsQ0FBQztLQUN6RCxDQUFDO0dBQ1csOEJBQThCLENBNkIxQztBQTdCWSx3RUFBOEIifQ==