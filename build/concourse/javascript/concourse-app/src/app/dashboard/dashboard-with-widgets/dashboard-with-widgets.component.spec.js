"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@angular/core/testing");
const ngx_echarts_1 = require("ngx-echarts");
const dashboard_with_widgets_component_1 = require("./dashboard-with-widgets.component");
const map_chart_component_1 = require("src/app/dashboard/dashboard-with-widgets/map-chart/map-chart.component");
describe('DashboardWithWidgetsComponent', () => {
    let component;
    let fixture;
    beforeEach(testing_1.async(() => {
        testing_1.TestBed.configureTestingModule({
            declarations: [dashboard_with_widgets_component_1.DashboardWithWidgetsComponent, map_chart_component_1.MapChartComponent],
            imports: [ngx_echarts_1.NgxEchartsModule]
        })
            .compileComponents();
    }));
    beforeEach(() => {
        fixture = testing_1.TestBed.createComponent(dashboard_with_widgets_component_1.DashboardWithWidgetsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGFzaGJvYXJkLXdpdGgtd2lkZ2V0cy5jb21wb25lbnQuc3BlYy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL2NvbmNvdXJzZS9qYXZhc2NyaXB0L2NvbmNvdXJzZS1hcHAvc3JjL2FwcC9kYXNoYm9hcmQvZGFzaGJvYXJkLXdpdGgtd2lkZ2V0cy9kYXNoYm9hcmQtd2l0aC13aWRnZXRzLmNvbXBvbmVudC5zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsbURBQXlFO0FBRXpFLDZDQUErQztBQUMvQyx5RkFBbUY7QUFDbkYsZ0hBQTJHO0FBRTNHLFFBQVEsQ0FBQywrQkFBK0IsRUFBRSxHQUFHLEVBQUU7SUFDN0MsSUFBSSxTQUF3QyxDQUFDO0lBQzdDLElBQUksT0FBd0QsQ0FBQztJQUU3RCxVQUFVLENBQUMsZUFBSyxDQUFDLEdBQUcsRUFBRTtRQUNwQixpQkFBTyxDQUFDLHNCQUFzQixDQUFDO1lBQzdCLFlBQVksRUFBRSxDQUFFLGdFQUE2QixFQUFFLHVDQUFpQixDQUFFO1lBQ2xFLE9BQU8sRUFBRSxDQUFFLDhCQUFnQixDQUFDO1NBQzdCLENBQUM7YUFDRCxpQkFBaUIsRUFBRSxDQUFDO0lBQ3ZCLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFFSixVQUFVLENBQUMsR0FBRyxFQUFFO1FBQ2QsT0FBTyxHQUFHLGlCQUFPLENBQUMsZUFBZSxDQUFDLGdFQUE2QixDQUFDLENBQUM7UUFDakUsU0FBUyxHQUFHLE9BQU8sQ0FBQyxpQkFBaUIsQ0FBQztRQUN0QyxPQUFPLENBQUMsYUFBYSxFQUFFLENBQUM7SUFDMUIsQ0FBQyxDQUFDLENBQUM7SUFFSCxFQUFFLENBQUMsZUFBZSxFQUFFLEdBQUcsRUFBRTtRQUN2QixNQUFNLENBQUMsU0FBUyxDQUFDLENBQUMsVUFBVSxFQUFFLENBQUM7SUFDakMsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDLENBQUMsQ0FBQyJ9