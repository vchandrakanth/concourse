"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const testing_1 = require("@angular/core/testing");
const testing_2 = require("@angular/router/testing");
const angular_fontawesome_1 = require("@fortawesome/angular-fontawesome");
const store_1 = require("@ngrx/store");
const accordion_1 = require("ngx-bootstrap/accordion");
const tabs_1 = require("ngx-bootstrap/tabs");
const dynamic_form_1 = require("@concourse/shared/dynamic-form");
const shared_module_1 = require("@concourse/shared/shared.module");
const auth_facade_1 = require("@concourse/store/auth/state/auth.facade");
const dashboard_facade_1 = require("@concourse/store/dashboard/state/dashboard.facade");
const group_facade_1 = require("@concourse/store/group/state/group.facade");
const policy_group_facade_1 = require("@concourse/store/policy-group/state/policy-group.facade");
const surface_layer_facade_1 = require("@concourse/store/surface-layer/state/surface-layer.facade");
const user_facade_1 = require("@concourse/store/user/state/user.facade");
const test_1 = require("@concourse/test");
const dashboard_component_1 = require("./dashboard.component");
describe('DashboardComponent', () => {
    let component;
    let fixture;
    beforeEach(testing_1.async(() => {
        testing_1.TestBed.configureTestingModule({
            schemas: [core_1.NO_ERRORS_SCHEMA],
            imports: [
                testing_2.RouterTestingModule,
                store_1.StoreModule.forRoot({}),
                angular_fontawesome_1.FontAwesomeModule,
                tabs_1.TabsModule.forRoot(),
                accordion_1.AccordionModule.forRoot(),
                dynamic_form_1.DynamicFormModule,
                shared_module_1.SharedModule
            ],
            providers: [
                test_1.mockFacade(dashboard_facade_1.DashboardFacade),
                test_1.mockFacade(policy_group_facade_1.PolicyGroupFacade),
                test_1.mockFacade(user_facade_1.UserFacade),
                test_1.mockFacade(group_facade_1.GroupFacade),
                test_1.mockFacade(surface_layer_facade_1.SurfaceLayerFacade),
                test_1.mockFacade(auth_facade_1.AuthFacade)
            ],
            declarations: [dashboard_component_1.DashboardComponent]
        })
            .compileComponents();
    }));
    beforeEach(() => {
        fixture = testing_1.TestBed.createComponent(dashboard_component_1.DashboardComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGFzaGJvYXJkLmNvbXBvbmVudC5zcGVjLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vY29uY291cnNlL2phdmFzY3JpcHQvY29uY291cnNlLWFwcC9zcmMvYXBwL2Rhc2hib2FyZC9kYXNoYm9hcmQvZGFzaGJvYXJkLmNvbXBvbmVudC5zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsd0NBQWlEO0FBQ2pELG1EQUF5RTtBQUN6RSxxREFBOEQ7QUFDOUQsMEVBQXFFO0FBQ3JFLHVDQUEwQztBQUMxQyx1REFBMEQ7QUFDMUQsNkNBQWdEO0FBRWhELGlFQUFtRTtBQUNuRSxtRUFBK0Q7QUFDL0QseUVBQXFFO0FBQ3JFLHdGQUFvRjtBQUNwRiw0RUFBd0U7QUFDeEUsaUdBQTRGO0FBQzVGLG9HQUErRjtBQUMvRix5RUFBcUU7QUFDckUsMENBQTZDO0FBQzdDLCtEQUEyRDtBQUUzRCxRQUFRLENBQUMsb0JBQW9CLEVBQUUsR0FBRyxFQUFFO0lBQ2xDLElBQUksU0FBNkIsQ0FBQztJQUNsQyxJQUFJLE9BQTZDLENBQUM7SUFFbEQsVUFBVSxDQUFDLGVBQUssQ0FBQyxHQUFHLEVBQUU7UUFDcEIsaUJBQU8sQ0FBQyxzQkFBc0IsQ0FBQztZQUM3QixPQUFPLEVBQUUsQ0FBQyx1QkFBZ0IsQ0FBQztZQUMzQixPQUFPLEVBQUU7Z0JBQ1AsNkJBQW1CO2dCQUNuQixtQkFBVyxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUM7Z0JBQ3ZCLHVDQUFpQjtnQkFDakIsaUJBQVUsQ0FBQyxPQUFPLEVBQUU7Z0JBQ3BCLDJCQUFlLENBQUMsT0FBTyxFQUFFO2dCQUN6QixnQ0FBaUI7Z0JBQ2pCLDRCQUFZO2FBQ2I7WUFDRCxTQUFTLEVBQUU7Z0JBQ1QsaUJBQVUsQ0FBQyxrQ0FBZSxDQUFDO2dCQUMzQixpQkFBVSxDQUFDLHVDQUFpQixDQUFDO2dCQUM3QixpQkFBVSxDQUFDLHdCQUFVLENBQUM7Z0JBQ3RCLGlCQUFVLENBQUMsMEJBQVcsQ0FBQztnQkFDdkIsaUJBQVUsQ0FBQyx5Q0FBa0IsQ0FBQztnQkFDOUIsaUJBQVUsQ0FBQyx3QkFBVSxDQUFDO2FBQ3ZCO1lBQ0QsWUFBWSxFQUFFLENBQUMsd0NBQWtCLENBQUM7U0FDbkMsQ0FBQzthQUNDLGlCQUFpQixFQUFFLENBQUM7SUFDekIsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUVKLFVBQVUsQ0FBQyxHQUFHLEVBQUU7UUFDZCxPQUFPLEdBQUcsaUJBQU8sQ0FBQyxlQUFlLENBQUMsd0NBQWtCLENBQUMsQ0FBQztRQUN0RCxTQUFTLEdBQUcsT0FBTyxDQUFDLGlCQUFpQixDQUFDO1FBQ3RDLE9BQU8sQ0FBQyxhQUFhLEVBQUUsQ0FBQztJQUMxQixDQUFDLENBQUMsQ0FBQztJQUVILEVBQUUsQ0FBQyxlQUFlLEVBQUUsR0FBRyxFQUFFO1FBQ3ZCLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQyxVQUFVLEVBQUUsQ0FBQztJQUNqQyxDQUFDLENBQUMsQ0FBQztBQUNMLENBQUMsQ0FBQyxDQUFDIn0=