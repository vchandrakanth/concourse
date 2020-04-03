"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@angular/core/testing");
const dynamic_form_1 = require("@concourse/shared/dynamic-form");
const angular_fontawesome_1 = require("@fortawesome/angular-fontawesome");
const shared_module_1 = require("@concourse/shared/shared.module");
const ngx_toastr_1 = require("ngx-toastr");
const style_guide_component_1 = require("./style-guide.component");
xdescribe('StyleGuideComponent', () => {
    let component;
    let fixture;
    beforeEach(testing_1.async(() => {
        testing_1.TestBed.configureTestingModule({
            imports: [
                dynamic_form_1.DynamicFormModule,
                angular_fontawesome_1.FontAwesomeModule,
                shared_module_1.SharedModule
            ],
            declarations: [style_guide_component_1.StyleGuideComponent],
            providers: [ngx_toastr_1.ToastrService]
        })
            .compileComponents();
    }));
    beforeEach(() => {
        fixture = testing_1.TestBed.createComponent(style_guide_component_1.StyleGuideComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3R5bGUtZ3VpZGUuY29tcG9uZW50LnNwZWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9jb25jb3Vyc2UvamF2YXNjcmlwdC9jb25jb3Vyc2UtYXBwL3NyYy9hcHAvc3R5bGUtZ3VpZGUvc3R5bGUtZ3VpZGUvc3R5bGUtZ3VpZGUuY29tcG9uZW50LnNwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxtREFBeUU7QUFDekUsaUVBQW1FO0FBQ25FLDBFQUFxRTtBQUVyRSxtRUFBK0Q7QUFDL0QsMkNBQTJDO0FBQzNDLG1FQUE4RDtBQUU5RCxTQUFTLENBQUMscUJBQXFCLEVBQUUsR0FBRyxFQUFFO0lBQ3BDLElBQUksU0FBOEIsQ0FBQztJQUNuQyxJQUFJLE9BQThDLENBQUM7SUFFbkQsVUFBVSxDQUFDLGVBQUssQ0FBQyxHQUFHLEVBQUU7UUFDcEIsaUJBQU8sQ0FBQyxzQkFBc0IsQ0FBQztZQUM3QixPQUFPLEVBQUU7Z0JBQ1AsZ0NBQWlCO2dCQUNqQix1Q0FBaUI7Z0JBQ2pCLDRCQUFZO2FBQ2I7WUFDRCxZQUFZLEVBQUUsQ0FBQywyQ0FBbUIsQ0FBQztZQUNuQyxTQUFTLEVBQUUsQ0FBQywwQkFBYSxDQUFDO1NBQzNCLENBQUM7YUFDQyxpQkFBaUIsRUFBRSxDQUFDO0lBQ3pCLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFFSixVQUFVLENBQUMsR0FBRyxFQUFFO1FBQ2QsT0FBTyxHQUFHLGlCQUFPLENBQUMsZUFBZSxDQUFDLDJDQUFtQixDQUFDLENBQUM7UUFDdkQsU0FBUyxHQUFHLE9BQU8sQ0FBQyxpQkFBaUIsQ0FBQztRQUN0QyxPQUFPLENBQUMsYUFBYSxFQUFFLENBQUM7SUFDMUIsQ0FBQyxDQUFDLENBQUM7SUFFSCxFQUFFLENBQUMsZUFBZSxFQUFFLEdBQUcsRUFBRTtRQUN2QixNQUFNLENBQUMsU0FBUyxDQUFDLENBQUMsVUFBVSxFQUFFLENBQUM7SUFDakMsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDLENBQUMsQ0FBQyJ9