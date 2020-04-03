"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@angular/core/testing");
const baseline_assets_list_component_1 = require("./baseline-assets-list.component");
const testing_2 = require("@angular/router/testing");
const angular_fontawesome_1 = require("@fortawesome/angular-fontawesome");
const shared_module_1 = require("@concourse/shared/shared.module");
const baseline_asset_facade_1 = require("@concourse/store/baseline-asset/state/baseline-asset.facade");
const modal_1 = require("@concourse/core/modal");
const test_1 = require("@concourse/test");
const core_1 = require("@angular/core");
describe('BaselineAssetsListComponent', () => {
    let component;
    let fixture;
    beforeEach(testing_1.async(() => {
        testing_1.TestBed.configureTestingModule({
            schemas: [core_1.NO_ERRORS_SCHEMA],
            declarations: [baseline_assets_list_component_1.BaselineAssetsListComponent],
            imports: [
                testing_2.RouterTestingModule,
                angular_fontawesome_1.FontAwesomeModule,
                // NgArrayPipesModule,
                // NgxDatatableModule,
                // BaselineAssetsRoutingModule,
                // TabsModule.forRoot(),
                shared_module_1.SharedModule
            ],
            providers: [
                ...test_1.directiveProviders,
                test_1.mockFacade(baseline_asset_facade_1.BaselineAssetFacade),
                test_1.mockFacade(modal_1.ModalStoreFacade)
            ]
        })
            .compileComponents();
    }));
    beforeEach(() => {
        fixture = testing_1.TestBed.createComponent(baseline_assets_list_component_1.BaselineAssetsListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzZWxpbmUtYXNzZXRzLWxpc3QuY29tcG9uZW50LnNwZWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9jb25jb3Vyc2UvamF2YXNjcmlwdC9jb25jb3Vyc2UtYXBwL3NyYy9hcHAvYmFzZWxpbmUtYXNzZXRzL2Jhc2VsaW5lLWFzc2V0cy1saXN0L2Jhc2VsaW5lLWFzc2V0cy1saXN0LmNvbXBvbmVudC5zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsbURBQXlFO0FBRXpFLHFGQUErRTtBQUMvRSxxREFBOEQ7QUFDOUQsMEVBQXFFO0FBS3JFLG1FQUErRDtBQUMvRCx1R0FBa0c7QUFDbEcsaURBQXlEO0FBQ3pELDBDQUFpRTtBQUNqRSx3Q0FBaUQ7QUFFakQsUUFBUSxDQUFDLDZCQUE2QixFQUFFLEdBQUcsRUFBRTtJQUMzQyxJQUFJLFNBQXNDLENBQUM7SUFDM0MsSUFBSSxPQUFzRCxDQUFDO0lBRTNELFVBQVUsQ0FBQyxlQUFLLENBQUMsR0FBRyxFQUFFO1FBQ3BCLGlCQUFPLENBQUMsc0JBQXNCLENBQUM7WUFDN0IsT0FBTyxFQUFFLENBQUMsdUJBQWdCLENBQUM7WUFDM0IsWUFBWSxFQUFFLENBQUUsNERBQTJCLENBQUU7WUFDN0MsT0FBTyxFQUFFO2dCQUNQLDZCQUFtQjtnQkFDbkIsdUNBQWlCO2dCQUNqQixzQkFBc0I7Z0JBQ3RCLHNCQUFzQjtnQkFDdEIsK0JBQStCO2dCQUMvQix3QkFBd0I7Z0JBQ3hCLDRCQUFZO2FBQ2I7WUFDRCxTQUFTLEVBQUU7Z0JBQ1QsR0FBRyx5QkFBa0I7Z0JBQ3JCLGlCQUFVLENBQUMsMkNBQW1CLENBQUM7Z0JBQy9CLGlCQUFVLENBQUMsd0JBQWdCLENBQUM7YUFBQztTQUNoQyxDQUFDO2FBQ0QsaUJBQWlCLEVBQUUsQ0FBQztJQUN2QixDQUFDLENBQUMsQ0FBQyxDQUFDO0lBRUosVUFBVSxDQUFDLEdBQUcsRUFBRTtRQUNkLE9BQU8sR0FBRyxpQkFBTyxDQUFDLGVBQWUsQ0FBQyw0REFBMkIsQ0FBQyxDQUFDO1FBQy9ELFNBQVMsR0FBRyxPQUFPLENBQUMsaUJBQWlCLENBQUM7UUFDdEMsT0FBTyxDQUFDLGFBQWEsRUFBRSxDQUFDO0lBQzFCLENBQUMsQ0FBQyxDQUFDO0lBRUgsRUFBRSxDQUFDLGVBQWUsRUFBRSxHQUFHLEVBQUU7UUFDdkIsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDLFVBQVUsRUFBRSxDQUFDO0lBQ2pDLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyxDQUFDLENBQUMifQ==