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
const shared_module_1 = require("@concourse/shared/shared.module");
const facades_1 = require("@concourse/store/facades");
const policy_group_template_faker_1 = require("@concourse/store/policy-group-template/services/policy-group-template.faker");
const policy_template_faker_1 = require("@concourse/store/policy-template/services/policy-template.faker");
const policy_template_facade_1 = require("@concourse/store/policy-template/state/policy-template.facade");
const test_1 = require("@concourse/test");
const policy_group_template_list_component_1 = require("./policy-group-template-list.component");
// TODO: FIX ME.
xdescribe('PolicyGroupTemplateListComponent', () => {
    let component;
    let fixture;
    const mockPolicyGroupTemplates = policy_group_template_faker_1.fakeMany(policy_template_faker_1.fakeAll(), 5);
    beforeEach(testing_1.async(() => {
        const configure = testBed => {
            testBed
                .configureTestingModule({
                schemas: [core_1.NO_ERRORS_SCHEMA],
                imports: [
                    angular_fontawesome_1.FontAwesomeModule,
                    testing_2.RouterTestingModule,
                    ngx_pipes_1.NgArrayPipesModule,
                    ngx_pipes_1.NgStringPipesModule,
                    store_1.StoreModule.forRoot({}),
                    shared_module_1.SharedModule
                ],
                providers: [
                    test_1.mockFacade(facades_1.ModalStoreFacade),
                    test_1.mockFacade(policy_template_facade_1.PolicyTemplateFacade),
                    test_1.mockFacade(facades_1.PolicyGroupTemplateFacade, {
                        list$: new rxjs_1.BehaviorSubject(mockPolicyGroupTemplates),
                        isUpdating$: new rxjs_1.BehaviorSubject(false),
                        isLoaded$: new rxjs_1.BehaviorSubject(true)
                    }),
                    ...test_1.directiveProviders
                ],
                declarations: [policy_group_template_list_component_1.PolicyGroupTemplateListComponent]
            });
        };
        test_1.configureTests(configure).then(testBed => {
            fixture = testBed.createComponent(policy_group_template_list_component_1.PolicyGroupTemplateListComponent);
            component = fixture.componentInstance;
            fixture.detectChanges();
        });
    }));
    it('should create', () => {
        expect(component).toBeTruthy();
    });
    it('should contain Policy Template Group data', () => {
        component.policyGroupTemplates$.subscribe(pgts => {
            expect(pgts).toBe(mockPolicyGroupTemplates);
        });
    });
    it('should find app-search-actions', () => {
        const searchActions = fixture.debugElement.query(platform_browser_1.By.css('app-search-actions'));
        expect(searchActions).toBeDefined();
    });
    describe('should test list data', () => {
        let listItem;
        it('should Display list data', () => {
            const ulElement = fixture.debugElement.query(platform_browser_1.By.css('ul'));
            expect(ulElement).toBeDefined();
            const liElements = ulElement.queryAll(platform_browser_1.By.css('li'));
            expect(liElements).toBeDefined();
            expect(liElements.length).toBe(mockPolicyGroupTemplates.length);
            listItem = liElements[0];
            const policyGroupTemplateName = listItem.query(platform_browser_1.By.css('h5')).nativeElement.textContent;
            expect(policyGroupTemplateName).toEqual(mockPolicyGroupTemplates[0].name);
        });
    });
    it('should not find app-null-state component', () => {
        const nullStateComponent = fixture.debugElement.query(platform_browser_1.By.css('app-null-state'));
        expect(nullStateComponent).toBeNull();
    });
    it('should find app-null-state component', () => {
        component.policyGroupTemplates$ = new rxjs_1.BehaviorSubject([]);
        fixture.detectChanges();
        component.policyGroupTemplates$.subscribe(pgts => {
            expect(pgts.length).toBe(0);
        });
        const nullStateComponent = fixture.debugElement.query(platform_browser_1.By.css('app-null-state'));
        expect(nullStateComponent).toBeDefined();
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9saWN5LWdyb3VwLXRlbXBsYXRlLWxpc3QuY29tcG9uZW50LnNwZWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9jb25jb3Vyc2UvamF2YXNjcmlwdC9jb25jb3Vyc2UtYXBwL3NyYy9hcHAvcG9saWN5LWdyb3VwLXRlbXBsYXRlL3BvbGljeS1ncm91cC10ZW1wbGF0ZS1saXN0L3BvbGljeS1ncm91cC10ZW1wbGF0ZS1saXN0LmNvbXBvbmVudC5zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsd0NBQWlEO0FBQ2pELG1EQUFnRTtBQUNoRSxnRUFBK0M7QUFDL0MscURBQThEO0FBQzlELDBFQUFxRTtBQUNyRSx1Q0FBMEM7QUFDMUMseUNBQW9FO0FBQ3BFLCtCQUF1QztBQUV2QyxtRUFBK0Q7QUFDL0Qsc0RBQXVGO0FBQ3ZGLDZIQUF1RztBQUN2RywyR0FBMEY7QUFDMUYsMEdBQXFHO0FBQ3JHLDBDQUE4RjtBQUM5RixpR0FBMEY7QUFDMUYsZ0JBQWdCO0FBQ2hCLFNBQVMsQ0FBQyxrQ0FBa0MsRUFBRSxHQUFHLEVBQUU7SUFDakQsSUFBSSxTQUEyQyxDQUFDO0lBQ2hELElBQUksT0FBMkQsQ0FBQztJQUNoRSxNQUFNLHdCQUF3QixHQUFHLHNDQUFRLENBQUMsK0JBQU8sRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBRXhELFVBQVUsQ0FDUixlQUFLLENBQUMsR0FBRyxFQUFFO1FBQ1QsTUFBTSxTQUFTLEdBQWdCLE9BQU8sQ0FBQyxFQUFFO1lBQ3ZDLE9BQU87aUJBQ0osc0JBQXNCLENBQUM7Z0JBQ3RCLE9BQU8sRUFBRSxDQUFDLHVCQUFnQixDQUFDO2dCQUMzQixPQUFPLEVBQUU7b0JBQ1AsdUNBQWlCO29CQUNqQiw2QkFBbUI7b0JBQ25CLDhCQUFrQjtvQkFDbEIsK0JBQW1CO29CQUNuQixtQkFBVyxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUM7b0JBQ3ZCLDRCQUFZO2lCQUNi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