"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@angular/core/testing");
const http_1 = require("@angular/common/http");
const forms_1 = require("@angular/forms");
const shared_module_1 = require("@concourse/shared/shared.module");
const baseline_asset_service_1 = require("@concourse/store/baseline-asset/services/baseline-asset.service");
const baseline_asset_facade_1 = require("@concourse/store/baseline-asset/state/baseline-asset.facade");
const facades_1 = require("@concourse/store/facades");
const test_1 = require("@concourse/test");
const angular_fontawesome_1 = require("@fortawesome/angular-fontawesome");
const ng_select_1 = require("@ng-select/ng-select");
const edit_baseline_asset_azure_component_1 = require("./edit-baseline-asset-azure.component");
xdescribe('EditBaselineAssetAzureComponent', () => {
    let component;
    let fixture;
    beforeEach(testing_1.async(() => {
        testing_1.TestBed.configureTestingModule({
            declarations: [edit_baseline_asset_azure_component_1.EditBaselineAssetAzureComponent],
            imports: [
                ng_select_1.NgSelectModule,
                shared_module_1.SharedModule,
                angular_fontawesome_1.FontAwesomeModule,
                forms_1.FormsModule,
                forms_1.ReactiveFormsModule,
                http_1.HttpClientModule
            ],
            providers: [
                test_1.mockFacade(facades_1.CatalogServiceFacade),
                test_1.mockFacade(baseline_asset_facade_1.BaselineAssetFacade),
                test_1.mockFacade(facades_1.InstitutionDataFacade),
                baseline_asset_service_1.BaselineAssetService
            ]
        })
            .compileComponents();
    }));
    beforeEach(() => {
        fixture = testing_1.TestBed.createComponent(edit_baseline_asset_azure_component_1.EditBaselineAssetAzureComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWRpdC1iYXNlbGluZS1hc3NldC1henVyZS5jb21wb25lbnQuc3BlYy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL2NvbmNvdXJzZS9qYXZhc2NyaXB0L2NvbmNvdXJzZS1hcHAvc3JjL2FwcC9jb3JlL21vZGFsL2NvbXBvbmVudHMvZWRpdC1iYXNlbGluZS1hc3NldC1henVyZS9lZGl0LWJhc2VsaW5lLWFzc2V0LWF6dXJlLmNvbXBvbmVudC5zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsbURBQXlFO0FBRXpFLCtDQUF3RDtBQUN4RCwwQ0FBa0U7QUFDbEUsbUVBQStEO0FBQy9ELDRHQUF1RztBQUN2Ryx1R0FBa0c7QUFDbEcsc0RBQXVGO0FBQ3ZGLDBDQUE2QztBQUM3QywwRUFBcUU7QUFDckUsb0RBQXNEO0FBQ3RELCtGQUF3RjtBQUV4RixTQUFTLENBQUMsaUNBQWlDLEVBQUUsR0FBRyxFQUFFO0lBQ2hELElBQUksU0FBMEMsQ0FBQztJQUMvQyxJQUFJLE9BQTBELENBQUM7SUFFL0QsVUFBVSxDQUFDLGVBQUssQ0FBQyxHQUFHLEVBQUU7UUFDcEIsaUJBQU8sQ0FBQyxzQkFBc0IsQ0FBQztZQUM3QixZQUFZLEVBQUUsQ0FBQyxxRUFBK0IsQ0FBQztZQUMvQyxPQUFPLEVBQUU7Z0JBQ1AsMEJBQWM7Z0JBQ2QsNEJBQVk7Z0JBQ1osdUNBQWlCO2dCQUNqQixtQkFBVztnQkFDWCwyQkFBbUI7Z0JBQ25CLHVCQUFnQjthQUNqQjtZQUNELFNBQVMsRUFBRTtnQkFDVCxpQkFBVSxDQUFDLDhCQUFvQixDQUFDO2dCQUNoQyxpQkFBVSxDQUFDLDJDQUFtQixDQUFDO2dCQUMvQixpQkFBVSxDQUFDLCtCQUFxQixDQUFDO2dCQUNqQyw2Q0FBb0I7YUFDckI7U0FFRixDQUFDO2FBQ0MsaUJBQWlCLEVBQUUsQ0FBQztJQUN6QixDQUFDLENBQUMsQ0FBQyxDQUFDO0lBRUosVUFBVSxDQUFDLEdBQUcsRUFBRTtRQUNkLE9BQU8sR0FBRyxpQkFBTyxDQUFDLGVBQWUsQ0FBQyxxRUFBK0IsQ0FBQyxDQUFDO1FBQ25FLFNBQVMsR0FBRyxPQUFPLENBQUMsaUJBQWlCLENBQUM7UUFDdEMsT0FBTyxDQUFDLGFBQWEsRUFBRSxDQUFDO0lBQzFCLENBQUMsQ0FBQyxDQUFDO0lBRUgsRUFBRSxDQUFDLGVBQWUsRUFBRSxHQUFHLEVBQUU7UUFDdkIsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDLFVBQVUsRUFBRSxDQUFDO0lBQ2pDLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyxDQUFDLENBQUMifQ==