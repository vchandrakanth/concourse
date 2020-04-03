"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@angular/core/testing");
const forms_1 = require("@angular/forms");
const form_text_area_component_1 = require("./form-text-area.component");
describe('DynamicForm:TextAreaComponent', () => {
    let component;
    let fixture;
    const formBuilder = new forms_1.FormBuilder();
    const config = {
        type: 'textarea',
        label: 'Test',
        name: 'test',
        placeholder: 'Test'
    };
    beforeEach(testing_1.async(() => {
        testing_1.TestBed.configureTestingModule({
            imports: [
                forms_1.ReactiveFormsModule
            ],
            providers: [
                { provide: forms_1.FormBuilder, useValue: formBuilder }
            ],
            declarations: [form_text_area_component_1.FormTextAreaComponent]
        })
            .compileComponents();
    }));
    beforeEach(() => {
        fixture = testing_1.TestBed.createComponent(form_text_area_component_1.FormTextAreaComponent);
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
    it('group invalid when empty', () => {
        expect(component.group.valid).toBeFalsy();
    });
    it('should check for textarea default value validity', () => {
        const groupForm = component.group;
        const groupDescription = groupForm.controls['test'];
        expect(groupDescription.valid).toBeFalsy();
        groupDescription.setValue('Group Description');
        expect(groupDescription.valid).toBeTruthy();
        expect(groupDescription.value).toBe('Group Description');
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS10ZXh0LWFyZWEuY29tcG9uZW50LnNwZWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9jb25jb3Vyc2UvamF2YXNjcmlwdC9jb25jb3Vyc2UtYXBwL3NyYy9hcHAvc2hhcmVkL2R5bmFtaWMtZm9ybS9jb21wb25lbnRzL2Zvcm0tdGV4dC1hcmVhL2Zvcm0tdGV4dC1hcmVhLmNvbXBvbmVudC5zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsbURBQXlFO0FBQ3pFLDBDQUE4RTtBQUc5RSx5RUFBbUU7QUFFbkUsUUFBUSxDQUFDLCtCQUErQixFQUFFLEdBQUcsRUFBRTtJQUM3QyxJQUFJLFNBQWdDLENBQUM7SUFDckMsSUFBSSxPQUFnRCxDQUFDO0lBQ3JELE1BQU0sV0FBVyxHQUFnQixJQUFJLG1CQUFXLEVBQUUsQ0FBQztJQUNuRCxNQUFNLE1BQU0sR0FBZ0I7UUFDMUIsSUFBSSxFQUFFLFVBQVU7UUFDaEIsS0FBSyxFQUFFLE1BQU07UUFDYixJQUFJLEVBQUUsTUFBTTtRQUNaLFdBQVcsRUFBRSxNQUFNO0tBQ3BCLENBQUM7SUFFRixVQUFVLENBQUMsZUFBSyxDQUFDLEdBQUcsRUFBRTtRQUNwQixpQkFBTyxDQUFDLHNCQUFzQixDQUFDO1lBQzdCLE9BQU8sRUFBRTtnQkFDUCwyQkFBbUI7YUFDcEI7WUFDRCxTQUFTLEVBQUU7Z0JBQ1QsRUFBRSxPQUFPLEVBQUUsbUJBQVcsRUFBRSxRQUFRLEVBQUUsV0FBVyxFQUFFO2FBQ2hEO1lBQ0QsWUFBWSxFQUFFLENBQUMsZ0RBQXFCLENBQUM7U0FDdEMsQ0FBQzthQUNDLGlCQUFpQixFQUFFLENBQUM7SUFDekIsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUVKLFVBQVUsQ0FBQyxHQUFHLEVBQUU7UUFDZCxPQUFPLEdBQUcsaUJBQU8sQ0FBQyxlQUFlLENBQUMsZ0RBQXFCLENBQUMsQ0FBQztRQUN6RCxTQUFTLEdBQUcsT0FBTyxDQUFDLGlCQUFpQixDQUFDO1FBQ3RDLFNBQVMsQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO1FBQzFCLFNBQVMsQ0FBQyxLQUFLLEdBQUcsV0FBVyxDQUFDLEtBQUssQ0FBQztZQUNsQyxJQUFJLEVBQUUsV0FBVyxDQUFDLE9BQU8sQ0FBQyxFQUFFLEVBQUUsQ0FBQyxrQkFBVSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1NBQ3JELENBQUMsQ0FBQztRQUNILE9BQU8sQ0FBQyxhQUFhLEVBQUUsQ0FBQztJQUMxQixDQUFDLENBQUMsQ0FBQztJQUVILEVBQUUsQ0FBQyxlQUFlLEVBQUUsR0FBRyxFQUFFO1FBQ3ZCLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQyxVQUFVLEVBQUUsQ0FBQztJQUNqQyxDQUFDLENBQUMsQ0FBQztJQUVILEVBQUUsQ0FBQywwQkFBMEIsRUFBRSxHQUFHLEVBQUU7UUFDbEMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsU0FBUyxFQUFFLENBQUM7SUFDNUMsQ0FBQyxDQUFDLENBQUM7SUFFSCxFQUFFLENBQUMsa0RBQWtELEVBQUUsR0FBRyxFQUFFO1FBQzFELE1BQU0sU0FBUyxHQUFHLFNBQVMsQ0FBQyxLQUFLLENBQUM7UUFDbEMsTUFBTSxnQkFBZ0IsR0FBRyxTQUFTLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3BELE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLENBQUMsQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUMzQyxnQkFBZ0IsQ0FBQyxRQUFRLENBQUMsbUJBQW1CLENBQUMsQ0FBQztRQUMvQyxNQUFNLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxDQUFDLENBQUMsVUFBVSxFQUFFLENBQUM7UUFDNUMsTUFBTSxDQUFDLGdCQUFnQixDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO0lBQzNELENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyxDQUFDLENBQUMifQ==