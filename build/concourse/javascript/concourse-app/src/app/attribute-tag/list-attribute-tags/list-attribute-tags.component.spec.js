"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const testing_1 = require("@angular/core/testing");
const platform_browser_1 = require("@angular/platform-browser");
const testing_2 = require("@angular/router/testing");
const angular_fontawesome_1 = require("@fortawesome/angular-fontawesome");
const ngx_pipes_1 = require("ngx-pipes");
const rxjs_1 = require("rxjs");
const attribute_tag_faker_1 = require("@concourse/store/attribute-tag/services/attribute-tag.faker");
const facades_1 = require("@concourse/store/facades");
const shared_module_1 = require("@concourse/shared/shared.module");
const test_1 = require("@concourse/test");
const list_attribute_tags_component_1 = require("./list-attribute-tags.component");
describe('ListAttributeTagsComponent', () => {
    let component;
    let fixture;
    let injector;
    const mockAttributeTags = attribute_tag_faker_1.fakeMany(5);
    beforeEach(testing_1.async(() => {
        const configure = testBed => {
            testBed
                .configureTestingModule({
                schemas: [core_1.NO_ERRORS_SCHEMA],
                imports: [
                    testing_2.RouterTestingModule,
                    angular_fontawesome_1.FontAwesomeModule,
                    ngx_pipes_1.NgArrayPipesModule,
                    shared_module_1.SharedModule
                ],
                providers: [
                    test_1.mockFacade(facades_1.ModalStoreFacade),
                    test_1.mockFacade(facades_1.AttributeTagFacade, {
                        isLoaded$: new rxjs_1.BehaviorSubject(true),
                        isUpdating$: new rxjs_1.BehaviorSubject(true),
                        list$: new rxjs_1.BehaviorSubject(mockAttributeTags)
                    }),
                    ...test_1.directiveProviders
                ],
                declarations: [list_attribute_tags_component_1.ListAttributeTagsComponent]
            });
        };
        test_1.configureTests(configure).then(testBed => {
            fixture = testBed.createComponent(list_attribute_tags_component_1.ListAttributeTagsComponent);
            component = fixture.componentInstance;
            injector = testing_1.getTestBed();
            fixture.detectChanges();
        });
    }));
    it('should create', () => {
        expect(component).toBeTruthy();
    });
    it('should contain Attribute Tags data', () => {
        component.attributeTags$.subscribe(pgts => {
            expect(pgts).toBe(mockAttributeTags);
        });
    });
    it('should find app-page-actions', () => {
        const pageActions = fixture.debugElement.query(platform_browser_1.By.css('app-page-actions'));
        expect(pageActions).toBeDefined();
    });
    it('should find app-search-actions', () => {
        const searchActions = fixture.debugElement.query(platform_browser_1.By.css('app-search-actions'));
        expect(searchActions).toBeDefined();
    });
    it('should not find app-null-state component', () => {
        const nullStateComponent = fixture.debugElement.query(platform_browser_1.By.css('app-null-state'));
        expect(nullStateComponent).toBeNull();
    });
    it('should give length zero if there no records', () => {
        component.attributeTags$ = new rxjs_1.BehaviorSubject([]);
        fixture.detectChanges();
        component.attributeTags$.subscribe(instData => {
            expect(instData.length).toBe(0);
        });
    });
    it('should find app-null-state if there is no attribute tags', () => {
        const nullStateComponent = fixture.debugElement.query(platform_browser_1.By.css('app-null-state'));
        expect(nullStateComponent).toBeDefined();
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdC1hdHRyaWJ1dGUtdGFncy5jb21wb25lbnQuc3BlYy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL2NvbmNvdXJzZS9qYXZhc2NyaXB0L2NvbmNvdXJzZS1hcHAvc3JjL2FwcC9hdHRyaWJ1dGUtdGFnL2xpc3QtYXR0cmlidXRlLXRhZ3MvbGlzdC1hdHRyaWJ1dGUtdGFncy5jb21wb25lbnQuc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHdDQUFpRDtBQUNqRCxtREFBcUY7QUFDckYsZ0VBQStDO0FBQy9DLHFEQUE4RDtBQUM5RCwwRUFBcUU7QUFDckUseUNBQStDO0FBRS9DLCtCQUF1QztBQUV2QyxxR0FBdUY7QUFDdkYsc0RBQWdGO0FBRWhGLG1FQUErRDtBQUMvRCwwQ0FBOEY7QUFDOUYsbUZBQTZFO0FBRTdFLFFBQVEsQ0FBQyw0QkFBNEIsRUFBRSxHQUFHLEVBQUU7SUFDMUMsSUFBSSxTQUFxQyxDQUFDO0lBQzFDLElBQUksT0FBcUQsQ0FBQztJQUMxRCxJQUFJLFFBQWlCLENBQUM7SUFDdEIsTUFBTSxpQkFBaUIsR0FBRyw4QkFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBRXRDLFVBQVUsQ0FDUixlQUFLLENBQUMsR0FBRyxFQUFFO1FBQ1QsTUFBTSxTQUFTLEdBQWdCLE9BQU8sQ0FBQyxFQUFFO1lBQ3ZDLE9BQU87aUJBQ0osc0JBQXNCLENBQUM7Z0JBQ3RCLE9BQU8sRUFBRSxDQUFDLHVCQUFnQixDQUFDO2dCQUMzQixPQUFPLEVBQUU7b0JBQ1AsNkJBQW1CO29CQUNuQix1Q0FBaUI7b0JBQ2pCLDhCQUFrQjtvQkFDbEIsNEJBQVk7aUJBQ2I7Z0JBQ0QsU0FBUyxFQUFFO29CQUNULGlCQUFVLENBQUMsMEJBQWdCLENBQUM7b0JBQzVCLGlCQUFVLENBQUMsNEJBQWtCLEVBQUU7d0JBQzdCLFNBQVMsRUFBRSxJQUFJLHNCQUFlLENBQUMsSUFBSSxDQUFDO3dCQUNwQyxX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