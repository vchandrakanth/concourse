"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@angular/core/testing");
const forms_1 = require("@angular/forms");
const shared_module_1 = require("@concourse/shared/shared.module");
const angular_fontawesome_1 = require("@fortawesome/angular-fontawesome");
const facades_1 = require("@concourse/store/facades");
const test_1 = require("@concourse/test");
const update_aws_account_component_1 = require("./update-aws-account.component");
xdescribe('UpdateAwsAccountComponent', () => {
    let component;
    let fixture;
    beforeEach(testing_1.async(() => {
        testing_1.TestBed.configureTestingModule({
            declarations: [update_aws_account_component_1.UpdateAwsAccountComponent],
            imports: [
                angular_fontawesome_1.FontAwesomeModule,
                forms_1.ReactiveFormsModule,
                shared_module_1.SharedModule
            ],
            providers: [
                test_1.mockFacade(facades_1.AwsAccountFacade)
            ]
        })
            .compileComponents();
    }));
    beforeEach(() => {
        fixture = testing_1.TestBed.createComponent(update_aws_account_component_1.UpdateAwsAccountComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXBkYXRlLWF3cy1hY2NvdW50LmNvbXBvbmVudC5zcGVjLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vY29uY291cnNlL2phdmFzY3JpcHQvY29uY291cnNlLWFwcC9zcmMvYXBwL2NvcmUvbW9kYWwvY29tcG9uZW50cy91cGRhdGUtYXdzLWFjY291bnQvdXBkYXRlLWF3cy1hY2NvdW50LmNvbXBvbmVudC5zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsbURBQXlFO0FBRXpFLDBDQUFxRDtBQUNyRCxtRUFBK0Q7QUFDL0QsMEVBQXFFO0FBRXJFLHNEQUE0RDtBQUM1RCwwQ0FBNkM7QUFFN0MsaUZBQTJFO0FBRTNFLFNBQVMsQ0FBQywyQkFBMkIsRUFBRSxHQUFHLEVBQUU7SUFDMUMsSUFBSSxTQUFvQyxDQUFDO0lBQ3pDLElBQUksT0FBb0QsQ0FBQztJQUV6RCxVQUFVLENBQUMsZUFBSyxDQUFDLEdBQUcsRUFBRTtRQUVwQixpQkFBTyxDQUFDLHNCQUFzQixDQUFDO1lBQzdCLFlBQVksRUFBRSxDQUFDLHdEQUF5QixDQUFDO1lBQ3pDLE9BQU8sRUFBRTtnQkFDUCx1Q0FBaUI7Z0JBQ2pCLDJCQUFtQjtnQkFDbkIsNEJBQVk7YUFDYjtZQUNELFNBQVMsRUFBRTtnQkFDVCxpQkFBVSxDQUFDLDBCQUFnQixDQUFDO2FBQzdCO1NBRUYsQ0FBQzthQUNDLGlCQUFpQixFQUFFLENBQUM7SUFDekIsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUVKLFVBQVUsQ0FBQyxHQUFHLEVBQUU7UUFDZCxPQUFPLEdBQUcsaUJBQU8sQ0FBQyxlQUFlLENBQUMsd0RBQXlCLENBQUMsQ0FBQztRQUM3RCxTQUFTLEdBQUcsT0FBTyxDQUFDLGlCQUFpQixDQUFDO1FBQ3RDLE9BQU8sQ0FBQyxhQUFhLEVBQUUsQ0FBQztJQUMxQixDQUFDLENBQUMsQ0FBQztJQUVILEVBQUUsQ0FBQyxlQUFlLEVBQUUsR0FBRyxFQUFFO1FBQ3ZCLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQyxVQUFVLEVBQUUsQ0FBQztJQUNqQyxDQUFDLENBQUMsQ0FBQztBQUNMLENBQUMsQ0FBQyxDQUFDIn0=