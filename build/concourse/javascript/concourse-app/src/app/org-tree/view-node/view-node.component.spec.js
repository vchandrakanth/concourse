"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@angular/core/testing");
const testing_2 = require("@angular/router/testing");
const angular_fontawesome_1 = require("@fortawesome/angular-fontawesome");
const store_1 = require("@ngrx/store");
const tabs_1 = require("ngx-bootstrap/tabs");
const rxjs_1 = require("rxjs");
const shared_module_1 = require("@concourse/shared/shared.module");
const facades_1 = require("@concourse/store/facades");
const surfaceLayerFaker = require("@concourse/store/surface-layer/services/surface-layer.faker");
const test_1 = require("@concourse/test");
const logical_deployments_tab_component_1 = require("../logical-deployments-tab/logical-deployments-tab.component");
const policy_group_tab_component_1 = require("../policy-group-tab/policy-group-tab.component");
const role_tab_component_1 = require("../role-tab/role-tab.component");
const view_node_component_1 = require("./view-node.component");
describe('ViewNodeComponent', () => {
    let component;
    let fixture;
    const selectedSurfaceLayer = Object.assign(Object.assign({}, surfaceLayerFaker.fakeOne()), { isRoot: false, isLeaf: true });
    beforeEach(() => {
        testing_1.TestBed.configureTestingModule({
            imports: [
                testing_2.RouterTestingModule,
                angular_fontawesome_1.FontAwesomeModule,
                store_1.StoreModule.forRoot({}),
                tabs_1.TabsModule.forRoot(),
                shared_module_1.SharedModule
            ],
            providers: [
                test_1.mockFacade(facades_1.ModalStoreFacade),
                test_1.mockFacade(facades_1.SurfaceLayerFacade, {
                    selectedWithRelated$: new rxjs_1.BehaviorSubject(selectedSurfaceLayer),
                    selectedWithChildren$: new rxjs_1.BehaviorSubject(selectedSurfaceLayer)
                }),
                test_1.mockFacade(facades_1.ReportingFacade),
                test_1.mockFacade(facades_1.GroupFacade),
                test_1.mockFacade(facades_1.PolicyGroupFacade),
                test_1.mockFacade(facades_1.LogicalDeploymentFacade),
                ...test_1.directiveProviders
            ],
            declarations: [
                view_node_component_1.ViewNodeComponent,
                policy_group_tab_component_1.PolicyGroupTabComponent,
                role_tab_component_1.RoleTabComponent,
                logical_deployments_tab_component_1.LogicalDeploymentsTabComponent
            ]
        });
        fixture = testing_1.TestBed
            .overrideComponent(policy_group_tab_component_1.PolicyGroupTabComponent, {
            set: {
                template: ''
            }
        })
            .overrideComponent(role_tab_component_1.RoleTabComponent, {
            set: {
                template: ''
            }
        })
            .overrideComponent(logical_deployments_tab_component_1.LogicalDeploymentsTabComponent, {
            set: {
                template: ''
            }
        })
            .createComponent(view_node_component_1.ViewNodeComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlldy1ub2RlLmNvbXBvbmVudC5zcGVjLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vY29uY291cnNlL2phdmFzY3JpcHQvY29uY291cnNlLWFwcC9zcmMvYXBwL29yZy10cmVlL3ZpZXctbm9kZS92aWV3LW5vZGUuY29tcG9uZW50LnNwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxtREFBa0U7QUFDbEUscURBQThEO0FBQzlELDBFQUFxRTtBQUNyRSx1Q0FBMEM7QUFDMUMsNkNBQWdEO0FBQ2hELCtCQUF1QztBQUV2QyxtRUFBK0Q7QUFDL0Qsc0RBT2tDO0FBQ2xDLGlHQUFpRztBQUNqRywwQ0FBaUU7QUFDakUsb0hBQThHO0FBQzlHLCtGQUF5RjtBQUN6Rix1RUFBa0U7QUFDbEUsK0RBQTBEO0FBRTFELFFBQVEsQ0FBQyxtQkFBbUIsRUFBRSxHQUFHLEVBQUU7SUFDakMsSUFBSSxTQUE0QixDQUFDO0lBQ2pDLElBQUksT0FBNEMsQ0FBQztJQUNqRCxNQUFNLG9CQUFvQixtQ0FBUSxpQkFBaUIsQ0FBQyxPQUFPLEVBQUUsS0FBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxJQUFJLEdBQUUsQ0FBQztJQUU3RixVQUFVLENBQUMsR0FBRyxFQUFFO1FBQ2QsaUJBQU8sQ0FBQyxzQkFBc0IsQ0FBQztZQUM3QixPQUFPLEVBQUU7Z0JBQ1AsNkJBQW1CO2dCQUNuQix1Q0FBaUI7Z0JBQ2pCLG1CQUFXLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQztnQkFDdkIsaUJBQVUsQ0FBQyxPQUFPLEVBQUU7Z0JBQ3BCLDRCQUFZO2FBQ2I7WUFDRCxTQUFTLEVBQUU7Z0JBQ1QsaUJBQVUsQ0FBQywwQkFBZ0IsQ0FBQztnQkFDNUIsaUJBQVUsQ0FBQyw0QkFBa0IsRUFBRTtvQkFDN0Isb0JBQW9CLEVBQUUsSUFBSSxzQkFBZSxDQUFDLG9CQUFvQixDQUFDO29CQUMvRCxxQkFBcUIsRUFBRSxJQUFJLHNCQUFlLENBQUMsb0JBQW9CLENBQUM7aUJBQ2pFLENBQUM7Z0JBQ0YsaUJBQVUsQ0FBQyx5QkFBZSxDQUFDO2dCQUMzQixpQkFBVSxDQUFDLHFCQUFXLENBQUM7Z0JBQ3ZCLGlCQUFVLENBQUMsMkJBQWlCLENBQUM7Z0JBQzdCLGlCQUFVLENBQUMsaUNBQXVCLENBQUM7Z0JBQ25DLEdBQUcseUJBQWtCO2FBQ3RCO1lBQ0QsWUFBWSxFQUFFO2dCQUNaLHVDQUFpQjtnQkFDakIsb0RBQXVCO2dCQUN2QixxQ0FBZ0I7Z0JBQ2hCLGtFQUE4QjthQUMvQjtTQUNGLENBQUMsQ0FBQztRQUVILE9BQU8sR0FBRyxpQkFBTzthQUNkLGlCQUFpQixDQUFDLG9EQUF1QixFQUFFO1lBQzFDLEdBQUcsRUFBRTtnQkFDSCxRQUFRLEVBQUUsRUFBRTthQUNiO1NBQ0YsQ0FBQzthQUNELGlCQUFpQixDQUFDLHFDQUFnQixFQUFFO1lBQ25DLEdBQUcsRUFBRTtnQkFDSCxRQUFRLEVBQUUsRUFBRTthQUNiO1NBQ0YsQ0FBQzthQUNELGlCQUFpQixDQUFDLGtFQUE4QixFQUFFO1lBQ2pELEdBQUcsRUFBRTtnQkFDSCxRQUFRLEVBQUUsRUFBRTthQUNiO1NBQ0YsQ0FBQzthQUNELGVBQWUsQ0FBQyx1Q0FBaUIsQ0FBQyxDQUFDO1FBRXRDLFNBQVMsR0FBRyxPQUFPLENBQUMsaUJBQWlCLENBQUM7UUFDdEMsT0FBTyxDQUFDLGFBQWEsRUFBRSxDQUFDO0lBQzFCLENBQUMsQ0FBQyxDQUFDO0lBRUgsRUFBRSxDQUFDLGVBQWUsRUFBRSxHQUFHLEVBQUU7UUFDdkIsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDLFVBQVUsRUFBRSxDQUFDO0lBQ2pDLENBQUMsQ0FBQyxDQUFDO0FBRUwsQ0FBQyxDQUFDLENBQUMifQ==