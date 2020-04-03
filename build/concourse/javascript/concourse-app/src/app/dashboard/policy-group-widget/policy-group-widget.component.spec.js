"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@angular/core/testing");
const angular_fontawesome_1 = require("@fortawesome/angular-fontawesome");
const store_1 = require("@ngrx/store");
const tabs_1 = require("ngx-bootstrap/tabs");
const facades_1 = require("@concourse/store/facades");
const test_1 = require("@concourse/test");
const policy_group_widget_component_1 = require("./policy-group-widget.component");
describe('PolicyGroupWidgetComponent', () => {
    let component;
    let fixture;
    beforeEach(testing_1.async(() => {
        testing_1.TestBed.configureTestingModule({
            imports: [
                angular_fontawesome_1.FontAwesomeModule,
                store_1.StoreModule.forRoot({}),
                tabs_1.TabsModule.forRoot()
            ],
            providers: [
                test_1.mockFacade(facades_1.PolicyGroupFacade)
            ],
            declarations: [policy_group_widget_component_1.PolicyGroupWidgetComponent]
        })
            .compileComponents();
    }));
    beforeEach(() => {
        fixture = testing_1.TestBed.createComponent(policy_group_widget_component_1.PolicyGroupWidgetComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9saWN5LWdyb3VwLXdpZGdldC5jb21wb25lbnQuc3BlYy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL2NvbmNvdXJzZS9qYXZhc2NyaXB0L2NvbmNvdXJzZS1hcHAvc3JjL2FwcC9kYXNoYm9hcmQvcG9saWN5LWdyb3VwLXdpZGdldC9wb2xpY3ktZ3JvdXAtd2lkZ2V0LmNvbXBvbmVudC5zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsbURBQXlFO0FBQ3pFLDBFQUFxRTtBQUNyRSx1Q0FBMEM7QUFDMUMsNkNBQWdEO0FBRWhELHNEQUE2RDtBQUM3RCwwQ0FBNkM7QUFDN0MsbUZBQTZFO0FBRTdFLFFBQVEsQ0FBQyw0QkFBNEIsRUFBRSxHQUFHLEVBQUU7SUFDMUMsSUFBSSxTQUFxQyxDQUFDO0lBQzFDLElBQUksT0FBcUQsQ0FBQztJQUUxRCxVQUFVLENBQUMsZUFBSyxDQUFDLEdBQUcsRUFBRTtRQUNwQixpQkFBTyxDQUFDLHNCQUFzQixDQUFDO1lBQzdCLE9BQU8sRUFBRTtnQkFDUCx1Q0FBaUI7Z0JBQ2pCLG1CQUFXLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQztnQkFDdkIsaUJBQVUsQ0FBQyxPQUFPLEVBQUU7YUFDckI7WUFDRCxTQUFTLEVBQUU7Z0JBQ1QsaUJBQVUsQ0FBQywyQkFBaUIsQ0FBQzthQUM5QjtZQUNELFlBQVksRUFBRSxDQUFDLDBEQUEwQixDQUFDO1NBQzNDLENBQUM7YUFDQyxpQkFBaUIsRUFBRSxDQUFDO0lBQ3pCLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFFSixVQUFVLENBQUMsR0FBRyxFQUFFO1FBQ2QsT0FBTyxHQUFHLGlCQUFPLENBQUMsZUFBZSxDQUFDLDBEQUEwQixDQUFDLENBQUM7UUFDOUQsU0FBUyxHQUFHLE9BQU8sQ0FBQyxpQkFBaUIsQ0FBQztRQUN0QyxPQUFPLENBQUMsYUFBYSxFQUFFLENBQUM7SUFDMUIsQ0FBQyxDQUFDLENBQUM7SUFFSCxFQUFFLENBQUMsZUFBZSxFQUFFLEdBQUcsRUFBRTtRQUN2QixNQUFNLENBQUMsU0FBUyxDQUFDLENBQUMsVUFBVSxFQUFFLENBQUM7SUFDakMsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDLENBQUMsQ0FBQyJ9