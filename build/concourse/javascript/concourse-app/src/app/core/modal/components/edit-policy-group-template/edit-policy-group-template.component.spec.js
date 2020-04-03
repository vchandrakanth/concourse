"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const testing_1 = require("@angular/core/testing");
const dynamic_form_1 = require("@concourse/shared/dynamic-form");
const angular_fontawesome_1 = require("@fortawesome/angular-fontawesome");
const store_1 = require("@ngrx/store");
const alert_1 = require("ngx-bootstrap/alert");
const facades_1 = require("@concourse/store/facades");
const test_1 = require("@concourse/test");
const edit_policy_group_template_component_1 = require("./edit-policy-group-template.component");
describe('EditPolicyGroupTemplateComponent', () => {
    let component;
    let fixture;
    beforeEach(testing_1.async(() => {
        testing_1.TestBed.configureTestingModule({
            schemas: [core_1.NO_ERRORS_SCHEMA],
            imports: [
                store_1.StoreModule.forRoot({}),
                angular_fontawesome_1.FontAwesomeModule,
                dynamic_form_1.DynamicFormModule,
                alert_1.AlertModule.forRoot()
            ],
            providers: [
                test_1.mockFacade(facades_1.PolicyGroupTemplateFacade)
            ],
            declarations: [edit_policy_group_template_component_1.EditPolicyGroupTemplateComponent]
        })
            .compileComponents();
    }));
    beforeEach(() => {
        fixture = testing_1.TestBed.createComponent(edit_policy_group_template_component_1.EditPolicyGroupTemplateComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWRpdC1wb2xpY3ktZ3JvdXAtdGVtcGxhdGUuY29tcG9uZW50LnNwZWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9jb25jb3Vyc2UvamF2YXNjcmlwdC9jb25jb3Vyc2UtYXBwL3NyYy9hcHAvY29yZS9tb2RhbC9jb21wb25lbnRzL2VkaXQtcG9saWN5LWdyb3VwLXRlbXBsYXRlL2VkaXQtcG9saWN5LWdyb3VwLXRlbXBsYXRlLmNvbXBvbmVudC5zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsd0NBQWlEO0FBQ2pELG1EQUF5RTtBQUN6RSxpRUFBbUU7QUFDbkUsMEVBQXFFO0FBQ3JFLHVDQUEwQztBQUMxQywrQ0FBa0Q7QUFFbEQsc0RBQXFFO0FBQ3JFLDBDQUE2QztBQUM3QyxpR0FBMEY7QUFFMUYsUUFBUSxDQUFDLGtDQUFrQyxFQUFFLEdBQUcsRUFBRTtJQUNoRCxJQUFJLFNBQTJDLENBQUM7SUFDaEQsSUFBSSxPQUEyRCxDQUFDO0lBRWhFLFVBQVUsQ0FBQyxlQUFLLENBQUMsR0FBRyxFQUFFO1FBQ3BCLGlCQUFPLENBQUMsc0JBQXNCLENBQUM7WUFDN0IsT0FBTyxFQUFFLENBQUMsdUJBQWdCLENBQUM7WUFDM0IsT0FBTyxFQUFFO2dCQUNQLG1CQUFXLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQztnQkFDdkIsdUNBQWlCO2dCQUNqQixnQ0FBaUI7Z0JBQ2pCLG1CQUFXLENBQUMsT0FBTyxFQUFFO2FBQ3RCO1lBQ0QsU0FBUyxFQUFFO2dCQUNULGlCQUFVLENBQUMsbUNBQXlCLENBQUM7YUFDdEM7WUFDRCxZQUFZLEVBQUUsQ0FBQyx1RUFBZ0MsQ0FBQztTQUNqRCxDQUFDO2FBQ0MsaUJBQWlCLEVBQUUsQ0FBQztJQUN6QixDQUFDLENBQUMsQ0FBQyxDQUFDO0lBRUosVUFBVSxDQUFDLEdBQUcsRUFBRTtRQUNkLE9BQU8sR0FBRyxpQkFBTyxDQUFDLGVBQWUsQ0FBQyx1RUFBZ0MsQ0FBQyxDQUFDO1FBQ3BFLFNBQVMsR0FBRyxPQUFPLENBQUMsaUJBQWlCLENBQUM7UUFDdEMsT0FBTyxDQUFDLGFBQWEsRUFBRSxDQUFDO0lBQzFCLENBQUMsQ0FBQyxDQUFDO0lBRUgsRUFBRSxDQUFDLGVBQWUsRUFBRSxHQUFHLEVBQUU7UUFDdkIsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDLFVBQVUsRUFBRSxDQUFDO0lBQ2pDLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyxDQUFDLENBQUMifQ==