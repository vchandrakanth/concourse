"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const testing_1 = require("@angular/core/testing");
const platform_browser_1 = require("@angular/platform-browser");
const testing_2 = require("@angular/router/testing");
const angular_fontawesome_1 = require("@fortawesome/angular-fontawesome");
const store_1 = require("@ngrx/store");
const rxjs_1 = require("rxjs");
const shared_module_1 = require("@concourse/shared/shared.module");
const facades_1 = require("@concourse/store/facades");
const test_1 = require("@concourse/test");
const risk_tabular_view_component_1 = require("./risk-tabular-view.component");
describe('PolicyResolutionsTabularViewComponent', () => {
    let component;
    let fixture;
    const mockWorkFlows = [
        {
            id: '1010',
            workflowType: 'approval',
            approvalRequestId: 10001,
            version: 1,
            created: '2019-03-13T19:00:18.877',
            updated: '2019-03-13T19:00:18.877',
            createdBy: null,
            updatedBy: null,
            institutionId: 101,
            approvalType: 'PEER',
            approvalDate: null,
            processInstanceId: 10001,
            approvalRequestStatus: 'CREATED',
            justification: null,
            requesterId: 95001,
            approverId: null,
            requestEntityType: 'POLICY_GROUP',
            requestEntityId: 60255,
            priority: 'MEDIUM',
            approvalUsers: [95001],
            approvalGroups: [],
            watchUsers: [],
            watchGroups: [],
            comments: []
        },
        {
            workflowType: 'approval',
            approvalRequestId: 10012,
            version: 1,
            created: '2019-03-13T19:32:07.624',
            updated: '2019-03-13T19:32:07.624',
            createdBy: null,
            updatedBy: null,
            institutionId: 101,
            approvalType: 'PEER',
            approvalDate: null,
            processInstanceId: 12501,
            approvalRequestStatus: 'CREATED',
            justification: null,
            requesterId: 95001,
            approverId: null,
            requestEntityType: 'POLICY_GROUP',
            requestEntityId: 60256,
            priority: 'MEDIUM',
            approvalUsers: [95001],
            approvalGroups: [],
            watchUsers: [],
            watchGroups: [],
            comments: []
        }
    ];
    beforeEach(testing_1.async(() => {
        testing_1.TestBed.configureTestingModule({
            schemas: [core_1.NO_ERRORS_SCHEMA],
            imports: [
                angular_fontawesome_1.FontAwesomeModule,
                testing_2.RouterTestingModule,
                store_1.StoreModule.forRoot({}),
                shared_module_1.SharedModule
            ],
            providers: [
                test_1.mockFacade(facades_1.WorkflowFacade, {
                    list$: new rxjs_1.BehaviorSubject(mockWorkFlows),
                    isLoaded$: new rxjs_1.BehaviorSubject(true)
                }),
                test_1.mockFacade(facades_1.PolicyResolutionFacade)
            ],
            declarations: [risk_tabular_view_component_1.RiskTabularViewComponent]
        })
            .compileComponents();
    }));
    beforeEach(() => {
        fixture = testing_1.TestBed.createComponent(risk_tabular_view_component_1.RiskTabularViewComponent);
        component = fixture.componentInstance;
        // tslint:disable-next-line:no-life-cycle-call
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
    it('should not find app-null-state component', () => {
        const nullStateComponent = fixture.debugElement.query(platform_browser_1.By.css('app-null-state'));
        expect(nullStateComponent).toBeNull();
    });
    it('should find app-null-state component, if asset length zero', () => {
        component.workflowSummaryList$ = new rxjs_1.BehaviorSubject([]);
        fixture.detectChanges();
        component.workflowSummaryList$.subscribe(list => {
            expect(list.length).toBe(0);
        });
        const nullStateComponent = fixture.debugElement.query(platform_browser_1.By.css('app-null-state'));
        expect(nullStateComponent).toBeDefined();
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmlzay10YWJ1bGFyLXZpZXcuY29tcG9uZW50LnNwZWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9jb25jb3Vyc2UvamF2YXNjcmlwdC9jb25jb3Vyc2UtYXBwL3NyYy9hcHAvd29ya2Zsb3dzL3Jpc2tzL3Jpc2stdGFidWxhci12aWV3L3Jpc2stdGFidWxhci12aWV3LmNvbXBvbmVudC5zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsd0NBQWlEO0FBQ2pELG1EQUF5RTtBQUN6RSxnRUFBK0M7QUFDL0MscURBQThEO0FBQzlELDBFQUFxRTtBQUNyRSx1Q0FBMEM7QUFDMUMsK0JBQXVDO0FBRXZDLG1FQUErRDtBQUMvRCxzREFBa0Y7QUFDbEYsMENBQTZDO0FBQzdDLCtFQUF5RTtBQUV6RSxRQUFRLENBQUMsdUNBQXVDLEVBQUUsR0FBRyxFQUFFO0lBQ3JELElBQUksU0FBbUMsQ0FBQztJQUN4QyxJQUFJLE9BQW1ELENBQUM7SUFDeEQsTUFBTSxhQUFhLEdBQUc7UUFDcEI7WUFDRSxFQUFFLEVBQUUsTUFBTTtZQUNWLFlBQVksRUFBRSxVQUFVO1lBQ3hCLGlCQUFpQixFQUFFLEtBQUs7WUFDeEIsT0FBTyxFQUFFLENBQUM7WUFDVixPQUFPLEVBQUUseUJBQXlCO1lBQ2xDLE9BQU8sRUFBRSx5QkFBeUI7WUFDbEMsU0FBUyxFQUFFLElBQUk7WUFDZixTQUFTLEVBQUUsSUFBSTtZQUNmLGFBQWEsRUFBRSxHQUFHO1lBQ2xCLFlBQVksRUFBRSxNQUFNO1lBQ3BCLFlBQVksRUFBRSxJQUFJO1lBQ2xCLGlCQUFpQixFQUFFLEtBQUs7WUFDeEIscUJBQXFCLEVBQUUsU0FBUztZQUNoQyxhQUFhLEVBQUUsSUFBSTtZQUNuQixXQUFXLEVBQUUsS0FBSztZQUNsQixVQUFVLEVBQUUsSUFBSTtZQUNoQixpQkFBaUIsRUFBRSxjQUFjO1lBQ2pDLGVBQWUsRUFBRSxLQUFLO1lBQ3RCLFFBQVEs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