"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = require("@angular/common/http");
const core_1 = require("@angular/core");
const testing_1 = require("@angular/core/testing");
const platform_browser_1 = require("@angular/platform-browser");
const angular_fontawesome_1 = require("@fortawesome/angular-fontawesome");
const store_1 = require("@ngrx/store");
const dynamic_form_module_1 = require("@concourse/shared/dynamic-form/dynamic-form.module");
const shared_module_1 = require("@concourse/shared/shared.module");
const facades_1 = require("@concourse/store/facades");
const test_1 = require("@concourse/test");
const invite_user_component_1 = require("./invite-user.component");
xdescribe('InviteUserComponent', () => {
    let component;
    let fixture;
    let userFacade;
    const mockUser = { userEmail: 'test@gmail.com' };
    beforeEach(testing_1.async(() => {
        testing_1.TestBed.configureTestingModule({
            schemas: [core_1.NO_ERRORS_SCHEMA],
            imports: [
                http_1.HttpClientModule,
                dynamic_form_module_1.DynamicFormModule,
                angular_fontawesome_1.FontAwesomeModule,
                store_1.StoreModule.forRoot({}),
                shared_module_1.SharedModule
            ],
            providers: [
                test_1.mockFacade(facades_1.UserFacade)
            ],
            declarations: [invite_user_component_1.InviteUserComponent]
        })
            .compileComponents();
        userFacade = testing_1.TestBed.get(facades_1.UserFacade);
    }));
    beforeEach(() => {
        fixture = testing_1.TestBed.createComponent(invite_user_component_1.InviteUserComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
    it('should be enter userName', testing_1.async(() => {
        fixture.detectChanges();
        expect(component.form.valid).toBeFalsy();
        fixture.whenStable().then(() => {
            const email = fixture.debugElement.query(platform_browser_1.By.css('[data-e2e="email"]'));
            const emailEl = email.nativeElement;
            emailEl.value = mockUser.userEmail;
            emailEl.dispatchEvent(new Event('input'));
            expect(emailEl.value).toBe(mockUser.userEmail);
            expect(component.form.valid).toBeTruthy();
            component.submit();
            expect(userFacade.invite).toHaveBeenCalledWith(mockUser);
        });
    }));
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW52aXRlLXVzZXIuY29tcG9uZW50LnNwZWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9jb25jb3Vyc2UvamF2YXNjcmlwdC9jb25jb3Vyc2UtYXBwL3NyYy9hcHAvY29yZS9tb2RhbC9jb21wb25lbnRzL2ludml0ZS11c2VyL2ludml0ZS11c2VyLmNvbXBvbmVudC5zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsK0NBQXdEO0FBQ3hELHdDQUFpRDtBQUNqRCxtREFBeUU7QUFDekUsZ0VBQStDO0FBQy9DLDBFQUFxRTtBQUNyRSx1Q0FBMEM7QUFFMUMsNEZBQXVGO0FBQ3ZGLG1FQUErRDtBQUMvRCxzREFBc0Q7QUFDdEQsMENBQTZDO0FBQzdDLG1FQUE4RDtBQUU5RCxTQUFTLENBQUMscUJBQXFCLEVBQUUsR0FBRyxFQUFFO0lBQ3BDLElBQUksU0FBOEIsQ0FBQztJQUNuQyxJQUFJLE9BQThDLENBQUM7SUFDbkQsSUFBSSxVQUFzQixDQUFDO0lBQzNCLE1BQU0sUUFBUSxHQUFHLEVBQUUsU0FBUyxFQUFFLGdCQUFnQixFQUFFLENBQUM7SUFFakQsVUFBVSxDQUFDLGVBQUssQ0FBQyxHQUFHLEVBQUU7UUFDcEIsaUJBQU8sQ0FBQyxzQkFBc0IsQ0FBQztZQUM3QixPQUFPLEVBQUUsQ0FBQyx1QkFBZ0IsQ0FBQztZQUMzQixPQUFPLEVBQUU7Z0JBQ1AsdUJBQWdCO2dCQUNoQix1Q0FBaUI7Z0JBQ2pCLHVDQUFpQjtnQkFDakIsbUJBQVcsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDO2dCQUN2Qiw0QkFBWTthQUNiO1lBQ0QsU0FBUyxFQUFFO2dCQUNULGlCQUFVLENBQUMsb0JBQVUsQ0FBQzthQUN2QjtZQUNELFlBQVksRUFBRSxDQUFDLDJDQUFtQixDQUFDO1NBQ3BDLENBQUM7YUFDQyxpQkFBaUIsRUFBRSxDQUFDO1FBQ3ZCLFVBQVUsR0FBRyxpQkFBTyxDQUFDLEdBQUcsQ0FBQyxvQkFBVSxDQUFDLENBQUM7SUFFdkMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUVKLFVBQVUsQ0FBQyxHQUFHLEVBQUU7UUFDZCxPQUFPLEdBQUcsaUJBQU8sQ0FBQyxlQUFlLENBQUMsMkNBQW1CLENBQUMsQ0FBQztRQUN2RCxTQUFTLEdBQUcsT0FBTyxDQUFDLGlCQUFpQixDQUFDO1FBQ3RDLE9BQU8sQ0FBQyxhQUFhLEVBQUUsQ0FBQztJQUMxQixDQUFDLENBQUMsQ0FBQztJQUVILEVBQUUsQ0FBQyxlQUFlLEVBQUUsR0FBRyxFQUFFO1FBQ3ZCLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQyxVQUFVLEVBQUUsQ0FBQztJQUNqQyxDQUFDLENBQUMsQ0FBQztJQUVILEVBQUUsQ0FBQywwQkFBMEIsRUFBRSxlQUFLLENBQUMsR0FBRyxFQUFFO1FBQ3hDLE9BQU8sQ0FBQyxhQUFhLEVBQUUsQ0FBQztRQUN4QixNQUFNLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUN6QyxPQUFPLENBQUMsVUFBVSxFQUFFLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRTtZQUM3QixNQUFNLEtBQUssR0FBRyxPQUFPLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxxQkFBRSxDQUFDLEdBQUcsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLENBQUM7WUFFdkUsTUFBTSxPQUFPLEdBQUcsS0FBSyxDQUFDLGFBQWEsQ0FBQztZQUVwQyxPQUFPLENBQUMsS0FBSyxHQUFHLFFBQVEsQ0FBQyxTQUFTLENBQUM7WUFDbkMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1lBRTFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUMvQyxNQUFNLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxVQUFVLEVBQUUsQ0FBQztZQUUxQyxTQUFTLENBQUMsTUFBTSxFQUFFLENBQUM7WUFDbkIsTUFBTSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxvQkFBb0IsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUMzRCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFFTixDQUFDLENBQUMsQ0FBQyJ9