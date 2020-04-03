"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@angular/core/testing");
const router_1 = require("@angular/router");
const auth_facade_1 = require("@concourse/store/auth/state/auth.facade");
const fromAuth = require("@concourse/store/auth/state/auth.reducer");
const store_1 = require("@ngrx/store");
const rxjs_1 = require("rxjs");
const verify_user_token_component_1 = require("./verify-user-token.component");
describe('VerifyUserTokenComponent', () => {
    let component;
    let fixture;
    beforeEach(testing_1.async(() => {
        testing_1.TestBed.configureTestingModule({
            imports: [
                store_1.StoreModule.forRoot({
                    user: fromAuth.reducer
                })
            ],
            declarations: [verify_user_token_component_1.VerifyUserTokenComponent],
            providers: [
                {
                    provide: router_1.ActivatedRoute,
                    useValue: {
                        queryParams: rxjs_1.of({ token: 'test' })
                    }
                },
                auth_facade_1.AuthFacade
            ]
        })
            .compileComponents();
    }));
    beforeEach(() => {
        fixture = testing_1.TestBed.createComponent(verify_user_token_component_1.VerifyUserTokenComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmVyaWZ5LXVzZXItdG9rZW4uY29tcG9uZW50LnNwZWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9jb25jb3Vyc2UvamF2YXNjcmlwdC9jb25jb3Vyc2UtYXBwL3NyYy9hcHAvdXNlci92ZXJpZnktdXNlci10b2tlbi92ZXJpZnktdXNlci10b2tlbi5jb21wb25lbnQuc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLG1EQUF5RTtBQUN6RSw0Q0FBaUQ7QUFDakQseUVBQXFFO0FBQ3JFLHFFQUFxRTtBQUNyRSx1Q0FBMEM7QUFDMUMsK0JBQTBCO0FBQzFCLCtFQUF5RTtBQUV6RSxRQUFRLENBQUMsMEJBQTBCLEVBQUUsR0FBRyxFQUFFO0lBQ3hDLElBQUksU0FBbUMsQ0FBQztJQUN4QyxJQUFJLE9BQW1ELENBQUM7SUFFeEQsVUFBVSxDQUFDLGVBQUssQ0FBQyxHQUFHLEVBQUU7UUFDcEIsaUJBQU8sQ0FBQyxzQkFBc0IsQ0FBQztZQUM3QixPQUFPLEVBQUU7Z0JBQ1AsbUJBQVcsQ0FBQyxPQUFPLENBQUM7b0JBQ2xCLElBQUksRUFBRSxRQUFRLENBQUMsT0FBTztpQkFDdkIsQ0FBQzthQUNIO1lBQ0QsWUFBWSxFQUFFLENBQUMsc0RBQXdCLENBQUM7WUFDeEMsU0FBUyxFQUFFO2dCQUNUO29CQUNFLE9BQU8sRUFBRSx1QkFBYztvQkFDdkIsUUFBUSxFQUFFO3dCQUNSLFdBQVcsRUFBRSxTQUFFLENBQUMsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLENBQUM7cUJBRW5DO2lCQUNGO2dCQUNELHdCQUFVO2FBQ1g7U0FDRixDQUFDO2FBQ0MsaUJBQWlCLEVBQUUsQ0FBQztJQUN6QixDQUFDLENBQUMsQ0FBQyxDQUFDO0lBRUosVUFBVSxDQUFDLEdBQUcsRUFBRTtRQUNkLE9BQU8sR0FBRyxpQkFBTyxDQUFDLGVBQWUsQ0FBQyxzREFBd0IsQ0FBQyxDQUFDO1FBQzVELFNBQVMsR0FBRyxPQUFPLENBQUMsaUJBQWlCLENBQUM7UUFDdEMsT0FBTyxDQUFDLGFBQWEsRUFBRSxDQUFDO0lBQzFCLENBQUMsQ0FBQyxDQUFDO0lBRUgsRUFBRSxDQUFDLGVBQWUsRUFBRSxHQUFHLEVBQUU7UUFDdkIsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDLFVBQVUsRUFBRSxDQUFDO0lBQ2pDLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyxDQUFDLENBQUMifQ==