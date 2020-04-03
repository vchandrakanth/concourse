"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@angular/core/testing");
const forms_1 = require("@angular/forms");
const platform_browser_1 = require("@angular/platform-browser");
const form_file_upload_component_1 = require("./form-file-upload.component");
// TODO: Need to updated Test.
xdescribe('DynamicForm:FileUploadComponent', () => {
    let component;
    let fixture;
    const formBuilder = new forms_1.FormBuilder();
    const config = {
        type: 'fileupload',
        label: 'Logo',
        name: 'logo'
    };
    let file;
    beforeEach(testing_1.async(() => {
        testing_1.TestBed.configureTestingModule({
            imports: [
                forms_1.ReactiveFormsModule
            ],
            providers: [
                { provide: forms_1.FormBuilder, useValue: formBuilder }
            ],
            declarations: [form_file_upload_component_1.FormFileUploadComponent]
        })
            .compileComponents();
    }));
    beforeEach(() => {
        fixture = testing_1.TestBed.createComponent(form_file_upload_component_1.FormFileUploadComponent);
        component = fixture.componentInstance;
        component.config = config;
        component.group = formBuilder.group({
            test: formBuilder.control('', [forms_1.Validators.required])
        });
        fixture.detectChanges();
        file = fixture.debugElement.query(platform_browser_1.By.css('#logo')).nativeElement;
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
    it('group invalid when empty', () => {
        expect(component.group.valid).toBeFalsy();
    });
    it('should find file upload or not', () => {
        expect(file).toBeDefined();
        const formGroup = component.group;
        const logo = formGroup.controls['test'];
        logo.setValue('test');
        fixture.detectChanges();
        expect(logo['value']).toBe('test');
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS1maWxlLXVwbG9hZC5jb21wb25lbnQuc3BlYy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL2NvbmNvdXJzZS9qYXZhc2NyaXB0L2NvbmNvdXJzZS1hcHAvc3JjL2FwcC9zaGFyZWQvZHluYW1pYy1mb3JtL2NvbXBvbmVudHMvZm9ybS1maWxlLXVwbG9hZC9mb3JtLWZpbGUtdXBsb2FkLmNvbXBvbmVudC5zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsbURBQXlFO0FBQ3pFLDBDQUE4RTtBQUM5RSxnRUFBK0M7QUFHL0MsNkVBQXVFO0FBRXZFLDhCQUE4QjtBQUM5QixTQUFTLENBQUMsaUNBQWlDLEVBQUUsR0FBRyxFQUFFO0lBQ2hELElBQUksU0FBa0MsQ0FBQztJQUN2QyxJQUFJLE9BQWtELENBQUM7SUFDdkQsTUFBTSxXQUFXLEdBQWdCLElBQUksbUJBQVcsRUFBRSxDQUFDO0lBQ25ELE1BQU0sTUFBTSxHQUFnQjtRQUMxQixJQUFJLEVBQUUsWUFBWTtRQUNsQixLQUFLLEVBQUUsTUFBTTtRQUNiLElBQUksRUFBRSxNQUFNO0tBQ2IsQ0FBQztJQUNGLElBQUksSUFBYSxDQUFDO0lBRWxCLFVBQVUsQ0FBQyxlQUFLLENBQUMsR0FBRyxFQUFFO1FBQ3BCLGlCQUFPLENBQUMsc0JBQXNCLENBQUM7WUFDN0IsT0FBTyxFQUFFO2dCQUNQLDJCQUFtQjthQUNwQjtZQUNELFNBQVMsRUFBRTtnQkFDVCxFQUFFLE9BQU8sRUFBRSxtQkFBVyxFQUFFLFFBQVEsRUFBRSxXQUFXLEVBQUU7YUFDaEQ7WUFDRCxZQUFZLEVBQUUsQ0FBQyxvREFBdUIsQ0FBQztTQUN4QyxDQUFDO2FBQ0MsaUJBQWlCLEVBQUUsQ0FBQztJQUN6QixDQUFDLENBQUMsQ0FBQyxDQUFDO0lBRUosVUFBVSxDQUFDLEdBQUcsRUFBRTtRQUNkLE9BQU8sR0FBRyxpQkFBTyxDQUFDLGVBQWUsQ0FBQyxvREFBdUIsQ0FBQyxDQUFDO1FBQzNELFNBQVMsR0FBRyxPQUFPLENBQUMsaUJBQWlCLENBQUM7UUFDdEMsU0FBUyxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7UUFDMUIsU0FBUyxDQUFDLEtBQUssR0FBRyxXQUFXLENBQUMsS0FBSyxDQUFDO1lBQ2xDLElBQUksRUFBRSxXQUFXLENBQUMsT0FBTyxDQUFDLEVBQUUsRUFBRSxDQUFDLGtCQUFVLENBQUMsUUFBUSxDQUFDLENBQUM7U0FDckQsQ0FBQyxDQUFDO1FBQ0gsT0FBTyxDQUFDLGFBQWEsRUFBRSxDQUFDO1FBQ3hCLElBQUksR0FBRyxPQUFPLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxxQkFBRSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLGFBQWEsQ0FBQztJQUVuRSxDQUFDLENBQUMsQ0FBQztJQUVILEVBQUUsQ0FBQyxlQUFlLEVBQUUsR0FBRyxFQUFFO1FBQ3ZCLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQyxVQUFVLEVBQUUsQ0FBQztJQUNqQyxDQUFDLENBQUMsQ0FBQztJQUVILEVBQUUsQ0FBQywwQkFBMEIsRUFBRSxHQUFHLEVBQUU7UUFDbEMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsU0FBUyxFQUFFLENBQUM7SUFDNUMsQ0FBQyxDQUFDLENBQUM7SUFFSCxFQUFFLENBQUMsZ0NBQWdDLEVBQUUsR0FBRyxFQUFFO1FBQ3hDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUMzQixNQUFNLFNBQVMsR0FBRyxTQUFTLENBQUMsS0FBSyxDQUFDO1FBQ2xDLE1BQU0sSUFBSSxHQUFHLFNBQVMsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDeEMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUN0QixPQUFPLENBQUMsYUFBYSxFQUFFLENBQUM7UUFDeEIsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNyQyxDQUFDLENBQUMsQ0FBQztBQUNMLENBQUMsQ0FBQyxDQUFDIn0=