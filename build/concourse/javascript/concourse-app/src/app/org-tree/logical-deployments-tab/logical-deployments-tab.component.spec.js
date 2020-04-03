"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@angular/core/testing");
const testing_2 = require("@angular/router/testing");
const angular_fontawesome_1 = require("@fortawesome/angular-fontawesome");
const store_1 = require("@ngrx/store");
const rxjs_1 = require("rxjs");
const shared_module_1 = require("@concourse/shared/shared.module");
const facades_1 = require("@concourse/store/facades");
const surfaceLayerFaker = require("@concourse/store/surface-layer/services/surface-layer.faker");
const test_1 = require("@concourse/test");
const logical_deployments_tab_component_1 = require("./logical-deployments-tab.component");
xdescribe('LogicalDeploymentsTabComponent', () => {
    let component;
    let fixture;
    const surfaceLayers = surfaceLayerFaker.fakeMany();
    beforeEach(testing_1.async(() => {
        testing_1.TestBed.configureTestingModule({
            imports: [
                testing_2.RouterTestingModule,
                angular_fontawesome_1.FontAwesomeModule,
                store_1.StoreModule.forRoot({}),
                shared_module_1.SharedModule
            ],
            providers: [
                test_1.mockFacade(facades_1.SurfaceLayerFacade, {
                    selectedWithChildren$: new rxjs_1.BehaviorSubject(surfaceLayers[0])
                }),
                test_1.mockFacade(facades_1.LogicalDeploymentFacade)
            ],
            declarations: [logical_deployments_tab_component_1.LogicalDeploymentsTabComponent]
        })
            .compileComponents();
    }));
    beforeEach(() => {
        fixture = testing_1.TestBed.createComponent(logical_deployments_tab_component_1.LogicalDeploymentsTabComponent);
        component = fixture.componentInstance;
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9naWNhbC1kZXBsb3ltZW50cy10YWIuY29tcG9uZW50LnNwZWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9jb25jb3Vyc2UvamF2YXNjcmlwdC9jb25jb3Vyc2UtYXBwL3NyYy9hcHAvb3JnLXRyZWUvbG9naWNhbC1kZXBsb3ltZW50cy10YWIvbG9naWNhbC1kZXBsb3ltZW50cy10YWIuY29tcG9uZW50LnNwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxtREFBeUU7QUFDekUscURBQThEO0FBQzlELDBFQUFxRTtBQUNyRSx1Q0FBMEM7QUFDMUMsK0JBQXVDO0FBRXZDLG1FQUErRDtBQUMvRCxzREFBdUY7QUFDdkYsaUdBQWlHO0FBQ2pHLDBDQUE2QztBQUM3QywyRkFBcUY7QUFFckYsU0FBUyxDQUFDLGdDQUFnQyxFQUFFLEdBQUcsRUFBRTtJQUMvQyxJQUFJLFNBQXlDLENBQUM7SUFDOUMsSUFBSSxPQUF5RCxDQUFDO0lBQzlELE1BQU0sYUFBYSxHQUFHLGlCQUFpQixDQUFDLFFBQVEsRUFBRSxDQUFDO0lBRW5ELFVBQVUsQ0FBQyxlQUFLLENBQUMsR0FBRyxFQUFFO1FBQ3BCLGlCQUFPLENBQUMsc0JBQXNCLENBQUM7WUFDN0IsT0FBTyxFQUFFO2dCQUNQLDZCQUFtQjtnQkFDbkIsdUNBQWlCO2dCQUNqQixtQkFBVyxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUM7Z0JBQ3ZCLDRCQUFZO2FBQ2I7WUFDRCxTQUFTLEVBQUU7Z0JBQ1QsaUJBQVUsQ0FBQyw0QkFBa0IsRUFBRTtvQkFDN0IscUJBQXFCLEVBQUUsSUFBSSxzQkFBZSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQztpQkFDN0QsQ0FBQztnQkFDRixpQkFBVSxDQUFDLGlDQUF1QixDQUFDO2FBQ3BDO1lBQ0QsWUFBWSxFQUFFLENBQUMsa0VBQThCLENBQUM7U0FDL0MsQ0FBQzthQUNDLGlCQUFpQixFQUFFLENBQUM7SUFDekIsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUVKLFVBQVUsQ0FBQyxHQUFHLEVBQUU7UUFDZCxPQUFPLEdBQUcsaUJBQU8sQ0FBQyxlQUFlLENBQUMsa0VBQThCLENBQUMsQ0FBQztRQUNsRSxTQUFTLEdBQUcsT0FBTyxDQUFDLGlCQUFpQixDQUFDO0lBQ3hDLENBQUMsQ0FBQyxDQUFDO0lBRUgsRUFBRSxDQUFDLGVBQWUsRUFBRSxHQUFHLEVBQUU7UUFDdkIsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDLFVBQVUsRUFBRSxDQUFDO0lBQ2pDLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyxDQUFDLENBQUMifQ==