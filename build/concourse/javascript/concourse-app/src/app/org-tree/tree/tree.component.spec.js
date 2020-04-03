"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const testing_1 = require("@angular/core/testing");
const testing_2 = require("@angular/router/testing");
const angular_fontawesome_1 = require("@fortawesome/angular-fontawesome");
const store_1 = require("@ngrx/store");
const ngx_pipes_1 = require("ngx-pipes");
const rxjs_1 = require("rxjs");
const modal_1 = require("@concourse/core/modal");
const dynamic_form_1 = require("@concourse/shared/dynamic-form");
const shared_module_1 = require("@concourse/shared/shared.module");
const facades_1 = require("@concourse/store/facades");
const surfaceLayerFaker = require("@concourse/store/surface-layer/services/surface-layer.faker");
const surfaceFaker = require("@concourse/store/surface/services/surface.faker");
const test_1 = require("@concourse/test");
const org_chart_component_1 = require("../org-chart/org-chart.component");
const tree_component_1 = require("./tree.component");
xdescribe('TreeComponent', () => {
    let component;
    let fixture;
    beforeEach(testing_1.async(() => {
        const configure = testBed => {
            testBed
                .configureTestingModule({
                schemas: [core_1.NO_ERRORS_SCHEMA],
                imports: [
                    testing_2.RouterTestingModule,
                    angular_fontawesome_1.FontAwesomeModule,
                    store_1.StoreModule.forRoot({}),
                    ngx_pipes_1.NgArrayPipesModule,
                    dynamic_form_1.DynamicFormModule,
                    shared_module_1.SharedModule
                ],
                providers: [
                    test_1.mockFacade(modal_1.ModalStoreFacade),
                    test_1.mockFacade(facades_1.AwsAccountFacade),
                    test_1.mockFacade(facades_1.SurfaceFacade, {
                        list$: new rxjs_1.BehaviorSubject(surfaceFaker.fakeMany()),
                        selectedWithRelated$: new rxjs_1.BehaviorSubject(surfaceFaker.fakeOne())
                    }),
                    test_1.mockFacade(facades_1.SurfaceLayerFacade, {
                        list$: new rxjs_1.BehaviorSubject(surfaceLayerFaker.fakeMany()),
                        selectedWithRelated$: new rxjs_1.BehaviorSubject(surfaceLayerFaker.fakeOne())
                    }),
                    ...test_1.directiveProviders
                ],
                declarations: [tree_component_1.TreeComponent, org_chart_component_1.OrgChartComponent]
            });
        };
        test_1.configureTests(configure).then(testBed => {
            fixture = testBed.createComponent(tree_component_1.TreeComponent);
            component = fixture.componentInstance;
            fixture.detectChanges();
        });
    }));
    it('should create', () => {
        expect(component).toBeTruthy();
    });
    // it('should have expanded class on .sidebar element when selectedSurfaceLayer$ is set', fakeAsync(() => {
    //   const sidebar = fixture.debugElement.query(By.css('.sidebar'));
    //   const isExpanded = sidebar.classes['expanded'];
    //   expect(isExpanded).toBeTruthy();
    // }));
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJlZS5jb21wb25lbnQuc3BlYy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL2NvbmNvdXJzZS9qYXZhc2NyaXB0L2NvbmNvdXJzZS1hcHAvc3JjL2FwcC9vcmctdHJlZS90cmVlL3RyZWUuY29tcG9uZW50LnNwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSx3Q0FBaUQ7QUFDakQsbURBQW9GO0FBRXBGLHFEQUE4RDtBQUM5RCwwRUFBcUU7QUFDckUsdUNBQTBDO0FBQzFDLHlDQUErQztBQUMvQywrQkFBdUM7QUFFdkMsaURBQXlEO0FBQ3pELGlFQUFtRTtBQUNuRSxtRUFBK0Q7QUFDL0Qsc0RBQStGO0FBQy9GLGlHQUFpRztBQUNqRyxnRkFBZ0Y7QUFDaEYsMENBQThGO0FBQzlGLDBFQUFxRTtBQUNyRSxxREFBaUQ7QUFFakQsU0FBUyxDQUFDLGVBQWUsRUFBRSxHQUFHLEVBQUU7SUFDOUIsSUFBSSxTQUF3QixDQUFDO0lBQzdCLElBQUksT0FBd0MsQ0FBQztJQUU3QyxVQUFVLENBQ1IsZUFBSyxDQUFDLEdBQUcsRUFBRTtRQUNULE1BQU0sU0FBUyxHQUFnQixPQUFPLENBQUMsRUFBRTtZQUN2QyxPQUFPO2lCQUNKLHNCQUFzQixDQUFDO2dCQUN0QixPQUFPLEVBQUUsQ0FBQyx1QkFBZ0IsQ0FBQztnQkFDM0IsT0FBTyxFQUFFO29CQUNQLDZCQUFtQjtvQkFDbkIsdUNBQWlCO29CQUNqQixtQkFBVyxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUM7b0JBQ3ZCLDhCQUFrQjtvQkFDbEIsZ0NBQWlCO29CQUNqQiw0QkFBWTtpQkFDYjtnQkFDRCxTQUFTLEVBQUU7b0JBQ1QsaUJBQVUsQ0FBQyx3QkFBZ0IsQ0FBQztvQkFDNUIsaUJBQVUsQ0FBQywwQkFBZ0IsQ0FBQztvQkFDNUIsaUJBQVUsQ0FBQyx1QkFBYSxFQUFFO3dCQUN4QixLQUFLLEVBQUUsSUFBSSxzQkFBZSxDQUFDLFlBQVksQ0FBQyxRQUFRLEVBQUUsQ0FBQzt3QkFDbkQsb0JBQW9CLEVBQUUsSUFBSSxzQkFBZSxDQUFDLFlBQVksQ0FBQyxPQUFPLEVBQUUsQ0FBQztxQkFDbEUsQ0FBQztvQkFDRixpQkFBVSxDQUFDLDRCQUFrQixFQUFFO3dCQUM3QixLQUFLLEVBQUUsSUFBSSxzQkFBZSxDQUFDLGlCQUFpQixDQUFDLFFBQVEsRUFBRSxDQUFDO3dCQUN4RCxvQkFBb0IsRUFBRSxJQUFJLHNCQUFlLENBQUMsaUJBQWlCLENBQUMsT0FBTyxFQUFFLENBQUM7cUJBQ3ZFLENBQUM7b0JBQ0YsR0FBRyx5QkFBa0I7aUJBQ3RCO2dCQUNELFlBQVksRUFBRSxDQUFDLDhCQUFhLEVBQUUsdUNBQWlCLENBQUM7YUFDakQsQ0FBQyxDQUFDO1FBQ1AsQ0FBQyxDQUFDO1FBRUYscUJBQWMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEVBQUU7WUFDdkMsT0FBTyxHQUFHLE9BQU8sQ0FBQyxlQUFlLENBQUMsOEJBQWEsQ0FBQyxDQUFDO1lBQ2pELFNBQVMsR0FBRyxPQUFPLENBQUMsaUJBQWlCLENBQUM7WUFDdEMsT0FBTyxDQUFDLGFBQWEsRUFBRSxDQUFDO1FBQzFCLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQyxDQUFDLENBQ0gsQ0FBQztJQUVGLEVBQUUsQ0FBQyxlQUFlLEVBQUUsR0FBRyxFQUFFO1FBQ3ZCLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQyxVQUFVLEVBQUUsQ0FBQztJQUNqQyxDQUFDLENBQUMsQ0FBQztJQUVILDJHQUEyRztJQUMzRyxvRUFBb0U7SUFDcEUsb0RBQW9EO0lBRXBELHFDQUFxQztJQUNyQyxPQUFPO0FBRVQsQ0FBQyxDQUFDLENBQUMifQ==