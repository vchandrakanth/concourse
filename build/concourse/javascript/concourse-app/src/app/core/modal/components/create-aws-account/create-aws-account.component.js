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
let CreateAwsAccountComponent = class CreateAwsAccountComponent extends basic_modal_1.BasicModal {
    constructor(fb, authFacade, surfaceFacade, awsAccountFacade) {
        super();
        this.fb = fb;
        this.authFacade = authFacade;
        this.surfaceFacade = surfaceFacade;
        this.awsAccountFacade = awsAccountFacade;
        this.institutionId$ = this.authFacade.institutionId$;
        this.surfaceOptions$ = this.surfaceFacade.list$;
        this.form = this.fb.group({
            name: ['', [forms_1.Validators.required, forms_1.Validators.maxLength(128)]],
            description: ['', [forms_1.Validators.required, forms_1.Validators.maxLength(1024)]],
            account: ['', [forms_1.Validators.required, forms_1.Validators.minLength(12), forms_1.Validators.maxLength(12), forms_1.Validators.pattern('[0-9]*')]],
        });
    }
    onSubmit(id) {
        const payload = Object.assign(Object.assign({}, this.form.value), { institution: { id } });
        this.awsAccountFacade.createAwsAccount(payload);
    }
};
CreateAwsAccountComponent = __decorate([
    core_1.Component({
        selector: 'app-create-aws-account',
        templateUrl: './create-aws-account.component.html',
        styleUrls: ['./create-aws-account.component.scss']
    })
], CreateAwsAccountComponent);
exports.CreateAwsAccountComponent = CreateAwsAccountComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRlLWF3cy1hY2NvdW50LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL2NvbmNvdXJzZS9qYXZhc2NyaXB0L2NvbmNvdXJzZS1hcHAvc3JjL2FwcC9jb3JlL21vZGFsL2NvbXBvbmVudHMvY3JlYXRlLWF3cy1hY2NvdW50L2NyZWF0ZS1hd3MtYWNjb3VudC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQSx3Q0FBMEM7QUFDMUMsMENBQXlEO0FBRXpELGdEQUE0QztBQU81QyxJQUFhLHlCQUF5QixHQUF0QyxNQUFhLHlCQUEwQixTQUFRLHdCQUFVO0lBVXZELFlBQ1UsRUFBZSxFQUNmLFVBQXNCLEVBQ2IsYUFBNEIsRUFDNUIsZ0JBQWtDO1FBRW5ELEtBQUssRUFBRSxDQUFDO1FBTEEsT0FBRSxHQUFGLEVBQUUsQ0FBYTtRQUNmLGVBQVUsR0FBVixVQUFVLENBQVk7UUFDYixrQkFBYSxHQUFiLGFBQWEsQ0FBZTtRQUM1QixxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO1FBYnJELG1CQUFjLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxjQUFjLENBQUM7UUFDaEQsb0JBQWUsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQztRQUUzQyxTQUFJLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUM7WUFDbkIsSUFBSSxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsa0JBQVUsQ0FBQyxRQUFRLEVBQUUsa0JBQVUsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztZQUM1RCxXQUFXLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxrQkFBVSxDQUFDLFFBQVEsRUFBRSxrQkFBVSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQ3BFLE9BQU8sRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDLGtCQUFVLENBQUMsUUFBUSxFQUFFLGtCQUFVLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxFQUFFLGtCQUFVLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxFQUFFLGtCQUFVLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7U0FDdkgsQ0FBQyxDQUFDO0lBU0gsQ0FBQztJQUVELFFBQVEsQ0FBQyxFQUFVO1FBQ2pCLE1BQU0sT0FBTyxtQ0FDUixJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssS0FDbEIsV0FBVyxFQUFFLEVBQUUsRUFBRSxFQUFFLEdBQ3BCLENBQUM7UUFDRixJQUFJLENBQUMsZ0JBQWdCLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDbEQsQ0FBQztDQUVGLENBQUE7QUEzQlkseUJBQXlCO0lBTHJDLGdCQUFTLENBQUM7UUFDVCxRQUFRLEVBQUUsd0JBQXdCO1FBQ2xDLFdBQVcsRUFBRSxxQ0FBcUM7UUFDbEQsU0FBUyxFQUFFLENBQUMscUNBQXFDLENBQUM7S0FDbkQsQ0FBQztHQUNXLHlCQUF5QixDQTJCckM7QUEzQlksOERBQXlCIn0=