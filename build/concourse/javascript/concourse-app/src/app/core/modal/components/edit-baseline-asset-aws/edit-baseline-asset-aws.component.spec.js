"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@angular/core/testing");
const http_1 = require("@angular/common/http");
const forms_1 = require("@angular/forms");
const shared_module_1 = require("@concourse/shared/shared.module");
const baseline_asset_service_1 = require("@concourse/store/baseline-asset/services/baseline-asset.service");
const baseline_asset_facade_1 = require("@concourse/store/baseline-asset/state/baseline-asset.facade");
const catalog_service_1 = require("@concourse/store/catalog-service/services/catalog.service");
const facades_1 = require("@concourse/store/facades");
const test_1 = require("@concourse/test");
const angular_fontawesome_1 = require("@fortawesome/angular-fontawesome");
const ng_select_1 = require("@ng-select/ng-select");
const edit_baseline_asset_aws_component_1 = require("./edit-baseline-asset-aws.component");
xdescribe('EditBaselineAssetAwsComponent', () => {
    let component;
    let fixture;
    beforeEach(testing_1.async(() => {
        testing_1.TestBed.configureTestingModule({
            declarations: [edit_baseline_asset_aws_component_1.EditBaselineAssetAwsComponent],
            imports: [
                shared_module_1.SharedModule,
                angular_fontawesome_1.FontAwesomeModule,
                forms_1.FormsModule,
                forms_1.ReactiveFormsModule,
                ng_select_1.NgSelectModule,
                http_1.HttpClientModule
            ],
            providers: [
                catalog_service_1.CatalogService,
                baseline_asset_service_1.BaselineAssetService,
                test_1.mockFacade(facades_1.CatalogServiceFacade),
                test_1.mockFacade(baseline_asset_facade_1.BaselineAssetFacade)
            ]
        })
            .compileComponents();
    }));
    beforeEach(() => {
        fixture = testing_1.TestBed.createComponent(edit_baseline_asset_aws_component_1.EditBaselineAssetAwsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWRpdC1iYXNlbGluZS1hc3NldC1hd3MuY29tcG9uZW50LnNwZWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9jb25jb3Vyc2UvamF2YXNjcmlwdC9jb25jb3Vyc2UtYXBwL3NyYy9hcHAvY29yZS9tb2RhbC9jb21wb25lbnRzL2VkaXQtYmFzZWxpbmUtYXNzZXQtYXdzL2VkaXQtYmFzZWxpbmUtYXNzZXQtYXdzLmNvbXBvbmVudC5zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsbURBQXlFO0FBRXpFLCtDQUF3RDtBQUN4RCwwQ0FBa0U7QUFDbEUsbUVBQStEO0FBQy9ELDRHQUF1RztBQUN2Ryx1R0FBa0c7QUFDbEcsK0ZBQTJGO0FBQzNGLHNEQUFnRTtBQUNoRSwwQ0FBNkM7QUFDN0MsMEVBQXFFO0FBQ3JFLG9EQUFzRDtBQUN0RCwyRkFBb0Y7QUFFcEYsU0FBUyxDQUFDLCtCQUErQixFQUFFLEdBQUcsRUFBRTtJQUM5QyxJQUFJLFNBQXdDLENBQUM7SUFDN0MsSUFBSSxPQUF3RCxDQUFDO0lBRTdELFVBQVUsQ0FBQyxlQUFLLENBQUMsR0FBRyxFQUFFO1FBQ3BCLGlCQUFPLENBQUMsc0JBQXNCLENBQUM7WUFDN0IsWUFBWSxFQUFFLENBQUMsaUVBQTZCLENBQUM7WUFDN0MsT0FBTyxFQUFFO2dCQUNQLDRCQUFZO2dCQUNaLHVDQUFpQjtnQkFDakIsbUJBQVc7Z0JBQ1gsMkJBQW1CO2dCQUNuQiwwQkFBYztnQkFDZCx1QkFBZ0I7YUFDakI7WUFDRCxTQUFTLEVBQUU7Z0JBQ1QsZ0NBQWM7Z0JBQ2QsNkNBQW9CO2dCQUNwQixpQkFBVSxDQUFDLDhCQUFvQixDQUFDO2dCQUNoQyxpQkFBVSxDQUFDLDJDQUFtQixDQUFDO2FBQ2hDO1NBQ0YsQ0FBQzthQUNDLGlCQUFpQixFQUFFLENBQUM7SUFDekIsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUVKLFVBQVUsQ0FBQyxHQUFHLEVBQUU7UUFDZCxPQUFPLEdBQUcsaUJBQU8sQ0FBQyxlQUFlLENBQUMsaUVBQTZCLENBQUMsQ0FBQztRQUNqRSxTQUFTLEdBQUcsT0FBTyxDQUFDLGlCQUFpQixDQUFDO1FBQ3RDLE9BQU8sQ0FBQyxhQUFhLEVBQUUsQ0FBQztJQUMxQixDQUFDLENBQUMsQ0FBQztJQUVILEVBQUUsQ0FBQyxlQUFlLEVBQUUsR0FBRyxFQUFFO1FBQ3ZCLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQyxVQUFVLEVBQUUsQ0FBQztJQUNqQyxDQUFDLENBQUMsQ0FBQztBQUNMLENBQUMsQ0FBQyxDQUFDIn0=