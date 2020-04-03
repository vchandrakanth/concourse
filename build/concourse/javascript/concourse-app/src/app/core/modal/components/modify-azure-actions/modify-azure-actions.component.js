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
const models_1 = require("@concourse/core/models");
let ModifyAzureActionsComponent = class ModifyAzureActionsComponent {
    constructor(fb, cloudRoleFacade, catalogServiceFacade) {
        this.fb = fb;
        this.cloudRoleFacade = cloudRoleFacade;
        this.catalogServiceFacade = catalogServiceFacade;
        this.availableActions$ = this.catalogServiceFacade.azureActions$;
        this.form = this.fb.group({
            operations: [undefined, [forms_1.Validators.required]]
        });
        this.icons = { faTimes: faTimes_1.faTimes };
    }
    ngOnInit() {
        if (!!this.selectedCloudRole) {
            this.form.patchValue({
                operations: this.selectedCloudRole.azureActions
            });
        }
    }
    submit() {
        this.cloudRoleFacade.updateAzureActions(this.form.value.operations.map(o => new models_1.AzureOperation().deserialize(o)), this.selectedCloudRole.id);
    }
};
ModifyAzureActionsComponent = __decorate([
    core_1.Component({
        selector: 'app-azure-actions-templates',
        templateUrl: './modify-azure-actions.component.html',
        styleUrls: ['./modify-azure-actions.component.scss']
    })
], ModifyAzureActionsComponent);
exports.ModifyAzureActionsComponent = ModifyAzureActionsComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kaWZ5LWF6dXJlLWFjdGlvbnMuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vY29uY291cnNlL2phdmFzY3JpcHQvY29uY291cnNlLWFwcC9zcmMvYXBwL2NvcmUvbW9kYWwvY29tcG9uZW50cy9tb2RpZnktYXp1cmUtYWN0aW9ucy9tb2RpZnktYXp1cmUtYWN0aW9ucy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQSx3Q0FBa0Q7QUFDbEQsMENBQXlEO0FBQ3pELHVFQUFvRTtBQUVwRSxtREFBbUU7QUFRbkUsSUFBYSwyQkFBMkIsR0FBeEMsTUFBYSwyQkFBMkI7SUFTdEMsWUFDbUIsRUFBZSxFQUNmLGVBQWdDLEVBQ2hDLG9CQUEwQztRQUYxQyxPQUFFLEdBQUYsRUFBRSxDQUFhO1FBQ2Ysb0JBQWUsR0FBZixlQUFlLENBQWlCO1FBQ2hDLHlCQUFvQixHQUFwQixvQkFBb0IsQ0FBc0I7UUFYN0Qsc0JBQWlCLEdBQUcsSUFBSSxDQUFDLG9CQUFvQixDQUFDLGFBQWEsQ0FBQztRQUc1RCxTQUFJLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUM7WUFDbkIsVUFBVSxFQUFFLENBQUMsU0FBUyxFQUFFLENBQUMsa0JBQVUsQ0FBQyxRQUFRLENBQUMsQ0FBQztTQUMvQyxDQUFDLENBQUM7UUFDTSxVQUFLLEdBQUcsRUFBRSxPQUFPLEVBQVAsaUJBQU8sRUFBRSxDQUFDO0lBTXpCLENBQUM7SUFFTCxRQUFRO1FBQ04sSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLGlCQUFpQixFQUFFO1lBQzVCLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDO2dCQUNuQixVQUFVLEVBQUUsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFlBQVk7YUFDaEQsQ0FBQyxDQUFDO1NBQ0o7SUFDSCxDQUFDO0lBRUQsTUFBTTtRQUNKLElBQUksQ0FBQyxlQUFlLENBQUMsa0JBQWtCLENBQ3JDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxJQUFJLHVCQUFjLEVBQUUsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFDeEUsSUFBSSxDQUFDLGlCQUFpQixDQUFDLEVBQUUsQ0FDMUIsQ0FBQztJQUNKLENBQUM7Q0FDRixDQUFBO0FBN0JZLDJCQUEyQjtJQUx2QyxnQkFBUyxDQUFDO1FBQ1QsUUFBUSxFQUFFLDZCQUE2QjtRQUN2QyxXQUFXLEVBQUUsdUNBQXVDO1FBQ3BELFNBQVMsRUFBRSxDQUFDLHVDQUF1QyxDQUFDO0tBQ3JELENBQUM7R0FDVywyQkFBMkIsQ0E2QnZDO0FBN0JZLGtFQUEyQiJ9