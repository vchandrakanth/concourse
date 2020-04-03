"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const testing_1 = require("@angular/core/testing");
const ngx_bootstrap_1 = require("ngx-bootstrap");
const ngx_pipes_1 = require("ngx-pipes");
const shared_module_1 = require("@concourse/shared/shared.module");
const facades_1 = require("@concourse/store/facades");
const test_1 = require("@concourse/test");
const manage_keyvalue_data_component_1 = require("./manage-keyvalue-data.component");
describe('ManageKeyvalueDataComponent', () => {
    let component;
    let fixture;
    beforeEach(testing_1.async(() => {
        testing_1.TestBed.configureTestingModule({
            schemas: [core_1.NO_ERRORS_SCHEMA],
            imports: [
                ngx_pipes_1.NgArrayPipesModule,
                ngx_pipes_1.NgStringPipesModule,
                ngx_bootstrap_1.TooltipModule.forRoot(),
                shared_module_1.SharedModule
            ],
            providers: [
                test_1.mockFacade(facades_1.ModalStoreFacade),
                test_1.mockFacade(facades_1.InstitutionDataFacade),
                ...test_1.directiveProviders
            ],
            declarations: [manage_keyvalue_data_component_1.ManageKeyValueDataComponent]
        })
            .compileComponents();
    }));
    beforeEach(() => {
        fixture = testing_1.TestBed.createComponent(manage_keyvalue_data_component_1.ManageKeyValueDataComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFuYWdlLWtleXZhbHVlLWRhdGEuY29tcG9uZW50LnNwZWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9jb25jb3Vyc2UvamF2YXNjcmlwdC9jb25jb3Vyc2UtYXBwL3NyYy9hcHAvY29yZS9tb2RhbC9jb21wb25lbnRzL21hbmFnZS1rZXl2YWx1ZS1kYXRhL21hbmFnZS1rZXl2YWx1ZS1kYXRhLmNvbXBvbmVudC5zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsd0NBQWlEO0FBQ2pELG1EQUF5RTtBQUN6RSxpREFBOEM7QUFDOUMseUNBQW9FO0FBRXBFLG1FQUErRDtBQUMvRCxzREFBbUY7QUFDbkYsMENBQWlFO0FBQ2pFLHFGQUErRTtBQUUvRSxRQUFRLENBQUMsNkJBQTZCLEVBQUUsR0FBRyxFQUFFO0lBQzNDLElBQUksU0FBc0MsQ0FBQztJQUMzQyxJQUFJLE9BQXNELENBQUM7SUFFM0QsVUFBVSxDQUFDLGVBQUssQ0FBQyxHQUFHLEVBQUU7UUFDcEIsaUJBQU8sQ0FBQyxzQkFBc0IsQ0FBQztZQUM3QixPQUFPLEVBQUUsQ0FBQyx1QkFBZ0IsQ0FBQztZQUMzQixPQUFPLEVBQUU7Z0JBQ1AsOEJBQWtCO2dCQUNsQiwrQkFBbUI7Z0JBQ25CLDZCQUFhLENBQUMsT0FBTyxFQUFFO2dCQUN2Qiw0QkFBWTthQUNiO1lBQ0QsU0FBUyxFQUFFO2dCQUNULGlCQUFVLENBQUMsMEJBQWdCLENBQUM7Z0JBQzVCLGlCQUFVLENBQUMsK0JBQXFCLENBQUM7Z0JBQ2pDLEdBQUcseUJBQWtCO2FBQ3RCO1lBQ0QsWUFBWSxFQUFFLENBQUMsNERBQTJCLENBQUM7U0FDNUMsQ0FBQzthQUNDLGlCQUFpQixFQUFFLENBQUM7SUFDekIsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUVKLFVBQVUsQ0FBQyxHQUFHLEVBQUU7UUFDZCxPQUFPLEdBQUcsaUJBQU8sQ0FBQyxlQUFlLENBQUMsNERBQTJCLENBQUMsQ0FBQztRQUMvRCxTQUFTLEdBQUcsT0FBTyxDQUFDLGlCQUFpQixDQUFDO1FBQ3RDLE9BQU8sQ0FBQyxhQUFhLEVBQUUsQ0FBQztJQUMxQixDQUFDLENBQUMsQ0FBQztJQUVILEVBQUUsQ0FBQyxlQUFlLEVBQUUsR0FBRyxFQUFFO1FBQ3ZCLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQyxVQUFVLEVBQUUsQ0FBQztJQUNqQyxDQUFDLENBQUMsQ0FBQztBQUNMLENBQUMsQ0FBQyxDQUFDIn0=