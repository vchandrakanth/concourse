"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = require("@angular/common/http");
const testing_1 = require("@angular/core/testing");
const forms_1 = require("@angular/forms");
const platform_browser_1 = require("@angular/platform-browser");
const store_1 = require("@ngrx/store");
const rxjs_1 = require("rxjs");
const dynamic_form_1 = require("@concourse/shared/dynamic-form");
const shared_module_1 = require("@concourse/shared/shared.module");
const facades_1 = require("@concourse/store/facades");
const user_service_1 = require("@concourse/store/user/services/user.service");
const test_1 = require("@concourse/test");
const register_user_component_1 = require("./register-user.component");
xdescribe('RegisterUserComponent', () => {
    let component;
    let fixture;
    let userFacade;
    const mockUser = {
        name: 'test',
        email: 'abhinav@concoursehub.com',
        password: 'Test@123',
        confirmPassword: 'Test@123'
    };
    beforeEach(testing_1.async(() => {
        testing_1.TestBed.configureTestingModule({
            imports: [
                http_1.HttpClientModule,
                dynamic_form_1.DynamicFormModule,
                store_1.StoreModule.forRoot({}),
                forms_1.FormsModule,
                forms_1.ReactiveFormsModule,
                shared_module_1.SharedModule
            ],
            providers: [
                test_1.mockFacade(facades_1.ApplicationErrorFacade),
                test_1.mockFacade(facades_1.UserFacade, {
                    isRegistrationSuccess$: new rxjs_1.BehaviorSubject(false),
                    email$: new rxjs_1.BehaviorSubject(mockUser.email),
                    token$: new rxjs_1.BehaviorSubject('test123'),
                    authType$: new rxjs_1.BehaviorSubject('BASIC'),
                    isUpdating$: new rxjs_1.BehaviorSubject(false)
                }),
                user_service_1.UserService
            ],
            declarations: [register_user_component_1.RegisterUserComponent]
        })
            .compileComponents();
        userFacade = testing_1.TestBed.get(facades_1.UserFacade);
    }));
    beforeEach(() => {
        fixture = testing_1.TestBed.createComponent(register_user_component_1.RegisterUserComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
    it('should register an User', testing_1.async(() => {
        fixture.detectChanges();
        expect(component.form.valid).toBeFalsy();
        fixture.whenStable().then(() => {
            const name = component.form.get('name');
            const email = component.form.get('email');
            const password = component.form.get('password');
            const cPassword = component.form.get('confirmPassword');
            name.setValue(mockUser.name);
            password.setValue(mockUser.password);
            cPassword.setValue(mockUser.password);
            expect(component.form.valid).toBeTruthy();
            const submitButton = fixture.debugElement.query(platform_browser_1.By.css('.btn-primary')).nativeElement;
            submitButton.click();
            expect(userFacade.register).toHaveBeenCalledWith('test123', mockUser);
        });
    }));
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVnaXN0ZXItdXNlci5jb21wb25lbnQuc3BlYy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL2NvbmNvdXJzZS9qYXZhc2NyaXB0L2NvbmNvdXJzZS1hcHAvc3JjL2FwcC91c2VyL3JlZ2lzdGVyLXVzZXIvcmVnaXN0ZXItdXNlci5jb21wb25lbnQuc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLCtDQUF3RDtBQUN4RCxtREFBeUU7QUFDekUsMENBQWtFO0FBQ2xFLGdFQUErQztBQUMvQyx1Q0FBMEM7QUFDMUMsK0JBQXVDO0FBRXZDLGlFQUFtRTtBQUNuRSxtRUFBK0Q7QUFDL0Qsc0RBQThFO0FBQzlFLDhFQUEwRTtBQUMxRSwwQ0FBNkM7QUFDN0MsdUVBQWtFO0FBRWxFLFNBQVMsQ0FBQyx1QkFBdUIsRUFBRSxHQUFHLEVBQUU7SUFDdEMsSUFBSSxTQUFnQyxDQUFDO0lBQ3JDLElBQUksT0FBZ0QsQ0FBQztJQUNyRCxJQUFJLFVBQXNCLENBQUM7SUFDM0IsTUFBTSxRQUFRLEdBQUc7UUFDZixJQUFJLEVBQUUsTUFBTTtRQUNaLEtBQUssRUFBRSwwQkFBMEI7UUFDakMsUUFBUSxFQUFFLFVBQVU7UUFDcEIsZUFBZSxFQUFFLFVBQVU7S0FDNUIsQ0FBQztJQUVGLFVBQVUsQ0FBQyxlQUFLLENBQUMsR0FBRyxFQUFFO1FBQ3BCLGlCQUFPLENBQUMsc0JBQXNCLENBQUM7WUFDN0IsT0FBTyxFQUFFO2dCQUNQLHVCQUFnQjtnQkFDaEIsZ0NBQWlCO2dCQUNqQixtQkFBVyxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUM7Z0JBQ3ZCLG1CQUFXO2dCQUNYLDJCQUFtQjtnQkFDbkIsNEJBQVk7YUFDYjtZQUNELFNBQVMsRUFBRTtnQkFDVCxpQkFBVSxDQUFDLGdDQUFzQixDQUFDO2dCQUNsQyxpQkFBVSxDQUFDLG9CQUFVLEVBQUU7b0JBQ3JCLHNCQUFzQixFQUFFLElBQUksc0JBQWUsQ0FBQyxL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