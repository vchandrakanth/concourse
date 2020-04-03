"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const testing_1 = require("@angular/core/testing");
const testing_2 = require("@angular/router/testing");
const angular_fontawesome_1 = require("@fortawesome/angular-fontawesome");
const store_1 = require("@ngrx/store");
const ngx_pipes_1 = require("ngx-pipes");
const modal_1 = require("@concourse/core/modal");
const shared_module_1 = require("@concourse/shared/shared.module");
const test_1 = require("@concourse/test");
const list_users_component_1 = require("./list-users.component");
describe('ListUsersComponent', () => {
    let component;
    let fixture;
    beforeEach(testing_1.async(() => {
        const configure = testBed => {
            testBed
                .configureTestingModule({
                schemas: [core_1.NO_ERRORS_SCHEMA],
                imports: [
                    testing_2.RouterTestingModule,
                    angular_fontawesome_1.FontAwesomeModule,
                    store_1.StoreModule.forRoot({}),
                    ngx_pipes_1.NgArrayPipesModule,
                    ngx_pipes_1.NgStringPipesModule,
                    shared_module_1.SharedModule
                ],
                providers: [
                    test_1.mockFacade(modal_1.ModalStoreFacade),
                    ...test_1.directiveProviders
                ],
                declarations: [list_users_component_1.ListUsersComponent]
            });
        };
        test_1.configureTests(configure).then(testBed => {
            fixture = testBed.createComponent(list_users_component_1.ListUsersComponent);
            component = fixture.componentInstance;
            fixture.detectChanges();
        });
    }));
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdC11c2Vycy5jb21wb25lbnQuc3BlYy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL2NvbmNvdXJzZS9qYXZhc2NyaXB0L2NvbmNvdXJzZS1hcHAvc3JjL2FwcC91c2VyLW1hbmFnZW1lbnQvdXNlcnMvbGlzdC11c2Vycy9saXN0LXVzZXJzLmNvbXBvbmVudC5zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsd0NBQWlEO0FBQ2pELG1EQUFnRTtBQUNoRSxxREFBOEQ7QUFDOUQsMEVBQXFFO0FBQ3JFLHVDQUEwQztBQUMxQyx5Q0FBb0U7QUFFcEUsaURBQXlEO0FBQ3pELG1FQUErRDtBQUMvRCwwQ0FBOEY7QUFDOUYsaUVBQTREO0FBRTVELFFBQVEsQ0FBQyxvQkFBb0IsRUFBRSxHQUFHLEVBQUU7SUFDbEMsSUFBSSxTQUE2QixDQUFDO0lBQ2xDLElBQUksT0FBNkMsQ0FBQztJQUVsRCxVQUFVLENBQ1IsZUFBSyxDQUFDLEdBQUcsRUFBRTtRQUNULE1BQU0sU0FBUyxHQUFnQixPQUFPLENBQUMsRUFBRTtZQUN2QyxPQUFPO2lCQUNKLHNCQUFzQixDQUFDO2dCQUN0QixPQUFPLEVBQUUsQ0FBQyx1QkFBZ0IsQ0FBQztnQkFDM0IsT0FBTyxFQUFFO29CQUNQLDZCQUFtQjtvQkFDbkIsdUNBQWlCO29CQUNqQixtQkFBVyxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUM7b0JBQ3ZCLDhCQUFrQjtvQkFDbEIsK0JBQW1CO29CQUNuQiw0QkFBWTtpQkFDYjtnQkFDRCxTQUFTLEVBQUU7b0JBQ1QsaUJBQVUsQ0FBQyx3QkFBZ0IsQ0FBQztvQkFDNUIsR0FBRyx5QkFBa0I7aUJBQ3RCO2dCQUNELFlBQVksRUFBRSxDQUFDLHlDQUFrQixDQUFDO2FBQ25DLENBQUMsQ0FBQztRQUNQLENBQUMsQ0FBQztRQUVGLHFCQUFjLENBQUMsU0FBUyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFO1lBQ3ZDLE9BQU8sR0FBRyxPQUFPLENBQUMsZUFBZSxDQUFDLHlDQUFrQixDQUFDLENBQUM7WUFDdEQsU0FBUyxHQUFHLE9BQU8sQ0FBQyxpQkFBaUIsQ0FBQztZQUN0QyxPQUFPLENBQUMsYUFBYSxFQUFFLENBQUM7UUFDMUIsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDLENBQUMsQ0FDSCxDQUFDO0lBRUYsRUFBRSxDQUFDLGVBQWUsRUFBRSxHQUFHLEVBQUU7UUFDdkIsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDLFVBQVUsRUFBRSxDQUFDO0lBQ2pDLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyxDQUFDLENBQUMifQ==