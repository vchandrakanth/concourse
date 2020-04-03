"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const testing_1 = require("@angular/core/testing");
const platform_browser_1 = require("@angular/platform-browser");
const testing_2 = require("@angular/router/testing");
const angular_fontawesome_1 = require("@fortawesome/angular-fontawesome");
const store_1 = require("@ngrx/store");
const ngx_pipes_1 = require("ngx-pipes");
const rxjs_1 = require("rxjs");
const modal_1 = require("@concourse/core/modal");
const shared_module_1 = require("@concourse/shared/shared.module");
const group_faker_1 = require("@concourse/store/group/services/group.faker");
const group_facade_1 = require("@concourse/store/group/state/group.facade");
const test_1 = require("@concourse/test");
const list_groups_component_1 = require("./list-groups.component");
describe('ListGroupsComponent', () => {
    let component;
    let fixture;
    let injector;
    const mockGroups = group_faker_1.fakeMany();
    beforeEach(testing_1.async(() => {
        const configure = testBed => {
            testBed
                .configureTestingModule({
                schemas: [core_1.NO_ERRORS_SCHEMA],
                imports: [
                    testing_2.RouterTestingModule,
                    angular_fontawesome_1.FontAwesomeModule,
                    ngx_pipes_1.NgArrayPipesModule,
                    ngx_pipes_1.NgStringPipesModule,
                    store_1.StoreModule.forRoot({}),
                    shared_module_1.SharedModule
                ],
                providers: [
                    test_1.mockFacade(modal_1.ModalStoreFacade),
                    test_1.mockFacade(group_facade_1.GroupFacade, {
                        isLoaded$: new rxjs_1.BehaviorSubject(true),
                        isUpdating$: new rxjs_1.BehaviorSubject(true),
                        list$: new rxjs_1.BehaviorSubject(mockGroups)
                    }),
                    ...test_1.directiveProviders
                ],
                declarations: [list_groups_component_1.ListGroupsComponent]
            });
        };
        test_1.configureTests(configure).then(testBed => {
            fixture = testBed.createComponent(list_groups_component_1.ListGroupsComponent);
            component = fixture.componentInstance;
            injector = testing_1.getTestBed();
            fixture.detectChanges();
        });
    }));
    it('should create', () => {
        expect(component).toBeTruthy();
    });
    it('should contain Groups data', () => {
        component.groups$.subscribe(groups => {
            expect(groups).toBe(mockGroups);
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
        component.groups$ = new rxjs_1.BehaviorSubject([]);
        fixture.detectChanges();
        component.groups$.subscribe(groupData => {
            expect(groupData.length).toBe(0);
        });
    });
    it('should find app-null-state if there is no groups', () => {
        const nullStateComponent = fixture.debugElement.query(platform_browser_1.By.css('app-null-state'));
        expect(nullStateComponent).toBeDefined();
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdC1ncm91cHMuY29tcG9uZW50LnNwZWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9jb25jb3Vyc2UvamF2YXNjcmlwdC9jb25jb3Vyc2UtYXBwL3NyYy9hcHAvdXNlci1tYW5hZ2VtZW50L2dyb3Vwcy9saXN0LWdyb3Vwcy9saXN0LWdyb3Vwcy5jb21wb25lbnQuc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHdDQUFpRDtBQUNqRCxtREFBcUY7QUFDckYsZ0VBQStDO0FBQy9DLHFEQUE4RDtBQUM5RCwwRUFBcUU7QUFDckUsdUNBQTBDO0FBQzFDLHlDQUFvRTtBQUNwRSwrQkFBdUM7QUFFdkMsaURBQXlEO0FBQ3pELG1FQUErRDtBQUMvRCw2RUFBdUU7QUFDdkUsNEVBQXdFO0FBQ3hFLDBDQUE4RjtBQUM5RixtRUFBOEQ7QUFFOUQsUUFBUSxDQUFDLHFCQUFxQixFQUFFLEdBQUcsRUFBRTtJQUNuQyxJQUFJLFNBQThCLENBQUM7SUFDbkMsSUFBSSxPQUE4QyxDQUFDO0lBQ25ELElBQUksUUFBaUIsQ0FBQztJQUN0QixNQUFNLFVBQVUsR0FBRyxzQkFBUSxFQUFFLENBQUM7SUFFOUIsVUFBVSxDQUNSLGVBQUssQ0FBQyxHQUFHLEVBQUU7UUFDVCxNQUFNLFNBQVMsR0FBZ0IsT0FBTyxDQUFDLEVBQUU7WUFDdkMsT0FBTztpQkFDSixzQkFBc0IsQ0FBQztnQkFDdEIsT0FBTyxFQUFFLENBQUMsdUJBQWdCLENBQUM7Z0JBQzNCLE9BQU8sRUFBRTtvQkFDUCw2QkFBbUI7b0JBQ25CLHVDQUFpQjtvQkFDakIsOEJBQWtCO29CQUNsQiwrQkFBbUI7b0JBQ25CLG1CQUFXLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQztvQkFDdkIsNEJBQVk7aUJBQ2I7Z0JBQ0QsU0FBUyxFQUFFO29CQUNULGlCQUFVLENBQUMsd0JBQWdCLENBQUM7b0JBQzVCLGlCQUFVLENBQUMsMEJBQVcsRUFB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