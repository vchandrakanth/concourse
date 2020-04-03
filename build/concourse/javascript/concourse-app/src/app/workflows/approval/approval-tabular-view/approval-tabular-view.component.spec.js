"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const testing_1 = require("@angular/core/testing");
const platform_browser_1 = require("@angular/platform-browser");
const testing_2 = require("@angular/router/testing");
const store_1 = require("@ngrx/store");
const ngx_datatable_1 = require("@swimlane/ngx-datatable");
const rxjs_1 = require("rxjs");
const shared_module_1 = require("@concourse/shared/shared.module");
const facades_1 = require("@concourse/store/facades");
const test_1 = require("@concourse/test");
const approval_tabular_view_component_1 = require("./approval-tabular-view.component");
describe('ApprovalTabularView', () => {
    let component;
    let fixture;
    let injector;
    let workflowFacade;
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
                testing_2.RouterTestingModule,
                store_1.StoreModule.forRoot({}),
                ngx_datatable_1.NgxDatatableModule,
                shared_module_1.SharedModule
            ],
            providers: [
                test_1.mockFacade(facades_1.WorkflowFacade, {
                    list$: new rxjs_1.BehaviorSubject(mockWorkFlows),
                    filteredBy$: new rxjs_1.BehaviorSubject('owned')
                }),
                test_1.mockFacade(facades_1.ApprovalFacade)
            ],
            declarations: [approval_tabular_view_component_1.ApprovalTabularViewComponent]
        })
            .compileComponents();
    }));
    beforeEach(() => {
        fixture = testing_1.TestBed.createComponent(approval_tabular_view_component_1.ApprovalTabularViewComponent);
        component = fixture.componentInstance;
        injector = testing_1.getTestBed();
        workflowFacade = injector.get(facades_1.WorkflowFacade);
        // tslint:disable-next-line:no-life-cycle-call
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
    it('should contain workflow data', () => {
        component.workflowSummaryList$.subscribe(approvalRequests => {
            expect(approvalRequests).toBe(mockWorkFlows);
        });
    });
    it('should toggle active class when tab/filter button clicked', () => {
        const navLink = fixture.debugElement.queryAll(platform_browser_1.By.css('.nav-link'));
        navLink[1].nativeElement.dispatchEvent(new Event('click'));
        expect(navLink[0].classes.active).toBeTruthy();
        expect(navLink[1].classes.active).toBeFalsy();
    });
    it('should find Assigned Approvals button and click', () => {
        spyOn(component, 'filterByType').and.callThrough();
        const navLink = fixture.debugElement.queryAll(platform_browser_1.By.css('.nav-link'));
        navLink[1].nativeElement.dispatchEvent(new Event('click'));
        expect(component.filterByType).toHaveBeenCalledWith('assigned');
        expect(workflowFacade.filterByType).toHaveBeenCalledWith('assigned');
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwcm92YWwtdGFidWxhci12aWV3LmNvbXBvbmVudC5zcGVjLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vY29uY291cnNlL2phdmFzY3JpcHQvY29uY291cnNlLWFwcC9zcmMvYXBwL3dvcmtmbG93cy9hcHByb3ZhbC9hcHByb3ZhbC10YWJ1bGFyLXZpZXcvYXBwcm92YWwtdGFidWxhci12aWV3LmNvbXBvbmVudC5zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsd0NBQWlEO0FBQ2pELG1EQUFxRjtBQUNyRixnRUFBK0M7QUFDL0MscURBQThEO0FBQzlELHVDQUEwQztBQUMxQywyREFBNkQ7QUFDN0QsK0JBQXVDO0FBRXZDLG1FQUErRDtBQUMvRCxzREFBMEU7QUFDMUUsMENBQTZDO0FBQzdDLHVGQUFpRjtBQUVqRixRQUFRLENBQUMscUJBQXFCLEVBQUUsR0FBRyxFQUFFO0lBQ25DLElBQUksU0FBdUMsQ0FBQztJQUM1QyxJQUFJLE9BQXVELENBQUM7SUFDNUQsSUFBSSxRQUFpQixDQUFDO0lBQ3RCLElBQUksY0FBOEIsQ0FBQztJQUNuQyxNQUFNLGFBQWEsR0FBRztRQUNwQjtZQUNFLEVBQUUsRUFBRSxNQUFNO1lBQ1YsWUFBWSxFQUFFLFVBQVU7WUFDeEIsaUJBQWlCLEVBQUUsS0FBSztZQUN4QixPQUFPLEVBQUUsQ0FBQztZQUNWLE9BQU8sRUFBRSx5QkFBeUI7WUFDbEMsT0FBTyxFQUFFLHlCQUF5QjtZQUNsQyxTQUFTLEVBQUUsSUFBSTtZQUNmLFNBQVMsRUFBRSxJQUFJO1lBQ2YsYUFBYSxFQUFFLEdBQUc7WUFDbEIsWUFBWSxFQUFFLE1BQU07WUFDcEIsWUFBWSxFQUFFLElBQUk7WUFDbEIsaUJBQWlCLEVBQUUsS0FBSztZQUN4QixxQkFBcUIsRUFBRSxTQUFTO1lBQ2hDLGFBQWEsRUFBRSxJQUFJO1lBQ25CLFdBQVcsRUFBRSxLQUFLO1lBQ2xCLFVBQVUsRUFBRSxJ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