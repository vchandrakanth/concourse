"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@angular/core/testing");
const shared_module_1 = require("@concourse/shared/shared.module");
const facades_1 = require("@concourse/store/facades");
const test_1 = require("@concourse/test");
const angular_fontawesome_1 = require("@fortawesome/angular-fontawesome");
const accounts_component_1 = require("./accounts.component");
describe('AccountsComponent', () => {
    let component;
    let fixture;
    beforeEach(testing_1.async(() => {
        testing_1.TestBed.configureTestingModule({
            declarations: [accounts_component_1.AccountsComponent],
            imports: [
                angular_fontawesome_1.FontAwesomeModule,
                shared_module_1.SharedModule
            ],
            providers: [
                test_1.mockFacade(facades_1.ModalStoreFacade),
                test_1.mockFacade(facades_1.AwsAccountFacade)
            ]
        })
            .compileComponents();
    }));
    beforeEach(() => {
        fixture = testing_1.TestBed.createComponent(accounts_component_1.AccountsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWNjb3VudHMuY29tcG9uZW50LnNwZWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9jb25jb3Vyc2UvamF2YXNjcmlwdC9jb25jb3Vyc2UtYXBwL3NyYy9hcHAvaW5zdGl0dXRpb24vYWNjb3VudHMvYWNjb3VudHMuY29tcG9uZW50LnNwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxtREFBeUU7QUFFekUsbUVBQStEO0FBQy9ELHNEQUE4RTtBQUM5RSwwQ0FBNkM7QUFDN0MsMEVBQXFFO0FBQ3JFLDZEQUF5RDtBQUV6RCxRQUFRLENBQUMsbUJBQW1CLEVBQUUsR0FBRyxFQUFFO0lBQ2pDLElBQUksU0FBNEIsQ0FBQztJQUNqQyxJQUFJLE9BQTRDLENBQUM7SUFFakQsVUFBVSxDQUFDLGVBQUssQ0FBQyxHQUFHLEVBQUU7UUFDcEIsaUJBQU8sQ0FBQyxzQkFBc0IsQ0FBQztZQUM3QixZQUFZLEVBQUUsQ0FBQyxzQ0FBaUIsQ0FBQztZQUNqQyxPQUFPLEVBQUU7Z0JBQ1AsdUNBQWlCO2dCQUNqQiw0QkFBWTthQUNiO1lBQ0QsU0FBUyxFQUFFO2dCQUNULGlCQUFVLENBQUMsMEJBQWdCLENBQUM7Z0JBQzVCLGlCQUFVLENBQUMsMEJBQWdCLENBQUM7YUFDN0I7U0FDRixDQUFDO2FBQ0MsaUJBQWlCLEVBQUUsQ0FBQztJQUN6QixDQUFDLENBQUMsQ0FBQyxDQUFDO0lBRUosVUFBVSxDQUFDLEdBQUcsRUFBRTtRQUNkLE9BQU8sR0FBRyxpQkFBTyxDQUFDLGVBQWUsQ0FBQyxzQ0FBaUIsQ0FBQyxDQUFDO1FBQ3JELFNBQVMsR0FBRyxPQUFPLENBQUMsaUJBQWlCLENBQUM7UUFDdEMsT0FBTyxDQUFDLGFBQWEsRUFBRSxDQUFDO0lBQzFCLENBQUMsQ0FBQyxDQUFDO0lBRUgsRUFBRSxDQUFDLGVBQWUsRUFBRSxHQUFHLEVBQUU7UUFDdkIsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDLFVBQVUsRUFBRSxDQUFDO0lBQ2pDLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyxDQUFDLENBQUMifQ==