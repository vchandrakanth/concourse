"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@angular/core/testing");
const forms_1 = require("@angular/forms");
const angular_fontawesome_1 = require("@fortawesome/angular-fontawesome");
const store_1 = require("@ngrx/store");
const policy_template_form_1 = require("@concourse/shared/policy-template-form");
const shared_module_1 = require("@concourse/shared/shared.module");
const facades_1 = require("@concourse/store/facades");
const test_1 = require("@concourse/test");
const modify_policy_group_component_1 = require("./modify-policy-group.component");
/**
 * FIXME
 * Something is severely wrong with this test/component.
 * It's wanting an http import which should only be used in services.
 * Needs further investigation as to why this is.
 */
xdescribe('ModifyPolicyGroupComponent', () => {
    let component;
    let fixture;
    beforeEach(testing_1.async(() => {
        testing_1.TestBed.configureTestingModule({
            imports: [
                forms_1.ReactiveFormsModule,
                angular_fontawesome_1.FontAwesomeModule,
                store_1.StoreModule.forRoot({}),
                shared_module_1.SharedModule,
                policy_template_form_1.PolicyTemplateFormModule
            ],
            providers: [
                test_1.mockFacade(facades_1.PolicyGroupFacade),
                test_1.mockFacade(facades_1.PolicyTemplateFacade)
            ],
            declarations: [modify_policy_group_component_1.ModifyPolicyGroupComponent]
        })
            .compileComponents();
    }));
    beforeEach(() => {
        fixture = testing_1.TestBed.createComponent(modify_policy_group_component_1.ModifyPolicyGroupComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kaWZ5LXBvbGljeS1ncm91cC5jb21wb25lbnQuc3BlYy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL2NvbmNvdXJzZS9qYXZhc2NyaXB0L2NvbmNvdXJzZS1hcHAvc3JjL2FwcC9jb3JlL21vZGFsL2NvbXBvbmVudHMvbW9kaWZ5LXBvbGljeS1ncm91cC9tb2RpZnktcG9saWN5LWdyb3VwLmNvbXBvbmVudC5zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsbURBQXlFO0FBQ3pFLDBDQUFxRDtBQUNyRCwwRUFBcUU7QUFDckUsdUNBQTBDO0FBRTFDLGlGQUFrRjtBQUNsRixtRUFBK0Q7QUFDL0Qsc0RBQW1GO0FBQ25GLDBDQUE2QztBQUM3QyxtRkFBNkU7QUFFN0U7Ozs7O0dBS0c7QUFDSCxTQUFTLENBQUMsNEJBQTRCLEVBQUUsR0FBRyxFQUFFO0lBQzNDLElBQUksU0FBcUMsQ0FBQztJQUMxQyxJQUFJLE9BQXFELENBQUM7SUFFMUQsVUFBVSxDQUFDLGVBQUssQ0FBQyxHQUFHLEVBQUU7UUFDcEIsaUJBQU8sQ0FBQyxzQkFBc0IsQ0FBQztZQUM3QixPQUFPLEVBQUU7Z0JBQ1AsMkJBQW1CO2dCQUNuQix1Q0FBaUI7Z0JBQ2pCLG1CQUFXLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQztnQkFDdkIsNEJBQVk7Z0JBQ1osK0NBQXdCO2FBQ3pCO1lBQ0QsU0FBUyxFQUFFO2dCQUNULGlCQUFVLENBQUMsMkJBQWlCLENBQUM7Z0JBQzdCLGlCQUFVLENBQUMsOEJBQW9CLENBQUM7YUFDakM7WUFDRCxZQUFZLEVBQUUsQ0FBQywwREFBMEIsQ0FBQztTQUMzQyxDQUFDO2FBQ0MsaUJBQWlCLEVBQUUsQ0FBQztJQUN6QixDQUFDLENBQUMsQ0FBQyxDQUFDO0lBRUosVUFBVSxDQUFDLEdBQUcsRUFBRTtRQUNkLE9BQU8sR0FBRyxpQkFBTyxDQUFDLGVBQWUsQ0FBQywwREFBMEIsQ0FBQyxDQUFDO1FBQzlELFNBQVMsR0FBRyxPQUFPLENBQUMsaUJBQWlCLENBQUM7UUFDdEMsT0FBTyxDQUFDLGFBQWEsRUFBRSxDQUFDO0lBQzFCLENBQUMsQ0FBQyxDQUFDO0lBRUgsRUFBRSxDQUFDLGVBQWUsRUFBRSxHQUFHLEVBQUU7UUFDdkIsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDLFVBQVUsRUFBRSxDQUFDO0lBQ2pDLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyxDQUFDLENBQUMifQ==