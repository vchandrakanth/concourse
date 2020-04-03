"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@angular/core/testing");
const core_1 = require("@angular/core");
const testing_2 = require("@angular/router/testing");
const modal_1 = require("@concourse/core/modal");
const shared_module_1 = require("@concourse/shared/shared.module");
const baseline_asset_facade_1 = require("@concourse/store/baseline-asset/state/baseline-asset.facade");
const facades_1 = require("@concourse/store/facades");
const test_1 = require("@concourse/test");
const angular_fontawesome_1 = require("@fortawesome/angular-fontawesome");
const store_1 = require("@ngrx/store");
const ngx_bootstrap_1 = require("ngx-bootstrap");
const ngx_pipes_1 = require("ngx-pipes");
const baseline_assets_details_component_1 = require("./baseline-assets-details.component");
xdescribe('BaselineAssetDetailsComponent', () => {
    let component;
    let fixture;
    beforeEach(testing_1.async(() => {
        testing_1.TestBed.configureTestingModule({
            schemas: [core_1.NO_ERRORS_SCHEMA],
            declarations: [baseline_assets_details_component_1.BaselineAssetsDetailsComponent],
            imports: [
                testing_2.RouterTestingModule,
                angular_fontawesome_1.FontAwesomeModule,
                ngx_bootstrap_1.TabsModule.forRoot(),
                shared_module_1.SharedModule,
                ngx_pipes_1.NgPipesModule,
                store_1.StoreModule.forRoot({}),
                ngx_bootstrap_1.AlertModule.forRoot()
            ],
            providers: [
                test_1.mockFacade(baseline_asset_facade_1.BaselineAssetFacade),
                test_1.mockFacade(facades_1.GroupFacade),
                test_1.mockFacade(facades_1.SurfaceFacade),
                test_1.mockFacade(facades_1.AuthFacade),
                test_1.mockFacade(modal_1.ModalStoreFacade)
            ]
        })
            .compileComponents();
    }));
    beforeEach(() => {
        fixture = testing_1.TestBed.createComponent(baseline_assets_details_component_1.BaselineAssetsDetailsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzZWxpbmUtYXNzZXRzLWRldGFpbHMuY29tcG9uZW50LnNwZWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9jb25jb3Vyc2UvamF2YXNjcmlwdC9jb25jb3Vyc2UtYXBwL3NyYy9hcHAvYmFzZWxpbmUtYXNzZXRzL2Jhc2VsaW5lLWFzc2V0cy1kZXRhaWxzL2Jhc2VsaW5lLWFzc2V0cy1kZXRhaWxzLmNvbXBvbmVudC5zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsbURBQXlFO0FBRXpFLHdDQUFpRDtBQUNqRCxxREFBOEQ7QUFDOUQsaURBQXlEO0FBQ3pELG1FQUErRDtBQUMvRCx1R0FBa0c7QUFDbEcsc0RBQWtGO0FBQ2xGLDBDQUE2QztBQUM3QywwRUFBcUU7QUFDckUsdUNBQTBDO0FBQzFDLGlEQUF3RDtBQUN4RCx5Q0FBMEM7QUFDMUMsMkZBQXFGO0FBRXJGLFNBQVMsQ0FBQywrQkFBK0IsRUFBRSxHQUFHLEVBQUU7SUFDOUMsSUFBSSxTQUF5QyxDQUFDO0lBQzlDLElBQUksT0FBeUQsQ0FBQztJQUU5RCxVQUFVLENBQUMsZUFBSyxDQUFDLEdBQUcsRUFBRTtRQUNwQixpQkFBTyxDQUFDLHNCQUFzQixDQUFDO1lBQzdCLE9BQU8sRUFBRSxDQUFDLHVCQUFnQixDQUFDO1lBQzNCLFlBQVksRUFBRSxDQUFDLGtFQUE4QixDQUFDO1lBQzlDLE9BQU8sRUFBRTtnQkFDUCw2QkFBbUI7Z0JBQ25CLHVDQUFpQjtnQkFDakIsMEJBQVUsQ0FBQyxPQUFPLEVBQUU7Z0JBQ3BCLDRCQUFZO2dCQUNaLHlCQUFhO2dCQUNiLG1CQUFXLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQztnQkFDdkIsMkJBQVcsQ0FBQyxPQUFPLEVBQUU7YUFDdEI7WUFDRCxTQUFTLEVBQUU7Z0JBQ1QsaUJBQVUsQ0FBQywyQ0FBbUIsQ0FBQztnQkFDL0IsaUJBQVUsQ0FBQyxxQkFBVyxDQUFDO2dCQUN2QixpQkFBVSxDQUFDLHVCQUFhLENBQUM7Z0JBQ3pCLGlCQUFVLENBQUMsb0JBQVUsQ0FBQztnQkFDdEIsaUJBQVUsQ0FBQyx3QkFBZ0IsQ0FBQzthQUFDO1NBQ2hDLENBQUM7YUFDQyxpQkFBaUIsRUFBRSxDQUFDO0lBQ3pCLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFFSixVQUFVLENBQUMsR0FBRyxFQUFFO1FBQ2QsT0FBTyxHQUFHLGlCQUFPLENBQUMsZUFBZSxDQUFDLGtFQUE4QixDQUFDLENBQUM7UUFDbEUsU0FBUyxHQUFHLE9BQU8sQ0FBQyxpQkFBaUIsQ0FBQztRQUN0QyxPQUFPLENBQUMsYUFBYSxFQUFFLENBQUM7SUFDMUIsQ0FBQyxDQUFDLENBQUM7SUFFSCxFQUFFLENBQUMsZUFBZSxFQUFFLEdBQUcsRUFBRTtRQUN2QixNQUFNLENBQUMsU0FBUyxDQUFDLENBQUMsVUFBVSxFQUFFLENBQUM7SUFDakMsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDLENBQUMsQ0FBQyJ9