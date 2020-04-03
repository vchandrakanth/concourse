"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@angular/core/testing");
const angular_fontawesome_1 = require("@fortawesome/angular-fontawesome");
const forms_1 = require("@angular/forms");
const shared_module_1 = require("@concourse/shared/shared.module");
const institution_service_1 = require("@concourse/store/institution/services/institution.service");
const ng_select_1 = require("@ng-select/ng-select");
const associate_aws_accounts_component_1 = require("./associate-aws-accounts.component");
const http_1 = require("@angular/common/http");
const facades_1 = require("@concourse/store/facades");
const test_1 = require("@concourse/test");
xdescribe('AssociateAwsAccountsComponent', () => {
    let component;
    let fixture;
    beforeEach(testing_1.async(() => {
        testing_1.TestBed.configureTestingModule({
            declarations: [associate_aws_accounts_component_1.AssociateAwsAccountsComponent],
            imports: [
                angular_fontawesome_1.FontAwesomeModule,
                forms_1.ReactiveFormsModule,
                shared_module_1.SharedModule,
                ng_select_1.NgSelectModule,
                http_1.HttpClientModule
            ],
            providers: [
                institution_service_1.InstitutionService,
                test_1.mockFacade(facades_1.SurfaceFacade),
                test_1.mockFacade(facades_1.AwsAccountFacade)
            ]
        })
            .compileComponents();
    }));
    beforeEach(() => {
        fixture = testing_1.TestBed.createComponent(associate_aws_accounts_component_1.AssociateAwsAccountsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXNzb2NpYXRlLWF3cy1hY2NvdW50cy5jb21wb25lbnQuc3BlYy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL2NvbmNvdXJzZS9qYXZhc2NyaXB0L2NvbmNvdXJzZS1hcHAvc3JjL2FwcC9jb3JlL21vZGFsL2NvbXBvbmVudHMvYXNzb2NpYXRlLWF3cy1hY2NvdW50cy9hc3NvY2lhdGUtYXdzLWFjY291bnRzLmNvbXBvbmVudC5zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsbURBQXlFO0FBRXpFLDBFQUFxRTtBQUVyRSwwQ0FBcUQ7QUFDckQsbUVBQStEO0FBQy9ELG1HQUErRjtBQUMvRixvREFBc0Q7QUFDdEQseUZBQW1GO0FBQ25GLCtDQUF3RDtBQUN4RCxzREFBMkU7QUFDM0UsMENBQTZDO0FBRTdDLFNBQVMsQ0FBQywrQkFBK0IsRUFBRSxHQUFHLEVBQUU7SUFDOUMsSUFBSSxTQUF3QyxDQUFDO0lBQzdDLElBQUksT0FBd0QsQ0FBQztJQUU3RCxVQUFVLENBQUMsZUFBSyxDQUFDLEdBQUcsRUFBRTtRQUNwQixpQkFBTyxDQUFDLHNCQUFzQixDQUFDO1lBQzdCLFlBQVksRUFBRSxDQUFDLGdFQUE2QixDQUFDO1lBQzdDLE9BQU8sRUFBRTtnQkFDUCx1Q0FBaUI7Z0JBQ2pCLDJCQUFtQjtnQkFDbkIsNEJBQVk7Z0JBQ1osMEJBQWM7Z0JBQ2QsdUJBQWdCO2FBQ2pCO1lBQ0QsU0FBUyxFQUFFO2dCQUNULHdDQUFrQjtnQkFDbEIsaUJBQVUsQ0FBQyx1QkFBYSxDQUFDO2dCQUN6QixpQkFBVSxDQUFDLDBCQUFnQixDQUFDO2FBQzdCO1NBQ0YsQ0FBQzthQUNDLGlCQUFpQixFQUFFLENBQUM7SUFDekIsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUVKLFVBQVUsQ0FBQyxHQUFHLEVBQUU7UUFDZCxPQUFPLEdBQUcsaUJBQU8sQ0FBQyxlQUFlLENBQUMsZ0VBQTZCLENBQUMsQ0FBQztRQUNqRSxTQUFTLEdBQUcsT0FBTyxDQUFDLGlCQUFpQixDQUFDO1FBQ3RDLE9BQU8sQ0FBQyxhQUFhLEVBQUUsQ0FBQztJQUMxQixDQUFDLENBQUMsQ0FBQztJQUVILEVBQUUsQ0FBQyxlQUFlLEVBQUUsR0FBRyxFQUFFO1FBQ3ZCLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQyxVQUFVLEVBQUUsQ0FBQztJQUNqQyxDQUFDLENBQUMsQ0FBQztBQUNMLENBQUMsQ0FBQyxDQUFDIn0=