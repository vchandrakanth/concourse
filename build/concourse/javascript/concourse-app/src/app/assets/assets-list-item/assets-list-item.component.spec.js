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
const asset_faker_1 = require("@concourse/store/asset/services/asset.faker");
const attribute_tag_faker_1 = require("@concourse/store/attribute-tag/services/attribute-tag.faker");
const facades_1 = require("@concourse/store/facades");
const group_faker_1 = require("@concourse/store/group/services/group.faker");
const test_1 = require("@concourse/test");
const assets_list_item_component_1 = require("./assets-list-item.component");
describe('AssetsListItemComponent', () => {
    let component;
    let fixture;
    const mockAsset = asset_faker_1.fakeOneEnclave(attribute_tag_faker_1.fakeMany(3), group_faker_1.fakeOne());
    beforeEach(testing_1.async(() => {
        const configure = testBed => {
            testBed
                .configureTestingModule({
                schemas: [core_1.NO_ERRORS_SCHEMA],
                imports: [
                    testing_2.RouterTestingModule,
                    angular_fontawesome_1.FontAwesomeModule,
                    store_1.StoreModule.forRoot({}),
                    shared_module_1.SharedModule
                ],
                declarations: [
                    assets_list_item_component_1.AssetsListItemComponent
                ],
                providers: [
                    test_1.mockFacade(facades_1.AttributeTagFacade),
                    test_1.mockFacade(facades_1.AuditHistoryFacade),
                    test_1.mockFacade(facades_1.ModalStoreFacade),
                    test_1.mockFacade(facades_1.AssetFacade, {
                        asset$: new rxjs_1.BehaviorSubject(Object.assign(Object.assign({}, mockAsset), { isLatest: true, managementStrategy: 'SELF_MANAGED', owningGroup: group_faker_1.fakeOne() }))
                    }),
                    test_1.mockFacade(facades_1.GroupFacade),
                    ...test_1.directiveProviders
                ]
            });
        };
        test_1.configureTests(configure).then(testBed => {
            fixture = testBed.createComponent(assets_list_item_component_1.AssetsListItemComponent);
            component = fixture.componentInstance;
            fixture.detectChanges();
        });
    }));
    it('should create', () => {
        expect(component).toBeTruthy();
    });
    it('should display asset details', () => {
        const assetTitle = fixture.debugElement.query(platform_browser_1.By.css('[data-e2e="assetCard"] h2')).nativeElement;
        expect(assetTitle.textContent).toEqual(`Overview For ${mockAsset.name}`);
    });
    it('should be able to edit if isLatest && managementStrategy === \'SELF_MANAGED\'', () => {
        component.asset$.subscribe(asset => {
            expect(asset.canEdit).toBeTruthy();
        });
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXNzZXRzLWxpc3QtaXRlbS5jb21wb25lbnQuc3BlYy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL2NvbmNvdXJzZS9qYXZhc2NyaXB0L2NvbmNvdXJzZS1hcHAvc3JjL2FwcC9hc3NldHMvYXNzZXRzLWxpc3QtaXRlbS9hc3NldHMtbGlzdC1pdGVtLmNvbXBvbmVudC5zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsd0NBQWlEO0FBQ2pELG1EQUFnRTtBQUNoRSxnRUFBK0M7QUFDL0MscURBQThEO0FBQzlELDBFQUFxRTtBQUNyRSx1Q0FBMEM7QUFDMUMsK0JBQXVDO0FBRXZDLG1FQUErRDtBQUMvRCw2RUFBNkU7QUFDN0UscUdBQXVGO0FBQ3ZGLHNEQUE4SDtBQUM5SCw2RUFBc0U7QUFDdEUsMENBQThGO0FBQzlGLDZFQUF1RTtBQUV2RSxRQUFRLENBQUMseUJBQXlCLEVBQUUsR0FBRyxFQUFFO0lBQ3ZDLElBQUksU0FBa0MsQ0FBQztJQUN2QyxJQUFJLE9BQWtELENBQUM7SUFDdkQsTUFBTSxTQUFTLEdBQUcsNEJBQWMsQ0FBQyw4QkFBUSxDQUFDLENBQUMsQ0FBQyxFQUFFLHFCQUFPLEVBQUUsQ0FBQyxDQUFDO0lBRXpELFVBQVUsQ0FDUixlQUFLLENBQUMsR0FBRyxFQUFFO1FBQ1QsTUFBTSxTQUFTLEdBQWdCLE9BQU8sQ0FBQyxFQUFFO1lBQ3ZDLE9BQU87aUJBQ0osc0JBQXNCLENBQUM7Z0JBQ3RCLE9BQU8sRUFBRSxDQUFDLHVCQUFnQixDQUFDO2dCQUMzQixPQUFPLEVBQUU7b0JBQ1AsNkJBQW1CO29CQUNuQix1Q0FBaUI7b0JBQ2pCLG1CQUFXLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQztvQkFDdkIsNEJBQVk7aUJBQ2I7Z0JBQ0QsWUFBWSxFQUFFO29CQUNaLG9EQUF1QjtpQkFDeEI7Z0JBQ0QsU0FBUyxFQUFFO29CQUNULGlCQUFVLENBQUMsNEJBQWtCLENBQUM7b0JBQzlCLGlCQUFVLENBQUMsNEJBQWtCLENBQUM7b0JBQzlCLGlCQUFVLENBQUMsMEJBQWdCLENBQUM7b0JBQzVCLGlCQUFVLENBQUMscUJBQVcsRUFBRTt3QkFDdEIsTUFBTSxFQUFFLElBQUksc0JBQWUsaUNBQ3RCLFNBQVMsS0FDWixRQUFRLEVBQUUsSUFBSSxFQUNkLGtCQUFrQixFQUFFLGNBQWMsRUFDbEMsV0FBVyxFQUFFLHFCQUFPLEVBQUUsSUFDdEI7cUJBQ0gsQ0FBQztvQkFDRixpQkFBVSxDQUFDLHFCQUFXLENBQUM7b0JBQ3ZCLEdBQUcseUJBQWtCO2lCQUN0QjthQUNGLENBQUMsQ0FBQztRQUNQLENBQUMsQ0FBQztRQUVGLHFCQUFjLENBQUMsU0FBUyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFO1lBQ3ZDLE9BQU8sR0FBRyxPQUFPLENBQUMsZUFBZSxDQUFDLG9EQUF1QixDQUFDLENBQUM7WUFDM0QsU0FBUyxHQUFHLE9BQU8sQ0FBQyxpQkFBaUIsQ0FBQztZQUN0QyxPQUFPLENBQUMsYUFBYSxFQUFFLENBQUM7UUFDMUIsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDLENBQUMsQ0FDSCxDQUFDO0lBRUYsRUFBRSxDQUFDLGVBQWUsRUFBRSxHQUFHLEVBQUU7UUFDdkIsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDLFVBQVUsRUFBRSxDQUFDO0lBQ2pDLENBQUMsQ0FBQyxDQUFDO0lBRUgsRUFBRSxDQUFDLDhCQUE4QixFQUFFLEdBQUcsRUFBRTtRQUN0QyxNQUFNLFVBQVUsR0FBRyxPQUFPLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxxQkFBRSxDQUFDLEdBQUcsQ0FBQywyQkFBMkIsQ0FBQyxDQUFDLENBQUMsYUFBNEIsQ0FBQztRQUNoSCxNQUFNLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxnQkFBZ0IsU0FBUyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7SUFDM0UsQ0FBQyxDQUFDLENBQUM7SUFFSCxFQUFFLENBQUMsK0VBQStFLEVBQUUsR0FBRyxFQUFFO1FBQ3ZGLFNBQVMsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxFQUFFO1lBQ2pDLE1BQU0sQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsVUFBVSxFQUFFLENBQUM7UUFDckMsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDLENBQUMsQ0FBQztBQUVMLENBQUMsQ0FBQyxDQUFDIn0=