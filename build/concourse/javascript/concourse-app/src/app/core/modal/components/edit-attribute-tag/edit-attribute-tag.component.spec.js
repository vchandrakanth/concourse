"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const testing_1 = require("@angular/core/testing");
const dynamic_form_1 = require("@concourse/shared/dynamic-form");
const shared_module_1 = require("@concourse/shared/shared.module");
const fakeAttributeTags = require("@concourse/store/attribute-tag/services/attribute-tag.faker");
const facades_1 = require("@concourse/store/facades");
const test_1 = require("@concourse/test");
const angular_fontawesome_1 = require("@fortawesome/angular-fontawesome");
const store_1 = require("@ngrx/store");
const rxjs_1 = require("rxjs");
const edit_attribute_tag_component_1 = require("./edit-attribute-tag.component");
describe('EditAttributeTagComponent', () => {
    const attributeTag = fakeAttributeTags.fakeOne();
    let component;
    let fixture;
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
                test_1.mockFacade(facades_1.AttributeTagFacade, {
                    selected$: new rxjs_1.BehaviorSubject(attributeTag),
                    isUpdating$: new rxjs_1.BehaviorSubject(false)
                })
            ],
            declarations: [edit_attribute_tag_component_1.EditAttributeTagComponent]
        })
            .compileComponents();
    }));
    beforeEach(() => {
        fixture = testing_1.TestBed.createComponent(edit_attribute_tag_component_1.EditAttributeTagComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWRpdC1hdHRyaWJ1dGUtdGFnLmNvbXBvbmVudC5zcGVjLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vY29uY291cnNlL2phdmFzY3JpcHQvY29uY291cnNlLWFwcC9zcmMvYXBwL2NvcmUvbW9kYWwvY29tcG9uZW50cy9lZGl0LWF0dHJpYnV0ZS10YWcvZWRpdC1hdHRyaWJ1dGUtdGFnLmNvbXBvbmVudC5zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsd0NBQWlEO0FBQ2pELG1EQUF5RTtBQUN6RSxpRUFBbUU7QUFDbkUsbUVBQStEO0FBQy9ELGlHQUFpRztBQUNqRyxzREFBc0Y7QUFDdEYsMENBQTZDO0FBQzdDLDBFQUFxRTtBQUNyRSx1Q0FBMEM7QUFDMUMsK0JBQXVDO0FBQ3ZDLGlGQUEyRTtBQUUzRSxRQUFRLENBQUMsMkJBQTJCLEVBQUUsR0FBRyxFQUFFO0lBQ3pDLE1BQU0sWUFBWSxHQUFHLGlCQUFpQixDQUFDLE9BQU8sRUFBRSxDQUFDO0lBQ2pELElBQUksU0FBb0MsQ0FBQztJQUN6QyxJQUFJLE9BQW9ELENBQUM7SUFFekQsVUFBVSxDQUFDLGVBQUssQ0FBQyxHQUFHLEVBQUU7UUFDcEIsaUJBQU8sQ0FBQyxzQkFBc0IsQ0FBQztZQUM3QixPQUFPLEVBQUUsQ0FBQyx1QkFBZ0IsQ0FBQztZQUMzQixPQUFPLEVBQUU7Z0JBQ1AsdUNBQWlCO2dCQUNqQiw0QkFBWTtnQkFDWixnQ0FBaUI7Z0JBQ2pCLG1CQUFXLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQzthQUN4QjtZQUNELFNBQVMsRUFBRTtnQkFDVCxpQkFBVSxDQUFDLGdDQUFzQixDQUFDO2dCQUNsQyxpQkFBVSxDQUFDLDRCQUFrQixFQUFFO29CQUM3QixTQUFTLEVBQUUsSUFBSSxzQkFBZSxDQUFDLFlBQVksQ0FBQztvQkFDNUMsV0FBVyxFQUFFLElBQUksc0JBQWUsQ0FBQyxLQUFLLENBQUM7aUJBQ3hDLENBQUM7YUFDSDtZQUNELFlBQVksRUFBRSxDQUFDLHdEQUF5QixDQUFDO1NBQzFDLENBQUM7YUFDQyxpQkFBaUIsRUFBRSxDQUFDO0lBQ3pCLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFFSixVQUFVLENBQUMsR0FBRyxFQUFFO1FBQ2QsT0FBTyxHQUFHLGlCQUFPLENBQUMsZUFBZSxDQUFDLHdEQUF5QixDQUFDLENBQUM7UUFDN0QsU0FBUyxHQUFHLE9BQU8sQ0FBQyxpQkFBaUIsQ0FBQztRQUN0QyxPQUFPLENBQUMsYUFBYSxFQUFFLENBQUM7SUFDMUIsQ0FBQyxDQUFDLENBQUM7SUFFSCxFQUFFLENBQUMsZUFBZSxFQUFFLEdBQUcsRUFBRTtRQUN2QixNQUFNLENBQUMsU0FBUyxDQUFDLENBQUMsVUFBVSxFQUFFLENBQUM7SUFDakMsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDLENBQUMsQ0FBQyJ9