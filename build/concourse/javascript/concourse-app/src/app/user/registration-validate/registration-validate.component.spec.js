"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@angular/core/testing");
const router_1 = require("@angular/router");
const facades_1 = require("@concourse/store/facades");
const fromUser = require("@concourse/store/user/state/user.reducer");
const store_1 = require("@ngrx/store");
const rxjs_1 = require("rxjs");
const registration_validate_component_1 = require("./registration-validate.component");
describe('RegistrationValidateComponent', () => {
    let component;
    let fixture;
    beforeEach(testing_1.async(() => {
        testing_1.TestBed.configureTestingModule({
            imports: [
                store_1.StoreModule.forRoot({
                    user: fromUser.reducer
                })
            ],
            declarations: [
                registration_validate_component_1.RegistrationValidateComponent
            ],
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
        fixture = testing_1.TestBed.createComponent(registration_validate_component_1.RegistrationValidateComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVnaXN0cmF0aW9uLXZhbGlkYXRlLmNvbXBvbmVudC5zcGVjLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vY29uY291cnNlL2phdmFzY3JpcHQvY29uY291cnNlLWFwcC9zcmMvYXBwL3VzZXIvcmVnaXN0cmF0aW9uLXZhbGlkYXRlL3JlZ2lzdHJhdGlvbi12YWxpZGF0ZS5jb21wb25lbnQuc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLG1EQUF5RTtBQUN6RSw0Q0FBaUQ7QUFDakQsc0RBQXNEO0FBQ3RELHFFQUFxRTtBQUNyRSx1Q0FBMEM7QUFDMUMsK0JBQTBCO0FBQzFCLHVGQUFrRjtBQUVsRixRQUFRLENBQUMsK0JBQStCLEVBQUUsR0FBRyxFQUFFO0lBQzdDLElBQUksU0FBd0MsQ0FBQztJQUM3QyxJQUFJLE9BQXdELENBQUM7SUFFN0QsVUFBVSxDQUFDLGVBQUssQ0FBQyxHQUFHLEVBQUU7UUFDcEIsaUJBQU8sQ0FBQyxzQkFBc0IsQ0FBQztZQUM3QixPQUFPLEVBQUU7Z0JBQ1AsbUJBQVcsQ0FBQyxPQUFPLENBQUM7b0JBQ2xCLElBQUksRUFBRSxRQUFRLENBQUMsT0FBTztpQkFDdkIsQ0FBQzthQUNIO1lBQ0QsWUFBWSxFQUFFO2dCQUNaLCtEQUE2QjthQUM5QjtZQUNELFNBQVMsRUFBRTtnQkFDVDtvQkFDRSxPQUFPLEVBQUUsdUJBQWM7b0JBQ3ZCLFFBQVEsRUFBRTt3QkFDUixXQUFXLEVBQUUsU0FBRSxDQUFDLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsdUJBQXVCLEVBQUUsQ0FBQztxQkFFbkU7aUJBQ0Y7Z0JBQ0Qsb0JBQVU7YUFDWDtTQUNGLENBQUM7YUFDQyxpQkFBaUIsRUFBRSxDQUFDO0lBQ3pCLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFFSixVQUFVLENBQUMsR0FBRyxFQUFFO1FBQ2QsT0FBTyxHQUFHLGlCQUFPLENBQUMsZUFBZSxDQUFDLCtEQUE2QixDQUFDLENBQUM7UUFDakUsU0FBUyxHQUFHLE9BQU8sQ0FBQyxpQkFBaUIsQ0FBQztRQUN0QyxPQUFPLENBQUMsYUFBYSxFQUFFLENBQUM7SUFDMUIsQ0FBQyxDQUFDLENBQUM7SUFFSCxFQUFFLENBQUMsZUFBZSxFQUFFLEdBQUcsRUFBRTtRQUN2QixNQUFNLENBQUMsU0FBUyxDQUFDLENBQUMsVUFBVSxFQUFFLENBQUM7SUFDakMsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDLENBQUMsQ0FBQyJ9