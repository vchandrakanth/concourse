"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = require("@angular/common/http");
const testing_1 = require("@angular/core/testing");
const platform_browser_1 = require("@angular/platform-browser");
const store_1 = require("@ngrx/store");
const rxjs_1 = require("rxjs");
const dynamic_form_1 = require("@concourse/shared/dynamic-form");
const shared_module_1 = require("@concourse/shared/shared.module");
const facades_1 = require("@concourse/store/facades");
const institution_service_1 = require("@concourse/store/institution/services/institution.service");
const test_1 = require("@concourse/test");
const register_inst_component_1 = require("./register-inst.component");
// TODO: Need to update test cases.
xdescribe('RegisterInstComponent', () => {
    let component;
    let fixture;
    let instFacade;
    const mockInstitution = {
        name: 'test',
        institutionName: 'concourse',
        alias: 'Concourse1',
        community: 'test community',
        description: 'test description',
        websiteName: 'www.concoursehub.com',
        phone: '99999999999',
        accountEmail: 'bhargavi@concoursehub.com',
        password: 'Test@123',
        confirmPassword: 'Test@123',
        tags: 'test'
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
                test_1.mockFacade(facades_1.InstitutionFacade, {
                    getValidateInfo$: new rxjs_1.BehaviorSubject({ token: '123', name: 'test', email: 'test@concoursehub.com' }),
                    isUpdating$: new rxjs_1.BehaviorSubject(true),
                    successResp$: new rxjs_1.BehaviorSubject(false)
                }),
                test_1.mockFacade(facades_1.ApplicationErrorFacade),
                test_1.mockFacade(institution_service_1.InstitutionService)
            ],
            declarations: [register_inst_component_1.RegisterInstComponent]
        })
            .compileComponents();
        instFacade = testing_1.TestBed.get(facades_1.InstitutionFacade);
    }));
    beforeEach(() => {
        fixture = testing_1.TestBed.createComponent(register_inst_component_1.RegisterInstComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
    it('should register an institution', testing_1.async(() => {
        fixture.detectChanges();
        expect(component.registrationForm.valid).toBeFalsy();
        fixture.whenStable().then(() => {
            const name = fixture.debugElement.query(platform_browser_1.By.css('#name'));
            const institutionName = fixture.debugElement.query(platform_browser_1.By.css('#institutionName'));
            const alias = fixture.debugElement.query(platform_browser_1.By.css('#alias'));
            const community = fixture.debugElement.query(platform_browser_1.By.css('#community'));
            const description = fixture.debugElement.query(platform_browser_1.By.css('#description'));
            const websiteName = fixture.debugElement.query(platform_browser_1.By.css('#websiteName'));
            const phone = fixture.debugElement.query(platform_browser_1.By.css('#phone'));
            const accountEmail = fixture.debugElement.query(platform_browser_1.By.css('#accountEmail'));
            const password = fixture.debugElement.query(platform_browser_1.By.css('#password'));
            const confirmPassword = fixture.debugElement.query(platform_browser_1.By.css('#confirmPassword'));
            const tags = fixture.debugElement.query(platform_browser_1.By.css('#tags'));
            const nameEl = name.nativeElement;
            const institutionNameEl = institutionName.nativeElement;
            const institutionAliasEl = alias.nativeElement;
            const communityEl = community.nativeElement;
            const descriptionEl = description.nativeElement;
            const websiteNameEl = websiteName.nativeElement;
            const phoneEl = phone.nativeElement;
            const accountEmailEl = accountEmail.nativeElement;
            const passwordEl = password.nativeElement;
            const confirmPasswordEl = confirmPassword.nativeElement;
            const tagsEl = tags.nativeElement;
            nameEl.value = mockInstitution.name;
            institutionNameEl.value = mockInstitution.institutionName;
            institutionAliasEl.value = mockInstitution.alias;
            communityEl.value = mockInstitution.community;
            descriptionEl.value = mockInstitution.description;
            websiteNameEl.value = mockInstitution.websiteName;
            phoneEl.value = mockInstitution.phone;
            accountEmailEl.value = mockInstitution.accountEmail;
            passwordEl.value = mockInstitution.password;
            confirmPasswordEl.value = mockInstitution.confirmPassword;
            tagsEl.value = mockInstitution.tags;
            nameEl.dispatchEvent(new Event('input'));
            institutionNameEl.dispatchEvent(new Event('input'));
            institutionAliasEl.dispatchEvent(new Event('input'));
            communityEl.dispatchEvent(new Event('input'));
            descriptionEl.dispatchEvent(new Event('input'));
            websiteNameEl.dispatchEvent(new Event('input'));
            phoneEl.dispatchEvent(new Event('input'));
            accountEmailEl.dispatchEvent(new Event('input'));
            passwordEl.dispatchEvent(new Event('input'));
            confirmPasswordEl.dispatchEvent(new Event('input'));
            tagsEl.dispatchEvent(new Event('input'));
            expect(nameEl.value).toBe(mockInstitution.name);
            expect(institutionNameEl.value).toBe(mockInstitution.institutionName);
            expect(component.registrationForm.valid).toBeTruthy();
            component.submit('123');
            expect(instFacade.register).toHaveBeenCalledWith(mockInstitution, '123');
        });
    }));
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVnaXN0ZXItaW5zdC5jb21wb25lbnQuc3BlYy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL2NvbmNvdXJzZS9qYXZhc2NyaXB0L2NvbmNvdXJzZS1hcHAvc3JjL2FwcC9pbnN0aXR1dGlvbi9yZWdpc3Rlci1pbnN0L3JlZ2lzdGVyLWluc3QuY29tcG9uZW50LnNwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSwrQ0FBd0Q7QUFDeEQsbURBQXlFO0FBQ3pFLGdFQUErQztBQUMvQyx1Q0FBMEM7QUFDMUMsK0JBQXVDO0FBRXZDLGlFQUFtRTtBQUNuRSxtRUFBK0Q7QUFDL0Qsc0RBQXFGO0FBQ3JGLG1HQUErRjtBQUMvRiwwQ0FBNkM7QUFDN0MsdUVBQWtFO0FBQ2xFLG1DQUFtQztBQUNuQyxTQUFTLENBQUMsdUJBQXVCLEVBQUUsR0FBRyxFQUFFO0lBQ3RDLElBQUksU0FBZ0MsQ0FBQztJQUNyQyxJQUFJLE9BQWdELENBQUM7SUFDckQsSUFBSSxVQUE2QixDQUFDO0lBQ2xDLE1BQU0sZUFBZSxHQUFHO1FBQ3RCLElBQUksRUFBRSxNQUFNO1FBQ1osZUFBZSxFQUFFLFdBQVc7UUFDNUIsS0FBSyxFQUFFLFlBQVk7UUFDbkIsU0FBUyxFQUFFLGdCQUFnQjtRQUMzQixXQUFXLEVBQUUsa0JBQWtCO1FBQy9CLFdBQVcsRUFBRSxzQkFBc0I7UUFDbkMsS0FBSyxFQUFFLGFBQWE7UUFDcEIsWUFBWSxFQUFFLDJCQUEyQjtRQUN6QyxRQUFRLEVBQUUsVUFBVTtRQUNwQixlQUFlLEVBQUUsVUFBVTtRQUMzQixJQUFJLEVBQUUsTUFBTTtLQUNiLENBQUM7SUFFRixVQUFVLENBQUMsZUFBSyxDQUFDLEdBQUcsRUFBRTtRQUNwQixpQkFBTyxDQUFDLHNCQUFzQixDQUFDO1lBQzdCLE9BQU8sRUFBRTtnQkFDUCx1QkFBZ0I7Z0JBQ2hCLGdDQUFpQjtnQkFDakIsbUJBQVcsQ0FBQyxPQUFPLENBQUMsRUFB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