"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@angular/core/testing");
const platform_browser_1 = require("@angular/platform-browser");
const store_1 = require("@ngrx/store");
const rxjs_1 = require("rxjs");
const core_1 = require("@angular/core");
const dynamic_form_1 = require("@concourse/shared/dynamic-form");
const facades_1 = require("@concourse/store/facades");
const alert_1 = require("ngx-bootstrap/alert");
const user_profile_component_1 = require("./user-profile.component");
describe('User profile component', () => {
    let component;
    let fixture;
    let userFacade;
    const mockUser = {
        userName: 'test',
        password: 'Test@123',
        currentPassword: 'Test@123',
        newPassword: 'Test@1234',
        newPasswordConfirm: 'Test@1234'
    };
    beforeEach(testing_1.async(() => {
        // tslint:disable-next-line: no-floating-promises
        testing_1.TestBed.configureTestingModule({
            schemas: [core_1.NO_ERRORS_SCHEMA],
            imports: [
                store_1.StoreModule.forRoot({}),
                dynamic_form_1.DynamicFormModule,
                alert_1.AlertModule.forRoot()
            ],
            providers: [
                {
                    provide: facades_1.InstitutionFacade,
                    useValue: {
                        selected$: new rxjs_1.BehaviorSubject({ authenticationType: 'BASIC' })
                    }
                },
                {
                    provide: facades_1.AuthFacade,
                    useValue: {
                        user$: new rxjs_1.BehaviorSubject(mockUser)
                    }
                },
                {
                    provide: facades_1.UserFacade,
                    useValue: {
                        updatePassword: jest.fn()
                    }
                }
            ],
            declarations: [user_profile_component_1.UserProfileComponent]
        })
            .compileComponents();
        userFacade = testing_1.TestBed.get(facades_1.UserFacade);
    }));
    beforeEach(() => {
        fixture = testing_1.TestBed.createComponent(user_profile_component_1.UserProfileComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
    it('should update password upon submit', testing_1.async(() => {
        fixture.detectChanges();
        expect(component.form.valid).toBeFalsy();
        fixture.whenStable().then(() => {
            const userName = fixture.debugElement.query(platform_browser_1.By.css('[data-e2e="userName"]')).nativeElement;
            const currentPassword = fixture.debugElement.query(platform_browser_1.By.css('[data-e2e="currentPassword"]')).nativeElement;
            const newPassword = fixture.debugElement.query(platform_browser_1.By.css('[data-e2e="newPassword"]')).nativeElement;
            const newPasswordConfirm = fixture.debugElement.query(platform_browser_1.By.css('[data-e2e="savePasswordBtn"]')).nativeElement;
            userName.value = mockUser.userName;
            currentPassword.value = mockUser.currentPassword;
            newPassword.value = mockUser.newPassword;
            newPasswordConfirm.value = mockUser.newPasswordConfirm;
            userName.dispatchEvent(new Event('input'));
            currentPassword.dispatchEvent(new Event('input'));
            newPassword.dispatchEvent(new Event('input'));
            newPasswordConfirm.dispatchEvent(new Event('input'));
            expect(component.form.valid).toBeTruthy();
            const userWithId = {
                id: 100
            };
            component.updatePassword(userWithId, mockUser);
            expect(userFacade.updatePassword).toHaveBeenCalledWith(100, {
                currentPassword: mockUser.currentPassword,
                newPassword: mockUser.newPassword,
                newPasswordConfirm: mockUser.newPasswordConfirm
            });
        });
    }));
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci1wcm9maWxlLmNvbXBvbmVudC5zcGVjLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vY29uY291cnNlL2phdmFzY3JpcHQvY29uY291cnNlLWFwcC9zcmMvYXBwL3VzZXIvcHJvZmlsZS91c2VyLXByb2ZpbGUuY29tcG9uZW50LnNwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxtREFBeUU7QUFDekUsZ0VBQStDO0FBQy9DLHVDQUEwQztBQUMxQywrQkFBdUM7QUFFdkMsd0NBQWlEO0FBQ2pELGlFQUFtRTtBQUNuRSxzREFBcUY7QUFDckYsK0NBQWtEO0FBQ2xELHFFQUFnRTtBQUVoRSxRQUFRLENBQUMsd0JBQXdCLEVBQUUsR0FBRyxFQUFFO0lBQ3RDLElBQUksU0FBK0IsQ0FBQztJQUNwQyxJQUFJLE9BQStDLENBQUM7SUFDcEQsSUFBSSxVQUFzQixDQUFDO0lBRTNCLE1BQU0sUUFBUSxHQUFHO1FBQ2YsUUFBUSxFQUFFLE1BQU07UUFDaEIsUUFBUSxFQUFFLFVBQVU7UUFDcEIsZUFBZSxFQUFFLFVBQVU7UUFDM0IsV0FBVyxFQUFFLFdBQVc7UUFDeEIsa0JBQWtCLEVBQUUsV0FBVztLQUNoQyxDQUFDO0lBRUYsVUFBVSxDQUFDLGVBQUssQ0FBQyxHQUFHLEVBQUU7UUFDcEIsaURBQWlEO1FBQ2pELGlCQUFPLENBQUMsc0JBQXNCLENBQUM7WUFDN0IsT0FBTyxFQUFFLENBQUMsdUJBQWdCLENBQUM7WUFDM0IsT0FBTyxFQUFFO2dCQUNQLG1CQUFXLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQztnQkFDdkIsZ0NBQWlCO2dCQUNqQixtQkFBVyxDQUFDLE9BQU8sRUFBRTthQUN0QjtZQUNELFNBQVMsRUFBRTtnQkFDVDtvQkFDRSxPQUFPLEVBQUUsMkJBQWlCO29CQUMxQixRQUFRLEVBQUU7d0JBQ1IsU0FBUyxFQUFFLElBQUksc0JBQWUsQ0FBQyxFQUFDLGtCQUFrQixFQUFFLE9B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