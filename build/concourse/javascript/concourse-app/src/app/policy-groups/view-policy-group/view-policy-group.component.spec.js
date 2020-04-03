"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const testing_1 = require("@angular/core/testing");
const platform_browser_1 = require("@angular/platform-browser");
const testing_2 = require("@angular/router/testing");
const angular_fontawesome_1 = require("@fortawesome/angular-fontawesome");
const store_1 = require("@ngrx/store");
const alert_1 = require("ngx-bootstrap/alert");
const ngx_pipes_1 = require("ngx-pipes");
const rxjs_1 = require("rxjs");
const shared_module_1 = require("@concourse/shared/shared.module");
const facades_1 = require("@concourse/store/facades");
const fakeGroups = require("@concourse/store/group/services/group.faker");
const fakePolicyGroupTemplate = require("@concourse/store/policy-group-template/services/policy-group-template.faker");
const policy_group_faker_1 = require("@concourse/store/policy-group/services/policy-group.faker");
const policy_template_faker_1 = require("@concourse/store/policy-template/services/policy-template.faker");
const fakePolicies = require("@concourse/store/policy/services/policy.faker");
const fakeSurfaceLayers = require("@concourse/store/surface-layer/services/surface-layer.faker");
const test_1 = require("@concourse/test");
const view_policy_group_component_1 = require("./view-policy-group.component");
describe('ViewPolicyGroupComponent', () => {
    let component;
    let fixture;
    const surfaceLayers = fakeSurfaceLayers.fakeMany();
    const groups = fakeGroups.fakeMany();
    const pgt = fakePolicyGroupTemplate.fakeOne();
    const policies = fakePolicies.fakeMany(policy_template_faker_1.fakeAll(), groups, surfaceLayers);
    const mockPolicyGroup = policy_group_faker_1.fakeOne(pgt, policies, surfaceLayers, [], fakeGroups.fakeOne());
    beforeEach(testing_1.async(() => {
        const configure = testBed => {
            testBed.configureTestingModule({
                schemas: [core_1.NO_ERRORS_SCHEMA],
                imports: [
                    testing_2.RouterTestingModule,
                    angular_fontawesome_1.FontAwesomeModule,
                    ngx_pipes_1.NgStringPipesModule,
                    alert_1.AlertModule.forRoot(),
                    store_1.StoreModule.forRoot({}),
                    shared_module_1.SharedModule
                ],
                declarations: [view_policy_group_component_1.ViewPolicyGroupComponent],
                providers: [
                    test_1.mockFacade(facades_1.ModalStoreFacade),
                    test_1.mockFacade(facades_1.SurfaceFacade),
                    test_1.mockFacade(facades_1.AuthFacade),
                    test_1.mockFacade(facades_1.GroupFacade),
                    test_1.mockFacade(facades_1.AuditHistoryFacade, {
                        auditHistory$: new rxjs_1.BehaviorSubject([{
                                versionId: 1,
                                revisionId: 1,
                                revisionDate: new Date(),
                                revisionType: 'test',
                                revisionChanges: {}
                            }])
                    }),
                    test_1.mockFacade(facades_1.PolicyGroupFacade, {
                        selectedWithRelated$: new rxjs_1.BehaviorSubject(Object.assign(Object.assign({}, mockPolicyGroup), { approvalStatus: 'PENDING_UPDATE_APPROVAL', isLatest: true, owningGroup: fakeGroups.fakeOne() }))
                    }),
                    ...test_1.directiveProviders
                ]
            });
        };
        test_1.configureTests(configure).then(testBed => {
            fixture = testBed.createComponent(view_policy_group_component_1.ViewPolicyGroupComponent);
            component = fixture.componentInstance;
            fixture.detectChanges();
        });
    }));
    it('should create', () => {
        expect(component).toBeTruthy();
    });
    it('should display Policy Group details', () => {
        const name = fixture.debugElement.query(platform_browser_1.By.css('[data-e2e="policyGroupDetails"] h2')).nativeElement;
        expect(name.textContent).toEqual(`Overview for ${mockPolicyGroup.name}`);
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlldy1wb2xpY3ktZ3JvdXAuY29tcG9uZW50LnNwZWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9jb25jb3Vyc2UvamF2YXNjcmlwdC9jb25jb3Vyc2UtYXBwL3NyYy9hcHAvcG9saWN5LWdyb3Vwcy92aWV3LXBvbGljeS1ncm91cC92aWV3LXBvbGljeS1ncm91cC5jb21wb25lbnQuc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHdDQUFpRDtBQUNqRCxtREFBZ0U7QUFDaEUsZ0VBQStDO0FBQy9DLHFEQUE4RDtBQUM5RCwwRUFBcUU7QUFDckUsdUNBQTBDO0FBQzFDLCtDQUFrRDtBQUNsRCx5Q0FBZ0Q7QUFDaEQsK0JBQXVDO0FBRXZDLG1FQUErRDtBQUMvRCxzREFBMkk7QUFDM0ksMEVBQTBFO0FBQzFFLHVIQUF1SDtBQUN2SCxrR0FBb0Y7QUFDcEYsMkdBQTBGO0FBQzFGLDhFQUE4RTtBQUM5RSxpR0FBa0c7QUFDbEcsMENBQThGO0FBQzlGLCtFQUF5RTtBQUV6RSxRQUFRLENBQUMsMEJBQTBCLEVBQUUsR0FBRyxFQUFFO0lBQ3hDLElBQUksU0FBbUMsQ0FBQztJQUN4QyxJQUFJLE9BQW1ELENBQUM7SUFDeEQsTUFBTSxhQUFhLEdBQUcsaUJBQWlCLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDbkQsTUFBTSxNQUFNLEdBQUcsVUFBVSxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQ3JDLE1BQU0sR0FBRyxHQUFHLHVCQUF1QixDQUFDLE9BQU8sRUFBRSxDQUFDO0lBQzlDLE1BQU0sUUFBUSxHQUFHLFlBQVksQ0FBQyxRQUFRLENBQUMsK0JBQU8sRUFBRSxFQUFFLE1BQU0sRUFBRSxhQUFhLENBQUMsQ0FBQztJQUN6RSxNQUFNLGVBQWUsR0FBRyw0QkFBTyxDQUFDLEdBQUcsRUFBRSxRQUFRLEVBQUUsYUFBYSxFQUFFLEVBQUUsRUFBRSxVQUFVLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQztJQUV4RixVQUFVLENBQUMsZUFBSyxDQUFDLEdBQUcsRUFBRTtRQUNwQixNQUFNLFNBQVMsR0FBZ0IsT0FBTyxDQUFDLEVBQUU7WUFDdkMsT0FBTyxDQUFDLHNCQUFzQixDQUFDO2dCQUM3QixPQUFPLEVBQUUsQ0FBQyx1QkFBZ0IsQ0FBQztnQkFDM0IsT0FBTyxFQUFFO29CQUNQLDZCQUFtQjtvQkFDbkIsdUNBQWlCO29CQUNqQiwrQkFBbUI7b0JBQ25CLG1CQUFXLENBQUMsT0FBTyxFQUFFO29CQUNyQixtQkFBVyxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUM7b0JBQ3ZCLDRCQUFZO2lCQUNiO2dCQUNELFlBQVksRUFBRSxDQUFDLHNEQUF3QixDQUFDO2dCQUN4QyxTQUFTLEVBQUU7b0JBQ1QsaUJBQVUsQ0FBQywwQkFBZ0IsQ0FBQztvQkFDNUIsaUJBQVUsQ0FBQyx1QkFBYSxDQUFDO29CQUN6QixpQkFBVSxDQUFDLG9CQUFVLENBQUM7b0JBQ3RCLGlCQUFVLENBQUMscUJBQVcsQ0FBQztvQkFDdkIsaUJBQVUsQ0FBQyw0QkFBa0IsRUFBRTt3QkFDN0IsYUFBYSxFQUFFLElBQUksc0JBQWUsQ0FBQyxDQUFDO2dDQUNsQyxTQUFTLEVBQUUsQ0FBQztnQ0FDWixVQUFVLEVBQUUsQ0FBQztnQ0FDYixZQUFZLEVBQUUsSUFBSSxJQUFJLEVBQUU7Z0NBQ3hCLFlBQVksRUFBRSxNQUFNO2dDQUNwQixlQUFlLEVBQUUsRUFBRTs2QkFDcEIsQ0FBQyxDQUFDO3FCQUNKLENBQUM7b0JBQ0YsaUJBQVUsQ0FBQywyQkFBaUIsRUFBRTt3QkFDNUIsb0JBQW9CLEVBQUUsSUFBSSxzQkFBZSxpQ0FDcEMsZUFBZSxLQUNsQixjQUFjLEVBQUUseUJBQXlCLEVBQ3pDLFFBQVEsRUFBRSxJQUFJLEVBQ2QsV0FBVyxFQUFFLFVBQVUsQ0FBQyxPQUFPLEVBQUUsSUFDakM7cUJBQ0gsQ0FBQztvQkFDRixHQUFHLHlCQUFrQjtpQkFDdEI7YUFDRixDQUFDLENBQUM7UUFDTCxDQUFDLENBQUM7UUFFRixxQkFBYyxDQUFDLFNBQVMsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsRUFBRTtZQUN2QyxPQUFPLEdBQUcsT0FBTyxDQUFDLGVBQWUsQ0FBQyxzREFBd0IsQ0FBQyxDQUFDO1lBQzVELFNBQVMsR0FBRyxPQUFPLENBQUMsaUJBQWlCLENBQUM7WUFDdEMsT0FBTyxDQUFDLGFBQWEsRUFBRSxDQUFDO1FBQzFCLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUVKLEVBQUUsQ0FBQyxlQUFlLEVBQUUsR0FBRyxFQUFFO1FBQ3ZCLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQyxVQUFVLEVBQUUsQ0FBQztJQUNqQyxDQUFDLENBQUMsQ0FBQztJQUVILEVBQUUsQ0FBQyxxQ0FBcUMsRUFBRSxHQUFHLEVBQUU7UUFDN0MsTUFBTSxJQUFJLEdBQUcsT0FBTyxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMscUJBQUUsQ0FBQyxHQUFHLENBQUMsb0NBQW9DLENBQUMsQ0FBQyxDQUFDLGFBQTRCLENBQUM7UUFDbkgsTUFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLGVBQWUsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDO0lBQzNFLENBQUMsQ0FBQyxDQUFDO0FBRUwsQ0FBQyxDQUFDLENBQUMifQ==