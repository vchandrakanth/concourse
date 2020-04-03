"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const testing_1 = require("@angular/core/testing");
const forms_1 = require("@angular/forms");
const platform_browser_1 = require("@angular/platform-browser");
const ng_select_1 = require("@ng-select/ng-select");
const store_1 = require("@ngrx/store");
const alert_1 = require("ngx-bootstrap/alert");
const ngx_pipes_1 = require("ngx-pipes");
const dynamic_form_1 = require("@concourse/shared/dynamic-form");
const shared_module_1 = require("@concourse/shared/shared.module");
const facades_1 = require("@concourse/store/facades");
const test_1 = require("@concourse/test");
const create_institution_data_component_1 = require("./create-institution-data.component");
describe('CreateInstitutionDataComponent', () => {
    let component;
    let fixture;
    beforeEach(testing_1.async(() => {
        testing_1.TestBed.configureTestingModule({
            schemas: [core_1.NO_ERRORS_SCHEMA],
            imports: [
                forms_1.FormsModule,
                ng_select_1.NgSelectModule,
                ngx_pipes_1.NgStringPipesModule,
                store_1.StoreModule.forRoot({}),
                alert_1.AlertModule.forRoot(),
                shared_module_1.SharedModule,
                dynamic_form_1.DynamicFormModule
            ],
            providers: [
                test_1.mockFacade(facades_1.ApplicationErrorFacade),
                test_1.mockFacade(facades_1.CatalogServiceFacade),
                test_1.mockFacade(facades_1.InstitutionDataFacade),
                ...test_1.directiveProviders
            ],
            declarations: [create_institution_data_component_1.CreateInstitutionDataComponent]
        })
            .compileComponents();
    }));
    beforeEach(() => {
        fixture = testing_1.TestBed.createComponent(create_institution_data_component_1.CreateInstitutionDataComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
    it('should find app-alert-messages if error occurs', () => {
        const alertComponent = fixture.debugElement.query(platform_browser_1.By.css('app-alert-messages'));
        expect(alertComponent).toBeDefined();
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRlLWluc3RpdHV0aW9uLWRhdGEuY29tcG9uZW50LnNwZWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9jb25jb3Vyc2UvamF2YXNjcmlwdC9jb25jb3Vyc2UtYXBwL3NyYy9hcHAvY29yZS9tb2RhbC9jb21wb25lbnRzL2NyZWF0ZS1pbnN0aXR1dGlvbi1kYXRhL2NyZWF0ZS1pbnN0aXR1dGlvbi1kYXRhLmNvbXBvbmVudC5zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsd0NBQWlEO0FBQ2pELG1EQUF5RTtBQUN6RSwwQ0FBa0U7QUFDbEUsZ0VBQStDO0FBQy9DLG9EQUFzRDtBQUN0RCx1Q0FBMEM7QUFDMUMsK0NBQWtEO0FBQ2xELHlDQUFnRDtBQUVoRCxpRUFBbUU7QUFDbkUsbUVBQStEO0FBQy9ELHNEQUErRztBQUMvRywwQ0FBaUU7QUFDakUsMkZBQXFGO0FBRXJGLFFBQVEsQ0FBQyxnQ0FBZ0MsRUFBRSxHQUFHLEVBQUU7SUFDOUMsSUFBSSxTQUF5QyxDQUFDO0lBQzlDLElBQUksT0FBeUQsQ0FBQztJQUU5RCxVQUFVLENBQUMsZUFBSyxDQUFDLEdBQUcsRUFBRTtRQUNwQixpQkFBTyxDQUFDLHNCQUFzQixDQUFDO1lBQzdCLE9BQU8sRUFBRSxDQUFDLHVCQUFnQixDQUFDO1lBQzNCLE9BQU8sRUFBRTtnQkFDUCxtQkFBVztnQkFDWCwwQkFBYztnQkFDZCwrQkFBbUI7Z0JBQ25CLG1CQUFXLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQztnQkFDdkIsbUJBQVcsQ0FBQyxPQUFPLEVBQUU7Z0JBQ3JCLDRCQUFZO2dCQUNaLGdDQUFpQjthQUNsQjtZQUNELFNBQVMsRUFBRTtnQkFDVCxpQkFBVSxDQUFDLGdDQUFzQixDQUFDO2dCQUNsQyxpQkFBVSxDQUFDLDhCQUFvQixDQUFDO2dCQUNoQyxpQkFBVSxDQUFDLCtCQUFxQixDQUFDO2dCQUNqQyxHQUFHLHlCQUFrQjthQUN0QjtZQUNELFlBQVksRUFBRSxDQUFDLGtFQUE4QixDQUFDO1NBQy9DLENBQUM7YUFDQyxpQkFBaUIsRUFBRSxDQUFDO0lBQ3pCLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFFSixVQUFVLENBQUMsR0FBRyxFQUFFO1FBQ2QsT0FBTyxHQUFHLGlCQUFPLENBQUMsZUFBZSxDQUFDLGtFQUE4QixDQUFDLENBQUM7UUFDbEUsU0FBUyxHQUFHLE9BQU8sQ0FBQyxpQkFBaUIsQ0FBQztRQUN0QyxPQUFPLENBQUMsYUFBYSxFQUFFLENBQUM7SUFDMUIsQ0FBQyxDQUFDLENBQUM7SUFFSCxFQUFFLENBQUMsZUFBZSxFQUFFLEdBQUcsRUFBRTtRQUN2QixNQUFNLENBQUMsU0FBUyxDQUFDLENBQUMsVUFBVSxFQUFFLENBQUM7SUFDakMsQ0FBQyxDQUFDLENBQUM7SUFFSCxFQUFFLENBQUMsZ0RBQWdELEVBQUUsR0FBRyxFQUFFO1FBQ3hELE1BQU0sY0FBYyxHQUFHLE9BQU8sQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLHFCQUFFLENBQUMsR0FBRyxDQUFDLG9CQUFvQixDQUFDLENBQUMsQ0FBQztRQUNoRixNQUFNLENBQUMsY0FBYyxDQUFDLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDdkMsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDLENBQUMsQ0FBQyJ9