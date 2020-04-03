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
let ModifyAwsActionsComponent = class ModifyAwsActionsComponent {
    constructor(fb, cloudRoleFacade, catalogServiceFacade) {
        this.fb = fb;
        this.cloudRoleFacade = cloudRoleFacade;
        this.catalogServiceFacade = catalogServiceFacade;
        this.availableActions$ = this.catalogServiceFacade.awsActions$;
        this.form = this.fb.group({
            operations: [undefined]
        });
        this.icons = { faTimes: faTimes_1.faTimes };
    }
    ngOnInit() {
        if (!!this.selectedCloudRole) {
            this.form.patchValue({
                operations: this.selectedCloudRole.awsActions
            });
        }
    }
    submit() {
        this.cloudRoleFacade.updateAwsActions(this.form.value.operations.map(o => new models_1.AwsOperation().deserialize(o)), this.selectedCloudRole.id);
    }
};
ModifyAwsActionsComponent = __decorate([
    core_1.Component({
        selector: 'app-aws-actions-templates',
        templateUrl: './modify-aws-actions.component.html',
        styleUrls: ['./modify-aws-actions.component.scss']
    })
], ModifyAwsActionsComponent);
exports.ModifyAwsActionsComponent = ModifyAwsActionsComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kaWZ5LWF3cy1hY3Rpb25zLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL2NvbmNvdXJzZS9qYXZhc2NyaXB0L2NvbmNvdXJzZS1hcHAvc3JjL2FwcC9jb3JlL21vZGFsL2NvbXBvbmVudHMvbW9kaWZ5LWF3cy1hY3Rpb25zL21vZGlmeS1hd3MtYWN0aW9ucy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQSx3Q0FBa0Q7QUFFbEQsdUVBQW9FO0FBRXBFLG1EQUFpRTtBQVFqRSxJQUFhLHlCQUF5QixHQUF0QyxNQUFhLHlCQUF5QjtJQVNwQyxZQUNtQixFQUFlLEVBQ2YsZUFBZ0MsRUFDaEMsb0JBQTBDO1FBRjFDLE9BQUUsR0FBRixFQUFFLENBQWE7UUFDZixvQkFBZSxHQUFmLGVBQWUsQ0FBaUI7UUFDaEMseUJBQW9CLEdBQXBCLG9CQUFvQixDQUFzQjtRQVg3RCxzQkFBaUIsR0FBRyxJQUFJLENBQUMsb0JBQW9CLENBQUMsV0FBVyxDQUFDO1FBRzFELFNBQUksR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQztZQUNuQixVQUFVLEVBQUUsQ0FBQyxTQUFTLENBQUM7U0FDeEIsQ0FBQyxDQUFDO1FBQ00sVUFBSyxHQUFHLEVBQUUsT0FBTyxFQUFQLGlCQUFPLEVBQUUsQ0FBQztJQU16QixDQUFDO0lBRUwsUUFBUTtRQUNOLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxpQkFBaUIsRUFBRTtZQUM1QixJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQztnQkFDbkIsVUFBVSxFQUFFLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxVQUFVO2FBQzlDLENBQUMsQ0FBQztTQUNKO0lBQ0gsQ0FBQztJQUVELE1BQU07UUFDSixJQUFJLENBQUMsZUFBZSxDQUFDLGdCQUFnQixDQUNuQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsSUFBSSxxQkFBWSxFQUFFLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQ3RFLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxFQUFFLENBQzFCLENBQUM7SUFDSixDQUFDO0NBQ0YsQ0FBQTtBQTdCWSx5QkFBeUI7SUFMckMsZ0JBQVMsQ0FBQztRQUNULFFBQVEsRUFBRSwyQkFBMkI7UUFDckMsV0FBVyxFQUFFLHFDQUFxQztRQUNsRCxTQUFTLEVBQUUsQ0FBQyxxQ0FBcUMsQ0FBQztLQUNuRCxDQUFDO0dBQ1cseUJBQXlCLENBNkJyQztBQTdCWSw4REFBeUIifQ==