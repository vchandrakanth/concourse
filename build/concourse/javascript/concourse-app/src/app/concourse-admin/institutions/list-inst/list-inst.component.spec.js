"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = require("@angular/common/http");
const core_1 = require("@angular/core");
const testing_1 = require("@angular/core/testing");
const platform_browser_1 = require("@angular/platform-browser");
const testing_2 = require("@angular/router/testing");
const angular_fontawesome_1 = require("@fortawesome/angular-fontawesome");
const store_1 = require("@ngrx/store");
const rxjs_1 = require("rxjs");
const shared_module_1 = require("@concourse/shared/shared.module");
const facades_1 = require("@concourse/store/facades");
const institution_faker_1 = require("@concourse/store/institution/services/institution.faker");
const test_1 = require("@concourse/test");
const list_inst_component_1 = require("./list-inst.component");
describe('ListInstComponent', () => {
    let component;
    let fixture;
    const mockInstitutions = institution_faker_1.fakeMany();
    beforeEach(testing_1.async(() => {
        const configure = testBed => {
            testBed
                .configureTestingModule({
                schemas: [core_1.NO_ERRORS_SCHEMA],
                imports: [
                    http_1.HttpClientModule,
                    testing_2.RouterTestingModule,
                    angular_fontawesome_1.FontAwesomeModule,
                    store_1.StoreModule.forRoot({}),
                    shared_module_1.SharedModule
                ],
                providers: [
                    test_1.mockFacade(facades_1.ModalStoreFacade),
                    test_1.mockFacade(facades_1.InstitutionFacade, {
                        list$: new rxjs_1.BehaviorSubject(mockInstitutions),
                        isUpdating$: new rxjs_1.BehaviorSubject(true)
                    })
                ],
                declarations: [list_inst_component_1.ListInstComponent]
            });
        };
        test_1.configureTests(configure).then(testBed => {
            fixture = testBed.createComponent(list_inst_component_1.ListInstComponent);
            component = fixture.componentInstance;
            fixture.detectChanges();
        });
    }));
    it('should create', () => {
        expect(component).toBeTruthy();
    });
    it('should contain Institution Data', () => {
        component.institutions$.subscribe(inst => {
            expect(inst).toBe(mockInstitutions);
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
        component.institutions$ = new rxjs_1.BehaviorSubject([]);
        fixture.detectChanges();
        component.institutions$.subscribe(instData => {
            expect(instData.length).toBe(0);
        });
    });
    it('should find app-null-state if there is no institutions', () => {
        const nullStateComponent = fixture.debugElement.query(platform_browser_1.By.css('app-null-state'));
        expect(nullStateComponent).toBeDefined();
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdC1pbnN0LmNvbXBvbmVudC5zcGVjLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vY29uY291cnNlL2phdmFzY3JpcHQvY29uY291cnNlLWFwcC9zcmMvYXBwL2NvbmNvdXJzZS1hZG1pbi9pbnN0aXR1dGlvbnMvbGlzdC1pbnN0L2xpc3QtaW5zdC5jb21wb25lbnQuc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLCtDQUF3RDtBQUN4RCx3Q0FBaUQ7QUFDakQsbURBQWdFO0FBQ2hFLGdFQUErQztBQUMvQyxxREFBOEQ7QUFDOUQsMEVBQXFFO0FBQ3JFLHVDQUEwQztBQUMxQywrQkFBdUM7QUFFdkMsbUVBQStEO0FBQy9ELHNEQUErRTtBQUMvRSwrRkFBbUY7QUFDbkYsMENBQTBFO0FBQzFFLCtEQUEwRDtBQUUxRCxRQUFRLENBQUMsbUJBQW1CLEVBQUUsR0FBRyxFQUFFO0lBQ2pDLElBQUksU0FBNEIsQ0FBQztJQUNqQyxJQUFJLE9BQTRDLENBQUM7SUFDakQsTUFBTSxnQkFBZ0IsR0FBRyw0QkFBUSxFQUFFLENBQUM7SUFFcEMsVUFBVSxDQUNSLGVBQUssQ0FBQyxHQUFHLEVBQUU7UUFDVCxNQUFNLFNBQVMsR0FBZ0IsT0FBTyxDQUFDLEVBQUU7WUFDdkMsT0FBTztpQkFDSixzQkFBc0IsQ0FBQztnQkFDdEIsT0FBTyxFQUFFLENBQUMsdUJBQWdCLENBQUM7Z0JBQzNCLE9BQU8sRUFBRTtvQkFDUCx1QkFBZ0I7b0JBQ2hCLDZCQUFtQjtvQkFDbkIsdUNBQWlCO29CQUNqQixtQkFBVyxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUM7b0JBQ3ZCLDRCQUFZO2lCQUNiO2dCQUNELFNBQVMsRUFBRTtvQkFDVCxpQkFBVSxDQUFDLDBCQUFnQixDQUFDO29CQUM1QixpQkFBVSxDQUFDLDJCQUFpQixFQUFFO3dCQUM1QixLQUFLLEVBQUUsSUFBSSxzQkFBZSxDQUFDLGdCQUFnQixDQUFDO3dCQUM1QyxXQUFXLEVBQUUsSUFBSSxzQkFBZSxDQUFDLElBQUksQ0FBQztxQkFDdkMsQ0FBQztpQkFDSDtnQkFDRCxZQUFZLEVBQUUsQ0FBQyx1Q0FBaUIsQ0FBQzthQUNsQyxDQUFDLENBQUM7UUFDUCxDQUFDLENBQUM7UUFFRixxQkFBYyxDQUFDLFNBQVMsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsRUFBRTtZQUN2QyxPQUFPLEdBQUcsT0FBTyxDQUFDLGVBQWUsQ0FBQyx1Q0FBaUIsQ0FBQyxDQUFDO1lBQ3JELFNBQVMsR0FBRyxPQUFPLENBQUMsaUJBQWlCLENBQUM7WUFDdEMsT0FBTyxDQUFDLGFBQWEsRUFBRSxDQUFDO1FBQzFCLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQyxDQUFDLENBQ0gsQ0FBQztJQUVGLEVBQUUsQ0FBQyxlQUFlLEVBQUUsR0FBRyxFQUFFO1FBQ3ZCLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQyxVQUFVLEVBQUUsQ0FBQztJQUNqQyxDQUFDLENBQUMsQ0FBQztJQUVILEVBQUUsQ0FBQyxpQ0FBaUMsRUFBRSxHQUFHLEVBQUU7UUFDekMsU0FBUyxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFDdkMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1FBQ3RDLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQyxDQUFDLENBQUM7SUFFSCxFQUFFLENBQUMsOEJBQThCLEVBQUUsR0FBRyxFQUFFO1FBQ3RDLE1BQU0sV0FBVyxHQUFHLE9BQU8sQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLHFCQUFFLENBQUMsR0FBRyxDQUFDLGtCQUFrQixDQUFDLENBQUMsQ0FBQztRQUMzRSxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDcEMsQ0FBQyxDQUFDLENBQUM7SUFFSCxFQUFFLENBQUMsMENBQTBDLEVBQUUsR0FBRyxFQUFFO1FBQ2xELE1BQU0sa0JBQWtCLEdBQUcsT0FBTyxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMscUJBQUUsQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDO1FBQ2hGLE1BQU0sQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQ3hDLENBQUMsQ0FBQyxDQUFDO0lBRUgsRUFBRSxDQUFDLDZDQUE2QyxFQUFFLEdBQUcsRUFBRTtRQUNyRCxTQUFTLENBQUMsYUFBYSxHQUFHLElBQUksc0JBQWUsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUNsRCxPQUFPLENBQUMsYUFBYSxFQUFFLENBQUM7UUFDeEIsU0FBUyxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLEVBQUU7WUFDM0MsTUFBTSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDbEMsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDLENBQUMsQ0FBQztJQUVILEVBQUUsQ0FBQyx3REFBd0QsRUFBRSxHQUFHLEVBQUU7UUFDaEUsTUFBTSxrQkFBa0IsR0FBRyxPQUFPLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxxQkFBRSxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUM7UUFDaEYsTUFBTSxDQUFDLGtCQUFrQixDQUFDLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDM0MsQ0FBQyxDQUFDLENBQUM7QUFFTCxDQUFDLENBQUMsQ0FBQyJ9