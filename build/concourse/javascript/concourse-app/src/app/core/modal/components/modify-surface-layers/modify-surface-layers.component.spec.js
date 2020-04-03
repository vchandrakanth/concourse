"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@angular/core/testing");
const forms_1 = require("@angular/forms");
const angular_fontawesome_1 = require("@fortawesome/angular-fontawesome");
const store_1 = require("@ngrx/store");
const rxjs_1 = require("rxjs");
const dynamic_form_1 = require("@concourse/shared/dynamic-form");
const shared_module_1 = require("@concourse/shared/shared.module");
const groupFaker = require("@concourse/store/group/services/group.faker");
const facades_1 = require("@concourse/store/facades");
const policyGroupTemplateFaker = require("@concourse/store/policy-group-template/services/policy-group-template.faker");
const policyGroupFaker = require("@concourse/store/policy-group/services/policy-group.faker");
const test_1 = require("@concourse/test");
const modify_surface_layers_component_1 = require("./modify-surface-layers.component");
describe('ModifySurfaceLayersComponent', () => {
    let component;
    let fixture;
    beforeEach(testing_1.async(() => {
        testing_1.TestBed.configureTestingModule({
            imports: [
                forms_1.ReactiveFormsModule,
                angular_fontawesome_1.FontAwesomeModule,
                store_1.StoreModule.forRoot({}),
                shared_module_1.SharedModule,
                dynamic_form_1.DynamicFormModule
            ],
            providers: [
                test_1.mockFacade(facades_1.SurfaceLayerFacade, {
                    list$: new rxjs_1.BehaviorSubject([]),
                    listWithChildrenBySurface$: new rxjs_1.BehaviorSubject([])
                }),
                test_1.mockFacade(facades_1.PolicyGroupFacade, {
                    selectedWithRelated$: new rxjs_1.BehaviorSubject(policyGroupFaker.fakeOne(policyGroupTemplateFaker.fakeOne(), [], [], [], groupFaker.fakeOne()))
                }),
                test_1.mockFacade(facades_1.ApplicationErrorFacade)
            ],
            declarations: [modify_surface_layers_component_1.ModifySurfaceLayersComponent]
        })
            .compileComponents();
    }));
    beforeEach(() => {
        fixture = testing_1.TestBed.createComponent(modify_surface_layers_component_1.ModifySurfaceLayersComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kaWZ5LXN1cmZhY2UtbGF5ZXJzLmNvbXBvbmVudC5zcGVjLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vY29uY291cnNlL2phdmFzY3JpcHQvY29uY291cnNlLWFwcC9zcmMvYXBwL2NvcmUvbW9kYWwvY29tcG9uZW50cy9tb2RpZnktc3VyZmFjZS1sYXllcnMvbW9kaWZ5LXN1cmZhY2UtbGF5ZXJzLmNvbXBvbmVudC5zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsbURBQXlFO0FBQ3pFLDBDQUFxRDtBQUNyRCwwRUFBcUU7QUFDckUsdUNBQTBDO0FBQzFDLCtCQUF1QztBQUV2QyxpRUFBbUU7QUFDbkUsbUVBQStEO0FBQy9ELDBFQUEwRTtBQUMxRSxzREFBeUc7QUFDekcsd0hBQXdIO0FBQ3hILDhGQUE4RjtBQUM5RiwwQ0FBNkM7QUFDN0MsdUZBQWlGO0FBRWpGLFFBQVEsQ0FBQyw4QkFBOEIsRUFBRSxHQUFHLEVBQUU7SUFDNUMsSUFBSSxTQUF1QyxDQUFDO0lBQzVDLElBQUksT0FBdUQsQ0FBQztJQUU1RCxVQUFVLENBQUMsZUFBSyxDQUFDLEdBQUcsRUFBRTtRQUNwQixpQkFBTyxDQUFDLHNCQUFzQixDQUFDO1lBQzdCLE9BQU8sRUFBRTtnQkFDUCwyQkFBbUI7Z0JBQ25CLHVDQUFpQjtnQkFDakIsbUJBQVcsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDO2dCQUN2Qiw0QkFBWTtnQkFDWixnQ0FBaUI7YUFDbEI7WUFDRCxTQUFTLEVBQUU7Z0JBQ1QsaUJBQVUsQ0FBQyw0QkFBa0IsRUFBRTtvQkFDN0IsS0FBSyxFQUFFLElBQUksc0JBQWUsQ0FBQyxFQUFFLENBQUM7b0JBQzlCLDBCQUEwQixFQUFFLElBQUksc0JBQWUsQ0FBQyxFQUFFLENBQUM7aUJBQ3BELENBQUM7Z0JBQ0YsaUJBQVUsQ0FBQywyQkFBaUIsRUFBRTtvQkFDNUIsb0JBQW9CLEVBQUUsSUFBSSxzQkFBZSxDQUN2QyxnQkFBZ0IsQ0FBQyxPQUFPLENBQUMsd0JBQXdCLENBQUMsT0FBTyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsVUFBVSxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQy9GO2lCQUNGLENBQUM7Z0JBQ0YsaUJBQVUsQ0FBQyxnQ0FBc0IsQ0FBQzthQUNuQztZQUNELFlBQVksRUFBRSxDQUFDLDhEQUE0QixDQUFDO1NBQzdDLENBQUM7YUFDQyxpQkFBaUIsRUFBRSxDQUFDO0lBQ3pCLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFFSixVQUFVLENBQUMsR0FBRyxFQUFFO1FBQ2QsT0FBTyxHQUFHLGlCQUFPLENBQUMsZUFBZSxDQUFDLDhEQUE0QixDQUFDLENBQUM7UUFDaEUsU0FBUyxHQUFHLE9BQU8sQ0FBQyxpQkFBaUIsQ0FBQztRQUN0QyxPQUFPLENBQUMsYUFBYSxFQUFFLENBQUM7SUFDMUIsQ0FBQyxDQUFDLENBQUM7SUFFSCxFQUFFLENBQUMsZUFBZSxFQUFFLEdBQUcsRUFBRTtRQUN2QixNQUFNLENBQUMsU0FBUyxDQUFDLENBQUMsVUFBVSxFQUFFLENBQUM7SUFDakMsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDLENBQUMsQ0FBQyJ9