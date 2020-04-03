"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@angular/core/testing");
const alert_1 = require("ngx-bootstrap/alert");
const models_1 = require("@concourse/core/models");
const facades_1 = require("@concourse/store/facades");
const store_1 = require("@ngrx/store");
const alert_messages_component_1 = require("./alert-messages.component");
const fromApplicationError = require("@concourse/core/error/state/error.reducer");
const test_1 = require("@concourse/test");
describe('AlertMessagesComponent', () => {
    let component;
    let fixture;
    let applicationErrorFacade;
    beforeEach(testing_1.async(() => {
        testing_1.TestBed.configureTestingModule({
            providers: [test_1.mockFacade(facades_1.ApplicationErrorFacade)],
            imports: [
                alert_1.AlertModule.forRoot(),
                store_1.StoreModule.forRoot({
                    'application-error': fromApplicationError.reducer
                })
            ],
            declarations: [alert_messages_component_1.AlertMessagesComponent]
        })
            .compileComponents();
        applicationErrorFacade = testing_1.TestBed.get(facades_1.ApplicationErrorFacade);
    }));
    beforeEach(() => {
        fixture = testing_1.TestBed.createComponent(alert_messages_component_1.AlertMessagesComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
    it('should match snapshot', () => {
        expect(fixture).toMatchSnapshot();
    });
    it('should remove error on dismiss', () => {
        const error = new models_1.ApplicationError().deserialize({
            message: 'Errror!',
            type: 'danger',
            id: new Date().getTime()
        });
        component.onClosed(error);
        // expect(applicationErrorFacade.dismiss).toHaveBeenCalledWith(error.id);
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWxlcnQtbWVzc2FnZXMuY29tcG9uZW50LnNwZWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9jb25jb3Vyc2UvamF2YXNjcmlwdC9jb25jb3Vyc2UtYXBwL3NyYy9hcHAvc2hhcmVkL2NvbXBvbmVudHMvYWxlcnQtbWVzc2FnZXMvYWxlcnQtbWVzc2FnZXMuY29tcG9uZW50LnNwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxtREFBeUU7QUFDekUsK0NBQWtEO0FBRWxELG1EQUEwRDtBQUMxRCxzREFBa0U7QUFDbEUsdUNBQTBDO0FBQzFDLHlFQUFvRTtBQUVwRSxrRkFBa0Y7QUFDbEYsMENBQTZDO0FBRTdDLFFBQVEsQ0FBQyx3QkFBd0IsRUFBRSxHQUFHLEVBQUU7SUFDdEMsSUFBSSxTQUFpQyxDQUFDO0lBQ3RDLElBQUksT0FBaUQsQ0FBQztJQUN0RCxJQUFJLHNCQUE4QyxDQUFDO0lBRW5ELFVBQVUsQ0FBQyxlQUFLLENBQUMsR0FBRyxFQUFFO1FBQ3BCLGlCQUFPLENBQUMsc0JBQXNCLENBQUM7WUFDN0IsU0FBUyxFQUFFLENBQUMsaUJBQVUsQ0FBQyxnQ0FBc0IsQ0FBQyxDQUFDO1lBQy9DLE9BQU8sRUFBRTtnQkFDUCxtQkFBVyxDQUFDLE9BQU8sRUFBRTtnQkFDckIsbUJBQVcsQ0FBQyxPQUFPLENBQUM7b0JBQ2xCLG1CQUFtQixFQUFFLG9CQUFvQixDQUFDLE9BQU87aUJBQ2xELENBQUM7YUFDSDtZQUNELFlBQVksRUFBRSxDQUFDLGlEQUFzQixDQUFDO1NBQ3ZDLENBQUM7YUFDQyxpQkFBaUIsRUFBRSxDQUFDO1FBQ3ZCLHNCQUFzQixHQUFHLGlCQUFPLENBQUMsR0FBRyxDQUFDLGdDQUFzQixDQUFDLENBQUM7SUFDL0QsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUVKLFVBQVUsQ0FBQyxHQUFHLEVBQUU7UUFDZCxPQUFPLEdBQUcsaUJBQU8sQ0FBQyxlQUFlLENBQUMsaURBQXNCLENBQUMsQ0FBQztRQUMxRCxTQUFTLEdBQUcsT0FBTyxDQUFDLGlCQUFpQixDQUFDO1FBQ3RDLE9BQU8sQ0FBQyxhQUFhLEVBQUUsQ0FBQztJQUMxQixDQUFDLENBQUMsQ0FBQztJQUVILEVBQUUsQ0FBQyxlQUFlLEVBQUUsR0FBRyxFQUFFO1FBQ3ZCLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQyxVQUFVLEVBQUUsQ0FBQztJQUNqQyxDQUFDLENBQUMsQ0FBQztJQUVILEVBQUUsQ0FBQyx1QkFBdUIsRUFBRSxHQUFHLEVBQUU7UUFDL0IsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLGVBQWUsRUFBRSxDQUFDO0lBQ3BDLENBQUMsQ0FBQyxDQUFDO0lBRUgsRUFBRSxDQUFDLGdDQUFnQyxFQUFFLEdBQUcsRUFBRTtRQUN4QyxNQUFNLEtBQUssR0FBRyxJQUFJLHlCQUFnQixFQUFFLENBQUMsV0FBVyxDQUFDO1lBQy9DLE9BQU8sRUFBRSxTQUFTO1lBQ2xCLElBQUksRUFBRSxRQUFRO1lBQ2QsRUFBRSxFQUFFLElBQUksSUFBSSxFQUFFLENBQUMsT0FBTyxFQUFFO1NBQ3pCLENBQUMsQ0FBQztRQUNILFNBQVMsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDMUIseUVBQXlFO0lBQzNFLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyxDQUFDLENBQUMifQ==