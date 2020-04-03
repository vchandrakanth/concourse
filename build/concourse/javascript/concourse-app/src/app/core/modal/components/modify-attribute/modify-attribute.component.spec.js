"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@angular/core/testing");
const angular_fontawesome_1 = require("@fortawesome/angular-fontawesome");
const store_1 = require("@ngrx/store");
const dynamic_form_1 = require("@concourse/shared/dynamic-form");
const shared_module_1 = require("@concourse/shared/shared.module");
const facades_1 = require("@concourse/store/facades");
const test_1 = require("@concourse/test");
const modify_attribute_component_1 = require("./modify-attribute.component");
describe('ModifyAttributeComponent', () => {
    let component;
    let fixture;
    beforeEach(testing_1.async(() => {
        testing_1.TestBed.configureTestingModule({
            imports: [
                shared_module_1.SharedModule,
                angular_fontawesome_1.FontAwesomeModule,
                store_1.StoreModule.forRoot({}),
                dynamic_form_1.DynamicFormModule
            ],
            providers: [
                test_1.mockFacade(facades_1.AttributeTagFacade),
                test_1.mockFacade(facades_1.PolicyGroupFacade),
                test_1.mockFacade(facades_1.ApplicationErrorFacade)
            ],
            declarations: [modify_attribute_component_1.ModifyAttributeComponent]
        })
            .compileComponents();
    }));
    beforeEach(() => {
        fixture = testing_1.TestBed.createComponent(modify_attribute_component_1.ModifyAttributeComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kaWZ5LWF0dHJpYnV0ZS5jb21wb25lbnQuc3BlYy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL2NvbmNvdXJzZS9qYXZhc2NyaXB0L2NvbmNvdXJzZS1hcHAvc3JjL2FwcC9jb3JlL21vZGFsL2NvbXBvbmVudHMvbW9kaWZ5LWF0dHJpYnV0ZS9tb2RpZnktYXR0cmlidXRlLmNvbXBvbmVudC5zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsbURBQXlFO0FBQ3pFLDBFQUFxRTtBQUNyRSx1Q0FBMEM7QUFFMUMsaUVBQW1FO0FBQ25FLG1FQUErRDtBQUMvRCxzREFBeUc7QUFDekcsMENBQTZDO0FBQzdDLDZFQUF3RTtBQUV4RSxRQUFRLENBQUMsMEJBQTBCLEVBQUUsR0FBRyxFQUFFO0lBQ3hDLElBQUksU0FBbUMsQ0FBQztJQUN4QyxJQUFJLE9BQW1ELENBQUM7SUFFeEQsVUFBVSxDQUFDLGVBQUssQ0FBQyxHQUFHLEVBQUU7UUFDcEIsaUJBQU8sQ0FBQyxzQkFBc0IsQ0FBQztZQUM3QixPQUFPLEVBQUU7Z0JBQ1AsNEJBQVk7Z0JBQ1osdUNBQWlCO2dCQUNqQixtQkFBVyxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUM7Z0JBQ3ZCLGdDQUFpQjthQUNsQjtZQUNELFNBQVMsRUFBRTtnQkFDVCxpQkFBVSxDQUFDLDRCQUFrQixDQUFDO2dCQUM5QixpQkFBVSxDQUFDLDJCQUFpQixDQUFDO2dCQUM3QixpQkFBVSxDQUFDLGdDQUFzQixDQUFDO2FBQ25DO1lBQ0QsWUFBWSxFQUFFLENBQUMscURBQXdCLENBQUM7U0FDekMsQ0FBQzthQUNDLGlCQUFpQixFQUFFLENBQUM7SUFDekIsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUVKLFVBQVUsQ0FBQyxHQUFHLEVBQUU7UUFDZCxPQUFPLEdBQUcsaUJBQU8sQ0FBQyxlQUFlLENBQUMscURBQXdCLENBQUMsQ0FBQztRQUM1RCxTQUFTLEdBQUcsT0FBTyxDQUFDLGlCQUFpQixDQUFDO1FBQ3RDLE9BQU8sQ0FBQyxhQUFhLEVBQUUsQ0FBQztJQUMxQixDQUFDLENBQUMsQ0FBQztJQUVILEVBQUUsQ0FBQyxlQUFlLEVBQUUsR0FBRyxFQUFFO1FBQ3ZCLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQyxVQUFVLEVBQUUsQ0FBQztJQUNqQyxDQUFDLENBQUMsQ0FBQztBQUNMLENBQUMsQ0FBQyxDQUFDIn0=