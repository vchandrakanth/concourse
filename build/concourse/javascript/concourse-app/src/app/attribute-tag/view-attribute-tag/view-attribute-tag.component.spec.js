"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const testing_1 = require("@angular/core/testing");
const platform_browser_1 = require("@angular/platform-browser");
const testing_2 = require("@angular/router/testing");
const angular_fontawesome_1 = require("@fortawesome/angular-fontawesome");
const rxjs_1 = require("rxjs");
const shared_module_1 = require("@concourse/shared/shared.module");
const attribute_tag_faker_1 = require("@concourse/store/attribute-tag/services/attribute-tag.faker");
const facades_1 = require("@concourse/store/facades");
const test_1 = require("@concourse/test");
const view_attribute_tag_component_1 = require("./view-attribute-tag.component");
describe('ViewAttributeTagComponent', () => {
    const mockAttributeTag = attribute_tag_faker_1.fakeOne();
    let component;
    let fixture;
    beforeEach(testing_1.async(() => {
        testing_1.TestBed.configureTestingModule({
            schemas: [core_1.NO_ERRORS_SCHEMA],
            imports: [
                testing_2.RouterTestingModule,
                angular_fontawesome_1.FontAwesomeModule,
                shared_module_1.SharedModule
            ],
            providers: [
                test_1.mockFacade(facades_1.AuditHistoryFacade),
                test_1.mockFacade(facades_1.ModalStoreFacade),
                test_1.mockFacade(facades_1.AttributeTagFacade, {
                    selectedWithRelated$: new rxjs_1.BehaviorSubject(Object.assign(Object.assign({}, mockAttributeTag), { policyGroups: [], enclaveModels: [] }))
                }),
                ...test_1.directiveProviders
            ],
            declarations: [view_attribute_tag_component_1.ViewAttributeTagComponent]
        })
            .compileComponents();
    }));
    beforeEach(() => {
        fixture = testing_1.TestBed.createComponent(view_attribute_tag_component_1.ViewAttributeTagComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
    it('should display attribute tag details', () => {
        const attName = fixture.debugElement.query(platform_browser_1.By.css('[data-e2e="attributeTagDetails"] h2')).nativeElement;
        expect(attName.textContent).toEqual(`Overview for ${mockAttributeTag.name}`);
    });
    it('should find policyGroups and enclaveModels in attributeTags', () => {
        const listCards = fixture.debugElement.queryAll(platform_browser_1.By.css('app-list-card'));
        const [policyGroupCard] = listCards;
        const enclaveModelCard = listCards[1];
        expect(policyGroupCard.attributes.cardTitle).toBe('Policy Groups');
        expect(enclaveModelCard.attributes.cardTitle).toBe('Enclave Models');
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlldy1hdHRyaWJ1dGUtdGFnLmNvbXBvbmVudC5zcGVjLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vY29uY291cnNlL2phdmFzY3JpcHQvY29uY291cnNlLWFwcC9zcmMvYXBwL2F0dHJpYnV0ZS10YWcvdmlldy1hdHRyaWJ1dGUtdGFnL3ZpZXctYXR0cmlidXRlLXRhZy5jb21wb25lbnQuc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHdDQUFpRDtBQUNqRCxtREFBeUU7QUFDekUsZ0VBQStDO0FBQy9DLHFEQUE4RDtBQUM5RCwwRUFBcUU7QUFDckUsK0JBQXVDO0FBRXZDLG1FQUErRDtBQUMvRCxxR0FBc0Y7QUFDdEYsc0RBQW9HO0FBQ3BHLDBDQUFpRTtBQUNqRSxpRkFBMkU7QUFFM0UsUUFBUSxDQUFDLDJCQUEyQixFQUFFLEdBQUcsRUFBRTtJQUN6QyxNQUFNLGdCQUFnQixHQUFHLDZCQUFPLEVBQUUsQ0FBQztJQUNuQyxJQUFJLFNBQW9DLENBQUM7SUFDekMsSUFBSSxPQUFvRCxDQUFDO0lBRXpELFVBQVUsQ0FBQyxlQUFLLENBQUMsR0FBRyxFQUFFO1FBQ3BCLGlCQUFPLENBQUMsc0JBQXNCLENBQUM7WUFDN0IsT0FBTyxFQUFFLENBQUMsdUJBQWdCLENBQUM7WUFDM0IsT0FBTyxFQUFFO2dCQUNQLDZCQUFtQjtnQkFDbkIsdUNBQWlCO2dCQUNqQiw0QkFBWTthQUNiO1lBQ0QsU0FBUyxFQUFFO2dCQUNULGlCQUFVLENBQUMsNEJBQWtCLENBQUM7Z0JBQzlCLGlCQUFVLENBQUMsMEJBQWdCLENBQUM7Z0JBQzVCLGlCQUFVLENBQUMsNEJBQWtCLEVBQUU7b0JBQzdCLG9CQUFvQixFQUFFLElBQUksc0JBQWUsaUNBQ3BDLGdCQUFnQixLQUNuQixZQUFZLEVBQUUsRUFBRSxFQUNoQixhQUFhLEVBQUUsRUFBRSxJQUNqQjtpQkFDSCxDQUFDO2dCQUNGLEdBQUcseUJBQWtCO2FBQ3RCO1lBQ0QsWUFBWSxFQUFFLENBQUMsd0RBQXlCLENBQUM7U0FDMUMsQ0FBQzthQUNDLGlCQUFpQixFQUFFLENBQUM7SUFDekIsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUVKLFVBQVUsQ0FBQyxHQUFHLEVBQUU7UUFDZCxPQUFPLEdBQUcsaUJBQU8sQ0FBQyxlQUFlLENBQUMsd0RBQXlCLENBQUMsQ0FBQztRQUM3RCxTQUFTLEdBQUcsT0FBTyxDQUFDLGlCQUFpQixDQUFDO1FBQ3RDLE9BQU8sQ0FBQyxhQUFhLEVBQUUsQ0FBQztJQUMxQixDQUFDLENBQUMsQ0FBQztJQUVILEVBQUUsQ0FBQyxlQUFlLEVBQUUsR0FBRyxFQUFFO1FBQ3ZCLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQyxVQUFVLEVBQUUsQ0FBQztJQUNqQyxDQUFDLENBQUMsQ0FBQztJQUVILEVBQUUsQ0FBQyxzQ0FBc0MsRUFBRSxHQUFHLEVBQUU7UUFDOUMsTUFBTSxPQUFPLEdBQUcsT0FBTyxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMscUJBQUUsQ0FBQyxHQUFHLENBQUMscUNBQXFDLENBQUMsQ0FBQyxDQUFDLGFBQTRCLENBQUM7UUFDdkgsTUFBTSxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLGdCQUFnQixDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7SUFDL0UsQ0FBQyxDQUFDLENBQUM7SUFFSCxFQUFFLENBQUMsNkRBQTZELEVBQUUsR0FBRyxFQUFFO1FBQ3JFLE1BQU0sU0FBUyxHQUFHLE9BQU8sQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLHFCQUFFLENBQUMsR0FBRyxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUM7UUFDekUsTUFBTSxDQUFDLGVBQWUsQ0FBQyxHQUFHLFNBQVMsQ0FBQztRQUNwQyxNQUFNLGdCQUFnQixHQUFHLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUV0QyxNQUFNLENBQUMsZUFBZSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUM7UUFDbkUsTUFBTSxDQUFDLGdCQUFnQixDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztJQUN2RSxDQUFDLENBQUMsQ0FBQztBQUVMLENBQUMsQ0FBQyxDQUFDIn0=