"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@angular/core/testing");
const test_1 = require("@concourse/test");
const forms_1 = require("@angular/forms");
const policy_template_form_v2_1 = require("@concourse/shared/policy-template-form-v2");
const shared_module_1 = require("@concourse/shared/shared.module");
const facades_1 = require("@concourse/store/facades");
const angular_fontawesome_1 = require("@fortawesome/angular-fontawesome");
const update_policy_group_v3_component_1 = require("./update-policy-group-v3.component");
const fakeGroups = require("@concourse/store/group/services/group.faker");
const fakePolicyGroupTemplate = require("@concourse/store/policy-group-template/services/policy-group-template.faker");
const policy_group_faker_1 = require("@concourse/store/policy-group/services/policy-group.faker");
const policy_template_faker_1 = require("@concourse/store/policy-template/services/policy-template.faker");
const fakePolicies = require("@concourse/store/policy/services/policy.faker");
const fakeSurfaceLayers = require("@concourse/store/surface-layer/services/surface-layer.faker");
const store_1 = require("@ngrx/store");
xdescribe('UpdatePolicyGroupV3Component', () => {
    let component;
    let fixture;
    const pgt = fakePolicyGroupTemplate.fakeOne();
    const surfaceLayers = fakeSurfaceLayers.fakeMany();
    const groups = fakeGroups.fakeMany();
    const policies = fakePolicies.fakeMany(policy_template_faker_1.fakeAll(), groups, surfaceLayers);
    const mockPolicyGroup = policy_group_faker_1.fakeOne(pgt, policies, surfaceLayers, [], fakeGroups.fakeOne());
    const policyGroup = {
        policies: []
    };
    beforeEach(testing_1.async(() => {
        testing_1.TestBed.configureTestingModule({
            declarations: [
                update_policy_group_v3_component_1.UpdatePolicyGroupV3Component
            ],
            imports: [
                shared_module_1.SharedModule,
                store_1.StoreModule.forRoot({}),
                angular_fontawesome_1.FontAwesomeModule,
                forms_1.ReactiveFormsModule,
                policy_template_form_v2_1.PolicyTemplateFormV2Module
            ],
            providers: [
                test_1.mockFacade(facades_1.ModalStoreFacade),
                facades_1.PolicyGroupFacade
            ]
        })
            .compileComponents();
    }));
    beforeEach(() => {
        fixture = testing_1.TestBed.createComponent(update_policy_group_v3_component_1.UpdatePolicyGroupV3Component);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXBkYXRlLXBvbGljeS1ncm91cC12My5jb21wb25lbnQuc3BlYy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL2NvbmNvdXJzZS9qYXZhc2NyaXB0L2NvbmNvdXJzZS1hcHAvc3JjL2FwcC9jb3JlL21vZGFsL2NvbXBvbmVudHMvdXBkYXRlLXBvbGljeS1ncm91cC12My91cGRhdGUtcG9saWN5LWdyb3VwLXYzLmNvbXBvbmVudC5zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsbURBQXlFO0FBQ3pFLDBDQUE2QztBQUU3QywwQ0FBcUQ7QUFDckQsdUZBQXVGO0FBQ3ZGLG1FQUErRDtBQUMvRCxzREFBK0U7QUFDL0UsMEVBQXFFO0FBRXJFLHlGQUFrRjtBQUdsRiwwRUFBMEU7QUFDMUUsdUhBQXVIO0FBQ3ZILGtHQUFvRjtBQUNwRiwyR0FBMEY7QUFDMUYsOEVBQThFO0FBQzlFLGlHQUFrRztBQUlsRyx1Q0FBMEM7QUFFMUMsU0FBUyxDQUFDLDhCQUE4QixFQUFFLEdBQUcsRUFBRTtJQUM3QyxJQUFJLFNBQXVDLENBQUM7SUFDNUMsSUFBSSxPQUF1RCxDQUFDO0lBRTVELE1BQU0sR0FBRyxHQUFHLHVCQUF1QixDQUFDLE9BQU8sRUFBRSxDQUFDO0lBQzlDLE1BQU0sYUFBYSxHQUFHLGlCQUFpQixDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQ25ELE1BQU0sTUFBTSxHQUFHLFVBQVUsQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUNyQyxNQUFNLFFBQVEsR0FBRyxZQUFZLENBQUMsUUFBUSxDQUFDLCtCQUFPLEVBQUUsRUFBRSxNQUFNLEVBQUUsYUFBYSxDQUFDLENBQUM7SUFDekUsTUFBTSxlQUFlLEdBQUcsNEJBQU8sQ0FBQyxHQUFHLEVBQUUsUUFBUSxFQUFFLGFBQWEsRUFBRSxFQUFFLEVBQUUsVUFBVSxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUM7SUFFeEYsTUFBTSxXQUFXLEdBQUc7UUFDbEIsUUFBUSxFQUFFLEVBQUU7S0FDYixDQUFDO0lBRUYsVUFBVSxDQUFDLGVBQUssQ0FBQyxHQUFHLEVBQUU7UUFDcEIsaUJBQU8sQ0FBQyxzQkFBc0IsQ0FBQztZQUM3QixZQUFZLEVBQUU7Z0JBQ1osK0RBQTRCO2FBQzdCO1lBQ0QsT0FBTyxFQUFFO2dCQUNQLDRCQUFZO2dCQUNaLG1CQUFXLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQztnQkFDdkIsdUNBQWlCO2dCQUNqQiwyQkFBbUI7Z0JBQ25CLG9EQUEwQjthQUMzQjtZQUNELFNBQVMsRUFBRTtnQkFDVCxpQkFBVSxDQUFDLDBCQUFnQixDQUFDO2dCQUU1QiwyQkFBaUI7YUFFbEI7U0FDRixDQUFDO2FBQ0MsaUJBQWlCLEVBQUUsQ0FBQztJQUN6QixDQUFDLENBQUMsQ0FBQyxDQUFDO0lBRUosVUFBVSxDQUFDLEdBQUcsRUFBRTtRQUNkLE9BQU8sR0FBRyxpQkFBTyxDQUFDLGVBQWUsQ0FBQywrREFBNEIsQ0FBQyxDQUFDO1FBQ2hFLFNBQVMsR0FBRyxPQUFPLENBQUMsaUJBQWlCLENBQUM7UUFDdEMsT0FBTyxDQUFDLGFBQWEsRUFBRSxDQUFDO0lBQzFCLENBQUMsQ0FBQyxDQUFDO0lBRUgsRUFBRSxDQUFDLGVBQWUsRUFBRSxHQUFHLEVBQUU7UUFFdkIsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDLFVBQVUsRUFBRSxDQUFDO0lBQ2pDLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyxDQUFDLENBQUMifQ==