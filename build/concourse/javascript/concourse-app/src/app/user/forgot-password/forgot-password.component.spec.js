"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = require("@angular/common/http");
const testing_1 = require("@angular/core/testing");
const platform_browser_1 = require("@angular/platform-browser");
const auth_service_1 = require("@concourse/store/auth/services/auth.service");
const fromAuth = require("@concourse/store/auth/state/auth.reducer");
const facades_1 = require("@concourse/store/facades");
const store_1 = require("@ngrx/store");
const dynamic_form_1 = require("@concourse/shared/dynamic-form");
const rxjs_1 = require("rxjs");
const forgot_password_component_1 = require("./forgot-password.component");
describe('ForgotPasswordComponent', () => {
    let component;
    let fixture;
    let authFacade;
    const mockUser = {
        email: 'abhinav@concoursehub.com'
    };
    beforeEach(testing_1.async(() => {
        testing_1.TestBed.configureTestingModule({
            imports: [
                http_1.HttpClientModule,
                dynamic_form_1.DynamicFormModule,
                store_1.StoreModule.forRoot({
                    user: fromAuth.reducer
                })
            ],
            providers: [
                {
                    provide: facades_1.AuthFacade,
                    useValue: {
                        isUpdating$: rxjs_1.of(true),
                        forgotPassword: jest.fn()
                    }
                },
                auth_service_1.AuthService
            ],
            declarations: [forgot_password_component_1.ForgotPasswordComponent]
        })
            .compileComponents();
        authFacade = testing_1.TestBed.get(facades_1.AuthFacade);
    }));
    beforeEach(() => {
        fixture = testing_1.TestBed.createComponent(forgot_password_component_1.ForgotPasswordComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
    it('should call forgotPassword', testing_1.async(() => {
        fixture.detectChanges();
        expect(component.form.valid).toBeFalsy();
        fixture.whenStable().then(() => {
            const email = fixture.debugElement.query(platform_browser_1.By.css('#email'));
            const emailEl = email.nativeElement;
            emailEl.value = mockUser.email;
            emailEl.dispatchEvent(new Event('input'));
            expect(emailEl.value).toBe(mockUser.email);
            expect(component.form.valid).toBeTruthy();
            component.submit(mockUser);
            expect(authFacade.forgotPassword).toHaveBeenCalledWith(mockUser);
        });
    }));
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9yZ290LXBhc3N3b3JkLmNvbXBvbmVudC5zcGVjLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vY29uY291cnNlL2phdmFzY3JpcHQvY29uY291cnNlLWFwcC9zcmMvYXBwL3VzZXIvZm9yZ290LXBhc3N3b3JkL2ZvcmdvdC1wYXNzd29yZC5jb21wb25lbnQuc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLCtDQUF3RDtBQUN4RCxtREFBeUU7QUFDekUsZ0VBQStDO0FBQy9DLDhFQUEwRTtBQUMxRSxxRUFBcUU7QUFDckUsc0RBQXNEO0FBQ3RELHVDQUEwQztBQUUxQyxpRUFBbUU7QUFFbkUsK0JBQTBCO0FBQzFCLDJFQUFzRTtBQUV0RSxRQUFRLENBQUMseUJBQXlCLEVBQUUsR0FBRyxFQUFFO0lBQ3ZDLElBQUksU0FBa0MsQ0FBQztJQUN2QyxJQUFJLE9BQWtELENBQUM7SUFDdkQsSUFBSSxVQUFzQixDQUFDO0lBQzNCLE1BQU0sUUFBUSxHQUFHO1FBQ2YsS0FBSyxFQUFFLDBCQUEwQjtLQUNsQyxDQUFDO0lBRUYsVUFBVSxDQUFDLGVBQUssQ0FBQyxHQUFHLEVBQUU7UUFDcEIsaUJBQU8sQ0FBQyxzQkFBc0IsQ0FBQztZQUM3QixPQUFPLEVBQUU7Z0JBQ1AsdUJBQWdCO2dCQUNoQixnQ0FBaUI7Z0JBQ2pCLG1CQUFXLENBQUMsT0FBTyxDQUFDO29CQUNsQixJQUFJLEVBQUUsUUFBUSxDQUFDLE9BQU87aUJBQ3ZCLENBQUM7YUFDSDtZQUNELFNBQVMsRUFBRTtnQkFDVDtvQkFDRSxPQUFPLEVBQUUsb0JBQVU7b0JBQ25CLFFBQVEsRUFBRTt3QkFDUixXQUFXLEVBQUUsU0FBRSxDQUFDLElBQUksQ0FBQzt3QkFDckIsY0FBYyxFQUFFLElBQUksQ0FBQyxFQUFFLEVBQUU7cUJBQzFCO2lCQUNGO2dCQUNELDBCQUFXO2FBQUM7WUFDZCxZQUFZLEVBQUUsQ0FBQyxtREFBdUIsQ0FBQztTQUN4QyxDQUFDO2FBQ0MsaUJBQWlCLEVBQUUsQ0FBQztRQUN2QixVQUFVLEdBQUcsaUJBQU8sQ0FBQyxHQUFHLENBQUMsb0JBQVUsQ0FBQyxDQUFDO0lBQ3ZDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFFSixVQUFVLENBQUMsR0FBRyxFQUFFO1FBQ2QsT0FBTyxHQUFHLGlCQUFPLENBQUMsZUFBZSxDQUFDLG1EQUF1QixDQUFDLENBQUM7UUFDM0QsU0FBUyxHQUFHLE9BQU8sQ0FBQyxpQkFBaUIsQ0FBQztRQUN0QyxPQUFPLENBQUMsYUFBYSxFQUFFLENBQUM7SUFDMUIsQ0FBQyxDQUFDLENBQUM7SUFFSCxFQUFFLENBQUMsZUFBZSxFQUFFLEdBQUcsRUFBRTtRQUN2QixNQUFNLENBQUMsU0FBUyxDQUFDLENBQUMsVUFBVSxFQUFFLENBQUM7SUFDakMsQ0FBQyxDQUFDLENBQUM7SUFFSCxFQUFFLENBQUMsNEJBQTRCLEVBQUUsZUFBSyxDQUFDLEdBQUcsRUFBRTtRQUMxQyxPQUFPLENBQUMsYUFBYSxFQUFFLENBQUM7UUFDeEIsTUFBTSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDekMsT0FBTyxDQUFDLFVBQVUsRUFBRSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUU7WUFDN0IsTUFBTSxLQUFLLEdBQUcsT0FBTyxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMscUJBQUUsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztZQUMzRCxNQUFNLE9BQU8sR0FBRyxLQUFLLENBQUMsYUFBYSxDQUFDO1lBRXBDLE9BQU8sQ0FBQyxLQUFLLEdBQUcsUUFBUSxDQUFDLEtBQUssQ0FBQztZQUMvQixPQUFPLENBQUMsYUFBYSxDQUFDLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7WUFFMUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBRTNDLE1BQU0sQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLFVBQVUsRUFBRSxDQUFDO1lBRTFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDM0IsTUFBTSxDQUFDLFVBQVUsQ0FBQyxjQUFjLENBQUMsQ0FBQyxvQkFBb0IsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNuRSxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDTixDQUFDLENBQUMsQ0FBQyJ9