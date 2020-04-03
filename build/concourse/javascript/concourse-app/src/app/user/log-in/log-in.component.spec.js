"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const testing_1 = require("@angular/core/testing");
const forms_1 = require("@angular/forms");
const testing_2 = require("@angular/router/testing");
const store_1 = require("@ngrx/store");
const alert_1 = require("ngx-bootstrap/alert");
const dynamic_form_1 = require("@concourse/shared/dynamic-form");
const shared_module_1 = require("@concourse/shared/shared.module");
const facades_1 = require("@concourse/store/facades");
const test_1 = require("@concourse/test");
const log_in_component_1 = require("./log-in.component");
const ngx_cookie_service_1 = require("ngx-cookie-service");
describe('LogInComponent', () => {
    let component;
    let fixture;
    beforeEach(testing_1.async(() => {
        testing_1.TestBed.configureTestingModule({
            schemas: [core_1.NO_ERRORS_SCHEMA],
            imports: [
                testing_2.RouterTestingModule,
                forms_1.ReactiveFormsModule,
                store_1.StoreModule.forRoot({}),
                alert_1.AlertModule.forRoot(),
                dynamic_form_1.DynamicFormModule,
                shared_module_1.SharedModule
            ],
            providers: [
                test_1.mockFacade(facades_1.ApplicationErrorFacade),
                test_1.mockFacade(facades_1.AuthFacade),
                ngx_cookie_service_1.CookieService
            ],
            declarations: [log_in_component_1.LogInComponent]
        })
            .compileComponents();
    }));
    beforeEach(() => {
        fixture = testing_1.TestBed.createComponent(log_in_component_1.LogInComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9nLWluLmNvbXBvbmVudC5zcGVjLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vY29uY291cnNlL2phdmFzY3JpcHQvY29uY291cnNlLWFwcC9zcmMvYXBwL3VzZXIvbG9nLWluL2xvZy1pbi5jb21wb25lbnQuc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHdDQUFpRDtBQUNqRCxtREFBeUU7QUFDekUsMENBQXFEO0FBQ3JELHFEQUE4RDtBQUM5RCx1Q0FBMEM7QUFDMUMsK0NBQWtEO0FBRWxELGlFQUFtRTtBQUNuRSxtRUFBK0Q7QUFDL0Qsc0RBQThFO0FBQzlFLDBDQUE2QztBQUM3Qyx5REFBb0Q7QUFDcEQsMkRBQW1EO0FBRW5ELFFBQVEsQ0FBQyxnQkFBZ0IsRUFBRSxHQUFHLEVBQUU7SUFDOUIsSUFBSSxTQUF5QixDQUFDO0lBQzlCLElBQUksT0FBeUMsQ0FBQztJQUU5QyxVQUFVLENBQUMsZUFBSyxDQUFDLEdBQUcsRUFBRTtRQUNwQixpQkFBTyxDQUFDLHNCQUFzQixDQUFDO1lBQzdCLE9BQU8sRUFBRSxDQUFDLHVCQUFnQixDQUFDO1lBQzNCLE9BQU8sRUFBRTtnQkFDUCw2QkFBbUI7Z0JBQ25CLDJCQUFtQjtnQkFDbkIsbUJBQVcsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDO2dCQUN2QixtQkFBVyxDQUFDLE9BQU8sRUFBRTtnQkFDckIsZ0NBQWlCO2dCQUNqQiw0QkFBWTthQUNiO1lBQ0QsU0FBUyxFQUFFO2dCQUNULGlCQUFVLENBQUMsZ0NBQXNCLENBQUM7Z0JBQ2xDLGlCQUFVLENBQUMsb0JBQVUsQ0FBQztnQkFDdEIsa0NBQWE7YUFDZDtZQUNELFlBQVksRUFBRSxDQUFDLGlDQUFjLENBQUM7U0FDL0IsQ0FBQzthQUNDLGlCQUFpQixFQUFFLENBQUM7SUFDekIsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUVKLFVBQVUsQ0FBQyxHQUFHLEVBQUU7UUFDZCxPQUFPLEdBQUcsaUJBQU8sQ0FBQyxlQUFlLENBQUMsaUNBQWMsQ0FBQyxDQUFDO1FBQ2xELFNBQVMsR0FBRyxPQUFPLENBQUMsaUJBQWlCLENBQUM7UUFDdEMsT0FBTyxDQUFDLGFBQWEsRUFBRSxDQUFDO0lBQzFCLENBQUMsQ0FBQyxDQUFDO0lBRUgsRUFBRSxDQUFDLGVBQWUsRUFBRSxHQUFHLEVBQUU7UUFDdkIsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDLFVBQVUsRUFBRSxDQUFDO0lBQ2pDLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyxDQUFDLENBQUMifQ==