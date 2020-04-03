"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const testing_1 = require("@angular/core/testing");
const store_1 = require("@ngrx/store");
const facades_1 = require("@concourse/store/facades");
const test_1 = require("@concourse/test");
const approval_details_component_1 = require("./approval-details.component");
describe('ApprovalDetailsComponent', () => {
    let component;
    let fixture;
    beforeEach(testing_1.async(() => {
        testing_1.TestBed.configureTestingModule({
            schemas: [core_1.NO_ERRORS_SCHEMA],
            imports: [
                store_1.StoreModule.forRoot({})
            ],
            declarations: [approval_details_component_1.ApprovalDetailsComponent],
            providers: [
                test_1.mockFacade(facades_1.ApprovalFacade),
                test_1.mockFacade(facades_1.UserFacade)
            ]
        })
            .compileComponents();
    }));
    beforeEach(() => {
        fixture = testing_1.TestBed.createComponent(approval_details_component_1.ApprovalDetailsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwcm92YWwtZGV0YWlscy5jb21wb25lbnQuc3BlYy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL2NvbmNvdXJzZS9qYXZhc2NyaXB0L2NvbmNvdXJzZS1hcHAvc3JjL2FwcC93b3JrZmxvd3MvYXBwcm92YWwvYXBwcm92YWwtZGV0YWlscy9hcHByb3ZhbC1kZXRhaWxzLmNvbXBvbmVudC5zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsd0NBQWlEO0FBQ2pELG1EQUF5RTtBQUN6RSx1Q0FBMEM7QUFFMUMsc0RBQXNFO0FBQ3RFLDBDQUE2QztBQUM3Qyw2RUFBd0U7QUFFeEUsUUFBUSxDQUFDLDBCQUEwQixFQUFFLEdBQUcsRUFBRTtJQUN4QyxJQUFJLFNBQW1DLENBQUM7SUFDeEMsSUFBSSxPQUFtRCxDQUFDO0lBRXhELFVBQVUsQ0FBQyxlQUFLLENBQUMsR0FBRyxFQUFFO1FBQ3BCLGlCQUFPLENBQUMsc0JBQXNCLENBQUM7WUFDN0IsT0FBTyxFQUFFLENBQUMsdUJBQWdCLENBQUM7WUFDM0IsT0FBTyxFQUFFO2dCQUNQLG1CQUFXLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQzthQUN4QjtZQUNELFlBQVksRUFBRSxDQUFDLHFEQUF3QixDQUFDO1lBQ3hDLFNBQVMsRUFBRTtnQkFDVCxpQkFBVSxDQUFDLHdCQUFjLENBQUM7Z0JBQzFCLGlCQUFVLENBQUMsb0JBQVUsQ0FBQzthQUFPO1NBQ2hDLENBQUM7YUFDQyxpQkFBaUIsRUFBRSxDQUFDO0lBQ3pCLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFFSixVQUFVLENBQUMsR0FBRyxFQUFFO1FBQ2QsT0FBTyxHQUFHLGlCQUFPLENBQUMsZUFBZSxDQUFDLHFEQUF3QixDQUFDLENBQUM7UUFDNUQsU0FBUyxHQUFHLE9BQU8sQ0FBQyxpQkFBaUIsQ0FBQztRQUN0QyxPQUFPLENBQUMsYUFBYSxFQUFFLENBQUM7SUFDMUIsQ0FBQyxDQUFDLENBQUM7SUFFSCxFQUFFLENBQUMsZUFBZSxFQUFFLEdBQUcsRUFBRTtRQUN2QixNQUFNLENBQUMsU0FBUyxDQUFDLENBQUMsVUFBVSxFQUFFLENBQUM7SUFDakMsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDLENBQUMsQ0FBQyJ9