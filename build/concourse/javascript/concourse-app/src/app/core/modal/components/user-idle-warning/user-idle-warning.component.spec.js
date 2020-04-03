"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@angular/core/testing");
const user_idle_warning_component_1 = require("./user-idle-warning.component");
const angular_fontawesome_1 = require("@fortawesome/angular-fontawesome");
describe('UserIdleWarningComponent', () => {
    let component;
    let fixture;
    beforeEach(testing_1.async(() => {
        testing_1.TestBed.configureTestingModule({
            imports: [angular_fontawesome_1.FontAwesomeModule],
            declarations: [user_idle_warning_component_1.UserIdleWarningComponent]
        })
            .compileComponents();
    }));
    beforeEach(() => {
        fixture = testing_1.TestBed.createComponent(user_idle_warning_component_1.UserIdleWarningComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci1pZGxlLXdhcm5pbmcuY29tcG9uZW50LnNwZWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9jb25jb3Vyc2UvamF2YXNjcmlwdC9jb25jb3Vyc2UtYXBwL3NyYy9hcHAvY29yZS9tb2RhbC9jb21wb25lbnRzL3VzZXItaWRsZS13YXJuaW5nL3VzZXItaWRsZS13YXJuaW5nLmNvbXBvbmVudC5zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsbURBQXlFO0FBRXpFLCtFQUF5RTtBQUV6RSwwRUFBcUU7QUFFckUsUUFBUSxDQUFDLDBCQUEwQixFQUFFLEdBQUcsRUFBRTtJQUN4QyxJQUFJLFNBQW1DLENBQUM7SUFDeEMsSUFBSSxPQUFtRCxDQUFDO0lBRXhELFVBQVUsQ0FBQyxlQUFLLENBQUMsR0FBRyxFQUFFO1FBQ3BCLGlCQUFPLENBQUMsc0JBQXNCLENBQUM7WUFDN0IsT0FBTyxFQUFFLENBQUUsdUNBQWlCLENBQUU7WUFDOUIsWUFBWSxFQUFFLENBQUUsc0RBQXdCLENBQUU7U0FDM0MsQ0FBQzthQUNELGlCQUFpQixFQUFFLENBQUM7SUFDdkIsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUVKLFVBQVUsQ0FBQyxHQUFHLEVBQUU7UUFDZCxPQUFPLEdBQUcsaUJBQU8sQ0FBQyxlQUFlLENBQUMsc0RBQXdCLENBQUMsQ0FBQztRQUM1RCxTQUFTLEdBQUcsT0FBTyxDQUFDLGlCQUFpQixDQUFDO1FBQ3RDLE9BQU8sQ0FBQyxhQUFhLEVBQUUsQ0FBQztJQUMxQixDQUFDLENBQUMsQ0FBQztJQUVILEVBQUUsQ0FBQyxlQUFlLEVBQUUsR0FBRyxFQUFFO1FBQ3ZCLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQyxVQUFVLEVBQUUsQ0FBQztJQUNqQyxDQUFDLENBQUMsQ0FBQztBQUNMLENBQUMsQ0FBQyxDQUFDIn0=