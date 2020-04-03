"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@angular/core/testing");
const forms_1 = require("@angular/forms");
const shared_module_1 = require("@concourse/shared/shared.module");
const angular_fontawesome_1 = require("@fortawesome/angular-fontawesome");
const facades_1 = require("@concourse/store/facades");
const test_1 = require("@concourse/test");
const create_aws_account_component_1 = require("./create-aws-account.component");
describe('CreateAwsAccountComponent', () => {
    let component;
    let fixture;
    beforeEach(testing_1.async(() => {
        testing_1.TestBed.configureTestingModule({
            declarations: [create_aws_account_component_1.CreateAwsAccountComponent],
            imports: [
                angular_fontawesome_1.FontAwesomeModule,
                forms_1.ReactiveFormsModule,
                shared_module_1.SharedModule
            ],
            providers: [
                test_1.mockFacade(facades_1.AuthFacade),
                test_1.mockFacade(facades_1.ApplicationErrorFacade),
                test_1.mockFacade(facades_1.SurfaceFacade),
                test_1.mockFacade(facades_1.AwsAccountFacade)
            ]
        })
            .compileComponents();
    }));
    beforeEach(() => {
        fixture = testing_1.TestBed.createComponent(create_aws_account_component_1.CreateAwsAccountComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRlLWF3cy1hY2NvdW50LmNvbXBvbmVudC5zcGVjLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vY29uY291cnNlL2phdmFzY3JpcHQvY29uY291cnNlLWFwcC9zcmMvYXBwL2NvcmUvbW9kYWwvY29tcG9uZW50cy9jcmVhdGUtYXdzLWFjY291bnQvY3JlYXRlLWF3cy1hY2NvdW50LmNvbXBvbmVudC5zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsbURBQXlFO0FBRXpFLDBDQUFxRDtBQUNyRCxtRUFBK0Q7QUFDL0QsMEVBQXFFO0FBRXJFLHNEQUErRztBQUMvRywwQ0FBNkM7QUFDN0MsaUZBQTJFO0FBRTNFLFFBQVEsQ0FBQywyQkFBMkIsRUFBRSxHQUFHLEVBQUU7SUFDekMsSUFBSSxTQUFvQyxDQUFDO0lBQ3pDLElBQUksT0FBb0QsQ0FBQztJQUV6RCxVQUFVLENBQUMsZUFBSyxDQUFDLEdBQUcsRUFBRTtRQUNwQixpQkFBTyxDQUFDLHNCQUFzQixDQUFDO1lBQzdCLFlBQVksRUFBRSxDQUFDLHdEQUF5QixDQUFDO1lBQ3pDLE9BQU8sRUFBRTtnQkFDUCx1Q0FBaUI7Z0JBQ2pCLDJCQUFtQjtnQkFDbkIsNEJBQVk7YUFDYjtZQUNELFNBQVMsRUFBRTtnQkFDVCxpQkFBVSxDQUFDLG9CQUFVLENBQUM7Z0JBQ3RCLGlCQUFVLENBQUMsZ0NBQXNCLENBQUM7Z0JBQ2xDLGlCQUFVLENBQUMsdUJBQWEsQ0FBQztnQkFDekIsaUJBQVUsQ0FBQywwQkFBZ0IsQ0FBQzthQUM3QjtTQUNGLENBQUM7YUFDQyxpQkFBaUIsRUFBRSxDQUFDO0lBQ3pCLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFFSixVQUFVLENBQUMsR0FBRyxFQUFFO1FBQ2QsT0FBTyxHQUFHLGlCQUFPLENBQUMsZUFBZSxDQUFDLHdEQUF5QixDQUFDLENBQUM7UUFDN0QsU0FBUyxHQUFHLE9BQU8sQ0FBQyxpQkFBaUIsQ0FBQztRQUN0QyxPQUFPLENBQUMsYUFBYSxFQUFFLENBQUM7SUFDMUIsQ0FBQyxDQUFDLENBQUM7SUFFSCxFQUFFLENBQUMsZUFBZSxFQUFFLEdBQUcsRUFBRTtRQUN2QixNQUFNLENBQUMsU0FBUyxDQUFDLENBQUMsVUFBVSxFQUFFLENBQUM7SUFDakMsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDLENBQUMsQ0FBQyJ9