"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const testing_1 = require("@angular/core/testing");
const forms_1 = require("@angular/forms");
const dynamic_form_1 = require("@concourse/shared/dynamic-form");
const shared_module_1 = require("@concourse/shared/shared.module");
const angular_fontawesome_1 = require("@fortawesome/angular-fontawesome");
const store_1 = require("@ngrx/store");
const ng_select_1 = require("@ng-select/ng-select");
const test_1 = require("@concourse/test");
const rxjs_1 = require("rxjs");
const create_cloud_user_role_component_1 = require("./create-cloud-user-role.component");
const facades_1 = require("@concourse/store/facades");
xdescribe('CreateCloudUserRoleComponent', () => {
    let component;
    let fixture;
    beforeEach(testing_1.async(() => {
        testing_1.TestBed.configureTestingModule({
            schemas: [core_1.NO_ERRORS_SCHEMA],
            declarations: [create_cloud_user_role_component_1.CreateCloudUserRoleComponent],
            imports: [
                shared_module_1.SharedModule,
                dynamic_form_1.DynamicFormModule,
                angular_fontawesome_1.FontAwesomeModule,
                store_1.StoreModule.forRoot({}),
                forms_1.FormsModule,
                forms_1.ReactiveFormsModule,
                ng_select_1.NgSelectModule
            ],
            providers: [
                test_1.mockFacade(facades_1.ApplicationErrorFacade),
                test_1.mockFacade(facades_1.CatalogServiceFacade, {
                    awsActions$: new rxjs_1.BehaviorSubject([]),
                    azureActions$: new rxjs_1.BehaviorSubject([])
                }),
                test_1.mockFacade(facades_1.CloudRoleFacade, {
                    list$: new rxjs_1.BehaviorSubject([])
                }),
            ]
        })
            .compileComponents();
    }));
    beforeEach(() => {
        fixture = testing_1.TestBed.createComponent(create_cloud_user_role_component_1.CreateCloudUserRoleComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRlLWNsb3VkLXVzZXItcm9sZS5jb21wb25lbnQuc3BlYy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL2NvbmNvdXJzZS9qYXZhc2NyaXB0L2NvbmNvdXJzZS1hcHAvc3JjL2FwcC9jb3JlL21vZGFsL2NvbXBvbmVudHMvY3JlYXRlLWNsb3VkLXVzZXItcm9sZS9jcmVhdGUtY2xvdWQtdXNlci1yb2xlLmNvbXBvbmVudC5zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsd0NBQWlEO0FBQ2pELG1EQUF5RTtBQUN6RSwwQ0FBa0U7QUFDbEUsaUVBQW1FO0FBQ25FLG1FQUErRDtBQUMvRCwwRUFBcUU7QUFDckUsdUNBQTBDO0FBQzFDLG9EQUFzRDtBQUN0RCwwQ0FBNkM7QUFDN0MsK0JBQXVDO0FBQ3ZDLHlGQUFrRjtBQUNsRixzREFBeUc7QUFFekcsU0FBUyxDQUFDLDhCQUE4QixFQUFFLEdBQUcsRUFBRTtJQUM3QyxJQUFJLFNBQXVDLENBQUM7SUFDNUMsSUFBSSxPQUF1RCxDQUFDO0lBRTVELFVBQVUsQ0FBQyxlQUFLLENBQUMsR0FBRyxFQUFFO1FBQ3BCLGlCQUFPLENBQUMsc0JBQXNCLENBQUM7WUFDN0IsT0FBTyxFQUFFLENBQUMsdUJBQWdCLENBQUM7WUFDM0IsWUFBWSxFQUFFLENBQUUsK0RBQTRCLENBQUU7WUFDOUMsT0FBTyxFQUFFO2dCQUNQLDRCQUFZO2dCQUNaLGdDQUFpQjtnQkFDakIsdUNBQWlCO2dCQUNqQixtQkFBVyxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUM7Z0JBQ3ZCLG1CQUFXO2dCQUNYLDJCQUFtQjtnQkFDbkIsMEJBQWM7YUFDZjtZQUNELFNBQVMsRUFBRTtnQkFDVCxpQkFBVSxDQUFDLGdDQUFzQixDQUFDO2dCQUNsQyxpQkFBVSxDQUFDLDhCQUFvQixFQUFFO29CQUMvQixXQUFXLEVBQUUsSUFBSSxzQkFBZSxDQUFDLEVBQUUsQ0FBQztvQkFDcEMsYUFBYSxFQUFFLElBQUksc0JBQWUsQ0FBQyxFQUFFLENBQUM7aUJBQ3ZDLENBQUM7Z0JBQ0YsaUJBQVUsQ0FBQyx5QkFBZSxFQUFFO29CQUMxQixLQUFLLEVBQUUsSUFBSSxzQkFBZSxDQUFDLEVBQUUsQ0FBQztpQkFDL0IsQ0FBQzthQUNIO1NBQ0YsQ0FBQzthQUNELGlCQUFpQixFQUFFLENBQUM7SUFDdkIsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUVKLFVBQVUsQ0FBQyxHQUFHLEVBQUU7UUFDZCxPQUFPLEdBQUcsaUJBQU8sQ0FBQyxlQUFlLENBQUMsK0RBQTRCLENBQUMsQ0FBQztRQUNoRSxTQUFTLEdBQUcsT0FBTyxDQUFDLGlCQUFpQixDQUFDO1FBQ3RDLE9BQU8sQ0FBQyxhQUFhLEVBQUUsQ0FBQztJQUMxQixDQUFDLENBQUMsQ0FBQztJQUVILEVBQUUsQ0FBQyxlQUFlLEVBQUUsR0FBRyxFQUFFO1FBQ3ZCLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQyxVQUFVLEVBQUUsQ0FBQztJQUNqQyxDQUFDLENBQUMsQ0FBQztBQUNMLENBQUMsQ0FBQyxDQUFDIn0=