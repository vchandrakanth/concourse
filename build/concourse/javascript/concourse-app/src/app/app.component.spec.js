"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const testing_1 = require("@angular/core/testing");
const animations_1 = require("@angular/platform-browser/animations");
const test_1 = require("@concourse/test");
const app_component_1 = require("./app.component");
describe('AppComponent', () => {
    let fixture;
    let component;
    beforeEach(testing_1.async(() => {
        const configure = testBed => {
            testBed
                .configureTestingModule({
                declarations: [app_component_1.AppComponent],
                imports: [animations_1.NoopAnimationsModule],
                schemas: [core_1.NO_ERRORS_SCHEMA]
            });
        };
        test_1.configureTests(configure).then(testBed => {
            fixture = testBed.createComponent(app_component_1.AppComponent);
            component = fixture.componentInstance;
            fixture.detectChanges();
        });
    }));
    it('should create the app', testing_1.async(() => {
        const app = component;
        expect(app).toBeTruthy();
    }));
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmNvbXBvbmVudC5zcGVjLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vY29uY291cnNlL2phdmFzY3JpcHQvY29uY291cnNlLWFwcC9zcmMvYXBwL2FwcC5jb21wb25lbnQuc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHdDQUFpRDtBQUNqRCxtREFBZ0U7QUFDaEUscUVBQTRFO0FBRTVFLDBDQUE4RDtBQUU5RCxtREFBK0M7QUFFL0MsUUFBUSxDQUFDLGNBQWMsRUFBRSxHQUFHLEVBQUU7SUFDNUIsSUFBSSxPQUF1QyxDQUFDO0lBQzVDLElBQUksU0FBdUIsQ0FBQztJQUU1QixVQUFVLENBQ1IsZUFBSyxDQUFDLEdBQUcsRUFBRTtRQUNULE1BQU0sU0FBUyxHQUFnQixPQUFPLENBQUMsRUFBRTtZQUN2QyxPQUFPO2lCQUNKLHNCQUFzQixDQUFDO2dCQUN0QixZQUFZLEVBQUUsQ0FBQyw0QkFBWSxDQUFDO2dCQUM1QixPQUFPLEVBQUUsQ0FBQyxpQ0FBb0IsQ0FBQztnQkFDL0IsT0FBTyxFQUFFLENBQUMsdUJBQWdCLENBQUM7YUFDNUIsQ0FBQyxDQUFDO1FBQ1AsQ0FBQyxDQUFDO1FBRUYscUJBQWMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEVBQUU7WUFDdkMsT0FBTyxHQUFHLE9BQU8sQ0FBQyxlQUFlLENBQUMsNEJBQVksQ0FBQyxDQUFDO1lBQ2hELFNBQVMsR0FBRyxPQUFPLENBQUMsaUJBQWlCLENBQUM7WUFDdEMsT0FBTyxDQUFDLGFBQWEsRUFBRSxDQUFDO1FBQzFCLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQyxDQUFDLENBQ0gsQ0FBQztJQUVGLEVBQUUsQ0FBQyx1QkFBdUIsRUFBRSxlQUFLLENBQUMsR0FBRyxFQUFFO1FBQ3JDLE1BQU0sR0FBRyxHQUFHLFNBQVMsQ0FBQztRQUN0QixNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsVUFBVSxFQUFFLENBQUM7SUFDM0IsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNOLENBQUMsQ0FBQyxDQUFDIn0=