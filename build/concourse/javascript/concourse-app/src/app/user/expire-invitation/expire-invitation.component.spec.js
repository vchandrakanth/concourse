"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = require("@angular/common/http");
const testing_1 = require("@angular/core/testing");
const facades_1 = require("@concourse/store/facades");
const user_service_1 = require("@concourse/store/user/services/user.service");
const fromUser = require("@concourse/store/user/state/user.reducer");
const store_1 = require("@ngrx/store");
const expire_invitation_component_1 = require("./expire-invitation.component");
describe('ExpireInvitationComponent', () => {
    let component;
    let fixture;
    beforeEach(testing_1.async(() => {
        testing_1.TestBed.configureTestingModule({
            imports: [
                http_1.HttpClientModule,
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
            declarations: [expire_invitation_component_1.ExpireInvitationComponent]
        })
            .compileComponents();
    }));
    beforeEach(() => {
        fixture = testing_1.TestBed.createComponent(expire_invitation_component_1.ExpireInvitationComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhwaXJlLWludml0YXRpb24uY29tcG9uZW50LnNwZWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9jb25jb3Vyc2UvamF2YXNjcmlwdC9jb25jb3Vyc2UtYXBwL3NyYy9hcHAvdXNlci9leHBpcmUtaW52aXRhdGlvbi9leHBpcmUtaW52aXRhdGlvbi5jb21wb25lbnQuc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLCtDQUF3RDtBQUN4RCxtREFBeUU7QUFFekUsc0RBQXNEO0FBQ3RELDhFQUEwRTtBQUMxRSxxRUFBcUU7QUFDckUsdUNBQTBDO0FBQzFDLCtFQUEwRTtBQUUxRSxRQUFRLENBQUMsMkJBQTJCLEVBQUUsR0FBRyxFQUFFO0lBQ3pDLElBQUksU0FBb0MsQ0FBQztJQUN6QyxJQUFJLE9BQW9ELENBQUM7SUFFekQsVUFBVSxDQUFDLGVBQUssQ0FBQyxHQUFHLEVBQUU7UUFDcEIsaUJBQU8sQ0FBQyxzQkFBc0IsQ0FBQztZQUM3QixPQUFPLEVBQUU7Z0JBQ1AsdUJBQWdCO2dCQUNoQixtQkFBVyxDQUFDLE9BQU8sQ0FBQztvQkFDbEIsV0FBVyxFQUFFLFFBQVEsQ0FBQyxPQUFPO2lCQUM5QixDQUFDO2FBQ0g7WUFDRCxTQUFTLEVBQUU7Z0JBQ1Q7b0JBQ0UsT0FBTyxFQUFFLG9CQUFVO29CQUNuQixRQUFRLEVBQUU7d0JBQ1Isb0JBQW9CLEVBQUUsSUFBSSxDQUFDLEVBQUUsRUFBRTtxQkFDaEM7aUJBQ0Y7Z0JBQ0QsMEJBQVc7YUFBQztZQUVkLFlBQVksRUFBRSxDQUFDLHVEQUF5QixDQUFDO1NBQzFDLENBQUM7YUFDQyxpQkFBaUIsRUFBRSxDQUFDO0lBQ3pCLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFFSixVQUFVLENBQUMsR0FBRyxFQUFFO1FBQ2QsT0FBTyxHQUFHLGlCQUFPLENBQUMsZUFBZSxDQUFDLHVEQUF5QixDQUFDLENBQUM7UUFDN0QsU0FBUyxHQUFHLE9BQU8sQ0FBQyxpQkFBaUIsQ0FBQztRQUN0QyxPQUFPLENBQUMsYUFBYSxFQUFFLENBQUM7SUFDMUIsQ0FBQyxDQUFDLENBQUM7SUFFSCxFQUFFLENBQUMsZUFBZSxFQUFFLEdBQUcsRUFBRTtRQUN2QixNQUFNLENBQUMsU0FBUyxDQUFDLENBQUMsVUFBVSxFQUFFLENBQUM7SUFDakMsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDLENBQUMsQ0FBQyJ9