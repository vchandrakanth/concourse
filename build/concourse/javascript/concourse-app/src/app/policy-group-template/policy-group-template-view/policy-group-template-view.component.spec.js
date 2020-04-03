"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@angular/core/testing");
const platform_browser_1 = require("@angular/platform-browser");
const testing_2 = require("@angular/router/testing");
const angular_fontawesome_1 = require("@fortawesome/angular-fontawesome");
const store_1 = require("@ngrx/store");
const alert_1 = require("ngx-bootstrap/alert");
const rxjs_1 = require("rxjs");
const shared_module_1 = require("@concourse/shared/shared.module");
const facades_1 = require("@concourse/store/facades");
const test_1 = require("@concourse/test");
const ngx_bootstrap_1 = require("ngx-bootstrap");
const policy_group_template_view_component_1 = require("./policy-group-template-view.component");
describe('PolicyGroupTemplateViewComponent', () => {
    let component;
    let fixture;
    const mockPolicyGroupTemplate = {
        version: 1,
        id: 50001,
        status: 'PUBLISHED',
        institutionId: 102,
        name: 'Reza PGT #1',
        description: 'Reza PGT #1',
        policyGroups: [{ id: 60001 }, { id: 60076 }],
        policyTemplates: [{ id: 10001 }],
        isLatest: true
    };
    beforeEach(testing_1.async(() => {
        testing_1.TestBed.configureTestingModule({
            imports: [
                testing_2.RouterTestingModule,
                angular_fontawesome_1.FontAwesomeModule,
                ngx_bootstrap_1.TabsModule.forRoot(),
                shared_module_1.SharedModule,
                store_1.StoreModule.forRoot({}),
                alert_1.AlertModule.forRoot()
            ],
            providers: [
                test_1.mockFacade(facades_1.ModalStoreFacade),
                test_1.mockFacade(facades_1.AuditHistoryFacade),
                test_1.mockFacade(facades_1.PolicyGroupTemplateFacade, {
                    selectedWithRelated$: new rxjs_1.BehaviorSubject(mockPolicyGroupTemplate)
                }),
                ...test_1.directiveProviders
            ],
            declarations: [policy_group_template_view_component_1.PolicyGroupTemplateViewComponent]
        })
            .compileComponents();
    }));
    beforeEach(() => {
        fixture = testing_1.TestBed.createComponent(policy_group_template_view_component_1.PolicyGroupTemplateViewComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
    it('should display pgt details', () => {
        const pgtName = fixture.debugElement.query(platform_browser_1.By.css('[data-e2e="policyTemplatesCard"] h2')).nativeElement;
        expect(pgtName).toBeTruthy();
        // expect(pgtName.textContent).toEqual(mockPolicyGroupTemplate.name);
    });
    it('should find policy templates list card', () => {
        // const policyTemplateCard = fixture.debugElement.query(By.css('app-list-card[cardTitle="Policy Templates"]'));
        const policyTemplateCard = fixture.debugElement.query(platform_browser_1.By.css('[data-e2e="policyTemplatesCard"]'));
        expect(policyTemplateCard).toBeTruthy();
    });
    it('should find policyGroups list card', () => {
        // const policyGroupCard = fixture.debugElement.query(By.css('app-list-card[cardTitle="Policy Groups"]'));
        const policyGroupCard = fixture.debugElement.query(platform_browser_1.By.css('[data-e2e="policyGroupsCard"]'));
        expect(policyGroupCard).toBeTruthy();
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9saWN5LWdyb3VwLXRlbXBsYXRlLXZpZXcuY29tcG9uZW50LnNwZWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9jb25jb3Vyc2UvamF2YXNjcmlwdC9jb25jb3Vyc2UtYXBwL3NyYy9hcHAvcG9saWN5LWdyb3VwLXRlbXBsYXRlL3BvbGljeS1ncm91cC10ZW1wbGF0ZS12aWV3L3BvbGljeS1ncm91cC10ZW1wbGF0ZS12aWV3LmNvbXBvbmVudC5zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsbURBQXlFO0FBQ3pFLGdFQUErQztBQUMvQyxxREFBOEQ7QUFDOUQsMEVBQXFFO0FBQ3JFLHVDQUEwQztBQUMxQywrQ0FBa0Q7QUFDbEQsK0JBQXVDO0FBRXZDLG1FQUErRDtBQUMvRCxzREFBMkc7QUFDM0csMENBQWlFO0FBQ2pFLGlEQUEyQztBQUMzQyxpR0FBMEY7QUFFMUYsUUFBUSxDQUFDLGtDQUFrQyxFQUFFLEdBQUcsRUFBRTtJQUNoRCxJQUFJLFNBQTJDLENBQUM7SUFDaEQsSUFBSSxPQUEyRCxDQUFDO0lBQ2hFLE1BQU0sdUJBQXVCLEdBQUc7UUFDOUIsT0FBTyxFQUFFLENBQUM7UUFDVixFQUFFLEVBQUUsS0FBSztRQUNULE1BQU0sRUFBRSxXQUFXO1FBQ25CLGFBQWEsRUFBRSxHQUFHO1FBQ2xCLElBQUksRUFBRSxhQUFhO1FBQ25CLFdBQVcsRUFBRSxhQUFhO1FBQzFCLFlBQVksRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEtBQUssRUFBRSxDQUFDO1FBQzVDLGVBQWUsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLEtBQUssRUFBRSxDQUFDO1FBQ2hDLFFBQVEsRUFBRSxJQUFJO0tBQ2YsQ0FBQztJQUVGLFVBQVUsQ0FBQyxlQUFLLENBQUMsR0FBRyxFQUFFO1FBQ3BCLGlCQUFPLENBQUMsc0JBQXNCLENBQUM7WUFDN0IsT0FBTyxFQUFFO2dCQUNQLDZCQUFtQjtnQkFDbkIsdUNBQWlCO2dCQUNqQiwwQkFBVSxDQUFDLE9BQU8sRUFBRTtnQkFDcEIsNEJBQVk7Z0JBQ1osbUJBQVcsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDO2dCQUN2QixtQkFBVyxDQUFDLE9BQU8sRUFBRTthQUN0QjtZQUNELFNBQVMsRUFBRTtnQkFDVCxpQkFBVSxDQUFDLDBCQUFnQixDQUFDO2dCQUM1QixpQkFBVSxDQUFDLDRCQUFrQixDQUFDO2dCQUM5QixpQkFBVSxDQUFDLG1DQUF5QixFQUFFO29CQUNwQyxvQkFBb0IsRUFBRSxJQUFJLHNCQUFlLENBQUMsdUJBQXVCLENBQUM7aUJBQ25FLENBQUM7Z0JBQ0YsR0FBRyx5QkFBa0I7YUFDdEI7WUFDRCxZQUFZLEVBQUUsQ0FBQyx1RUFBZ0MsQ0FBQztTQUNqRCxDQUFDO2FBQ0MsaUJBQWlCLEVBQUUsQ0FBQztJQUN6QixDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ0osVUFBVSxDQUFDLEdBQUcsRUFBRTtRQUNkLE9BQU8sR0FBRyxpQkFBTyxDQUFDLGVBQWUsQ0FBQyx1RUFBZ0MsQ0FBQyxDQUFDO1FBQ3BFLFNBQVMsR0FBRyxPQUFPLENBQUMsaUJBQWlCLENBQUM7UUFDdEMsT0FBTyxDQUFDLGFBQWEsRUFBRSxDQUFDO0lBQzFCLENBQUMsQ0FBQyxDQUFDO0lBRUgsRUFBRSxDQUFDLGVBQWUsRUFBRSxHQUFHLEVBQUU7UUFDdkIsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDLFVBQVUsRUFBRSxDQUFDO0lBQ2pDLENBQUMsQ0FBQyxDQUFDO0lBRUgsRUFBRSxDQUFDLDRCQUE0QixFQUFFLEdBQUcsRUFBRTtRQUNwQyxNQUFNLE9BQU8sR0FBRyxPQUFPLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxxQkFBRSxDQUFDLEdBQUcsQ0FBQyxxQ0FBcUMsQ0FBQyxDQUFDLENBQUMsYUFBNEIsQ0FBQztRQUN2SCxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsVUFBVSxFQUFFLENBQUM7UUFDN0IscUVBQXFFO0lBQ3ZFLENBQUMsQ0FBQyxDQUFDO0lBRUgsRUFBRSxDQUFDLHdDQUF3QyxFQUFFLEdBQUcsRUFBRTtRQUNoRCxnSEFBZ0g7UUFDaEgsTUFBTSxrQkFBa0IsR0FBRyxPQUFPLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxxQkFBRSxDQUFDLEdBQUcsQ0FBQyxrQ0FBa0MsQ0FBQyxDQUFDLENBQUM7UUFDbEcsTUFBTSxDQUFDLGtCQUFrQixDQUFDLENBQUMsVUFBVSxFQUFFLENBQUM7SUFDMUMsQ0FBQyxDQUFDLENBQUM7SUFFSCxFQUFFLENBQUMsb0NBQW9DLEVBQUUsR0FBRyxFQUFFO1FBQzVDLDBHQUEwRztRQUMxRyxNQUFNLGVBQWUsR0FBRyxPQUFPLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxxQkFBRSxDQUFDLEdBQUcsQ0FBQywrQkFBK0IsQ0FBQyxDQUFDLENBQUM7UUFFNUYsTUFBTSxDQUFDLGVBQWUsQ0FBQyxDQUFDLFVBQVUsRUFBRSxDQUFDO0lBQ3ZDLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyxDQUFDLENBQUMifQ==