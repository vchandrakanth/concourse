"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@angular/core/testing");
const http_1 = require("@angular/common/http");
const analytics_service_1 = require("@concourse/store/analytics/services/analytics.service");
const ngx_datatable_1 = require("@swimlane/ngx-datatable");
const activity_prediction_chart_component_1 = require("./activity-prediction-chart.component");
describe('ActivityPredictionChartComponent', () => {
    let component;
    let fixture;
    beforeEach(testing_1.async(() => {
        testing_1.TestBed.configureTestingModule({
            declarations: [activity_prediction_chart_component_1.ActivityPredictionChartComponent],
            imports: [
                ngx_datatable_1.NgxDatatableModule,
                http_1.HttpClientModule
            ],
            providers: [
                analytics_service_1.AnalyticsService
            ]
        })
            .compileComponents();
    }));
    beforeEach(() => {
        fixture = testing_1.TestBed.createComponent(activity_prediction_chart_component_1.ActivityPredictionChartComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWN0aXZpdHktcHJlZGljdGlvbi1jaGFydC5jb21wb25lbnQuc3BlYy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL2NvbmNvdXJzZS9qYXZhc2NyaXB0L2NvbmNvdXJzZS1hcHAvc3JjL2FwcC9hbmFseXRpY3MvY29tcG9uZW50cy9hY3Rpdml0eS1wcmVkaWN0aW9uLWNoYXJ0L2FjdGl2aXR5LXByZWRpY3Rpb24tY2hhcnQuY29tcG9uZW50LnNwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxtREFBeUU7QUFFekUsK0NBQXdEO0FBQ3hELDZGQUF5RjtBQUN6RiwyREFBNkQ7QUFDN0QsK0ZBQXlGO0FBRXpGLFFBQVEsQ0FBQyxrQ0FBa0MsRUFBRSxHQUFHLEVBQUU7SUFDaEQsSUFBSSxTQUEyQyxDQUFDO0lBQ2hELElBQUksT0FBMkQsQ0FBQztJQUVoRSxVQUFVLENBQUMsZUFBSyxDQUFDLEdBQUcsRUFBRTtRQUNwQixpQkFBTyxDQUFDLHNCQUFzQixDQUFDO1lBQzdCLFlBQVksRUFBRSxDQUFDLHNFQUFnQyxDQUFDO1lBQ2hELE9BQU8sRUFBRTtnQkFDUCxrQ0FBa0I7Z0JBQ2xCLHVCQUFnQjthQUNqQjtZQUNELFNBQVMsRUFBRTtnQkFDVCxvQ0FBZ0I7YUFDakI7U0FDRixDQUFDO2FBQ0MsaUJBQWlCLEVBQUUsQ0FBQztJQUN6QixDQUFDLENBQUMsQ0FBQyxDQUFDO0lBRUosVUFBVSxDQUFDLEdBQUcsRUFBRTtRQUNkLE9BQU8sR0FBRyxpQkFBTyxDQUFDLGVBQWUsQ0FBQyxzRUFBZ0MsQ0FBQyxDQUFDO1FBQ3BFLFNBQVMsR0FBRyxPQUFPLENBQUMsaUJBQWlCLENBQUM7UUFDdEMsT0FBTyxDQUFDLGFBQWEsRUFBRSxDQUFDO0lBQzFCLENBQUMsQ0FBQyxDQUFDO0lBRUgsRUFBRSxDQUFDLGVBQWUsRUFBRSxHQUFHLEVBQUU7UUFDdkIsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDLFVBQVUsRUFBRSxDQUFDO0lBQ2pDLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyxDQUFDLENBQUMifQ==