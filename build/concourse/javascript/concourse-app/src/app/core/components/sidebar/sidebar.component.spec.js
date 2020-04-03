"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@angular/core/testing");
const testing_2 = require("@angular/router/testing");
const fromAuth = require("@concourse/store/auth/state/auth.reducer");
const store_1 = require("@ngrx/store");
const has_responsibility_directive_1 = require("@concourse/shared/directives/has-responsibility.directive");
const test_1 = require("@concourse/test");
const angular_fontawesome_1 = require("@fortawesome/angular-fontawesome");
const sidebar_component_1 = require("./sidebar.component");
// TODO: fix this
xdescribe('SidebarComponent', () => {
    let component;
    let fixture;
    beforeEach(testing_1.async(() => {
        testing_1.TestBed.configureTestingModule({
            imports: [
                testing_2.RouterTestingModule,
                store_1.StoreModule.forRoot({
                    auth: fromAuth.reducer
                }),
                angular_fontawesome_1.FontAwesomeModule
            ],
            providers: [...test_1.directiveProviders],
            declarations: [sidebar_component_1.SidebarComponent, has_responsibility_directive_1.HasResponsibilityDirective]
        })
            .compileComponents();
    }));
    beforeEach(() => {
        fixture = testing_1.TestBed.createComponent(sidebar_component_1.SidebarComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lkZWJhci5jb21wb25lbnQuc3BlYy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL2NvbmNvdXJzZS9qYXZhc2NyaXB0L2NvbmNvdXJzZS1hcHAvc3JjL2FwcC9jb3JlL2NvbXBvbmVudHMvc2lkZWJhci9zaWRlYmFyLmNvbXBvbmVudC5zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsbURBQXlFO0FBQ3pFLHFEQUE4RDtBQUU5RCxxRUFBcUU7QUFDckUsdUNBQTBDO0FBRTFDLDRHQUF1RztBQUN2RywwQ0FBcUQ7QUFDckQsMEVBQXFFO0FBQ3JFLDJEQUF1RDtBQUV2RCxpQkFBaUI7QUFDakIsU0FBUyxDQUFDLGtCQUFrQixFQUFFLEdBQUcsRUFBRTtJQUNqQyxJQUFJLFNBQTJCLENBQUM7SUFDaEMsSUFBSSxPQUEyQyxDQUFDO0lBRWhELFVBQVUsQ0FBQyxlQUFLLENBQUMsR0FBRyxFQUFFO1FBQ3BCLGlCQUFPLENBQUMsc0JBQXNCLENBQUM7WUFDN0IsT0FBTyxFQUFFO2dCQUNQLDZCQUFtQjtnQkFDbkIsbUJBQVcsQ0FBQyxPQUFPLENBQUM7b0JBQ2xCLElBQUksRUFBRSxRQUFRLENBQUMsT0FBTztpQkFDdkIsQ0FBQztnQkFDRix1Q0FBaUI7YUFDbEI7WUFDRCxTQUFTLEVBQUUsQ0FBQyxHQUFHLHlCQUFrQixDQUFDO1lBQ2xDLFlBQVksRUFBRSxDQUFDLG9DQUFnQixFQUFFLHlEQUEwQixDQUFDO1NBQzdELENBQUM7YUFDQyxpQkFBaUIsRUFBRSxDQUFDO0lBQ3pCLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFFSixVQUFVLENBQUMsR0FBRyxFQUFFO1FBQ2QsT0FBTyxHQUFHLGlCQUFPLENBQUMsZUFBZSxDQUFDLG9DQUFnQixDQUFDLENBQUM7UUFDcEQsU0FBUyxHQUFHLE9BQU8sQ0FBQyxpQkFBaUIsQ0FBQztRQUN0QyxPQUFPLENBQUMsYUFBYSxFQUFFLENBQUM7SUFDMUIsQ0FBQyxDQUFDLENBQUM7SUFFSCxFQUFFLENBQUMsZUFBZSxFQUFFLEdBQUcsRUFBRTtRQUN2QixNQUFNLENBQUMsU0FBUyxDQUFDLENBQUMsVUFBVSxFQUFFLENBQUM7SUFDakMsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDLENBQUMsQ0FBQyJ9