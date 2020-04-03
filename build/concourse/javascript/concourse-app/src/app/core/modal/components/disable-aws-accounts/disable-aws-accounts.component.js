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
const basic_modal_1 = require("../basic-modal");
let DisableAwsAccountsComponent = class DisableAwsAccountsComponent extends basic_modal_1.BasicModal {
    // selectedSurface$ = this.surfaceFacade.selectedWithRelated$;
    constructor(fb, surfaceFacade, awsAccounts) {
        super();
        this.fb = fb;
        this.surfaceFacade = surfaceFacade;
        this.awsAccounts = awsAccounts;
        this.form = this.fb.group({
            account: [undefined, [forms_1.Validators.required]]
        });
    }
    onSubmit() {
        const { account } = this.form.value;
        const { surfaceId, surfaceLayerId } = this.data;
        if (!!surfaceLayerId) {
            this.awsAccounts.disableSurfaceLayer(surfaceId, surfaceLayerId, account);
        }
        else {
            this.awsAccounts.disable(surfaceId, account);
        }
    }
};
DisableAwsAccountsComponent = __decorate([
    core_1.Component({
        selector: 'app-disable-aws-accounts',
        templateUrl: './disable-aws-accounts.component.html',
        styleUrls: ['./disable-aws-accounts.component.scss']
    })
], DisableAwsAccountsComponent);
exports.DisableAwsAccountsComponent = DisableAwsAccountsComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlzYWJsZS1hd3MtYWNjb3VudHMuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vY29uY291cnNlL2phdmFzY3JpcHQvY29uY291cnNlLWFwcC9zcmMvYXBwL2NvcmUvbW9kYWwvY29tcG9uZW50cy9kaXNhYmxlLWF3cy1hY2NvdW50cy9kaXNhYmxlLWF3cy1hY2NvdW50cy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQSx3Q0FBa0Q7QUFDbEQsMENBQXlEO0FBR3pELGdEQUE0QztBQU81QyxJQUFhLDJCQUEyQixHQUF4QyxNQUFhLDJCQUE0QixTQUFRLHdCQUFVO0lBTXpELDhEQUE4RDtJQUU5RCxZQUNtQixFQUFlLEVBQ2YsYUFBNEIsRUFDNUIsV0FBNkI7UUFHOUMsS0FBSyxFQUFFLENBQUM7UUFMUyxPQUFFLEdBQUYsRUFBRSxDQUFhO1FBQ2Ysa0JBQWEsR0FBYixhQUFhLENBQWU7UUFDNUIsZ0JBQVcsR0FBWCxXQUFXLENBQWtCO1FBVGhELFNBQUksR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQztZQUNuQixPQUFPLEVBQUUsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxrQkFBVSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1NBQzVDLENBQUMsQ0FBQztJQVdILENBQUM7SUFFRCxRQUFRO1FBQ04sTUFBTSxFQUFFLE9BQU8sRUFBRSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDO1FBQ3BDLE1BQU0sRUFBRSxTQUFTLEVBQUUsY0FBYyxFQUFFLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQztRQUNoRCxJQUFJLENBQUMsQ0FBQyxjQUFjLEVBQUU7WUFDcEIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxtQkFBbUIsQ0FBQyxTQUFTLEVBQUUsY0FBYyxFQUFFLE9BQU8sQ0FBQyxDQUFDO1NBQzFFO2FBQU07WUFDTCxJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUUsT0FBTyxDQUFDLENBQUM7U0FDOUM7SUFDSCxDQUFDO0NBRUYsQ0FBQTtBQTNCWSwyQkFBMkI7SUFMdkMsZ0JBQVMsQ0FBQztRQUNULFFBQVEsRUFBRSwwQkFBMEI7UUFDcEMsV0FBVyxFQUFFLHVDQUF1QztRQUNwRCxTQUFTLEVBQUUsQ0FBQyx1Q0FBdUMsQ0FBQztLQUNyRCxDQUFDO0dBQ1csMkJBQTJCLENBMkJ2QztBQTNCWSxrRUFBMkIifQ==