"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = require("@angular/common/http");
const core_1 = require("@angular/core");
const testing_1 = require("@angular/core/testing");
const platform_browser_1 = require("@angular/platform-browser");
const store_1 = require("@ngrx/store");
const rxjs_1 = require("rxjs");
const facades_1 = require("@concourse/store/facades");
const institutionFaker = require("@concourse/store/institution/services/institution.faker");
const test_1 = require("@concourse/test");
const view_inst_component_1 = require("./view-inst.component");
describe('ViewInstComponent', () => {
    let component;
    let fixture;
    const mockInstitution = institutionFaker.fakeOne();
    beforeEach(testing_1.async(() => {
        testing_1.TestBed.configureTestingModule({
            schemas: [core_1.NO_ERRORS_SCHEMA],
            imports: [
                http_1.HttpClientModule,
                store_1.StoreModule.forRoot({})
            ],
            providers: [
                test_1.mockFacade(facades_1.InstitutionFacade, {
                    selected$: new rxjs_1.BehaviorSubject(mockInstitution)
                })
            ],
            declarations: [view_inst_component_1.ViewInstComponent]
        })
            .compileComponents();
    }));
    beforeEach(() => {
        fixture = testing_1.TestBed.createComponent(view_inst_component_1.ViewInstComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
    it('should display Institution details', () => {
        const institutionName = fixture.debugElement.query(platform_browser_1.By.css('div.card-header h2')).nativeElement;
        expect(institutionName.textContent).toEqual(mockInstitution.institutionName);
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlldy1pbnN0LmNvbXBvbmVudC5zcGVjLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vY29uY291cnNlL2phdmFzY3JpcHQvY29uY291cnNlLWFwcC9zcmMvYXBwL2NvbmNvdXJzZS1hZG1pbi9pbnN0aXR1dGlvbnMvdmlldy1pbnN0L3ZpZXctaW5zdC5jb21wb25lbnQuc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLCtDQUF3RDtBQUN4RCx3Q0FBaUQ7QUFDakQsbURBQXlFO0FBQ3pFLGdFQUErQztBQUMvQyx1Q0FBMEM7QUFDMUMsK0JBQXVDO0FBRXZDLHNEQUE2RDtBQUM3RCw0RkFBNEY7QUFDNUYsMENBQTZDO0FBQzdDLCtEQUEwRDtBQUUxRCxRQUFRLENBQUMsbUJBQW1CLEVBQUUsR0FBRyxFQUFFO0lBQ2pDLElBQUksU0FBNEIsQ0FBQztJQUNqQyxJQUFJLE9BQTRDLENBQUM7SUFDakQsTUFBTSxlQUFlLEdBQUcsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLENBQUM7SUFFbkQsVUFBVSxDQUFDLGVBQUssQ0FBQyxHQUFHLEVBQUU7UUFDcEIsaUJBQU8sQ0FBQyxzQkFBc0IsQ0FBQztZQUM3QixPQUFPLEVBQUUsQ0FBQyx1QkFBZ0IsQ0FBQztZQUMzQixPQUFPLEVBQUU7Z0JBQ1AsdUJBQWdCO2dCQUNoQixtQkFBVyxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUM7YUFDeEI7WUFDRCxTQUFTLEVBQUU7Z0JBQ1QsaUJBQVUsQ0FBQywyQkFBaUIsRUFBRTtvQkFDNUIsU0FBUyxFQUFFLElBQUksc0JBQWUsQ0FBQyxlQUFlLENBQUM7aUJBQ2hELENBQUM7YUFDSDtZQUNELFlBQVksRUFBRSxDQUFDLHVDQUFpQixDQUFDO1NBQ2xDLENBQUM7YUFDQyxpQkFBaUIsRUFBRSxDQUFDO0lBQ3pCLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFFSixVQUFVLENBQUMsR0FBRyxFQUFFO1FBQ2QsT0FBTyxHQUFHLGlCQUFPLENBQUMsZUFBZSxDQUFDLHVDQUFpQixDQUFDLENBQUM7UUFDckQsU0FBUyxHQUFHLE9BQU8sQ0FBQyxpQkFBaUIsQ0FBQztRQUN0QyxPQUFPLENBQUMsYUFBYSxFQUFFLENBQUM7SUFDMUIsQ0FBQyxDQUFDLENBQUM7SUFFSCxFQUFFLENBQUMsZUFBZSxFQUFFLEdBQUcsRUFBRTtRQUN2QixNQUFNLENBQUMsU0FBUyxDQUFDLENBQUMsVUFBVSxFQUFFLENBQUM7SUFDakMsQ0FBQyxDQUFDLENBQUM7SUFFSCxFQUFFLENBQUMsb0NBQW9DLEVBQUUsR0FBRyxFQUFFO1FBQzVDLE1BQU0sZUFBZSxHQUFHLE9BQU8sQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLHFCQUFFLENBQUMsR0FBRyxDQUFDLG9CQUFvQixDQUFDLENBQUMsQ0FBQyxhQUE0QixDQUFDO1FBQzlHLE1BQU0sQ0FBQyxlQUFlLENBQUMsV0FBVyxDQUFDLENBQUMsT0FBTyxDQUFDLGVBQWUsQ0FBQyxlQUFlLENBQUMsQ0FBQztJQUMvRSxDQUFDLENBQUMsQ0FBQztBQUNMLENBQUMsQ0FBQyxDQUFDIn0=