"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const testing_1 = require("@angular/core/testing");
const forms_1 = require("@angular/forms");
const ng_select_1 = require("@ng-select/ng-select");
const form_type_ahead_component_1 = require("./form-type-ahead.component");
describe('DynamicForm:TypeAheadComponent', () => {
    let component;
    let fixture;
    const formBuilder = new forms_1.FormBuilder();
    const config = {
        type: 'typeahead',
        label: 'Test',
        name: 'test',
        placeholder: 'Test',
        options: [{ id: 1, text: 'O1' }, { id: 2, text: 'O2' }, { id: 3, text: 'O3' }]
    };
    beforeEach(testing_1.async(() => {
        testing_1.TestBed.configureTestingModule({
            schemas: [core_1.NO_ERRORS_SCHEMA],
            imports: [
                forms_1.ReactiveFormsModule,
                ng_select_1.NgSelectModule
            ],
            providers: [
                { provide: forms_1.FormBuilder, useValue: formBuilder }
            ],
            declarations: [form_type_ahead_component_1.FormTypeAheadComponent]
        })
            .compileComponents();
    }));
    beforeEach(() => {
        fixture = testing_1.TestBed.createComponent(form_type_ahead_component_1.FormTypeAheadComponent);
        component = fixture.componentInstance;
        component.config = config;
        component.group = formBuilder.group({
            test: formBuilder.control('', [forms_1.Validators.required])
        });
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS10eXBlLWFoZWFkLmNvbXBvbmVudC5zcGVjLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vY29uY291cnNlL2phdmFzY3JpcHQvY29uY291cnNlLWFwcC9zcmMvYXBwL3NoYXJlZC9keW5hbWljLWZvcm0vY29tcG9uZW50cy9mb3JtLXR5cGUtYWhlYWQvZm9ybS10eXBlLWFoZWFkLmNvbXBvbmVudC5zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsd0NBQWlEO0FBQ2pELG1EQUF5RTtBQUN6RSwwQ0FBOEU7QUFDOUUsb0RBQXNEO0FBR3RELDJFQUFxRTtBQUVyRSxRQUFRLENBQUMsZ0NBQWdDLEVBQUUsR0FBRyxFQUFFO0lBQzlDLElBQUksU0FBaUMsQ0FBQztJQUN0QyxJQUFJLE9BQWlELENBQUM7SUFDdEQsTUFBTSxXQUFXLEdBQWdCLElBQUksbUJBQVcsRUFBRSxDQUFDO0lBQ25ELE1BQU0sTUFBTSxHQUFnQjtRQUMxQixJQUFJLEVBQUUsV0FBVztRQUNqQixLQUFLLEVBQUUsTUFBTTtRQUNiLElBQUksRUFBRSxNQUFNO1FBQ1osV0FBVyxFQUFFLE1BQU07UUFDbkIsT0FBTyxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLENBQUM7S0FDL0UsQ0FBQztJQUVGLFVBQVUsQ0FBQyxlQUFLLENBQUMsR0FBRyxFQUFFO1FBQ3BCLGlCQUFPLENBQUMsc0JBQXNCLENBQUM7WUFDN0IsT0FBTyxFQUFFLENBQUMsdUJBQWdCLENBQUM7WUFDM0IsT0FBTyxFQUFFO2dCQUNQLDJCQUFtQjtnQkFDbkIsMEJBQWM7YUFDZjtZQUNELFNBQVMsRUFBRTtnQkFDVCxFQUFFLE9BQU8sRUFBRSxtQkFBVyxFQUFFLFFBQVEsRUFBRSxXQUFXLEVBQUU7YUFDaEQ7WUFDRCxZQUFZLEVBQUUsQ0FBQyxrREFBc0IsQ0FBQztTQUN2QyxDQUFDO2FBQ0MsaUJBQWlCLEVBQUUsQ0FBQztJQUN6QixDQUFDLENBQUMsQ0FBQyxDQUFDO0lBRUosVUFBVSxDQUFDLEdBQUcsRUFBRTtRQUNkLE9BQU8sR0FBRyxpQkFBTyxDQUFDLGVBQWUsQ0FBQyxrREFBc0IsQ0FBQyxDQUFDO1FBQzFELFNBQVMsR0FBRyxPQUFPLENBQUMsaUJBQWlCLENBQUM7UUFDdEMsU0FBUyxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7UUFDMUIsU0FBUyxDQUFDLEtBQUssR0FBRyxXQUFXLENBQUMsS0FBSyxDQUFDO1lBQ2xDLElBQUksRUFBRSxXQUFXLENBQUMsT0FBTyxDQUFDLEVBQUUsRUFBRSxDQUFDLGtCQUFVLENBQUMsUUFBUSxDQUFDLENBQUM7U0FDckQsQ0FBQyxDQUFDO1FBQ0gsT0FBTyxDQUFDLGFBQWEsRUFBRSxDQUFDO0lBQzFCLENBQUMsQ0FBQyxDQUFDO0lBRUgsRUFBRSxDQUFDLGVBQWUsRUFBRSxHQUFHLEVBQUU7UUFDdkIsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDLFVBQVUsRUFBRSxDQUFDO0lBQ2pDLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyxDQUFDLENBQUMifQ==