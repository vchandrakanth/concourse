"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = require("@angular/common/http");
const core_1 = require("@angular/core");
const testing_1 = require("@angular/core/testing");
const platform_browser_1 = require("@angular/platform-browser");
const angular_fontawesome_1 = require("@fortawesome/angular-fontawesome");
const store_1 = require("@ngrx/store");
const alert_1 = require("ngx-bootstrap/alert");
const rxjs_1 = require("rxjs");
const dynamic_form_1 = require("@concourse/shared/dynamic-form");
const facades_1 = require("@concourse/store/facades");
const institution_service_1 = require("@concourse/store/institution/services/institution.service");
const invite_inst_component_1 = require("./invite-inst.component");
describe('InviteInstComponent', () => {
    let component;
    let fixture;
    let institutionFacade;
    const mockInstitution = {
        institutionName: 'test',
        accountEmail: 'bhargavi@concourselabs.com'
    };
    beforeEach(testing_1.async(() => {
        testing_1.TestBed.configureTestingModule({
            schemas: [core_1.NO_ERRORS_SCHEMA],
            imports: [
                http_1.HttpClientModule,
                dynamic_form_1.DynamicFormModule,
                angular_fontawesome_1.FontAwesomeModule,
                store_1.StoreModule.forRoot({}),
                alert_1.AlertModule.forRoot()
            ],
            providers: [
                {
                    provide: facades_1.InstitutionFacade,
                    useValue: {
                        invite: jest.fn(),
                        isUpdating$: rxjs_1.of(true),
                        error$: rxjs_1.of({ error: 'error' })
                    }
                },
                institution_service_1.InstitutionService
            ],
            declarations: [invite_inst_component_1.InviteInstComponent]
        })
            .compileComponents();
        institutionFacade = testing_1.TestBed.get(facades_1.InstitutionFacade);
    }));
    beforeEach(() => {
        fixture = testing_1.TestBed.createComponent(invite_inst_component_1.InviteInstComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
    it('should be invalid when no values exist in form', () => {
        expect(component.form.valid).toBeFalsy();
    });
    it('should invite institution with name and email', testing_1.async(() => {
        fixture.whenStable().then(() => {
            const name = fixture.debugElement.query(platform_browser_1.By.css('#institutionName'));
            const email = fixture.debugElement.query(platform_browser_1.By.css('#institutionEmail'));
            const nameEl = name.nativeElement;
            const emailEl = email.nativeElement;
            nameEl.value = mockInstitution.institutionName;
            emailEl.value = mockInstitution.accountEmail;
            nameEl.dispatchEvent(new Event('input'));
            emailEl.dispatchEvent(new Event('input'));
            expect(nameEl.value).toBe(mockInstitution.institutionName);
            expect(component.form.valid).toBeTruthy();
        });
    }));
    it('should invite institution', () => {
        component.submit(mockInstitution);
        expect(institutionFacade.invite).toHaveBeenCalledWith(mockInstitution);
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW52aXRlLWluc3QuY29tcG9uZW50LnNwZWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9jb25jb3Vyc2UvamF2YXNjcmlwdC9jb25jb3Vyc2UtYXBwL3NyYy9hcHAvY29yZS9tb2RhbC9jb21wb25lbnRzL2ludml0ZS1pbnN0L2ludml0ZS1pbnN0LmNvbXBvbmVudC5zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsK0NBQXdEO0FBQ3hELHdDQUFpRDtBQUNqRCxtREFBeUU7QUFDekUsZ0VBQStDO0FBQy9DLDBFQUFxRTtBQUNyRSx1Q0FBMEM7QUFDMUMsK0NBQWtEO0FBQ2xELCtCQUEwQjtBQUUxQixpRUFBbUU7QUFDbkUsc0RBQTZEO0FBQzdELG1HQUErRjtBQUMvRixtRUFBOEQ7QUFFOUQsUUFBUSxDQUFDLHFCQUFxQixFQUFFLEdBQUcsRUFBRTtJQUNuQyxJQUFJLFNBQThCLENBQUM7SUFDbkMsSUFBSSxPQUE4QyxDQUFDO0lBQ25ELElBQUksaUJBQW9DLENBQUM7SUFDekMsTUFBTSxlQUFlLEdBQUc7UUFDdEIsZUFBZSxFQUFFLE1BQU07UUFDdkIsWUFBWSxFQUFFLDRCQUE0QjtLQUMzQyxDQUFDO0lBRUYsVUFBVSxDQUFDLGVBQUssQ0FBQyxHQUFHLEVBQUU7UUFDcEIsaUJBQU8sQ0FBQyxzQkFBc0IsQ0FBQztZQUM3QixPQUFPLEVBQUUsQ0FBQyx1QkFBZ0IsQ0FBQztZQUMzQixPQUFPLEVBQUU7Z0JBQ1AsdUJBQWdCO2dCQUNoQixnQ0FBaUI7Z0JBQ2pCLHVDQUFpQjtnQkFDakIsbUJBQVcsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDO2dCQUN2QixtQkFBVyxDQUFDLE9BQU8sRUFBRTthQUN0QjtZQUNELFNBQVMsRUFBRTtnQkFDVDtvQkFDRSxPQUFPLEVBQUUsMkJBQWlCO29CQUMxQixRQUFRLEVBQUU7d0JBQ1IsTUFBTSxFQUFFLElBQUksQ0FBQyxFQUFFLEVB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