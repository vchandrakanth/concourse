"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@angular/core/testing");
const forms_1 = require("@angular/forms");
const ngx_bootstrap_1 = require("ngx-bootstrap");
const dynamic_field_directive_1 = require("./components/dynamic-field/dynamic-field.directive");
const dynamic_form_component_1 = require("./dynamic-form.component");
describe('DynamicFormComponent', () => {
    let component;
    let fixture;
    beforeEach(testing_1.async(() => {
        testing_1.TestBed.configureTestingModule({
            imports: [
                forms_1.ReactiveFormsModule,
                ngx_bootstrap_1.AlertModule.forRoot()
            ],
            declarations: [
                dynamic_field_directive_1.DynamicFieldDirective,
                dynamic_form_component_1.DynamicFormComponent
            ]
        })
            .compileComponents();
    }));
    beforeEach(() => {
        fixture = testing_1.TestBed.createComponent(dynamic_form_component_1.DynamicFormComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHluYW1pYy1mb3JtLmNvbXBvbmVudC5zcGVjLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vY29uY291cnNlL2phdmFzY3JpcHQvY29uY291cnNlLWFwcC9zcmMvYXBwL3NoYXJlZC9keW5hbWljLWZvcm0vZHluYW1pYy1mb3JtLmNvbXBvbmVudC5zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsbURBQXlFO0FBQ3pFLDBDQUFxRDtBQUNyRCxpREFBNEM7QUFFNUMsZ0dBQTJGO0FBQzNGLHFFQUFnRTtBQUVoRSxRQUFRLENBQUMsc0JBQXNCLEVBQUUsR0FBRyxFQUFFO0lBQ3BDLElBQUksU0FBK0IsQ0FBQztJQUNwQyxJQUFJLE9BQStDLENBQUM7SUFFcEQsVUFBVSxDQUFDLGVBQUssQ0FBQyxHQUFHLEVBQUU7UUFDcEIsaUJBQU8sQ0FBQyxzQkFBc0IsQ0FBQztZQUM3QixPQUFPLEVBQUU7Z0JBQ1AsMkJBQW1CO2dCQUNuQiwyQkFBVyxDQUFDLE9BQU8sRUFBRTthQUN0QjtZQUNELFlBQVksRUFBRTtnQkFDWiwrQ0FBcUI7Z0JBQ3JCLDZDQUFvQjthQUNyQjtTQUNGLENBQUM7YUFDQyxpQkFBaUIsRUFBRSxDQUFDO0lBQ3pCLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFFSixVQUFVLENBQUMsR0FBRyxFQUFFO1FBQ2QsT0FBTyxHQUFHLGlCQUFPLENBQUMsZUFBZSxDQUFDLDZDQUFvQixDQUFDLENBQUM7UUFDeEQsU0FBUyxHQUFHLE9BQU8sQ0FBQyxpQkFBaUIsQ0FBQztRQUN0QyxPQUFPLENBQUMsYUFBYSxFQUFFLENBQUM7SUFDMUIsQ0FBQyxDQUFDLENBQUM7SUFFSCxFQUFFLENBQUMsZUFBZSxFQUFFLEdBQUcsRUFBRTtRQUN2QixNQUFNLENBQUMsU0FBUyxDQUFDLENBQUMsVUFBVSxFQUFFLENBQUM7SUFDakMsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDLENBQUMsQ0FBQyJ9