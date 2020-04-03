"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@angular/core/testing");
const platform_browser_1 = require("@angular/platform-browser");
const forms_1 = require("@angular/forms");
const form_checkbox_component_1 = require("./form-checkbox.component");
describe('DynamicForm:CheckboxComponent', () => {
    let component;
    let fixture;
    const formBuilder = new forms_1.FormBuilder();
    const config = {
        type: 'checkbox',
        name: 'test'
    };
    let checkbox;
    beforeEach(testing_1.async(() => {
        testing_1.TestBed.configureTestingModule({
            imports: [
                forms_1.ReactiveFormsModule
            ],
            providers: [
                { provide: forms_1.FormBuilder, useValue: formBuilder }
            ],
            declarations: [form_checkbox_component_1.FormCheckboxComponent]
        })
            .compileComponents();
    }));
    beforeEach(() => {
        fixture = testing_1.TestBed.createComponent(form_checkbox_component_1.FormCheckboxComponent);
        component = fixture.componentInstance;
        component.config = config;
        component.group = formBuilder.group({
            test: formBuilder.control('')
        });
        fixture.detectChanges();
        checkbox = fixture.debugElement.query(platform_browser_1.By.css('#test')).nativeElement;
    });
    it('should create component', () => {
        expect(component).toBeTruthy();
    });
    it('should find check box and set value', () => {
        expect(checkbox).toBeDefined();
        const formGroup = component.group;
        const groupName = formGroup.controls['test'];
        groupName.setValue('test');
        fixture.detectChanges();
        expect(checkbox['value']).toBe('test');
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS1jaGVja2JveC5jb21wb25lbnQuc3BlYy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL2NvbmNvdXJzZS9qYXZhc2NyaXB0L2NvbmNvdXJzZS1hcHAvc3JjL2FwcC9zaGFyZWQvZHluYW1pYy1mb3JtL2NvbXBvbmVudHMvZm9ybS1jaGVja2JveC9mb3JtLWNoZWNrYm94LmNvbXBvbmVudC5zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsbURBQXlFO0FBQ3pFLGdFQUErQztBQUMvQywwQ0FBa0U7QUFHbEUsdUVBQWtFO0FBRWxFLFFBQVEsQ0FBQywrQkFBK0IsRUFBRSxHQUFHLEVBQUU7SUFDN0MsSUFBSSxTQUFnQyxDQUFDO0lBQ3JDLElBQUksT0FBZ0QsQ0FBQztJQUNyRCxNQUFNLFdBQVcsR0FBZ0IsSUFBSSxtQkFBVyxFQUFFLENBQUM7SUFDbkQsTUFBTSxNQUFNLEdBQWdCO1FBQzFCLElBQUksRUFBRSxVQUFVO1FBQ2hCLElBQUksRUFBRSxNQUFNO0tBQ2IsQ0FBQztJQUNGLElBQUksUUFBaUIsQ0FBQztJQUV0QixVQUFVLENBQUMsZUFBSyxDQUFDLEdBQUcsRUFBRTtRQUNwQixpQkFBTyxDQUFDLHNCQUFzQixDQUFDO1lBQzdCLE9BQU8sRUFBRTtnQkFDUCwyQkFBbUI7YUFDcEI7WUFDRCxTQUFTLEVBQUU7Z0JBQ1QsRUFBRSxPQUFPLEVBQUUsbUJBQVcsRUFBRSxRQUFRLEVBQUUsV0FBVyxFQUFFO2FBQ2hEO1lBQ0QsWUFBWSxFQUFFLENBQUMsK0NBQXFCLENBQUM7U0FDdEMsQ0FBQzthQUNDLGlCQUFpQixFQUFFLENBQUM7SUFDekIsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUVKLFVBQVUsQ0FBQyxHQUFHLEVBQUU7UUFDZCxPQUFPLEdBQUcsaUJBQU8sQ0FBQyxlQUFlLENBQUMsK0NBQXFCLENBQUMsQ0FBQztRQUN6RCxTQUFTLEdBQUcsT0FBTyxDQUFDLGlCQUFpQixDQUFDO1FBQ3RDLFNBQVMsQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO1FBQzFCLFNBQVMsQ0FBQyxLQUFLLEdBQUcsV0FBVyxDQUFDLEtBQUssQ0FBQztZQUNsQyxJQUFJLEVBQUUsV0FBVyxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUM7U0FDOUIsQ0FBQyxDQUFDO1FBQ0gsT0FBTyxDQUFDLGFBQWEsRUFBRSxDQUFDO1FBQ3hCLFFBQVEsR0FBRyxPQUFPLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxxQkFBRSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLGFBQWEsQ0FBQztJQUN2RSxDQUFDLENBQUMsQ0FBQztJQUVILEVBQUUsQ0FBQyx5QkFBeUIsRUFBRSxHQUFHLEVBQUU7UUFDakMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDLFVBQVUsRUFBRSxDQUFDO0lBQ2pDLENBQUMsQ0FBQyxDQUFDO0lBRUgsRUFBRSxDQUFDLHFDQUFxQyxFQUFFLEdBQUcsRUFBRTtRQUM3QyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDL0IsTUFBTSxTQUFTLEdBQUcsU0FBUyxDQUFDLEtBQUssQ0FBQztRQUNsQyxNQUFNLFNBQVMsR0FBRyxTQUFTLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzdDLFNBQVMsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDM0IsT0FBTyxDQUFDLGFBQWEsRUFBRSxDQUFDO1FBQ3hCLE1BQU0sQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDekMsQ0FBQyxDQUFDLENBQUM7QUFFTCxDQUFDLENBQUMsQ0FBQyJ9