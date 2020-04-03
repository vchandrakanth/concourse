"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const testing_1 = require("@angular/core/testing");
const shared_module_1 = require("@concourse/shared/shared.module");
const store_1 = require("@ngrx/store");
const ngx_bootstrap_1 = require("ngx-bootstrap");
const facades_1 = require("@concourse/store/facades");
const test_1 = require("@concourse/test");
const dashboard_quicklaunch_component_1 = require("./dashboard-quicklaunch.component");
describe('DashboardQuicklaunchComponent', () => {
    let component;
    let fixture;
    beforeEach(testing_1.async(() => {
        testing_1.TestBed.configureTestingModule({
            imports: [
                store_1.StoreModule.forRoot({}),
                ngx_bootstrap_1.AccordionModule.forRoot(),
                shared_module_1.SharedModule
            ],
            schemas: [core_1.NO_ERRORS_SCHEMA],
            declarations: [dashboard_quicklaunch_component_1.DashboardQuicklaunchComponent],
            providers: [
                test_1.mockFacade(facades_1.RoleFacade),
                test_1.mockFacade(facades_1.AssetFacade),
                test_1.mockFacade(facades_1.PolicyGroupFacade),
                test_1.mockFacade(facades_1.ModalStoreFacade),
                ...test_1.directiveProviders
            ]
        })
            .compileComponents();
    }));
    beforeEach(() => {
        fixture = testing_1.TestBed.createComponent(dashboard_quicklaunch_component_1.DashboardQuicklaunchComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGFzaGJvYXJkLXF1aWNrbGF1bmNoLmNvbXBvbmVudC5zcGVjLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vY29uY291cnNlL2phdmFzY3JpcHQvY29uY291cnNlLWFwcC9zcmMvYXBwL2Rhc2hib2FyZC9kYXNoYm9hcmQtcXVpY2tsYXVuY2gvZGFzaGJvYXJkLXF1aWNrbGF1bmNoLmNvbXBvbmVudC5zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsd0NBQWlEO0FBQ2pELG1EQUF5RTtBQUN6RSxtRUFBK0Q7QUFDL0QsdUNBQTBDO0FBQzFDLGlEQUFnRDtBQUVoRCxzREFBd0c7QUFDeEcsMENBQWlFO0FBQ2pFLHVGQUFrRjtBQUVsRixRQUFRLENBQUMsK0JBQStCLEVBQUUsR0FBRyxFQUFFO0lBQzdDLElBQUksU0FBd0MsQ0FBQztJQUM3QyxJQUFJLE9BQXdELENBQUM7SUFFN0QsVUFBVSxDQUFDLGVBQUssQ0FBQyxHQUFHLEVBQUU7UUFDcEIsaUJBQU8sQ0FBQyxzQkFBc0IsQ0FBQztZQUM3QixPQUFPLEVBQUU7Z0JBQ1AsbUJBQVcsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDO2dCQUN2QiwrQkFBZSxDQUFDLE9BQU8sRUFBRTtnQkFDekIsNEJBQVk7YUFDYjtZQUNELE9BQU8sRUFBRSxDQUFDLHVCQUFnQixDQUFDO1lBQzNCLFlBQVksRUFBRSxDQUFDLCtEQUE2QixDQUFDO1lBQzdDLFNBQVMsRUFBRTtnQkFDVCxpQkFBVSxDQUFDLG9CQUFVLENBQUM7Z0JBQ3RCLGlCQUFVLENBQUMscUJBQVcsQ0FBQztnQkFDdkIsaUJBQVUsQ0FBQywyQkFBaUIsQ0FBQztnQkFDN0IsaUJBQVUsQ0FBQywwQkFBZ0IsQ0FBQztnQkFDNUIsR0FBRyx5QkFBa0I7YUFDdEI7U0FDRixDQUFDO2FBQ0MsaUJBQWlCLEVBQUUsQ0FBQztJQUN6QixDQUFDLENBQUMsQ0FBQyxDQUFDO0lBRUosVUFBVSxDQUFDLEdBQUcsRUFBRTtRQUNkLE9BQU8sR0FBRyxpQkFBTyxDQUFDLGVBQWUsQ0FBQywrREFBNkIsQ0FBQyxDQUFDO1FBQ2pFLFNBQVMsR0FBRyxPQUFPLENBQUMsaUJBQWlCLENBQUM7UUFDdEMsT0FBTyxDQUFDLGFBQWEsRUFBRSxDQUFDO0lBQzFCLENBQUMsQ0FBQyxDQUFDO0lBRUgsRUFBRSxDQUFDLGVBQWUsRUFBRSxHQUFHLEVBQUU7UUFDdkIsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDLFVBQVUsRUFBRSxDQUFDO0lBQ2pDLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyxDQUFDLENBQUMifQ==