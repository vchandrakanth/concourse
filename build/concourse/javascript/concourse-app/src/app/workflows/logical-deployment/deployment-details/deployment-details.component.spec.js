"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const testing_1 = require("@angular/core/testing");
const platform_browser_1 = require("@angular/platform-browser");
const testing_2 = require("@angular/router/testing");
const store_1 = require("@ngrx/store");
const rxjs_1 = require("rxjs");
const fakeAssets = require("@concourse/store/asset/services/asset.faker");
const fakeGroups = require("@concourse/store/group/services/group.faker");
const logical_deployment_faker_1 = require("@concourse/store/logical-deployment/services/logical-deployment.faker");
const fakeSurfaceLayers = require("@concourse/store/surface-layer/services/surface-layer.faker");
const fakeUser = require("@concourse/store/user/services/user.faker");
const shared_module_1 = require("@concourse/shared/shared.module");
const facades_1 = require("@concourse/store/facades");
const test_1 = require("@concourse/test");
const deployment_details_component_1 = require("./deployment-details.component");
describe('DetailsViewComponent', () => {
    let component;
    let fixture;
    const surfaceLayer = fakeSurfaceLayers.fakeOne();
    const fakeModel = fakeAssets.fakeOneEnclave([], fakeGroups.fakeOne());
    const requester = fakeUser.fakeOne();
    const mockLogicalDeployment = logical_deployment_faker_1.fakeOne(surfaceLayer.id, requester.id, fakeModel.id);
    beforeEach(testing_1.async(() => {
        testing_1.TestBed.configureTestingModule({
            schemas: [core_1.NO_ERRORS_SCHEMA],
            imports: [
                testing_2.RouterTestingModule,
                store_1.StoreModule.forRoot({}),
                shared_module_1.SharedModule
            ],
            providers: [
                test_1.mockFacade(facades_1.ModalStoreFacade),
                test_1.mockFacade(facades_1.LogicalDeploymentFacade, {
                    selectedWithRelated$: new rxjs_1.BehaviorSubject(mockLogicalDeployment)
                })
            ],
            declarations: [deployment_details_component_1.DeploymentDetailsComponent]
        })
            .compileComponents();
    }));
    beforeEach(() => {
        fixture = testing_1.TestBed.createComponent(deployment_details_component_1.DeploymentDetailsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
    it('should display Logical Deployment details', () => {
        const name = fixture.debugElement.query(platform_browser_1.By.css('[data-e2e="deploymentDetails"] h2')).nativeElement;
        expect(name.textContent).toEqual(mockLogicalDeployment.name);
    });
    it('should have Approval Requests and Policy Violations app-list-card(s)', () => {
        const approvalRequestCard = fixture.debugElement.query(platform_browser_1.By.css('app-list-card[cardTitle="Approval Requests"]'));
        const policyResolutionCard = fixture.debugElement.query(platform_browser_1.By.css('app-list-card[cardTitle="Policy Violations"]'));
        expect(approvalRequestCard).toBeTruthy();
        expect(policyResolutionCard).toBeTruthy();
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVwbG95bWVudC1kZXRhaWxzLmNvbXBvbmVudC5zcGVjLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vY29uY291cnNlL2phdmFzY3JpcHQvY29uY291cnNlLWFwcC9zcmMvYXBwL3dvcmtmbG93cy9sb2dpY2FsLWRlcGxveW1lbnQvZGVwbG95bWVudC1kZXRhaWxzL2RlcGxveW1lbnQtZGV0YWlscy5jb21wb25lbnQuc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHdDQUFpRDtBQUNqRCxtREFBeUU7QUFDekUsZ0VBQStDO0FBQy9DLHFEQUE4RDtBQUM5RCx1Q0FBMEM7QUFDMUMsK0JBQXVDO0FBRXZDLDBFQUEwRTtBQUMxRSwwRUFBMEU7QUFDMUUsb0hBQWdHO0FBQ2hHLGlHQUFpRztBQUNqRyxzRUFBc0U7QUFFdEUsbUVBQStEO0FBQy9ELHNEQUFxRjtBQUNyRiwwQ0FBNkM7QUFDN0MsaUZBQTRFO0FBRTVFLFFBQVEsQ0FBQyxzQkFBc0IsRUFBRSxHQUFHLEVBQUU7SUFDcEMsSUFBSSxTQUFxQyxDQUFDO0lBQzFDLElBQUksT0FBcUQsQ0FBQztJQUMxRCxNQUFNLFlBQVksR0FBRyxpQkFBaUIsQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUNqRCxNQUFNLFNBQVMsR0FBRyxVQUFVLENBQUMsY0FBYyxDQUFDLEVBQUUsRUFBRSxVQUFVLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQztJQUN0RSxNQUFNLFNBQVMsR0FBRyxRQUFRLENBQUMsT0FBTyxFQUFFLENBQUM7SUFDckMsTUFBTSxxQkFBcUIsR0FBRyxrQ0FBTyxDQUFDLFlBQVksQ0FBQyxFQUFFLEVBQUUsU0FBUyxDQUFDLEVBQUUsRUFBRSxTQUFTLENBQUMsRUFBRSxDQUFDLENBQUM7SUFFbkYsVUFBVSxDQUFDLGVBQUssQ0FBQyxHQUFHLEVBQUU7UUFDcEIsaUJBQU8sQ0FBQyxzQkFBc0IsQ0FBQztZQUM3QixPQUFPLEVBQUUsQ0FBQyx1QkFBZ0IsQ0FBQztZQUMzQixPQUFPLEVBQUU7Z0JBQ1AsNkJBQW1CO2dCQUNuQixtQkFBVyxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUM7Z0JBQ3ZCLDRCQUFZO2FBQ2I7WUFDRCxTQUFTLEVBQUU7Z0JBQ1QsaUJBQVUsQ0FBQywwQkFBZ0IsQ0FBQztnQkFDNUIsaUJBQVUsQ0FBQyxpQ0FBdUIsRUFBRTtvQkFDbEMsb0JBQW9CLEVBQUUsSUFBSSxzQkFBZSxDQUFDLHFCQUFxQixDQUFDO2lCQUNqRSxDQUFDO2FBQ0g7WUFDRCxZQUFZLEVBQUUsQ0FBQyx5REFBMEIsQ0FBQztTQUMzQyxDQUFDO2FBQ0MsaUJBQWlCLEVBQUUsQ0FBQztJQUN6QixDQUFDLENBQUMsQ0FBQyxDQUFDO0lBRUosVUFBVSxDQUFDLEdBQUcsRUFBRTtRQUNkLE9BQU8sR0FBRyxpQkFBTyxDQUFDLGVBQWUsQ0FBQyx5REFBMEIsQ0FBQyxDQUFDO1FBQzlELFNBQVMsR0FBRyxPQUFPLENBQUMsaUJBQWlCLENBQUM7UUFDdEMsT0FBTyxDQUFDLGFBQWEsRUFBRSxDQUFDO0lBQzFCLENBQUMsQ0FBQyxDQUFDO0lBRUgsRUFBRSxDQUFDLGVBQWUsRUFBRSxHQUFHLEVBQUU7UUFDdkIsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDLFVBQVUsRUFBRSxDQUFDO0lBQ2pDLENBQUMsQ0FBQyxDQUFDO0lBRUgsRUFBRSxDQUFDLDJDQUEyQyxFQUFFLEdBQUcsRUFBRTtRQUNuRCxNQUFNLElBQUksR0FBRyxPQUFPLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxxQkFBRSxDQUFDLEdBQUcsQ0FBQyxtQ0FBbUMsQ0FBQyxDQUFDLENBQUMsYUFBNEIsQ0FBQztRQUNsSCxNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxxQkFBcUIsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUMvRCxDQUFDLENBQUMsQ0FBQztJQUVILEVBQUUsQ0FBQyxzRUFBc0UsRUFBRSxHQUFHLEVBQUU7UUFDOUUsTUFBTSxtQkFBbUIsR0FBRyxPQUFPLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxxQkFBRSxDQUFDLEdBQUcsQ0FBQyw4Q0FBOEMsQ0FBQyxDQUFDLENBQUM7UUFDL0csTUFBTSxvQkFBb0IsR0FBRyxPQUFPLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxxQkFBRSxDQUFDLEdBQUcsQ0FBQyw4Q0FBOEMsQ0FBQyxDQUFDLENBQUM7UUFFaEgsTUFBTSxDQUFDLG1CQUFtQixDQUFDLENBQUMsVUFBVSxFQUFFLENBQUM7UUFDekMsTUFBTSxDQUFDLG9CQUFvQixDQUFDLENBQUMsVUFBVSxFQUFFLENBQUM7SUFDNUMsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDLENBQUMsQ0FBQyJ9