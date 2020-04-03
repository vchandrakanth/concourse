"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const testing_1 = require("@angular/core/testing");
const platform_browser_1 = require("@angular/platform-browser");
const testing_2 = require("@angular/router/testing");
const angular_fontawesome_1 = require("@fortawesome/angular-fontawesome");
const store_1 = require("@ngrx/store");
const rxjs_1 = require("rxjs");
const shared_module_1 = require("@concourse/shared/shared.module");
const facades_1 = require("@concourse/store/facades");
const institutionDataFaker = require("@concourse/store/institution-data/services/institution-data.faker");
const test_1 = require("@concourse/test");
const list_view_component_1 = require("./list-view.component");
describe('ListViewComponent', () => {
    let component;
    let fixture;
    const mockInstitutionData = institutionDataFaker.fakeMany();
    beforeEach(testing_1.async(() => {
        const configure = testBed => {
            testBed
                .configureTestingModule({
                declarations: [list_view_component_1.InstitutionDataListComponent],
                imports: [
                    testing_2.RouterTestingModule,
                    angular_fontawesome_1.FontAwesomeModule,
                    store_1.StoreModule.forRoot({}),
                    shared_module_1.SharedModule
                ],
                providers: [
                    { provide: facades_1.ModalStoreFacade, useValue: {} },
                    {
                        provide: facades_1.InstitutionDataFacade,
                        useValue: {
                            getAll: jest.fn(),
                            list$: new rxjs_1.BehaviorSubject(mockInstitutionData),
                            isLoaded$: new rxjs_1.BehaviorSubject(true)
                        }
                    },
                    ...test_1.directiveProviders
                ],
                schemas: [core_1.NO_ERRORS_SCHEMA]
            });
        };
        test_1.configureTests(configure).then(testBed => {
            fixture = testBed.createComponent(list_view_component_1.InstitutionDataListComponent);
            component = fixture.componentInstance;
            fixture.detectChanges();
        });
    }));
    it('should create', () => {
        expect(component).toBeTruthy();
    });
    it('should contain Institution Data', () => {
        component.instDataList$.subscribe(instDatas => {
            expect(instDatas).toBe(mockInstitutionData);
        });
    });
    it('should find app-page-actions', () => {
        const pageActions = fixture.debugElement.query(platform_browser_1.By.css('app-page-actions'));
        expect(pageActions).toBeDefined();
    });
    it('should not find app-null-state component', () => {
        const nullStateComponent = fixture.debugElement.query(platform_browser_1.By.css('app-null-state'));
        expect(nullStateComponent).toBeNull();
    });
    it('should give length zero if there no records', () => {
        component.instDataList$ = new rxjs_1.BehaviorSubject([]);
        fixture.detectChanges();
        component.instDataList$.subscribe(instData => {
            expect(instData.length).toBe(0);
        });
    });
    it('should find app-null-state if there is no institution datas', () => {
        const nullStateComponent = fixture.debugElement.query(platform_browser_1.By.css('app-null-state'));
        expect(nullStateComponent).toBeDefined();
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdC12aWV3LmNvbXBvbmVudC5zcGVjLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vY29uY291cnNlL2phdmFzY3JpcHQvY29uY291cnNlLWFwcC9zcmMvYXBwL2luc3RpdHV0aW9uL2luc3RpdHV0aW9uLWRhdGEvbGlzdC12aWV3L2xpc3Qtdmlldy5jb21wb25lbnQuc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHdDQUFpRDtBQUNqRCxtREFBZ0U7QUFDaEUsZ0VBQStDO0FBQy9DLHFEQUE4RDtBQUM5RCwwRUFBcUU7QUFDckUsdUNBQTBDO0FBQzFDLCtCQUF1QztBQUV2QyxtRUFBK0Q7QUFDL0Qsc0RBQW1GO0FBQ25GLDBHQUEwRztBQUMxRywwQ0FBa0Y7QUFDbEYsK0RBQXFFO0FBRXJFLFFBQVEsQ0FBQyxtQkFBbUIsRUFBRSxHQUFHLEVBQUU7SUFDakMsSUFBSSxTQUF1QyxDQUFDO0lBQzVDLElBQUksT0FBdUQsQ0FBQztJQUM1RCxNQUFNLG1CQUFtQixHQUFHLG9CQUFvQixDQUFDLFFBQVEsRUFBRSxDQUFDO0lBRTVELFVBQVUsQ0FDUixlQUFLLENBQUMsR0FBRyxFQUFFO1FBQ1QsTUFBTSxTQUFTLEdBQWdCLE9BQU8sQ0FBQyxFQUFFO1lBQ3ZDLE9BQU87aUJBQ0osc0JBQXNCLENBQUM7Z0JBQ3RCLFlBQVksRUFBRSxDQUFDLGtEQUE0QixDQUFDO2dCQUM1QyxPQUFPLEVBQUU7b0JBQ1AsNkJBQW1CO29CQUNuQix1Q0FBaUI7b0JBQ2pCLG1CQUFXLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQztvQkFDdkIsNEJBQVk7aUJBQ2I7Z0JBQ0QsU0FBUyxFQUFFO29CQUNULEVBQUUsT0FBTyxFQUFFLDBCQUFnQixFQUFFLFFBQVEsRUFBRSxFQUFFLEVBQUU7b0JBQzNDO3dCQUNFLE9BQU8sRUFBRSwrQkFBcUI7d0JBQzlCLFFBQVEsRUFBRTs0QkFDUixNQUFNLEVBQUUsSUFB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