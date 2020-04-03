"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const testing_1 = require("@angular/core/testing");
const control_validation_component_1 = require("./control-validation.component");
describe('ControlValidationComponent', () => {
    let component;
    let fixture;
    beforeEach(testing_1.async(() => {
        testing_1.TestBed.configureTestingModule({
            schemas: [core_1.NO_ERRORS_SCHEMA],
            declarations: [control_validation_component_1.ControlValidationComponent]
        })
            .compileComponents();
    }));
    beforeEach(() => {
        fixture = testing_1.TestBed.createComponent(control_validation_component_1.ControlValidationComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udHJvbC12YWxpZGF0aW9uLmNvbXBvbmVudC5zcGVjLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vY29uY291cnNlL2phdmFzY3JpcHQvY29uY291cnNlLWFwcC9zcmMvYXBwL3NoYXJlZC9mb3JtLWNvbXBvbmVudHMvY29udHJvbC12YWxpZGF0aW9uL2NvbnRyb2wtdmFsaWRhdGlvbi5jb21wb25lbnQuc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHdDQUFpRDtBQUNqRCxtREFBeUU7QUFFekUsaUZBQTRFO0FBRTVFLFFBQVEsQ0FBQyw0QkFBNEIsRUFBRSxHQUFHLEVBQUU7SUFDMUMsSUFBSSxTQUFxQyxDQUFDO0lBQzFDLElBQUksT0FBcUQsQ0FBQztJQUUxRCxVQUFVLENBQUMsZUFBSyxDQUFDLEdBQUcsRUFBRTtRQUNwQixpQkFBTyxDQUFDLHNCQUFzQixDQUFDO1lBQzdCLE9BQU8sRUFBRSxDQUFDLHVCQUFnQixDQUFDO1lBQzNCLFlBQVksRUFBRSxDQUFDLHlEQUEwQixDQUFDO1NBQzNDLENBQUM7YUFDQyxpQkFBaUIsRUFBRSxDQUFDO0lBQ3pCLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFFSixVQUFVLENBQUMsR0FBRyxFQUFFO1FBQ2QsT0FBTyxHQUFHLGlCQUFPLENBQUMsZUFBZSxDQUFDLHlEQUEwQixDQUFDLENBQUM7UUFDOUQsU0FBUyxHQUFHLE9BQU8sQ0FBQyxpQkFBaUIsQ0FBQztRQUN0QyxPQUFPLENBQUMsYUFBYSxFQUFFLENBQUM7SUFDMUIsQ0FBQyxDQUFDLENBQUM7SUFFSCxFQUFFLENBQUMsZUFBZSxFQUFFLEdBQUcsRUFBRTtRQUN2QixNQUFNLENBQUMsU0FBUyxDQUFDLENBQUMsVUFBVSxFQUFFLENBQUM7SUFDakMsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDLENBQUMsQ0FBQyJ9