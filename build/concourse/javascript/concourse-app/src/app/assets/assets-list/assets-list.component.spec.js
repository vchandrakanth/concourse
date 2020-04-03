"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = require("@angular/common/http");
const core_1 = require("@angular/core");
const testing_1 = require("@angular/core/testing");
const platform_browser_1 = require("@angular/platform-browser");
const testing_2 = require("@angular/router/testing");
const angular_fontawesome_1 = require("@fortawesome/angular-fontawesome");
const store_1 = require("@ngrx/store");
const ngx_datatable_1 = require("@swimlane/ngx-datatable");
const ngx_pipes_1 = require("ngx-pipes");
const rxjs_1 = require("rxjs");
const shared_module_1 = require("@concourse/shared/shared.module");
const assetFaker = require("@concourse/store/asset/services/asset.faker");
const attributeTagFaker = require("@concourse/store/attribute-tag/services/attribute-tag.faker");
const facades_1 = require("@concourse/store/facades");
const group_faker_1 = require("@concourse/store/group/services/group.faker");
const test_1 = require("@concourse/test");
const assets_list_component_1 = require("./assets-list.component");
xdescribe('AssetsListComponent', () => {
    let component;
    let fixture;
    const mockAssets = assetFaker.fakeManyEnclaves(attributeTagFaker.fakeMany(2), group_faker_1.fakeOne());
    beforeEach(testing_1.async(() => {
        const configure = testBed => {
            testBed
                .configureTestingModule({
                schemas: [core_1.NO_ERRORS_SCHEMA],
                imports: [
                    http_1.HttpClientModule,
                    testing_2.RouterTestingModule,
                    ngx_datatable_1.NgxDatatableModule,
                    ngx_pipes_1.NgArrayPipesModule,
                    angular_fontawesome_1.FontAwesomeModule,
                    store_1.StoreModule.forRoot({}),
                    shared_module_1.SharedModule
                ],
                providers: [
                    test_1.mockFacade(facades_1.ModalStoreFacade),
                    test_1.mockFacade(facades_1.AttributeTagFacade),
                    test_1.mockFacade(facades_1.RoleFacade, {
                        responsibilityById$: new rxjs_1.BehaviorSubject(jest.fn())
                    }),
                    test_1.mockFacade(facades_1.AssetFacade, {
                        assetList$: new rxjs_1.BehaviorSubject(mockAssets),
                        isUpdating$: new rxjs_1.BehaviorSubject(false),
                        isLoaded$: new rxjs_1.BehaviorSubject(true)
                    }),
                    ...test_1.directiveProviders
                ],
                declarations: [assets_list_component_1.AssetsListComponent]
            });
        };
        test_1.configureTests(configure).then(testBed => {
            fixture = testBed.createComponent(assets_list_component_1.AssetsListComponent);
            component = fixture.componentInstance;
        });
    }));
    it('should create', () => {
        expect(component).toBeTruthy();
    });
    // it('should contain Asset data', () => {
    //   component.listAssets$.subscribe(assets => {
    //     expect(assets).toBe(mockAssets);
    //   });
    // });
    it('should not find app-null-state component', () => {
        const nullStateComponent = fixture.debugElement.query(platform_browser_1.By.css('app-null-state'));
        expect(nullStateComponent).toBeNull();
    });
    // it('should find app-null-state component, if asset length zero', () => {
    //   component.listAssets$ = new BehaviorSubject([]);
    //   fixture.detectChanges();
    //   component.listAssets$.subscribe(assets => {
    //     expect(assets.length).toBe(0);
    //   });
    //   const nullStateComponent = fixture.debugElement.query(By.css('app-null-state'));
    //   expect(nullStateComponent).toBeDefined();
    // });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXNzZXRzLWxpc3QuY29tcG9uZW50LnNwZWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9jb25jb3Vyc2UvamF2YXNjcmlwdC9jb25jb3Vyc2UtYXBwL3NyYy9hcHAvYXNzZXRzL2Fzc2V0cy1saXN0L2Fzc2V0cy1saXN0LmNvbXBvbmVudC5zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsK0NBQXdEO0FBQ3hELHdDQUFpRDtBQUNqRCxtREFBZ0U7QUFDaEUsZ0VBQStDO0FBQy9DLHFEQUE4RDtBQUM5RCwwRUFBcUU7QUFDckUsdUNBQTBDO0FBQzFDLDJEQUE2RDtBQUM3RCx5Q0FBK0M7QUFDL0MsK0JBQXVDO0FBRXZDLG1FQUErRDtBQUMvRCwwRUFBMEU7QUFDMUUsaUdBQWlHO0FBQ2pHLHNEQUF5RztBQUN6Ryw2RUFBc0U7QUFDdEUsMENBQThGO0FBQzlGLG1FQUE4RDtBQUU5RCxTQUFTLENBQUMscUJBQXFCLEVBQUUsR0FBRyxFQUFFO0lBQ3BDLElBQUksU0FBOEIsQ0FBQztJQUNuQyxJQUFJLE9BQThDLENBQUM7SUFDbkQsTUFBTSxVQUFVLEdBQUcsVUFBVSxDQUFDLGdCQUFnQixDQUFDLGlCQUFpQixDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsRUFBRSxxQkFBTyxFQUFFLENBQUMsQ0FBQztJQUV6RixVQUFVLENBQ1IsZUFBSyxDQUFDLEdBQUcsRUFBRTtRQUNULE1BQU0sU0FBUyxHQUFnQixPQUFPLENBQUMsRUFBRTtZQUN2QyxPQUFPO2lCQUNKLHNCQUFzQixDQUFDO2dCQUN0QixPQUFPLEVBQUUsQ0FBQyx1QkFBZ0IsQ0FBQztnQkFDM0IsT0FBTyxFQUFFO29CQUNQLHVCQUFnQjtvQkFDaEIsNkJBQW1CO29CQUNuQixrQ0FBa0I7b0JBQ2xCLDhCQUFrQjtvQkFDbEIsdUNBQWlCO29CQUNqQixtQkFBVyxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUM7b0JBQ3ZCLDRCQUFZO2lCQUNiO2dCQUNELFNBQVMsRUFBRTtvQkFDVCxpQkFBVSxDQUFDLDBCQUFnQixDQUFDO29CQUM1QixpQkFBVSxDQUFDLDRCQUFrQixDQUFDO29CQUM5QixpQkFBVSxDQUFDLG9CQUFVLEVBQUU7d0JBQ3JCLG1CQUFtQixFQUFFLElBQUksc0JBQWUsQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFLENBQUM7cUJBQ3BELENBQUM7b0JBQ0YsaUJBQVUsQ0FBQyxxQkFBVyxFQUFFO3dCQUN0QixVQUFVLEVBQUUsSUFBSSxzQkFBZSxDQUFDLFVBQVUsQ0FBQzt3QkFDM0MsV0FBVyxFQUFFLElBQUksc0JBQWUsQ0FBQyxLQUFLLENBQUM7d0JBQ3ZDLFNBQVMsRUFBRSxJQUFJLHNCQUFlLENBQUMsSUFBSSxDQUFDO3FCQUNyQyxDQUFDO29CQUNGLEdBQUcseUJBQWtCO2lCQUN0QjtnQkFDRCxZQUFZLEVBQUUsQ0FBQywyQ0FBbUIsQ0FBQzthQUNwQyxDQUFDLENBQUM7UUFDUCxDQUFDLENBQUM7UUFFRixxQkFBYyxDQUFDLFNBQVMsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsRUFBRTtZQUN2QyxPQUFPLEdBQUcsT0FBTyxDQUFDLGVBQWUsQ0FBQywyQ0FBbUIsQ0FBQyxDQUFDO1lBQ3ZELFNBQVMsR0FBRyxPQUFPLENBQUMsaUJBQWlCLENBQUM7UUFDeEMsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDLENBQUMsQ0FDSCxDQUFDO0lBRUYsRUFBRSxDQUFDLGVBQWUsRUFBRSxHQUFHLEVBQUU7UUFDdkIsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDLFVBQVUsRUFBRSxDQUFDO0lBQ2pDLENBQUMsQ0FBQyxDQUFDO0lBRUgsMENBQTBDO0lBQzFDLGdEQUFnRDtJQUNoRCx1Q0FBdUM7SUFDdkMsUUFBUTtJQUNSLE1BQU07SUFFTixFQUFFLENBQUMsMENBQTBDLEVBQUUsR0FBRyxFQUFFO1FBQ2xELE1BQU0sa0JBQWtCLEdBQUcsT0FBTyxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMscUJBQUUsQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDO1FBQ2hGLE1BQU0sQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQ3hDLENBQUMsQ0FBQyxDQUFDO0lBRUgsMkVBQTJFO0lBQzNFLHFEQUFxRDtJQUNyRCw2QkFBNkI7SUFDN0IsZ0RBQWdEO0lBQ2hELHFDQUFxQztJQUNyQyxRQUFRO0lBQ1IscUZBQXFGO0lBQ3JGLDhDQUE4QztJQUM5QyxNQUFNO0FBQ1IsQ0FBQyxDQUFDLENBQUMifQ==