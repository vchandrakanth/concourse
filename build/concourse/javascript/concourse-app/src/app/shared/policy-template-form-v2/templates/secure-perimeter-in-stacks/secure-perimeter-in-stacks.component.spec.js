"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@angular/core/testing");
const secure_perimeter_in_stacks_component_1 = require("./secure-perimeter-in-stacks.component");
xdescribe('SecurePerimeterInStacksComponent', () => {
    let component;
    let fixture;
    beforeEach(testing_1.async(() => {
        testing_1.TestBed.configureTestingModule({
            declarations: [secure_perimeter_in_stacks_component_1.SecurePerimeterInStacksComponent]
        })
            .compileComponents();
    }));
    beforeEach(() => {
        fixture = testing_1.TestBed.createComponent(secure_perimeter_in_stacks_component_1.SecurePerimeterInStacksComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VjdXJlLXBlcmltZXRlci1pbi1zdGFja3MuY29tcG9uZW50LnNwZWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9jb25jb3Vyc2UvamF2YXNjcmlwdC9jb25jb3Vyc2UtYXBwL3NyYy9hcHAvc2hhcmVkL3BvbGljeS10ZW1wbGF0ZS1mb3JtLXYyL3RlbXBsYXRlcy9zZWN1cmUtcGVyaW1ldGVyLWluLXN0YWNrcy9zZWN1cmUtcGVyaW1ldGVyLWluLXN0YWNrcy5jb21wb25lbnQuc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLG1EQUF5RTtBQUV6RSxpR0FBMEY7QUFFMUYsU0FBUyxDQUFDLGtDQUFrQyxFQUFFLEdBQUcsRUFBRTtJQUNqRCxJQUFJLFNBQTJDLENBQUM7SUFDaEQsSUFBSSxPQUEyRCxDQUFDO0lBRWhFLFVBQVUsQ0FBQyxlQUFLLENBQUMsR0FBRyxFQUFFO1FBQ3BCLGlCQUFPLENBQUMsc0JBQXNCLENBQUM7WUFDN0IsWUFBWSxFQUFFLENBQUUsdUVBQWdDLENBQUU7U0FDbkQsQ0FBQzthQUNELGlCQUFpQixFQUFFLENBQUM7SUFDdkIsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUVKLFVBQVUsQ0FBQyxHQUFHLEVBQUU7UUFDZCxPQUFPLEdBQUcsaUJBQU8sQ0FBQyxlQUFlLENBQUMsdUVBQWdDLENBQUMsQ0FBQztRQUNwRSxTQUFTLEdBQUcsT0FBTyxDQUFDLGlCQUFpQixDQUFDO1FBQ3RDLE9BQU8sQ0FBQyxhQUFhLEVBQUUsQ0FBQztJQUMxQixDQUFDLENBQUMsQ0FBQztJQUVILEVBQUUsQ0FBQyxlQUFlLEVBQUUsR0FBRyxFQUFFO1FBQ3ZCLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQyxVQUFVLEVBQUUsQ0FBQztJQUNqQyxDQUFDLENBQUMsQ0FBQztBQUNMLENBQUMsQ0FBQyxDQUFDIn0=