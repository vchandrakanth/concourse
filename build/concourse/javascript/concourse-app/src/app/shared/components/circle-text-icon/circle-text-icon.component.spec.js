"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@angular/core/testing");
// import { By } from '@angular/platform-browser';/f
const angular_fontawesome_1 = require("@fortawesome/angular-fontawesome");
const circle_text_icon_component_1 = require("./circle-text-icon.component");
describe('ListIconComponent', () => {
    let component;
    let fixture;
    // let textFontSize: any;
    beforeEach(testing_1.async(() => {
        testing_1.TestBed.configureTestingModule({
            imports: [
                angular_fontawesome_1.FontAwesomeModule
            ],
            declarations: [circle_text_icon_component_1.CircleTextIconComponent]
        })
            .compileComponents();
    }));
    beforeEach(() => {
        fixture = testing_1.TestBed.createComponent(circle_text_icon_component_1.CircleTextIconComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
    it('should throw an error if icon text is ', () => {
        component.iconText = '';
        const spy = jest.spyOn(fixture, 'detectChanges');
        fixture.whenStable().then(() => {
            expect(spy).toThrowError();
        });
    });
    it('should throw an error if a none string value is passed in', () => {
        component.iconText = '123';
        const spy = jest.spyOn(fixture, 'detectChanges');
        fixture.whenStable().then(() => {
            expect(spy).toThrowError();
        });
    });
    it('should throw an error if more than three charcters are provided', () => {
        component.iconText = 'Value';
        const spy = jest.spyOn(fixture, 'detectChanges');
        fixture.whenStable().then(() => {
            expect(spy).toThrowError();
        });
    });
    // holding off tests for styling. icon-text class is defaulting to null.
    // it('should set a pixel value of 14 if string is one character', () => {
    //   component.iconText = 'P';
    //   fixture.whenStable();
    //   expect(component).toBe(14);
    // const fontSize = textFontSize.styles['font-size'];
    // expect(fontSize).toBe('14px');
    // });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2lyY2xlLXRleHQtaWNvbi5jb21wb25lbnQuc3BlYy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL2NvbmNvdXJzZS9qYXZhc2NyaXB0L2NvbmNvdXJzZS1hcHAvc3JjL2FwcC9zaGFyZWQvY29tcG9uZW50cy9jaXJjbGUtdGV4dC1pY29uL2NpcmNsZS10ZXh0LWljb24uY29tcG9uZW50LnNwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxtREFBeUU7QUFDekUsb0RBQW9EO0FBQ3BELDBFQUFxRTtBQUNyRSw2RUFBdUU7QUFFdkUsUUFBUSxDQUFDLG1CQUFtQixFQUFFLEdBQUcsRUFBRTtJQUNqQyxJQUFJLFNBQWtDLENBQUM7SUFDdkMsSUFBSSxPQUFrRCxDQUFDO0lBQ3ZELHlCQUF5QjtJQUN6QixVQUFVLENBQUMsZUFBSyxDQUFDLEdBQUcsRUFBRTtRQUNwQixpQkFBTyxDQUFDLHNCQUFzQixDQUFDO1lBQzdCLE9BQU8sRUFBRTtnQkFDUCx1Q0FBaUI7YUFDbEI7WUFDRCxZQUFZLEVBQUUsQ0FBRSxvREFBdUIsQ0FBRTtTQUMxQyxDQUFDO2FBQ0QsaUJBQWlCLEVBQUUsQ0FBQztJQUN2QixDQUFDLENBQUMsQ0FBQyxDQUFDO0lBRUosVUFBVSxDQUFDLEdBQUcsRUFBRTtRQUNkLE9BQU8sR0FBRyxpQkFBTyxDQUFDLGVBQWUsQ0FBQyxvREFBdUIsQ0FBQyxDQUFDO1FBQzNELFNBQVMsR0FBRyxPQUFPLENBQUMsaUJBQWlCLENBQUM7UUFDdEMsT0FBTyxDQUFDLGFBQWEsRUFBRSxDQUFDO0lBQzFCLENBQUMsQ0FBQyxDQUFDO0lBRUgsRUFBRSxDQUFDLGVBQWUsRUFBRSxHQUFHLEVBQUU7UUFDdkIsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDLFVBQVUsRUFBRSxDQUFDO0lBQ2pDLENBQUMsQ0FBQyxDQUFDO0lBRUgsRUFBRSxDQUFDLHdDQUF3QyxFQUFFLEdBQUcsRUFBRTtRQUNoRCxTQUFTLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQztRQUN4QixNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRSxlQUFlLENBQUMsQ0FBQztRQUNqRCxPQUFPLENBQUMsVUFBVSxFQUFFLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRTtZQUM3QixNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDN0IsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDLENBQUMsQ0FBQztJQUVILEVBQUUsQ0FBQywyREFBMkQsRUFBRSxHQUFHLEVBQUU7UUFDbkUsU0FBUyxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7UUFDM0IsTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUsZUFBZSxDQUFDLENBQUM7UUFDakQsT0FBTyxDQUFDLFVBQVUsRUFBRSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUU7WUFDN0IsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLFlBQVksRUFBRSxDQUFDO1FBQzdCLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQyxDQUFDLENBQUM7SUFFSCxFQUFFLENBQUMsaUVBQWlFLEVBQUUsR0FBRyxFQUFFO1FBQ3pFLFNBQVMsQ0FBQyxRQUFRLEdBQUcsT0FBTyxDQUFDO1FBQzdCLE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFLGVBQWUsQ0FBQyxDQUFDO1FBQ2pELE9BQU8sQ0FBQyxVQUFVLEVBQUUsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFO1lBQzdCLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUM3QixDQUFDLENBQUMsQ0FBQztJQUNMLENBQUMsQ0FBQyxDQUFDO0lBRUgsd0VBQXdFO0lBQ3hFLDBFQUEwRTtJQUMxRSw4QkFBOEI7SUFDOUIsMEJBQTBCO0lBQzFCLGdDQUFnQztJQUM5QixxREFBcUQ7SUFDckQsaUNBQWlDO0lBQ25DLE1BQU07QUFDUixDQUFDLENBQUMsQ0FBQyJ9