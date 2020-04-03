"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@angular/core/testing");
const facades_1 = require("@concourse/store/facades");
const fromSurfaceLayer = require("@concourse/store/surface-layer/state/surface-layer.reducer");
const store_1 = require("@ngrx/store");
const deployments_tab_component_1 = require("./deployments-tab.component");
describe('DeploymentsTabComponent', () => {
    let component;
    let fixture;
    beforeEach(testing_1.async(() => {
        testing_1.TestBed.configureTestingModule({
            imports: [
                store_1.StoreModule.forRoot({
                    surfaceLayer: fromSurfaceLayer.reducer
                })
            ],
            providers: [
                facades_1.SurfaceLayerFacade
            ],
            declarations: [deployments_tab_component_1.DeploymentsTabComponent]
        })
            .compileComponents();
    }));
    beforeEach(() => {
        fixture = testing_1.TestBed.createComponent(deployments_tab_component_1.DeploymentsTabComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVwbG95bWVudHMtdGFiLmNvbXBvbmVudC5zcGVjLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vY29uY291cnNlL2phdmFzY3JpcHQvY29uY291cnNlLWFwcC9zcmMvYXBwL29yZy10cmVlL2RlcGxveW1lbnRzLXRhYi9kZXBsb3ltZW50cy10YWIuY29tcG9uZW50LnNwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxtREFBeUU7QUFFekUsc0RBQThEO0FBQzlELCtGQUErRjtBQUMvRix1Q0FBMEM7QUFFMUMsMkVBQXNFO0FBRXRFLFFBQVEsQ0FBQyx5QkFBeUIsRUFBRSxHQUFHLEVBQUU7SUFDdkMsSUFBSSxTQUFrQyxDQUFDO0lBQ3ZDLElBQUksT0FBa0QsQ0FBQztJQUV2RCxVQUFVLENBQUMsZUFBSyxDQUFDLEdBQUcsRUFBRTtRQUNwQixpQkFBTyxDQUFDLHNCQUFzQixDQUFDO1lBQzdCLE9BQU8sRUFBRTtnQkFDUCxtQkFBVyxDQUFDLE9BQU8sQ0FBQztvQkFDbEIsWUFBWSxFQUFFLGdCQUFnQixDQUFDLE9BQU87aUJBQ3ZDLENBQUM7YUFDSDtZQUNELFNBQVMsRUFBRTtnQkFDVCw0QkFBa0I7YUFDbkI7WUFDRCxZQUFZLEVBQUUsQ0FBQyxtREFBdUIsQ0FBQztTQUN4QyxDQUFDO2FBQ0MsaUJBQWlCLEVBQUUsQ0FBQztJQUN6QixDQUFDLENBQUMsQ0FBQyxDQUFDO0lBRUosVUFBVSxDQUFDLEdBQUcsRUFBRTtRQUNkLE9BQU8sR0FBRyxpQkFBTyxDQUFDLGVBQWUsQ0FBQyxtREFBdUIsQ0FBQyxDQUFDO1FBQzNELFNBQVMsR0FBRyxPQUFPLENBQUMsaUJBQWlCLENBQUM7UUFDdEMsT0FBTyxDQUFDLGFBQWEsRUFBRSxDQUFDO0lBQzFCLENBQUMsQ0FBQyxDQUFDO0lBRUgsRUFBRSxDQUFDLGVBQWUsRUFBRSxHQUFHLEVBQUU7UUFDdkIsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDLFVBQVUsRUFBRSxDQUFDO0lBQ2pDLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyxDQUFDLENBQUMifQ==