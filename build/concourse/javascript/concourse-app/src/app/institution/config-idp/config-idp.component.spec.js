"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const testing_1 = require("@angular/core/testing");
const forms_1 = require("@angular/forms");
const feature_flag_facade_1 = require("@concourse/core/feature-flags/state/feature-flag.facade");
const shared_module_1 = require("@concourse/shared/shared.module");
const facades_1 = require("@concourse/store/facades");
const test_1 = require("@concourse/test");
const config_idp_component_1 = require("./config-idp.component");
describe('ConfigIdpComponent', () => {
    let component;
    let fixture;
    beforeEach(testing_1.async(() => {
        testing_1.TestBed.configureTestingModule({
            schemas: [core_1.NO_ERRORS_SCHEMA],
            imports: [
                forms_1.ReactiveFormsModule,
                shared_module_1.SharedModule
            ],
            providers: [
                test_1.mockFacade(feature_flag_facade_1.FeatureFlagFacade),
                test_1.mockFacade(facades_1.ApplicationErrorFacade),
                test_1.mockFacade(facades_1.InstitutionFacade),
                test_1.mockFacade(facades_1.AuditHistoryFacade)
            ],
            declarations: [config_idp_component_1.ConfigIdpComponent]
        })
            .compileComponents();
    }));
    beforeEach(() => {
        fixture = testing_1.TestBed.createComponent(config_idp_component_1.ConfigIdpComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLWlkcC5jb21wb25lbnQuc3BlYy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL2NvbmNvdXJzZS9qYXZhc2NyaXB0L2NvbmNvdXJzZS1hcHAvc3JjL2FwcC9pbnN0aXR1dGlvbi9jb25maWctaWRwL2NvbmZpZy1pZHAuY29tcG9uZW50LnNwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSx3Q0FBaUQ7QUFDakQsbURBQXlFO0FBRXpFLDBDQUFxRDtBQUNyRCxpR0FBNEY7QUFDNUYsbUVBQStEO0FBQy9ELHNEQUF5RztBQUN6RywwQ0FBNkM7QUFDN0MsaUVBQTREO0FBRTVELFFBQVEsQ0FBQyxvQkFBb0IsRUFBRSxHQUFHLEVBQUU7SUFDbEMsSUFBSSxTQUE2QixDQUFDO0lBQ2xDLElBQUksT0FBNkMsQ0FBQztJQUVsRCxVQUFVLENBQUMsZUFBSyxDQUFDLEdBQUcsRUFBRTtRQUNwQixpQkFBTyxDQUFDLHNCQUFzQixDQUFDO1lBQzdCLE9BQU8sRUFBRSxDQUFDLHVCQUFnQixDQUFDO1lBQzNCLE9BQU8sRUFBRTtnQkFDUCwyQkFBbUI7Z0JBQ25CLDRCQUFZO2FBQ2I7WUFDRCxTQUFTLEVBQUU7Z0JBQ1QsaUJBQVUsQ0FBQyx1Q0FBaUIsQ0FBQztnQkFDN0IsaUJBQVUsQ0FBQyxnQ0FBc0IsQ0FBQztnQkFDbEMsaUJBQVUsQ0FBQywyQkFBaUIsQ0FBQztnQkFDN0IsaUJBQVUsQ0FBQyw0QkFBa0IsQ0FBQzthQUMvQjtZQUNELFlBQVksRUFBRSxDQUFDLHlDQUFrQixDQUFDO1NBQ25DLENBQUM7YUFDQyxpQkFBaUIsRUFBRSxDQUFDO0lBQ3pCLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFFSixVQUFVLENBQUMsR0FBRyxFQUFFO1FBQ2QsT0FBTyxHQUFHLGlCQUFPLENBQUMsZUFBZSxDQUFDLHlDQUFrQixDQUFDLENBQUM7UUFDdEQsU0FBUyxHQUFHLE9BQU8sQ0FBQyxpQkFBaUIsQ0FBQztRQUN0QyxPQUFPLENBQUMsYUFBYSxFQUFFLENBQUM7SUFDMUIsQ0FBQyxDQUFDLENBQUM7SUFFSCxFQUFFLENBQUMsZUFBZSxFQUFFLEdBQUcsRUFBRTtRQUN2QixNQUFNLENBQUMsU0FBUyxDQUFDLENBQUMsVUFBVSxFQUFFLENBQUM7SUFDakMsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDLENBQUMsQ0FBQyJ9