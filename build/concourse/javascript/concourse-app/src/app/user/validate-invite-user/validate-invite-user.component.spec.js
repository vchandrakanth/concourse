"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@angular/core/testing");
const router_1 = require("@angular/router");
const facades_1 = require("@concourse/store/facades");
const fromUser = require("@concourse/store/user/state/user.reducer");
const store_1 = require("@ngrx/store");
const rxjs_1 = require("rxjs");
const validate_invite_user_component_1 = require("./validate-invite-user.component");
describe('ValidateInviteUserComponent', () => {
    let component;
    let fixture;
    beforeEach(testing_1.async(() => {
        testing_1.TestBed.configureTestingModule({
            imports: [
                store_1.StoreModule.forRoot({
                    user: fromUser.reducer
                })
            ],
            declarations: [validate_invite_user_component_1.ValidateInviteUserComponent],
            providers: [
                {
                    provide: router_1.ActivatedRoute,
                    useValue: {
                        queryParams: rxjs_1.of({ token: 'test', email: 'test@concoursehub.com' })
                    }
                },
                facades_1.UserFacade
            ]
        })
            .compileComponents();
    }));
    beforeEach(() => {
        fixture = testing_1.TestBed.createComponent(validate_invite_user_component_1.ValidateInviteUserComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmFsaWRhdGUtaW52aXRlLXVzZXIuY29tcG9uZW50LnNwZWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9jb25jb3Vyc2UvamF2YXNjcmlwdC9jb25jb3Vyc2UtYXBwL3NyYy9hcHAvdXNlci92YWxpZGF0ZS1pbnZpdGUtdXNlci92YWxpZGF0ZS1pbnZpdGUtdXNlci5jb21wb25lbnQuc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLG1EQUF5RTtBQUN6RSw0Q0FBaUQ7QUFDakQsc0RBQXNEO0FBQ3RELHFFQUFxRTtBQUNyRSx1Q0FBMEM7QUFDMUMsK0JBQTBCO0FBQzFCLHFGQUErRTtBQUUvRSxRQUFRLENBQUMsNkJBQTZCLEVBQUUsR0FBRyxFQUFFO0lBQzNDLElBQUksU0FBc0MsQ0FBQztJQUMzQyxJQUFJLE9BQXNELENBQUM7SUFFM0QsVUFBVSxDQUFDLGVBQUssQ0FBQyxHQUFHLEVBQUU7UUFDcEIsaUJBQU8sQ0FBQyxzQkFBc0IsQ0FBQztZQUM3QixPQUFPLEVBQUU7Z0JBQ1AsbUJBQVcsQ0FBQyxPQUFPLENBQUM7b0JBQ2xCLElBQUksRUFBRSxRQUFRLENBQUMsT0FBTztpQkFDdkIsQ0FBQzthQUNIO1lBQ0QsWUFBWSxFQUFFLENBQUMsNERBQTJCLENBQUM7WUFDM0MsU0FBUyxFQUFFO2dCQUNUO29CQUNFLE9BQU8sRUFBRSx1QkFBYztvQkFDdkIsUUFBUSxFQUFFO3dCQUNSLFdBQVcsRUFBRSxTQUFFLENBQUMsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSx1QkFBdUIsRUFBRSxDQUFDO3FCQUVuRTtpQkFDRjtnQkFDRCxvQkFBVTthQUNYO1NBQ0YsQ0FBQzthQUNDLGlCQUFpQixFQUFFLENBQUM7SUFDekIsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUVKLFVBQVUsQ0FBQyxHQUFHLEVBQUU7UUFDZCxPQUFPLEdBQUcsaUJBQU8sQ0FBQyxlQUFlLENBQUMsNERBQTJCLENBQUMsQ0FBQztRQUMvRCxTQUFTLEdBQUcsT0FBTyxDQUFDLGlCQUFpQixDQUFDO1FBQ3RDLE9BQU8sQ0FBQyxhQUFhLEVBQUUsQ0FBQztJQUMxQixDQUFDLENBQUMsQ0FBQztJQUVILEVBQUUsQ0FBQyxlQUFlLEVBQUUsR0FBRyxFQUFFO1FBQ3ZCLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQyxVQUFVLEVBQUUsQ0FBQztJQUNqQyxDQUFDLENBQUMsQ0FBQztBQUNMLENBQUMsQ0FBQyxDQUFDIn0=