"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const testing_1 = require("@angular/core/testing");
const platform_browser_1 = require("@angular/platform-browser");
const faInbox_1 = require("@fortawesome/free-solid-svg-icons/faInbox");
const null_state_component_1 = require("./null-state.component");
describe('NullStateComponent', () => {
    let component;
    let fixture;
    beforeEach(testing_1.async(() => {
        testing_1.TestBed.configureTestingModule({
            declarations: [null_state_component_1.NullStateComponent],
            schemas: [core_1.NO_ERRORS_SCHEMA]
        })
            .compileComponents();
    }));
    beforeEach(() => {
        fixture = testing_1.TestBed.createComponent(null_state_component_1.NullStateComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
    it('should use default values when bare component is set', () => {
        const title = fixture.debugElement.query(platform_browser_1.By.css('.h5')).nativeElement;
        const icon = fixture.debugElement.query(platform_browser_1.By.css('fa-icon')).nativeElement;
        expect(title.textContent).toEqual('No Entities Found.');
        expect(icon.icon.iconName).toEqual('box-open');
    });
    it('should use entityName in title', () => {
        component.entityName = 'Policy Groups';
        fixture.detectChanges();
        const title = fixture.debugElement.query(platform_browser_1.By.css('.h5')).nativeElement;
        const icon = fixture.debugElement.query(platform_browser_1.By.css('fa-icon')).nativeElement;
        expect(title.textContent).toEqual('No Policy Groups Found.');
        expect(icon.icon.iconName).toEqual('box-open');
    });
    it('should use override icon as icon', () => {
        component.icon = faInbox_1.faInbox;
        fixture.detectChanges();
        const title = fixture.debugElement.query(platform_browser_1.By.css('.h5')).nativeElement;
        const icon = fixture.debugElement.query(platform_browser_1.By.css('fa-icon')).nativeElement;
        expect(title.textContent).toEqual('No Entities Found.');
        expect(icon.icon.iconName).toEqual('inbox');
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnVsbC1zdGF0ZS5jb21wb25lbnQuc3BlYy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL2NvbmNvdXJzZS9qYXZhc2NyaXB0L2NvbmNvdXJzZS1hcHAvc3JjL2FwcC9zaGFyZWQvY29tcG9uZW50cy9udWxsLXN0YXRlL251bGwtc3RhdGUuY29tcG9uZW50LnNwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSx3Q0FBaUQ7QUFDakQsbURBQXlFO0FBQ3pFLGdFQUErQztBQUMvQyx1RUFBb0U7QUFFcEUsaUVBQTREO0FBRTVELFFBQVEsQ0FBQyxvQkFBb0IsRUFBRSxHQUFHLEVBQUU7SUFDbEMsSUFBSSxTQUE2QixDQUFDO0lBQ2xDLElBQUksT0FBNkMsQ0FBQztJQUVsRCxVQUFVLENBQUMsZUFBSyxDQUFDLEdBQUcsRUFBRTtRQUNwQixpQkFBTyxDQUFDLHNCQUFzQixDQUFDO1lBQzdCLFlBQVksRUFBRSxDQUFDLHlDQUFrQixDQUFDO1lBQ2xDLE9BQU8sRUFBRSxDQUFDLHVCQUFnQixDQUFDO1NBQzVCLENBQUM7YUFDQyxpQkFBaUIsRUFBRSxDQUFDO0lBQ3pCLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFFSixVQUFVLENBQUMsR0FBRyxFQUFFO1FBQ2QsT0FBTyxHQUFHLGlCQUFPLENBQUMsZUFBZSxDQUFDLHlDQUFrQixDQUFDLENBQUM7UUFDdEQsU0FBUyxHQUFHLE9BQU8sQ0FBQyxpQkFBaUIsQ0FBQztRQUN0QyxPQUFPLENBQUMsYUFBYSxFQUFFLENBQUM7SUFDMUIsQ0FBQyxDQUFDLENBQUM7SUFFSCxFQUFFLENBQUMsZUFBZSxFQUFFLEdBQUcsRUFBRTtRQUN2QixNQUFNLENBQUMsU0FBUyxDQUFDLENBQUMsVUFBVSxFQUFFLENBQUM7SUFDakMsQ0FBQyxDQUFDLENBQUM7SUFFSCxFQUFFLENBQUMsc0RBQXNELEVBQUUsR0FBRyxFQUFFO1FBQzlELE1BQU0sS0FBSyxHQUFHLE9BQU8sQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLHFCQUFFLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsYUFBK0IsQ0FBQztRQUN4RixNQUFNLElBQUksR0FBRyxPQUFPLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxxQkFBRSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLGFBQWEsQ0FBQztRQUN6RSxNQUFNLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO1FBQ3hELE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUNqRCxDQUFDLENBQUMsQ0FBQztJQUVILEVBQUUsQ0FBQyxnQ0FBZ0MsRUFBRSxHQUFHLEVBQUU7UUFDeEMsU0FBUyxDQUFDLFVBQVUsR0FBRyxlQUFlLENBQUM7UUFDdkMsT0FBTyxDQUFDLGFBQWEsRUFBRSxDQUFDO1FBQ3hCLE1BQU0sS0FBSyxHQUFHLE9BQU8sQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLHFCQUFFLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsYUFBK0IsQ0FBQztRQUN4RixNQUFNLElBQUksR0FBRyxPQUFPLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxxQkFBRSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLGFBQWEsQ0FBQztRQUN6RSxNQUFNLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDO1FBQzdELE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUNqRCxDQUFDLENBQUMsQ0FBQztJQUVILEVBQUUsQ0FBQyxrQ0FBa0MsRUFBRSxHQUFHLEVBQUU7UUFDMUMsU0FBUyxDQUFDLElBQUksR0FBRyxpQkFBTyxDQUFDO1FBQ3pCLE9BQU8sQ0FBQyxhQUFhLEVBQUUsQ0FBQztRQUN4QixNQUFNLEtBQUssR0FBRyxPQUFPLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxxQkFBRSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLGFBQStCLENBQUM7UUFDeEYsTUFBTSxJQUFJLEdBQUcsT0FBTyxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMscUJBQUUsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxhQUFhLENBQUM7UUFDekUsTUFBTSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsQ0FBQyxPQUFPLENBQUMsb0JBQW9CLENBQUMsQ0FBQztRQUN4RCxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDOUMsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDLENBQUMsQ0FBQyJ9