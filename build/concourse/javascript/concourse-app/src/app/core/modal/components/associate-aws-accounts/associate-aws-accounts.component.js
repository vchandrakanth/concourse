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
let AssociateAwsAccountsComponent = class AssociateAwsAccountsComponent extends basic_modal_1.BasicModal {
    constructor(fb, institutionService, surfaceFacade, awsAccounts) {
        super();
        this.fb = fb;
        this.institutionService = institutionService;
        this.surfaceFacade = surfaceFacade;
        this.awsAccounts = awsAccounts;
        this.form = this.fb.group({
            account: [undefined, [forms_1.Validators.required]]
        });
        this.awsAccounts$ = this.awsAccounts.list$;
        this.selectedSurface$ = this.surfaceFacade.selectedId$;
    }
    onSubmit(surfaceId) {
        const { account } = this.form.value;
        this.awsAccounts.enable(surfaceId, account);
    }
};
AssociateAwsAccountsComponent = __decorate([
    core_1.Component({
        selector: 'app-associate-aws-accounts',
        templateUrl: './associate-aws-accounts.component.html',
        styleUrls: ['./associate-aws-accounts.component.scss']
    })
], AssociateAwsAccountsComponent);
exports.AssociateAwsAccountsComponent = AssociateAwsAccountsComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXNzb2NpYXRlLWF3cy1hY2NvdW50cy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9jb25jb3Vyc2UvamF2YXNjcmlwdC9jb25jb3Vyc2UtYXBwL3NyYy9hcHAvY29yZS9tb2RhbC9jb21wb25lbnRzL2Fzc29jaWF0ZS1hd3MtYWNjb3VudHMvYXNzb2NpYXRlLWF3cy1hY2NvdW50cy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQSx3Q0FBMEM7QUFDMUMsMENBQXlEO0FBR3pELGdEQUE0QztBQU81QyxJQUFhLDZCQUE2QixHQUExQyxNQUFhLDZCQUE4QixTQUFRLHdCQUFVO0lBUTNELFlBQ21CLEVBQWUsRUFDZixrQkFBc0MsRUFDdEMsYUFBNEIsRUFDNUIsV0FBNkI7UUFHOUMsS0FBSyxFQUFFLENBQUM7UUFOUyxPQUFFLEdBQUYsRUFBRSxDQUFhO1FBQ2YsdUJBQWtCLEdBQWxCLGtCQUFrQixDQUFvQjtRQUN0QyxrQkFBYSxHQUFiLGFBQWEsQ0FBZTtRQUM1QixnQkFBVyxHQUFYLFdBQVcsQ0FBa0I7UUFWaEQsU0FBSSxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDO1lBQ25CLE9BQU8sRUFBRSxDQUFDLFNBQVMsRUFBRSxDQUFDLGtCQUFVLENBQUMsUUFBUSxDQUFDLENBQUM7U0FDNUMsQ0FBQyxDQUFDO1FBQ0gsaUJBQVksR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQztRQUN0QyxxQkFBZ0IsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLFdBQVcsQ0FBQztJQVVsRCxDQUFDO0lBRUQsUUFBUSxDQUFDLFNBQWlCO1FBQ3hCLE1BQU0sRUFBRSxPQUFPLEVBQUUsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQztRQUNwQyxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxTQUFTLEVBQUUsT0FBTyxDQUFDLENBQUE7SUFDN0MsQ0FBQztDQUVGLENBQUE7QUF2QlksNkJBQTZCO0lBTHpDLGdCQUFTLENBQUM7UUFDVCxRQUFRLEVBQUUsNEJBQTRCO1FBQ3RDLFdBQVcsRUFBRSx5Q0FBeUM7UUFDdEQsU0FBUyxFQUFFLENBQUMseUNBQXlDLENBQUM7S0FDdkQsQ0FBQztHQUNXLDZCQUE2QixDQXVCekM7QUF2Qlksc0VBQTZCIn0=