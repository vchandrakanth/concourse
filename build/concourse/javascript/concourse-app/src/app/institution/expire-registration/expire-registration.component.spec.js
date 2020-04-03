"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = require("@angular/common/http");
const testing_1 = require("@angular/core/testing");
const facades_1 = require("@concourse/store/facades");
const institution_service_1 = require("@concourse/store/institution/services/institution.service");
const fromInstitution = require("@concourse/store/institution/state/institution.reducer");
const store_1 = require("@ngrx/store");
const expire_registration_component_1 = require("./expire-registration.component");
describe('ExpireRegistrationComponent', () => {
    let component;
    let fixture;
    beforeEach(testing_1.async(() => {
        testing_1.TestBed.configureTestingModule({
            imports: [
                http_1.HttpClientModule,
                store_1.StoreModule.forRoot({
                    institution: fromInstitution.reducer
                })
            ],
            providers: [
                {
                    provide: facades_1.InstitutionFacade,
                    useValue: {
                        regenerateRegistration: jest.fn()
                    }
                },
                institution_service_1.InstitutionService
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhwaXJlLXJlZ2lzdHJhdGlvbi5jb21wb25lbnQuc3BlYy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL2NvbmNvdXJzZS9qYXZhc2NyaXB0L2NvbmNvdXJzZS1hcHAvc3JjL2FwcC9pbnN0aXR1dGlvbi9leHBpcmUtcmVnaXN0cmF0aW9uL2V4cGlyZS1yZWdpc3RyYXRpb24uY29tcG9uZW50LnNwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSwrQ0FBd0Q7QUFDeEQsbURBQXlFO0FBRXpFLHNEQUE2RDtBQUM3RCxtR0FBK0Y7QUFDL0YsMEZBQTBGO0FBQzFGLHVDQUEwQztBQUMxQyxtRkFBOEU7QUFFOUUsUUFBUSxDQUFDLDZCQUE2QixFQUFFLEdBQUcsRUFBRTtJQUMzQyxJQUFJLFNBQXNDLENBQUM7SUFDM0MsSUFBSSxPQUFzRCxDQUFDO0lBRTNELFVBQVUsQ0FBQyxlQUFLLENBQUMsR0FBRyxFQUFFO1FBQ3BCLGlCQUFPLENBQUMsc0JBQXNCLENBQUM7WUFDN0IsT0FBTyxFQUFFO2dCQUNQLHVCQUFnQjtnQkFDaEIsbUJBQVcsQ0FBQyxPQUFPLENBQUM7b0JBQ2xCLFdBQVcsRUFBRSxlQUFlLENBQUMsT0FBTztpQkFDckMsQ0FBQzthQUNIO1lBQ0QsU0FBUyxFQUFFO2dCQUNUO29CQUNFLE9BQU8sRUFBRSwyQkFBaUI7b0JBQzFCLFFBQVEsRUFBRTt3QkFDUixzQkFBc0IsRUFBRSxJQUFJLENBQUMsRUFBRSxFQUFFO3FCQUNsQztpQkFDRjtnQkFDRCx3Q0FBa0I7YUFBQztZQUVyQixZQUFZLEVBQUUsQ0FBQywyREFBMkIsQ0FBQztTQUM1QyxDQUFDO2FBQ0MsaUJBQWlCLEVBQUUsQ0FBQztJQUN6QixDQUFDLENBQUMsQ0FBQyxDQUFDO0lBRUosVUFBVSxDQUFDLEdBQUcsRUFBRTtRQUNkLE9BQU8sR0FBRyxpQkFBTyxDQUFDLGVBQWUsQ0FBQywyREFBMkIsQ0FBQyxDQUFDO1FBQy9ELFNBQVMsR0FBRyxPQUFPLENBQUMsaUJBQWlCLENBQUM7UUFDdEMsT0FBTyxDQUFDLGFBQWEsRUFBRSxDQUFDO0lBQzFCLENBQUMsQ0FBQyxDQUFDO0lBRUgsRUFBRSxDQUFDLGVBQWUsRUFBRSxHQUFHLEVBQUU7UUFDdkIsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDLFVBQVUsRUFBRSxDQUFDO0lBQ2pDLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyxDQUFDLENBQUMifQ==