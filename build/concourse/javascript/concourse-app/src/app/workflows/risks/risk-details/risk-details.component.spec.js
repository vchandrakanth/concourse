"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const testing_1 = require("@angular/core/testing");
const animations_1 = require("@angular/platform-browser/animations");
const angular_fontawesome_1 = require("@fortawesome/angular-fontawesome");
const store_1 = require("@ngrx/store");
const ngx_pipes_1 = require("ngx-pipes");
const rxjs_1 = require("rxjs");
const models_1 = require("@concourse/core/models");
const shared_module_1 = require("@concourse/shared/shared.module");
const facades_1 = require("@concourse/store/facades");
const test_1 = require("@concourse/test");
const risk_details_component_1 = require("./risk-details.component");
describe('PolicyResolutionsViewComponent', () => {
    let component;
    let fixture;
    beforeEach(testing_1.async(() => {
        testing_1.TestBed.configureTestingModule({
            schemas: [core_1.NO_ERRORS_SCHEMA],
            imports: [
                animations_1.NoopAnimationsModule,
                angular_fontawesome_1.FontAwesomeModule,
                store_1.StoreModule.forRoot({}),
                shared_module_1.SharedModule,
                ngx_pipes_1.NgArrayPipesModule
            ],
            providers: [
                test_1.mockFacade(facades_1.ApplicationErrorFacade),
                test_1.mockFacade(facades_1.PolicyViolationFacade, {
                    savedModelEvaluation$: new rxjs_1.BehaviorSubject({
                        evaluation: new models_1.CommonEvaluation().deserialize({
                            state: 'FAILED',
                            policyViolations: [
                                {
                                    policyId: 20002,
                                    policyGroupId: 60002,
                                    violations: [
                                        {
                                            name: 'EFS Self Referencing Security Group',
                                            details: 'All Security Group Ingress and Egress resources must be configured to route traffic within the source security group.'
                                        },
                                        {
                                            name: 'RDS DBInstance Self Referencing Security Group',
                                            details: 'All Security Group Ingress and Egress resources must be configured to route traffic within the source security group.'
                                        }
                                    ]
                                }
                            ],
                            evaluationTimeMs: '1556736188890'
                        })
                    })
                }),
                test_1.mockFacade(facades_1.PolicyResolutionFacade),
                test_1.mockFacade(facades_1.UserFacade)
            ],
            declarations: [risk_details_component_1.RiskDetailsComponent]
        })
            .compileComponents();
    }));
    beforeEach(() => {
        fixture = testing_1.TestBed.createComponent(risk_details_component_1.RiskDetailsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmlzay1kZXRhaWxzLmNvbXBvbmVudC5zcGVjLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vY29uY291cnNlL2phdmFzY3JpcHQvY29uY291cnNlLWFwcC9zcmMvYXBwL3dvcmtmbG93cy9yaXNrcy9yaXNrLWRldGFpbHMvcmlzay1kZXRhaWxzLmNvbXBvbmVudC5zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsd0NBQWlEO0FBQ2pELG1EQUF5RTtBQUN6RSxxRUFBNEU7QUFDNUUsMEVBQXFFO0FBQ3JFLHVDQUEwQztBQUMxQyx5Q0FBK0M7QUFDL0MsK0JBQXVDO0FBRXZDLG1EQUEwRDtBQUMxRCxtRUFBK0Q7QUFDL0Qsc0RBS2tDO0FBQ2xDLDBDQUE2QztBQUM3QyxxRUFBZ0U7QUFFaEUsUUFBUSxDQUFDLGdDQUFnQyxFQUFFLEdBQUcsRUFBRTtJQUM5QyxJQUFJLFNBQStCLENBQUM7SUFDcEMsSUFBSSxPQUErQyxDQUFDO0lBRXBELFVBQVUsQ0FBQyxlQUFLLENBQUMsR0FBRyxFQUFFO1FBQ3BCLGlCQUFPLENBQUMsc0JBQXNCLENBQUM7WUFDN0IsT0FBTyxFQUFFLENBQUMsdUJBQWdCLENBQUM7WUFDM0IsT0FBTyxFQUFFO2dCQUNQLGlDQUFvQjtnQkFDcEIsdUNBQWlCO2dCQUNqQixtQkFBVyxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUM7Z0JBQ3ZCLDRCQUFZO2dCQUNaLDhCQUFrQjthQUNuQjtZQUNELFNBQVMsRUFBRTtnQkFDVCxpQkFBVSxDQUFDLGdDQUFzQixDQUFDO2dCQUNsQyxpQkFBVSxDQUFDLCtCQUFxQixFQUFFO29CQUNoQyxxQkFBcUIsRUFBRSxJQUFJLHNCQUFlLENBQUM7d0JBQ3pDLFVBQVUsRUFBRSxJQUFJLHlCQUFnQixFQUFFLENBQUMsV0FBVyxDQUFDOzRCQUM3QyxLQUFLLEVBQUUsUUFBUTs0QkFDZixnQkFBZ0IsRUFBRTtnQ0FDaEI7b0NBQ0UsUUFBUSxFQUFFLEtBQUs7b0NBQ2YsYUFBYSxFQUFFLEtBQUs7b0NBQ3BCLFVBQVUsRUFBRTt3Q0FDVjs0Q0FDRSxJQUFJLEVBQUUscUNBQXFDOzRDQUMzQyxPQUFPLEVBQUUsdUhBQXVIO3lDQUNqSTt3Q0FDRDs0Q0FDRSxJQUFJLEVBQUUsZ0RBQWdEOzRDQUN0RCxPQUFPLEVBQUUsdUhBQXVIO3lDQUNqSTtxQ0FDRjtpQ0FDRjs2QkFDRjs0QkFDRCxnQkFBZ0IsRUFBRSxlQUFlO3lCQUNsQyxDQUFDO3FCQUNILENBQUM7aUJBQ0gsQ0FBQztnQkFDRixpQkFBVSxDQUFDLGdDQUFzQixDQUFDO2dCQUNsQyxpQkFBVSxDQUFDLG9CQUFVLENBQUM7YUFDdkI7WUFDRCxZQUFZLEVBQUUsQ0FBQyw2Q0FBb0IsQ0FBQztTQUNyQyxDQUFDO2FBQ0MsaUJBQWlCLEVBQUUsQ0FBQztJQUN6QixDQUFDLENBQUMsQ0FBQyxDQUFDO0lBRUosVUFBVSxDQUFDLEdBQUcsRUFBRTtRQUNkLE9BQU8sR0FBRyxpQkFBTyxDQUFDLGVBQWUsQ0FBQyw2Q0FBb0IsQ0FBQyxDQUFDO1FBQ3hELFNBQVMsR0FBRyxPQUFPLENBQUMsaUJBQWlCLENBQUM7UUFDdEMsT0FBTyxDQUFDLGFBQWEsRUFBRSxDQUFDO0lBQzFCLENBQUMsQ0FBQyxDQUFDO0lBRUgsRUFBRSxDQUFDLGVBQWUsRUFBRSxHQUFHLEVBQUU7UUFDdkIsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDLFVBQVUsRUFBRSxDQUFDO0lBQ2pDLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyxDQUFDLENBQUMifQ==