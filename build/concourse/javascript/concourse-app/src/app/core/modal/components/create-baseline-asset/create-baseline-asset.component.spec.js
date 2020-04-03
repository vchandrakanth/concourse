"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@angular/core/testing");
const forms_1 = require("@angular/forms");
const shared_module_1 = require("@concourse/shared/shared.module");
const baseline_asset_facade_1 = require("@concourse/store/baseline-asset/state/baseline-asset.facade");
const facades_1 = require("@concourse/store/facades");
const test_1 = require("@concourse/test");
const angular_fontawesome_1 = require("@fortawesome/angular-fontawesome");
const create_baseline_asset_component_1 = require("./create-baseline-asset.component");
xdescribe('CreateBaselineAssetComponent', () => {
    let component;
    let fixture;
    beforeEach(testing_1.async(() => {
        testing_1.TestBed.configureTestingModule({
            declarations: [create_baseline_asset_component_1.CreateBaselineAssetComponent],
            imports: [
                angular_fontawesome_1.FontAwesomeModule,
                shared_module_1.SharedModule,
                forms_1.ReactiveFormsModule
            ],
            providers: [
                test_1.mockFacade(facades_1.AttributeTagFacade),
                test_1.mockFacade(facades_1.PolicyGroupFacade),
                test_1.mockFacade(baseline_asset_facade_1.BaselineAssetFacade),
                test_1.mockFacade(facades_1.AuthFacade)
            ]
        })
            .compileComponents();
    }));
    beforeEach(() => {
        fixture = testing_1.TestBed.createComponent(create_baseline_asset_component_1.CreateBaselineAssetComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRlLWJhc2VsaW5lLWFzc2V0LmNvbXBvbmVudC5zcGVjLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vY29uY291cnNlL2phdmFzY3JpcHQvY29uY291cnNlLWFwcC9zcmMvYXBwL2NvcmUvbW9kYWwvY29tcG9uZW50cy9jcmVhdGUtYmFzZWxpbmUtYXNzZXQvY3JlYXRlLWJhc2VsaW5lLWFzc2V0LmNvbXBvbmVudC5zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsbURBQXlFO0FBRXpFLDBDQUFxRDtBQUNyRCxtRUFBK0Q7QUFDL0QsdUdBQWtHO0FBQ2xHLHNEQUE2RjtBQUM3RiwwQ0FBNkM7QUFDN0MsMEVBQXFFO0FBQ3JFLHVGQUFpRjtBQUVqRixTQUFTLENBQUMsOEJBQThCLEVBQUUsR0FBRyxFQUFFO0lBQzdDLElBQUksU0FBdUMsQ0FBQztJQUM1QyxJQUFJLE9BQXVELENBQUM7SUFHNUQsVUFBVSxDQUFDLGVBQUssQ0FBQyxHQUFHLEVBQUU7UUFDcEIsaUJBQU8sQ0FBQyxzQkFBc0IsQ0FBQztZQUM3QixZQUFZLEVBQUUsQ0FBQyw4REFBNEIsQ0FBQztZQUM1QyxPQUFPLEVBQUU7Z0JBQ1AsdUNBQWlCO2dCQUNqQiw0QkFBWTtnQkFDWiwyQkFBbUI7YUFDcEI7WUFDRCxTQUFTLEVBQUU7Z0JBQ1QsaUJBQVUsQ0FBQyw0QkFBa0IsQ0FBQztnQkFDOUIsaUJBQVUsQ0FBQywyQkFBaUIsQ0FBQztnQkFDN0IsaUJBQVUsQ0FBQywyQ0FBbUIsQ0FBQztnQkFDL0IsaUJBQVUsQ0FBQyxvQkFBVSxDQUFDO2FBQ3ZCO1NBQ0YsQ0FBQzthQUNDLGlCQUFpQixFQUFFLENBQUM7SUFDekIsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUVKLFVBQVUsQ0FBQyxHQUFHLEVBQUU7UUFDZCxPQUFPLEdBQUcsaUJBQU8sQ0FBQyxlQUFlLENBQUMsOERBQTRCLENBQUMsQ0FBQztRQUNoRSxTQUFTLEdBQUcsT0FBTyxDQUFDLGlCQUFpQixDQUFDO1FBQ3RDLE9BQU8sQ0FBQyxhQUFhLEVBQUUsQ0FBQztJQUMxQixDQUFDLENBQUMsQ0FBQztJQUVILEVBQUUsQ0FBQyxlQUFlLEVBQUUsR0FBRyxFQUFFO1FBQ3ZCLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQyxVQUFVLEVBQUUsQ0FBQztJQUNqQyxDQUFDLENBQUMsQ0FBQztBQUNMLENBQUMsQ0FBQyxDQUFDIn0=