"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@angular/core/testing");
const forms_1 = require("@angular/forms");
const angular_fontawesome_1 = require("@fortawesome/angular-fontawesome");
const ng_select_1 = require("@ng-select/ng-select");
const store_1 = require("@ngrx/store");
const accordion_1 = require("ngx-bootstrap/accordion");
const alert_1 = require("ngx-bootstrap/alert");
const ngx_pipes_1 = require("ngx-pipes");
const rxjs_1 = require("rxjs");
const models_1 = require("@concourse/core/models");
const multi_step_form_module_1 = require("@concourse/shared/multi-part-form/multi-step-form.module");
const shared_module_1 = require("@concourse/shared/shared.module");
const facades_1 = require("@concourse/store/facades");
const test_1 = require("@concourse/test");
const enclave_form_modal_component_1 = require("./enclave-form-modal.component");
describe('EnclaveFormModalComponent', () => {
    let component;
    let fixture;
    beforeEach(testing_1.async(() => {
        testing_1.TestBed.configureTestingModule({
            imports: [
                forms_1.ReactiveFormsModule,
                angular_fontawesome_1.FontAwesomeModule,
                store_1.StoreModule.forRoot({}),
                alert_1.AlertModule.forRoot(),
                accordion_1.AccordionModule.forRoot(),
                ngx_pipes_1.NgArrayPipesModule,
                ngx_pipes_1.NgStringPipesModule,
                ng_select_1.NgSelectModule,
                shared_module_1.SharedModule,
                multi_step_form_module_1.MultiStepFormModule
            ],
            providers: [
                test_1.mockFacade(facades_1.ModalStoreFacade),
                test_1.mockFacade(facades_1.AssetFacade),
                test_1.mockFacade(facades_1.PolicyViolationFacade, {
                    unsavedModelEvaluation$: new rxjs_1.BehaviorSubject({
                        response: new models_1.CommonEvaluation().deserialize({
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
                test_1.mockFacade(facades_1.AttributeTagFacade),
                test_1.mockFacade(facades_1.ApplicationErrorFacade)
            ],
            declarations: [enclave_form_modal_component_1.EnclaveFormModalComponent]
        })
            .compileComponents();
    }));
    beforeEach(() => {
        fixture = testing_1.TestBed.createComponent(enclave_form_modal_component_1.EnclaveFormModalComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW5jbGF2ZS1mb3JtLW1vZGFsLmNvbXBvbmVudC5zcGVjLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vY29uY291cnNlL2phdmFzY3JpcHQvY29uY291cnNlLWFwcC9zcmMvYXBwL2NvcmUvbW9kYWwvY29tcG9uZW50cy9lbmNsYXZlLWZvcm0tbW9kYWwvZW5jbGF2ZS1mb3JtLW1vZGFsLmNvbXBvbmVudC5zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsbURBQXlFO0FBQ3pFLDBDQUFxRDtBQUNyRCwwRUFBcUU7QUFDckUsb0RBQXNEO0FBQ3RELHVDQUEwQztBQUMxQyx1REFBMEQ7QUFDMUQsK0NBQWtEO0FBQ2xELHlDQUFvRTtBQUNwRSwrQkFBdUM7QUFFdkMsbURBQTBEO0FBQzFELHFHQUErRjtBQUMvRixtRUFBK0Q7QUFDL0Qsc0RBTWtDO0FBQ2xDLDBDQUE2QztBQUM3QyxpRkFBMkU7QUFFM0UsUUFBUSxDQUFDLDJCQUEyQixFQUFFLEdBQUcsRUFBRTtJQUN6QyxJQUFJLFNBQW9DLENBQUM7SUFDekMsSUFBSSxPQUFvRCxDQUFDO0lBRXpELFVBQVUsQ0FBQyxlQUFLLENBQUMsR0FBRyxFQUFFO1FBQ3BCLGlCQUFPLENBQUMsc0JBQXNCLENBQUM7WUFDN0IsT0FBTyxFQUFFO2dCQUNQLDJCQUFtQjtnQkFDbkIsdUNBQWlCO2dCQUNqQixtQkFBVyxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUM7Z0JBQ3ZCLG1CQUFXLENBQUMsT0FBTyxFQUFFO2dCQUNyQiwyQkFBZSxDQUFDLE9BQU8sRUFBRTtnQkFDekIsOEJBQWtCO2dCQUNsQiwrQkFBbUI7Z0JBQ25CLDBCQUFjO2dCQUNkLDRCQUFZO2dCQUNaLDRDQUFtQjthQUNwQjtZQUNELFNBQVMsRUFBRTtnQkFDVCxpQkFBVSxDQUFDLDBCQUFnQixDQUFDO2dCQUM1QixpQkFBVSxDQUFDLHFCQUFXLENBQUM7Z0JBQ3ZCLGlCQUFVLENBQUMsK0JBQXFCLEVBQUU7b0JBQ2hDLHVCQUF1QixFQUFFLElBQUksc0JBQWUsQ0FBQzt3QkFDM0MsUUFBUSxFQUFFLElBQUkseUJBQWdCLEVBQUUsQ0FBQyxXQUFXLENBQUM7NEJBQzNDLEtBQUssRUFBRSxRQUFROzRCQUNmLGdCQUFnQixFQUFFO2dDQUNoQjtvQ0FDRSxRQUFRLEVBQUUsS0FBSztvQ0FDZixhQUFhLEVBQUUsS0FBSztvQ0FDcEIsVUFBVSxFQUFFO3dDQUNWOzRDQUNFLElBQUksRUFBRSxxQ0FBcUM7NENBQzNDLE9BQU8sRUFBRSx1SEFBdUg7eUNBQ2pJO3dDQUNEOzRDQUNFLElBQUksRUFBRSxnREFBZ0Q7NENBQ3RELE9BQU8sRUFBRSx1SEFBdUg7eUNBQ2pJO3FDQUNGO2lDQUNGOzZCQUNGOzRCQUNELGdCQUFnQixFQUFFLGVBQWU7eUJBQ2xDLENBQUM7cUJBQ0gsQ0FBQztpQkFDSCxDQUFDO2dCQUNGLGlCQUFVLENBQUMsNEJBQWtCLENBQUM7Z0JBQzlCLGlCQUFVLENBQUMsZ0NBQXNCLENBQUM7YUFDbkM7WUFDRCxZQUFZLEVBQUUsQ0FBQyx3REFBeUIsQ0FBQztTQUMxQyxDQUFDO2FBQ0MsaUJBQWlCLEVBQUUsQ0FBQztJQUN6QixDQUFDLENBQUMsQ0FBQyxDQUFDO0lBRUosVUFBVSxDQUFDLEdBQUcsRUFBRTtRQUNkLE9BQU8sR0FBRyxpQkFBTyxDQUFDLGVBQWUsQ0FBQyx3REFBeUIsQ0FBQyxDQUFDO1FBQzdELFNBQVMsR0FBRyxPQUFPLENBQUMsaUJBQWlCLENBQUM7UUFDdEMsT0FBTyxDQUFDLGFBQWEsRUFBRSxDQUFDO0lBQzFCLENBQUMsQ0FBQyxDQUFDO0lBRUgsRUFBRSxDQUFDLGVBQWUsRUFBRSxHQUFHLEVBQUU7UUFDdkIsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDLFVBQVUsRUFBRSxDQUFDO0lBQ2pDLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyxDQUFDLENBQUMifQ==