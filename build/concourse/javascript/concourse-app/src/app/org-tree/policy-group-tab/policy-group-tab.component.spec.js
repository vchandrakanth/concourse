"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@angular/core/testing");
const testing_2 = require("@angular/router/testing");
const angular_fontawesome_1 = require("@fortawesome/angular-fontawesome");
const store_1 = require("@ngrx/store");
const rxjs_1 = require("rxjs");
const shared_module_1 = require("@concourse/shared/shared.module");
const groupFaker = require("@concourse/store/group/services/group.faker");
const facades_1 = require("@concourse/store/facades");
const policyGroupTemplateFaker = require("@concourse/store/policy-group-template/services/policy-group-template.faker");
const policyGroupFaker = require("@concourse/store/policy-group/services/policy-group.faker");
const policyTemplateFaker = require("@concourse/store/policy-template/services/policy-template.faker");
const policyFaker = require("@concourse/store/policy/services/policy.faker");
const surfaceLayerFaker = require("@concourse/store/surface-layer/services/surface-layer.faker");
const test_1 = require("@concourse/test");
const policy_group_tab_component_1 = require("./policy-group-tab.component");
xdescribe('PolicyGroupTabComponent', () => {
    let component;
    let fixture;
    const surfaceLayers = surfaceLayerFaker.fakeMany();
    const policyTemplates = policyTemplateFaker.fakeAll();
    const policies = policyFaker.fakeMany(policyTemplates, groupFaker.fakeMany(), surfaceLayers);
    const policyGroupTemplates = policyGroupTemplateFaker.fakeMany(policyTemplates, 10);
    const policyGroups = policyGroupFaker.fakeMany(policyGroupTemplates, policies, surfaceLayers, [], groupFaker.fakeOne());
    beforeEach(testing_1.async(() => {
        testing_1.TestBed.configureTestingModule({
            imports: [
                testing_2.RouterTestingModule,
                angular_fontawesome_1.FontAwesomeModule,
                store_1.StoreModule.forRoot({}),
                shared_module_1.SharedModule
            ],
            providers: [
                test_1.mockFacade(facades_1.SurfaceLayerFacade, {
                    selectedWithChildren$: new rxjs_1.BehaviorSubject(surfaceLayers[0])
                }),
                test_1.mockFacade(facades_1.PolicyGroupFacade, {
                    listWithRelated$: new rxjs_1.BehaviorSubject(policyGroups)
                })
            ],
            declarations: [policy_group_tab_component_1.PolicyGroupTabComponent]
        })
            .compileComponents();
    }));
    beforeEach(() => {
        fixture = testing_1.TestBed.createComponent(policy_group_tab_component_1.PolicyGroupTabComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9saWN5LWdyb3VwLXRhYi5jb21wb25lbnQuc3BlYy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL2NvbmNvdXJzZS9qYXZhc2NyaXB0L2NvbmNvdXJzZS1hcHAvc3JjL2FwcC9vcmctdHJlZS9wb2xpY3ktZ3JvdXAtdGFiL3BvbGljeS1ncm91cC10YWIuY29tcG9uZW50LnNwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxtREFBeUU7QUFDekUscURBQThEO0FBQzlELDBFQUFxRTtBQUNyRSx1Q0FBMEM7QUFDMUMsK0JBQXVDO0FBRXZDLG1FQUErRDtBQUMvRCwwRUFBMEU7QUFDMUUsc0RBQWlGO0FBQ2pGLHdIQUF3SDtBQUN4SCw4RkFBOEY7QUFDOUYsdUdBQXVHO0FBQ3ZHLDZFQUE2RTtBQUM3RSxpR0FBaUc7QUFDakcsMENBQTZDO0FBQzdDLDZFQUF1RTtBQUV2RSxTQUFTLENBQUMseUJBQXlCLEVBQUUsR0FBRyxFQUFFO0lBQ3hDLElBQUksU0FBa0MsQ0FBQztJQUN2QyxJQUFJLE9BQWtELENBQUM7SUFDdkQsTUFBTSxhQUFhLEdBQUcsaUJBQWlCLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDbkQsTUFBTSxlQUFlLEdBQUcsbUJBQW1CLENBQUMsT0FBTyxFQUFFLENBQUM7SUFDdEQsTUFBTSxRQUFRLEdBQUcsV0FBVyxDQUFDLFFBQVEsQ0FBQyxlQUFlLEVBQUUsVUFBVSxDQUFDLFFBQVEsRUFBRSxFQUFFLGFBQWEsQ0FBQyxDQUFDO0lBQzdGLE1BQU0sb0JBQW9CLEdBQUcsd0JBQXdCLENBQUMsUUFBUSxDQUFDLGVBQWUsRUFBRSxFQUFFLENBQUMsQ0FBQztJQUNwRixNQUFNLFlBQVksR0FBRyxnQkFBZ0IsQ0FBQyxRQUFRLENBQUMsb0JBQW9CLEVBQUUsUUFBUSxFQUFFLGFBQWEsRUFBRSxFQUFFLEVBQUUsVUFBVSxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUM7SUFFeEgsVUFBVSxDQUFDLGVBQUssQ0FBQyxHQUFHLEVBQUU7UUFDcEIsaUJBQU8sQ0FBQyxzQkFBc0IsQ0FBQztZQUM3QixPQUFPLEVBQUU7Z0JBQ1AsNkJBQW1CO2dCQUNuQix1Q0FBaUI7Z0JBQ2pCLG1CQUFXLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQztnQkFDdkIsNEJBQVk7YUFDYjtZQUNELFNBQVMsRUFBRTtnQkFDVCxpQkFBVSxDQUFDLDRCQUFrQixFQUFFO29CQUM3QixxQkFBcUIsRUFBRSxJQUFJLHNCQUFlLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDO2lCQUM3RCxDQUFDO2dCQUNGLGlCQUFVLENBQUMsMkJBQWlCLEVBQUU7b0JBQzVCLGdCQUFnQixFQUFFLElBQUksc0JBQWUsQ0FBQyxZQUFZLENBQUM7aUJBQ3BELENBQUM7YUFDSDtZQUNELFlBQVksRUFBRSxDQUFDLG9EQUF1QixDQUFDO1NBQ3hDLENBQUM7YUFDQyxpQkFBaUIsRUFBRSxDQUFDO0lBQ3pCLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFFSixVQUFVLENBQUMsR0FBRyxFQUFFO1FBQ2QsT0FBTyxHQUFHLGlCQUFPLENBQUMsZUFBZSxDQUFDLG9EQUF1QixDQUFDLENBQUM7UUFDM0QsU0FBUyxHQUFHLE9BQU8sQ0FBQyxpQkFBaUIsQ0FBQztRQUN0QyxPQUFPLENBQUMsYUFBYSxFQUFFLENBQUM7SUFDMUIsQ0FBQyxDQUFDLENBQUM7SUFFSCxFQUFFLENBQUMsZUFBZSxFQUFFLEdBQUcsRUFBRTtRQUN2QixNQUFNLENBQUMsU0FBUyxDQUFDLENBQUMsVUFBVSxFQUFFLENBQUM7SUFDakMsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDLENBQUMsQ0FBQyJ9