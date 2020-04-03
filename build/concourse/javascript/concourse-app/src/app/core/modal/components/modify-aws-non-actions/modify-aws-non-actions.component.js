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
let ModifyAwsNonActionsComponent = class ModifyAwsNonActionsComponent {
    constructor(fb, cloudRoleFacade, catalogServiceFacade) {
        this.fb = fb;
        this.cloudRoleFacade = cloudRoleFacade;
        this.catalogServiceFacade = catalogServiceFacade;
        this.availableActions$ = this.catalogServiceFacade.awsActions$;
        this.icons = { faTimes: faTimes_1.faTimes };
        this.form = this.fb.group({
            nonOperations: [undefined]
        });
    }
    ngOnInit() {
        if (!!this.selectedCloudRole) {
            this.form.patchValue({
                nonOperations: this.selectedCloudRole.awsNonActions
            });
        }
    }
    submit() {
        this.cloudRoleFacade.updateAwsNonActions(this.form.value.nonOperations.map(o => new models_1.AwsOperation().deserialize(o)), this.selectedCloudRole.id);
    }
};
ModifyAwsNonActionsComponent = __decorate([
    core_1.Component({
        selector: 'app-aws-non-actions-templates',
        templateUrl: './modify-aws-non-actions.component.html',
        styleUrls: ['./modify-aws-non-actions.component.scss']
    })
], ModifyAwsNonActionsComponent);
exports.ModifyAwsNonActionsComponent = ModifyAwsNonActionsComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kaWZ5LWF3cy1ub24tYWN0aW9ucy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9jb25jb3Vyc2UvamF2YXNjcmlwdC9jb25jb3Vyc2UtYXBwL3NyYy9hcHAvY29yZS9tb2RhbC9jb21wb25lbnRzL21vZGlmeS1hd3Mtbm9uLWFjdGlvbnMvbW9kaWZ5LWF3cy1ub24tYWN0aW9ucy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQSx3Q0FBa0Q7QUFFbEQsdUVBQW9FO0FBRXBFLG1EQUFpRTtBQVFqRSxJQUFhLDRCQUE0QixHQUF6QyxNQUFhLDRCQUE0QjtJQVN2QyxZQUNtQixFQUFlLEVBQ2YsZUFBZ0MsRUFDaEMsb0JBQTBDO1FBRjFDLE9BQUUsR0FBRixFQUFFLENBQWE7UUFDZixvQkFBZSxHQUFmLGVBQWUsQ0FBaUI7UUFDaEMseUJBQW9CLEdBQXBCLG9CQUFvQixDQUFzQjtRQVg3RCxzQkFBaUIsR0FBRyxJQUFJLENBQUMsb0JBQW9CLENBQUMsV0FBVyxDQUFDO1FBR2pELFVBQUssR0FBRyxFQUFFLE9BQU8sRUFBUCxpQkFBTyxFQUFFLENBQUM7UUFDN0IsU0FBSSxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDO1lBQ25CLGFBQWEsRUFBRSxDQUFDLFNBQVMsQ0FBQztTQUMzQixDQUFDLENBQUM7SUFNQyxDQUFDO0lBRUwsUUFBUTtRQUNOLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxpQkFBaUIsRUFBRTtZQUM1QixJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQztnQkFDbkIsYUFBYSxFQUFFLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxhQUFhO2FBQ3BELENBQUMsQ0FBQztTQUNKO0lBQ0gsQ0FBQztJQUVELE1BQU07UUFDSixJQUFJLENBQUMsZUFBZSxDQUFDLG1CQUFtQixDQUN0QyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsSUFBSSxxQkFBWSxFQUFFLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQ3pFLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxFQUFFLENBQzFCLENBQUM7SUFDSixDQUFDO0NBQ0YsQ0FBQTtBQTdCWSw0QkFBNEI7SUFMeEMsZ0JBQVMsQ0FBQztRQUNULFFBQVEsRUFBRSwrQkFBK0I7UUFDekMsV0FBVyxFQUFFLHlDQUF5QztRQUN0RCxTQUFTLEVBQUUsQ0FBQyx5Q0FBeUMsQ0FBQztLQUN2RCxDQUFDO0dBQ1csNEJBQTRCLENBNkJ4QztBQTdCWSxvRUFBNEIifQ==