"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@angular/core/testing");
const time_range_component_1 = require("./time-range.component");
xdescribe('TimeRangeComponent', () => {
    let component;
    let fixture;
    beforeEach(testing_1.async(() => {
        testing_1.TestBed.configureTestingModule({
            declarations: [time_range_component_1.TimeRangeComponent]
        })
            .compileComponents();
    }));
    beforeEach(() => {
        fixture = testing_1.TestBed.createComponent(time_range_component_1.TimeRangeComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
    it('should match snapshot', () => {
        expect(fixture).toMatchSnapshot();
    });
    it('should not be active at start', () => {
        expect(component.isActive).toBeFalsy();
    });
    it('after toggle it should be active', event => {
        component.toggle();
        expect(component.isActive).toBeTruthy();
    });
    it('after toggle 2 times it should be inactive', event => {
        component.toggle();
        expect(component.isActive).toBeTruthy();
        component.toggle();
        expect(component.isActive).toBeFalsy();
    });
    it('selecting a time should set it to inactive', event => {
        component.toggle();
        component.onSelectRange({
            label: 'Last 14 Days',
            lookBackHours: 336
        }, event);
        expect(component.isActive).toBeFalsy();
    });
    it('should extract a property using extractProperty()', () => {
        // expect(component.extractProperty(component.cardContent[0].prop)).toBe('TESTING');
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZS1yYW5nZS5jb21wb25lbnQuc3BlYy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL2NvbmNvdXJzZS9qYXZhc2NyaXB0L2NvbmNvdXJzZS1hcHAvc3JjL2FwcC9zaGFyZWQvY29tcG9uZW50cy90aW1lLXJhbmdlL3RpbWUtcmFuZ2UuY29tcG9uZW50LnNwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxtREFBeUU7QUFFekUsaUVBQTREO0FBRTVELFNBQVMsQ0FBQyxvQkFBb0IsRUFBRSxHQUFHLEVBQUU7SUFDbkMsSUFBSSxTQUE2QixDQUFDO0lBQ2xDLElBQUksT0FBNkMsQ0FBQztJQUVsRCxVQUFVLENBQUMsZUFBSyxDQUFDLEdBQUcsRUFBRTtRQUNwQixpQkFBTyxDQUFDLHNCQUFzQixDQUFDO1lBQzdCLFlBQVksRUFBRSxDQUFDLHlDQUFrQixDQUFDO1NBQ25DLENBQUM7YUFDQyxpQkFBaUIsRUFBRSxDQUFDO0lBQ3pCLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFFSixVQUFVLENBQUMsR0FBRyxFQUFFO1FBQ2QsT0FBTyxHQUFHLGlCQUFPLENBQUMsZUFBZSxDQUFDLHlDQUFrQixDQUFDLENBQUM7UUFDdEQsU0FBUyxHQUFHLE9BQU8sQ0FBQyxpQkFBaUIsQ0FBQztRQUN0QyxPQUFPLENBQUMsYUFBYSxFQUFFLENBQUM7SUFDMUIsQ0FBQyxDQUFDLENBQUM7SUFFSCxFQUFFLENBQUMsZUFBZSxFQUFFLEdBQUcsRUFBRTtRQUN2QixNQUFNLENBQUMsU0FBUyxDQUFDLENBQUMsVUFBVSxFQUFFLENBQUM7SUFDakMsQ0FBQyxDQUFDLENBQUM7SUFFSCxFQUFFLENBQUMsdUJBQXVCLEVBQUUsR0FBRyxFQUFFO1FBQy9CLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxlQUFlLEVBQUUsQ0FBQztJQUNwQyxDQUFDLENBQUMsQ0FBQztJQUVILEVBQUUsQ0FBQywrQkFBK0IsRUFBRSxHQUFHLEVBQUU7UUFDdkMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxTQUFTLEVBQUUsQ0FBQztJQUN6QyxDQUFDLENBQUMsQ0FBQztJQUVILEVBQUUsQ0FBQyxrQ0FBa0MsRUFBRSxLQUFLLENBQUMsRUFBRTtRQUM3QyxTQUFTLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDbkIsTUFBTSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxVQUFVLEVBQUUsQ0FBQztJQUMxQyxDQUFDLENBQUMsQ0FBQztJQUVILEVBQUUsQ0FBQyw0Q0FBNEMsRUFBRSxLQUFLLENBQUMsRUFBRTtRQUN2RCxTQUFTLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDbkIsTUFBTSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUN4QyxTQUFTLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDbkIsTUFBTSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxTQUFTLEVBQUUsQ0FBQztJQUN6QyxDQUFDLENBQUMsQ0FBQztJQUVILEVBQUUsQ0FBQyw0Q0FBNEMsRUFBRSxLQUFLLENBQUMsRUFBRTtRQUN2RCxTQUFTLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDbkIsU0FBUyxDQUFDLGFBQWEsQ0FBQztZQUN0QixLQUFLLEVBQUUsY0FBYztZQUNyQixhQUFhLEVBQUUsR0FBRztTQUNuQixFQUFFLEtBQUssQ0FBQyxDQUFDO1FBRVYsTUFBTSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxTQUFTLEVBQUUsQ0FBQztJQUN6QyxDQUFDLENBQUMsQ0FBQztJQUVILEVBQUUsQ0FBQyxtREFBbUQsRUFBRSxHQUFHLEVBQUU7UUFDM0Qsb0ZBQW9GO0lBQ3RGLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyxDQUFDLENBQUMifQ==