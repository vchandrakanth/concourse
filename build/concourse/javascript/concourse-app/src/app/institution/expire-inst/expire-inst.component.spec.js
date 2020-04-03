"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = require("@angular/common/http");
const testing_1 = require("@angular/core/testing");
const facades_1 = require("@concourse/store/facades");
const institution_service_1 = require("@concourse/store/institution/services/institution.service");
const fromInstitution = require("@concourse/store/institution/state/institution.reducer");
const store_1 = require("@ngrx/store");
const expire_inst_component_1 = require("./expire-inst.component");
describe('ExpireInstComponent', () => {
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
                        regenerateInvitation: jest.fn()
                    }
                },
                institution_service_1.InstitutionService
            ],
            declarations: [expire_inst_component_1.ExpireInstComponent]
        })
            .compileComponents();
    }));
    beforeEach(() => {
        fixture = testing_1.TestBed.createComponent(expire_inst_component_1.ExpireInstComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhwaXJlLWluc3QuY29tcG9uZW50LnNwZWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9jb25jb3Vyc2UvamF2YXNjcmlwdC9jb25jb3Vyc2UtYXBwL3NyYy9hcHAvaW5zdGl0dXRpb24vZXhwaXJlLWluc3QvZXhwaXJlLWluc3QuY29tcG9uZW50LnNwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSwrQ0FBd0Q7QUFDeEQsbURBQXlFO0FBRXpFLHNEQUE2RDtBQUM3RCxtR0FBK0Y7QUFDL0YsMEZBQTBGO0FBQzFGLHVDQUEwQztBQUMxQyxtRUFBOEQ7QUFFOUQsUUFBUSxDQUFDLHFCQUFxQixFQUFFLEdBQUcsRUFBRTtJQUNuQyxJQUFJLFNBQThCLENBQUM7SUFDbkMsSUFBSSxPQUE4QyxDQUFDO0lBRW5ELFVBQVUsQ0FBQyxlQUFLLENBQUMsR0FBRyxFQUFFO1FBQ3BCLGlCQUFPLENBQUMsc0JBQXNCLENBQUM7WUFDN0IsT0FBTyxFQUFFO2dCQUNQLHVCQUFnQjtnQkFDaEIsbUJBQVcsQ0FBQyxPQUFPLENBQUM7b0JBQ2xCLFdBQVcsRUFBRSxlQUFlLENBQUMsT0FBTztpQkFDckMsQ0FBQzthQUNIO1lBQ0QsU0FBUyxFQUFFO2dCQUNUO29CQUNFLE9BQU8sRUFBRSwyQkFBaUI7b0JBQzFCLFFBQVEsRUFBRTt3QkFDUixvQkFBb0IsRUFBRSxJQUFJLENBQUMsRUFBRSxFQUFFO3FCQUNoQztpQkFDRjtnQkFDRCx3Q0FBa0I7YUFBQztZQUVyQixZQUFZLEVBQUUsQ0FBQywyQ0FBbUIsQ0FBQztTQUNwQyxDQUFDO2FBQ0MsaUJBQWlCLEVBQUUsQ0FBQztJQUN6QixDQUFDLENBQUMsQ0FBQyxDQUFDO0lBRUosVUFBVSxDQUFDLEdBQUcsRUFBRTtRQUNkLE9BQU8sR0FBRyxpQkFBTyxDQUFDLGVBQWUsQ0FBQywyQ0FBbUIsQ0FBQyxDQUFDO1FBQ3ZELFNBQVMsR0FBRyxPQUFPLENBQUMsaUJBQWlCLENBQUM7UUFDdEMsT0FBTyxDQUFDLGFBQWEsRUFBRSxDQUFDO0lBQzFCLENBQUMsQ0FBQyxDQUFDO0lBRUgsRUFBRSxDQUFDLGVBQWUsRUFBRSxHQUFHLEVBQUU7UUFDdkIsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDLFVBQVUsRUFBRSxDQUFDO0lBQ2pDLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyxDQUFDLENBQUMifQ==