"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const testing_1 = require("@angular/core/testing");
const angular_fontawesome_1 = require("@fortawesome/angular-fontawesome");
const store_1 = require("@ngrx/store");
const rxjs_1 = require("rxjs");
const shared_module_1 = require("@concourse/shared/shared.module");
const facades_1 = require("@concourse/store/facades");
const surfaceLayerFaker = require("@concourse/store/surface-layer/services/surface-layer.faker");
const test_1 = require("@concourse/test");
const panzoom_service_1 = require("../panzoom.service");
const org_chart_component_1 = require("./org-chart.component");
describe('OrgChartComponent', () => {
    let surfaceLayerFacade;
    let panzoom;
    let component;
    let fixture;
    beforeEach(testing_1.async(() => {
        testing_1.TestBed.configureTestingModule({
            schemas: [core_1.NO_ERRORS_SCHEMA],
            imports: [
                angular_fontawesome_1.FontAwesomeModule,
                store_1.StoreModule.forRoot({}),
                shared_module_1.SharedModule
            ],
            providers: [
                test_1.mockFacade(facades_1.ModalStoreFacade),
                test_1.mockFacade(facades_1.SurfaceLayerFacade, {
                    selectedWithChildren$: new rxjs_1.BehaviorSubject(surfaceLayerFaker.fakeOne())
                }),
                {
                    provide: panzoom_service_1.PanzoomService,
                    useValue: {
                        panzoom: jest.fn()
                    }
                },
                ...test_1.directiveProviders
            ],
            declarations: [org_chart_component_1.OrgChartComponent]
        })
            .compileComponents();
        surfaceLayerFacade = testing_1.TestBed.get(facades_1.SurfaceLayerFacade);
        panzoom = testing_1.TestBed.get(panzoom_service_1.PanzoomService);
    }));
    beforeEach(() => {
        fixture = testing_1.TestBed.createComponent(org_chart_component_1.OrgChartComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
    it('should call panzoom on component lifecycle init', () => {
        fixture.detectChanges(); // <== fires ngOnInit
        fixture.whenStable().then(() => {
            expect(panzoom.panzoom).toHaveBeenCalled();
        });
    });
    it('should call selectSurfaceLayerNode when a node is clicked', () => {
        const surfaceLayer = surfaceLayerFaker.fakeOne();
        fixture.whenStable().then(() => {
            component.nodeSelect(surfaceLayer);
            expect(surfaceLayerFacade.select).toHaveBeenCalledWith(surfaceLayer.id);
        });
    });
    it('should call collapseNode when a node collapse button is clicked', () => {
        const surfaceLayer = surfaceLayerFaker.fakeOne();
        fixture.whenStable().then(() => {
            component.collapseTree(surfaceLayer);
            expect(surfaceLayerFacade.collapse).toHaveBeenCalledWith(surfaceLayer.id);
        });
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3JnLWNoYXJ0LmNvbXBvbmVudC5zcGVjLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vY29uY291cnNlL2phdmFzY3JpcHQvY29uY291cnNlLWFwcC9zcmMvYXBwL29yZy10cmVlL29yZy1jaGFydC9vcmctY2hhcnQuY29tcG9uZW50LnNwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSx3Q0FBaUQ7QUFDakQsbURBQXlFO0FBQ3pFLDBFQUFxRTtBQUNyRSx1Q0FBMEM7QUFDMUMsK0JBQXVDO0FBRXZDLG1FQUErRDtBQUMvRCxzREFBZ0Y7QUFDaEYsaUdBQWlHO0FBQ2pHLDBDQUFpRTtBQUNqRSx3REFBb0Q7QUFDcEQsK0RBQTBEO0FBRTFELFFBQVEsQ0FBQyxtQkFBbUIsRUFBRSxHQUFHLEVBQUU7SUFDakMsSUFBSSxrQkFBc0MsQ0FBQztJQUMzQyxJQUFJLE9BQXVCLENBQUM7SUFDNUIsSUFBSSxTQUE0QixDQUFDO0lBQ2pDLElBQUksT0FBNEMsQ0FBQztJQUVqRCxVQUFVLENBQUMsZUFBSyxDQUFDLEdBQUcsRUFBRTtRQUNwQixpQkFBTyxDQUFDLHNCQUFzQixDQUFDO1lBQzdCLE9BQU8sRUFBRSxDQUFDLHVCQUFnQixDQUFDO1lBQzNCLE9BQU8sRUFBRTtnQkFDUCx1Q0FBaUI7Z0JBQ2pCLG1CQUFXLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQztnQkFDdkIsNEJBQVk7YUFDYjtZQUNELFNBQVMsRUFBRTtnQkFDVCxpQkFBVSxDQUFDLDBCQUFnQixDQUFDO2dCQUM1QixpQkFBVSxDQUFDLDRCQUFrQixFQUFFO29CQUM3QixxQkFBcUIsRUFBRSxJQUFJLHNCQUFlLENBQUMsaUJBQWlCLENBQUMsT0FBTyxFQUFFLENBQUM7aUJBQ3hFLENBQUM7Z0JBQ0Y7b0JBQ0UsT0FBTyxFQUFFLGdDQUFjO29CQUN2QixRQUFRLEVBQUU7d0JBQ1IsT0FBTyxFQUFFLElBQUksQ0FBQyxFQUFFLEVBQUU7cUJBQ25CO2lCQUNGO2dCQUNELEdBQUcseUJBQWtCO2FBQ3RCO1lBQ0QsWUFBWSxFQUFFLENBQUMsdUNBQWlCLENBQUM7U0FDbEMsQ0FBQzthQUNDLGlCQUFpQixFQUFFLENBQUM7UUFDdkIsa0JBQWtCLEdBQUcsaUJBQU8sQ0FBQyxHQUFHLENBQUMsNEJBQWtCLENBQUMsQ0FBQztRQUNyRCxPQUFPLEdBQUcsaUJBQU8sQ0FBQyxHQUFHLENBQUMsZ0NBQWMsQ0FBQyxDQUFDO0lBQ3hDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFFSixVQUFVLENBQUMsR0FBRyxFQUFFO1FBQ2QsT0FBTyxHQUFHLGlCQUFPLENBQUMsZUFBZSxDQUFDLHVDQUFpQixDQUFDLENBQUM7UUFDckQsU0FBUyxHQUFHLE9BQU8sQ0FBQyxpQkFBaUIsQ0FBQztRQUN0QyxPQUFPLENBQUMsYUFBYSxFQUFFLENBQUM7SUFDMUIsQ0FBQyxDQUFDLENBQUM7SUFFSCxFQUFFLENBQUMsZUFBZSxFQUFFLEdBQUcsRUFBRTtRQUN2QixNQUFNLENBQUMsU0FBUyxDQUFDLENBQUMsVUFBVSxFQUFFLENBQUM7SUFDakMsQ0FBQyxDQUFDLENBQUM7SUFFSCxFQUFFLENBQUMsaURBQWlELEVBQUUsR0FBRyxFQUFFO1FBQ3pELE9BQU8sQ0FBQyxhQUFhLEVBQUUsQ0FBQyxDQUFDLHFCQUFxQjtRQUM5QyxPQUFPLENBQUMsVUFBVSxFQUFFLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRTtZQUM3QixNQUFNLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLGdCQUFnQixFQUFFLENBQUM7UUFDN0MsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDLENBQUMsQ0FBQztJQUVILEVBQUUsQ0FBQywyREFBMkQsRUFBRSxHQUFHLEVBQUU7UUFDbkUsTUFBTSxZQUFZLEdBQUcsaUJBQWlCLENBQUMsT0FBTyxFQUFFLENBQUM7UUFFakQsT0FBTyxDQUFDLFVBQVUsRUFBRSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUU7WUFDN0IsU0FBUyxDQUFDLFVBQVUsQ0FBQyxZQUFZLENBQUMsQ0FBQztZQUNuQyxNQUFNLENBQUMsa0JBQWtCLENBQUMsTUFBTSxDQUFDLENBQUMsb0JBQW9CLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQzFFLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQyxDQUFDLENBQUM7SUFFSCxFQUFFLENBQUMsaUVBQWlFLEVBQUUsR0FBRyxFQUFFO1FBQ3pFLE1BQU0sWUFBWSxHQUFHLGlCQUFpQixDQUFDLE9BQU8sRUFBRSxDQUFDO1FBRWpELE9BQU8sQ0FBQyxVQUFVLEVBQUUsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFO1lBQzdCLFNBQVMsQ0FBQyxZQUFZLENBQUMsWUFBWSxDQUFDLENBQUM7WUFDckMsTUFBTSxDQUFDLGtCQUFrQixDQUFDLFFBQVEsQ0FBQyxDQUFDLG9CQUFvQixDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUM1RSxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyxDQUFDLENBQUMifQ==