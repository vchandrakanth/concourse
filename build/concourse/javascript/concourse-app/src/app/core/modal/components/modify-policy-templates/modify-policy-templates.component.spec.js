"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@angular/core/testing");
const dynamic_form_1 = require("@concourse/shared/dynamic-form");
const shared_module_1 = require("@concourse/shared/shared.module");
const angular_fontawesome_1 = require("@fortawesome/angular-fontawesome");
const store_1 = require("@ngrx/store");
const facades_1 = require("@concourse/store/facades");
const test_1 = require("@concourse/test");
const modify_policy_templates_component_1 = require("./modify-policy-templates.component");
describe('ModifyPolicyTemplatesComponent', () => {
    let component;
    let fixture;
    beforeEach(testing_1.async(() => {
        testing_1.TestBed.configureTestingModule({
            imports: [
                shared_module_1.SharedModule,
                angular_fontawesome_1.FontAwesomeModule,
                store_1.StoreModule.forRoot({}),
                dynamic_form_1.DynamicFormModule
            ],
            providers: [
                test_1.mockFacade(facades_1.ApplicationErrorFacade),
                test_1.mockFacade(facades_1.PolicyGroupTemplateFacade),
                test_1.mockFacade(facades_1.PolicyTemplateFacade)
            ],
            declarations: [modify_policy_templates_component_1.ModifyPolicyTemplatesComponent]
        })
            .compileComponents();
    }));
    beforeEach(() => {
        fixture = testing_1.TestBed.createComponent(modify_policy_templates_component_1.ModifyPolicyTemplatesComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kaWZ5LXBvbGljeS10ZW1wbGF0ZXMuY29tcG9uZW50LnNwZWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9jb25jb3Vyc2UvamF2YXNjcmlwdC9jb25jb3Vyc2UtYXBwL3NyYy9hcHAvY29yZS9tb2RhbC9jb21wb25lbnRzL21vZGlmeS1wb2xpY3ktdGVtcGxhdGVzL21vZGlmeS1wb2xpY3ktdGVtcGxhdGVzLmNvbXBvbmVudC5zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsbURBQXlFO0FBQ3pFLGlFQUFtRTtBQUNuRSxtRUFBK0Q7QUFDL0QsMEVBQXFFO0FBQ3JFLHVDQUEwQztBQUUxQyxzREFBbUg7QUFDbkgsMENBQTZDO0FBQzdDLDJGQUFxRjtBQUVyRixRQUFRLENBQUMsZ0NBQWdDLEVBQUUsR0FBRyxFQUFFO0lBQzlDLElBQUksU0FBeUMsQ0FBQztJQUM5QyxJQUFJLE9BQXlELENBQUM7SUFFOUQsVUFBVSxDQUFDLGVBQUssQ0FBQyxHQUFHLEVBQUU7UUFDcEIsaUJBQU8sQ0FBQyxzQkFBc0IsQ0FBQztZQUM3QixPQUFPLEVBQUU7Z0JBQ1AsNEJBQVk7Z0JBQ1osdUNBQWlCO2dCQUNqQixtQkFBVyxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUM7Z0JBQ3ZCLGdDQUFpQjthQUNsQjtZQUNELFNBQVMsRUFBRTtnQkFDVCxpQkFBVSxDQUFDLGdDQUFzQixDQUFDO2dCQUNsQyxpQkFBVSxDQUFDLG1DQUF5QixDQUFDO2dCQUNyQyxpQkFBVSxDQUFDLDhCQUFvQixDQUFDO2FBQ2pDO1lBQ0QsWUFBWSxFQUFFLENBQUMsa0VBQThCLENBQUM7U0FDL0MsQ0FBQzthQUNDLGlCQUFpQixFQUFFLENBQUM7SUFDekIsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUVKLFVBQVUsQ0FBQyxHQUFHLEVBQUU7UUFDZCxPQUFPLEdBQUcsaUJBQU8sQ0FBQyxlQUFlLENBQUMsa0VBQThCLENBQUMsQ0FBQztRQUNsRSxTQUFTLEdBQUcsT0FBTyxDQUFDLGlCQUFpQixDQUFDO1FBQ3RDLE9BQU8sQ0FBQyxhQUFhLEVBQUUsQ0FBQztJQUMxQixDQUFDLENBQUMsQ0FBQztJQUVILEVBQUUsQ0FBQyxlQUFlLEVBQUUsR0FBRyxFQUFFO1FBQ3ZCLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQyxVQUFVLEVBQUUsQ0FBQztJQUNqQyxDQUFDLENBQUMsQ0FBQztBQUNMLENBQUMsQ0FBQyxDQUFDIn0=