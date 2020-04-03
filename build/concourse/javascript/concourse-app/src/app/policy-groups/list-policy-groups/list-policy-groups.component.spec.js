"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const testing_1 = require("@angular/core/testing");
const platform_browser_1 = require("@angular/platform-browser");
const testing_2 = require("@angular/router/testing");
const angular_fontawesome_1 = require("@fortawesome/angular-fontawesome");
const store_1 = require("@ngrx/store");
const ngx_pipes_1 = require("ngx-pipes");
const rxjs_1 = require("rxjs");
const dynamic_form_1 = require("@concourse/shared/dynamic-form");
const shared_module_1 = require("@concourse/shared/shared.module");
const facades_1 = require("@concourse/store/facades");
const fakeGroups = require("@concourse/store/group/services/group.faker");
const fakePolicyGroupTemplate = require("@concourse/store/policy-group-template/services/policy-group-template.faker");
const policy_group_faker_1 = require("@concourse/store/policy-group/services/policy-group.faker");
const policy_template_faker_1 = require("@concourse/store/policy-template/services/policy-template.faker");
const fakePolicies = require("@concourse/store/policy/services/policy.faker");
const fakeSurfaceLayers = require("@concourse/store/surface-layer/services/surface-layer.faker");
const test_1 = require("@concourse/test");
const list_policy_groups_component_1 = require("./list-policy-groups.component");
describe('ListPolicyGroupsComponent', () => {
    let component;
    let fixture;
    const surfaceLayers = fakeSurfaceLayers.fakeMany();
    const groups = fakeGroups.fakeMany();
    const pgts = fakePolicyGroupTemplate.fakeMany(policy_template_faker_1.fakeAll());
    const policies = fakePolicies.fakeMany(policy_template_faker_1.fakeAll(), groups, surfaceLayers);
    const mockPolicyGroups = policy_group_faker_1.fakeMany(pgts, policies, surfaceLayers, [], fakeGroups.fakeOne());
    beforeEach(testing_1.async(() => {
        const configure = testBed => {
            testBed
                .configureTestingModule({
                schemas: [core_1.NO_ERRORS_SCHEMA],
                imports: [
                    dynamic_form_1.DynamicFormModule,
                    testing_2.RouterTestingModule,
                    ngx_pipes_1.NgArrayPipesModule,
                    ngx_pipes_1.NgStringPipesModule,
                    angular_fontawesome_1.FontAwesomeModule,
                    store_1.StoreModule.forRoot({}),
                    shared_module_1.SharedModule
                ],
                providers: [
                    test_1.mockFacade(facades_1.ModalStoreFacade),
                    test_1.mockFacade(facades_1.RoleFacade, {
                        responsibilityById$: new rxjs_1.BehaviorSubject(jest.fn())
                    }),
                    test_1.mockFacade(facades_1.PolicyGroupFacade, {
                        isLoaded$: new rxjs_1.BehaviorSubject(true),
                        list$: new rxjs_1.BehaviorSubject(mockPolicyGroups)
                    }),
                    ...test_1.directiveProviders
                ],
                declarations: [list_policy_groups_component_1.ListPolicyGroupsComponent]
            });
        };
        test_1.configureTests(configure).then(testBed => {
            fixture = testBed.createComponent(list_policy_groups_component_1.ListPolicyGroupsComponent);
            component = fixture.componentInstance;
            fixture.detectChanges();
        });
    }));
    it('should create', () => {
        expect(component).toBeTruthy();
    });
    it('should contain Policy Groups data', () => {
        component.policyGroupList$.subscribe(pgs => {
            expect(pgs).toBe(mockPolicyGroups);
        });
    });
    it('should find app-page-actions', () => {
        const pageActions = fixture.debugElement.query(platform_browser_1.By.css('app-page-actions'));
        expect(pageActions).toBeDefined();
    });
    it('should find app-search-actions', () => {
        const searchActions = fixture.debugElement.query(platform_browser_1.By.css('app-search-actions'));
        expect(searchActions).toBeDefined();
    });
    it('should not find app-null-state component', () => {
        const nullStateComponent = fixture.debugElement.query(platform_browser_1.By.css('app-null-state'));
        expect(nullStateComponent).toBeNull();
    });
    it('should give length zero if there no records', () => {
        component.policyGroupList$ = new rxjs_1.BehaviorSubject([]);
        fixture.detectChanges();
        component.policyGroupList$.subscribe(pgData => {
            expect(pgData.length).toBe(0);
        });
    });
    it('should find app-null-state if there is no attribute tags', () => {
        const nullStateComponent = fixture.debugElement.query(platform_browser_1.By.css('app-null-state'));
        expect(nullStateComponent).toBeDefined();
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdC1wb2xpY3ktZ3JvdXBzLmNvbXBvbmVudC5zcGVjLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vY29uY291cnNlL2phdmFzY3JpcHQvY29uY291cnNlLWFwcC9zcmMvYXBwL3BvbGljeS1ncm91cHMvbGlzdC1wb2xpY3ktZ3JvdXBzL2xpc3QtcG9saWN5LWdyb3Vwcy5jb21wb25lbnQuc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHdDQUFpSDtBQUNqSCxtREFBZ0U7QUFDaEUsZ0VBQStDO0FBQy9DLHFEQUE4RDtBQUM5RCwwRUFBcUU7QUFDckUsdUNBQTBDO0FBQzFDLHlDQUFvRTtBQUNwRSwrQkFBdUM7QUFFdkMsaUVBQW1FO0FBQ25FLG1FQUErRDtBQUMvRCxzREFBMkY7QUFDM0YsMEVBQTBFO0FBQzFFLHVIQUF1SDtBQUN2SCxrR0FBcUY7QUFDckYsMkdBQTBGO0FBQzFGLDhFQUE4RTtBQUM5RSxpR0FBa0c7QUFDbEcsMENBQThGO0FBQzlGLGlGQUEyRTtBQUUzRSxRQUFRLENBQUMsMkJBQTJCLEVBQUUsR0FBRyxFQUFFO0lBQ3pDLElBQUksU0FBb0MsQ0FBQztJQUN6QyxJQUFJLE9BQW9ELENBQUM7SUFDekQsTUFBTSxhQUFhLEdBQUcsaUJBQWlCLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDbkQsTUFBTSxNQUFNLEdBQUcsVUFBVSxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQ3JDLE1BQU0sSUFBSSxHQUFHLHVCQUF1QixDQUFDLFFBQVEsQ0FBQywrQkFBTyxFQUFFLENBQUMsQ0FBQztJQUN6RCxNQUFNLFFBQVEsR0FBRyxZQUFZLENBQUMsUUFBUSxDQUFDLCtCQUFPLEVBQUUsRUFBRSxNQUFNLEVBQUUsYUFBYSxDQUFDLENBQUM7SUFDekUsTUFBTSxnQkFBZ0IsR0FBRyw2QkFBUSxDQUFDLElBQUksRUFBRSxRQUFRLEVBQUUsYUFBYSxFQUFFLEVBQUUsRUFBRSxVQUFVLENB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