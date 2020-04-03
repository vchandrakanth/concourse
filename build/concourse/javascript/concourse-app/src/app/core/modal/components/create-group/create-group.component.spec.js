"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const testing_1 = require("@angular/core/testing");
const platform_browser_1 = require("@angular/platform-browser");
const store_1 = require("@ngrx/store");
const alert_1 = require("ngx-bootstrap/alert");
const dynamic_form_1 = require("@concourse/shared/dynamic-form");
const facades_1 = require("@concourse/store/facades");
const test_1 = require("@concourse/test");
const angular_fontawesome_1 = require("@fortawesome/angular-fontawesome");
const create_group_component_1 = require("./create-group.component");
describe('CreateGroupComponent', () => {
    let component;
    let fixture;
    let groupFacade;
    const mockGroup = {
        name: 'Manage Accounts Group',
        description: 'it should manage accounts.'
    };
    beforeEach(testing_1.async(() => {
        testing_1.TestBed.configureTestingModule({
            schemas: [core_1.NO_ERRORS_SCHEMA],
            imports: [
                store_1.StoreModule.forRoot({}),
                alert_1.AlertModule.forRoot(),
                angular_fontawesome_1.FontAwesomeModule,
                dynamic_form_1.DynamicFormModule
            ],
            providers: [
                test_1.mockFacade(facades_1.GroupFacade)
            ],
            declarations: [create_group_component_1.CreateGroupComponent]
        })
            .compileComponents();
        groupFacade = testing_1.TestBed.get(facades_1.GroupFacade);
    }));
    beforeEach(() => {
        fixture = testing_1.TestBed.createComponent(create_group_component_1.CreateGroupComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
    it('should be invalid when no values exist in form', () => {
        expect(component.form.valid).toBeFalsy();
    });
    it('should create group with name and description', testing_1.async(() => {
        fixture.whenStable().then(() => {
            const name = fixture.debugElement.query(platform_browser_1.By.css('#name'));
            const description = fixture.debugElement.query(platform_browser_1.By.css('#description'));
            const nameEl = name.nativeElement;
            const descriptionEl = description.nativeElement;
            nameEl.value = mockGroup.name;
            descriptionEl.value = mockGroup.description;
            nameEl.dispatchEvent(new Event('input'));
            descriptionEl.dispatchEvent(new Event('input'));
            expect(nameEl.value).toBe(mockGroup.name);
            expect(component.form.valid).toBeTruthy();
        });
    }));
    it('should create group', () => {
        component.submit(mockGroup);
        expect(groupFacade.create).toHaveBeenCalledWith(mockGroup);
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRlLWdyb3VwLmNvbXBvbmVudC5zcGVjLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vY29uY291cnNlL2phdmFzY3JpcHQvY29uY291cnNlLWFwcC9zcmMvYXBwL2NvcmUvbW9kYWwvY29tcG9uZW50cy9jcmVhdGUtZ3JvdXAvY3JlYXRlLWdyb3VwLmNvbXBvbmVudC5zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsd0NBQWlEO0FBQ2pELG1EQUF5RTtBQUN6RSxnRUFBK0M7QUFDL0MsdUNBQTBDO0FBQzFDLCtDQUFrRDtBQUVsRCxpRUFBbUU7QUFDbkUsc0RBQXVEO0FBQ3ZELDBDQUE2QztBQUM3QywwRUFBcUU7QUFDckUscUVBQWdFO0FBRWhFLFFBQVEsQ0FBQyxzQkFBc0IsRUFBRSxHQUFHLEVBQUU7SUFDcEMsSUFBSSxTQUErQixDQUFDO0lBQ3BDLElBQUksT0FBK0MsQ0FBQztJQUNwRCxJQUFJLFdBQXdCLENBQUM7SUFFN0IsTUFBTSxTQUFTLEdBQUc7UUFDaEIsSUFBSSxFQUFFLHVCQUF1QjtRQUM3QixXQUFXLEVBQUUsNEJBQTRCO0tBQzFDLENBQUM7SUFDRixVQUFVLENBQUMsZUFBSyxDQUFDLEdBQUcsRUFBRTtRQUNwQixpQkFBTyxDQUFDLHNCQUFzQixDQUFDO1lBQzdCLE9BQU8sRUFBRSxDQUFDLHVCQUFnQixDQUFDO1lBQzNCLE9BQU8sRUFBRTtnQkFDUCxtQkFBVyxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUM7Z0JBQ3ZCLG1CQUFXLENBQUMsT0FBTyxFQUFFO2dCQUNyQix1Q0FBaUI7Z0JBQ2pCLGdDQUFpQjthQUNsQjtZQUNELFNBQVMsRUFBRTtnQkFDVCxpQkFBVSxDQUFDLHFCQUFXLENBQUM7YUFDeEI7WUFDRCxZQUFZLEVBQUUsQ0FBQyw2Q0FBb0IsQ0FBQztTQUNyQyxDQUFDO2FBQ0MsaUJBQWlCLEVBQUUsQ0FBQztRQUN2QixXQUFXLEdBQUcsaUJBQU8sQ0FBQyxHQUFHLENBQUMscUJBQVcsQ0FBQyxDQUFDO0lBQ3pDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFFSixVQUFVLENBQUMsR0FBRyxFQUFFO1FBQ2QsT0FBTyxHQUFHLGlCQUFPLENBQUMsZUFBZSxDQUFDLDZDQUFvQixDQUFDLENBQUM7UUFDeEQsU0FBUyxHQUFHLE9BQU8sQ0FBQyxpQkFBaUIsQ0FBQztRQUN0QyxPQUFPLENBQUMsYUFBYSxFQUFFLENBQUM7SUFDMUIsQ0FBQyxDQUFDLENBQUM7SUFFSCxFQUFFLENBQUMsZUFBZSxFQUFFLEdBQUcsRUFBRTtRQUN2QixNQUFNLENBQUMsU0FBUyxDQUFDLENBQUMsVUFBVSxFQUFFLENBQUM7SUFDakMsQ0FBQyxDQUFDLENBQUM7SUFFSCxFQUFFLENBQUMsZ0RBQWdELEVBQUUsR0FBRyxFQUFFO1FBQ3hELE1BQU0sQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLFNBQVMsRUFBRSxDQUFDO0lBQzNDLENBQUMsQ0FBQyxDQUFDO0lBRUgsRUFBRSxDQUFDLCtDQUErQyxFQUFFLGVBQUssQ0FBQyxHQUFHLEVBQUU7UUFDN0QsT0FBTyxDQUFDLFVBQVUsRUFBRSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUU7WUFDN0IsTUFBTSxJQUFJLEdBQUcsT0FBTyxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMscUJBQUUsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztZQUN6RCxNQUFNLFdBQVcsR0FBRyxPQUFPLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxxQkFBRSxDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDO1lBQ3ZFLE1BQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUM7WUFDbEMsTUFBTSxhQUFhLEdBQUcsV0FBVyxDQUFDLGFBQWEsQ0FBQztZQUVoRCxNQUFNLENBQUMsS0FBSyxHQUFHLFNBQVMsQ0FBQyxJQUFJLENBQUM7WUFDOUIsYUFBYSxDQUFDLEtBQUssR0FBRyxTQUFTLENBQUMsV0FBVyxDQUFDO1lBRTVDLE1BQU0sQ0FBQyxhQUFhLENBQUMsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztZQUN6QyxhQUFhLENBQUMsYUFBYSxDQUFDLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7WUFFaEQsTUFBTSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQzFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLFVBQVUsRUFBRSxDQUFDO1FBQzVDLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUVKLEVBQUUsQ0FBQyxxQkFBcUIsRUFBRSxHQUFHLEVBQUU7UUFDN0IsU0FBUyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUM1QixNQUFNLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDLG9CQUFvQixDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQzdELENBQUMsQ0FBQyxDQUFDO0FBRUwsQ0FBQyxDQUFDLENBQUMifQ==