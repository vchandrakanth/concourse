"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const testing_1 = require("@angular/core/testing");
const forms_1 = require("@angular/forms");
const angular_fontawesome_1 = require("@fortawesome/angular-fontawesome");
const ng_select_1 = require("@ng-select/ng-select");
const store_1 = require("@ngrx/store");
const ngx_pipes_1 = require("ngx-pipes");
const rxjs_1 = require("rxjs");
const shared_module_1 = require("@concourse/shared/shared.module");
const facades_1 = require("@concourse/store/facades");
const test_1 = require("@concourse/test");
const deploy_node_component_1 = require("./deploy-node.component");
describe('DeployNodeComponent', () => {
    let component;
    let fixture;
    beforeEach(testing_1.async(() => {
        testing_1.TestBed.configureTestingModule({
            schemas: [core_1.NO_ERRORS_SCHEMA],
            imports: [
                forms_1.ReactiveFormsModule,
                angular_fontawesome_1.FontAwesomeModule,
                ng_select_1.NgSelectModule,
                ngx_pipes_1.NgArrayPipesModule,
                store_1.StoreModule.forRoot({}),
                shared_module_1.SharedModule
            ],
            declarations: [deploy_node_component_1.DeployNodeComponent],
            providers: [
                test_1.mockFacade(facades_1.AssetFacade),
                test_1.mockFacade(facades_1.AwsAccountFacade),
                test_1.mockFacade(facades_1.SurfaceFacade),
                test_1.mockFacade(facades_1.SurfaceLayerFacade, {
                    list$: new rxjs_1.BehaviorSubject([]),
                    listWithChildrenBySurface$: new rxjs_1.BehaviorSubject([])
                }),
                test_1.mockFacade(facades_1.LogicalDeploymentFacade),
                test_1.mockFacade(facades_1.PolicyViolationFacade),
                test_1.mockFacade(facades_1.ApplicationErrorFacade),
                test_1.mockFacade(facades_1.CatalogServiceFacade),
                test_1.mockFacade(facades_1.InstitutionDataFacade)
            ]
        })
            .compileComponents();
    }));
    beforeEach(() => {
        fixture = testing_1.TestBed.createComponent(deploy_node_component_1.DeployNodeComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVwbG95LW5vZGUuY29tcG9uZW50LnNwZWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9jb25jb3Vyc2UvamF2YXNjcmlwdC9jb25jb3Vyc2UtYXBwL3NyYy9hcHAvY29yZS9tb2RhbC9jb21wb25lbnRzL2RlcGxveS1ub2RlL2RlcGxveS1ub2RlLmNvbXBvbmVudC5zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsd0NBQWlEO0FBQ2pELG1EQUF5RTtBQUN6RSwwQ0FBcUQ7QUFDckQsMEVBQXFFO0FBQ3JFLG9EQUFzRDtBQUN0RCx1Q0FBMEM7QUFDMUMseUNBQStDO0FBQy9DLCtCQUF1QztBQUV2QyxtRUFBK0Q7QUFDL0Qsc0RBVWtDO0FBQ2xDLDBDQUE2QztBQUM3QyxtRUFBOEQ7QUFFOUQsUUFBUSxDQUFDLHFCQUFxQixFQUFFLEdBQUcsRUFBRTtJQUNuQyxJQUFJLFNBQThCLENBQUM7SUFDbkMsSUFBSSxPQUE4QyxDQUFDO0lBRW5ELFVBQVUsQ0FBQyxlQUFLLENBQUMsR0FBRyxFQUFFO1FBQ3BCLGlCQUFPLENBQUMsc0JBQXNCLENBQUM7WUFDN0IsT0FBTyxFQUFFLENBQUMsdUJBQWdCLENBQUM7WUFDM0IsT0FBTyxFQUFFO2dCQUNQLDJCQUFtQjtnQkFDbkIsdUNBQWlCO2dCQUNqQiwwQkFBYztnQkFDZCw4QkFBa0I7Z0JBQ2xCLG1CQUFXLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQztnQkFDdkIsNEJBQVk7YUFDYjtZQUNELFlBQVksRUFBRSxDQUFDLDJDQUFtQixDQUFDO1lBQ25DLFNBQVMsRUFBRTtnQkFDVCxpQkFBVSxDQUFDLHFCQUFXLENBQUM7Z0JBQ3ZCLGlCQUFVLENBQUMsMEJBQWdCLENBQUM7Z0JBQzVCLGlCQUFVLENBQUMsdUJBQWEsQ0FBQztnQkFDekIsaUJBQVUsQ0FBQyw0QkFBa0IsRUFBRTtvQkFDN0IsS0FBSyxFQUFFLElBQUksc0JBQWUsQ0FBQyxFQUFFLENBQUM7b0JBQzlCLDBCQUEwQixFQUFFLElBQUksc0JBQWUsQ0FBQyxFQUFFLENBQUM7aUJBQ3BELENBQUM7Z0JBQ0YsaUJBQVUsQ0FBQyxpQ0FBdUIsQ0FBQztnQkFDbkMsaUJBQVUsQ0FBQywrQkFBcUIsQ0FBQztnQkFDakMsaUJBQVUsQ0FBQyxnQ0FBc0IsQ0FBQztnQkFDbEMsaUJBQVUsQ0FBQyw4QkFBb0IsQ0FBQztnQkFDaEMsaUJBQVUsQ0FBQywrQkFBcUIsQ0FBQzthQUNsQztTQUNGLENBQUM7YUFDQyxpQkFBaUIsRUFBRSxDQUFDO0lBQ3pCLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFFSixVQUFVLENBQUMsR0FBRyxFQUFFO1FBQ2QsT0FBTyxHQUFHLGlCQUFPLENBQUMsZUFBZSxDQUFDLDJDQUFtQixDQUFDLENBQUM7UUFDdkQsU0FBUyxHQUFHLE9BQU8sQ0FBQyxpQkFBaUIsQ0FBQztRQUN0QyxPQUFPLENBQUMsYUFBYSxFQUFFLENBQUM7SUFDMUIsQ0FBQyxDQUFDLENBQUM7SUFFSCxFQUFFLENBQUMsZUFBZSxFQUFFLEdBQUcsRUFBRTtRQUN2QixNQUFNLENBQUMsU0FBUyxDQUFDLENBQUMsVUFBVSxFQUFFLENBQUM7SUFDakMsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDLENBQUMsQ0FBQyJ9