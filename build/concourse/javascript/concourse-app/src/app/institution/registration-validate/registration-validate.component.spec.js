"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@angular/core/testing");
const router_1 = require("@angular/router");
const rxjs_1 = require("rxjs");
const facades_1 = require("@concourse/store/facades");
const fromInstitution = require("@concourse/store/institution/state/institution.reducer");
const store_1 = require("@ngrx/store");
const registration_validate_component_1 = require("./registration-validate.component");
describe('RegistrationValidateComponent', () => {
    let component;
    let fixture;
    beforeEach(testing_1.async(() => {
        testing_1.TestBed.configureTestingModule({
            imports: [
                store_1.StoreModule.forRoot({
                    user: fromInstitution.reducer
                })
            ],
            declarations: [registration_validate_component_1.RegistrationValidateComponent],
            providers: [
                {
                    provide: router_1.ActivatedRoute,
                    useValue: {
                        queryParams: rxjs_1.of({ token: 'test' })
                    }
                },
                facades_1.InstitutionFacade
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVnaXN0cmF0aW9uLXZhbGlkYXRlLmNvbXBvbmVudC5zcGVjLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vY29uY291cnNlL2phdmFzY3JpcHQvY29uY291cnNlLWFwcC9zcmMvYXBwL2luc3RpdHV0aW9uL3JlZ2lzdHJhdGlvbi12YWxpZGF0ZS9yZWdpc3RyYXRpb24tdmFsaWRhdGUuY29tcG9uZW50LnNwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxtREFBeUU7QUFDekUsNENBQWlEO0FBQ2pELCtCQUEwQjtBQUUxQixzREFBNkQ7QUFDN0QsMEZBQTBGO0FBQzFGLHVDQUEwQztBQUMxQyx1RkFBa0Y7QUFFbEYsUUFBUSxDQUFDLCtCQUErQixFQUFFLEdBQUcsRUFBRTtJQUM3QyxJQUFJLFNBQXdDLENBQUM7SUFDN0MsSUFBSSxPQUF3RCxDQUFDO0lBRTdELFVBQVUsQ0FBQyxlQUFLLENBQUMsR0FBRyxFQUFFO1FBQ3BCLGlCQUFPLENBQUMsc0JBQXNCLENBQUM7WUFDN0IsT0FBTyxFQUFFO2dCQUNQLG1CQUFXLENBQUMsT0FBTyxDQUFDO29CQUNsQixJQUFJLEVBQUUsZUFBZSxDQUFDLE9BQU87aUJBQzlCLENBQUM7YUFDSDtZQUNELFlBQVksRUFBRSxDQUFDLCtEQUE2QixDQUFDO1lBQzdDLFNBQVMsRUFBRTtnQkFDVDtvQkFDRSxPQUFPLEVBQUUsdUJBQWM7b0JBQ3ZCLFFBQVEsRUFBRTt3QkFDUixXQUFXLEVBQUUsU0FBRSxDQUFDLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBQyxDQUFDO3FCQUNsQztpQkFDRjtnQkFDRCwyQkFBaUI7YUFDbEI7U0FDRixDQUFDO2FBQ0MsaUJBQWlCLEVBQUUsQ0FBQztJQUN6QixDQUFDLENBQUMsQ0FBQyxDQUFDO0lBRUosVUFBVSxDQUFDLEdBQUcsRUFBRTtRQUNkLE9BQU8sR0FBRyxpQkFBTyxDQUFDLGVBQWUsQ0FBQywrREFBNkIsQ0FBQyxDQUFDO1FBQ2pFLFNBQVMsR0FBRyxPQUFPLENBQUMsaUJBQWlCLENBQUM7UUFDdEMsT0FBTyxDQUFDLGFBQWEsRUFBRSxDQUFDO0lBQzFCLENBQUMsQ0FBQyxDQUFDO0lBRUgsRUFBRSxDQUFDLGVBQWUsRUFBRSxHQUFHLEVBQUU7UUFDdkIsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDLFVBQVUsRUFBRSxDQUFDO0lBQ2pDLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyxDQUFDLENBQUMifQ==