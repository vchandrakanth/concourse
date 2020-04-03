"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@angular/core/testing");
const platform_browser_1 = require("@angular/platform-browser");
const store_1 = require("@ngrx/store");
const rxjs_1 = require("rxjs");
const shared_module_1 = require("@concourse/shared/shared.module");
const facades_1 = require("@concourse/store/facades");
const test_1 = require("@concourse/test");
const insights_component_1 = require("./insights.component");
describe('InsightsComponent', () => {
    let component;
    let fixture;
    const mockInstitutionData = {
        id: 10008,
        name: 'InsightUrl',
        dataType: 'LONG',
        collectionType: 'LIST',
        value: '',
        listValues: ['https://concourse-grafana.beta.concourse.company/d/qRrja9umk/s3-access?orgId=1&from=1558037894619&to=1558124294621&panelId=7&fullscreen'],
        mapValues: {},
        institution: 101,
        surfaceLayer: undefined
    };
    beforeEach(testing_1.async(() => {
        testing_1.TestBed.configureTestingModule({
            imports: [
                store_1.StoreModule.forRoot({}),
                shared_module_1.SharedModule
            ],
            providers: [
                {
                    provide: facades_1.InstitutionDataFacade,
                    useValue: {
                        selected$: new rxjs_1.BehaviorSubject(Object.assign({}, mockInstitutionData))
                    }
                },
                test_1.mockFacade(facades_1.ApplicationErrorFacade)
            ],
            declarations: [insights_component_1.InsightsComponent]
        })
            .compileComponents();
    }));
    beforeEach(() => {
        fixture = testing_1.TestBed.createComponent(insights_component_1.InsightsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
    it('should display iframe on the page', () => {
        const iframe = fixture.debugElement.query(platform_browser_1.By.css('div.embed-responsive iframe')).nativeElement;
        expect(iframe).toBeDefined();
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5zaWdodHMuY29tcG9uZW50LnNwZWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9jb25jb3Vyc2UvamF2YXNjcmlwdC9jb25jb3Vyc2UtYXBwL3NyYy9hcHAvaW5zaWdodHMvaW5zaWdodHMvaW5zaWdodHMuY29tcG9uZW50LnNwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxtREFBeUU7QUFDekUsZ0VBQStDO0FBQy9DLHVDQUEwQztBQUMxQywrQkFBdUM7QUFFdkMsbUVBQStEO0FBQy9ELHNEQUF5RjtBQUN6RiwwQ0FBNkM7QUFDN0MsNkRBQXlEO0FBRXpELFFBQVEsQ0FBQyxtQkFBbUIsRUFBRSxHQUFHLEVBQUU7SUFDakMsSUFBSSxTQUE0QixDQUFDO0lBQ2pDLElBQUksT0FBNEMsQ0FBQztJQUNqRCxNQUFNLG1CQUFtQixHQUFHO1FBQzFCLEVBQUUsRUFBRSxLQUFLO1FBQ1QsSUFBSSxFQUFFLFlBQVk7UUFDbEIsUUFBUSxFQUFFLE1BQU07UUFDaEIsY0FBYyxFQUFFLE1BQU07UUFDdEIsS0FBSyxFQUFFLEVBQUU7UUFDVCxVQUFVLEVBQUUsQ0FBQyx5SUFBeUksQ0FBQztRQUN2SixTQUFTLEVBQUUsRUFBRTtRQUNiLFdBQVcsRUFBRSxHQUFHO1FBQ2hCLFlBQVksRUFBRSxTQUFTO0tBQ3hCLENBQUM7SUFFRixVQUFVLENBQUMsZUFBSyxDQUFDLEdBQUcsRUFBRTtRQUNwQixpQkFBTyxDQUFDLHNCQUFzQixDQUFDO1lBQzdCLE9BQU8sRUFBRTtnQkFDUCxtQkFBVyxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUM7Z0JBQ3ZCLDRCQUFZO2FBQ2I7WUFDRCxTQUFTLEVBQUU7Z0JBQ1Q7b0JBQ0UsT0FBTyxFQUFFLCtCQUFxQjtvQkFDOUIsUUFBUSxFQUFFO3dCQUNSLFNBQVMsRUFBRSxJQUFJLHNCQUFlLG1CQUN6QixtQkFBbUIsRUFDdEI7cUJBQ0g7aUJBQ0Y7Z0JBQ0QsaUJBQVUsQ0FBQyxnQ0FBc0IsQ0FBQzthQUNuQztZQUNELFlBQVksRUFBRSxDQUFDLHNDQUFpQixDQUFDO1NBQ2xDLENBQUM7YUFDQyxpQkFBaUIsRUFBRSxDQUFDO0lBQ3pCLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFFSixVQUFVLENBQUMsR0FBRyxFQUFFO1FBQ2QsT0FBTyxHQUFHLGlCQUFPLENBQUMsZUFBZSxDQUFDLHNDQUFpQixDQUFDLENBQUM7UUFDckQsU0FBUyxHQUFHLE9BQU8sQ0FBQyxpQkFBaUIsQ0FBQztRQUN0QyxPQUFPLENBQUMsYUFBYSxFQUFFLENBQUM7SUFDMUIsQ0FBQyxDQUFDLENBQUM7SUFFSCxFQUFFLENBQUMsZUFBZSxFQUFFLEdBQUcsRUFBRTtRQUN2QixNQUFNLENBQUMsU0FBUyxDQUFDLENBQUMsVUFBVSxFQUFFLENBQUM7SUFDakMsQ0FBQyxDQUFDLENBQUM7SUFFSCxFQUFFLENBQUMsbUNBQW1DLEVBQUUsR0FBRyxFQUFFO1FBQzNDLE1BQU0sTUFBTSxHQUFHLE9BQU8sQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLHFCQUFFLENBQUMsR0FBRyxDQUFDLDZCQUE2QixDQUFDLENBQUMsQ0FBQyxhQUE0QixDQUFDO1FBQzlHLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUMvQixDQUFDLENBQUMsQ0FBQztBQUNMLENBQUMsQ0FBQyxDQUFDIn0=