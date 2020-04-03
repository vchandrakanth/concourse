"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const testing_1 = require("@angular/core/testing");
const angular_fontawesome_1 = require("@fortawesome/angular-fontawesome");
const store_1 = require("@ngrx/store");
const alert_1 = require("ngx-bootstrap/alert");
const dynamic_form_1 = require("@concourse/shared/dynamic-form");
const facades_1 = require("@concourse/store/facades");
const test_1 = require("@concourse/test");
const update_policy_group_metadata_component_1 = require("./update-policy-group-metadata.component");
describe('UpdatePolicyMetadataComponent', () => {
    let component;
    let fixture;
    beforeEach(testing_1.async(() => {
        testing_1.TestBed.configureTestingModule({
            schemas: [core_1.NO_ERRORS_SCHEMA],
            imports: [
                store_1.StoreModule.forRoot({}),
                angular_fontawesome_1.FontAwesomeModule,
                dynamic_form_1.DynamicFormModule,
                alert_1.AlertModule.forRoot()
            ],
            providers: [
                test_1.mockFacade(facades_1.PolicyGroupFacade)
            ],
            declarations: [update_policy_group_metadata_component_1.UpdatePolicyGroupMetadataComponent]
        })
            .compileComponents();
    }));
    beforeEach(() => {
        fixture = testing_1.TestBed.createComponent(update_policy_group_metadata_component_1.UpdatePolicyGroupMetadataComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXBkYXRlLXBvbGljeS1ncm91cC1tZXRhZGF0YS5jb21wb25lbnQuc3BlYy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL2NvbmNvdXJzZS9qYXZhc2NyaXB0L2NvbmNvdXJzZS1hcHAvc3JjL2FwcC9jb3JlL21vZGFsL2NvbXBvbmVudHMvdXBkYXRlLXBvbGljeS1ncm91cC1tZXRhZGF0YS91cGRhdGUtcG9saWN5LWdyb3VwLW1ldGFkYXRhLmNvbXBvbmVudC5zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsd0NBQWlEO0FBQ2pELG1EQUF5RTtBQUN6RSwwRUFBcUU7QUFDckUsdUNBQTBDO0FBQzFDLCtDQUFrRDtBQUVsRCxpRUFBbUU7QUFDbkUsc0RBQTZEO0FBQzdELDBDQUE2QztBQUM3QyxxR0FBOEY7QUFFOUYsUUFBUSxDQUFDLCtCQUErQixFQUFFLEdBQUcsRUFBRTtJQUM3QyxJQUFJLFNBQTZDLENBQUM7SUFDbEQsSUFBSSxPQUE2RCxDQUFDO0lBRWxFLFVBQVUsQ0FBQyxlQUFLLENBQUMsR0FBRyxFQUFFO1FBQ3BCLGlCQUFPLENBQUMsc0JBQXNCLENBQUM7WUFDN0IsT0FBTyxFQUFFLENBQUMsdUJBQWdCLENBQUM7WUFDM0IsT0FBTyxFQUFFO2dCQUNQLG1CQUFXLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQztnQkFDdkIsdUNBQWlCO2dCQUNqQixnQ0FBaUI7Z0JBQ2pCLG1CQUFXLENBQUMsT0FBTyxFQUFFO2FBQ3RCO1lBQ0QsU0FBUyxFQUFFO2dCQUNULGlCQUFVLENBQUMsMkJBQWlCLENBQUM7YUFDOUI7WUFDRCxZQUFZLEVBQUUsQ0FBQywyRUFBa0MsQ0FBQztTQUNuRCxDQUFDO2FBQ0MsaUJBQWlCLEVBQUUsQ0FBQztJQUN6QixDQUFDLENBQUMsQ0FBQyxDQUFDO0lBRUosVUFBVSxDQUFDLEdBQUcsRUFBRTtRQUNkLE9BQU8sR0FBRyxpQkFBTyxDQUFDLGVBQWUsQ0FBQywyRUFBa0MsQ0FBQyxDQUFDO1FBQ3RFLFNBQVMsR0FBRyxPQUFPLENBQUMsaUJBQWlCLENBQUM7UUFDdEMsT0FBTyxDQUFDLGFBQWEsRUFBRSxDQUFDO0lBQzFCLENBQUMsQ0FBQyxDQUFDO0lBRUgsRUFBRSxDQUFDLGVBQWUsRUFBRSxHQUFHLEVBQUU7UUFDdkIsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDLFVBQVUsRUFBRSxDQUFDO0lBQ2pDLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyxDQUFDLENBQUMifQ==