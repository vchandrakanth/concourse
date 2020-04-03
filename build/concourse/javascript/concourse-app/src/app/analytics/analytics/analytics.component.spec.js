"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@angular/core/testing");
const shared_module_1 = require("@concourse/shared/shared.module");
const ngx_charts_1 = require("@swimlane/ngx-charts");
const analytics_component_1 = require("./analytics.component");
const common_1 = require("@angular/common");
const http_1 = require("@angular/common/http");
const analytics_service_1 = require("@concourse/store/analytics/services/analytics.service");
const facades_1 = require("@concourse/store/facades");
const test_1 = require("@concourse/test");
const ngx_bootstrap_1 = require("ngx-bootstrap");
xdescribe('AnalyticsComponent', () => {
    let component;
    let fixture;
    beforeEach(testing_1.async(() => {
        testing_1.TestBed.configureTestingModule({
            declarations: [analytics_component_1.AnalyticsComponent],
            imports: [
                ngx_charts_1.NgxChartsModule,
                ngx_bootstrap_1.TabsModule.forRoot(),
                http_1.HttpClientModule,
                shared_module_1.SharedModule
            ],
            providers: [
                common_1.DatePipe,
                test_1.mockFacade(facades_1.AnalyticsFacade),
                analytics_service_1.AnalyticsService
            ]
        })
            .compileComponents();
    }));
    beforeEach(() => {
        fixture = testing_1.TestBed.createComponent(analytics_component_1.AnalyticsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5hbHl0aWNzLmNvbXBvbmVudC5zcGVjLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vY29uY291cnNlL2phdmFzY3JpcHQvY29uY291cnNlLWFwcC9zcmMvYXBwL2FuYWx5dGljcy9hbmFseXRpY3MvYW5hbHl0aWNzLmNvbXBvbmVudC5zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsbURBQXlFO0FBRXpFLG1FQUErRDtBQUMvRCxxREFBdUQ7QUFFdkQsK0RBQTJEO0FBRTNELDRDQUEyQztBQUMzQywrQ0FBd0Q7QUFDeEQsNkZBQXlGO0FBQ3pGLHNEQUEyRDtBQUMzRCwwQ0FBNkM7QUFDN0MsaURBQTJDO0FBRTNDLFNBQVMsQ0FBQyxvQkFBb0IsRUFBRSxHQUFHLEVBQUU7SUFDbkMsSUFBSSxTQUE2QixDQUFDO0lBQ2xDLElBQUksT0FBNkMsQ0FBQztJQUVsRCxVQUFVLENBQUMsZUFBSyxDQUFDLEdBQUcsRUFBRTtRQUNwQixpQkFBTyxDQUFDLHNCQUFzQixDQUFDO1lBQzdCLFlBQVksRUFBRSxDQUFDLHdDQUFrQixDQUFDO1lBQ2xDLE9BQU8sRUFBRTtnQkFDUCw0QkFBZTtnQkFDZiwwQkFBVSxDQUFDLE9BQU8sRUFBRTtnQkFDcEIsdUJBQWdCO2dCQUNoQiw0QkFBWTthQUNiO1lBQ0QsU0FBUyxFQUFFO2dCQUNULGlCQUFRO2dCQUNSLGlCQUFVLENBQUMseUJBQWUsQ0FBQztnQkFDM0Isb0NBQWdCO2FBQ2pCO1NBQ0YsQ0FBQzthQUNDLGlCQUFpQixFQUFFLENBQUM7SUFDekIsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUVKLFVBQVUsQ0FBQyxHQUFHLEVBQUU7UUFDZCxPQUFPLEdBQUcsaUJBQU8sQ0FBQyxlQUFlLENBQUMsd0NBQWtCLENBQUMsQ0FBQztRQUN0RCxTQUFTLEdBQUcsT0FBTyxDQUFDLGlCQUFpQixDQUFDO1FBQ3RDLE9BQU8sQ0FBQyxhQUFhLEVBQUUsQ0FBQztJQUMxQixDQUFDLENBQUMsQ0FBQztJQUVILEVBQUUsQ0FBQyxlQUFlLEVBQUUsR0FBRyxFQUFFO1FBQ3ZCLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQyxVQUFVLEVBQUUsQ0FBQztJQUNqQyxDQUFDLENBQUMsQ0FBQztBQUNMLENBQUMsQ0FBQyxDQUFDIn0=