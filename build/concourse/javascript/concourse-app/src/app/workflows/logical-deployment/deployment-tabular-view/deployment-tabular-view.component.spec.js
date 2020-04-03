"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const testing_1 = require("@angular/core/testing");
const platform_browser_1 = require("@angular/platform-browser");
const testing_2 = require("@angular/router/testing");
const surface_facade_1 = require("@concourse/store/surface/state/surface.facade");
const angular_fontawesome_1 = require("@fortawesome/angular-fontawesome");
const store_1 = require("@ngrx/store");
const rxjs_1 = require("rxjs");
const fakeAssets = require("@concourse/store/asset/services/asset.faker");
const facades_1 = require("@concourse/store/facades");
const fakeGroups = require("@concourse/store/group/services/group.faker");
const logical_deployment_faker_1 = require("@concourse/store/logical-deployment/services/logical-deployment.faker");
const fakeSurfaceLayers = require("@concourse/store/surface-layer/services/surface-layer.faker");
const fakeUser = require("@concourse/store/user/services/user.faker");
const test_1 = require("@concourse/test");
const deployment_tabular_view_component_1 = require("./deployment-tabular-view.component");
const shared_module_1 = require("@concourse/shared/shared.module");
// TODO: abhi/ need to fix tests.
xdescribe('LogicalDeploymentsListView', () => {
    let component;
    let fixture;
    const surfaceLayers = fakeSurfaceLayers.fakeMany();
    const fakeModels = fakeAssets.fakeManyEnclaves([], fakeGroups.fakeOne());
    const requesters = fakeUser.fakeMany();
    const mockLogicalDeployments = logical_deployment_faker_1.fakeMany(surfaceLayers, requesters, fakeModels);
    beforeEach(testing_1.async(() => {
        // tslint:disable-next-line: no-floating-promises
        testing_1.TestBed.configureTestingModule({
            schemas: [core_1.NO_ERRORS_SCHEMA],
            imports: [
                angular_fontawesome_1.FontAwesomeModule,
                testing_2.RouterTestingModule,
                store_1.StoreModule.forRoot({}),
                shared_module_1.SharedModule
            ],
            providers: [
                test_1.mockFacade(facades_1.AssetFacade),
                test_1.mockFacade(surface_facade_1.SurfaceFacade),
                test_1.mockFacade(facades_1.SurfaceLayerFacade),
                test_1.mockFacade(facades_1.LogicalDeploymentFacade, {
                    listWithRelated$: new rxjs_1.BehaviorSubject(mockLogicalDeployments),
                    isLoaded$: new rxjs_1.BehaviorSubject(true)
                }),
                ...test_1.directiveProviders
            ],
            declarations: [deployment_tabular_view_component_1.DeploymentTabularViewComponent]
        })
            .compileComponents();
    }));
    beforeEach(() => {
        fixture = testing_1.TestBed.createComponent(deployment_tabular_view_component_1.DeploymentTabularViewComponent);
        component = fixture.componentInstance;
        // tslint:disable-next-line:no-life-cycle-call
        component.ngAfterContentInit();
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
    it('should contain logical deployment data', () => {
        component.logicalDeploymentsList$.subscribe(logicalDeployments => {
            expect(logicalDeployments).toBe(mockLogicalDeployments);
        });
    });
    it('should find app-search-actions', () => {
        const searchActions = fixture.debugElement.query(platform_browser_1.By.css('app-search-actions'));
        expect(searchActions).toBeDefined();
    });
    it('should not find app-null-state component', () => {
        const nullStateComponent = fixture.debugElement.query(platform_browser_1.By.css('app-null-state'));
        expect(nullStateComponent).toBeNull();
    });
    it('should find app-null-state component, if asset length zero', () => {
        component.logicalDeploymentsList$ = new rxjs_1.BehaviorSubject([]);
        fixture.detectChanges();
        component.logicalDeploymentsList$.subscribe(list => {
            expect(list.length).toBe(0);
        });
        const nullStateComponent = fixture.debugElement.query(platform_browser_1.By.css('app-null-state'));
        expect(nullStateComponent).toBeDefined();
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVwbG95bWVudC10YWJ1bGFyLXZpZXcuY29tcG9uZW50LnNwZWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9jb25jb3Vyc2UvamF2YXNjcmlwdC9jb25jb3Vyc2UtYXBwL3NyYy9hcHAvd29ya2Zsb3dzL2xvZ2ljYWwtZGVwbG95bWVudC9kZXBsb3ltZW50LXRhYnVsYXItdmlldy9kZXBsb3ltZW50LXRhYnVsYXItdmlldy5jb21wb25lbnQuc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHdDQUFpRDtBQUNqRCxtREFBeUU7QUFDekUsZ0VBQStDO0FBQy9DLHFEQUE4RDtBQUM5RCxrRkFBOEU7QUFDOUUsMEVBQXFFO0FBQ3JFLHVDQUEwQztBQUMxQywrQkFBdUM7QUFFdkMsMEVBQTBFO0FBQzFFLHNEQUFvRztBQUNwRywwRUFBMEU7QUFDMUUsb0hBQWlHO0FBQ2pHLGlHQUFpRztBQUNqRyxzRUFBc0U7QUFDdEUsMENBQWlFO0FBQ2pFLDJGQUFxRjtBQUNyRixtRUFBK0Q7QUFDL0QsaUNBQWlDO0FBQ2pDLFNBQVMsQ0FBQyw0QkFBNEIsRUFBRSxHQUFHLEVBQUU7SUFDM0MsSUFBSSxTQUF5QyxDQUFDO0lBQzlDLElBQUksT0FBeUQsQ0FBQztJQUM5RCxNQUFNLGFBQWEsR0FBRyxpQkFBaUIsQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUNuRCxNQUFNLFVBQVUsR0FBRyxVQUFVLENBQUMsZ0JBQWdCLENBQUMsRUFBRSxFQUFFLFVBQVUsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDO0lBQ3pFLE1BQU0sVUFBVSxHQUFHLFFBQVEsQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUN2QyxNQUFNLHNCQUFzQixHQUFHLG1DQUFRLENBQUMsYUFBYSxFQUFFLFVBQVUsRUFBRSxVQUFVLENBQUMsQ0FBQztJQUUvRSxVQUFVLENBQUMsZUFBSyxDQUFDLEdBQUcsRUFBRTtRQUNwQixpREFBaUQ7UUFDakQs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