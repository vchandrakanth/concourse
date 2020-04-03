"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@angular/core/testing");
const facades_1 = require("@concourse/store/facades");
const user_service_1 = require("@concourse/store/user/services/user.service");
const fromUser = require("@concourse/store/user/state/user.reducer");
const store_1 = require("@ngrx/store");
const expire_registration_component_1 = require("./expire-registration.component");
describe('ExpireRegistrationComponent', () => {
    let component;
    let fixture;
    beforeEach(testing_1.async(() => {
        testing_1.TestBed.configureTestingModule({
            imports: [
                store_1.StoreModule.forRoot({
                    institution: fromUser.reducer
                })
            ],
            providers: [
                {
                    provide: facades_1.UserFacade,
                    useValue: {
                        regenerateInvitation: jest.fn()
                    }
                },
                user_service_1.UserService
            ],
            declarations: [expire_registration_component_1.ExpireRegistrationComponent]
        })
            .compileComponents();
    }));
    beforeEach(() => {
        fixture = testing_1.TestBed.createComponent(expire_registration_component_1.ExpireRegistrationComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhwaXJlLXJlZ2lzdHJhdGlvbi5jb21wb25lbnQuc3BlYy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL2NvbmNvdXJzZS9qYXZhc2NyaXB0L2NvbmNvdXJzZS1hcHAvc3JjL2FwcC91c2VyL2V4cGlyZS1yZWdpc3RyYXRpb24vZXhwaXJlLXJlZ2lzdHJhdGlvbi5jb21wb25lbnQuc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLG1EQUF5RTtBQUV6RSxzREFBc0Q7QUFDdEQsOEVBQTBFO0FBQzFFLHFFQUFxRTtBQUNyRSx1Q0FBMEM7QUFDMUMsbUZBQThFO0FBRTlFLFFBQVEsQ0FBQyw2QkFBNkIsRUFBRSxHQUFHLEVBQUU7SUFDM0MsSUFBSSxTQUFzQyxDQUFDO0lBQzNDLElBQUksT0FBc0QsQ0FBQztJQUUzRCxVQUFVLENBQUMsZUFBSyxDQUFDLEdBQUcsRUFBRTtRQUNwQixpQkFBTyxDQUFDLHNCQUFzQixDQUFDO1lBQzdCLE9BQU8sRUFBRTtnQkFDUCxtQkFBVyxDQUFDLE9BQU8sQ0FBQztvQkFDbEIsV0FBVyxFQUFFLFFBQVEsQ0FBQyxPQUFPO2lCQUM5QixDQUFDO2FBQ0g7WUFDRCxTQUFTLEVBQUU7Z0JBQ1Q7b0JBQ0UsT0FBTyxFQUFFLG9CQUFVO29CQUNuQixRQUFRLEVBQUU7d0JBQ1Isb0JBQW9CLEVBQUUsSUFBSSxDQUFDLEVBQUUsRUFBRTtxQkFDaEM7aUJBQ0Y7Z0JBQ0QsMEJBQVc7YUFBQztZQUNkLFlBQVksRUFBRSxDQUFDLDJEQUEyQixDQUFDO1NBQzVDLENBQUM7YUFDQyxpQkFBaUIsRUFBRSxDQUFDO0lBQ3pCLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFFSixVQUFVLENBQUMsR0FBRyxFQUFFO1FBQ2QsT0FBTyxHQUFHLGlCQUFPLENBQUMsZUFBZSxDQUFDLDJEQUEyQixDQUFDLENBQUM7UUFDL0QsU0FBUyxHQUFHLE9BQU8sQ0FBQyxpQkFBaUIsQ0FBQztRQUN0QyxPQUFPLENBQUMsYUFBYSxFQUFFLENBQUM7SUFDMUIsQ0FBQyxDQUFDLENBQUM7SUFFSCxFQUFFLENBQUMsZUFBZSxFQUFFLEdBQUcsRUFBRTtRQUN2QixNQUFNLENBQUMsU0FBUyxDQUFDLENBQUMsVUFBVSxFQUFFLENBQUM7SUFDakMsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDLENBQUMsQ0FBQyJ9