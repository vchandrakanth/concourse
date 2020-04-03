"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const testing_1 = require("@angular/core/testing");
const testing_2 = require("@angular/router/testing");
const angular_fontawesome_1 = require("@fortawesome/angular-fontawesome");
const store_1 = require("@ngrx/store");
const rxjs_1 = require("rxjs");
const http_1 = require("@angular/common/http");
const shared_module_1 = require("@concourse/shared/shared.module");
const assetFaker = require("@concourse/store/asset/services/asset.faker");
const discoveredDeploymentsFaker = require("@concourse/store/discovered-deployment/services/discovered-deployment.faker");
const discovered_deployment_service_1 = require("@concourse/store/discovered-deployment/services/discovered-deployment.service");
const facades_1 = require("@concourse/store/facades");
const group_faker_1 = require("@concourse/store/group/services/group.faker");
const logicalDeploymentFaker = require("@concourse/store/logical-deployment/services/logical-deployment.faker");
const test_1 = require("@concourse/test");
const operators_1 = require("rxjs/operators");
const discovered_deployment_tabular_view_component_1 = require("./discovered-deployment-tabular-view.component");
describe('DiscoveredDeploymentsTabularView', () => {
    let component;
    let fixture;
    const mockDiscoveredDeployments = discoveredDeploymentsFaker.fakeMany(assetFaker.fakeManyEnclaves([], group_faker_1.fakeOne()), logicalDeploymentFaker.fakeMany([{ id: 123 }], [{ id: 123 }], [{ id: 123 }]));
    beforeEach(testing_1.async(() => {
        testing_1.TestBed.configureTestingModule({
            schemas: [core_1.NO_ERRORS_SCHEMA],
            imports: [
                testing_2.RouterTestingModule,
                store_1.StoreModule.forRoot({}),
                angular_fontawesome_1.FontAwesomeModule,
                http_1.HttpClientModule,
                shared_module_1.SharedModule
            ],
            providers: [
                discovered_deployment_service_1.DiscoveredDeploymentService,
                test_1.mockFacade(facades_1.AssetFacade),
                test_1.mockFacade(facades_1.DiscoveredDeploymentFacade, {
                    list$: new rxjs_1.BehaviorSubject(mockDiscoveredDeployments)
                }),
                ...test_1.directiveProviders
            ],
            declarations: [discovered_deployment_tabular_view_component_1.DiscoveredDeploymentTabularViewComponent]
        })
            .compileComponents();
    }));
    beforeEach(() => {
        fixture = testing_1.TestBed.createComponent(discovered_deployment_tabular_view_component_1.DiscoveredDeploymentTabularViewComponent);
        component = fixture.componentInstance;
        // tslint:disable-next-line:no-life-cycle-call
        component.ngAfterViewInit();
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
    it('should contain discovered deployment data', () => {
        // component.discoveredDeploymentsList$.subscribe(discoveredDeployments => {
        // expect(results).toBe(mockDiscoveredDeployments);
        // });
        component.discoveredDeploymentService.getListPaginated('200', '0').pipe(operators_1.take(1)).subscribe(results => {
            expect(results).toBe(mockDiscoveredDeployments);
        });
    });
    // it('should find app-search-actions', () => {
    //   const searchActions = fixture.debugElement.query(By.css('app-search-actions'));
    //   expect(searchActions).toBeDefined();
    // });
    // it('should not find app-null-state component', () => {
    //   const nullStateComponent = fixture.debugElement.query(By.css('app-null-state'));
    //   expect(nullStateComponent).toBeNull();
    // });
    xit('should find app-null-state component, if asset length zero', () => {
        // component.discoveredDeploymentsList$ = new BehaviorSubject([]);
        // fixture.detectChanges();
        // component.discoveredDeploymentsList$.subscribe(list => {
        //   expect(list.length).toBe(0);
        // });
        // const nullStateComponent = fixture.debugElement.query(By.css('app-null-state'));
        // expect(nullStateComponent).toBeDefined();
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlzY292ZXJlZC1kZXBsb3ltZW50LXRhYnVsYXItdmlldy5jb21wb25lbnQuc3BlYy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL2NvbmNvdXJzZS9qYXZhc2NyaXB0L2NvbmNvdXJzZS1hcHAvc3JjL2FwcC93b3JrZmxvd3MvZGlzY292ZXJlZC1kZXBsb3ltZW50L2Rpc2NvdmVyZWQtZGVwbG95bWVudC10YWJ1bGFyLXZpZXcvZGlzY292ZXJlZC1kZXBsb3ltZW50LXRhYnVsYXItdmlldy5jb21wb25lbnQuc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHdDQUFpRDtBQUNqRCxtREFBeUU7QUFFekUscURBQThEO0FBQzlELDBFQUFxRTtBQUNyRSx1Q0FBMEM7QUFDMUMsK0JBQXVDO0FBRXZDLCtDQUFvRTtBQUNwRSxtRUFBK0Q7QUFDL0QsMEVBQTBFO0FBQzFFLDBIQUEwSDtBQUMxSCxpSUFBNEg7QUFDNUgsc0RBQW1GO0FBQ25GLDZFQUFzRTtBQUN0RSxnSEFBZ0g7QUFDaEgsMENBQWlFO0FBQ2pFLDhDQUFzQztBQUN0QyxpSEFBMEc7QUFFMUcsUUFBUSxDQUFDLGtDQUFrQyxFQUFFLEdBQUcsRUFBRTtJQUNoRCxJQUFJLFNBQW1ELENBQUM7SUFDeEQsSUFBSSxPQUFtRSxDQUFDO0lBQ3hFLE1BQU0seUJBQXlCLEdBQUcsMEJBQTBCLENBQUMsUUFBUSxDQUNuRSxVQUFVLENBQUMsZ0JBQWdCLENBQUMsRUFBRSxFQUFFLHFCQUFPLEVBQUUsQ0FBQyxFQUMxQyxzQkFBc0IsQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsQ0FBUSxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLENBQVEsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxDQUFRLENBQUMsQ0FDbEcsQ0FBQztJQUVGLFVBQVUsQ0FBQyxlQUFLLENBQUMsR0FBRyxFQUFFO1FBQ3BCLGlCQUFPLENBQUMsc0JBQXNCLENBQUM7WUFDN0IsT0FBTyxFQUFFLENBQUMsdUJBQWdCLENBQUM7WUFDM0IsT0FBTyxFQUFFO2dCQUNQLDZCQUFtQjtnQkFDbkIsbUJBQVcsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDO2dCQUN2Qix1Q0FBaUI7Z0JBQ2pCLHVCQUFnQjtnQkFDaEIsNEJBQVk7YUFDYjtZQUNELFNBQVMsRUFBRTtnQkFDVCwyREFBMkI7Z0JBQzNCLGlCQUFVLENBQUMscUJBQVcsQ0FBQztnQkFDdkIsaUJBQVUsQ0FBQyxvQ0FBMEIsRUFBRTtvQkFDckMsS0FBSyxFQUFFLElBQUksc0JBQWUsQ0FBQyx5QkFBeUIsQ0FBQztpQkFDdEQsQ0FBQztnQkFDRixHQUFHLHlCQUFrQjthQUN0QjtZQUNELFlBQVksRUFBRSxDQUFDLHVGQUF3QyxDQUFDO1NBQ3pELENBQUM7YUFDQyxpQkFBaUIsRUFBRSxDQUFDO0lBQ3pCLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFFSixVQUFVLENBQUMsR0FBRyxFQUFFO1FBQ2QsT0FBTyxHQUFHLGlCQUFPLENBQUMsZUFBZSxDQUFDLHVGQUF3QyxDQUFDLENBQUM7UUFDNUUsU0FBUyxHQUFHLE9BQU8sQ0FBQyxpQkFBaUIsQ0FBQztRQUN0Qyw4Q0FBOEM7UUFDOUMsU0FBUyxDQUFDLGVBQWUsRUFBRSxDQUFDO1FBQzVCLE9BQU8sQ0FBQyxhQUFhLEVBQUUsQ0FBQztJQUMxQixDQUFDLENBQUMsQ0FBQztJQUVILEVBQUUsQ0FBQyxlQUFlLEVBQUUsR0FBRyxFQUFFO1FBQ3ZCLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQyxVQUFVLEVBQUUsQ0FBQztJQUNqQyxDQUFDLENBQUMsQ0FBQztJQUVILEVBQUUsQ0FBQywyQ0FBMkMsRUFBRSxHQUFHLEVBQUU7UUFDbkQsNEVBQTRFO1FBQzVFLG1EQUFtRDtRQUNuRCxNQUFNO1FBRU4sU0FBUyxDQUFDLDJCQUEyQixDQUFDLGdCQUFnQixDQUFDLEtBQUssRUFBRSxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsZ0JBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsRUFBRTtZQUNuRyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLHlCQUF5QixDQUFDLENBQUM7UUFDbEQsQ0FBQyxDQUFDLENBQUM7SUFFTCxDQUFDLENBQUMsQ0FBQztJQUNILCtDQUErQztJQUMvQyxvRkFBb0Y7SUFDcEYseUNBQXlDO0lBQ3pDLE1BQU07SUFDTix5REFBeUQ7SUFDekQscUZBQXFGO0lBQ3JGLDJDQUEyQztJQUMzQyxNQUFNO0lBRU4sR0FBRyxDQUFDLDREQUE0RCxFQUFFLEdBQUcsRUFBRTtRQUNyRSxrRUFBa0U7UUFDbEUsMkJBQTJCO1FBQzNCLDJEQUEyRDtRQUMzRCxpQ0FBaUM7UUFDakMsTUFBTTtRQUNOLG1GQUFtRjtRQUNuRiw0Q0FBNEM7SUFDOUMsQ0FBQyxDQUFDLENBQUM7QUFFTCxDQUFDLENBQUMsQ0FBQyJ9