"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@angular/core/testing");
const forms_1 = require("@angular/forms");
const angular_fontawesome_1 = require("@fortawesome/angular-fontawesome");
const ng_select_1 = require("@ng-select/ng-select");
const store_1 = require("@ngrx/store");
const accordion_1 = require("ngx-bootstrap/accordion");
const ngx_pipes_1 = require("ngx-pipes");
const dynamic_form_1 = require("@concourse/shared/dynamic-form");
const multi_step_form_module_1 = require("@concourse/shared/multi-part-form/multi-step-form.module");
const policy_template_form_1 = require("@concourse/shared/policy-template-form");
const shared_module_1 = require("@concourse/shared/shared.module");
const facades_1 = require("@concourse/store/facades");
const test_1 = require("@concourse/test");
const create_policy_group_component_1 = require("./create-policy-group.component");
/**
 * FIXME
 * Something is severely wrong with this test/component.
 * It's wanting an http import which should only be used in services.
 * Needs further investigation as to why this is.
 */
xdescribe('CreatePolicyGroupComponent', () => {
    let component;
    let fixture;
    beforeEach(testing_1.async(() => {
        testing_1.TestBed.configureTestingModule({
            imports: [
                forms_1.ReactiveFormsModule,
                angular_fontawesome_1.FontAwesomeModule,
                store_1.StoreModule.forRoot({}),
                ng_select_1.NgSelectModule,
                accordion_1.AccordionModule.forRoot(),
                ngx_pipes_1.NgArrayPipesModule,
                ngx_pipes_1.NgStringPipesModule,
                dynamic_form_1.DynamicFormModule,
                multi_step_form_module_1.MultiStepFormModule,
                policy_template_form_1.PolicyTemplateFormModule,
                shared_module_1.SharedModule
            ],
            declarations: [
                create_policy_group_component_1.CreatePolicyGroupComponent
            ],
            providers: [
                test_1.mockFacade(facades_1.AttributeTagFacade),
                test_1.mockFacade(facades_1.PolicyGroupTemplateFacade),
                test_1.mockFacade(facades_1.SurfaceLayerFacade),
                test_1.mockFacade(facades_1.PolicyViolationFacade),
                test_1.mockFacade(facades_1.PolicyGroupFacade)
            ]
        })
            .compileComponents();
    }));
    beforeEach(() => {
        fixture = testing_1.TestBed.createComponent(create_policy_group_component_1.CreatePolicyGroupComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRlLXBvbGljeS1ncm91cC5jb21wb25lbnQuc3BlYy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL2NvbmNvdXJzZS9qYXZhc2NyaXB0L2NvbmNvdXJzZS1hcHAvc3JjL2FwcC9jb3JlL21vZGFsL2NvbXBvbmVudHMvY3JlYXRlLXBvbGljeS1ncm91cC9jcmVhdGUtcG9saWN5LWdyb3VwLmNvbXBvbmVudC5zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsbURBQXlFO0FBQ3pFLDBDQUFxRDtBQUNyRCwwRUFBcUU7QUFDckUsb0RBQXNEO0FBQ3RELHVDQUEwQztBQUMxQyx1REFBMEQ7QUFDMUQseUNBQW9FO0FBRXBFLGlFQUFtRTtBQUNuRSxxR0FBK0Y7QUFDL0YsaUZBQWtGO0FBQ2xGLG1FQUErRDtBQUMvRCxzREFBdUo7QUFDdkosMENBQTZDO0FBQzdDLG1GQUE2RTtBQUU3RTs7Ozs7R0FLRztBQUNILFNBQVMsQ0FBQyw0QkFBNEIsRUFBRSxHQUFHLEVBQUU7SUFDM0MsSUFBSSxTQUFxQyxDQUFDO0lBQzFDLElBQUksT0FBcUQsQ0FBQztJQUUxRCxVQUFVLENBQUMsZUFBSyxDQUFDLEdBQUcsRUFBRTtRQUNwQixpQkFBTyxDQUFDLHNCQUFzQixDQUFDO1lBQzdCLE9BQU8sRUFBRTtnQkFDUCwyQkFBbUI7Z0JBQ25CLHVDQUFpQjtnQkFDakIsbUJBQVcsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDO2dCQUN2QiwwQkFBYztnQkFDZCwyQkFBZSxDQUFDLE9BQU8sRUFBRTtnQkFDekIsOEJBQWtCO2dCQUNsQiwrQkFBbUI7Z0JBQ25CLGdDQUFpQjtnQkFDakIsNENBQW1CO2dCQUNuQiwrQ0FBd0I7Z0JBQ3hCLDRCQUFZO2FBQ2I7WUFDRCxZQUFZLEVBQUU7Z0JBQ1osMERBQTBCO2FBQzNCO1lBQ0QsU0FBUyxFQUFFO2dCQUNULGlCQUFVLENBQUMsNEJBQWtCLENBQUM7Z0JBQzlCLGlCQUFVLENBQUMsbUNBQXlCLENBQUM7Z0JBQ3JDLGlCQUFVLENBQUMsNEJBQWtCLENBQUM7Z0JBQzlCLGlCQUFVLENBQUMsK0JBQXFCLENBQUM7Z0JBQ2pDLGlCQUFVLENBQUMsMkJBQWlCLENBQUM7YUFDOUI7U0FDRixDQUFDO2FBQ0MsaUJBQWlCLEVBQUUsQ0FBQztJQUN6QixDQUFDLENBQUMsQ0FBQyxDQUFDO0lBRUosVUFBVSxDQUFDLEdBQUcsRUFBRTtRQUNkLE9BQU8sR0FBRyxpQkFBTyxDQUFDLGVBQWUsQ0FBQywwREFBMEIsQ0FBQyxDQUFDO1FBQzlELFNBQVMsR0FBRyxPQUFPLENBQUMsaUJBQWlCLENBQUM7UUFDdEMsT0FBTyxDQUFDLGFBQWEsRUFBRSxDQUFDO0lBQzFCLENBQUMsQ0FBQyxDQUFDO0lBRUgsRUFBRSxDQUFDLGVBQWUsRUFBRSxHQUFHLEVBQUU7UUFDdkIsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDLFVBQVUsRUFBRSxDQUFDO0lBQ2pDLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyxDQUFDLENBQUMifQ==