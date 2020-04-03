"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = require("@angular/common/http");
const testing_1 = require("@angular/core/testing");
const platform_browser_1 = require("@angular/platform-browser");
const dynamic_form_1 = require("@concourse/shared/dynamic-form");
const shared_module_1 = require("@concourse/shared/shared.module");
const auth_service_1 = require("@concourse/store/auth/services/auth.service");
const facades_1 = require("@concourse/store/facades");
const test_1 = require("@concourse/test");
const store_1 = require("@ngrx/store");
const rxjs_1 = require("rxjs");
const reset_password_component_1 = require("./reset-password.component");
xdescribe('ResetPasswordComponent', () => {
    let component;
    let fixture;
    let authFacade;
    let mockUser = {
        newPassword: 'Test@123',
        newPasswordConfirm: 'Test@123'
    };
    beforeEach(testing_1.async(() => {
        testing_1.TestBed.configureTestingModule({
            imports: [
                http_1.HttpClientModule,
                dynamic_form_1.DynamicFormModule,
                store_1.StoreModule.forRoot({}),
                shared_module_1.SharedModule
            ],
            providers: [
                test_1.mockFacade(facades_1.ApplicationErrorFacade),
                {
                    provide: facades_1.AuthFacade,
                    useValue: {
                        resetPassword: jest.fn(),
                        token$: rxjs_1.of('test123')
                    }
                },
                auth_service_1.AuthService
            ],
            declarations: [reset_password_component_1.ResetPasswordComponent]
        })
            .compileComponents();
        authFacade = testing_1.TestBed.get(facades_1.AuthFacade);
    }));
    beforeEach(() => {
        fixture = testing_1.TestBed.createComponent(reset_password_component_1.ResetPasswordComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
    it('should call resetPassword', testing_1.async(() => {
        fixture.detectChanges();
        expect(component.form.valid).toBeFalsy();
        fixture.whenStable().then(() => {
            const password = fixture.debugElement.query(platform_browser_1.By.css('#newPassword'));
            const confirmPassword = fixture.debugElement.query(platform_browser_1.By.css('#newPasswordConfirm'));
            const passwordEl = password.nativeElement;
            const confirmPasswordEl = confirmPassword.nativeElement;
            passwordEl.value = mockUser.newPassword;
            confirmPasswordEl.value = mockUser.newPasswordConfirm;
            passwordEl.dispatchEvent(new Event('input'));
            confirmPasswordEl.dispatchEvent(new Event('input'));
            expect(passwordEl.value).toBe(mockUser.newPassword);
            expect(component.form.valid).toBeTruthy();
            mockUser = Object.assign(Object.assign({}, mockUser), { identityToken: 'test123' });
            component.submit(mockUser);
            expect(authFacade.resetPassword).toHaveBeenCalledWith(mockUser);
        });
    }));
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzZXQtcGFzc3dvcmQuY29tcG9uZW50LnNwZWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9jb25jb3Vyc2UvamF2YXNjcmlwdC9jb25jb3Vyc2UtYXBwL3NyYy9hcHAvdXNlci9yZXNldC1wYXNzd29yZC9yZXNldC1wYXNzd29yZC5jb21wb25lbnQuc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLCtDQUF3RDtBQUN4RCxtREFBeUU7QUFDekUsZ0VBQStDO0FBQy9DLGlFQUFtRTtBQUNuRSxtRUFBK0Q7QUFDL0QsOEVBQTBFO0FBQzFFLHNEQUE4RTtBQUM5RSwwQ0FBNkM7QUFDN0MsdUNBQTBDO0FBQzFDLCtCQUEwQjtBQUMxQix5RUFBb0U7QUFFcEUsU0FBUyxDQUFDLHdCQUF3QixFQUFFLEdBQUcsRUFBRTtJQUN2QyxJQUFJLFNBQWlDLENBQUM7SUFDdEMsSUFBSSxPQUFpRCxDQUFDO0lBQ3RELElBQUksVUFBc0IsQ0FBQztJQUMzQixJQUFJLFFBQVEsR0FBUTtRQUNsQixXQUFXLEVBQUUsVUFBVTtRQUN2QixrQkFBa0IsRUFBRSxVQUFVO0tBQy9CLENBQUM7SUFFRixVQUFVLENBQUMsZUFBSyxDQUFDLEdBQUcsRUFBRTtRQUNwQixpQkFBTyxDQUFDLHNCQUFzQixDQUFDO1lBQzdCLE9BQU8sRUFBRTtnQkFDUCx1QkFBZ0I7Z0JBQ2hCLGdDQUFpQjtnQkFDakIsbUJBQVcsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDO2dCQUN2Qiw0QkFBWTthQUNiO1lBQ0QsU0FBUyxFQUFFO2dCQUNULGlCQUFVLENBQUMsZ0NBQXNCLENBQUM7Z0JBQ2xDO29CQUNFLE9BQU8sRUFBRSxvQkFBVTtvQkFDbkIsUUFBUSxFQUFFO3dCQUNSLGFBQWEsRUFBRSxJQUFJLENBQUMsRUFBRSxFQUFFO3dCQUN4QixNQUFNLEVBQUUsU0FBRSxDQUFDLFNBQVMsQ0FBQztxQkFDdEI7aUJBQ0Y7Z0JBQ0QsMEJBQVc7YUFBQztZQUNkLFlBQVksRUFBRSxDQUFDLGlEQUFzQixDQUFDO1NBQ3ZDLENBQUM7YUFDQyxpQkFBaUIsRUFBRSxDQUFDO1FBQ3ZCLFVBQVUsR0FBRyxpQkFBTyxDQUFDLEdBQUcsQ0FBQyxvQkFBVSxDQUFDLENBQUM7SUFDdkMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUVKLFVBQVUsQ0FBQyxHQUFHLEVBQUU7UUFDZCxPQUFPLEdBQUcsaUJBQU8sQ0FBQyxlQUFlLENBQUMsaURBQXNCLENBQUMsQ0FBQztRQUMxRCxTQUFTLEdBQUcsT0FBTyxDQUFDLGlCQUFpQixDQUFDO1FBQ3RDLE9BQU8sQ0FBQyxhQUFhLEVBQUUsQ0FBQztJQUMxQixDQUFDLENBQUMsQ0FBQztJQUVILEVBQUUsQ0FBQyxlQUFlLEVBQUUsR0FBRyxFQUFFO1FBQ3ZCLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQyxVQUFVLEVBQUUsQ0FBQztJQUNqQyxDQUFDLENBQUMsQ0FBQztJQUVILEVBQUUsQ0FBQywyQkFBMkIsRUFBRSxlQUFLLENBQUMsR0FBRyxFQUFFO1FBQ3pDLE9BQU8sQ0FBQyxhQUFhLEVBQUUsQ0FBQztRQUN4QixNQUFNLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUN6QyxPQUFPLENBQUMsVUFBVSxFQUFFLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRTtZQUM3QixNQUFNLFFBQVEsR0FBRyxPQUFPLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxxQkFBRSxDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDO1lBQ3BFLE1BQU0sZUFBZSxHQUFHLE9BQU8sQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLHFCQUFFLENBQUMsR0FBRyxDQUFDLHFCQUFxQixDQUFDLENBQUMsQ0FBQztZQUVsRixNQUFNLFVBQVUsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDO1lBQzFDLE1BQU0saUJBQWlCLEdBQUcsZUFBZSxDQUFDLGFBQWEsQ0FBQztZQUV4RCxVQUFVLENBQUMsS0FBSyxHQUFHLFFBQVEsQ0FBQyxXQUFXLENBQUM7WUFDeEMsaUJBQWlCLENBQUMsS0FBSyxHQUFHLFFBQVEsQ0FBQyxrQkFBa0IsQ0FBQztZQUV0RCxVQUFVLENBQUMsYUFBYSxDQUFDLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7WUFDN0MsaUJBQWlCLENBQUMsYUFBYSxDQUFDLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7WUFFcEQsTUFBTSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1lBRXBELE1BQU0sQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLFVBQVUsRUFBRSxDQUFDO1lBQzFDLFFBQVEsbUNBQ0gsUUFBUSxLQUNYLGFBQWEsRUFBRSxTQUFTLEdBQ3pCLENBQUM7WUFDRixTQUFTLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQzNCLE1BQU0sQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLENBQUMsb0JBQW9CLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDbEUsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ04sQ0FBQyxDQUFDLENBQUMifQ==