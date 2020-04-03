"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const testing_1 = require("@angular/core/testing");
const platform_browser_1 = require("@angular/platform-browser");
const angular_fontawesome_1 = require("@fortawesome/angular-fontawesome");
const dynamic_form_1 = require("@concourse/shared/dynamic-form");
const shared_module_1 = require("@concourse/shared/shared.module");
const facades_1 = require("@concourse/store/facades");
const test_1 = require("@concourse/test");
const store_1 = require("@ngrx/store");
const create_attribute_tag_component_1 = require("./create-attribute-tag.component");
describe('CreateAttributeTagComponent', () => {
    let component;
    let fixture;
    let attributeTagFacade;
    let mockAttributeTag;
    mockAttributeTag = {
        name: 'Attribute tag test',
        description: 'Attribute tag test.'
    };
    beforeEach(testing_1.async(() => {
        testing_1.TestBed.configureTestingModule({
            schemas: [core_1.NO_ERRORS_SCHEMA],
            imports: [
                angular_fontawesome_1.FontAwesomeModule,
                shared_module_1.SharedModule,
                dynamic_form_1.DynamicFormModule,
                store_1.StoreModule.forRoot({})
            ],
            providers: [
                test_1.mockFacade(facades_1.ApplicationErrorFacade),
                test_1.mockFacade(facades_1.AttributeTagFacade)
            ],
            declarations: [create_attribute_tag_component_1.CreateAttributeTagComponent]
        })
            .compileComponents();
        attributeTagFacade = testing_1.TestBed.get(facades_1.AttributeTagFacade);
    }));
    beforeEach(() => {
        fixture = testing_1.TestBed.createComponent(create_attribute_tag_component_1.CreateAttributeTagComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
    it('should be invalid when no values exist in form', () => {
        expect(component.form.valid).toBeFalsy();
    });
    it('should create attributeTag with name and description', testing_1.async(() => {
        fixture.whenStable().then(() => {
            const name = fixture.debugElement.query(platform_browser_1.By.css('#name'));
            const description = fixture.debugElement.query(platform_browser_1.By.css('#description'));
            const nameEl = name.nativeElement;
            const descriptionEl = description.nativeElement;
            nameEl.value = mockAttributeTag.name;
            descriptionEl.value = mockAttributeTag.description;
            nameEl.dispatchEvent(new Event('input'));
            descriptionEl.dispatchEvent(new Event('input'));
            expect(nameEl.value).toBe(mockAttributeTag.name);
            expect(component.form.valid).toBeTruthy();
        });
    }));
    it('should create attributeTag', () => {
        component.submit(mockAttributeTag);
        expect(attributeTagFacade.create).toHaveBeenCalledWith(mockAttributeTag);
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRlLWF0dHJpYnV0ZS10YWcuY29tcG9uZW50LnNwZWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9jb25jb3Vyc2UvamF2YXNjcmlwdC9jb25jb3Vyc2UtYXBwL3NyYy9hcHAvY29yZS9tb2RhbC9jb21wb25lbnRzL2NyZWF0ZS1hdHRyaWJ1dGUtdGFnL2NyZWF0ZS1hdHRyaWJ1dGUtdGFnLmNvbXBvbmVudC5zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQ0Esd0NBQWlEO0FBQ2pELG1EQUF5RTtBQUN6RSxnRUFBK0M7QUFDL0MsMEVBQXFFO0FBR3JFLGlFQUFtRTtBQUNuRSxtRUFBK0Q7QUFDL0Qsc0RBQXNGO0FBQ3RGLDBDQUE2QztBQUM3Qyx1Q0FBMEM7QUFDMUMscUZBQStFO0FBRS9FLFFBQVEsQ0FBQyw2QkFBNkIsRUFBRSxHQUFHLEVBQUU7SUFDM0MsSUFBSSxTQUFzQyxDQUFDO0lBQzNDLElBQUksT0FBc0QsQ0FBQztJQUMzRCxJQUFJLGtCQUFzQyxDQUFDO0lBQzNDLElBQUksZ0JBQXVDLENBQUM7SUFFNUMsZ0JBQWdCLEdBQUc7UUFDakIsSUFBSSxFQUFFLG9CQUFvQjtRQUMxQixXQUFXLEVBQUUscUJBQXFCO0tBQ25DLENBQUM7SUFFRixVQUFVLENBQUMsZUFBSyxDQUFDLEdBQUcsRUFBRTtRQUNwQixpQkFBTyxDQUFDLHNCQUFzQixDQUFDO1lBQzdCLE9BQU8sRUFBRSxDQUFDLHVCQUFnQixDQUFDO1lBQzNCLE9BQU8sRUFBRTtnQkFDUCx1Q0FBaUI7Z0JBQ2pCLDRCQUFZO2dCQUNaLGdDQUFpQjtnQkFDakIsbUJBQVcsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDO2FBQ3hCO1lBQ0QsU0FBUyxFQUFFO2dCQUNULGlCQUFVLENBQUMsZ0NBQXNCLENBQUM7Z0JBQ2xDLGlCQUFVLENBQUMsNEJBQWtCLENBQUM7YUFDL0I7WUFDRCxZQUFZLEVBQUUsQ0FBQyw0REFBMkIsQ0FBQztTQUM1QyxDQUFDO2FBQ0MsaUJBQWlCLEVBQUUsQ0FBQztRQUN2QixrQkFBa0IsR0FBRyxpQkFBTyxDQUFDLEdBQUcsQ0FBQyw0QkFBa0IsQ0FBQyxDQUFDO0lBQ3ZELENBQUMsQ0FBQyxDQUFDLENBQUM7SUFFSixVQUFVLENBQUMsR0FBRyxFQUFFO1FBQ2QsT0FBTyxHQUFHLGlCQUFPLENBQUMsZUFBZSxDQUFDLDREQUEyQixDQUFDLENBQUM7UUFDL0QsU0FBUyxHQUFHLE9BQU8sQ0FBQyxpQkFBaUIsQ0FBQztRQUN0QyxPQUFPLENBQUMsYUFBYSxFQUFFLENBQUM7SUFDMUIsQ0FBQyxDQUFDLENBQUM7SUFFSCxFQUFFLENBQUMsZUFBZSxFQUFFLEdBQUcsRUFBRTtRQUN2QixNQUFNLENBQUMsU0FBUyxDQUFDLENBQUMsVUFBVSxFQUFFLENBQUM7SUFDakMsQ0FBQyxDQUFDLENBQUM7SUFFSCxFQUFFLENBQUMsZ0RBQWdELEVBQUUsR0FBRyxFQUFFO1FBQ3hELE1BQU0sQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLFNBQVMsRUFBRSxDQUFDO0lBQzNDLENBQUMsQ0FBQyxDQUFDO0lBRUgsRUFBRSxDQUFDLHNEQUFzRCxFQUFFLGVBQUssQ0FBQyxHQUFHLEVBQUU7UUFDcEUsT0FBTyxDQUFDLFVBQVUsRUFBRSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUU7WUFDN0IsTUFBTSxJQUFJLEdBQUcsT0FBTyxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMscUJBQUUsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztZQUN6RCxNQUFNLFdBQVcsR0FBRyxPQUFPLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxxQkFBRSxDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDO1lBQ3ZFLE1BQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUM7WUFDbEMsTUFBTSxhQUFhLEdBQUcsV0FBVyxDQUFDLGFBQWEsQ0FBQztZQUVoRCxNQUFNLENBQUMsS0FBSyxHQUFHLGdCQUFnQixDQUFDLElBQUksQ0FBQztZQUNyQyxhQUFhLENBQUMsS0FBSyxHQUFHLGdCQUFnQixDQUFDLFdBQVcsQ0FBQztZQUVuRCxNQUFNLENBQUMsYUFBYSxDQUFDLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7WUFDekMsYUFBYSxDQUFDLGFBQWEsQ0FBQyxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1lBRWhELE1BQU0sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ2pELE1BQU0sQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLFVBQVUsRUFBRSxDQUFDO1FBQzVDLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUVKLEVBQUUsQ0FBQyw0QkFBNEIsRUFBRSxHQUFHLEVBQUU7UUFDcEMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1FBQ25DLE1BQU0sQ0FBQyxrQkFBa0IsQ0FBQyxNQUFNLENBQUMsQ0FBQyxvQkFBb0IsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO0lBQzNFLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyxDQUFDLENBQUMifQ==