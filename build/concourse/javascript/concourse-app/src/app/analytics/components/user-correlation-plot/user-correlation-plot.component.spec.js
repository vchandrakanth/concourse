"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@angular/core/testing");
const user_correlation_plot_component_1 = require("./user-correlation-plot.component");
const forms_1 = require("@angular/forms");
const shared_module_1 = require("@concourse/shared/shared.module");
const ngx_charts_1 = require("@swimlane/ngx-charts");
const ngx_bootstrap_1 = require("ngx-bootstrap");
const http_1 = require("@angular/common/http");
const analytics_service_1 = require("@concourse/store/analytics/services/analytics.service");
describe('UserCorrelationPlotComponent', () => {
    let component;
    let fixture;
    beforeEach(testing_1.async(() => {
        testing_1.TestBed.configureTestingModule({
            declarations: [user_correlation_plot_component_1.UserCorrelationPlotComponent],
            imports: [
                http_1.HttpClientModule,
                ngx_charts_1.NgxChartsModule,
                shared_module_1.SharedModule,
                forms_1.FormsModule,
                ngx_bootstrap_1.TabsModule.forRoot()
            ],
            providers: [
                analytics_service_1.AnalyticsService
            ]
        })
            .compileComponents();
    }));
    beforeEach(() => {
        fixture = testing_1.TestBed.createComponent(user_correlation_plot_component_1.UserCorrelationPlotComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci1jb3JyZWxhdGlvbi1wbG90LmNvbXBvbmVudC5zcGVjLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vY29uY291cnNlL2phdmFzY3JpcHQvY29uY291cnNlLWFwcC9zcmMvYXBwL2FuYWx5dGljcy9jb21wb25lbnRzL3VzZXItY29ycmVsYXRpb24tcGxvdC91c2VyLWNvcnJlbGF0aW9uLXBsb3QuY29tcG9uZW50LnNwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxtREFBeUU7QUFFekUsdUZBQWlGO0FBRWpGLDBDQUE2QztBQUM3QyxtRUFBK0Q7QUFDL0QscURBQXVEO0FBQ3ZELGlEQUEyQztBQUUzQywrQ0FBd0Q7QUFDeEQsNkZBQXlGO0FBRXpGLFFBQVEsQ0FBQyw4QkFBOEIsRUFBRSxHQUFHLEVBQUU7SUFDNUMsSUFBSSxTQUF1QyxDQUFDO0lBQzVDLElBQUksT0FBdUQsQ0FBQztJQUU1RCxVQUFVLENBQUMsZUFBSyxDQUFDLEdBQUcsRUFBRTtRQUNwQixpQkFBTyxDQUFDLHNCQUFzQixDQUFDO1lBQzdCLFlBQVksRUFBRSxDQUFDLDhEQUE0QixDQUFDO1lBQzVDLE9BQU8sRUFBRTtnQkFDUCx1QkFBZ0I7Z0JBRWhCLDRCQUFlO2dCQUNmLDRCQUFZO2dCQUNaLG1CQUFXO2dCQUNYLDBCQUFVLENBQUMsT0FBTyxFQUFFO2FBQ3JCO1lBQ0QsU0FBUyxFQUFFO2dCQUNULG9DQUFnQjthQUNqQjtTQUNGLENBQUM7YUFDQyxpQkFBaUIsRUFBRSxDQUFDO0lBQ3pCLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFFSixVQUFVLENBQUMsR0FBRyxFQUFFO1FBQ2QsT0FBTyxHQUFHLGlCQUFPLENBQUMsZUFBZSxDQUFDLDhEQUE0QixDQUFDLENBQUM7UUFDaEUsU0FBUyxHQUFHLE9BQU8sQ0FBQyxpQkFBaUIsQ0FBQztRQUN0QyxPQUFPLENBQUMsYUFBYSxFQUFFLENBQUM7SUFDMUIsQ0FBQyxDQUFDLENBQUM7SUFFSCxFQUFFLENBQUMsZUFBZSxFQUFFLEdBQUcsRUFBRTtRQUN2QixNQUFNLENBQUMsU0FBUyxDQUFDLENBQUMsVUFBVSxFQUFFLENBQUM7SUFDakMsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDLENBQUMsQ0FBQyJ9