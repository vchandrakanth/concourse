"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const testing_1 = require("@angular/core/testing");
const forms_1 = require("@angular/forms");
const angular_fontawesome_1 = require("@fortawesome/angular-fontawesome");
const store_1 = require("@ngrx/store");
const ngx_bootstrap_1 = require("ngx-bootstrap");
const alert_1 = require("ngx-bootstrap/alert");
const dynamic_form_1 = require("@concourse/shared/dynamic-form");
const multi_step_form_module_1 = require("@concourse/shared/multi-part-form/multi-step-form.module");
const shared_module_1 = require("@concourse/shared/shared.module");
const facades_1 = require("@concourse/store/facades");
const test_1 = require("@concourse/test");
const create_policy_group_template_component_1 = require("./create-policy-group-template.component");
describe('CreatePolicyGroupTemplateComponent', () => {
    let component;
    let fixture;
    beforeEach(testing_1.async(() => {
        testing_1.TestBed.configureTestingModule({
            schemas: [core_1.NO_ERRORS_SCHEMA],
            imports: [
                forms_1.ReactiveFormsModule,
                angular_fontawesome_1.FontAwesomeModule,
                store_1.StoreModule.forRoot({}),
                alert_1.AlertModule.forRoot(),
                ngx_bootstrap_1.TabsModule.forRoot(),
                dynamic_form_1.DynamicFormModule,
                multi_step_form_module_1.MultiStepFormModule,
                shared_module_1.SharedModule
            ],
            declarations: [
                create_policy_group_template_component_1.CreatePolicyGroupTemplateComponent
            ],
            providers: [
                test_1.mockFacade(facades_1.PolicyTemplateFacade),
                test_1.mockFacade(facades_1.PolicyGroupTemplateFacade),
                test_1.mockFacade(facades_1.ApplicationErrorFacade)
            ]
        })
            .compileComponents();
    }));
    beforeEach(() => {
        fixture = testing_1.TestBed.createComponent(create_policy_group_template_component_1.CreatePolicyGroupTemplateComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRlLXBvbGljeS1ncm91cC10ZW1wbGF0ZS5jb21wb25lbnQuc3BlYy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL2NvbmNvdXJzZS9qYXZhc2NyaXB0L2NvbmNvdXJzZS1hcHAvc3JjL2FwcC9jb3JlL21vZGFsL2NvbXBvbmVudHMvY3JlYXRlLXBvbGljeS1ncm91cC10ZW1wbGF0ZS9jcmVhdGUtcG9saWN5LWdyb3VwLXRlbXBsYXRlLmNvbXBvbmVudC5zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsd0NBQWlEO0FBQ2pELG1EQUF5RTtBQUN6RSwwQ0FBcUQ7QUFDckQsMEVBQXFFO0FBQ3JFLHVDQUEwQztBQUMxQyxpREFBMkM7QUFDM0MsK0NBQWtEO0FBRWxELGlFQUFtRTtBQUNuRSxxR0FBK0Y7QUFDL0YsbUVBQStEO0FBQy9ELHNEQUFtSDtBQUNuSCwwQ0FBNkM7QUFDN0MscUdBQThGO0FBRTlGLFFBQVEsQ0FBQyxvQ0FBb0MsRUFBRSxHQUFHLEVBQUU7SUFDbEQsSUFBSSxTQUE2QyxDQUFDO0lBQ2xELElBQUksT0FBNkQsQ0FBQztJQUVsRSxVQUFVLENBQUMsZUFBSyxDQUFDLEdBQUcsRUFBRTtRQUNwQixpQkFBTyxDQUFDLHNCQUFzQixDQUFDO1lBQzdCLE9BQU8sRUFBRSxDQUFDLHVCQUFnQixDQUFDO1lBQzNCLE9BQU8sRUFBRTtnQkFDUCwyQkFBbUI7Z0JBQ25CLHVDQUFpQjtnQkFDakIsbUJBQVcsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDO2dCQUN2QixtQkFBVyxDQUFDLE9BQU8sRUFBRTtnQkFDckIsMEJBQVUsQ0FBQyxPQUFPLEVBQUU7Z0JBQ3BCLGdDQUFpQjtnQkFDakIsNENBQW1CO2dCQUNuQiw0QkFBWTthQUNiO1lBQ0QsWUFBWSxFQUFFO2dCQUNaLDJFQUFrQzthQUNuQztZQUNELFNBQVMsRUFBRTtnQkFDVCxpQkFBVSxDQUFDLDhCQUFvQixDQUFDO2dCQUNoQyxpQkFBVSxDQUFDLG1DQUF5QixDQUFDO2dCQUNyQyxpQkFBVSxDQUFDLGdDQUFzQixDQUFDO2FBQ25DO1NBQ0YsQ0FBQzthQUNDLGlCQUFpQixFQUFFLENBQUM7SUFDekIsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUVKLFVBQVUsQ0FBQyxHQUFHLEVBQUU7UUFDZCxPQUFPLEdBQUcsaUJBQU8sQ0FBQyxlQUFlLENBQUMsMkVBQWtDLENBQUMsQ0FBQztRQUN0RSxTQUFTLEdBQUcsT0FBTyxDQUFDLGlCQUFpQixDQUFDO1FBQ3RDLE9BQU8sQ0FBQyxhQUFhLEVBQUUsQ0FBQztJQUMxQixDQUFDLENBQUMsQ0FBQztJQUVILEVBQUUsQ0FBQyxlQUFlLEVBQUUsR0FBRyxFQUFFO1FBQ3ZCLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQyxVQUFVLEVBQUUsQ0FBQztJQUNqQyxDQUFDLENBQUMsQ0FBQztBQUNMLENBQUMsQ0FBQyxDQUFDIn0=