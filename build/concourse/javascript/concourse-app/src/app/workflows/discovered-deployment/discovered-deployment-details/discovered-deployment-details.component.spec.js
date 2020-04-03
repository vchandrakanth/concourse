"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const testing_1 = require("@angular/core/testing");
const store_1 = require("@ngrx/store");
const ngx_pipes_1 = require("ngx-pipes");
const facades_1 = require("@concourse/store/facades");
const discovered_deployment_details_component_1 = require("./discovered-deployment-details.component");
describe('DetailsViewComponent', () => {
    let component;
    let fixture;
    beforeEach(testing_1.async(() => {
        testing_1.TestBed.configureTestingModule({
            imports: [
                store_1.StoreModule.forRoot({}),
                ngx_pipes_1.NgPipesModule
            ],
            schemas: [core_1.NO_ERRORS_SCHEMA],
            providers: [
                { provide: facades_1.ModalStoreFacade, useValue: {} },
                facades_1.DiscoveredDeploymentFacade
            ],
            declarations: [discovered_deployment_details_component_1.DiscoveredDeploymentDetailsComponent]
        })
            .compileComponents();
    }));
    beforeEach(() => {
        fixture = testing_1.TestBed.createComponent(discovered_deployment_details_component_1.DiscoveredDeploymentDetailsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlzY292ZXJlZC1kZXBsb3ltZW50LWRldGFpbHMuY29tcG9uZW50LnNwZWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9jb25jb3Vyc2UvamF2YXNjcmlwdC9jb25jb3Vyc2UtYXBwL3NyYy9hcHAvd29ya2Zsb3dzL2Rpc2NvdmVyZWQtZGVwbG95bWVudC9kaXNjb3ZlcmVkLWRlcGxveW1lbnQtZGV0YWlscy9kaXNjb3ZlcmVkLWRlcGxveW1lbnQtZGV0YWlscy5jb21wb25lbnQuc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHdDQUFpRDtBQUNqRCxtREFBeUU7QUFDekUsdUNBQTBDO0FBRTFDLHlDQUEwQztBQUUxQyxzREFBd0Y7QUFDeEYsdUdBQWlHO0FBRWpHLFFBQVEsQ0FBQyxzQkFBc0IsRUFBRSxHQUFHLEVBQUU7SUFDcEMsSUFBSSxTQUErQyxDQUFDO0lBQ3BELElBQUksT0FBK0QsQ0FBQztJQUVwRSxVQUFVLENBQUMsZUFBSyxDQUFDLEdBQUcsRUFBRTtRQUNwQixpQkFBTyxDQUFDLHNCQUFzQixDQUFDO1lBQzdCLE9BQU8sRUFBRTtnQkFDUCxtQkFBVyxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUM7Z0JBQ3ZCLHlCQUFhO2FBQ2Q7WUFDRCxPQUFPLEVBQUUsQ0FBQyx1QkFBZ0IsQ0FBQztZQUMzQixTQUFTLEVBQUU7Z0JBQ1QsRUFBRSxPQUFPLEVBQUUsMEJBQWdCLEVBQUUsUUFBUSxFQUFFLEVBQUUsRUFBRTtnQkFDM0Msb0NBQTBCO2FBQzNCO1lBQ0QsWUFBWSxFQUFFLENBQUMsOEVBQW9DLENBQUM7U0FDckQsQ0FBQzthQUNDLGlCQUFpQixFQUFFLENBQUM7SUFDekIsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUVKLFVBQVUsQ0FBQyxHQUFHLEVBQUU7UUFDZCxPQUFPLEdBQUcsaUJBQU8sQ0FBQyxlQUFlLENBQUMsOEVBQW9DLENBQUMsQ0FBQztRQUN4RSxTQUFTLEdBQUcsT0FBTyxDQUFDLGlCQUFpQixDQUFDO1FBQ3RDLE9BQU8sQ0FBQyxhQUFhLEVBQUUsQ0FBQztJQUMxQixDQUFDLENBQUMsQ0FBQztJQUVILEVBQUUsQ0FBQyxlQUFlLEVBQUUsR0FBRyxFQUFFO1FBQ3ZCLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQyxVQUFVLEVBQUUsQ0FBQztJQUNqQyxDQUFDLENBQUMsQ0FBQztBQUNMLENBQUMsQ0FBQyxDQUFDIn0=